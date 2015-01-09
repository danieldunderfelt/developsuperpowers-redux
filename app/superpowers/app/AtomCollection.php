<?php namespace Superpowers\App;

use \Superpowers\Models\AtomCollection as Collection;

class AtomCollection {

	protected $atomCollection;

	public function __construct(Collection $atomCollection)
	{
		$this->atomCollection = $atomCollection;
	}

	public function get($collectionData)
	{
		$collection = $this->atomCollection->firstOrCreate($collectionData);
		return $collection;
	}
}