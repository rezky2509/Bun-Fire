# BunFire 🔥

**Database-first starter kit powered by Bun, Drizzle, and Better Auth.**  
Design, migrate, authenticate, ship—all without configuration friction.

> Special credit to [Nick Olson Codes](https://www.youtube.com/@nick_olson_codes) for integration ideas and reference implementation.

## Features ✨

- 🚀 **Zero-Config Setup** — One command to initialize everything
- 🗄️ **Database First** — Design your schema, auto-generate migrations
- 🔐 **Built-in Auth** — Email/password, sessions, and OAuth ready
- 📊 **Database GUI** — Visual browser for exploring and managing data
- 📚 **OpenAPI Docs** — Auto-generated API documentation with Swagger UI
- ⚡ **Type-Safe** — Full TypeScript support end-to-end
- 🐳 **Docker Ready** — Instant database setup with Docker Compose
- 🔥 **Bun Powered** — Fast runtime with native bundling

## Prerequisites 📋

Please ensure you have the following installed on your machine:

### Required

**Bun Runtime** — JavaScript runtime optimized for speed
- Download from: https://bun.sh

**Docker Desktop** — Container platform for database management
- Download from: https://www.docker.com/products/docker-desktop
- Available for macOS, Windows, and Linux
- After installation, ensure Docker is running (check menu bar/system tray for Docker icon)

### Verify Installation

```bash
# Check Bun is installed
bun --version

# Check Docker is installed and running
docker --version
docker ps  # Should list containers (may be empty)
```

If Docker isn't running, open Docker Desktop from your Applications folder (macOS) or Start menu (Windows).

## Quick Start 🚀

### 1. Install Dependencies

```bash
bun install
```

### 2. Initialize Everything

```bash
bun run initialize
```

This script will:
- Start your Docker database container
- Wait for the database to be ready
- Run all migrations
- Create tables for authentication and your schema

That's it! Your database is ready to go.

### 3. Start Development Server

```bash
bun run dev
```

### 4. Explore the API

Visit the interactive API documentation:

```
http://localhost:3000/api/auth/reference
```

## Available Commands 📝

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

# Access OpenAPI documentation & REST API
# Visit: http://localhost:3000/api/auth/reference
```

## Project Structure 📁

```
├── src/
│   ├── db/
│   │   ├── schema.ts              # Database schema definitions
│   │   └── db.ts                  # Database connection (MySQL URI)
│   ├── auth/
│   │   └── config.ts              # Better Auth configuration
│   ├── routes/                    # API routes
│   ├── controllers/
│   │   └── example.controller.ts  # Endpoint definitions
│   └── middleware/                # Custom middleware
│   ├── service/                   # Business logic goes here
├── migrations/                    # Auto-generated migration files
├── docker-compose.yml             # Docker configuration
├── drizzle.config.ts              # Drizzle ORM config
├── initializeScript.ts            # Startup initialization
├── .env.example                   # Environment template
└── .env.local                     # Your actual environment vars
```

## Environment Setup 🔧

Create a `.env.local` file in the root directory:
Look at the `.env.example` in the file

```env
# Database Connection URI
DATABASE_URL=mysql://root:your_secure_password@localhost:3306/starter_db
DATABASE=starter_db

# Application
BASE_URL=http://localhost:3000

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters
```

**Generate a secure secret:**

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Bun
bun -e "console.log(crypto.getRandomValues(new Uint8Array(32)).toString())"
```

## Database Schema 📊

### Define Your Tables

Edit `src/db/schema.ts`:

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

### Apply Changes

```bash
bun run migrations
```

Verify in the database GUI:

```bash
bun run database:gui
```

## Authentication 🔐

### Better Auth Configuration

Your auth is configured in `src/auth/config.ts`:

### API Endpoints

All auth endpoints are documented at: `http://localhost:3000/api/auth/reference`

#### Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'
```

Response:
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "session": {
    "id": "session-abc",
    "userId": "user-123",
    "expiresAt": "2024-02-15T10:30:00Z"
  }
}
```

#### Sign In

```bash
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

#### Get Current Session

```bash
curl -X GET http://localhost:3000/api/auth/session \
  -H "Cookie: auth_token=your_session_id"
```

#### Sign Out

```bash
curl -X POST http://localhost:3000/api/auth/sign-out \
  -H "Cookie: auth_token=your_session_id"
```

### Protected Routes with Middleware 
Pre-defined middleware had been created. Please look at the `src/midddleware/auth-middleware.ts`


## Building APIs 🛠️

### Create a Controller.
### Register Routes
Look at example on 
`src/controllers/example.controller.ts`:

## Database Operations 💾
Look at example on 
`src/service/example.service.ts`:

## Troubleshooting 🔧

### Docker Issues

**"Cannot connect to Docker daemon" error**
- Docker Desktop is not running
- Open Docker Desktop from Applications (macOS) or Start menu (Windows)
- Wait for it to fully start before running commands

**"docker-compose: command not found"**
- Reinstall Docker Desktop from: https://www.docker.com/products/docker-desktop
- Docker Compose is included with the installation

**Port 3306 already in use**
By default, in your system maybe port 3306 had been use. You can the docker compose file to change 3306

```bash
# Stop the running container
bun run container:stop

# Optional: Reset Docker
docker system prune

# Start again
bun run container:start
```

### Database Connection Issues

**"Lost connection to database"**
- Ensure Docker is running and container is started: `bun run container:start`
- Wait 5 seconds for MySQL to initialize
- Check `DATABASE_URL` in `.env.local` is correct

**Migrations not applying**
- Verify container is running: `bun run container:start`
- Ensure database connection is working
- Try again: `bun run migrations`

### Authentication Issues

**Sessions not persisting**
- Ensure `BETTER_AUTH_SECRET` is set in `.env.local`
- Check that requests include `credentials: 'include'`
- Verify `BASE_URL` matches your server URL

**"Secret not found" error**
- `BETTER_AUTH_SECRET` is missing or empty
- Generate a new secret: `openssl rand -base64 32`
- Add to `.env.local` and restart server

**Auth tables not created**
- Run `bun run initialize` or `bun run migrations`
- Verify database connection is working
- Check drizzle adapter configuration

**Sign-up/Sign-in returning 400 errors**
- Check request body format (email, password, name for sign-up)
- Ensure Content-Type header is `application/json`
- Verify email format is valid

## Next Steps 📚

1. ✅ Install dependencies
2. ✅ Run `bun run initialize`
3. ✅ Define your database schema
4. ✅ Run migrations
5. ✅ Define your endpoints (controllers)
6. ✅ Define your business logic
7. 🚀 Start building your API routes

## Tech Stack 🛠️

| Technology | Purpose |
|-----------|---------|
| **Bun** | JavaScript runtime & package manager |
| **MySQL 8** | Relational database |
| **Docker** | Container management |
| **Drizzle ORM** | Type-safe database queries |
| **Better Auth** | Authentication & sessions |
| **Hono** | Lightweight web framework |
| **OpenAPI/Swagger** | API documentation |
| **TypeScript** | Type safety |

## Resources 📖

- [Bun Documentation](https://bun.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Better Auth Documentation](https://www.better-auth.com/)
- [Hono Framework](https://hono.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## Contributing 🤝

We welcome contributions!

## License 📄

MIT - Feel free to use this starter kit for your projects. 

---

**Ready to build? Run `bun run initialize` and start coding!** 🔥