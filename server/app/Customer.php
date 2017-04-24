<?php

namespace App;

use App\Card;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer';

    public $timestamps = false;

    public function card()
    {
        return $this->hasOne(Card::class);
    }
}