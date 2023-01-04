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
        Schema::create('password_resets', function (Blueprint $table) {
            $table->smallIncrements("slNo");
            $table->string('token', 150)->unique();
            $table->string('phone', 15);
            $table->string('otp', 6);
            $table->string('status', 10)->default('PROCEED');
            $table->string('rpt', 150)->default('dfs8i9e99goiwlkberw5her674wi6hel5r5j432kbdff')->comment('rpt-> Reset Password Token, This token use when user reset password after otp entered');
            $table->smallInteger('otp_try', false, true)->default(0);
            $table->smallInteger('otp_send', false, true)->default(0);
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('password_resets');
    }
};
