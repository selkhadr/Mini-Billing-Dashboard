<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return Invoice::with('customer')->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:paid,unpaid',
            'invoice_date' => 'required|date'
        ]);

        return Invoice::create($validated);
    }

    public function show(Invoice $invoice)
    {
        return $invoice->load('customer');
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:paid,unpaid',
            'invoice_date' => 'required|date'
        ]);

        $invoice->update($validated);
        return $invoice;
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->json(['message' => 'Invoice deleted']);
    }
}