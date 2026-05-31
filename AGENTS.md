# msme-finance — AGENTS.md

## Project structure

```
client/   React 19 + Vite + Tailwind v4 (ESM)
server/   Express.js API (CommonJS, port 5001)
scratch/  Dev utilities (gitignored)
```

## Commands

```bash
# Server
cd server && npm run dev          # nodemon index.js
npm start                         # node index.js

# Client
cd client && npm run dev          # vite dev (port 5173)
npm run build                     # vite build
npm run lint                      # eslint .
```

## Architecture

### Server (`server/`)
- **index.js** — Express app with CORS (origin: `http://localhost:5173`, `5174`), cookie-parser
- **Routes** — `/api/auth` (public), `/api/profile` (JWT-protected via `authMiddleware`)
- **Supabase** — `services/supabase.js` exports client singleton + `createAuthClient(token)` for RLS-authenticated queries
- **Module system** — CommonJS (`"type": "commonjs"`)

### Client (`client/`)
- **Auth** — Supabase Auth via `supabaseClient.js`; JWT stored in `localStorage("token")`; Axios interceptor sends `Bearer` header
- **Profile** — Fetched on login / AuthInit, stored in `localStorage("profile")`
- **ProtectedRoute** (App.jsx) — checks token + `profile.onboarding_completed`; redirects to `/onboarding` if incomplete
- **Onboarding** — 2-step wizard (user type → business detail), POST `/api/profile/onboarding`, saves profile to localStorage, navigates to `/dashboard`
- **Services** — `api.js` (axios instance), `transactionService.js`, `businessService.js`
- **Module system** — ESM (`"type": "module"`)

### Auth flow
Register → OTP email → VerifyOtp → Login → AuthInit syncs session → ProtectedRoute checks onboarding → Dashboard

## Key conventions
- Token: `localStorage("token")`, Profile: `localStorage("profile")`
- Backend uses `createAuthClient(token)` for Supabase DB queries (RLS)
- No tests exist in repo
- `.env` files in both `client/` and `server/` are gitignored
- `scratch/` is gitignored — contains `test_supabase.cjs`, `create_admin.cjs`, `check_users.js`
- `client/.env` uses `VITE_` prefix env vars
