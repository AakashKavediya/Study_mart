<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B1A&height=200&section=header&text=Study%20Mart&fontSize=72&fontColor=FFFFFF&fontAlignY=38&desc=The%20Campus-Only%20Marketplace&descAlignY=58&descSize=20" width="100%"/>

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=FF6B1A)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br/>

> **🎓 Buy. Sell. Chat. Discover. — All within your campus.**
>
> Study Mart is a secure, campus-only marketplace platform built exclusively for college students.
> One verified identity. Six powerful modules. Zero noise from the outside world.

<br/>

[![⭐ Star this repo](https://img.shields.io/badge/⭐_Star_this_repo-FF6B1A?style=for-the-badge)](.)
[![📖 Read Docs](https://img.shields.io/badge/📖_Read_Docs-1A1A1A?style=for-the-badge)](.)
[![🐛 Report Bug](https://img.shields.io/badge/🐛_Report_Bug-1A1A1A?style=for-the-badge)](.)
[![✨ Request Feature](https://img.shields.io/badge/✨_Request_Feature-1A1A1A?style=for-the-badge)](.)

</div>

<br/>

---

## 📋 Table of Contents

| # | Section |
|---|---------|
| 01 | [🎯 Project Overview](#-project-overview) |
| 02 | [✨ Features](#-features) |
| 03 | [🏗️ Architecture Overview](#%EF%B8%8F-architecture-overview) |
| 04 | [📁 Folder Structure](#-folder-structure) |
| 05 | [🧰 Tech Stack](#-tech-stack) |
| 06 | [🔐 Environment Variables](#-environment-variables) |
| 07 | [🚀 Local Development Setup](#-local-development-setup) |
| 08 | [🐳 Docker Setup](#-docker-setup) |
| 09 | [📡 API Overview](#-api-overview) |
| 10 | [🗃️ Database Schema](#%EF%B8%8F-database-schema) |
| 11 | [🗄️ State Management](#%EF%B8%8F-state-management) |
| 12 | [🔒 Security Implementation](#-security-implementation) |
| 13 | [☁️ Deployment Guide](#%EF%B8%8F-deployment-guide) |
| 14 | [🔭 Future Improvements](#-future-improvements) |
| 15 | [📄 License](#-license) |

---

<br/>

## 🎯 Project Overview

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   Students on every campus are buying, selling, losing,      ║
║   and looking for things — through fragmented WhatsApp       ║
║   groups, notice boards, and generic platforms that          ║
║   aren't scoped to their community.                          ║
║                                                              ║
║              Study Mart fixes that.                          ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

</div>

Study Mart is a **single, unified platform** that brings every campus interaction into one verified space:

- 🛒 A **campus marketplace** with listing management, search, and filters
- 💬 **Real-time peer-to-peer chat** to negotiate and coordinate
- 🔍 A **Lost & Found board** to reunite students with their belongings
- 📅 A **campus events feed** to keep students in the loop
- 🔔 **Cross-module notifications** so nothing gets missed
- 🛡️ An **admin dashboard** for moderation and platform health

The platform is a monorepo with a **Next.js web app**, a **FastAPI backend**, and a **React Native mobile app** (planned). All clients share the same backend API and WebSocket layer.

<br/>

---

## ✨ Features

<br/>

### 🏪 Marketplace

> *The core of Study Mart — a verified campus-scoped buy/sell board.*

- 📦 Post listings with title, description, price, category, images, and condition
- 🔎 Browse with filters: **category · price range · condition · campus zone**
- 🔍 Full-text search across all active listings
- 🏷️ Mark items as `sold` / `reserved` with one tap
- ❤️ Wishlist / save listings for later
- ⏳ Automatic listing expiry and deactivation

---

### 💬 Real-Time Chat

> *WebSocket-powered conversations, tied directly to listings.*

- ⚡ Real-time 1-on-1 messaging via WebSockets
- 🔗 Conversation threads linked to specific listings
- ✅ Message read receipts and delivery status
- 🖼️ Media sharing within conversations
- 🗂️ Conversation archiving and deletion

---

### 🔍 Lost & Found

> *A dedicated board to help students recover what matters.*

- 📝 Post lost or found items with location, date, and photos
- 🔄 Status lifecycle: `open` → `claimed` → `resolved`
- 💡 Item matching suggestions by category and location
- 💬 Comment thread per post for direct communication

---

### 📅 Campus Events

> *Stay connected with everything happening on campus.*

- 🎉 Post and discover fests, workshops, clubs, and deadlines
- 🙋 RSVP / interested toggle with live attendee count
- 🗂️ Filter by date, category, and campus organization
- ⏰ Event reminders via the notification system

---

### 🔔 Notifications

> *Smart, cross-module alerts — nothing slips through the cracks.*

- 📨 Alerts for: new messages, listing inquiries, lost & found matches, event reminders
- ⚙️ Per-user notification preferences
- 🔴 Unread badge counts across all modules
- 📲 Planned: Push notifications via FCM

---

### 🛡️ Admin Dashboard

> *Full platform control for moderators and campus administrators.*

- 👤 User management: suspend, verify, or remove accounts
- 📋 Listing moderation: flag, review, and remove content
- 🏫 Campus email domain verification management
- 📊 Platform analytics: users, listings, categories, growth
- 📜 Full audit log for every moderation action

<br/>

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT  LAYER                            │
│                                                                 │
│   ┌─────────────────────────┐   ┌────────────────────────────┐  │
│   │    Next.js  Web  App    │   │  React Native Mobile App   │  │
│   │  App Router · RTK · TW  │   │    Planned · API-Ready     │  │
│   └────────────┬────────────┘   └──────────────┬─────────────┘  │
└────────────────┼─────────────────────────────── ┼───────────────┘
                 │  HTTPS · REST                  │  HTTPS · REST
                 │  WSS  · WebSocket              │  WSS  · WebSocket
┌────────────────▼─────────────────────────────── ▼───────────────┐
│                         API  LAYER                               │
│                                                                  │
│     FastAPI  ·  /api/v1/*  ·  /ws/chat/{id}                      │
│     JWT Middleware  ·  CORS  ·  Rate Limiting                    │
│     Pydantic Validation  ·  Auto OpenAPI Docs                    │
└─────────────────────────────┬────────────────────────────────────┘
                               │  Motor (async)  ·  Cloudinary SDK
┌──────────────────────────────▼───────────────────────────────────┐
│                        DATA  LAYER                                │
│                                                                   │
│      MongoDB Atlas / Self-hosted        Cloudinary CDN            │
│      7 Collections · Indexed            Image & Media Storage     │
└───────────────────────────────────────────────────────────────────┘
```

**Key decisions:**
- **API-first** — FastAPI exposes a versioned REST API (`/api/v1/`) consumed identically by all clients
- **Stateless auth** — JWT access tokens (15 min) + httpOnly refresh cookies (7 days)
- **Media decoupled** — Images upload directly to Cloudinary; only the CDN URL is persisted in MongoDB
- **Campus isolation** — Every DB query is scoped to the authenticated user's `campus` field

<br/>

---

## 📁 Folder Structure

```
study-mart/
│
├── 📁 apps/
│   ├── 📁 web/                         ← Next.js Web App
│   │   ├── 📁 app/
│   │   │   ├── 📁 (auth)/              ← Login · Register · Verify
│   │   │   └── 📁 (dashboard)/         ← Protected routes
│   │   │       ├── 📁 marketplace/
│   │   │       ├── 📁 chat/
│   │   │       ├── 📁 lost-found/
│   │   │       ├── 📁 events/
│   │   │       └── 📁 admin/
│   │   ├── 📁 components/
│   │   │   ├── 📁 ui/                  ← Button · Input · Modal
│   │   │   ├── 📁 marketplace/
│   │   │   └── 📁 chat/
│   │   ├── 📁 store/                   ← Redux Toolkit
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📁 slices/
│   │   │   │   ├── 📄 authSlice.ts
│   │   │   │   ├── 📄 marketplaceSlice.ts
│   │   │   │   ├── 📄 chatSlice.ts
│   │   │   │   └── 📄 notificationSlice.ts
│   │   │   └── 📄 hooks.ts
│   │   ├── 📁 lib/                     ← API clients · helpers
│   │   ├── 📁 hooks/                   ← Custom React hooks
│   │   └── 📁 types/                   ← TypeScript interfaces
│   │
│   └── 📁 mobile/                      ← React Native (Planned)
│       └── 📁 src/
│           ├── 📁 screens/
│           ├── 📁 navigation/
│           └── 📁 services/
│
├── 📁 backend/                         ← FastAPI Backend
│   └── 📁 app/
│       ├── 📄 main.py                  ← App entry point
│       ├── 📄 config.py                ← pydantic-settings
│       ├── 📄 database.py              ← Motor connection
│       ├── 📁 routers/
│       │   ├── 📄 auth.py
│       │   ├── 📄 listings.py
│       │   ├── 📄 chat.py
│       │   ├── 📄 lost_found.py
│       │   ├── 📄 events.py
│       │   └── 📄 admin.py
│       ├── 📁 models/                  ← Pydantic schemas
│       ├── 📁 services/                ← Business logic
│       └── 📁 websocket/               ← WS connection manager
│
├── 📁 docker/
│   ├── 📄 docker-compose.yml
│   ├── 📄 docker-compose.prod.yml
│   └── 📁 nginx/
│       └── 📄 nginx.conf
│
├── 📄 .env.example
├── 📄 .gitignore
└── 📄 README.md
```

<br/>

---

## 🧰 Tech Stack

| Layer | Technology | Version | Why |
|-------|------------|---------|-----|
| 🌐 **Web Frontend** | Next.js | `14` | App Router, SSR/SSG, optimized images, middleware |
| 🎨 **Styling** | Tailwind CSS | `3.x` | Utility-first, zero runtime, consistent design tokens |
| 🔴 **State** | Redux Toolkit | Latest | RTK Query for API caching, custom WS middleware |
| 🐍 **Backend** | FastAPI | `0.110` | Async Python, auto OpenAPI docs, native WebSocket |
| 🍃 **Database** | MongoDB + Motor | `7.x` | Flexible document model, async driver |
| 🔑 **Auth** | JWT + bcrypt | — | Stateless tokens, bcrypt at cost factor 12 |
| ☁️ **Media** | Cloudinary | — | CDN delivery, on-the-fly transformations |
| 🐳 **Container** | Docker Compose | — | Environment parity: dev → staging → prod |
| 📱 **Mobile** | React Native | Planned | Shared Redux store shape, same API layer |

<br/>

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` before running anything.

```bash
cp .env.example .env
```

```dotenv
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  APPLICATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APP_ENV=development                       # development | staging | production
APP_PORT=8000
FRONTEND_URL=http://localhost:3000

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  MONGODB
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONGO_URI=mongodb://localhost:27017/studymart
MONGO_DB_NAME=studymart

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  JWT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JWT_SECRET_KEY=your-256-bit-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  CLOUDINARY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=studymart_unsigned

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  CAMPUS VERIFICATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED_EMAIL_DOMAINS=university.edu,college.ac.in

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  NEXT.JS (PUBLIC)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=studymart_unsigned
```

> [!WARNING]
> Never commit your `.env` file. It is `.gitignore`d by default.

<br/>

---

## 🚀 Local Development Setup

### Prerequisites

![Node](https://img.shields.io/badge/Node.js-≥18.x-339933?logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-≥3.11-3776AB?logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-local_or_Atlas-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-optional-2496ED?logo=docker&logoColor=white)

---

### Step 1 — Clone

```bash
git clone https://github.com/your-org/study-mart.git
cd study-mart
```

### Step 2 — Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start dev server
uvicorn app.main:app --reload --port 8000
```

> 📖 Swagger UI → `http://localhost:8000/docs`

### Step 3 — Web Frontend (Next.js)

```bash
cd apps/web

# Install dependencies
npm install

# Setup env
cp ../../.env.example .env.local
# → Fill in all NEXT_PUBLIC_* variables

# Start dev server
npm run dev
```

> 🌐 Web App → `http://localhost:3000`

<br/>

---

## 🐳 Docker Setup

Spin up the **entire stack** — backend, frontend, and MongoDB — with one command.

### Development

```bash
docker compose -f docker/docker-compose.yml up --build
```

| Service | URL |
|---------|-----|
| 🐍 FastAPI Backend | `http://localhost:8000` |
| 🌐 Next.js Web App | `http://localhost:3000` |
| 🍃 MongoDB | `localhost:27017` |

### Production

```bash
docker compose -f docker/docker-compose.prod.yml up -d
```

The production config adds: **Nginx reverse proxy · SSL termination · Gunicorn + Uvicorn workers · named data volumes**

```yaml
# docker/docker-compose.yml (excerpt)
services:
  backend:
    build: ../backend
    env_file: ../.env
    ports: ["8000:8000"]
    depends_on: [mongo]
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  web:
    build: ../apps/web
    env_file: ../.env
    ports: ["3000:3000"]
    depends_on: [backend]

  mongo:
    image: mongo:7
    ports: ["27017:27017"]
    volumes: [mongo_data:/data/db]

volumes:
  mongo_data:
```

<br/>

---

## 📡 API Overview

> All endpoints prefixed with `/api/v1/` · Interactive docs at `/docs`

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register with campus email |
| `POST` | `/auth/login` | Login → access + refresh tokens |
| `POST` | `/auth/refresh` | Rotate access token via httpOnly cookie |
| `POST` | `/auth/logout` | Invalidate refresh token |
| `POST` | `/auth/verify-email` | Confirm campus email with OTP |

### 🏪 Marketplace

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/listings` | Paginated feed with filters |
| `POST` | `/listings` | Create a new listing |
| `GET` | `/listings/{id}` | Fetch single listing detail |
| `PATCH` | `/listings/{id}` | Update listing *(owner only)* |
| `DELETE` | `/listings/{id}` | Delete listing *(owner only)* |
| `GET` | `/listings/search?q=` | Full-text search |
| `PATCH` | `/listings/{id}/status` | Mark as sold / reserved |

### 💬 Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/conversations` | All conversations for current user |
| `POST` | `/conversations` | Start conversation (linked to listing) |
| `GET` | `/conversations/{id}/messages` | Paginated message history |
| `WS` | `/ws/chat/{conversation_id}` | 🔌 Real-time WebSocket connection |

### 🔍 Lost & Found

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lost-found` | Browse all posts |
| `POST` | `/lost-found` | Create lost or found post |
| `PATCH` | `/lost-found/{id}/status` | Update claim status |

### 📅 Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/events` | Upcoming campus events |
| `POST` | `/events` | Create event *(verified orgs / admin)* |
| `POST` | `/events/{id}/rsvp` | Toggle RSVP |

### 🔔 Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notifications` | Fetch notifications for current user |
| `PATCH` | `/notifications/{id}/read` | Mark single as read |
| `PATCH` | `/notifications/read-all` | Mark all as read |

<br/>

---

## 🗃️ Database Schema

### `users`
```js
{
  _id:           ObjectId,
  name:          String,
  email:         String,          // campus@university.edu
  password_hash: String,          // bcrypt, cost factor 12
  campus:        String,          // scopes ALL queries
  avatar_url:    String,          // Cloudinary CDN URL
  is_verified:   Boolean,
  is_suspended:  Boolean,
  role:          "user" | "admin",
  created_at:    Date,
  last_active:   Date
}
```

### `listings`
```js
{
  _id:         ObjectId,
  seller_id:   ObjectId,          // ref: users  [indexed]
  title:       String,
  description: String,
  price:       Number,
  category:    "textbooks" | "electronics" | "furniture" | "clothing" | "other",
  condition:   "new" | "like_new" | "good" | "fair",
  images:      [String],          // Cloudinary URLs
  status:      "active" | "sold" | "reserved" | "expired",  // [indexed]
  location:    String,            // campus zone
  created_at:  Date,
  expires_at:  Date
}
```

### `messages`
```js
{
  _id:             ObjectId,
  conversation_id: ObjectId,      // [indexed]
  sender_id:       ObjectId,      // ref: users
  content:         String,
  media_url:       String | null,
  is_read:         Boolean,
  sent_at:         Date
}
```

### `events`
```js
{
  _id:          ObjectId,
  organizer_id: ObjectId,
  title:        String,
  category:     "fest" | "workshop" | "club" | "deadline" | "other",
  venue:        String,
  event_date:   Date,
  rsvp_count:   Number,
  rsvp_users:   [ObjectId],
  image_url:    String | null,
  created_at:   Date
}
```

> [!NOTE]
> Indexes are applied on `seller_id`, `status`, `category` (listings) · `conversation_id` (messages) · `user_id` (notifications) for query performance.

<br/>

---

## 🗄️ State Management

Study Mart uses **Redux Toolkit** as the single source of truth for the Next.js app.

### Store Structure

```
store/
├── index.ts                    ← configureStore with all slices + RTK Query
├── hooks.ts                    ← Typed useAppDispatch / useAppSelector
└── slices/
    ├── authSlice.ts            ← User session, JWT, role
    ├── marketplaceSlice.ts     ← Listings feed, filters, active listing
    ├── chatSlice.ts            ← Conversations, messages, WS status
    ├── lostFoundSlice.ts       ← Lost & found posts
    ├── eventsSlice.ts          ← Events feed, RSVP state
    └── notificationSlice.ts    ← Notifications list, unread count
```

### RTK Query — API Integration

RTK Query handles all API calls with automatic caching, background refetching, and request deduplication.

```typescript
// store/api/listingsApi.ts
export const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Listing'],
  endpoints: (builder) => ({
    getListings: builder.query<ListingsResponse, ListingFilters>({ ... }),
    createListing: builder.mutation<Listing, CreateListingPayload>({ ... }),
  }),
});
```

### WebSocket Middleware

A custom RTK middleware manages the chat WebSocket lifecycle, dispatches incoming messages to `chatSlice`, and handles automatic reconnection.

<br/>

---

## 🔒 Security Implementation

### Auth Flow

```
1. Register     →  Campus email validated against ALLOWED_EMAIL_DOMAINS
2. OTP Verify   →  Email ownership confirmed before account activation
3. Login        →  Returns short-lived access token (15 min)
                   Sets httpOnly refresh cookie (7 days)
4. API Calls    →  Bearer token in Authorization header
5. Token Expiry →  Silent refresh via /auth/refresh (cookie-only, no localStorage)
6. Logout       →  Refresh token invalidated server-side
```

### Password Hashing

```python
# utils/auth.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", bcrypt__rounds=12)

def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)   # constant-time comparison
```

### Security Checklist

| Layer | Measure | Status |
|-------|---------|--------|
| 🔑 Tokens | Short-lived JWT + httpOnly refresh cookie | ✅ |
| 🔒 Passwords | bcrypt, cost factor 12 | ✅ |
| 🏫 Campus | Email domain whitelist + OTP verification | ✅ |
| 🌐 CORS | Strict origin whitelist via `FRONTEND_URL` | ✅ |
| ⚡ Rate Limiting | `slowapi` on auth endpoints (10 req/min/IP) | ✅ |
| ✅ Validation | Pydantic on all request bodies | ✅ |
| 🔍 Campus Isolation | All queries scoped to `campus` field | ✅ |
| 🛡️ Admin Routes | `role == "admin"` check on all admin endpoints | ✅ |

<br/>

---

## ☁️ Deployment Guide

### VPS / Cloud (Ubuntu 22.04+)

```bash
# 1. Install Docker
sudo apt update && sudo apt install -y docker.io docker-compose-plugin

# 2. Clone repo
git clone https://github.com/your-org/study-mart.git /opt/study-mart
cd /opt/study-mart

# 3. Configure environment
cp .env.example .env
nano .env   # fill in all production values

# 4. Launch
docker compose -f docker/docker-compose.prod.yml up -d --build

# 5. Verify
docker compose -f docker/docker-compose.prod.yml ps
```

### Nginx + SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d studymart.youruniversity.edu
```

### Production Checklist

| Item | Dev | Production |
|------|-----|------------|
| `APP_ENV` | `development` | `production` |
| JWT Secret | Any string | 256-bit random secret |
| MongoDB | Local container | Atlas managed cluster |
| Cloudinary Preset | Unsigned | Signed (server-side upload) |
| HTTPS | ❌ | ✅ Required |
| Debug Logging | ✅ Enabled | ❌ Disabled |
| Gunicorn Workers | ❌ | ✅ Multiple workers |

<br/>

---

## 🔭 Future Improvements

| # | Feature | Description |
|---|---------|-------------|
| 🚀 | **FCM Push Notifications** | Firebase Cloud Messaging for native mobile + web push |
| 💳 | **Escrow Payments** | In-app payment for high-value listings via Razorpay / Stripe |
| 🤖 | **AI-Powered Search** | Semantic search with vector embeddings — beyond keyword matching |
| 📱 | **React Native App** | Full mobile client with shared Redux store shape |
| 🎓 | **University SSO** | OAuth2 / SAML integration with institutional identity providers |
| ⭐ | **Seller Ratings** | Post-transaction reputation system with trust scores |
| 🌐 | **Multi-Campus Federation** | Opt-in inter-campus listing discovery for nearby colleges |
| 📊 | **Advanced Analytics** | Seller dashboards, listing performance, traffic insights |

<br/>

---

## 📄 License

```
MIT License

Copyright (c) 2024 Study Mart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B1A&height=120&section=footer" width="100%"/>

**Built with 🧡 for campus communities**

[![GitHub](https://img.shields.io/badge/GitHub-study--mart-181717?style=flat-square&logo=github)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-FF6B1A?style=flat-square)](./LICENSE)

*Study Mart — Every campus. One platform.*

</div>
