<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [App\Http\Controllers\AuthController::class,'login']);
    Route::post('logout', [App\Http\Controllers\AuthController::class,'logout']);
    Route::post('refresh', [App\Http\Controllers\AuthController::class,'refresh']);
    Route::post('me', [App\Http\Controllers\AuthController::class,'me']);

});

Route::middleware('auth:api')->group(function (){

    Route::get("/tweets/my",[App\Http\Controllers\TweetController::class, 'myTweets']);
    Route::get("/tweets/explore",[App\Http\Controllers\TweetController::class, 'explore']);
    Route::post("/tweets/create",[App\Http\Controllers\TweetController::class, 'create']);
    Route::post("/tweets/delete",[App\Http\Controllers\TweetController::class, 'delete']);
    Route::post("/tweets/retweet",[App\Http\Controllers\TweetController::class, 'retweet']);

    Route::post("/tweets/likeOrNot",[App\Http\Controllers\TweetController::class, 'likeOrNot']);
    Route::get("/tweets/getLikes",[App\Http\Controllers\TweetController::class, 'getLikes']);

    Route::get("/users/get" ,[App\Http\Controllers\UserController::class, 'getUser']);
    Route::post("/users/edit" ,[App\Http\Controllers\UserController::class, 'edit']);
    Route::post("/users/followOrNot" ,[App\Http\Controllers\UserController::class, 'followOrNot']);
});
