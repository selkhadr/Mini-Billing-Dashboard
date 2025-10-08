<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Customer;
use App\Models\Invoice;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create a single user if not exists to avoid unique email conflicts
        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        $customers = Customer::factory(10)->create();

        // Create 10 invoices and randomly assign to customers
        foreach (range(1, 10) as $i) {
            Invoice::factory()->create([
                'customer_id' => $customers->random()->id,
            ]);
        }
    }
}
