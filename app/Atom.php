<?php namespace Superpowers;

use \Superpowers\AtomCollection;
use \Superpowers\Models\Atom as AtomModel;

class Atom {

	protected $atom;
	protected $atomCollection;

	public function __construct(AtomModel $atom, AtomCollection $atomCollection)
	{
		$this->atom = $atom;
		$this->atomCollection = $atomCollection;
	}

	public function display($identifier)
	{
		$atom = $this->atom->get($identifier);

		if($atom === false) {
			return false;
		}

		return $this->getAtomWrapper($atom);
	}

	public function get($identifier)
	{
		$atom = $this->atom->get($identifier);
		return $atom;
	}

	public function listAtoms()
	{
		$data = $this->atom->listAll();
		return $data->toJson();
	}

	public function save($data)
	{
		if($data['id'] !== "false") {
			$atom = $this->atom->find($data['id']);
			$atom->content = $data['content'];
			$atom->name = $data['name'];
			$atom->description = $data['description'];
			$atom->save();
		}
		else {
			$newAtom = $this->atom->create($data);
		}
	}

	public function wrap($model)
	{
		$atoms = $model->atoms;
		$atomCollection = [];

		if($atoms->count() > 0) {
			foreach($atoms as $atom) {
				$order = $atom->pivot->order;
				$wrappedAtom = $this->getAtomWrapper($atom);
				$atomCollection[$order] = $wrappedAtom;
			}

			ksort($atomCollection, SORT_NUMERIC);
		}

		return $atomCollection;
	}

	private function getAtomWrapper($atom) {

		return \View::make('includes.atomwrapper', [
			'atom' => $atom
		])->render();
	}
}