# Vizsgaremek backend — air quality monitoring API

Backend for the **Komplex Levegőminőség Elemző Rendszer** air pollution monitoring system: monitoring **sites** (locations), **devices** attached to sites, **measurements** (PM and weather-related fields), and optional **site evaluations**. It exposes a JSON REST API.

Most HTTP routes live under the **`/api`** prefix. **`/admin`** routes and the **root page** are excluded from that prefix on purpose (see `main.ts`).

---

## What it is built with and why

| Piece | Role |
|--------|------|
| **NestJS** | Structured Node server: modules, dependency injection, guards, and clear separation of controllers and services. Fits a growing API without turning into a single giant script. |
| **Prisma** | Type-safe access to MySQL, migrations-friendly schema in one place (`prisma/schema.prisma`), and straightforward relations (site → devices → measurements). |
| **MySQL** | Relational data with foreign keys (for example cascade deletes from site to devices and measurements), which matches the domain well. |
| **Passport + JWT** | Stateless auth for APIs: clients send `Authorization: Bearer <token>` after login. The JWT payload carries identity and role; each protected request re-loads the user from the database so revoked users are not trusted forever from an old token alone. |
| **bcrypt** | Password hashing before storage. |
| **class-validator / ValidationPipe** | Request validation at the edge of the app. |
| **Swagger** (`@nestjs/swagger`) | Interactive API docs at **`/api/docs`** — useful while developing and when handing the API to a frontend team. |
| **EJS** | Server-rendered HTML for simple pages (home and admin device edit) without pulling in a full frontend framework on the server. |
| **Vercel (`api/index.ts` + `vercel.json`)** | Serverless-style hosting: one entry builds the Nest app once and forwards each request to the Express adapter. CORS is opened more broadly there than in local `main.ts` because deployment URLs vary. |

Device ingestion uses **Node’s `crypto`** module (AES-256-CBC with a key derived from a shared secret) so field devices can send a **base64url** blob in a query string instead of holding user passwords or JWTs.

---

## Prerequisites

- Node.js (version compatible with the Nest 11 / Prisma 6 stack in `package.json`)
- MySQL and a `DATABASE_URL` Prisma can use
- Optional but recommended: **Postman** or similar to import `postman-db-endpoints.postman_collection.json`

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | MySQL connection string for Prisma. |
| `JWT_SECRET` | Signing key for access tokens. Defaults to a development-only value in code if unset — **set a strong secret in production**. |
| `DEVICE_INGEST_SHARED_KEY` | Shared secret for **`GET /api/measurements/device`**. If missing, that endpoint responds with **401** so misconfigured servers do not silently accept garbage. |
| `PORT` | Listen port locally (defaults to **3000** in `main.ts`). On Vercel the platform sets this. |

---

## Setup and scripts

```bash
npm install
npx prisma migrate deploy   # or migrate dev during development
npx prisma db seed            # optional: sample sites, users, devices (see prisma/seed.ts)
npm run start:dev             # hot reload
```

Other useful commands: `npm run build`, `npm run start:prod`, `npm test`, `npm run test:e2e`.

After seeding, you typically have:

- **Admin:** `admin@example.com` / `admin123`
- **Normal user:** `user@example.com` / `user123`

---

## Running and documenting the API

- **Base URL (local):** `http://localhost:3000`
- **Swagger UI:** `http://localhost:3000/api/docs`
- **Postman:** import `postman-db-endpoints.postman_collection.json` — it sets `baseUrl`, runs a few collection scripts for tokens and IDs, and asserts basic status codes.

Authenticated calls use:

```http
Authorization: Bearer <access_token>
```

Tokens are returned by **`POST /api/auth/login`** and **`POST /api/auth/register`** as JSON: `{ "access_token": "..." }`.

---

## URL layout

- **`GET /`** — Renders the home view (`views/index` via EJS). Not under `/api`.
- **`/api/...`** — Main JSON API (global prefix **`api`**).
- **`/admin/...`** — Admin HTML and JSON without the `api` segment (see below).
- **`/api/docs`** — Swagger.

CORS for local development allows specific origins (including a Vite dev server on port 5173); adjust `main.ts` if your frontend origin differs.

---

## Endpoints — behaviour and expectations

### Authentication (`/api/auth`)

| Method | Path | Auth | What it does |
|--------|------|------|----------------|
| POST | `/api/auth/login` | No | Body: `identifier` (email or username) and `password`. Legacy field `email` is accepted as an alias for `identifier`. Returns **`access_token`** or **401** if credentials are wrong. |
| POST | `/api/auth/register` | No | Body: `username`, `email`, `password`, optional `role`. Creates a user, hashes the password, returns **`access_token`**. If `role` is omitted, the service defaults the role in code — when exposing registration publicly you usually want to **force** `USER` in your client or tighten the backend. |
| GET | `/api/auth/profile` | JWT | Returns the current user object **without** the password hash. |

### Sites (`/api/sites`)

