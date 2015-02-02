<?php namespace Superpowers;

use \Superpowers\Models\AtomCollection as Collection;
use \Superpowers\Models\Atom;

class AtomCollection {

	protected $atomCollection;

	public function __construct(Collection $atomCollection)
	{
		$this->atomCollection = $atomCollection;
	}

	public function save($data)
	{
		$this->atomCollection->create($data);
	}

	public function attach(Atom $atom, $data)
	{
		$attachTo = $this->atomCollection->get($data->collection);
		$attachTo->atoms()->attach($data->atomId, ['order' => $data->order]);
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