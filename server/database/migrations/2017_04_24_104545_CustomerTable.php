<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CustomerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('card_id');
            $table->string('firstname');
            $table->string('lastname');
            $table->integer('pin');
            $table->string('contact_number');
            $table->string('email_address');
            $table->text('address');
            $table->integer('age');
            $table->string('sex');
            $table->date('birth_date');
            $table->string('civil_status');
            $table->integer('points');
            $table->integer('amount');
            $table->boolean('is_active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('customer');
    }
}
