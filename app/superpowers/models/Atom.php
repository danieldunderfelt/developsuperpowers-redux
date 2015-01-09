<?php namespace Superpowers\Models;

use \Superpowers\Traits\GetModelTrait;

class Atom extends \Eloquent {

	use GetModelTrait;

	protected $fillable = ['name', 'content', 'description', 'stylesheet_url'];

	public function media()
	{
		return $this->morphToMany('\Superpowers\Models\Media', 'mediable');
	}

	public function collections()
	{
		return $this->morphedByMany('\Superpowers\Models\AtomCollection', 'atomizeable')->withPivot('order');
	}

}
