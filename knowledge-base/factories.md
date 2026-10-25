## Factories

### Factory callbacks

While using factories for seeding data, you can provide Factory Callback functions to perform some action after record is inserted.

```php
$factory->afterCreating(App\User::class, function ($user, $faker) {
    $user->accounts()->save(factory(App\Account::class)->make());
});
```

### Generate Images with Seeds/Factories

Did you know that Faker can generate not only text values but also IMAGES? See `avatar` field here - it will generate 50x50 image:

```php
$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => bcrypt('password'),
        'remember_token' => Str::random(10),
        'avatar' => $faker->image(storage_path('images'), 50, 50)
    ];
});
```

### Override values and apply custom login to them

When creating records with Factories, you can use Sequence class to override some values and apply custom logic to them.

```php
$users = User::factory()
                ->count(10)
                ->state(new Sequence(
                    ['admin' => 'Y'],
                    ['admin' => 'N'],
                ))
                ->create();
```

### Using factories with relationships

When using factories with relationships, Laravel also provides magic methods.

```php
// magic factory relationship methods
User::factory()->hasPosts(3)->create();

// instead of
User::factory()->has(Post::factory()->count(3))->create();
```

### Create models without dispatching any events

Sometimes you may wish to `update` a given model without dispatching any events. You may accomplish this using the `updateQuietly` method

```php
Post::factory()->createOneQuietly();

Post::factory()->count(3)->createQuietly();

Post::factory()->createManyQuietly([
    ['message' => 'A new comment'],
    ['message' => 'Another new comment'],
]);
```

### Useful for() method

The Laravel factory has a very useful `for()` method. You can use it to create `belongsTo()` relationships.

```php
public function run()
{
    Product::factory()
        ->count(3)
        ->for(Category::factory()->create())
        ->create();
}
```

### Run factories without dispatching events

If you want to create multiple records using Factory without firing any Events, you can wrap your code inside a withoutEvents closure.

```php
$posts = Post::withoutEvents(function () {
    return Post::factory()->count(50)->create();
});
```

### Specify dependencies in the run() method

You can specify dependencies in the `run()` method of your seeder.

```php
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $user = User::factory()->create();

        $this->callWith(EventSeeder::class, [
            'user' => $user
        ]);
    }
}
```

```php
class EventSeeder extends Seeder
{
    public function run(User $user)
    {
        Event::factory()
            ->when($user, fn($f) => $f->for('user'))
            ->for(Program::factory())
            ->create();
    }
}
```
