# CampusConnect — Phase 1 Foundation

Starter monorepo for a university-wide academic social platform.

## Stack
- `mobile/`: Expo + React Native + TypeScript + Expo Router
- `backend/`: Python + FastAPI + SQLAlchemy 2 + Pydantic
- `database`: PostgreSQL via Docker Compose

## Prerequisites
- Node.js LTS and npm
- Python 3.11+
- Docker Desktop
- Git

## 1. Start PostgreSQL
From the repository root:

```bash
docker compose up -d db
```

## 2. Start the backend
Open a terminal:

```bash
cd backend
python -m venv .venv
```

Windows PowerShell:
```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:
```bash
source .venv/bin/activate
```

Install and configure:
```bash
pip install -r requirements.txt
copy .env.example .env
```

On macOS/Linux use `cp .env.example .env` instead of `copy`.

Initialize the Phase 1 tables and seed the six school records:
```bash
python -m app.init_db
uvicorn app.main:app --reload
```

API:
- Health: http://127.0.0.1:8000/health
- Schools: http://127.0.0.1:8000/api/v1/schools
- Swagger: http://127.0.0.1:8000/docs

## 3. Start the Expo app
In a second terminal:

```bash
cd mobile
npm install
npx expo start
```

Press `w` for web, or scan the QR code with Expo Go on a phone.
The starter app currently checks the backend health endpoint. If testing on a physical phone, set `EXPO_PUBLIC_API_URL` to your computer's LAN IP, e.g. `http://192.168.1.10:8000`.

## Notes
- The six school names are initial seed records based on the project brief. Verify the current official school/programme catalogue with the university before production use.
- Programme names are intentionally not invented or seeded yet. Add only verified programme data.
- `.env` files and secrets must never be committed.
- This is a foundation, not a production-ready social network. Authentication, profiles, feeds, uploads, moderation and deployment are later phases.
