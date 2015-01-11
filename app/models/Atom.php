<?php namespace Superpowers\Models;

use Illuminate\Database\Eloquent\Model;
use \Superpowers\Traits\GetModelTrait;
use \Superpowers\Traits\ListRecordsTrait;

class Atom extends Model {

	use GetModelTrait, ListRecordsTrait;

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
