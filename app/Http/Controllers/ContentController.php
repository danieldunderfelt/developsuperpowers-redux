<?php namespace Superpowers\Http\Controllers;

use \Superpowers\AtomCollection as Collection;
use \Superpowers\Atom;

class ContentController extends Controller {

	protected $collection;
	protected $atom;

	public function __construct(Collection $collection, Atom $atom)
	{
		$this->collection = $collection;
		$this->atom = $atom;
	}

	/**
	 * Shortcut for displaying homepage content
	 * @return View Returns html with atom collection representing the home page.
	 */
	public function home()
	{
		return \View::make('pages.home');
	}

	public function view($identifier)
	{
		$collection = $this->collection->get($identifier);
		$collection->atoms = \Atom::wrap($collection);

		return \View::make('pages.collection', [
			'collection' => $collection
		]);
	}

}