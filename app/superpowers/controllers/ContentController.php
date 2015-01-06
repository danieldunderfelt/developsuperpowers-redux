<?php namespace Superpowers\Controllers;

use \Superpowers\Models\Page;
use \Superpowers\Models\Atom;

class ContentController extends \BaseController {

	protected $page;
	protected $atom;

	public function __construct(Page $page, Atom $atom)
	{
		$this->page = $page;
		$this->atom = $atom;
	}

	public function view($identifier)
	{
		$page = $this->page->get($identifier);

		return \View::make('pages.contentpage', [
			'page' => $page
		]);
	}

}