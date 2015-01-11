<?php namespace Superpowers\Models;

use Illuminate\Database\Eloquent\Model;
use \Superpowers\Traits\GetModelTrait;

class Media extends Model {

	use GetModelTrait;

	protected $fillable = ['name', 'media_url', 'media_type'];
	protected $table = "media";

	public function atoms()
	{
		return $this->morphedByMany('\Superpowers\Models\Atom', 'mediable');
	}

}
