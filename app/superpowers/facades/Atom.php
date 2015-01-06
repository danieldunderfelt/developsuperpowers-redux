<?php namespace Superpowers\Facades;

use Illuminate\Support\Facades\Facade;

class Atom extends Facade {

	protected static function getFacadeAccessor() {
		return 'contentatom';
	}

}