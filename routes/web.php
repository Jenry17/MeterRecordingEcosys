<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\MeterController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReadingsController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth:sanctum'])->resource('/company', CompanyController::class);
Route::middleware(['auth:sanctum'])->resource('/department', DepartmentController::class);
Route::middleware(['auth:sanctum'])->resource('/meter', MeterController::class);

Route::middleware(['auth:sanctum'])->group(function(){
Route::resource('/reading', ReadingsController::class);
Route::get('/reading/reset', [ReadingsController::class, 'resetMeter'])->middleware(['auth', 'verified'])->name('reading.resetMeter');
});

require __DIR__.'/auth.php';
