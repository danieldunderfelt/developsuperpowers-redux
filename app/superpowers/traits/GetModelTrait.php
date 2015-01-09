<?php namespace Superpowers\Traits;

trait GetModelTrait {

	public function get($identifier)
	{
		$data;

		if(is_numeric($identifier)) {
			$data = $this->find($identifier);
		}
		else {
			$data = $this->where('name', $identifier)->first();
		}

		if($data === null) {
			return false;
		}

		return $data;
	}
}