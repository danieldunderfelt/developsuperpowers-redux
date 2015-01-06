<?php namespace Superpowers\Models;

class Media extends \Eloquent {

	protected $fillable = ['name', 'media_url', 'media_type'];
	protected $table = "media";

	public function atoms()
	{
		return $this->morphedByMany('Atom', 'mediable');
	}

}
