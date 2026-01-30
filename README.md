# Node CRUD Boilerplate (Express + MongoDB)

Fork-ready starter for CRUD APIs with:
- Express (ESM)
- MongoDB + Mongoose
- Sessions (cookie-based) + JWT (Bearer)
- Zod validation
- Security middleware (helmet, hpp, mongo-sanitize, rate limit, cors)
- OpenAPI + Swagger UI
- Jest + Supertest
- Docker + docker-compose
- ESLint + Prettier + Husky + lint-staged

## Quick start (Docker)
1) Copy env:
```bash
cp .env.example .env
```

2) Run:
```bash
docker compose up --build
```

API: http://localhost:3000  
Swagger: http://localhost:3000/docs  
Health: http://localhost:3000/health

## Local dev (without Docker)
```bash
cp .env.example .env
npm i
npm run dev
```

## Auth modes included
- Session auth: sets `req.session.userId` on login
- JWT auth: returns access/refresh tokens on login, protect routes with `requireJwt`

## Included endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/users` (JWT)
- `POST /api/users` (JWT)
- `PATCH /api/users/:id` (JWT)
- `DELETE /api/users/:id` (JWT)
- `GET /health`
- `GET /docs` (Swagger UI)

## Husky
After install:
```bash
npx husky init
```

Replace `.husky/pre-commit` with:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```
