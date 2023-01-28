<?php
date_default_timezone_set('Asia/Kolkata');

use App\Http\Controllers\Seller\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post("/signup", [AuthController::class, "userSignUp"]);
Route::post("/login", [AuthController::class, "userLogin"]);
// Route::post("/genpass", [AuthController::class, "genFrontendPass"]);

Route::group(['middleware' => ['userLoginCheck']], function () {
    Route::post("/userDetails", [AuthController::class, "getUserDetails"]);
    Route::post("/update-profile", [AuthController::class, "updateProfile"]);
});
