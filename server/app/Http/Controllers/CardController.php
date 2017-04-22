<?php

namespace App\Http\Controllers;


use App\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $cards = Card::all();
        return response($cards);
    }

    public function create(Request $request)
    {
        $input = $request->all();
        $card = new Card;
        $card->uid = $input['uid'];
        $card->batch_key = $input['batch_key'];
        $card->store_id = $input['store_id'];
        $card->holder_name = '';
        $card->pin = '';
        $card->contact_number = '';
        $card->email_address = '';
        $card->address = '';
        $card->age = '';
        $card->sex = '';
        $card->birth_date = '';
        $card->civil_status = '';
        $card->date_registered = '';
        $card->date_expiration = '';
        $card->points = 0;
        $card->amount = 0;
        $card->is_imported = false;
        $card->is_active = true;
        $card->save();

        return response($card);
    }

    public function update(Request $request)
    {

    }

    public function delete(Request $request)
    {

    }
}