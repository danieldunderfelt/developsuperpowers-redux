<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/* Homepage route */
Route::get('/', ['as' => 'home', 'uses' => 'ContentController@home']);


/* API routes */

// Get atom editor html
Route::post('/edit/atom/{id?}', ['as' => 'admin.edit.atom', 'uses' => 'ContentAdminController@editAtom']);
// Post atom data for saving, new or existing
Route::post('/save/atom', ['as' => 'admin.save.atom', 'uses' => 'ContentAdminController@saveAtom']);
// Attach an atom to a collection
Route::post('/attach/atom', ['as' => 'admin.attach.atom', 'uses' => 'ContentAdminController@attachAtom']);
// Post collection for saving new collection
Route::post('/new/collection', ['as' => 'admin.new.collection', 'uses' => 'ContentAdminController@newCollection']);
// List all atoms
Route::post('/list/atoms', ['as' => 'admin.list.atoms', 'uses' => 'ContentAdminController@listAtoms']);
// List all collections (pages, blogposts, whatever)
Route::post('/list/collections', ['as' => 'admin.list.collections', 'uses' => 'ContentAdminController@listCollections']);


/* Public routes */
Route::get('/{page}', ['as' => 'page.view.page', 'uses' => 'ContentController@view']);