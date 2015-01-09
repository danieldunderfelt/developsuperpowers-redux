<?php namespace Superpowers\Controllers;

use \Superpowers\Models\AtomCollection as Collection;
use \Superpowers\Models\Atom;

class ContentController extends \BaseController {

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
		$page = $this->collection->get($identifier);
		$page->atoms = \Atom::wrap($page);

		return \View::make('pages.contentpage', [
			'page' => $page
		]);
	}

}