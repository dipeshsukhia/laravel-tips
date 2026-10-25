## Views

### $loop variable in foreach

Inside of foreach loop, check if current entry is first/last by just using `$loop` variable.

```blade
@foreach ($users as $user)
     @if ($loop->first)
        This is the first iteration.
     @endif

     @if ($loop->last)
        This is the last iteration.
     @endif

     <p>This is user {{ $user->id }}</p>
@endforeach
```

There are also other properties like `$loop->iteration` or `$loop->count`.
Learn more on the official documentation.

### You can use Blade to generate more than HTML

You can use it to generate any dynamic string or file you want. For example, a shell script or a sitemap file.

You only need to call the `render()` method on a view to get the result as a string.

```php
$script = view('deploy-script')->render();

$ssh = $this->createSshConnection();

info("Executing deploy script...");
$process = $ssh->execute(explode("\n", $script));
```

### Short attribute syntax for Blade Components

Available from Laravel 9.32.

Current syntax:
```blade
<x-profile :user-id="$userId"></x-profile>
```

Short syntax:
```blade
<x-profile :$userId></x-profile>
```

### Share one variable with multiple views

Have you ever needed to share one variable with multiple views in Laravel? Here's a simple solution for that.

```php
use App\Models\Post;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        if (Schema::hasTable('posts')) {
            View::share('recentPosts', Post::latest()->take(3)->get());
        }
    }
}
```

### Does view file exist?

You can check if View file exists before actually loading it.

```php
if (view()->exists('custom.page')) {
 // Load the view
}
```

You can even load an array of views and only the first existing will be actually loaded.

```php
return view()->first(['custom.dashboard', 'dashboard'], $data);
```

### Error code Blade pages

If you want to create a specific error page for some HTTP code, like 503 - just create a blade file with this code as filename, in `resources/views/errors/503.blade.php`, or `403.blade.php` etc, and it will automatically be loaded in case of that error code.

### View without controllers

If you want route to just show a certain view, don't create a Controller method, just use `Route::view()` function.

```php
// Instead of this
Route::get('about', 'TextsController@about');
// And this
class TextsController extends Controller
{
    public function about()
    {
        return view('texts.about');
    }
}
// Do this
Route::view('about', 'texts.about');
```

### Blade @auth

Instead of if-statement to check logged in user, use `@auth` directive.

Typical way:

```blade
@if(auth()->user())
    // The user is authenticated.
@endif
```

Shorter:

```blade
@auth
    // The user is authenticated.
@endauth
```

The opposite is `@guest` directive:

```blade
@guest
    // The user is not authenticated.
@endguest
```

### Two-level $loop variable in Blade

In Blade's foreach you can use $loop variable even in two-level loop to reach parent variable.

```blade
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->parent->first)
            This is first iteration of the parent loop.
        @endif
    @endforeach
@endforeach
```

### Create Your Own Blade Directive

It’s very easy - just add your own method in `app/Providers/AppServiceProvider.php`. For example, if you want to have this for replace `<br>` tags with new lines:

```blade
<textarea>@br2nl($post->post_text)</textarea>
```

Add this directive to AppServiceProvider’s `boot()` method:

```php
public function boot()
{
    Blade::directive('br2nl', function ($string) {
        return "<?php echo preg_replace('/\<br(\s*)?\/?\>/i', \"\n\", $string); ?>";
    });
}
```

### Blade Directives: IncludeIf, IncludeWhen, IncludeFirst

If you are not sure whether your Blade partial file actually would exist, you may use these condition commands:

This will load header only if Blade file exists

```blade
@includeIf('partials.header')
```

This will load header only for user with role_id 1

```blade
@includeWhen(auth()->user()->role_id == 1, 'partials.header')
```

This will try to load adminlte.header, if missing - will load default.header

```blade
@includeFirst('adminlte.header', 'default.header')
```

### Use Laravel Blade-X variable binding to save even more space

```blade
// Using include, the old way
@include("components.post", ["title" => $post->title])

// Using Blade-X
<x-post link="{{ $post->title }}" />

// Using Blade-X variable binding
<x-post :link="$post->title" />
```

### Blade components props

