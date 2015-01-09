<?php namespace Superpowers\Models;

use \Superpowers\Traits\GetModelTrait;

class Media extends \Eloquent {

	use GetModelTrait;

	protected $fillable = ['name', 'media_url', 'media_type'];
	protected $table = "media";

	public function atoms()
	{
		return $this->morphedByMany('\Superpowers\Models\Atom', 'mediable');
	}

}
