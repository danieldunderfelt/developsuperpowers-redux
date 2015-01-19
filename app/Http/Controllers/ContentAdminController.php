<?php namespace Superpowers\Http\Controllers;

use \Superpowers\AtomCollection as Collection;
use \Superpowers\Atom;

class ContentAdminController extends Controller {

	protected $collection;
	protected $atom;

	public function __construct(Collection $collection, Atom $atom)
	{
		$this->collection = $collection;
		$this->atom = $atom;
	}

	public function saveAtom()
	{
		$data = \Input::get('atomData');
		$this->atom->save($data);

		return $this->respond(['data' => $data], true);
	}

	public function editAtom($id = "new")
	{
		$atomData = null;

		if($id !== "new") {
			$atomData = $this->atom->get();
		}

		$html = \View::make('edit.atom', [
			'atom' => $atomData
		])->render();

		return $this->respond([
			'data' => $atomData,
			'html' => $html
		], true);
	}

	public function newCollection(NewCollectionRequest $request) {
		$data = $request->get('collectionData');
		dd($data);
		$this->collection->save($data);

		return $this->respond(['data' => $data], true);
	}

	public function listCollections()
	{
		$data = $this->collection->listCollections();
		return $this->respond(['collections' => $data], true);
	}

	public function listAtoms()
	{
		$data = $this->atom->listAtoms();
		return $this->respond(['atoms' => $data], true);
	}

	public function respond($data, $status)
	{
		return \Response::json(array_merge([
			"success" => is_numeric($status) ? false : $status
		], $data), is_numeric($status) ? $status : 200);
	}

}