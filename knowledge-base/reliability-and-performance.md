## Reliability and Performance

### Make Retried Jobs Idempotent

Queue workers may retry work after a timeout or lost acknowledgement, even when part of the job already ran. Make repeating the same operation safe by recording a stable business or provider event ID under a unique database constraint, then applying local changes in the same transaction.

```php
DB::transaction(function () use ($event) {
    $receipt = WebhookReceipt::firstOrCreate(
        ['provider_event_id' => $event['id']],
        ['payload' => $event],
    );

    if (! $receipt->wasRecentlyCreated) {
        return;
    }

    // Apply the local state change in this transaction.
    Subscription::whereKey($event['subscription_id'])
        ->update(['status' => $event['status']]);
});
```

For effects outside your database, such as charging a payment provider, send the same idempotency key on every retry. A unique queue job can prevent duplicate dispatch, but it does not replace idempotent job logic.

### Suppress Duplicate Job Dispatches with ShouldBeUnique

When only one queued job per resource should be pending, implement `ShouldBeUnique` and return a resource-specific key. Laravel uses that key to hold a cache lock while the job is queued and processing.

```php
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;

class RebuildAccountProjection implements ShouldQueue, ShouldBeUnique
{
    public function __construct(public int $accountId) {}

    public int $uniqueFor = 900;

    public function uniqueId(): string
    {
        return (string) $this->accountId;
    }
}
```

Use a cache store available to every queue worker when jobs run on multiple servers. Choose a lock lifetime that safely covers the job, and keep the handler idempotent because jobs can still be retried.

### Prevent Concurrent Jobs from Updating the Same Resource

Use `WithoutOverlapping` when two jobs may both be queued but must not modify the same resource at the same time. This is different from unique dispatch: overlapping jobs wait or release until the lock is available.

```php
use Illuminate\Queue\Middleware\WithoutOverlapping;

public function middleware(): array
{
    return [
        (new WithoutOverlapping("account:{$this->accountId}"))
            ->releaseAfter(30)
            ->expireAfter(300),
    ];
}
```

The lock uses a cache store that supports atomic locks. Since a released job consumes an attempt, set the job's retry limit high enough for the expected contention.

### Back Off Between Retries of Transient Failures

Immediate retries can overload a service that is already failing. Set a bounded retry count and increase the delay between attempts for temporary network or provider errors:

```php
public int $tries = 5;

public function backoff(): array
{
    return [1, 5, 15, 30];
}
```

Retries do not fix permanent errors such as invalid input. Make jobs safe to run more than once, and send exhausted jobs to the failed-job workflow for inspection.

### Keep Scheduled Tasks Safe Across Multiple Servers

When every server runs Laravel's scheduler, use `onOneServer()` to elect one runner and `withoutOverlapping()` to prevent a slow execution from starting again before it finishes:

```php
Schedule::command('reports:rebuild')
    ->hourly()
    ->onOneServer()
    ->withoutOverlapping(30);
```

All scheduler instances must share a cache store that supports atomic locks. Set the overlap expiration to fit the task's maximum runtime and monitor the task if it approaches that limit.

### Serve Stale Cache Data While Refreshing It

For expensive values that can be briefly stale, `Cache::flexible()` returns a fresh value immediately and refreshes a stale value after the response. This avoids making every visitor wait for the same recalculation.

```php
$summary = Cache::flexible('dashboard:summary', [30, 300], function () {
    return Order::query()
        ->selectRaw('status, count(*) as total')
        ->groupBy('status')
        ->get();
});
```

The first duration is the fresh window; the second is the maximum stale window. Use it only when serving slightly out-of-date data is acceptable, and ensure the cache store is shared if the site runs on multiple servers.
