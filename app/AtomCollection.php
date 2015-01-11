<?php namespace Superpowers;

use \Superpowers\Models\AtomCollection as Collection;

class AtomCollection {

	protected $atomCollection;

	public function __construct(Collection $atomCollection)
	{
		$this->atomCollection = $atomCollection;
	}

	public function getObject($collectionData)
	{
		$collection = $this->atomCollection->firstOrCreate($collectionData);
		return $collection;
	}

	public function listCollections()
	{
		$data = $this->atomCollection->listAll();
		return $data->toJson();
	}

	public function get($identifier) {
		return $this->atomCollection->get($identifier);
	}
}