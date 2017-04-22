<?php

namespace App\Http\Controllers;


use App\Store;
use Carbon;
use Illuminate\Http\Request;

class StoreController extends Controller
{

    public function index()
    {
        $store = Store::all();
        return response($store);
    }

    public function create(Request $request)
    {
        $input = $request->all();

        $store = new Store;
        $store->name = $input['name'];
        $store->key = $input['key'];
        $store->address = $input['address'];
        $store->date_created = Carbon\Carbon::now();
        $store->save();

        return response($store);
    }

    public function update(Request $request)
    {

    }

    public function delete(Request $request)
    {

    }
}