<?php

use Illuminate\Support\Facades\Route;
use Modules\Account\Http\Controllers\AccountController;
use Modules\Account\Http\Controllers\PasswordController;

Route::middleware('auth')->group(function () {
    Route::redirect('account', '/account/profile');

    Route::get('account/profile', [AccountController::class, 'edit'])->name('profile.edit');
    Route::patch('account/profile', [AccountController::class, 'update'])->name('profile.update');
    Route::delete('account/profile', [AccountController::class, 'destroy'])->name('profile.destroy');

    Route::get('account/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('account/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('account/appearance', function () {
        return \Inertia\Inertia::render('Account::appearance');
    })->name('appearance');
});
