## Submission

- **GitHub**: [your-repo-url](https://example.com)
- **Approach (Laravel‑focused)**: I treated this as a production API: clear domain modeling (Users, Customers, Invoices), explicit migrations/factories/seeders, and lean REST controllers. Input is validated server‑side; responses are consistent JSON with proper status codes. Eloquent relationships power simple aggregations (dashboard stats) and include relationships (invoice → customer) where needed. The API is CORS‑enabled and resilient to validation/logic errors.
- **Challenges**: Designing clean validation/error contracts for the frontend, keeping seeds deterministic but realistic, and computing dashboard aggregates efficiently without over‑fetching.

## Backend setup (Laravel)

```bash
# 1) Clone and enter project
git clone <your-repo-url>.git
cd backend

# 2) Install dependencies
composer install

# 3) Environment + app key
cp .env.example .env
php artisan key:generate --force

# 4) SQLite database
mkdir -p database
[ -f database/database.sqlite ] || touch database/database.sqlite

# 5) Migrations + seed (10 customers + 10 invoices)
php artisan migrate --force
php artisan db:seed --force

# 6) Start API (keep this running)
php artisan serve --host=127.0.0.1 --port=8000
```

## Frontend setup (Next.js)

```bash
# New terminal tab/window
cd backend/frontend
npm install
npm run dev
```

## Laravel approach (details)

- **Architecture**: Route → Controller → Eloquent Model. Controllers remain thin; they validate input and delegate to the model layer. Dashboard stats are computed with aggregate queries.
- **Data model**: `Customer` has many `Invoice`. Migrations define proper types and indexes; factories + seeders generate realistic data (10 customers, 10 invoices) for instant UX.
- **Validation**: All write operations are validated; errors follow Laravel’s `{ message, errors: { field: [..] } }` contract used by the client.
- **Serialization**: Endpoints return JSON only, with related models when useful (e.g., invoices include `customer`).
- **Error handling**: Proper HTTP status codes, guarded operations, and safe fallbacks to keep the client resilient.
- **CORS**: Configured to allow the Next.js dev server to consume the API locally.

## API overview

- `GET /api/dashboard/stats` — aggregate counts and revenue
- `GET /api/customers`, `POST /api/customers`, `PUT /api/customers/{id}`, `DELETE /api/customers/{id}`
- `GET /api/invoices`, `POST /api/invoices`, `PUT /api/invoices/{id}`, `DELETE /api/invoices/{id}`

## Frontend (brief)

Next.js App Router client that consumes the Laravel API. UI is split into `components/ui` (pure presentation) and `components/custom` (stateful UI). Server calls centralized under `src/server/` and pure helpers under `src/lib/utils/`.
# Mini-Billing-Dashboard
