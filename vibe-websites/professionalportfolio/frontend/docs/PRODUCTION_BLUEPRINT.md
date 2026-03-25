# Production Blueprint (Frontend + Backend)

This document gives a clean setup for scaling this portfolio into a production-grade app that can host more features (including a typing practice area next).

## 1) Recommended project layout

Keep frontend and backend in separate apps and share types between them:

```text
professionalportfolio/
  frontend/                     # existing React app (move current src/public/package here)
  backend/                      # Node.js API (Express/Fastify/Nest)
  packages/
    shared/                     # zod schemas, API contracts, DTO types
  docs/
    PRODUCTION_BLUEPRINT.md
```

If you want to keep a single folder right now, at least create:

```text
src/
  app/                          # app shell, providers, routing
  pages/                        # route pages
  features/
    projects/
    contact/
    blog/
    typing/                     # upcoming typing practice area
  components/
  services/                     # API clients
  stores/                       # zustand stores
  lib/                          # utilities
  types/
```

## 2) Backend architecture for scale

### Suggested stack
- Runtime: Node.js LTS.
- Framework: Fastify (fast + schema-first) or Express (simpler ecosystem).
- Validation: `zod` for runtime + type-safe schemas.
- Database: PostgreSQL + Prisma.
- Cache/queues: Redis (optional initially, useful later for rate limits, sessions, leaderboards).

### Domain modules (start small)
- `auth`: login/social auth and role checks.
- `portfolio`: projects, skills, timeline, testimonials.
- `contact`: contact form submissions + anti-spam.
- `typing` (next phase): texts, attempts, scores, leaderboard.

### API versioning & contracts
- Prefix routes with `/api/v1`.
- Keep response envelope consistent:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

- Keep error envelope consistent:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid payload",
    "details": []
  }
}
```

### Security baseline
- Helmet / security headers.
- CORS allowlist for frontend domains.
- Rate limiting on public endpoints (`/contact`, `/auth`, future `/typing/submit`).
- Input validation on every request.
- Environment secrets via `.env` (never commit secrets).

## 3) Frontend architecture for scale

### Routing and feature boundaries
- Use feature-based folders (`features/projects`, `features/typing`).
- Route-level lazy loading for heavy pages.
- Keep reusable UI in `components/ui` and domain logic inside each feature.

### State management
- Server state: React Query/SWR (recommended for API calls and caching).
- Client-only state: Zustand (already in dependencies).
- Avoid putting remote API data in global store unless needed globally.

### API access layer
- One HTTP client module (`src/services/http.ts`) with:
  - base URL from env
  - auth token injection
  - unified error parser
- Domain services per feature (`portfolioService.ts`, `typingService.ts`).

### UI quality
- Keep design tokens in one place (spacing, colors, typography).
- Use loading, empty, and error states for all async views.
- Add form validation with zod + react-hook-form later for scalable forms.

## 4) Production readiness checklist

### CI/CD
- Lint + typecheck + build on every PR.
- Run tests before merge.
- Auto-deploy staging on main branch.
- Manual approval gate for production deploy.

### Observability
- Backend: structured logs (`pino`), request IDs, error tracking (Sentry).
- Frontend: error tracking and performance monitoring.
- Health endpoint `/api/v1/health`.

### Performance
- Frontend: code splitting, image optimization, cache headers.
- Backend: gzip/brotli, DB indexes, query optimization, pagination.

### Reliability
- DB backups + restore procedure.
- Migrations in CI/CD.
- Uptime checks + alerts.

## 5) How to prepare now for typing practice (next task)

Create the typing module with clean boundaries:

- Frontend feature: `src/features/typing`
  - `TypingPage.tsx`
  - `TypingInput.tsx`
  - `TypingStats.tsx`
  - `useTypingEngine.ts`
  - `typingService.ts`
- Backend module: `/api/v1/typing`
  - `GET /texts/random`
  - `POST /attempts`
  - `GET /leaderboard`

### Typing data model (initial)
- `typing_texts`: id, content, language, difficulty.
- `typing_attempts`: id, userId nullable, wpm, accuracy, mistakes, durationMs, createdAt.

### Metrics to compute
- WPM, accuracy %, raw speed, mistake count, consistency.
- Store only summary in DB at first; keep keystroke-level telemetry optional.

## 6) Suggested rollout plan

1. Refactor folder structure into feature modules.
2. Add backend skeleton with `/api/v1/health` and `/api/v1/portfolio`.
3. Move portfolio content from hardcoded frontend data into backend + DB.
4. Add auth only if needed for admin/editor actions.
5. Implement typing feature as a separate module (frontend + backend).
6. Add leaderboard and profile insights once core typing flow is stable.

## 7) Deployment suggestion

- Frontend: Vercel/Netlify.
- Backend: Render/Railway/Fly.io.
- DB: Neon/Supabase Postgres.
- CDN + domain + HTTPS.

This gives a low-ops stack that is production-ready but still easy to grow.
