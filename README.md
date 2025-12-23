# Dumy CRM - Node.js Microservice

A modern Node.js microservice built with Fastify, PostgreSQL, and Drizzle ORM, featuring comprehensive authentication, error handling, and Swagger API documentation.

## Tech Stack

- **Node.js** (Active LTS)
- **Fastify** - Fast and low overhead web framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - TypeScript ORM with excellent TypeScript support
- **Swagger/OpenAPI** - API documentation
- **Zod** - Schema validation
- **bcryptjs** - Password hashing

## Project Structure

```
dumy-CRM/
├── src/
│   ├── backend/
│   │   └── auth/
│   │       ├── controller/     # Request handlers
│   │       ├── service/         # Business logic
│   │       ├── repository/      # Data access layer
│   │       ├── routes/          # Route definitions with Swagger
│   │       └── dto/             # Data transfer objects (validation schemas)
│   ├── common/
│   │   ├── exceptions/          # Custom exception classes
│   │   └── error-codes/        # Centralized error codes
│   ├── config/
│   │   ├── database.js          # Database configuration
│   │   └── swagger.js           # Swagger configuration
│   ├── db/
│   │   ├── schema/              # Drizzle schema definitions
│   │   └── migrations/          # Database migrations
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handler
│   ├── utils/
│   │   ├── logger.js            # Logging utility
│   │   ├── validation.js        # Validation helper
│   │   └── password.js          # Password hashing utilities
│   └── index.js                 # Application entry point
├── drizzle.config.js            # Drizzle ORM configuration
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (Active LTS version) - OR Docker & Docker Compose
- PostgreSQL database (or use Docker Compose)
- npm or yarn

### Option 1: Docker Setup (Recommended)

1. **Create environment file:**

Create a `.env` file in the root directory:

```env
# Application Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database Configuration
DATABASE_URL=postgresql://crm_user:crm_password@postgres:5432/crm_db

# PostgreSQL Configuration (for docker-compose)
POSTGRES_USER=crm_user
POSTGRES_PASSWORD=crm_password
POSTGRES_DB=crm_db
POSTGRES_PORT=5432
```

2. **Start with Docker Compose:**

```bash
# Build and start all services (PostgreSQL + App)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

3. **Run database migrations:**

```bash
# Generate migration files (if needed)
docker-compose exec app npm run db:generate

# Run migrations
docker-compose exec app npm run db:migrate
```

The API will be available at `http://localhost:3000` and Swagger docs at `http://localhost:3000/docs`

### Option 2: Local Development Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
# Application Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dumy_crm

# PostgreSQL Configuration (if using local PostgreSQL)
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
POSTGRES_PORT=5432
```

3. **Set up the database:**

```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate
```

4. **Start the server:**

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Documentation

Once the server is running, access the Swagger UI at:

```
http://localhost:3000/docs
```

The API follows OpenAPI 3.0 standards with:
- Comprehensive request/response schemas
- Reusable component definitions
- Detailed error response documentation
- Example requests and responses

## Authentication Endpoints

### Sign Up

**POST** `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Sign In

**POST** `/api/auth/signin`

Authenticate and sign in a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Sign in successful",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Docker

### Building the Docker Image

```bash
docker build -t dumy-crm:latest .
```

### Running with Docker Compose

The `docker-compose.yml` file includes:
- **PostgreSQL 16** - Database service with health checks
- **Application** - Node.js service with auto-restart
- **Networking** - Isolated bridge network
- **Volumes** - Persistent PostgreSQL data storage

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# Rebuild after code changes
docker-compose up -d --build
```

## Architecture

### Database Schema

The database schema follows best practices:
- UUID primary keys for better distribution
- Proper indexes on frequently queried fields (email, isActive, createdAt)
- Timestamps with timezone support
- Unique constraints on email
- Default values for common fields

### Exception Handling

The project uses a centralized exception handling system:

- **BaseException** - Base class for all custom exceptions
- **ValidationException** - For validation errors (400)
- **NotFoundException** - For resource not found (404)
- **UnauthorizedException** - For authentication errors (401)
- **ConflictException** - For resource conflicts (409)

All exceptions are automatically handled by the global error handler middleware.

### Error Codes

Centralized error codes are defined in `src/common/error-codes/ErrorCodes.js` for consistent error handling across the application.

### Logging

The project includes a custom logger utility (`src/utils/logger.js`) that provides:
- Structured JSON logging
- Different log levels (info, error, warn, debug)
- Development/production mode handling

## Development

### Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server in development mode with auto-reload
- `npm run db:generate` - Generate database migration files
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Code Style

The project follows clean code principles:

- **Separation of Concerns** - Controller, Service, Repository, Mapper layers
- **SOLID Principles** - Single responsibility, dependency injection
- **DTOs** - Request and Response DTOs for type safety and data transformation
- **Mappers** - Entity to DTO conversion layer
- **Minimal Controllers** - Controllers only handle HTTP concerns, delegate to services
- **Error Handling** - Custom exceptions with proper error codes
- **Validation** - Zod schemas for request validation
- **Documentation** - Swagger/OpenAPI 3.0 with reusable schemas

## Security

- Passwords are hashed using bcryptjs
- Input validation using Zod schemas
- Error messages don't expose sensitive information
- Environment variables for configuration

## License

ISC
