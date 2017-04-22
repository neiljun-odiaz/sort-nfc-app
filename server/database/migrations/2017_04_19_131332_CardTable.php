<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card', function (Blueprint $table) {
            $table->increments('id');
            $table->string('holder_name');
            $table->string('uid');
            $table->integer('pin');
            $table->string('contact_number');
            $table->string('email_address');
            $table->text('address');
            $table->integer('age');
            $table->string('sex');
            $table->date('birth_date');
            $table->string('civil_status');
            $table->date('date_registered');
            $table->date('date_expiration');
            $table->integer('points');
            $table->integer('amount');
            $table->string('batch_key');
            $table->string('store_id');
            $table->boolean('is_imported');
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
        Schema::drop('card');
    }
}
