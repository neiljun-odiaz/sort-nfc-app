<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->group(['prefix' => 'api'], function () use ($app) {
    $app->post('auth/login', 'UserController@login');
    $app->post('store/cards', 'StoreController@cards');
    $app->post('cards/import-result', 'CardController@result');
});

$app->group(['prefix' => 'api', 'middleware' => 'auth'], function () use ($app) {
    // Cards
    $app->post('card', 'CardController@create');
    $app->get('card', 'CardController@index');

    // Stores
    $app->get('store', 'StoreController@index');
    $app->post('store', 'StoreController@create');
    $app->post('store/update', 'StoreController@update');
    $app->post('store/delete', 'StoreController@destroy');
});