```blade
// button.blade.php
@props(['rounded' => false])

<button {{ $attributes->class([
    'bg-red-100 text-red-800',
    'rounded' => $rounded
    ]) }}>
    {{ $slot }}
</button>

// view.blade.php
// Non-rounded:
<x-button>Submit</x-button>

// Rounded:
<x-button rounded>Submit</x-button>
```

### Blade Autocomplete typehint

```blade
@php
    /* @var App\Models\User $user */
@endphp

<div>
    // your ide will typehint the property for you
    {{$user->email}}
</div>
```

### Component Syntax Tip

Did you know that if you pass colon (:) before the component parameter, you can directly pass variables without print statement `{{ }}`?

```blade
<x-navbar title="{{ $title }}"/>

// you can do instead

<x-navbar :title="$title"/>
```

### Automatically highlight nav links

Automatically highlight nav links when exact URL matches, or pass a path or route name pattern.

A Blade component with request and CSS classes helpers makes it ridiculously simple to show active/inactive state.

```php
class NavLink extends Component
{
    public function __construct($href, $active = null)
    {
        $this->href = $href;
        $this->active = $active ?? $href;
    }

    public function render(): View
    {
        $classes = ['font-medium', 'py-2', 'text-primary' => $this->isActive()];

        return view('components.nav-link', [
            'class' => Arr::toCssClasses($classes);
        ]);
    }

    protected function isActive(): bool
    {
        if (is_bool($this->active)) {
            return $this->active;
        }

        if (request()->is($this->active)) {
            return true;
        }

        if (request()->fullUrlIs($this->active)) {
            return true;
        }

        return request()->routeIs($this->active);
    }
}
```

```blade
<a href="{{ $href }}" {{ $attributes->class($class) }}>
    {{ $slot }}
</a>
```

```blade
<x-nav-link :href="route('projects.index')">Projects</x-nav-link>
<x-nav-link :href="route('projects.index')" active="projects.*">Projects</x-nav-link>
<x-nav-link :href="route('projects.index')" active="projects/*">Projects</x-nav-link>
<x-nav-link :href="route('projects.index')" :active="$tab = 'projects'">Projects</x-nav-link>
```

### Cleanup loops

Did you know the Blade `@each` directive can help cleanup loops in your templates?

```blade
// good
@foreach($item in $items)
    <div>
        <p>Name: {{ $item->name }}
        <p>Price: {{ $item->price }}
    </div>
@endforeach

// better (HTML extracted into partial)
@each('partials.item', $items, 'item')
```

### Simple way to tidy up your Blade views

A simple way to tidy up your Blade views!

Use the `forelse loop`, instead of a `foreach loop` nested in an if statement

```blade
<!-- if/loop combination -->
@if ($orders->count())
    @foreach($orders as $order)
        <div>
            {{ $order->id }}
        </div>
    @endforeach
@else
    <p>You haven't placed any orders yet.</p>
@endif

<!-- Forelse alternative -->
@forelse($orders as $order)
    <div>
        {{ $order->id }}
    </div>
@empty
    <p>You haven't placed any orders yet.</p>
@endforelse
```

### Checked blade directive

In Laravel 9, you'll be able to use the cool new "checked" Blade directive.

This is going to be a nice addition that we can use to clean up our Blade views a little bit

```blade
// Before Laravel 9:
<input type="radio" name="active" value="1" {{ old('active', $user->active) ? 'checked' : '' }}/>
<input type="radio" name="active" value="0" {{ old('active', $user->active) ? '' : 'checked' }}/>

// Laravel 9
<input type="radio" name="active" value="1" @checked(old('active', $user->active))/>
<input type="radio" name="active" value="0" @checked(!old('active', $user->active))/>
```

### Selected blade directive

In Laravel 9, you'll be able to use the cool new "selected" Blade directive for HTML select elements.

This is going to be a nice addition that we can use to clean up our Blade views a little bit

```blade
// Before Laravel 9:
<select name="country">
    <option value="India" {{ old('country') ?? $country == 'India' ? 'selected' : '' }}>India</option>
    <option value="Pakistan" {{ old('country') ?? $country == 'Pakistan' ? 'selected' : '' }}>Pakistan</option>
</select>

// Laravel 9
<select name="country">
    <option value="India" @selected(old('country') ?? $country == 'India')>India</option>
    <option value="Pakistan" @selected(old('country') ?? $country == 'Pakistan')>Pakistan</option>
</select>
```
