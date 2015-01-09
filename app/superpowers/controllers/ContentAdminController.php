<?php namespace Superpowers\Controllers;

use \Superpowers\App\AtomCollection as Collection;
use \Superpowers\App\Atom;

class ContentAdminController extends \BaseController {

	protected $page;
	protected $atom;

	public function __construct(Collection $collection, Atom $atom)
	{
		$this->page = $collection;
		$this->atom = $atom;
	}

	public function newAtom()
	{
		$data = \Input::get('atomData');
		$this->atom->create($data);

		return $this->respond([], true);
	}

	public function respond($data, $status)
	{
		return \Response::json(array_merge([
			"success" => is_numeric($status) ? false : $status
		], $data), is_numeric($status) ? $status : 200);
	}

}