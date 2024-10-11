<?php

use App\Http\Controllers\api\ApiCreateAndSearchController;
use App\Http\Controllers\api\ApiJobPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/create-post',[ApiCreateAndSearchController::class, 'createPost'] );
Route::post('/create-image',[ApiCreateAndSearchController::class, 'createImagePost'] );





Route::get('/posts',[ApiJobPostController::class, 'getAllPost'] );
Route::get('/get-hot-jobs',[ApiJobPostController::class, 'getHotJobs'] );
Route::get('/get-professions',[ApiCreateAndSearchController::class, 'getProfessions'] );
Route::get('/post-details/{postid}', [ApiJobPostController::class, 'getPostDetails']);

Route::get('/search-post/{search}', [ApiJobPostController::class, 'searchPost']);




Route::get('/get-areas',[ApiCreateAndSearchController::class, 'getAreas'] );


Route::post('/filter-post',[ApiCreateAndSearchController::class, 'filterPost'] );