| Method | Path | Auth | What it does |
|--------|------|------|----------------|
| GET | `/api/sites` | Optional JWT | Lists all sites. If the caller is an **ADMIN** (valid Bearer token with that role), the response includes **devices** for each site; otherwise sites are returned without embedding devices. |
| GET | `/api/sites/dashboard` | No | Aggregated dashboard payload: per-site devices, last measurement summary, and map-oriented defaults. Intended for a public or semi-public dashboard view. |
| GET | `/api/sites/:id` | Optional JWT | One site by ID. Same **admin sees devices** rule as the list route; evaluations are included when loading a single site. |
| POST | `/api/sites` | JWT + **ADMIN** | Creates a site (`name`, optional `lat`, `lon`). |
| PUT | `/api/sites/:id` | JWT + **ADMIN** | Updates a site. |
| DELETE | `/api/sites/:id` | JWT + **ADMIN** | Deletes the site; related devices and measurements go away with cascade rules in the database. |

### Devices (`/api/devices`)

All routes below require **JWT** and role **ADMIN**.

| Method | Path | What it does |
|--------|------|----------------|
| GET | `/api/devices` | Lists devices. |
| GET | `/api/devices/:id` | One device. |
| POST | `/api/devices` | Creates a device (for example `site_id`, `name`, `status`, `computer_type`, `measure_interval`, `wifi_ssid`, … — see Swagger / Postman). |
| PUT | `/api/devices/:id` | Updates allowed fields. |
| DELETE | `/api/devices/:id` | Deletes the device and its measurements (cascade). |

### Measurements (`/api/measurements`)

| Method | Path | Auth | What it does |
|--------|------|------|----------------|
| GET | `/api/measurements` | JWT | Without `deviceId`: recent measurements (limited batch, newest first). With **`?deviceId=`**: recent measurements for that device (smaller cap in service code). |
| GET | `/api/measurements/device?data=<base64url>` | **No JWT** | **Device ingest:** `data` must decode to **16-byte IV + ciphertext**. The server decrypts with **AES-256-CBC** using a key derived as **SHA-256** of `DEVICE_INGEST_SHARED_KEY`, parses JSON, validates numeric fields, stores a row, and updates **`last_seen`** on the device. Wrong encoding, bad JSON, unknown `device_id`, or decrypt failure → **400** / **401** as appropriate. |
| POST | `/api/measurements` | JWT | Creates a measurement from JSON (for example `device_id`, PM fields, `temp`, `humidity`, wind, `rain`, optional `composition`, `wind_dir`). |
| GET | `/api/measurements/export` | JWT | CSV download. Query params are optional filters: **`siteId`**, **`deviceId`**, **`limit`**, **`from`**, **`to`** (ISO datetimes). Response headers mark **CSV** attachment; first line is the header row. |

### Evaluations (`/api/evaluations`)

| Method | Path | Auth | What it does |
|--------|------|------|----------------|
| GET | `/api/evaluations/site/:siteId` | No | Lists evaluations stored for that site. |
| POST | `/api/evaluations/generate/:siteId` | No | Body: `evaluation_text`, optional `generated_by` (user id). Persists a new evaluation row for the site. |

These routes are intentionally open in the current code; if only staff should generate evaluations, add JWT + role guards the same way as on admin routes.

### Admin (`/admin` — no `/api` prefix)

| Method | Path | Auth | What it does |
|--------|------|------|----------------|
| GET | `/admin/devices/:id/edit` | No (currently) | **HTML** page rendering `views/device-edit` with the device loaded from the database. Treat as an internal tool unless you protect it. |
| GET | `/admin/stats` | JWT + **ADMIN** | Counts users and devices (including how many devices are **active**). |
| GET | `/admin/users` | JWT + **ADMIN** | Lists users **without** passwords. |
| PATCH | `/admin/users/:id/role` | JWT + **ADMIN** | Body: `{ "role": "..." }` — updates role. |
| DELETE | `/admin/users/:id` | JWT + **ADMIN** | Deletes the user. |

---

## Data model (short)

- **User** — credentials and `role` (`ADMIN`, `USER`, … as plain strings).
- **Site** — name and optional coordinates; has many devices and evaluations.
- **Device** — belongs to a site; status, interval, optional WiFi and debug fields; has many measurements.
- **Measurement** — PM1 / PM2.5 / PM4 / PM10, environment fields, optional composition text; tied to a device.
- **SiteEvaluation** — text and timestamp for a site, optional `generated_by` user id.

Exact columns and types: `prisma/schema.prisma`.

---

## Testing the API

1. Start the app and ensure MySQL is reachable.
2. Open **`/api/docs`** for try-it-out calls, **or** import the Postman collection.
3. Log in as admin, copy `access_token`, set **`Authorization: Bearer …`** on protected requests.

The Postman collection folder **“Admin (No /api Prefix)”** reminds you that those URLs are **`/admin/...`**, not **`/api/admin/...`**.

---

## Licence

See `package.json` (`UNLICENSED` by default for this project template).
