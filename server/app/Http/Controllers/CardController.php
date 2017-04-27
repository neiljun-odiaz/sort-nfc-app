<?php

namespace App\Http\Controllers;


use App\Card;
use App\Store;

use Illuminate\Http\Request;

class CardController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $cards = Card::with('store')->get();
        return response($cards);
    }

    public function create(Request $request)
    {
        try {
            $input = $request->all();

            // Check if Card already pre-registered.
            $check = Card::where('uid', $input['uid'])->count();
            if ($check > 0) {
                $result = array(
                    'result' => false,
                    'message' => 'Card already Pre-Registered!'
                );
                return response($result);
            }

            $card = new Card;
            $card->uid = $input['uid'];
            $card->batch_key = $input['batch_key'];
            $card->store_id = $input['store_id'];
            $card->date_registered = '';
            $card->date_expiration = '';
            $card->is_imported = false;
            $card->is_active = true;
            $card->save();

            $store = Store::find($input['store_id']);

            $saved_card = array(
                    'id' => $card->id,
                    'uid' => $card->uid,
                    'batch_key' => $card->batch_key,
                    'store_id' => $card->store_id,
                    'store' => $store,
                );

            $result = array(
                    'result' => true,
                    'message' => 'Card pre registered!',
                    'card' => $saved_card
                );
        } catch(\Exception $e) {
            $result = array(
                    'result' => false,
                    'message' => $e->getMessage()
                );
        }

        return response($result);
    }

    public function result(Request $request)
    {
        try {
            $cards = $request->all();
            foreach ($cards as $card) {
                $card_id = $card['id'];
                $c_update = Card::find($card_id);
                $c_update->is_imported = true;
                $c_update->save();
            }
            $result = array(
                    'result' => true,
                    'message' => 'Card is_imported set to true.'
                );
        } catch(\Exception $e) {
            $result = array(
                    'result' => false,
                    'message' => $e->getMessage()
                );
        }

        return response($result);
    }

    public function update(Request $request)
    {

    }

    public function delete(Request $request)
    {

    }
}