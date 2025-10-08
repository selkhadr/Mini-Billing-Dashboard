#!/bin/bash

echo "Setting up Laravel Backend..."


echo "Installing Composer dependencies..."
composer install || { echo "❌ Composer install failed"; exit 1; }

echo "Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi

echo "🔑 Generating application key..."
php artisan key:generate --force

echo "Setting up SQLite database..."
mkdir -p database
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    echo "✅ Database file created"
else
    echo "ℹ️  Database file already exists"
fi

echo "Running migrations..."
php artisan migrate --force || { echo "❌ Migration failed"; exit 1; }

echo "🌱 Seeding database (10 customers + 10 invoices)..."
php artisan db:seed --force || { echo "❌ Seeding failed"; exit 1; }

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "To start the API server, run:"
echo "cd backend && php artisan serve --host=127.0.0.1 --port=8000"
echo ""