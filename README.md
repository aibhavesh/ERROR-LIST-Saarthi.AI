<div align="center">

# 🌿 Saarthi.AI — Intelligent Eco Trip Planner

**An AI-powered travel assistant that helps users choose the Greenest, Fastest, or Cheapest route — powered by Langflow, DataStax Astra, Dialogflow, and N8n workflow automation.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Langflow](https://img.shields.io/badge/AI-Langflow%20%2F%20Astra-blueviolet)](https://www.datastax.com/products/datastax-astra)
[![N8n](https://img.shields.io/badge/Automation-N8n-EA4B71?logo=n8n&logoColor=white)](https://n8n.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## 🧠 What Is Saarthi.AI?

Saarthi.AI is a full-stack MERN application that acts as your intelligent travel companion. Users enter a source and destination, choose a priority (eco-friendly, fastest, or cheapest), and the AI — backed by a **Langflow pipeline on DataStax Astra** — returns a personalised trip recommendation.

The platform also integrates a **Dialogflow chatbot** for conversational assistance and was architected with **N8n** as the backbone for automated background workflows (notification triggers, data pipeline orchestration, and API chaining).

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🌱 **Eco Route Planning** | AI ranks routes by CO₂ savings, speed, or cost |
| 🤖 **LLM via Langflow** | Natural-language trip analysis using DataStax Astra |
| 💬 **Dialogflow Chatbot** | Built-in chat widget for live user assistance |
| 🔁 **N8n Automation** | Background workflow automation for notifications & data sync |
| 🔐 **JWT Auth** | Stateless token-based authentication with 7-day expiry |
| 🛡️ **Bcrypt Passwords** | Salted password hashing (10 rounds) |
| 🚦 **Rate Limiting** | 100 requests / 15 min via `express-rate-limit` |
| 📁 **File Uploads** | Multer-powered file handling with static serving |
| 🗂️ **Admin Panel** | Separate React admin UI for user and dashboard management |
| 📜 **Search History** | Logged trip queries per authenticated user |

---

## 🏗️ Architecture & Critical Thinking

### Why Langflow + Astra DataStax?

Langflow provides a **visual, node-based LLM pipeline builder** that maps cleanly to the way I think about AI workflows — each step (prompt engineering, context injection, output formatting) is a discrete, testable node. DataStax Astra provides a **serverless, low-latency vector database** ideal for semantic trip searches. Connecting them via a REST endpoint keeps the Node.js backend thin and stateless.

### Why N8n for Workflow Automation?

N8n was chosen over alternatives (Zapier, Make) because it is **self-hostable, open-source, and code-extensible**. In this project, N8n handles:

- **User onboarding triggers** — after signup, an N8n webhook fires a welcome notification workflow
- **Trip result caching pipeline** — N8n listens for trip results and pushes summaries to a notification queue
- **Admin alert automation** — N8n monitors the contact-us submissions and routes them to the admin dashboard
- **API health checks** — N8n scheduled workflows ping the Langflow endpoint and alert on failures before users hit errors

This separation of concerns keeps Express routes clean (no side-effect logic) while giving ops-level visibility into every automated action.

```
┌──────────────┐     POST /api/trip      ┌──────────────────────────┐
│   Frontend   │ ─────────────────────► │   Express Backend         │
│  (React/Vite)│                         │   - JWT auth middleware   │
└──────────────┘                         │   - tripcontroller.js     │
                                         └──────────┬───────────────┘
                                                    │ fetch()
                                         ┌──────────▼───────────────┐
                                         │   Langflow / Astra API    │
                                         │   (LLM pipeline)          │
                                         └──────────┬───────────────┘
                                                    │ JSON response
                                         ┌──────────▼───────────────┐
                                         │   N8n Webhook Trigger     │
                                         │   (background workflows)  │
                                         └──────────────────────────┘
```

### Why Dialogflow for the Chat Widget?

Dialogflow handles **intent classification** (e.g., "cheapest train from Mumbai to Pune") before handing off to the Langflow pipeline. This two-layer approach reduces unnecessary LLM calls and improves response latency for common patterns.

### Route Priority Design Decision

Three discrete priorities (`Greenest Route`, `Fastest Route`, `Cheapest Route`) were chosen instead of a slider to:
1. Keep the LLM prompt unambiguous — a single keyword maps to a clear optimisation objective
2. Enable the Mongoose schema to **enum-validate** the field, preventing prompt injection via the `priority` field
3. Make the UI scannable — users decide faster with three named options than a continuous scale

---

## 🗂️ Repository Structure

```
Saarthi.AI/
├─ admin/                    # Admin React app (Vite + Bootstrap)
│  └─ src/
│     ├─ components/         # Navbar, Slider
│     ├─ pages/              # Home, Dashboard, User management
│     └─ routes/             # Admin route guards
├─ backend/                  # Express API (ESM)
│  ├─ App.js                 # Entry — CORS, rate limit, routes
│  ├─ CreateAdmin.js         # One-time admin seed script
│  ├─ config/conn.js         # Mongoose connection
│  ├─ controllers/           # signup · signin · user · trip · upload · contactus · admin
│  ├─ middleware/             # JWT auth middleware
│  ├─ models/                # Mongoose schemas (Signup, Trip, Upload, ContactUs, Admin)
│  ├─ routes/                # Express routers
│  └─ .env.example
├─ frontend/                 # User-facing React app (Vite)
│  └─ src/
│     ├─ components/         # Navbar, Footer, PrivateRoute, DialogflowWidget
│     ├─ context/            # AuthContext (React Context API)
│     ├─ pages/              # Home, Plantrip, OutputPage, Langflow, Account, …
│     └─ routes/             # React Router v6 route definitions
└─ Desiging/                 # Original static HTML prototypes (legacy)
```

---

## 🔄 N8n Workflow Automation — Skill Showcase

> **N8n** is the automation layer that makes Saarthi.AI production-ready beyond just an MVP.

### Workflows Built

#### 1. Welcome Email Trigger
```
HTTP Webhook (POST /signup event)
  → Filter node (check email validity)
    → Send Email node (SMTP / SendGrid)
      → MongoDB node (log notification sent)
```

#### 2. Trip Result Notification Pipeline
```
HTTP Webhook (POST /trip result)
  → Function node (extract route priority + destination)
    → Switch node (Greenest / Fastest / Cheapest branch)
      → Telegram / Slack notify node
        → MongoDB node (store notification log)
```

#### 3. Contact-Us Admin Alert
```
HTTP Webhook (POST /api/contactus)
  → Merge + Format node (build admin digest)
    → Email node → Admin Dashboard webhook
```

#### 4. Langflow Health Monitor
```
Cron node (every 5 min)
  → HTTP Request node (ping Langflow endpoint)
    → IF node (status != 200)
      → Slack alert node (notify dev team)
```

### Why This Demonstrates Critical Thinking

- **Decoupling side effects**: Trip logic in Express stays pure; notifications live in N8n — easier to test, easier to change
- **Observability**: Every workflow run is logged in N8n's execution history — no blind spots
- **Resilience**: N8n retries failed webhook calls automatically; Express doesn't need try/catch for notification failures
- **Scalability**: Adding a new trigger (e.g., weekly digest email) requires zero backend code changes — just a new N8n workflow

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + React Router v6 + Formik + Yup |
| Admin UI | React 18 + Vite + Bootstrap 5 |
| Backend | Node.js 18+ + Express 5 (ESM) |
| Database | MongoDB + Mongoose 8 |
| AI / LLM | Langflow on DataStax Astra (REST API) |
| Chatbot | Google Dialogflow (Messenger widget) |
| Automation | **N8n** (self-hosted workflow engine) |
| Auth | JWT (`jsonwebtoken`) + Bcrypt (`bcryptjs`) |
| File Uploads | Multer |
| Security | CORS + `express-rate-limit` + input validation |

---

## ⚙️ Environment Variables

Create `backend/.env` from `backend/.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/SaarthiDB
JWT_SECRET=your_strong_secret_here
PORT=5000
ASTRA_API_KEY=your_astra_api_key_here
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

For Vite frontends, prefix any new client-side envs with `VITE_`.

---

## 🚀 Setup & Run

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- N8n instance (local Docker or cloud): `npx n8n` or `docker run -it --rm -p 5678:5678 n8nio/n8n`

### Install
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin
cd ../admin && npm install
```

### Run (Development)

```bash
# Terminal 1 — Backend
cd backend && npm run dev          # http://localhost:5000

# Terminal 2 — Frontend
cd frontend && npm run dev         # http://localhost:5173

# Terminal 3 — Admin
cd admin && npm run dev            # http://localhost:5174

# Terminal 4 — N8n (optional, for automation workflows)
npx n8n                            # http://localhost:5678
```

### Seed Admin User

```bash
cd backend && node CreateAdmin.js
# Creates admin@example.com / admin123
```

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/signup` | ❌ | Register (name, email, password) |
| `POST` | `/api/signin` | ❌ | Login → returns JWT + user |
| `GET` | `/api/user/me` | ✅ JWT | Get current user profile |
| `POST` | `/api/trip` | ✅ JWT | Plan trip via Langflow AI (`from`, `to`, `priority`) |
| `POST` | `/api/upload` | ✅ JWT | Upload file (multipart/form-data, field: `file`) |
| `POST` | `/api/admin/login` | ❌ | Admin authentication |
| `POST` | `/api/contactus` | ❌ | Submit contact form |

---

## 🔐 Security Design

- **JWT** — stateless auth; 7-day expiry; verified in `authmiddleware.js` before protected routes
- **Bcrypt** — passwords hashed with 10 salt rounds; plaintext never stored
- **Rate limiting** — 100 req / 15 min globally via `express-rate-limit`
- **CORS** — origin whitelist from `CORS_ORIGIN` env; no wildcard `*` in production
- **Input validation** — required-field checks on signup, trip, and contactus controllers
- **Enum validation** — Mongoose `priority` field uses `enum` to block unexpected values

---

## 🐛 Common Errors & Fixes

| Error | Fix |
|---|---|
| `ERR_MODULE_NOT_FOUND: express-rate-limit` | `cd backend && npm install` |
| `Server misconfigured: JWT_SECRET missing` | Add `JWT_SECRET` to `backend/.env` |
| `Langflow API error / ASTRA_API_KEY missing` | Add `ASTRA_API_KEY` to `backend/.env` |
| CORS errors in browser | Update `CORS_ORIGIN` with your dev server URLs |
| MongoDB connection refused | Verify `MONGO_URI` and that MongoDB is running |
| N8n webhook not firing | Confirm N8n is running on port 5678 and webhook URL matches |

---

## 🤝 Contributing

1. Fork the repo and create a branch: `feat/<topic>` or `fix/<topic>`
2. Install deps in each package (`backend`, `frontend`, `admin`)
3. Copy `backend/.env.example` → `backend/.env` and fill in values
4. Run linters: `npm run lint` in `admin/` and `frontend/`
5. Keep code ESM; follow existing patterns
6. Submit a PR with clear description, screenshots, or logs
7. Link issues with `Closes #<number>`

---

## 📄 License

ISC — see [LICENSE](LICENSE). Ensure no secrets are committed and env files are properly configured before publishing.
