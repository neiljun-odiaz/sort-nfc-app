<?php

namespace App;

use App\Store;
use App\Customer;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $table = 'card';

    public $timestamps = false;

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}