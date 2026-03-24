# Building Materials Management System (BMMS)

**Deshmukh Traders** - A modern B2B platform for building materials management.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Package Manager**: pnpm

## Project Structure

```
bmms-workspace/
├── backend/          # Express API server
│   ├── prisma/       # Database schema and migrations
│   └── src/          # Backend source code
├── frontend/         # Next.js application
│   └── src/          # Frontend source code
└── package.json      # Workspace root
```

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your PostgreSQL credentials
```

**Frontend** (`frontend/.env.local`):
```bash
cp frontend/.env.example frontend/.env.local
```

### 3. Database Setup

```bash
cd backend
pnpm prisma:generate
pnpm prisma:migrate
```

### 4. Run Development Servers

From the root directory:
```bash
pnpm dev
```

This will start:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

## Individual Commands

### Backend
```bash
cd backend
pnpm dev              # Start dev server
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:migrate   # Run migrations
```

### Frontend
```bash
cd frontend
pnpm dev              # Start Next.js dev server
pnpm build            # Build for production
```

## Phase 1 Status: ✅ Complete

- [x] pnpm workspace initialized
- [x] Express backend scaffolding
- [x] Next.js frontend scaffolding
- [x] Prisma schema with all entities
- [x] Environment configuration files

---

**Next**: Phase 2 - Authentication & Core Setup
