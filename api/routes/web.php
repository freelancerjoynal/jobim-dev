<?php

use App\Http\Controllers\HotJobsController;
use App\Http\Controllers\JobAreaController;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\ProfileController;

use Illuminate\Support\Facades\Route;


Route::get('/', [JobPostController::class, 'getAllJobPost'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    //Job Post controllers
    Route::delete('/job-posts/{id}', [JobPostController::class, 'destroy'])->name('job-posts.destroy');
    
    
    //External Job creation with external Link
    Route::get('/external-job', [JobPostController::class, 'showExternalJobs'])->name('show.external.job');
    Route::post('/create-external-job', [JobPostController::class, 'externalJobCreation'])->name('create.external.job');
    




    Route::get('/professions', [ProfessionController::class, 'showProfessions'])->name('professions');
    Route::post('/create-professions', [ProfessionController::class, 'createProfession'])->name('create.professions');
    Route::get('/professions-delete/{id}', [ProfessionController::class, 'deleteProfession'])->name('professions.delete'); 





    Route::get('/job-area', [JobAreaController::class, 'showJobArea'])->name('job.area');



    //Routes for hot jobs carousel
    Route::get('/hot-jobs', [HotJobsController::class, 'showHotJobs'])->name('hot.jobs');
    Route::POST('/add-new-hot-job', [HotJobsController::class, 'addNewHotJob'])->name('new.hot.job');
    Route::get('/delete-hot-job/{id}', [HotJobsController::class, 'deleteHotJob'])->name('delete.hot.job');





});

require __DIR__.'/auth.php';
