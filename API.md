# API Documentation – pius-adewale-owolawi

> **Generated**: 2026-02-11
> **Project**: Prof. Pius Owolawi – Portfolio & CMS
> **Framework**: Next.js 16 (App Router)
> **Database**: Supabase (PostgreSQL)
> **Deployment Target**: Vercel

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Authentication Flow](#2-authentication-flow)
3. [Base URL](#3-base-url)
4. [Environment Variables Used](#4-environment-variables-used)
5. [API Endpoints (Detailed Section)](#5-api-endpoints-detailed-section)
   - 5.1 [Achievements](#51-achievements)
   - 5.2 [Awards](#52-awards)
   - 5.3 [Certifications](#53-certifications)
   - 5.4 [Community Initiatives](#54-community-initiatives)
   - 5.5 [Education](#55-education)
   - 5.6 [Gallery Images](#56-gallery-images)
   - 5.7 [Hero Section](#57-hero-section)
   - 5.8 [Professional Memberships](#58-professional-memberships)
   - 5.9 [Publications](#59-publications)
   - 5.10 [Research Areas](#510-research-areas)
   - 5.11 [Speeches](#511-speeches)
   - 5.12 [Testimonials](#512-testimonials)
   - 5.13 [Site Settings](#513-site-settings)
   - 5.14 [File Upload](#514-file-upload)
   - 5.15 [Auth – Login](#515-auth--login)
   - 5.16 [Auth – Sign Out](#516-auth--sign-out)
   - 5.17 [Admin – Update Email](#517-admin--update-email)
   - 5.18 [Admin – Update Password](#518-admin--update-password)
6. [External APIs Consumed](#6-external-apis-consumed)
7. [Server Actions](#7-server-actions-if-used)
8. [Data Models / Database Schema](#8-data-models--database-schema)
9. [Middleware Logic](#9-middleware-logic)
10. [Error Handling Strategy](#10-error-handling-strategy)
11. [Testing Checklist](#11-testing-checklist-section)
12. [API Flow Diagram (Text Based)](#12-api-flow-diagram-text-based)

---

## 1. Project Overview

| Attribute | Value |
|-----------|-------|
| **Architecture** | Next.js 16 App Router (React 19) |
| **API Style** | Next.js Route Handlers (`app/api/**/route.ts`) |
| **Authentication** | Supabase Auth (email + password, session-based via cookies) |
| **Database** | Supabase PostgreSQL with Row-Level Security (RLS) |
| **Storage** | Supabase Storage (buckets: `publications`, `hero-images`) |
| **ORM / Query** | Supabase JavaScript SDK (`@supabase/supabase-js` v2.87, `@supabase/ssr` v0.8) |
| **Frontend** | React 19 Server Components + Client Components |
| **Styling** | Tailwind CSS v4 |
| **Deployment** | Vercel |
| **HTTP Client** | Native `fetch()` — no axios |
| **Pages Router API** | Not used — no `pages/api` directory exists |
| **Server Actions** | Not used — no `'use server'` directives found |

### API Structure Summary

The project exposes **29 route handler files** containing **61 total HTTP handler functions** spread across 17 resource groups:

| Resource | Collection Route | Individual Route | Methods |
|----------|-----------------|------------------|---------|
| Achievements | `/api/achievements` | `/api/achievements/[id]` | GET, POST, PUT, DELETE |
| Awards | `/api/awards` | `/api/awards/[id]` | GET, POST, PUT, DELETE |
| Certifications | `/api/certifications` | `/api/certifications/[id]` | GET, POST, PUT, DELETE |
| Community Initiatives | `/api/community-initiatives` | `/api/community-initiatives/[id]` | GET, POST, PUT, DELETE |
| Education | `/api/education` | `/api/education/[id]` | GET, POST, PUT, DELETE |
| Gallery Images | `/api/gallery-images` | `/api/gallery-images/[id]` | GET, POST, PUT, DELETE |
| Hero Section | `/api/hero-section` | — | GET, PUT |
| Professional Memberships | `/api/professional-memberships` | `/api/professional-memberships/[id]` | GET, POST, PUT, DELETE |
| Publications | `/api/publications` | `/api/publications/[id]` | GET, POST, PUT, DELETE |
| Research Areas | `/api/research-areas` | `/api/research-areas/[id]` | GET, POST, PUT, DELETE |
| Speeches | `/api/speeches` | `/api/speeches/[id]` | GET, POST, PUT, DELETE |
| Testimonials | `/api/testimonials` | `/api/testimonials/[id]` | GET, POST, PUT, DELETE |
| Site Settings | `/api/settings` | `/api/settings/[key]` | GET, POST, PUT, DELETE |
| File Upload | `/api/upload` | — | POST |
| Auth Sign Out | `/api/auth/signout` | — | POST |
| Admin Update Email | `/api/admin/update-email` | — | POST |
| Admin Update Password | `/api/admin/update-password` | — | POST |

### Data Fetching Patterns

The project uses **two distinct data-fetching patterns**:

1. **Public-facing pages** (`components/*.tsx`): Use the Supabase client SDK directly from browser-side React components via `createClient()` from `lib/supabase/client.ts`. These bypass the API routes entirely.
2. **Admin CMS pages** (`app/admin/**`, `components/admin/*.tsx`): Use `fetch()` calls to the Next.js API routes. Admin list/edit pages (React Server Components) also use direct Supabase server SDK calls.

---

## 2. Authentication Flow

### How Login Works

1. User navigates to `/login`.
2. The login page (`app/login/page.tsx`) is a client component using the Supabase browser client.
3. User submits email + password.
4. The client calls `supabase.auth.signInWithPassword({ email, password })`.
5. On success, the client queries the `admin_users` table to verify the user has admin role: `supabase.from('admin_users').select('role').eq('email', email).single()`.
6. If the user is not in `admin_users`, the client calls `supabase.auth.signOut()` and shows an error.
7. If verified, the user is redirected to `/admin/dashboard`.

### How Tokens / Sessions Are Handled

- **Session Storage**: Supabase Auth sessions are stored in HTTP-only cookies managed by `@supabase/ssr`.
- **Token Type**: JWT access tokens issued by Supabase Auth.
- **Token Refresh**: Handled automatically by the middleware on every request to `/admin/*` routes.
- **No custom JWT**: The project relies entirely on Supabase's built-in auth token management.

### Required Headers

| Header | Value | When Required |
|--------|-------|---------------|
| `Content-Type` | `application/json` | All POST/PUT requests with JSON body |
| `Cookie` | Supabase auth session cookies | All authenticated requests (auto-managed by browser) |

> **Note**: There are no `Authorization: Bearer <token>` headers used. Authentication is entirely cookie-based via Supabase SSR.

### Protected Route Mechanism

- **Middleware** (`middleware.ts`) intercepts all requests to `/admin/*`.
- If no session exists → redirect to `/login`.
- If session exists but email is not in `admin_users` table → redirect to `/unauthorized`.
- API routes (`/api/**`) are **NOT** protected by middleware. They rely on Supabase RLS policies at the database level for write protection.
- The `/api/admin/update-email` and `/api/admin/update-password` routes explicitly check for a valid session in their handler code.

### Middleware Logic (Summary)

```
Request to /admin/* → Check Supabase session via cookies
  → No session → Redirect to /login
  → Session exists → Query admin_users table for user's email
    → Not found → Redirect to /unauthorized
    → Found → Allow request through
```

---

## 3. Base URL

| Environment | Base URL |
|-------------|----------|
| **Local Development** | `http://localhost:3000` (default Next.js) or `http://localhost:3001` (as configured in `NEXT_PUBLIC_SITE_URL`) |
| **Production (Vercel)** | Determined by Vercel deployment URL (project name: `piusowolawi`) |

All API endpoints are relative to the base URL. Example:
- Local: `http://localhost:3000/api/achievements`
- Production: `https://<vercel-domain>/api/achievements`

---

## 4. Environment Variables Used

| Variable | Purpose | Required For |
|----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. Used by all Supabase clients (browser, server, middleware). | Every API route, every component, middleware |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public API key. Used by all Supabase clients for RLS-governed access. | Every API route, every component, middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key. Bypasses RLS. Used by the admin client in `lib/supabase/admin.ts`. | Admin operations that need to bypass RLS (currently available but not actively used in route handlers) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL. Used as fallback origin in the sign-out redirect. | `/api/auth/signout` |
| `VERCEL` | Set to `"1"` by Vercel. Indicates production environment. | Build/deploy detection |
| `VERCEL_URL` | The deployment URL assigned by Vercel. | Production URL resolution |
| `VERCEL_ENV` | Current Vercel environment (`production`, `preview`, `development`). | Environment detection |
| `NX_DAEMON` | Nx build cache daemon flag (set to `"false"`). | Build pipeline |
| `TURBO_CACHE` | Turborepo cache configuration. | Build pipeline |
| `TURBO_REMOTE_ONLY` | Turborepo remote-only flag. | Build pipeline |
| `TURBO_RUN_SUMMARY` | Turborepo run summary flag. | Build pipeline |
| `TURBO_DOWNLOAD_LOCAL_ENABLED` | Turborepo local download flag. | Build pipeline |
| `VERCEL_OIDC_TOKEN` | Vercel OIDC token for deployment authentication. | Vercel CI/CD |
| `VERCEL_TARGET_ENV` | Target deploy environment. | Vercel CI/CD |
| `VERCEL_GIT_*` | Various Git metadata variables (commit SHA, author, etc.). | Vercel CI/CD |

### Critical Variables for API Testing

To test API endpoints locally, you need at minimum:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 5. API Endpoints (Detailed Section)

---

### 5.1 Achievements

#### 5.1.1 List All Achievements

| Field | Value |
|-------|-------|
| **Route** | `/api/achievements` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all achievements ordered by `order_index` ascending |
| **Authentication Required** | No (public read via RLS policy) |
| **Headers Required** | None |
| **Request Body** | None |
| **Query Parameters** | None |
| **Database Table** | `achievements` |
| **Related Frontend Pages** | `components/Achieved.tsx`, `app/admin/achievements/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "Publications",
    "count": "200+",
    "icon": "ri-book-line",
    "color": "from-blue-500 to-cyan-500",
    "details": ["Peer-reviewed journals", "Conference papers"],
    "category": "research",
    "order_index": 0,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Error Response (500):**
```json
{ "error": "error message string" }
```

**Status Codes:**
- `200` — Success
- `500` — Database error or internal server error

**Internal Logic Summary:**
1. Creates Supabase server client.
2. Queries `achievements` table with `select('*')`.
3. Orders by `order_index` ascending.
4. Returns array of achievement objects.

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/achievements
```

**Example Postman:**
```
Method: GET
URL: {{base_url}}/api/achievements
Headers: (none required)
Body: (none)
```

---

#### 5.1.2 Create Achievement

| Field | Value |
|-------|-------|
| **Route** | `/api/achievements` |
| **HTTP Method** | `POST` |
| **Description** | Creates a new achievement record |
| **Authentication Required** | Yes (Supabase RLS — must be authenticated) |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Table** | `achievements` |
| **Related Frontend Pages** | `app/admin/achievements/new/page.tsx` via `components/admin/AchievementForm.tsx` |

**Request Body:**
```json
{
  "title": "Publications",
  "count": "200+",
  "icon": "ri-book-line",
  "color": "from-blue-500 to-cyan-500",
  "details": ["Peer-reviewed journals", "Conference papers"],
  "category": "research",
  "order_index": 0
}
```

**Success Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Publications",
  "count": "200+",
  "icon": "ri-book-line",
  "color": "from-blue-500 to-cyan-500",
  "details": ["Peer-reviewed journals", "Conference papers"],
  "category": "research",
  "order_index": 0,
  "created_at": "2026-02-11T00:00:00.000Z",
  "updated_at": "2026-02-11T00:00:00.000Z"
}
```

**Error Response (500):**
```json
{ "error": "error message string" }
```

**Status Codes:**
- `200` — Created successfully (note: does not return 201)
- `500` — Database error or internal server error

**Internal Logic Summary:**
1. Creates Supabase server client.
2. Parses request body as JSON.
3. Inserts body directly into `achievements` table.
4. Returns the created record with `.select().single()`.

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/achievements \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Publications","count":"200+","icon":"ri-book-line","color":"from-blue-500 to-cyan-500","details":["Peer-reviewed journals"],"category":"research","order_index":0}'
```

**Example Postman:**
```
Method: POST
URL: {{base_url}}/api/achievements
Headers:
  Content-Type: application/json
  Cookie: (Supabase session cookies)
Body (raw JSON):
{
  "title": "Publications",
  "count": "200+",
  "icon": "ri-book-line",
  "color": "from-blue-500 to-cyan-500",
  "details": ["Peer-reviewed journals"],
  "category": "research",
  "order_index": 0
}
```

---

#### 5.1.3 Get Single Achievement

| Field | Value |
|-------|-------|
| **Route** | `/api/achievements/[id]` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves a single achievement by UUID |
| **Authentication Required** | No (public read via RLS) |
| **Headers Required** | None |
| **Request Body** | None |
| **Query Parameters** | None |
| **URL Parameters** | `id` — UUID of the achievement |
| **Database Table** | `achievements` |
| **Related Frontend Pages** | `app/admin/achievements/[id]/edit/page.tsx` |

**Success Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Publications",
  "count": "200+",
  "icon": "ri-book-line",
  "color": "from-blue-500 to-cyan-500",
  "details": ["Peer-reviewed journals"],
  "category": "research",
  "order_index": 0,
  "created_at": "2026-02-01T00:00:00.000Z",
  "updated_at": "2026-02-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404`: `{ "error": "Achievement not found" }`
- `500`: `{ "error": "error message string" }`

**Status Codes:**
- `200` — Success
- `404` — Achievement not found
- `500` — Database error or internal server error

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/achievements/550e8400-e29b-41d4-a716-446655440000
```

---

#### 5.1.4 Update Achievement

| Field | Value |
|-------|-------|
| **Route** | `/api/achievements/[id]` |
| **HTTP Method** | `PUT` |
| **Description** | Updates an existing achievement by UUID |
| **Authentication Required** | Yes (Supabase RLS) |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **URL Parameters** | `id` — UUID of the achievement |
| **Database Table** | `achievements` |
| **Related Frontend Pages** | `app/admin/achievements/[id]/edit/page.tsx` via `components/admin/AchievementForm.tsx` |

**Request Body (partial update supported):**
```json
{
  "title": "Updated Title",
  "count": "250+"
}
```

**Success Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Updated Title",
  "count": "250+",
  "icon": "ri-book-line",
  "color": "from-blue-500 to-cyan-500",
  "details": ["Peer-reviewed journals"],
  "category": "research",
  "order_index": 0,
  "created_at": "2026-02-01T00:00:00.000Z",
  "updated_at": "2026-02-11T00:00:00.000Z"
}
```

**Error Response (500):**
```json
{ "error": "error message string" }
```

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/achievements/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Updated Title","count":"250+"}'
```

---

#### 5.1.5 Delete Achievement

| Field | Value |
|-------|-------|
| **Route** | `/api/achievements/[id]` |
| **HTTP Method** | `DELETE` |
| **Description** | Deletes an achievement by UUID |
| **Authentication Required** | Yes (Supabase RLS) |
| **Headers Required** | Session cookie |
| **Request Body** | None |
| **URL Parameters** | `id` — UUID of the achievement |
| **Database Table** | `achievements` |
| **Related Frontend Pages** | `app/admin/achievements/page.tsx` via `components/admin/DeleteButton.tsx` |

**Success Response (200):**
```json
{ "success": true }
```

**Error Response (500):**
```json
{ "error": "error message string" }
```

**Example cURL:**
```bash
curl -X DELETE http://localhost:3000/api/achievements/550e8400-e29b-41d4-a716-446655440000 \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH"
```

---

### 5.2 Awards

#### 5.2.1 List All Awards

| Field | Value |
|-------|-------|
| **Route** | `/api/awards` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all awards ordered by `order_index` ascending |
| **Authentication Required** | No |
| **Headers Required** | None |
| **Request Body** | None |
| **Query Parameters** | None |
| **Database Table** | `awards` |
| **Related Frontend Pages** | `components/Achieved.tsx`, `app/admin/awards/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "Best Researcher Award",
    "year": "2025",
    "organization": "IEEE",
    "description": "Award for outstanding research",
    "icon": "ri-trophy-line",
    "color": "from-yellow-500 to-orange-500",
    "order_index": 0,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Error Response (500):**
```json
{ "error": "Failed to fetch awards" }
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/awards
```

---

#### 5.2.2 Create Award

| Field | Value |
|-------|-------|
| **Route** | `/api/awards` |
| **HTTP Method** | `POST` |
| **Description** | Creates a new award record |
| **Authentication Required** | Yes (Supabase RLS) |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Table** | `awards` |
| **Related Frontend Pages** | `app/admin/awards/new/page.tsx` via `components/admin/AwardForm.tsx` |

**Request Body:**
```json
{
  "title": "Best Researcher Award",
  "year": "2025",
  "organization": "IEEE",
  "description": "Award for outstanding research contributions",
  "icon": "ri-trophy-line",
  "color": "from-yellow-500 to-orange-500",
  "order_index": 0
}
```

**Success Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Best Researcher Award",
  "year": "2025",
  "organization": "IEEE",
  "description": "Award for outstanding research contributions",
  "icon": "ri-trophy-line",
  "color": "from-yellow-500 to-orange-500",
  "order_index": 0,
  "created_at": "2026-02-11T00:00:00.000Z",
  "updated_at": "2026-02-11T00:00:00.000Z"
}
```

**Error Response (500):**
```json
{ "error": "Failed to create award" }
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/awards \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Best Researcher Award","year":"2025","organization":"IEEE","description":"Award for outstanding research","icon":"ri-trophy-line","color":"from-yellow-500 to-orange-500","order_index":0}'
```

---

#### 5.2.3 Get Single Award

| Field | Value |
|-------|-------|
| **Route** | `/api/awards/[id]` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves a single award by UUID |
| **Authentication Required** | No |
| **URL Parameters** | `id` — UUID of the award |
| **Database Table** | `awards` |

**Success Response (200):** Single award object (same shape as list item).

**Error Response (500):**
```json
{ "error": "Failed to fetch award" }
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/awards/550e8400-e29b-41d4-a716-446655440000
```

---

#### 5.2.4 Update Award

| Field | Value |
|-------|-------|
| **Route** | `/api/awards/[id]` |
| **HTTP Method** | `PUT` |
| **Description** | Updates an existing award by UUID |
| **Authentication Required** | Yes (Supabase RLS) |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `awards` |

**Request Body (partial update supported):**
```json
{
  "title": "Updated Award Title"
}
```

**Success Response (200):** Updated award object.

**Error Response (500):**
```json
{ "error": "Failed to update award" }
```

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/awards/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Updated Award Title"}'
```

---

#### 5.2.5 Delete Award

| Field | Value |
|-------|-------|
| **Route** | `/api/awards/[id]` |
| **HTTP Method** | `DELETE` |
| **Description** | Deletes an award by UUID |
| **Authentication Required** | Yes (Supabase RLS) |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `awards` |

**Success Response (200):**
```json
{ "success": true }
```

**Error Response (500):**
```json
{ "error": "Failed to delete award" }
```

**Example cURL:**
```bash
curl -X DELETE http://localhost:3000/api/awards/550e8400-e29b-41d4-a716-446655440000 \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH"
```

---

### 5.3 Certifications

#### 5.3.1 List All Certifications

| Field | Value |
|-------|-------|
| **Route** | `/api/certifications` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all certifications ordered by `order_index` ascending |
| **Authentication Required** | No |
| **Database Table** | `certifications` |
| **Related Frontend Pages** | `components/Education.tsx`, `app/admin/certifications/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "name": "PrEng",
    "full_name": "Professional Engineer",
    "icon": "ri-shield-check-fill",
    "issued_by": "ECSA",
    "year": "2020",
    "order_index": 0,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Error Response (500):**
```json
{ "error": "Failed to fetch certifications" }
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/certifications
```

---

#### 5.3.2 Create Certification

| Field | Value |
|-------|-------|
| **Route** | `/api/certifications` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Table** | `certifications` |

**Request Body:**
```json
{
  "name": "PrEng",
  "full_name": "Professional Engineer",
  "icon": "ri-shield-check-fill",
  "issued_by": "ECSA",
  "year": "2020",
  "order_index": 0
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/certifications \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"name":"PrEng","full_name":"Professional Engineer","icon":"ri-shield-check-fill","issued_by":"ECSA","year":"2020","order_index":0}'
```

---

#### 5.3.3 Get Single Certification

| Field | Value |
|-------|-------|
| **Route** | `/api/certifications/[id]` |
| **HTTP Method** | `GET` |
| **Authentication Required** | No |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `certifications` |

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/certifications/550e8400-e29b-41d4-a716-446655440000
```

---

#### 5.3.4 Update Certification

| Field | Value |
|-------|-------|
| **Route** | `/api/certifications/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `certifications` |

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/certifications/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"name":"Updated Name"}'
```

---

#### 5.3.5 Delete Certification

| Field | Value |
|-------|-------|
| **Route** | `/api/certifications/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `certifications` |

**Success Response (200):**
```json
{ "success": true }
```

**Example cURL:**
```bash
curl -X DELETE http://localhost:3000/api/certifications/550e8400-e29b-41d4-a716-446655440000 \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH"
```

---

### 5.4 Community Initiatives

#### 5.4.1 List All Community Initiatives

| Field | Value |
|-------|-------|
| **Route** | `/api/community-initiatives` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all community initiatives ordered by `order_index` ascending |
| **Authentication Required** | No (public read; RLS filters by `is_active = true` for anon) |
| **Database Table** | `community_initiatives` |
| **Related Frontend Pages** | `components/WhatHaveDone.tsx`, `app/admin/community-initiatives/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "STEM Outreach Program",
    "description": "Community program for STEM education",
    "icon": "ri-heart-line",
    "color": "from-blue-500 to-purple-500",
    "order_index": 0,
    "is_active": true,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/community-initiatives
```

---

#### 5.4.2 Create Community Initiative

| Field | Value |
|-------|-------|
| **Route** | `/api/community-initiatives` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `community_initiatives` |

**Request Body:**
```json
{
  "title": "STEM Outreach Program",
  "description": "Community program for STEM education",
  "icon": "ri-heart-line",
  "color": "from-blue-500 to-purple-500",
  "order_index": 0,
  "is_active": true
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/community-initiatives \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"STEM Outreach","description":"Program description","icon":"ri-heart-line","color":"from-blue-500 to-purple-500","order_index":0,"is_active":true}'
```

---

#### 5.4.3 Get Single Community Initiative

| Field | Value |
|-------|-------|
| **Route** | `/api/community-initiatives/[id]` |
| **HTTP Method** | `GET` |
| **Authentication Required** | No |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `community_initiatives` |

**Error Responses:**
- `404`: `{ "error": "Initiative not found" }`
- `500`: `{ "error": "Internal server error" }`

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/community-initiatives/550e8400-e29b-41d4-a716-446655440000
```

---

#### 5.4.4 Update Community Initiative

| Field | Value |
|-------|-------|
| **Route** | `/api/community-initiatives/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `community_initiatives` |

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/community-initiatives/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Updated Initiative"}'
```

---

#### 5.4.5 Delete Community Initiative

| Field | Value |
|-------|-------|
| **Route** | `/api/community-initiatives/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `community_initiatives` |

**Success Response (200):**
```json
{ "success": true }
```

**Example cURL:**
```bash
curl -X DELETE http://localhost:3000/api/community-initiatives/550e8400-e29b-41d4-a716-446655440000 \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH"
```

---

### 5.5 Education

#### 5.5.1 List All Education Records

| Field | Value |
|-------|-------|
| **Route** | `/api/education` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all education records ordered by `order_index` ascending |
| **Authentication Required** | No |
| **Database Table** | `education` |
| **Related Frontend Pages** | `components/Education.tsx`, `app/admin/education/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "degree": "PhD in Electrical Engineering",
    "institution": "Tshwane University of Technology",
    "country": "South Africa",
    "year_start": "2010",
    "year_end": "2014",
    "specialization": "Telecommunications",
    "icon": "ri-graduation-cap-fill",
    "color": "from-blue-600 to-cyan-600",
    "bg_color": "from-blue-50 to-cyan-50",
    "order_index": 0,
    "is_ongoing": false,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Error Response (500):**
```json
{ "error": "Failed to fetch education records" }
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/education
```

---

#### 5.5.2 Create Education Record

| Field | Value |
|-------|-------|
| **Route** | `/api/education` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `education` |

**Request Body:**
```json
{
  "degree": "PhD in Electrical Engineering",
  "institution": "Tshwane University of Technology",
  "country": "South Africa",
  "year_start": "2010",
  "year_end": "2014",
  "specialization": "Telecommunications",
  "icon": "ri-graduation-cap-fill",
  "color": "from-blue-600 to-cyan-600",
  "bg_color": "from-blue-50 to-cyan-50",
  "order_index": 0,
  "is_ongoing": false
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/education \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"degree":"PhD in Electrical Engineering","institution":"TUT","country":"South Africa","year_start":"2010","year_end":"2014","specialization":"Telecom","icon":"ri-graduation-cap-fill","color":"from-blue-600 to-cyan-600","bg_color":"from-blue-50 to-cyan-50","order_index":0,"is_ongoing":false}'
```

---

#### 5.5.3 Get Single Education Record

| Field | Value |
|-------|-------|
| **Route** | `/api/education/[id]` |
| **HTTP Method** | `GET` |
| **Authentication Required** | No |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `education` |

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/education/550e8400-e29b-41d4-a716-446655440000
```

---

#### 5.5.4 Update Education Record

| Field | Value |
|-------|-------|
| **Route** | `/api/education/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `education` |

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/education/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"degree":"Updated Degree"}'
```

---

#### 5.5.5 Delete Education Record

| Field | Value |
|-------|-------|
| **Route** | `/api/education/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `education` |

**Success Response (200):**
```json
{ "success": true }
```

**Example cURL:**
```bash
curl -X DELETE http://localhost:3000/api/education/550e8400-e29b-41d4-a716-446655440000 \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH"
```

---

### 5.6 Gallery Images

#### 5.6.1 List All Gallery Images

| Field | Value |
|-------|-------|
| **Route** | `/api/gallery-images` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all gallery images ordered by `order_index` ascending |
| **Authentication Required** | No (RLS filters `is_active = true` for anon) |
| **Database Table** | `gallery_images` |
| **Related Frontend Pages** | `components/Gallery.tsx`, `app/admin/gallery/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "Lab Research",
    "image_url": "https://example.supabase.co/storage/v1/object/public/gallery/image.jpg",
    "alt_text": "Research lab photo",
    "category": "lab",
    "order_index": 0,
    "is_active": true,
    "uploaded_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/gallery-images
```

---

#### 5.6.2 Create Gallery Image

| Field | Value |
|-------|-------|
| **Route** | `/api/gallery-images` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `gallery_images` |

**Request Body:**
```json
{
  "title": "Lab Research",
  "image_url": "https://example.supabase.co/storage/v1/object/public/gallery/image.jpg",
  "alt_text": "Research lab photo",
  "category": "lab",
  "order_index": 0,
  "is_active": true
}
```

> **Note**: `category` must be one of: `'lab'`, `'event'`, `'award'`, `'research'`, `'other'` (enforced by CHECK constraint).

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/gallery-images \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Lab Research","image_url":"https://example.com/img.jpg","alt_text":"Photo","category":"lab","order_index":0,"is_active":true}'
```

---

#### 5.6.3 Get Single Gallery Image

| Field | Value |
|-------|-------|
| **Route** | `/api/gallery-images/[id]` |
| **HTTP Method** | `GET` |
| **Authentication Required** | No |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `gallery_images` |

**Error Responses:**
- `404`: `{ "error": "Gallery image not found" }`
- `500`: `{ "error": "Internal server error" }`

---

#### 5.6.4 Update Gallery Image

| Field | Value |
|-------|-------|
| **Route** | `/api/gallery-images/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `gallery_images` |

---

#### 5.6.5 Delete Gallery Image

| Field | Value |
|-------|-------|
| **Route** | `/api/gallery-images/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `gallery_images` |

**Success Response (200):**
```json
{ "success": true }
```

---

### 5.7 Hero Section

#### 5.7.1 Get Hero Section

| Field | Value |
|-------|-------|
| **Route** | `/api/hero-section` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves the single hero section record (this table has exactly one row) |
| **Authentication Required** | No |
| **Database Table** | `hero_section` |
| **Related Frontend Pages** | `components/Hero.tsx`, `app/admin/hero/page.tsx` |

**Success Response (200):**
```json
{
  "id": "uuid-string",
  "title": "Distinguished Professor",
  "name": "Prof. Pius Owolawi",
  "subtitle": "PhD, ECSA, MIEEE, SAIEE",
  "description": "Prof. Pius Adewale Owolawi is a distinguished academic...",
  "image_url": "/img/prof-owolawi.jpg",
  "stats": {
    "publications": 200,
    "funding": "R94M+"
  },
  "created_at": "2026-02-01T00:00:00.000Z",
  "updated_at": "2026-02-01T00:00:00.000Z"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/hero-section
```

---

#### 5.7.2 Update Hero Section

| Field | Value |
|-------|-------|
| **Route** | `/api/hero-section` |
| **HTTP Method** | `PUT` |
| **Description** | Updates the hero section. If no record exists, creates one (upsert logic). |
| **Authentication Required** | Yes |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Table** | `hero_section` |
| **Related Frontend Pages** | `app/admin/hero/page.tsx` |

**Request Body:**
```json
{
  "title": "Distinguished Professor",
  "name": "Prof. Pius Owolawi",
  "subtitle": "PhD, ECSA, MIEEE, SAIEE",
  "description": "Updated description...",
  "image_url": "https://example.supabase.co/storage/v1/object/public/hero-images/photo.jpg",
  "stats": {
    "publications": 250,
    "funding": "R100M+"
  }
}
```

**Internal Logic Summary:**
1. Checks if a hero section record already exists via `select('id').single()`.
2. If exists: updates the existing record by ID.
3. If not exists: inserts a new record.
4. Returns the resulting record.

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/hero-section \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"Distinguished Professor","name":"Prof. Pius Owolawi","subtitle":"PhD","description":"Updated","image_url":"/img/photo.jpg","stats":{"publications":250,"funding":"R100M+"}}'
```

> **Note**: There is no POST or DELETE method for hero-section. It is a singleton resource.

---

### 5.8 Professional Memberships

#### 5.8.1 List All Professional Memberships

| Field | Value |
|-------|-------|
| **Route** | `/api/professional-memberships` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all professional memberships ordered by `order_index` ascending |
| **Authentication Required** | No (RLS filters `is_active = true` for anon) |
| **Database Table** | `professional_memberships` |
| **Related Frontend Pages** | `components/WhatHaveDone.tsx`, `app/admin/professional-memberships/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "name": "IEEE",
    "role": "Senior Member",
    "registration_no": "12345678",
    "year": "2015",
    "is_active": true,
    "order_index": 0,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/professional-memberships
```

---

#### 5.8.2 Create Professional Membership

| Field | Value |
|-------|-------|
| **Route** | `/api/professional-memberships` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `professional_memberships` |

**Request Body:**
```json
{
  "name": "IEEE",
  "role": "Senior Member",
  "registration_no": "12345678",
  "year": "2015",
  "is_active": true,
  "order_index": 0
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/professional-memberships \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"name":"IEEE","role":"Senior Member","registration_no":"12345678","year":"2015","is_active":true,"order_index":0}'
```

---

#### 5.8.3 Get Single Professional Membership

| Field | Value |
|-------|-------|
| **Route** | `/api/professional-memberships/[id]` |
| **HTTP Method** | `GET` |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `professional_memberships` |

**Error Responses:**
- `404`: `{ "error": "Membership not found" }`
- `500`: `{ "error": "Internal server error" }`

---

#### 5.8.4 Update Professional Membership

| Field | Value |
|-------|-------|
| **Route** | `/api/professional-memberships/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `professional_memberships` |

---

#### 5.8.5 Delete Professional Membership

| Field | Value |
|-------|-------|
| **Route** | `/api/professional-memberships/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `professional_memberships` |

**Success Response (200):**
```json
{ "success": true }
```

---

### 5.9 Publications

#### 5.9.1 List All Publications

| Field | Value |
|-------|-------|
| **Route** | `/api/publications` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all publications ordered by `year` descending |
| **Authentication Required** | No (RLS filters `is_published = true` for anon) |
| **Database Table** | `publications` |
| **Related Frontend Pages** | `components/Publications.tsx`, `app/admin/publications/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "Machine Learning for Weather Prediction",
    "authors": "P.A. Owolawi, J. Smith",
    "journal": "IEEE Transactions on Geoscience",
    "year": "2025",
    "doi": "10.1109/TGRS.2025.1234567",
    "pdf_url": "https://example.supabase.co/storage/v1/object/public/publications/paper.pdf",
    "citation_count": 15,
    "type": "journal",
    "abstract": "This paper presents...",
    "keywords": ["machine learning", "weather"],
    "is_published": true,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/publications
```

---

#### 5.9.2 Create Publication

| Field | Value |
|-------|-------|
| **Route** | `/api/publications` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `publications` |

**Request Body:**
```json
{
  "title": "Machine Learning for Weather Prediction",
  "authors": "P.A. Owolawi, J. Smith",
  "journal": "IEEE Transactions on Geoscience",
  "year": "2025",
  "doi": "10.1109/TGRS.2025.1234567",
  "pdf_url": null,
  "citation_count": 0,
  "type": "journal",
  "abstract": "This paper presents...",
  "keywords": ["machine learning", "weather"],
  "is_published": true
}
```

> **Note**: `type` must be one of: `'journal'`, `'conference'`, `'book'` (enforced by CHECK constraint).

> **Note**: The POST handler calls `.insert(body)` (without wrapping in array), unlike other endpoints that use `.insert([body])`.

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/publications \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"title":"ML for Weather","authors":"P.A. Owolawi","journal":"IEEE Trans.","year":"2025","type":"journal"}'
```

---

#### 5.9.3 Get Single Publication

| Field | Value |
|-------|-------|
| **Route** | `/api/publications/[id]` |
| **HTTP Method** | `GET` |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `publications` |

---

#### 5.9.4 Update Publication

| Field | Value |
|-------|-------|
| **Route** | `/api/publications/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `publications` |

---

#### 5.9.5 Delete Publication

| Field | Value |
|-------|-------|
| **Route** | `/api/publications/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `publications` |

**Success Response (200):**
```json
{ "success": true }
```

---

### 5.10 Research Areas

#### 5.10.1 List All Research Areas

| Field | Value |
|-------|-------|
| **Route** | `/api/research-areas` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all research areas ordered by `order_index` ascending |
| **Authentication Required** | No (RLS filters `is_active = true` for anon) |
| **Database Table** | `research_areas` |
| **Related Frontend Pages** | `components/Project.tsx`, `app/admin/research-areas/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "Artificial Intelligence",
    "icon": "ri-robot-line",
    "color": "from-blue-500 to-cyan-500",
    "description": "Research in AI and ML",
    "projects": ["Project A", "Project B"],
    "order_index": 0,
    "is_active": true,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/research-areas
```

---

#### 5.10.2 Create Research Area

| Field | Value |
|-------|-------|
| **Route** | `/api/research-areas` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `research_areas` |

**Request Body:**
```json
{
  "title": "Artificial Intelligence",
  "icon": "ri-robot-line",
  "color": "from-blue-500 to-cyan-500",
  "description": "Research in AI and ML",
  "projects": ["Project A", "Project B"],
  "order_index": 0,
  "is_active": true
}
```

---

#### 5.10.3 Get Single Research Area

| Field | Value |
|-------|-------|
| **Route** | `/api/research-areas/[id]` |
| **HTTP Method** | `GET` |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `research_areas` |

---

#### 5.10.4 Update Research Area

| Field | Value |
|-------|-------|
| **Route** | `/api/research-areas/[id]` |
| **HTTP Method** | `PUT` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `research_areas` |

---

#### 5.10.5 Delete Research Area

| Field | Value |
|-------|-------|
| **Route** | `/api/research-areas/[id]` |
| **HTTP Method** | `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `research_areas` |

**Success Response (200):**
```json
{ "success": true }
```

---

### 5.11 Speeches

#### 5.11.1 List All Speeches

| Field | Value |
|-------|-------|
| **Route** | `/api/speeches` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all speeches ordered by `date` descending |
| **Authentication Required** | No |
| **Database Table** | `speeches` |
| **Related Frontend Pages** | `components/Speeches.tsx`, `app/admin/speeches/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "title": "4IR in Higher Education",
    "event": "IEEE Conference 2025",
    "date": "2025-06-15T00:00:00.000Z",
    "location": "Cape Town, South Africa",
    "description": "Keynote address on...",
    "video_url": null,
    "slides_url": null,
    "thumbnail_url": null,
    "type": "keynote",
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/speeches
```

---

#### 5.11.2 Create Speech

| Field | Value |
|-------|-------|
| **Route** | `/api/speeches` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `speeches` |

**Request Body:**
```json
{
  "title": "4IR in Higher Education",
  "event": "IEEE Conference 2025",
  "date": "2025-06-15T00:00:00.000Z",
  "location": "Cape Town, South Africa",
  "description": "Keynote address on 4IR",
  "video_url": null,
  "slides_url": null,
  "type": "keynote"
}
```

> **Note**: `type` must be one of: `'keynote'`, `'conference'`, `'webinar'`, `'workshop'` (CHECK constraint). However, the TypeScript type in `types/index.ts` defines it as `'keynote' | 'invited' | 'panel' | 'workshop'` — there is a **mismatch between schema and TypeScript types**.

---

#### 5.11.3 Get/Update/Delete Single Speech

| Field | Value |
|-------|-------|
| **Route** | `/api/speeches/[id]` |
| **HTTP Methods** | `GET`, `PUT`, `DELETE` |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `speeches` |

Pattern is identical to other CRUD resources.

---

### 5.12 Testimonials

#### 5.12.1 List All Testimonials

| Field | Value |
|-------|-------|
| **Route** | `/api/testimonials` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all testimonials ordered by `order_index` ascending |
| **Authentication Required** | No (RLS filters `is_active = true` for anon) |
| **Database Table** | `testimonials` |
| **Related Frontend Pages** | `components/RecommendationText.tsx`, `app/admin/testimonials/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "quote": "Prof. Owolawi is an exceptional mentor...",
    "author": "Dr. Jane Doe",
    "role": "Senior Lecturer",
    "organization": "University of Pretoria",
    "icon": "ri-user-star-line",
    "image_url": null,
    "order_index": 0,
    "is_active": true,
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/testimonials
```

---

#### 5.12.2 Create Testimonial

| Field | Value |
|-------|-------|
| **Route** | `/api/testimonials` |
| **HTTP Method** | `POST` |
| **Authentication Required** | Yes |
| **Database Table** | `testimonials` |

**Request Body:**
```json
{
  "quote": "Prof. Owolawi is an exceptional mentor...",
  "author": "Dr. Jane Doe",
  "role": "Senior Lecturer",
  "organization": "University of Pretoria",
  "icon": "ri-user-star-line",
  "image_url": null,
  "order_index": 0,
  "is_active": true
}
```

---

#### 5.12.3 Get Single Testimonial

| Field | Value |
|-------|-------|
| **Route** | `/api/testimonials/[id]` |
| **HTTP Method** | `GET` |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `testimonials` |

**Error Responses:**
- `404`: `{ "error": "Testimonial not found" }`
- `500`: `{ "error": "Internal server error" }`

---

#### 5.12.4 Update/Delete Testimonial

| Field | Value |
|-------|-------|
| **Route** | `/api/testimonials/[id]` |
| **HTTP Methods** | `PUT`, `DELETE` |
| **Authentication Required** | Yes |
| **URL Parameters** | `id` — UUID |
| **Database Table** | `testimonials` |

---

### 5.13 Site Settings

#### 5.13.1 List All Settings

| Field | Value |
|-------|-------|
| **Route** | `/api/settings` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves all site settings ordered by `key` ascending |
| **Authentication Required** | No (public read via RLS) |
| **Database Table** | `site_settings` |
| **Related Frontend Pages** | `app/admin/settings/page.tsx` |

**Success Response (200):**
```json
[
  {
    "id": "uuid-string",
    "key": "site_title",
    "value": { "text": "Prof. Pius Owolawi" },
    "updated_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/settings
```

---

#### 5.13.2 Create Setting

| Field | Value |
|-------|-------|
| **Route** | `/api/settings` |
| **HTTP Method** | `POST` |
| **Description** | Creates a new key-value setting. Rejects duplicate keys. |
| **Authentication Required** | Yes |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Table** | `site_settings` |

**Request Body:**
```json
{
  "key": "site_title",
  "value": { "text": "Prof. Pius Owolawi" }
}
```

**Validation:**
- Both `key` and `value` are required (returns `400` if missing).
- Checks for existing setting with same key (returns `400` if duplicate).

**Success Response (201):**
```json
{
  "id": "uuid-string",
  "key": "site_title",
  "value": { "text": "Prof. Pius Owolawi" },
  "updated_at": "2026-02-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400`: `{ "error": "Key and value are required" }`
- `400`: `{ "error": "Setting with this key already exists" }`
- `500`: `{ "error": "Internal server error" }`

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"key":"site_title","value":{"text":"Prof. Pius Owolawi"}}'
```

---

#### 5.13.3 Get Single Setting by Key

| Field | Value |
|-------|-------|
| **Route** | `/api/settings/[key]` |
| **HTTP Method** | `GET` |
| **Description** | Retrieves a single setting by its key string |
| **Authentication Required** | No |
| **URL Parameters** | `key` — The setting key string (e.g., `site_title`) |
| **Database Table** | `site_settings` |

**Error Responses:**
- `404`: `{ "error": "Setting not found" }`
- `500`: `{ "error": "Internal server error" }`

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/settings/site_title
```

---

#### 5.13.4 Update Setting by Key

| Field | Value |
|-------|-------|
| **Route** | `/api/settings/[key]` |
| **HTTP Method** | `PUT` |
| **Description** | Updates a setting's value by its key. Also updates `updated_at` timestamp. |
| **Authentication Required** | Yes |
| **URL Parameters** | `key` — The setting key string |
| **Database Table** | `site_settings` |

**Request Body:**
```json
{
  "value": { "text": "Updated Value" }
}
```

**Validation:**
- `value` is required (returns `400` if missing).

**Error Responses:**
- `400`: `{ "error": "Value is required" }`
- `500`: `{ "error": "Internal server error" }`

**Example cURL:**
```bash
curl -X PUT http://localhost:3000/api/settings/site_title \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"value":{"text":"Updated Value"}}'
```

---

#### 5.13.5 Delete Setting by Key

| Field | Value |
|-------|-------|
| **Route** | `/api/settings/[key]` |
| **HTTP Method** | `DELETE` |
| **Description** | Deletes a setting by its key |
| **Authentication Required** | Yes |
| **URL Parameters** | `key` — The setting key string |
| **Database Table** | `site_settings` |

**Success Response (200):**
```json
{ "message": "Setting deleted successfully" }
```

> **Note**: Unlike other DELETE endpoints which return `{ "success": true }`, this returns `{ "message": "..." }`.

---

### 5.14 File Upload

#### 5.14.1 Upload File

| Field | Value |
|-------|-------|
| **Route** | `/api/upload` |
| **HTTP Method** | `POST` |
| **Description** | Uploads a file to Supabase Storage and returns the public URL |
| **Authentication Required** | Yes (Supabase Storage RLS requires authenticated user) |
| **Headers Required** | `Content-Type: multipart/form-data` (auto-set by browser), Session cookie |
| **Database Table** | None (Supabase Storage) |
| **Related Frontend Pages** | `components/admin/FileUploader.tsx`, `app/admin/hero/page.tsx` |

**Request Body (FormData):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | The file to upload |
| `bucket` | string | No | Target Supabase Storage bucket (defaults to `"publications"`) |

**Internal Logic Summary:**
1. Parses `FormData` from request.
2. Extracts `file` and optional `bucket` parameter.
3. Validates that a file was provided.
4. Converts File to `ArrayBuffer` then `Buffer`.
5. Generates a unique filename: `{timestamp}-{random}.{extension}`.
6. Uploads to specified Supabase Storage bucket.
7. Retrieves and returns the public URL.

**Success Response (200):**
```json
{
  "url": "https://your-project.supabase.co/storage/v1/object/public/publications/1707600000-abc1234.pdf",
  "path": "1707600000-abc1234.pdf"
}
```

**Error Responses:**
- `400`: `{ "error": "No file provided" }`
- `500`: `{ "error": "Upload error message" }`

**Available Storage Buckets:**
- `publications` — For PDFs (default)
- `hero-images` — For hero section profile images

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -F "file=@/path/to/document.pdf" \
  -F "bucket=publications"
```

**Example Postman:**
```
Method: POST
URL: {{base_url}}/api/upload
Headers:
  Cookie: (Supabase session cookies)
Body (form-data):
  file: [Select File]
  bucket: publications
```

---

### 5.15 Auth – Login

> **Important**: The login endpoint is **not** a Next.js API route handler. Authentication is performed **client-side** from the `/login` page using the Supabase browser SDK (`@supabase/ssr` → `createBrowserClient`). The SDK internally calls the Supabase Auth REST API. This section documents it as a testable endpoint for QA purposes.

#### 5.15.1 Login (Sign In with Email & Password)

| Field | Value |
|-------|-------|
| **Page Route** | `/login` |
| **Underlying Supabase Auth Endpoint** | `POST https://<project>.supabase.co/auth/v1/token?grant_type=password` |
| **HTTP Method** | `POST` |
| **Description** | Authenticates an admin user with email and password. On success, verifies the user exists in the `admin_users` table. If not an admin, the session is immediately destroyed. If admin, redirects to `/admin/dashboard`. |
| **Authentication Required** | No (this IS the authentication entry point) |
| **Headers Required** | `Content-Type: application/json`, `apikey: <SUPABASE_ANON_KEY>` |
| **Database Tables Used** | `admin_users` (for admin role verification after authentication) |
| **Related Frontend Pages** | `app/login/page.tsx` |

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "your-secure-password"
}
```

**Internal Logic Summary (Step by Step):**

1. User submits login form on `/login` page.
2. Client calls `supabase.auth.signInWithPassword({ email, password })`.
   - Internally this POSTs to `https://<project>.supabase.co/auth/v1/token?grant_type=password`.
3. **If auth fails** → Supabase returns error → displayed to user. Flow stops.
4. **If auth succeeds** → Supabase sets session cookies automatically via `@supabase/ssr`.
5. Client then queries `admin_users` table: `supabase.from('admin_users').select('role').eq('email', email).single()`.
6. **If user is NOT in `admin_users`** → client calls `supabase.auth.signOut()` to destroy session → displays error "You do not have admin access".
7. **If user IS in `admin_users`** → `router.push('/admin/dashboard')` + `router.refresh()`.

**Success Response (from Supabase Auth API):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "expires_at": 1707696000,
  "refresh_token": "v1.MWQ4...",
  "user": {
    "id": "uuid-string",
    "aud": "authenticated",
    "role": "authenticated",
    "email": "admin@example.com",
    "email_confirmed_at": "2026-02-01T00:00:00.000Z",
    "phone": "",
    "confirmed_at": "2026-02-01T00:00:00.000Z",
    "last_sign_in_at": "2026-02-11T00:00:00.000Z",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {
      "full_name": "Prof. Pius Owolawi"
    },
    "identities": [],
    "created_at": "2026-02-01T00:00:00.000Z",
    "updated_at": "2026-02-11T00:00:00.000Z"
  }
}
```

**Error Responses:**

| Scenario | Error Message | Status Code | Source |
|----------|--------------|-------------|--------|
| Wrong password | `"Invalid login credentials"` | 400 | Supabase Auth |
| Non-existent email | `"Invalid login credentials"` | 400 | Supabase Auth |
| Email not confirmed | `"Email not confirmed"` | 400 | Supabase Auth |
| Valid auth but not in `admin_users` | `"You do not have admin access"` | N/A (client-side) | Login page logic |
| Empty email | Blocked by HTML `required` attribute | N/A | Browser |
| Empty password | Blocked by HTML `required` attribute | N/A | Browser |
| Rate limited | `"Request rate limit reached"` | 429 | Supabase Auth |

**Status Codes (Supabase Auth API):**
- `200` — Authentication successful
- `400` — Invalid credentials or validation error
- `422` — Unprocessable entity
- `429` — Rate limit exceeded

**Session Cookies Set on Success:**

After successful authentication, the Supabase SSR SDK sets the following cookies:

| Cookie | Purpose |
|--------|----------|
| `sb-<project-ref>-auth-token` | Contains the access token, refresh token, and session metadata as a JSON-encoded value. Split across multiple cookies if too large. |
| `sb-<project-ref>-auth-token.0` | First chunk of split auth token (if token exceeds single cookie size limit) |
| `sb-<project-ref>-auth-token.1` | Second chunk of split auth token (if needed) |

**Example cURL — Direct Supabase Auth API:**
```bash
curl -X POST 'https://zejybnkdtatwdchotekg.supabase.co/auth/v1/token?grant_type=password' \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'
```

**Example cURL — Admin Verification (Step 2 after login):**
```bash
curl -X GET 'https://zejybnkdtatwdchotekg.supabase.co/rest/v1/admin_users?email=eq.admin@example.com&select=role' \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer ACCESS_TOKEN_FROM_STEP_1"
```

**Example Postman Configuration:**
```
── Request 1: Authenticate ──
Method: POST
URL: https://zejybnkdtatwdchotekg.supabase.co/auth/v1/token?grant_type=password
Headers:
  apikey: {{supabase_anon_key}}
  Content-Type: application/json
Body (raw JSON):
{
  "email": "admin@example.com",
  "password": "your-password"
}

Tests (auto-capture token):
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("access_token", jsonData.access_token);
    pm.environment.set("refresh_token", jsonData.refresh_token);
});

── Request 2: Verify Admin Role ──
Method: GET
URL: https://zejybnkdtatwdchotekg.supabase.co/rest/v1/admin_users?email=eq.admin@example.com&select=role
Headers:
  apikey: {{supabase_anon_key}}
  Authorization: Bearer {{access_token}}

Tests:
pm.test("User is admin", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData.length).to.be.above(0);
    pm.expect(jsonData[0].role).to.eql("admin");
});
```

**Example Postman — Using Next.js Login Page Directly:**
```
Method: N/A (Browser-only flow)

The login is handled entirely client-side via the Supabase JS SDK.
To test via Postman, use the Supabase Auth REST API directly
(Request 1 above), then use the obtained access_token in the
Cookie header for subsequent Next.js API route calls.

To convert the access_token to a cookie for Next.js API testing:
  Cookie: sb-zejybnkdtatwdchotekg-auth-token=base64_encoded_session_json
```

**Testing the Login Flow End-to-End (Browser):**

1. Navigate to `http://localhost:3000/login`.
2. Enter valid admin email and password.
3. Verify redirect to `/admin/dashboard`.
4. Verify session cookies are set in browser DevTools → Application → Cookies.
5. Verify the admin dashboard loads with content counts.
6. Navigate back to `/login` — should still have active session.

**Security Notes:**
- The login form uses HTML `type="email"` for basic email format validation.
- The login form uses HTML `required` attributes on both fields.
- No CSRF protection is implemented on the login form.
- No brute-force protection at the application level (Supabase may have its own rate limiting).
- The admin verification check happens **after** successful authentication — the user briefly has a valid Supabase session before it's destroyed if they're not an admin.
- Passwords are never logged or stored by the application — all password handling is delegated to Supabase Auth.

---

### 5.16 Auth – Sign Out

#### 5.16.1 Sign Out

| Field | Value |
|-------|-------|
| **Route** | `/api/auth/signout` |
| **HTTP Method** | `POST` |
| **Description** | Signs out the current user and redirects to login page |
| **Authentication Required** | No (handles gracefully if no session) |
| **Headers Required** | Session cookie |
| **Request Body** | None |
| **Database Table** | None |
| **Related Frontend Pages** | `app/admin/settings/page.tsx` |

**Internal Logic Summary:**
1. Creates Supabase server client.
2. Calls `supabase.auth.signOut()`.
3. Determines origin from `request.headers.get('origin')` or `NEXT_PUBLIC_SITE_URL` or `http://localhost:3000`.
4. Returns `303 See Other` redirect to `/login`.

**Success Response:**
- `303 See Other` — Redirect to `/login`
- Sets `Location` header to `{origin}/login`

> **Note**: This endpoint returns a redirect, not JSON. Test with redirect following disabled to see the 303.

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/signout \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -v -L
```

**Example cURL (no redirect following):**
```bash
curl -X POST http://localhost:3000/api/auth/signout \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -v
```

---

### 5.17 Admin – Update Email

#### 5.17.1 Update Admin Email

| Field | Value |
|-------|-------|
| **Route** | `/api/admin/update-email` |
| **HTTP Method** | `POST` |
| **Description** | Initiates email change for the current admin user. Updates both Supabase Auth and `admin_users` table. |
| **Authentication Required** | Yes (explicit session check in handler) |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Tables** | `admin_users` (also Supabase Auth user) |
| **Related Frontend Pages** | `app/admin/settings/page.tsx` |

**Request Body:**
```json
{
  "newEmail": "new-admin@example.com"
}
```

**Internal Logic Summary:**
1. Verifies active session via `supabase.auth.getSession()`.
2. If no session → returns `401 Unauthorized`.
3. Validates `newEmail` is provided → `400` if missing.
4. Validates email format with regex → `400` if invalid.
5. Calls `supabase.auth.updateUser({ email: newEmail })` to update auth email.
6. Updates `admin_users` table to match new email.
7. Returns success message (email confirmation may be required by Supabase).

**Success Response (200):**
```json
{
  "message": "Email update initiated. Please check your new email for confirmation."
}
```

**Error Responses:**
- `400`: `{ "error": "New email is required" }`
- `400`: `{ "error": "Invalid email format" }`
- `400`: `{ "error": "Supabase auth error message" }`
- `401`: `{ "error": "Unauthorized" }`
- `500`: `{ "error": "Failed to update email" }`

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/admin/update-email \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"newEmail":"new-admin@example.com"}'
```

**Example Postman:**
```
Method: POST
URL: {{base_url}}/api/admin/update-email
Headers:
  Content-Type: application/json
  Cookie: (Supabase session cookies)
Body (raw JSON):
{
  "newEmail": "new-admin@example.com"
}
```

---

### 5.18 Admin – Update Password

#### 5.18.1 Update Admin Password

| Field | Value |
|-------|-------|
| **Route** | `/api/admin/update-password` |
| **HTTP Method** | `POST` |
| **Description** | Changes the password for the current admin user. Verifies current password first. |
| **Authentication Required** | Yes (explicit session check in handler) |
| **Headers Required** | `Content-Type: application/json`, Session cookie |
| **Database Tables** | None (Supabase Auth only) |
| **Related Frontend Pages** | `app/admin/settings/page.tsx` |

**Request Body:**
```json
{
  "currentPassword": "current-password-here",
  "newPassword": "new-secure-password-123"
}
```

**Internal Logic Summary:**
1. Verifies active session via `supabase.auth.getSession()`.
2. If no session → returns `401 Unauthorized`.
3. Validates both `currentPassword` and `newPassword` are provided → `400` if missing.
4. Validates `newPassword` is at least 8 characters → `400` if too short.
5. Verifies `currentPassword` by attempting `supabase.auth.signInWithPassword()` → `400` if incorrect.
6. Updates password via `supabase.auth.updateUser({ password: newPassword })`.
7. Returns success message.

**Success Response (200):**
```json
{
  "message": "Password updated successfully"
}
```

**Error Responses:**
- `400`: `{ "error": "Current password and new password are required" }`
- `400`: `{ "error": "New password must be at least 8 characters long" }`
- `400`: `{ "error": "Current password is incorrect" }`
- `400`: `{ "error": "Supabase auth error message" }`
- `401`: `{ "error": "Unauthorized" }`
- `500`: `{ "error": "Failed to update password" }`

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/admin/update-password \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_TOKEN; sb-refresh-token=YOUR_REFRESH" \
  -d '{"currentPassword":"old-password","newPassword":"new-secure-pass-123"}'
```

**Example Postman:**
```
Method: POST
URL: {{base_url}}/api/admin/update-password
Headers:
  Content-Type: application/json
  Cookie: (Supabase session cookies)
Body (raw JSON):
{
  "currentPassword": "old-password",
  "newPassword": "new-secure-pass-123"
}
```

---

## 6. External APIs Consumed

| # | Service | Endpoint Used | Purpose | Called From |
|---|---------|---------------|---------|-------------|
| 1 | **Supabase Auth** | `https://<project>.supabase.co/auth/v1/*` | User authentication (sign in, sign out, sign up, session management, token refresh) | `lib/supabase/client.ts`, `lib/supabase/server.ts`, `middleware.ts`, `lib/auth.ts`, `app/login/page.tsx`, `app/admin/layout.tsx` |
| 2 | **Supabase Database (PostgREST)** | `https://<project>.supabase.co/rest/v1/*` | All CRUD operations on 14 database tables | Every API route handler, every frontend component, every admin page |
| 3 | **Supabase Storage** | `https://<project>.supabase.co/storage/v1/*` | File upload/download for PDFs and images | `app/api/upload/route.ts`, `components/admin/FileUploader.tsx`, `app/admin/hero/page.tsx` |

> **Note**: All external service communication is handled through the Supabase JavaScript SDK. There are no direct REST API calls to third-party services, no webhook integrations, no email service calls, and no external analytics APIs.

### Supabase Auth Details

| Operation | SDK Method | Where Called |
|-----------|-----------|-------------|
| Sign in with password | `supabase.auth.signInWithPassword()` | `app/login/page.tsx`, `lib/auth.ts`, `app/api/admin/update-password/route.ts` |
| Sign out | `supabase.auth.signOut()` | `app/api/auth/signout/route.ts`, `lib/auth.ts`, `app/login/page.tsx`, `app/admin/layout.tsx` |
| Sign up | `supabase.auth.signUp()` | `lib/auth.ts` (available but not exposed via API route) |
| Get session | `supabase.auth.getSession()` | `middleware.ts`, `lib/auth.ts`, `app/api/admin/update-email/route.ts`, `app/api/admin/update-password/route.ts` |
| Get user | `supabase.auth.getUser()` | `lib/auth.ts` |
| Update user | `supabase.auth.updateUser()` | `app/api/admin/update-email/route.ts`, `app/api/admin/update-password/route.ts` |

### Supabase Storage Details

| Bucket | Purpose | Public | Upload Policy | Delete Policy |
|--------|---------|--------|---------------|---------------|
| `publications` | PDF documents for publications | Yes (public read) | Authenticated users only | Authenticated users only |
| `hero-images` | Profile/hero section images | Yes (public read) | Authenticated users only | Authenticated users only |

---

## 7. Server Actions (If Used)

**Server Actions are NOT used in this project.**

No files contain the `'use server'` directive. All data mutations are handled through:
1. Client-side `fetch()` calls to Next.js API route handlers (for admin CRUD operations).
2. Direct Supabase client SDK calls (for authentication on login page).

The `lib/auth.ts` file contains helper functions (`getSession`, `getUser`, `isAdmin`, `signIn`, `signOut`, `signUp`) but these are **not** Server Actions — they are regular async functions imported and called from server components and API routes.

---

## 8. Data Models / Database Schema

### Database: Supabase PostgreSQL

### 8.1 Tables

#### `hero_section` (Singleton)

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `name` | TEXT | NOT NULL | — |
| `subtitle` | TEXT | NOT NULL | — |
| `description` | TEXT | NOT NULL | — |
| `image_url` | TEXT | nullable | — |
| `stats` | JSONB | — | `'{"publications": 200, "funding": "R94M+"}'` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**RLS**: Public read; admin full access.

---

#### `education`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `degree` | TEXT | NOT NULL | — |
| `institution` | TEXT | NOT NULL | — |
| `country` | TEXT | NOT NULL | — |
| `year_start` | TEXT | NOT NULL | — |
| `year_end` | TEXT | nullable | — |
| `specialization` | TEXT | NOT NULL | — |
| `icon` | TEXT | — | `'ri-graduation-cap-fill'` |
| `color` | TEXT | — | `'from-blue-600 to-cyan-600'` |
| `bg_color` | TEXT | — | `'from-blue-50 to-cyan-50'` |
| `order_index` | INTEGER | — | `0` |
| `is_ongoing` | BOOLEAN | — | `FALSE` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_education_order` on `order_index`.

---

#### `certifications`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `name` | TEXT | NOT NULL | — |
| `full_name` | TEXT | NOT NULL | — |
| `icon` | TEXT | — | `'ri-shield-check-fill'` |
| `issued_by` | TEXT | nullable | — |
| `year` | TEXT | nullable | — |
| `order_index` | INTEGER | — | `0` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_certifications_order` on `order_index`.

---

#### `awards`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `year` | TEXT | NOT NULL | — |
| `organization` | TEXT | NOT NULL | — |
| `description` | TEXT | NOT NULL | — |
| `icon` | TEXT | — | `'ri-trophy-line'` |
| `color` | TEXT | — | `'from-yellow-500 to-orange-500'` |
| `order_index` | INTEGER | — | `0` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_awards_year` on `year DESC`, `idx_awards_order` on `order_index`.

> **Note**: The TypeScript interface `AwardItem` uses `issuer` instead of `organization`. The database schema uses `organization`. This is a **schema-type mismatch**.

---

#### `research_areas`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `icon` | TEXT | — | `'ri-flask-line'` |
| `color` | TEXT | — | `'from-blue-500 to-cyan-500'` |
| `description` | TEXT | nullable | — |
| `projects` | JSONB | — | `'[]'` |
| `order_index` | INTEGER | — | `0` |
| `is_active` | BOOLEAN | — | `TRUE` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_research_areas_active` on `(is_active, order_index)`.
**RLS**: Public read filtered by `is_active = true`.

---

#### `publications`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `authors` | TEXT | NOT NULL | — |
| `journal` | TEXT | NOT NULL | — |
| `year` | TEXT | NOT NULL | — |
| `doi` | TEXT | nullable | — |
| `pdf_url` | TEXT | nullable | — |
| `citation_count` | INTEGER | — | `0` |
| `type` | TEXT | CHECK `('journal','conference','book')` | `'journal'` |
| `abstract` | TEXT | nullable | — |
| `keywords` | TEXT[] | — | `'{}'` |
| `is_published` | BOOLEAN | — | `TRUE` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_publications_year` on `year DESC`, `idx_publications_type` on `type`.
**RLS**: Public read filtered by `is_published = true`.

> **Note**: The TypeScript interface `Publication` includes `external_url` and has `year` as `number`, but the schema has `year` as `TEXT` and does not include `external_url`. Also, the TS type includes `'patent'` as a valid type, which the CHECK constraint does not allow. These are **schema-type mismatches**.

---

#### `speeches`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `event` | TEXT | NOT NULL | — |
| `date` | TIMESTAMPTZ | NOT NULL | — |
| `location` | TEXT | NOT NULL | — |
| `description` | TEXT | nullable | — |
| `video_url` | TEXT | nullable | — |
| `slides_url` | TEXT | nullable | — |
| `thumbnail_url` | TEXT | nullable | — |
| `type` | TEXT | CHECK `('keynote','conference','webinar','workshop')` | `'conference'` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_speeches_date` on `date DESC`.

> **Note**: TypeScript type uses `'invited' | 'panel'` which do not exist in the CHECK constraint. Schema has `'conference' | 'webinar'` which are not in the TS type.

---

#### `achievements`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `count` | TEXT | NOT NULL | — |
| `icon` | TEXT | — | `'ri-star-line'` |
| `color` | TEXT | — | `'from-blue-500 to-cyan-500'` |
| `details` | JSONB | — | `'[]'` |
| `category` | TEXT | NOT NULL | — |
| `order_index` | INTEGER | — | `0` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_achievements_category` on `category`.

---

#### `professional_memberships`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `name` | TEXT | NOT NULL | — |
| `role` | TEXT | NOT NULL | — |
| `registration_no` | TEXT | NOT NULL | — |
| `year` | TEXT | nullable | — |
| `is_active` | BOOLEAN | — | `TRUE` |
| `order_index` | INTEGER | — | `0` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**RLS**: Public read filtered by `is_active = true`.

> **Note**: The TypeScript interface `ProfessionalMembership` uses `organization` and `year_joined` and `description`, but the schema uses `name`, `registration_no`, and `year`. This is a significant **schema-type mismatch**.

---

#### `community_initiatives`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `description` | TEXT | NOT NULL | — |
| `icon` | TEXT | — | `'ri-heart-line'` |
| `color` | TEXT | — | `'from-blue-500 to-purple-500'` |
| `order_index` | INTEGER | — | `0` |
| `is_active` | BOOLEAN | — | `TRUE` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**RLS**: Public read filtered by `is_active = true`.

---

#### `testimonials`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `quote` | TEXT | NOT NULL | — |
| `author` | TEXT | NOT NULL | — |
| `role` | TEXT | NOT NULL | — |
| `organization` | TEXT | nullable | — |
| `icon` | TEXT | — | `'ri-user-star-line'` |
| `image_url` | TEXT | nullable | — |
| `order_index` | INTEGER | — | `0` |
| `is_active` | BOOLEAN | — | `TRUE` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_testimonials_active` on `(is_active, order_index)`.
**RLS**: Public read filtered by `is_active = true`.

---

#### `gallery_images`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `title` | TEXT | NOT NULL | — |
| `image_url` | TEXT | NOT NULL | — |
| `alt_text` | TEXT | NOT NULL | — |
| `category` | TEXT | CHECK `('lab','event','award','research','other')` | `'other'` |
| `order_index` | INTEGER | — | `0` |
| `is_active` | BOOLEAN | — | `TRUE` |
| `uploaded_at` | TIMESTAMPTZ | — | `NOW()` |

**Indexes**: `idx_gallery_category` on `(category, is_active)`.
**RLS**: Public read filtered by `is_active = true`.

> **Note**: This table uses `uploaded_at` instead of `created_at`/`updated_at`. The TypeScript interface uses `caption` which does not exist in the schema (schema uses `title` instead).

---

#### `site_settings`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `key` | TEXT | UNIQUE, NOT NULL | — |
| `value` | JSONB | NOT NULL | — |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**RLS**: Public read; admin full access.

---

#### `admin_users`

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| `id` | UUID | PRIMARY KEY | `uuid_generate_v4()` |
| `email` | TEXT | UNIQUE, NOT NULL | — |
| `full_name` | TEXT | NOT NULL | — |
| `role` | TEXT | CHECK `('admin','editor','viewer')` | `'admin'` |
| `created_at` | TIMESTAMPTZ | — | `NOW()` |
| `updated_at` | TIMESTAMPTZ | — | `NOW()` |

**RLS**: Users can only read their own record (`auth.jwt()->>'email' = email`).

---

### 8.2 Relationships

There are **no foreign key relationships** between tables. All tables are independent entities. The only implicit relationship is:
- `admin_users.email` ↔ Supabase Auth `user.email` — used for admin verification in middleware and login.

### 8.3 Validation Logic

Validation is handled at three levels:

| Level | Mechanism | Details |
|-------|-----------|---------|
| **Database** | CHECK constraints | `publications.type`, `speeches.type`, `gallery_images.category`, `admin_users.role` |
| **Database** | NOT NULL constraints | Various required fields per table |
| **Database** | UNIQUE constraints | `site_settings.key`, `admin_users.email` |
| **API Route** | Manual validation | Only in `/api/settings` (key/value required), `/api/admin/update-email` (email format regex), `/api/admin/update-password` (min 8 chars) |
| **Frontend** | HTML form validation | Required attributes on form inputs |

> **Note**: Most API routes perform **no server-side validation** beyond what the database enforces. The request body is passed directly to Supabase `insert`/`update`.

### 8.4 Auto-Update Triggers

All tables with `updated_at` columns have a `BEFORE UPDATE` trigger that automatically sets `updated_at = NOW()` on any update, via the `update_updated_at_column()` function.

---

## 9. Middleware Logic

**File**: `middleware.ts`

### Route Protection Rules

| Path Pattern | Behavior |
|-------------|----------|
| `/admin/*` | Protected — requires valid Supabase session AND membership in `admin_users` table |
| `/api/*` | **NOT protected by middleware** — relies on Supabase RLS at database level |
| `/login` | Public |
| `/` (all other routes) | Public |

### Middleware Execution Flow

```
1. Incoming Request
   │
2. Create Supabase server client with cookie management
   │  - Reads cookies from request
   │  - Sets up cookie get/set/remove handlers
   │
3. Refresh session: supabase.auth.getSession()
   │  - Refreshes expired tokens
   │  - Updates session cookies
   │
4. Check if path starts with '/admin'
   │
   ├── NO → Return response (pass through)
   │
   └── YES → Check session
       │
       ├── No session → Redirect to /login
       │
       └── Session exists → Query admin_users table
           │  SELECT role FROM admin_users WHERE email = session.user.email
           │
           ├── No admin user found → Redirect to /unauthorized
           │
           └── Admin user found → Return response (allow access)
```

### Middleware Configuration

```typescript
// Implicit: middleware runs on all routes by default
// No explicit matcher configuration is defined
```

### Role-Based Access

The `admin_users` table supports three roles: `'admin'`, `'editor'`, `'viewer'`. However, the middleware only checks for **existence** in the `admin_users` table — it does **not** enforce role-based permissions. All admin users have equal access regardless of role.

### Redirect Logic

| Condition | Redirect Target | HTTP Status |
|-----------|----------------|-------------|
| No session on `/admin/*` | `/login` | 307 (Temporary Redirect) |
| Session but not admin | `/unauthorized` | 307 (Temporary Redirect) |

> **Note**: The `/unauthorized` page is not defined in the project. Navigating to it would result in a 404.

---

## 10. Error Handling Strategy

### Global Error Handlers

There are **no global error handlers** configured. Each API route handler has its own try-catch block.

### Per-Route Error Pattern

All API routes follow one of two error patterns:

**Pattern A** (used by achievements, community-initiatives, gallery-images, professional-memberships, testimonials, hero-section):
```typescript
try {
  // ... operation
  if (error) {
    console.error('Error message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
} catch (error: any) {
  console.error('Unexpected error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

**Pattern B** (used by awards, certifications, education, publications, research-areas, speeches):
```typescript
try {
  // ... operation
  if (error) throw error;
  return NextResponse.json(data);
} catch (error: any) {
  console.error('Error type:', error);
  return NextResponse.json(
    { error: error.message || "Failed to <action> <resource>" },
    { status: 500 }
  );
}
```

### Response Format Consistency

| Aspect | Consistency |
|--------|-------------|
| **Success (list)** | `200` — Array of objects |
| **Success (single)** | `200` — Single object |
| **Success (create)** | `200` — Created object (note: not `201`, except for settings POST) |
| **Success (delete)** | `200` — `{ "success": true }` (except settings: `{ "message": "..." }`) |
| **Auth error** | `401` — `{ "error": "Unauthorized" }` (only in admin routes) |
| **Validation error** | `400` — `{ "error": "description" }` (only in settings, update-email, update-password) |
| **Not found** | `404` — `{ "error": "Resource not found" }` (only some GET by ID routes) |
| **Server error** | `500` — `{ "error": "message" }` |

### Inconsistencies Detected

1. **Settings POST** returns `201`, all other POST routes return `200`.
2. **Settings DELETE** returns `{ "message": "..." }`, all others return `{ "success": true }`.
3. Some GET-by-ID routes return `404` when not found (achievements, community-initiatives, gallery-images, professional-memberships, testimonials), while others just return a `500` from Supabase's `.single()` error.
4. No routes return `403 Forbidden` — unauthorized writes silently fail at the RLS level with a `500` error.

### Custom Error Utilities

None. No shared error handling utilities or classes exist. Error handling is inline in each route.

---

## 11. Testing Checklist Section

### Authentication Tests

- [ ] **AUTH-01**: Test login with valid admin email and password → should redirect to `/admin/dashboard`
- [ ] **AUTH-02**: Test login with valid Supabase auth user who is NOT in `admin_users` → should show error "You do not have admin access"
- [ ] **AUTH-03**: Test login with invalid email → should show Supabase error
- [ ] **AUTH-04**: Test login with wrong password → should show Supabase error
- [ ] **AUTH-05**: Test login with empty email → should be blocked by HTML validation
- [ ] **AUTH-06**: Test login with empty password → should be blocked by HTML validation
- [ ] **AUTH-07**: Test sign out via `POST /api/auth/signout` → should redirect to `/login` with 303
- [ ] **AUTH-08**: Test accessing `/admin/dashboard` without session → should redirect to `/login`
- [ ] **AUTH-09**: Test accessing `/admin/dashboard` with non-admin session → should redirect to `/unauthorized`

### Admin Settings Tests

- [ ] **ADMIN-01**: Test `POST /api/admin/update-email` without session → should return 401
- [ ] **ADMIN-02**: Test `POST /api/admin/update-email` with empty newEmail → should return 400
- [ ] **ADMIN-03**: Test `POST /api/admin/update-email` with invalid email format → should return 400
- [ ] **ADMIN-04**: Test `POST /api/admin/update-email` with valid new email → should return 200
- [ ] **ADMIN-05**: Test `POST /api/admin/update-password` without session → should return 401
- [ ] **ADMIN-06**: Test `POST /api/admin/update-password` with missing fields → should return 400
- [ ] **ADMIN-07**: Test `POST /api/admin/update-password` with short password (< 8 chars) → should return 400
- [ ] **ADMIN-08**: Test `POST /api/admin/update-password` with wrong current password → should return 400
- [ ] **ADMIN-09**: Test `POST /api/admin/update-password` with valid data → should return 200

### CRUD Tests (Repeat for each of the 12 resources)

**Resources**: achievements, awards, certifications, community-initiatives, education, gallery-images, professional-memberships, publications, research-areas, speeches, testimonials, settings

- [ ] **CRUD-01**: `GET /api/{resource}` → should return 200 with array
- [ ] **CRUD-02**: `GET /api/{resource}` → verify response shape matches schema
- [ ] **CRUD-03**: `GET /api/{resource}/[id]` with valid UUID → should return 200 with object
- [ ] **CRUD-04**: `GET /api/{resource}/[id]` with non-existent UUID → should return 404 or 500
- [ ] **CRUD-05**: `GET /api/{resource}/[id]` with invalid UUID format → should return 500
- [ ] **CRUD-06**: `POST /api/{resource}` with valid body and auth → should return 200 with created object
- [ ] **CRUD-07**: `POST /api/{resource}` with valid body but NO auth → should return 500 (RLS violation)
- [ ] **CRUD-08**: `POST /api/{resource}` with empty body and auth → should return 500
- [ ] **CRUD-09**: `POST /api/{resource}` with missing required fields → should return 500 (DB constraint)
- [ ] **CRUD-10**: `PUT /api/{resource}/[id]` with valid body and auth → should return 200
- [ ] **CRUD-11**: `PUT /api/{resource}/[id]` with valid body but NO auth → should return 500 (RLS)
- [ ] **CRUD-12**: `PUT /api/{resource}/[id]` with non-existent UUID → should return 500
- [ ] **CRUD-13**: `DELETE /api/{resource}/[id]` with auth → should return 200 with `{ "success": true }`
- [ ] **CRUD-14**: `DELETE /api/{resource}/[id]` without auth → should return 500 (RLS)
- [ ] **CRUD-15**: `DELETE /api/{resource}/[id]` with non-existent UUID → should return 200 (silent no-op)

### Hero Section Tests (Singleton Resource)

- [ ] **HERO-01**: `GET /api/hero-section` → should return 200 with single object
- [ ] **HERO-02**: `PUT /api/hero-section` with auth → should return 200 with updated object
- [ ] **HERO-03**: `PUT /api/hero-section` without auth → should return 500 (RLS)
- [ ] **HERO-04**: Verify upsert logic — PUT when no record exists should create one

### File Upload Tests

- [ ] **UPLOAD-01**: `POST /api/upload` with valid file and auth → should return 200 with `url` and `path`
- [ ] **UPLOAD-02**: `POST /api/upload` without file → should return 400 `"No file provided"`
- [ ] **UPLOAD-03**: `POST /api/upload` without auth → should return 500 (storage RLS)
- [ ] **UPLOAD-04**: `POST /api/upload` with custom bucket parameter → should upload to specified bucket
- [ ] **UPLOAD-05**: `POST /api/upload` without bucket parameter → should default to `publications` bucket
- [ ] **UPLOAD-06**: Verify uploaded file is publicly accessible via returned URL
- [ ] **UPLOAD-07**: Test with large file (> 5MB) → behavior depends on Supabase plan limits

### Settings-Specific Tests

- [ ] **SET-01**: `POST /api/settings` with duplicate key → should return 400
- [ ] **SET-02**: `POST /api/settings` with missing key or value → should return 400
- [ ] **SET-03**: `GET /api/settings/[key]` with non-existent key → should return 404
- [ ] **SET-04**: `PUT /api/settings/[key]` with missing value → should return 400

### Database Constraint Tests

- [ ] **DB-01**: POST publication with invalid `type` (not journal/conference/book) → should return 500
- [ ] **DB-02**: POST speech with invalid `type` → should return 500
- [ ] **DB-03**: POST gallery image with invalid `category` → should return 500
- [ ] **DB-04**: POST admin user with invalid `role` → should return 500
- [ ] **DB-05**: POST setting with duplicate `key` (via direct Supabase) → should fail unique constraint

### RLS Policy Tests

- [ ] **RLS-01**: Verify unauthenticated read of `research_areas` only returns `is_active = true` records
- [ ] **RLS-02**: Verify unauthenticated read of `publications` only returns `is_published = true` records
- [ ] **RLS-03**: Verify unauthenticated read of `testimonials` only returns `is_active = true` records
- [ ] **RLS-04**: Verify unauthenticated read of `community_initiatives` only returns `is_active = true` records
- [ ] **RLS-05**: Verify unauthenticated read of `professional_memberships` only returns `is_active = true` records
- [ ] **RLS-06**: Verify unauthenticated read of `gallery_images` only returns `is_active = true` records
- [ ] **RLS-07**: Verify authenticated user can perform all CRUD operations

### Edge Case Tests

- [ ] **EDGE-01**: Send GET request to POST-only endpoint → should return 405 (Method Not Allowed, handled by Next.js)
- [ ] **EDGE-02**: Send POST request to GET/PUT-only endpoint (e.g., `/api/hero-section`) → should return 405
- [ ] **EDGE-03**: Send request with malformed JSON body → should return 500
- [ ] **EDGE-04**: Send request with empty JSON body `{}` to POST endpoint → should return 500 (NOT NULL constraint)
- [ ] **EDGE-05**: Test concurrent updates to same resource
- [ ] **EDGE-06**: Test with expired session cookie
- [ ] **EDGE-07**: Verify `updated_at` auto-updates via trigger on PUT operations

### Rate Limiting

- [ ] **RATE-01**: No rate limiting is implemented in the application. Supabase may impose its own rate limits at the platform level.

---

## 12. API Flow Diagram (Text Based)

### Public Data Flow (Read)

```
┌──────────────────────────────────────────────────────────┐
│                    PUBLIC USER BROWSER                     │
│                                                           │
│  components/Hero.tsx ──────────────────────┐              │
│  components/Education.tsx ─────────────────┤              │
│  components/Publications.tsx ──────────────┤              │
│  components/Speeches.tsx ──────────────────┤              │
│  components/Gallery.tsx ───────────────────┤              │
│  components/Project.tsx ───────────────────┤              │
│  components/Achieved.tsx ──────────────────┤              │
│  components/WhatHaveDone.tsx ──────────────┤              │
│  components/RecommendationText.tsx ────────┘              │
│                     │                                     │
│           Supabase Client SDK                             │
│          (createBrowserClient)                            │
└─────────────────────┼─────────────────────────────────────┘
                      │ Direct SDK calls (no API routes)
                      ▼
         ┌─────────────────────────┐
         │   Supabase PostgREST    │
         │   (REST API over PG)    │
         └────────────┬────────────┘
                      │
                      ▼
         ┌─────────────────────────┐
         │   PostgreSQL Database   │
         │   (with RLS policies)   │
         │                         │
         │   Public read allowed   │
         │   via anon key          │
         └─────────────────────────┘
```

### Admin Data Flow (CRUD)

```
┌──────────────────────────────────────────────────────────┐
│                   ADMIN USER BROWSER                      │
│                                                           │
│  Login Page ─── supabase.auth.signInWithPassword() ──────►│
│                                                           │
│  Admin Form Components ──── fetch('/api/{resource}') ────►│
│  (AchievementForm, AwardForm, etc.)                       │
│                                                           │
│  FileUploader ──── fetch('/api/upload', FormData) ───────►│
│                                                           │
│  Settings Page ──── fetch('/api/admin/update-*') ────────►│
└────────────────────────┼──────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER                         │
│                                                           │
│  ┌──────────────┐     ┌──────────────────────────────┐   │
│  │  Middleware   │────►│  Route Handler               │   │
│  │              │     │  (app/api/**/route.ts)        │   │
│  │  Session     │     │                              │   │
│  │  Refresh     │     │  1. Create Supabase Client   │   │
│  │              │     │  2. Parse Request Body       │   │
│  │  Admin Check │     │  3. Execute DB Operation     │   │
│  │  (for /admin │     │  4. Return JSON Response     │   │
│  │   pages only)│     │                              │   │
│  └──────────────┘     └──────────────┬───────────────┘   │
│                                       │                   │
│  ┌──────────────────────────────┐    │                   │
│  │  Server Components          │    │                   │
│  │  (admin list/edit pages)    │    │                   │
│  │                              │    │                   │
│  │  Direct Supabase Server SDK ─┼────┤                   │
│  │  (createServerClient)       │    │                   │
│  └──────────────────────────────┘    │                   │
└──────────────────────────────────────┼───────────────────┘
                                       │
                                       ▼
                          ┌─────────────────────────┐
                          │   Supabase Platform      │
                          │                          │
                          │  ┌────────────────────┐  │
                          │  │   Auth Service     │  │
                          │  │   (JWT sessions)   │  │
                          │  └────────────────────┘  │
                          │                          │
                          │  ┌────────────────────┐  │
                          │  │   PostgREST        │  │
                          │  │   (DB operations)  │  │
                          │  └────────────────────┘  │
                          │                          │
                          │  ┌────────────────────┐  │
                          │  │   Storage          │  │
                          │  │   (File uploads)   │  │
                          │  └────────────────────┘  │
                          │                          │
                          │  ┌────────────────────┐  │
                          │  │   PostgreSQL DB    │  │
                          │  │   (14 tables)      │  │
                          │  │   (RLS enabled)    │  │
                          │  └────────────────────┘  │
                          └─────────────────────────┘
```

### Authentication Flow

```
User → /login page
  │
  ├── Enter email + password
  │
  ├── supabase.auth.signInWithPassword()
  │     │
  │     ├── FAIL → Show error message
  │     │
  │     └── SUCCESS → Session cookies set by Supabase SDK
  │           │
  │           ├── Query admin_users table
  │           │     │
  │           │     ├── NOT FOUND → Sign out + show "no admin access"
  │           │     │
  │           │     └── FOUND → router.push('/admin/dashboard')
  │           │
  │           └── Middleware validates session on every /admin/* request
  │                 │
  │                 ├── Session expired → Redirect to /login
  │                 │
  │                 └── Session valid → Allow request
  │
  └── Sign Out
        │
        ├── POST /api/auth/signout
        │     │
        │     └── supabase.auth.signOut() → Redirect to /login (303)
        │
        └── Session cookies cleared
```

### Request Lifecycle

```
Browser Request
       │
       ▼
 Next.js Server
       │
       ▼
 middleware.ts
  ├── Create Supabase client (with cookie management)
  ├── Refresh session (supabase.auth.getSession())
  ├── If /admin/* path:
  │     ├── No session? → 307 Redirect → /login
  │     └── Session exists?
  │           ├── Not in admin_users? → 307 Redirect → /unauthorized
  │           └── Is admin? → Pass through
  └── Return response
       │
       ▼
 Route Handler (app/api/**/route.ts)
  ├── Create Supabase server client (with cookies from request)
  ├── Parse request body (if POST/PUT)
  ├── Execute Supabase query
  │     ├── Supabase SDK sends request to PostgREST
  │     ├── PostgREST checks RLS policies
  │     │     ├── Read: Allowed for anon (with filters like is_active)
  │     │     └── Write: Requires auth.uid() IS NOT NULL
  │     └── Returns data or error
  ├── Handle error → Return { error: message } with 500
  └── Return data as JSON with 200
       │
       ▼
 Browser Response
```

---

## Appendix A: Complete Endpoint Reference Table

| # | Method | Route | Auth | DB Table | Notes |
|---|--------|-------|------|----------|-------|
| 1 | GET | `/api/achievements` | No | achievements | Order by order_index ASC |
| 2 | POST | `/api/achievements` | Yes | achievements | |
| 3 | GET | `/api/achievements/[id]` | No | achievements | Returns 404 if not found |
| 4 | PUT | `/api/achievements/[id]` | Yes | achievements | |
| 5 | DELETE | `/api/achievements/[id]` | Yes | achievements | |
| 6 | GET | `/api/awards` | No | awards | Order by order_index ASC |
| 7 | POST | `/api/awards` | Yes | awards | |
| 8 | GET | `/api/awards/[id]` | No | awards | |
| 9 | PUT | `/api/awards/[id]` | Yes | awards | |
| 10 | DELETE | `/api/awards/[id]` | Yes | awards | |
| 11 | GET | `/api/certifications` | No | certifications | Order by order_index ASC |
| 12 | POST | `/api/certifications` | Yes | certifications | |
| 13 | GET | `/api/certifications/[id]` | No | certifications | |
| 14 | PUT | `/api/certifications/[id]` | Yes | certifications | |
| 15 | DELETE | `/api/certifications/[id]` | Yes | certifications | |
| 16 | GET | `/api/community-initiatives` | No | community_initiatives | Order by order_index ASC |
| 17 | POST | `/api/community-initiatives` | Yes | community_initiatives | |
| 18 | GET | `/api/community-initiatives/[id]` | No | community_initiatives | Returns 404 if not found |
| 19 | PUT | `/api/community-initiatives/[id]` | Yes | community_initiatives | |
| 20 | DELETE | `/api/community-initiatives/[id]` | Yes | community_initiatives | |
| 21 | GET | `/api/education` | No | education | Order by order_index ASC |
| 22 | POST | `/api/education` | Yes | education | |
| 23 | GET | `/api/education/[id]` | No | education | |
| 24 | PUT | `/api/education/[id]` | Yes | education | |
| 25 | DELETE | `/api/education/[id]` | Yes | education | |
| 26 | GET | `/api/gallery-images` | No | gallery_images | Order by order_index ASC |
| 27 | POST | `/api/gallery-images` | Yes | gallery_images | |
| 28 | GET | `/api/gallery-images/[id]` | No | gallery_images | Returns 404 if not found |
| 29 | PUT | `/api/gallery-images/[id]` | Yes | gallery_images | |
| 30 | DELETE | `/api/gallery-images/[id]` | Yes | gallery_images | |
| 31 | GET | `/api/hero-section` | No | hero_section | Singleton (single row) |
| 32 | PUT | `/api/hero-section` | Yes | hero_section | Upsert logic |
| 33 | GET | `/api/professional-memberships` | No | professional_memberships | Order by order_index ASC |
| 34 | POST | `/api/professional-memberships` | Yes | professional_memberships | |
| 35 | GET | `/api/professional-memberships/[id]` | No | professional_memberships | Returns 404 if not found |
| 36 | PUT | `/api/professional-memberships/[id]` | Yes | professional_memberships | |
| 37 | DELETE | `/api/professional-memberships/[id]` | Yes | professional_memberships | |
| 38 | GET | `/api/publications` | No | publications | Order by year DESC |
| 39 | POST | `/api/publications` | Yes | publications | Uses .insert(body) not .insert([body]) |
| 40 | GET | `/api/publications/[id]` | No | publications | |
| 41 | PUT | `/api/publications/[id]` | Yes | publications | |
| 42 | DELETE | `/api/publications/[id]` | Yes | publications | |
| 43 | GET | `/api/research-areas` | No | research_areas | Order by order_index ASC |
| 44 | POST | `/api/research-areas` | Yes | research_areas | |
| 45 | GET | `/api/research-areas/[id]` | No | research_areas | |
| 46 | PUT | `/api/research-areas/[id]` | Yes | research_areas | |
| 47 | DELETE | `/api/research-areas/[id]` | Yes | research_areas | |
| 48 | GET | `/api/speeches` | No | speeches | Order by date DESC |
| 49 | POST | `/api/speeches` | Yes | speeches | |
| 50 | GET | `/api/speeches/[id]` | No | speeches | |
| 51 | PUT | `/api/speeches/[id]` | Yes | speeches | |
| 52 | DELETE | `/api/speeches/[id]` | Yes | speeches | |
| 53 | GET | `/api/testimonials` | No | testimonials | Order by order_index ASC |
| 54 | POST | `/api/testimonials` | Yes | testimonials | |
| 55 | GET | `/api/testimonials/[id]` | No | testimonials | Returns 404 if not found |
| 56 | PUT | `/api/testimonials/[id]` | Yes | testimonials | |
| 57 | DELETE | `/api/testimonials/[id]` | Yes | testimonials | |
| 58 | GET | `/api/settings` | No | site_settings | Order by key ASC |
| 59 | POST | `/api/settings` | Yes | site_settings | Returns 201; validates key/value |
| 60 | GET | `/api/settings/[key]` | No | site_settings | Param is key string, not UUID |
| 61 | PUT | `/api/settings/[key]` | Yes | site_settings | Validates value required |
| 62 | DELETE | `/api/settings/[key]` | Yes | site_settings | Returns { message } not { success } |
| 63 | POST | `/api/upload` | Yes | Supabase Storage | FormData; bucket defaults to "publications" |
| 64 | POST | `https://<project>.supabase.co/auth/v1/token?grant_type=password` | No | admin_users (verification) | Client-side login via Supabase SDK; not a Next.js route |
| 65 | POST | `/api/auth/signout` | No | — | Returns 303 redirect to /login |
| 66 | POST | `/api/admin/update-email` | Yes | admin_users + Auth | Explicit session check |
| 67 | POST | `/api/admin/update-password` | Yes | Auth only | Explicit session check; verifies current password |

---

## Appendix B: Known Schema-Type Mismatches

| # | Location | Issue |
|---|----------|-------|
| 1 | `AwardItem.issuer` vs `awards.organization` | TypeScript uses `issuer`, schema uses `organization` |
| 2 | `Publication.year` | TypeScript defines as `number`, schema is `TEXT` |
| 3 | `Publication.external_url` | Exists in TypeScript type, does not exist in schema |
| 4 | `Publication.type` | TypeScript includes `'patent'`, schema CHECK only allows `'journal','conference','book'` |
| 5 | `Speech.type` | TypeScript uses `'invited','panel'`; schema uses `'conference','webinar'` |
| 6 | `Speech.event` | TypeScript allows `null`, schema is `NOT NULL` |
| 7 | `ProfessionalMembership` | TypeScript uses `organization, role, year_joined, description`; schema uses `name, role, registration_no, year` |
| 8 | `GalleryImage` | TypeScript uses `caption`, schema uses `title`; TS lacks `title` and `is_active` |
| 9 | `gallery_images` | Uses `uploaded_at` instead of `created_at`/`updated_at` pattern |

---

## Appendix C: Obtaining Auth Cookies for API Testing

Since all authenticated API calls rely on Supabase session cookies, here is how to obtain them for testing:

### Method 1: Browser DevTools
1. Navigate to `/login` and sign in.
2. Open DevTools → Application → Cookies.
3. Copy the `sb-*-auth-token` cookies.
4. Include them in your cURL/Postman requests as the `Cookie` header.

### Method 2: Supabase REST API
```bash
# 1. Sign in via Supabase Auth REST API
curl -X POST 'https://YOUR_PROJECT.supabase.co/auth/v1/token?grant_type=password' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'

# 2. Extract the access_token from the response
# 3. Use it as: Authorization: Bearer <access_token>
#    OR set it as cookie values for the Next.js API routes
```

### Method 3: Postman Pre-request Script
```javascript
// Pre-request script to auto-fetch auth token
const supabaseUrl = pm.variables.get('supabase_url');
const supabaseKey = pm.variables.get('supabase_anon_key');

pm.sendRequest({
    url: `${supabaseUrl}/auth/v1/token?grant_type=password`,
    method: 'POST',
    header: {
        'apikey': supabaseKey,
        'Content-Type': 'application/json'
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            email: pm.variables.get('admin_email'),
            password: pm.variables.get('admin_password')
        })
    }
}, function (err, res) {
    const token = res.json().access_token;
    pm.variables.set('auth_token', token);
});
```

> **Important**: The Next.js API routes use cookie-based auth via `@supabase/ssr`. When testing with tools like Postman or cURL, you may need to set the Supabase auth cookies manually, or alternatively use the Supabase client directly to bypass the API routes.

---

*End of API Documentation*
