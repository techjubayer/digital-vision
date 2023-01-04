<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seller_employ', function (Blueprint $table) {
            $table->smallIncrements("slNo");
            $table->string('id', 10)->unique();
            $table->string('sellerId', 10);
            $table->string('phone', 15)->unique();
            $table->string('name', 30)->nullable();
            $table->integer('isActive', false, true)->default(1);
            $table->string('password', 150);
            $table->rememberToken('token', 150)->default('dfs8i9e99goiwlkberw5her674wi6hel5r5j432kbdff');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seller_employ');
    }
};
