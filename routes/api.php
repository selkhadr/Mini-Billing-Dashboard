

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\DashboardController;

Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

Route::apiResource('customers', CustomerController::class);
Route::apiResource('invoices', InvoiceController::class);