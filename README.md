# Stellar SaaS Platform

A full‑stack SaaS platform built for portfolio showcase: production‑grade backend (Node.js + TypeScript + Express + Prisma + PostgreSQL) and modern frontend (Next.js 14 + Tailwind) with authentication, RBAC, dashboard, and projects CRUD. Containerized for local dev and CI‑ready.

## Features
- Authentication: register, login, JWT access tokens
- RBAC: roles (ADMIN, MANAGER, USER) enforced on API routes
- Multi‑entity: Organizations, Memberships, Projects
- Dashboard: overview cards and list views
- Database: Prisma ORM over PostgreSQL with migrations and seeding
- Docs: clear README and environment setup
- DevOps: Docker Compose for DB/backend/frontend; GitHub Actions CI (install, build, test)

## Quick Start

### Prerequisites
- Node.js ≥ 18
- Docker Desktop (recommended)

### Environment
Create a `.env` at project root (or copy `.env.example`):

```
# Backend
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stellar_saas?schema=public"
JWT_SECRET="replace_with_a_strong_secret"
PORT=4000

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
``` 

### Run with Docker
```bash
docker-compose up -d
```
Backend: http://localhost:4000
Frontend: http://localhost:3000

### Local (without Docker)
```bash
# Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Tech Stack
- Backend: Express, TypeScript, Prisma, PostgreSQL, JWT, Jest + Supertest
- Frontend: Next.js 14 (App Router), React, TypeScript, Tailwind CSS

## Roadmap
- Stripe‑ready billing skeleton (subscriptions)
- Audit logs & activity feed
- Organizations invitations & role management UI
- E2E tests with Playwright
