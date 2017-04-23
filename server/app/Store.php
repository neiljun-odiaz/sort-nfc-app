<?php

namespace App;

use App\Card;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $table = 'store';

    public $timestamps = false;

    public function cards()
    {
        return $this->hasMany(Card::class);
    }
}