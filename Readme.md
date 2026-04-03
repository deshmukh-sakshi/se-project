# Building Materials Management System

A web application for Deshmukh Traders to manage their building materials business. This system helps track inventory, manage orders, handle customer relationships, and process transactions.

## Getting Started

### Step 1: Download the Project

If you haven't already, clone or download this project to your computer.

### Step 2: Install Everything

Open your terminal in the project folder and run:

```bash
pnpm install
```

This will download all the necessary files the project needs to run.

### Step 3: Set Up the Database

1. Create a new PostgreSQL database called `bmms_db`
2. Copy the example environment file:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Open `backend/.env` and update the `DATABASE_URL` with your database details:
   ```
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/bmms_db?schema=public"
   ```
4. Set up the database tables:
   ```bash
   cd backend
   pnpm prisma:generate
   pnpm prisma:migrate
   ```

### Step 4: Set Up the Frontend

Copy the frontend environment file:
```bash
cp frontend/.env.example frontend/.env.local
```

### Step 5: Start the Application

From the main project folder, run:

```bash
pnpm dev
```

This starts both the backend and frontend. You can now open your browser and go to:
- **Website**: http://localhost:3000
- **API Server**: http://localhost:5000

## Common Tasks

### View Your Database
To see and edit your database in a visual interface:
```bash
cd backend
pnpm prisma:studio
```

### Add Sample Data
To populate your database with test data:
```bash
cd backend
pnpm seed
```

### Stop the Servers
Press `Ctrl + C` in the terminal where the servers are running.

### Start Fresh
If something goes wrong, you can:
1. Delete the `node_modules` folders
2. Run `pnpm install` again
3. Restart the servers

## Project Structure

```
bmms-workspace/
├── backend/              # Server-side code
│   ├── prisma/          # Database setup and structure
│   ├── src/             # Backend code
│   │   ├── config/      # Configuration files
│   │   ├── middleware/  # Security and validation
│   │   ├── routes/      # API endpoints
│   │   └── utils/       # Helper functions
│   └── .env             # Backend settings (create this)
│
├── frontend/            # Client-side code
│   ├── src/            # Frontend code
│   │   ├── app/        # Pages and layouts
│   │   ├── components/ # Reusable UI pieces
│   │   ├── lib/        # Helper functions
│   │   └── types/      # TypeScript definitions
│   └── .env.local      # Frontend settings (create this)
│
└── Diagrams/           # System design diagrams
```

## Features

- User authentication (login/logout)
- Inventory management
- Order processing
- Customer management
- Transaction tracking
- Admin dashboard

## Technology Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma
- **Authentication**: JWT (JSON Web Tokens)

## Need Help?

If you run into issues:
1. Make sure all prerequisites are installed
2. Check that your database is running
3. Verify your `.env` files have the correct settings
4. Try deleting `node_modules` and running `pnpm install` again

## Development Status

✅ Project setup complete
✅ Database schema defined
✅ Basic authentication implemented
🚧 Additional features in progress
