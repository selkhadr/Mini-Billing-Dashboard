# Mini-Billing-Dashboard

## Submission
- **Approach (Laravel‑focused)**: I treated this as a production API: clear domain modeling (Customers, Invoices), explicit migrations/factories/seeders, and lean REST controllers. Input is validated server‑side; responses are consistent JSON with proper status codes. Eloquent relationships power simple aggregations (dashboard stats) and include relationships (invoice → customer) where needed. The API is CORS‑enabled and resilient to validation/logic errors.
- **Challenges**: Designing clean validation/error contracts for the frontend, keeping seeds deterministic but realistic, and computing dashboard aggregates efficiently without over‑fetching.

## Quick Setup Instructions

### Prerequisites
- PHP 8.1+ with Composer
- Node.js 18+ with npm
- Git

### Automated Setup 

1. **Clone the repository**
```bash
git clone <your-repo-url>.git
cd <your-project-name>
```

2. **Make setup scripts executable**
```bash
chmod +x setup-backend.sh setup-frontend.sh
```

3. **Run backend setup**
```bash
./setup-backend.sh
```

4. **Run frontend setup**
```bash
./setup-frontend.sh
```

5. **Start the servers**

**Terminal 1 - Backend API:**
```bash
php artisan serve --host=127.0.0.1 --port=8000
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev
```

## Laravel approach (details)
- **Architecture**: Route → Controller → Eloquent Model. Controllers remain thin; they validate input and delegate to the model layer. Dashboard stats are computed with aggregate queries.
- **Data model**: `Customer` has many `Invoice`. Migrations define proper types and indexes; factories + seeders generate realistic data (10 customers, 10 invoices) for instant UX.
- **Validation**: All write operations are validated; errors follow Laravel's `{ message, errors: { field: [..] } }` contract used by the client.
- **Serialization**: Endpoints return JSON only, with related models when useful (e.g., invoices include `customer`).
- **Error handling**: Proper HTTP status codes, guarded operations, and safe fallbacks to keep the client resilient.
- **CORS**: Configured to allow the Next.js dev server to consume the API locally.

## API overview
- `GET /api/dashboard/stats` — aggregate counts and revenue
- `GET /api/customers`, `POST /api/customers`, `PUT /api/customers/{id}`, `DELETE /api/customers/{id}`
- `GET /api/invoices`, `POST /api/invoices`, `PUT /api/invoices/{id}`, `DELETE /api/invoices/{id}`

## Frontend (brief)
Next.js App Router client that consumes the Laravel API. UI is split into `components/ui` (pure presentation) and `components/custom` (stateful UI). Server calls centralized under `src/server/` and pure helpers under `src/lib/utils/`.

## Troubleshooting

### Common Issues

**Backend errors:**
- Ensure PHP 8.1+ is installed: `php --version`
- Check Composer is installed: `composer --version`
- If migrations fail, delete `database/database.sqlite` and run setup again

**Frontend errors:**
- Ensure Node.js 18+ is installed: `node --version`
- Clear npm cache if install fails: `npm cache clean --force`
- Check that backend API is running on port 8000

**CORS issues:**
- Verify the backend `.env` has correct `FRONTEND_URL` configured
- Restart the Laravel server after changing `.env`

## Project Structure
```
├── # Mini-Billing-Dashboard/              # Laravel API
│   ├── app/             # Application code
│   ├── database/        # Migrations, seeders, factories
│   ├── routes/          # API routes
│   └── frontend/        # Next.js frontend
│       ├── src/         # Frontend source
│       └── components/  # React components
├── setup-backend.sh     # Automated backend setup
└── setup-frontend.sh    # Automated frontend setup
```