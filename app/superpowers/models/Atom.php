<?php namespace Superpowers\Models;

class Atom extends \Eloquent {

	protected $fillable = ['name', 'content', 'description', 'stylesheet_url'];

	public function media()
	{
		return $this->morphToMany('Media', 'mediable');
	}

	public function blogposts()
	{
		return $this->morphedByMany('Blogpost', 'atomizeable');
	}

	public function pages()
	{
		return $this->morphedByMany('Page', 'atomizeable');
	}

	public function get($identifier)
	{
		if(is_numeric($identifier)) {
			return $this->find($identifier);
		}
		else {
			return $this->where('name', $identifier)->first();
		}
	}

}
