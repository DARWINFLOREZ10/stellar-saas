# Stellar SaaS Platform — Portfolio Case Study

I designed and built this project to demonstrate how I approach a production‑ready SaaS: clean API architecture, secure auth with JWT + RBAC, a simple dashboard UI, automated tests, and containerized deployment. It’s intentionally minimal but complete end‑to‑end.

## Elevator Pitch
- Full‑stack SaaS skeleton with users, organizations, memberships, and projects.
- Authentication and authorization that mirrors common enterprise needs.
- Clean separation of concerns: controllers → middleware → services → data.
- Runs easily in two modes: Demo (SQLite) and Production (Postgres/Docker).

## What’s Included
- Authentication: register, login, JWT access tokens.
- RBAC: `ADMIN`, `MANAGER`, `USER` enforced at route level.
- Entities: `User`, `Organization`, `Membership`, `Project`.
- Dashboard: login, create project, list projects.
- ORM: Prisma with migrations and seeding.
- Dev tooling: Jest + Supertest, GitHub Actions CI.

## Architecture Overview
- Backend: Node.js + TypeScript + Express.
	- Routes: `src/modules/*` (auth, users, projects, organizations).
	- Middleware: `authenticate` (JWT), `requireRole` (RBAC), `errorHandler`.
	- Config: environment, Prisma client.
- Frontend: Next.js 14 (App Router) + Tailwind.
	- Pages: `login`, `register`, `dashboard`.
	- Client: Axios wrapper with automatic JWT header from localStorage.

## Data Model
- User: id, email, password (bcrypt), role.
- Organization: id, name.
- Membership: links a user to an organization with a member role.
- Project: owned by a user, has name and optional description.

## Security
- Passwords: hashed with `bcrypt`.
- JWT: `Authorization: Bearer <token>`; checked per request.
- RBAC: route middleware `requireRole('ADMIN' | 'MANAGER' | 'USER')`.

## Demo Mode (SQLite) — No Docker Required
I provide a demo path using SQLite so reviewers can run the app fast without installing Postgres.

1) Backend (Windows PowerShell commands shown)
```powershell
cd stellar-saas/backend
npx prisma generate --schema prisma/schema.sqlite.prisma
npx prisma migrate dev --name init --schema prisma/schema.sqlite.prisma
npx ts-node prisma/seed.ts
npm run build
node dist/server.js
```
Backend API: http://localhost:4000 (health at `/health`)

2) Frontend
```powershell
cd stellar-saas/frontend
npm install
npm run dev
```
Web app: http://localhost:3000

3) Login (seeded)
- Admin: `admin@example.com` / `Admin123!`

4) Quick Demo Flow
- Sign in → go to Dashboard → create a Project → it appears under "My Projects".

## Production Mode (Docker + Postgres)
If Docker Desktop is available:
```bash
docker-compose up -d
```
Then run backend migrations and seed against Postgres if needed:
```bash
cd stellar-saas/backend
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

## Environment
Copy `.env.example` to `.env` and adjust secrets/URLs as needed.

```env
# Backend
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stellar_saas?schema=public"
JWT_SECRET="replace_with_a_strong_secret"
PORT=4000

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

## API Overview
- Auth
	- POST `/api/auth/register`
	- POST `/api/auth/login`
	- GET `/api/auth/me` (requires `Authorization`)
- Users
	- GET `/api/users` (requires `ADMIN`)
- Projects
	- POST `/api/projects` (auth)
	- GET `/api/projects` (auth)
- Organizations
	- POST `/api/organizations` (auth)
	- GET `/api/organizations` (auth)

## Testing & CI
- Backend unit/integration tests with Jest + Supertest.
- GitHub Actions runs install/build/tests on push to `main`.

## Why I Built It This Way
- Type‑safe, testable backend with Prisma and TypeScript.
- Realistic auth + RBAC — common in SaaS and enterprise projects.
- Next.js App Router for modern React routing and server features.
- Two run modes to lower friction: SQLite for demo, Postgres for real.

## Roadmap
- Billing skeleton (Stripe‑ready hooks).
- Audit logs & activity feed.
- Org invites & role management UI.
- E2E tests with Playwright.

---
If you’re reviewing this for hiring, I’m happy to extend it with billing, team management, and more robust testing on request. I built it to be straightforward to read, run, and evolve.
