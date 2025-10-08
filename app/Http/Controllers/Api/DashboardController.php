<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;

class DashboardController extends Controller
{
    public function stats()
    {
        return [
            'total_customers' => Customer::count(),
            'total_invoices' => Invoice::count(),
            'paid_invoices' => Invoice::where('status', 'paid')->count(),
            'unpaid_invoices' => Invoice::where('status', 'unpaid')->count(),
            'total_revenue' => Invoice::where('status', 'paid')->sum('amount')
        ];
    }
}