#!/bin/bash

echo "🚀 Setting up Frontend..."

cd frontend || { echo "❌ Frontend directory not found"; exit 1; }

echo "Installing npm dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "To start the development server, run:"
echo "cd frontend && npm run dev"
echo ""