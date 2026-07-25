# Hono+DrizzleORM+BetterAuth Starter Kits

A modern, zero-config starter kit for building backend applications with database-first development. Design your database schema with ease, and start building immediately—no complex configuration required. Huge credit to [Nick Olson Codes](https://www.youtube.com/@nick_olson_codes) for most of the integrations codes ideas and reference. 

## What's Inside

- **Instant Database Setup** — Docker-managed database with one command
- **Database GUI** — Visual database browser for exploring and managing data
- **Auto Migrations** — Drizzle ORM integration for type-safe database migrations
- **REST API** — Built-in authentication API with OpenAPI documentation
- **Development Ready** — Hot reload, type safety, and modern tooling out of the box

## Pre-Requisite
 
Please ensure you had bun runtime (JavaScript runtime) installed on your machine
- Download from: https://bun.com/docs/installation
Please ensure docker desktop had been installed.
- Download from: https://www.docker.com/products/docker-desktop
- Available for macOS, Windows, and Linux
- After installation, ensure Docker is running (you'll see the Docker icon in your menu bar/system tray)
### Verify Installation
 
```bash
# Check Bun is installed
bun --version
 
# Check Docker is installed and running
docker --version
docker ps  # Should list containers (may be empty)
```
 
If Docker isn't running, start Docker Desktop once your start your machine and from your applications folder.

## Quick Start

## 1. Install the dependencies
```bash 
# This script will install all the required dependecies first 
bun install
``` 

## 2. Initializing container and migration 
```bash 
# This script will install all the required dependecies first 
bun run initialize
``` 
Apply all pending migrations from your schema definitions to the database.

### 3. Run local development server
```bash  
bun run dev
``` 

### 4. You're Ready to Build

Your database is now live and ready for development. Pick any of the commands below to get started.

## Available Commands

### Database & Migrations

```bash
# Start the Docker database container
bun run container:start

# Stop the Docker database container
bun run container:stop

# Run pending migrations
bun run migrations

# View and explore your database visually
bun run database:gui
```

### Development & API

```bash
# Start the development server with hot reload
bun run dev

# Access the better-auth OpenAPI documentation & REST API
# Visit: http://localhost:3000/api/auth/reference
```

## Database GUI

Once your database is running, open the GUI to browse and manage your data:

```bash
bun run database:gui
```

This opens an interactive interface where you can:
- View all tables and their structure
- Browse and edit data
- Run custom queries
- Monitor database performance

## REST API & Documentation

After starting the development server, you can view the authentication openAPI documentation:

```
http://localhost:3000/api/auth/reference
```

Features:
- Interactive API explorer
- Try endpoints directly from the browser
- Full request/response examples
- Authentication flow documentation

## Project Structure

```
├── src/
│   ├── db/
│   │   ├── schema.ts          # Database schema definitions
│   │   └── db.ts              # Database connection
│   ├── auth/
│   │   └── config.ts          # Better-auth configuration
│   └── routes/                # API routes
│   ├── controller/
│   └───/example.controller.ts # Endpoint definition
├── migrations/                # Auto-generated migration files
├── docker-compose.yml         # Database container config
└── .env.local                 # Environment variables 
```

## Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
HOST=localhost
ROOT_USER=root
DATABASE=starter_db
USER_PASSWORD=your_secure_password

# Application
BASE_URL=http://localhost:3000
NODE_ENV=development
```

## Defining Your Database Schema

Edit `src/db/schema.ts` to define your tables:

```typescript
import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = mysqlTable("posts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 5000 }),
  createdAt: timestamp("created_at").defaultNow(),
});
```

After defining your schema:

1. Run `bun run migrations` to apply changes
2. Open `bun run database:gui` to verify your database tables
3. Start coding!

Explore all auth endpoints at: `http://localhost:3000/api/auth/reference`

## Common Workflows

### Add a New Table

1. Define the table in `src/db/schema.ts`
2. Run `bun run migrations`
3. Verify in `bun run database:gui`

### Access the Database in Code

```typescript
import { db } from "./db/db";
import { users } from "./db/schema";

// Query
const allUsers = await db.select().from(users);

// Insert
await db.insert(users).values({
  id: "user-1",
  email: "dev@example.com",
  name: "Developer"
});

// Update
await db.update(users)
  .set({ name: "Updated Name" })
  .where(eq(users.id, "user-1"));
```

### Common Better Auth API

All authentication endpoints are available at `http://localhost:3000/api/auth/*`

Examples:
- `POST /api/auth/sign-up/email` — Register a new user
- `POST /api/auth/sign-in/email` — Login

See full documentation at: `http://localhost:3000/api/auth/reference`

### Can't connect to database GUI

1. Verify container is running: `bun run container:start`
2. Check your `.env.local` has correct credentials
3. Restart: `bun run container:stop && bun run container:start`

## Tech Stack

- **Runtime** — Bun
- **Database** — MySQL + Docker
- **ORM** — Drizzle ORM (type-safe)
- **Authentication** — Better Auth
- **API Framework** — Hono
- **API Docs** — OpenAPI/Swagger

## Next Steps

1. ✅ Install dependencies
2. ✅ Start your database
3. ✅ Define your schema
4. ✅ Run migrations
5. 🚀 Start building your API routes