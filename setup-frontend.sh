#!/bin/bash

echo "🚀 Setting up Frontend..."

cd backend/frontend || { echo "❌ Frontend directory not found"; exit 1; }

echo "Installing npm dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "To start the development server, run:"
echo "cd backend/frontend && npm run dev"
echo ""