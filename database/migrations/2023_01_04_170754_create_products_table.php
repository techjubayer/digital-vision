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
        Schema::create('products', function (Blueprint $table) {
            $table->id("slNo")->autoIncrement();
            $table->string('id', 10)->unique();
            $table->string('sellerId', 10);
            $table->string('prodName', 100);
            $table->string('privacy', 10)->default('public')->comment('public/private');
            $table->string('aprove', 5)->default('no')->comment('yes/no');
            $table->float('cost', 6, 4, false)->default(0);
            $table->float('rs', 6, 4, false)->comment('Retail Price')->default(0);
            $table->float('ws', 6, 4, false)->comment('Wholesale Price')->default(0);
            $table->smallInteger('quantity', false, true)->default(0)->comment('How many products are available');
            $table->smallInteger('sold', false, true)->default(0)->comment('How many products are sold');
            $table->smallInteger('minOrder', false, true)->default(1)->comment('How many min quantity wholesale user can order');
            $table->string('colors', 100)->nullable();
            $table->string('images', 200)->nullable();
            $table->string('category', 100)->nullable();
            $table->string('shopCat', 100)->nullable()->comment('From what king of shop this product belongs');
            $table->string('desc', 200)->nullable();
            $table->string('comment', 100)->nullable()->comment('This is only for admin comment purpose');
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
        Schema::dropIfExists('products');
    }
};
