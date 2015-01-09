<?php namespace Superpowers\Models;

use \Superpowers\Traits\GetModelTrait;

class AtomCollection extends \Eloquent {

	use GetModelTrait;

	protected $table = 'collections';
	protected $fillable = ['name', 'tags', 'attributes', 'stylesheet_url'];

	public function atoms()
	{
		return $this->morphToMany('\Superpowers\Models\Atom', 'atomizeable')->withPivot('order');
	}

}
