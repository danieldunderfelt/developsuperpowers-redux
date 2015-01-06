<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAtomizeablesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('atomizeables', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('atom_id');
			$table->integer('atomizeable_id');
			$table->string('atomizeable_type');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('atomizeables');
	}

}
