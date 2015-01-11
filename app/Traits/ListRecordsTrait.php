<?php namespace Superpowers\Traits;

trait ListRecordsTrait {

	public function listAll()
	{
		$data = $this->all();
		return $data;
	}
}