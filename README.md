# CityPlanner Monorepo

CityPlanner is a MERN-based project with separate end-user and admin UIs, plus an Express/MongoDB backend. The repo is prepared for open-source contribution with secure defaults, clear structure, and documented setup.

## Tech Stack
- Frontend (User): React + Vite + React Router + Formik/Yup
- Frontend (Admin): React + Vite + Bootstrap
- Backend: Node.js + Express (ESM) + MongoDB (Mongoose)
- File Uploads: Multer
- Auth: JWT (stateless)
- Security: CORS + Rate Limiting

> Note: A Python backend (API/ML/services) is not present in this repo. See "Python Services (Missing)" for how to add it.

## Repository Structure
```
CityPlanner/
├─ admin/                # Admin React app (Vite)
│  ├─ src/
│  │  ├─ components/     # Navbar, Slider, etc.
│  │  ├─ pages/          # Home, Loginin, Dashboard, User
│  │  └─ routes/         # Admin routes
│  └─ package.json
├─ backend/              # Express API server
│  ├─ App.js             # Server entry
│  ├─ CreateAdmin.js     # Seed script to create admin user
│  ├─ config/conn.js     # Mongo connection
│  ├─ controllers/       # Route handlers (signup/signin/user/trip/upload/contactus/admin)
│  ├─ middleware/        # Auth (JWT)
│  ├─ models/            # Mongoose schemas
│  ├─ routes/            # Express routers
│  ├─ .env.example       # Example env vars (copy to .env)
│  └─ package.json
├─ frontend/             # End-user React app (Vite)
│  ├─ src/
│  │  ├─ components/     # Navbar, Footer, PrivateRoute, DialogflowWidget
│  │  ├─ context/        # AuthContext
│  │  ├─ pages/          # Home, Signin, Signup, Plantrip, Output, etc.
│  │  └─ routes/         # User routes
│  └─ package.json
└─ Desiging/             # Static HTML assets (legacy)
```

## Entry Points
- Backend: backend/App.js
- Admin UI: admin/src/main.jsx → admin/src/App.jsx
- Frontend UI: frontend/src/main.jsx → frontend/src/App.jsx

## Communication Flow
- Frontend and Admin UIs call the Express backend via HTTP:
  - Signup: `POST /api/signup`
  - Signin: `POST /api/signin`
  - User profile: `GET /api/user/me` (requires JWT in `Authorization`)
  - Trip planning: `POST /api/trip` (requires JWT)
  - File upload: `POST /api/upload` (requires JWT, `multipart/form-data`)
  - Admin login: `POST /api/admin/login`
- Backend connects to MongoDB via Mongoose.
- Trip planning integrates with Langflow/Astra via `ASTRA_API_KEY`.

## Environment Variables
Create `backend/.env` from `backend/.env.example`:
- `MONGO_URI` (string): Mongo connection string
- `JWT_SECRET` (string): Secret key for JWT signing
- `PORT` (number): Backend port (default 5000)
- `ASTRA_API_KEY` (string): External API key for Langflow/Astra (optional but required for trip planning)
- `CORS_ORIGIN` (csv): Allowed origins (e.g., `http://localhost:5173,http://localhost:5174`)

For Vite frontends, if you add envs, prefix them with `VITE_`.

## Setup

### Prerequisites
- Node.js >= 18
- MongoDB running locally or remote (update `MONGO_URI`)

### Install
```bash
# Backend
cd backend
npm install

# Frontend (user)
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

### Run
```bash
# Backend (reads backend/.env)
cd backend
npm run dev

# Frontend (user)
cd ../frontend
npm run dev
# Vite dev server typically runs on http://localhost:5173

# Admin
cd ../admin
npm run dev
# Vite dev server typically runs on http://localhost:5174
```

### Seeding Admin User
```bash
cd backend
node CreateAdmin.js
```
Creates `admin@example.com` with password `admin123` (bcrypt-hashed).

## API Routes
- `POST /api/signup` → Register user (name, email, password)
- `POST /api/signin` → Login, returns `token` and `user`
- `GET /api/user/me` → Get current user (requires `Authorization: <jwt>`)
- `POST /api/trip` → Plan trip via Langflow (requires `Authorization: <jwt>`, body: `{ from, to, priority }`)
- `POST /api/upload` → Upload a file (requires `Authorization: <jwt>`, form field `file`)
- `POST /api/admin/login` → Admin login

## Security & Stability
- CORS configured via `CORS_ORIGIN` env
- Basic rate limiting via `express-rate-limit`
- Auth middleware verifies JWT from `Authorization` header
- Passwords stored with bcrypt (SHA1 removed)
- Input validation added for contact and signup; extend as needed

## Python Services (Missing)
This monorepo mentions a Python backend but none exists here. To add:
- Create `python/` folder with `api/` (FastAPI/Flask), `services/` (ML/jobs), `requirements.txt`.
- Expose REST endpoints from Python and integrate via backend proxy or direct frontend calls.
- Document envs (`PY_API_URL`, model paths, API keys) and add a `README.md` under `python/`.

## Contribution Guide
- Fork and create feature branches (`feat/*`, `fix/*`)
- Run linters: `npm run lint` in admin/frontend
- Keep code ESM and follow existing patterns
- Add tests where possible; maintain consistent API contracts
- Submit PRs with clear descriptions and screenshots/logs

## Common Errors & Fixes
- `ERR_MODULE_NOT_FOUND: express-rate-limit`: Run `npm install` in backend
- `Server misconfigured: JWT_SECRET missing`: Set `JWT_SECRET` in `backend/.env`
- `Langflow API error/missing ASTRA_API_KEY`: Set `ASTRA_API_KEY` or disable trip feature locally
- CORS errors from frontends: Update `CORS_ORIGIN` with the correct dev server URLs
- Mongo connection issues: Verify `MONGO_URI` and that MongoDB is running

## License
This project is prepared for open-source. Ensure no secrets are committed and env files are properly configured before publishing.
