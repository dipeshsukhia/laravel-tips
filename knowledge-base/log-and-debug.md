## Log and debug

### Logging with parameters

You can write `Log::info()`, or shorter `info()` message with additional parameters, for more context about what happened.

```php
Log::info('User failed to login.', ['id' => $user->id]);
```

### Log Long Running Laravel Queries

```php
DB::enableQueryLog();

DB::whenQueryingForLongerThen(1000, function ($connection) {
     Log::warning(
          'Long running queries have been detected.',
          $connection->getQueryLog()
     );
});
```

### Benchmark class

In Laravel 9.32 we have a Benchmark class that can measure the time of any task.

It's a pretty useful helper:
```php
class OrderController
{
     public function index()
     {
          return Benchmark::measure(fn () => Order::all()),
     }
}
```

### More convenient DD

Instead of doing `dd($result)` you can put `->dd()` as a method directly at the end of your Eloquent sentence, or any Collection.

```php
// Previous approach:
$users = User::where('name', 'Taylor')->get();
dd($users);
// Recommended approach:
$users = User::where('name', 'Taylor')->get()->dd();
```

### Log with context

New in Laravel 8.49: `Log::withContext()` will help you to differentiate the Log messages between different requests.

If you create a Middleware and set this context, all Log messages will contain that context, and you'll be able to search them easier.

```php
public function handle(Request $request, Closure $next)
{
    $requestId = (string) Str::uuid();

    Log::withContext(['request-id' => $requestId]);

    $response = $next($request);

    $response->header('request-id', $requestId);

    return $response;
}
```

### Quickly output an Eloquent query in its SQL form

If you want to quickly output an Eloquent query in its SQL form, you can invoke the toSql() method onto it like so

```php
$invoices = Invoice::where('client', 'James pay')->toSql();

dd($invoices)
// select * from `invoices` where `client` = ?
```

### Log all the database queries during development

If you want to log all the database queries during development add this snippet to your AppServiceProvider

```php
public function boot()
{
    if (App::environment('local')) {
        DB::listen(function ($query) {
            logger(Str::replaceArray('?', $query->bindings, $query->sql));
        });
    }
}
```

### Discover all events fired in one request

If you want to implement a new listener to a specific event but you don't know its name, you can log all events fired during the request.

You can use the `\Illuminate\Support\Facades\Event::listen()` method on `boot()` method of `app/Providers/EventServiceProvider.php` to catch all events fired.

**Important:** If you use the `Log` facade within this event listener then you will need to exclude events named `Illuminate\Log\Events\MessageLogged` to avoid an infinite loop.
(Example: `if ($event == 'Illuminate\\Log\\Events\\MessageLogged') return;`)

```php
// Include Event...
use Illuminate\Support\Facades\Event;

// In your EventServiceProvider class...
public function boot()
{
    parent::boot();

    Event::listen('*', function ($event, array $data) {
        // Log the event class
        error_log($event);

        // Log the event data passed to the listener.
        error_log(json_encode($data, JSON_PRETTY_PRINT));
    });
}
```
