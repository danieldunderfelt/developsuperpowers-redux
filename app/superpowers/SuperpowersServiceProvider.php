<?php namespace Superpowers;

use Illuminate\Support\ServiceProvider;

class SuperpowersServiceProvider extends ServiceProvider {

	public function register()
	{
		\App::bind('contentatom', 'Superpowers\App\Atom');
	}

}