<?php namespace Superpowers\Providers;

use Illuminate\Support\ServiceProvider;

class SuperpowersServiceProvider extends ServiceProvider {

	public function register()
	{
		$this->app->bind('atomrepo', '\Superpowers\Atom');
	}

}