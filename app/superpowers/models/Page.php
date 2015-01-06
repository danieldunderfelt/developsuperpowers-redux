<?php namespace Superpowers\Models;

class Page extends \Eloquent {

	protected $fillable = ['slug', 'title', 'stylesheet_url'];

	public function atoms()
	{
		return $this->morphToMany('\Superpowers\Models\Atom', 'atomizeable');
	}

	public function get($identifier)
	{
		if(is_numeric($identifier)) {
			$page = $this->find($identifier);
		}
		else {
			$page = $this->where('slug', $identifier)->first();
		}

		$page->load('atoms');

		return $page;
	}

}
