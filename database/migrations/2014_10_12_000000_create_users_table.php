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
        Schema::create('users', function (Blueprint $table) {
            $table->smallIncrements("slNo");
            $table->string('userId', 10)->unique();
            $table->string('phone', 15)->unique();
            $table->string('email', 40)->nullable();
            $table->string('name', 30)->nullable();
            $table->integer('isActive', false, true)->default(2)->comment('0:Reject by Admin, 1:Active User, 2:Request for Activation');
            $table->string('password', 150);
            $table->string('shopName', 30)->nullable();
            $table->string('marketName', 30)->nullable();
            $table->string('pinCode', 8)->nullable();
            $table->string('adress', 200)->nullable();
            $table->string('state', 30)->nullable();
            $table->string('country', 30)->nullable();
            $table->string('token', 150)->default('dfs8i9e99goiwlkberw5her674wi6hel5r5j432kbdff');
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
        Schema::dropIfExists('users');
    }
};
