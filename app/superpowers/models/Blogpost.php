<?php namespace Superpowers\Models;

class Blogpost extends \Eloquent {

	protected $fillable = ['slug', 'title', 'author', 'stylesheet_url'];

	public function atoms()
	{
		return $this->morphToMany('Atom', 'atomizeable');
	}

}
