<?php namespace Superpowers\Models;

use Illuminate\Database\Eloquent\Model;
use \Superpowers\Traits\GetModelTrait;
use \Superpowers\Traits\ListRecordsTrait;

class AtomCollection extends Model {

	use GetModelTrait, ListRecordsTrait;

	protected $table = 'collections';
	protected $fillable = ['name', 'tags', 'attributes', 'stylesheet_url'];

	public function atoms()
	{
		return $this->morphToMany('\Superpowers\Models\Atom', 'atomizeable')->withPivot('order');
	}

}
