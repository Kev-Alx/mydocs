<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/published', [DocumentController::class, 'index'])->name('published');

Route::get('/preview/{document}', [DocumentController::class, 'preview'])->name('preview');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'documents' => auth()->user()->documents()->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/settings', function () {
    return Inertia::render('Settings', [
        'user' => auth()->user(),

    ]);
})->middleware(['auth', 'verified'])->name('settings');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/{document}', [DocumentController::class, 'show'])->name('documents.show');

    Route::put('/documents/{document}', [DocumentController::class, 'update'])->name('documents.update');

    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');

    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::put('/profile', [ProfileController::class, 'settings'])->name('profile.put');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
