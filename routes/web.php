<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('recharge/history', [AdminController::class, 'rechargeHistory'])->name('rechargeHistory');
    Route::get('recharge/history?', [AdminController::class, 'rechargeHistory'])->name('rechargeHistory');
    // Route::get('recharge/history/detail?', [AdminController::class, 'rechargeDetail'])->name('rechargeDetail');

});

Route::get('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');