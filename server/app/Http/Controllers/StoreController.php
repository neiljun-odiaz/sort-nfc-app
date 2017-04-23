<?php

namespace App\Http\Controllers;


use App\Store;
use App\Card;
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

        // Check if Store Key is already taken
        if (!$this->checkKeyExist($input['key'])) {
            $result = array(
                'result' => false,
                'message' => 'Store Key already taken. Please choose another.'
            );
            return response($result);
        }

        $store = new Store;
        $store->name = $input['name'];
        $store->key = $input['key'];
        $store->address = $input['address'];
        $store->date_created = Carbon\Carbon::now();
        $store->save();

        $result = array(
                'result' => true,
                'message' => 'Store Added!'
            );
        return response($result);
    }

    public function update(Request $request)
    {
        $input = $request->all();

        // Check if Store Key is already taken
        if (!$this->checkKeyExist($input['key'], $input['id'])) {
            $result = array(
                'result' => false,
                'message' => 'Store Key already taken. Please choose another.'
            );
            return response($result);
        }

        $store = Store::find($input['id']);
        $store->name = $input['name'];
        $store->key = $input['key'];
        $store->address = $input['address'];
        $store->save();

        $result = array(
                'result' => true,
                'message' => 'Store Updated!'
            );
        return response($result);
    }

    public function destroy(Request $request)
    {
        $input = $request->all();
        // Check if store have cards added for security
        $cards = Card::where('store_id',$input['id'])->count();
        if ($cards > 0) {
            $result = array(
                'result' => false,
                'message' => 'Store cannot be deleted. There are cards attached on this store.'
            );
            return response($result);
        }

        $store = Store::find($input['id']);
        $store->delete();
        $result = array(
                'result' => true,
                'message' => 'Store Deleted!'
            );
        return response($result);
    }

    private function checkKeyExist($key, $id='')
    {
        if (empty($id)){
            $storecheck = Store::where('key', $key)->count();
        } else {
            $storecheck = Store::where('key', $key)->where('id','<>', $id)->count();
        }
        if ($storecheck > 0) {
            return false;
        }
        return true;
    }
}