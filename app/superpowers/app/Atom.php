<?php namespace Superpowers\App;

class Atom {

	protected $atom;

	public function __construct(\Superpowers\Models\Atom $atom)
	{
		$this->atom = $atom;
	}

	public function display($identifier)
	{
		$atom = $this->atom->get($identifier);

		if($atom === false) {
			return "[NO ATOM FOUND]";
		}

		return $atom->content;
	}
}