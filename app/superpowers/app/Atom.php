<?php namespace Superpowers\App;

use \Superpowers\App\AtomCollection;
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
			return "";
		}

		return $atom->content;
	}

	public function create($data)
	{
		foreach($data as $atomData) {
			$newAtom = $this->atom->create($atomData);

			if(isset($atomData['collection'])) {
				$collection = $this->atomCollection->get($atomData['collection']);
				$collection->attach($newAtom, ['order' => $atomData['order']]);
			}
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