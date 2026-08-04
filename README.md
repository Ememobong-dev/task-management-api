# Task Management API

A RESTful backend API for managing projects and tasks, built with **NestJS**, **PostgreSQL**, **Prisma ORM**, and **Docker**.

The project was built as a practical introduction to structured backend development with NestJS while covering database relationships, validation, pagination, filtering, testing, Docker, migrations, error handling, and API documentation.

---

## Features

### Projects

- Create projects
- Retrieve all projects
- Retrieve a project with its tasks
- Delete empty projects
- Prevent deletion of projects that still contain tasks

### Tasks

- Create tasks
- Retrieve tasks
- Retrieve a single task
- Update task titles
- Mark tasks as completed or incomplete
- Move tasks between projects
- Delete tasks
- Filter tasks by project
- Filter tasks by completion status
- Search tasks by title
- Sort tasks
- Paginate task results

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **NestJS**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**
- **Docker Compose**
- **Jest**
- **Supertest**
- **Swagger / OpenAPI**

---

## Architecture

The application follows a modular NestJS architecture:

```text
HTTP Request
    ↓
Controller
    ↓
Service
    ↓
Prisma Service
    ↓
Prisma Client
    ↓
PostgreSQL
```

### Main Application Modules

```text
AppModule
├── TasksModule
├── ProjectsModule
└── PrismaModule
```

---

## Database Relationships

The application uses a **one-to-many relationship** between projects and tasks.

```text
Project
   │
   ├── Task
   ├── Task
   └── Task
```

A project can contain multiple tasks.

A task belongs to a project through the `projectId` foreign key.

Conceptually:

```text
tasks.projectId
      ↓
projects.id
```

The database also uses referential integrity rules to prevent a project from being deleted while tasks still reference it.

---

# Getting Started

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Docker
- Docker Compose

---

## Running Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Start PostgreSQL with Docker

```bash
docker compose up -d postgres
```

Check the database container:

```bash
docker compose ps
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Apply Database Migrations

For development:

```bash
npx prisma migrate dev
```

To apply existing migrations:

```bash
npx prisma migrate deploy
```

### 5. Start NestJS

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## Running Everything with Docker

The complete application can be run using Docker Compose:

```bash
docker compose up --build -d
```

This starts:

```text
Docker Compose
├── PostgreSQL
├── Prisma migration service
└── NestJS API
```

### Check Running Containers

```bash
docker compose ps -a
```

### View Application Logs

```bash
docker compose logs -f app
```

### Stop the Application

```bash
docker compose down
```

Database data is persisted using a Docker volume, so stopping or removing the containers does not automatically delete the database.

> **Warning**
>
> Avoid running the following command unless you intentionally want to delete the database volume and its stored data:

```bash
docker compose down -v
```

---

# API Documentation

Swagger/OpenAPI documentation is available at:

```text
http://localhost:3000/docs
```

The raw OpenAPI JSON specification is available at:

```text
http://localhost:3000/docs-json
```

Swagger UI can also be used to test the API interactively.

---

## API Resources

The application exposes two primary resources:

```text
/tasks
/projects
```

### Task Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Retrieve paginated tasks |
| `GET` | `/tasks/:id` | Retrieve a single task |
| `POST` | `/tasks` | Create a task |
| `PATCH` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

### Project Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/projects` | Retrieve all projects |
| `GET` | `/projects/:id` | Retrieve a project with its tasks |
| `POST` | `/projects` | Create a project |
| `DELETE` | `/projects/:id` | Delete an empty project |

For complete request parameters, request bodies, response schemas, validation rules, and error responses, visit the Swagger documentation at `/docs`.

---

# Database Migrations

**Prisma Migrate** is used to version and manage database schema changes.

### Create a New Development Migration

```bash
npx prisma migrate dev --name migration_name
```

### Apply Existing Migrations

```bash
npx prisma migrate deploy
```

### Regenerate Prisma Client

```bash
npx prisma generate
```

Migration files are stored inside:

```text
prisma/migrations/
```

---

# Testing

The project contains both **unit tests** and **end-to-end tests**.

## Unit Tests

Run:

```bash
npm run test
```

Unit tests isolate individual services and use mocked Prisma dependencies.

Example test flow:

```text
TasksService
     ↓
Mock PrismaService
```

This allows service logic to be tested without connecting to PostgreSQL.

---

## End-to-End Tests

Run:

```bash
npm run test:e2e
```

E2E tests exercise the complete application flow:

```text
HTTP Request
     ↓
NestJS
     ↓
Validation
     ↓
Controller
     ↓
Service
     ↓
Prisma
     ↓
PostgreSQL
```

A separate test database should be used for E2E tests to prevent automated tests from modifying development data.

---

## Test Coverage

Run:

```bash
npm run test:cov
```

---

# Health Check

The API exposes a health endpoint:

```http
GET /health
```

Example:

```text
http://localhost:3000/health
```

The health endpoint can be used by deployment platforms, monitoring systems, load balancers, and container orchestration tools to verify that the API is running.

---

# Useful Commands

### Development Server

```bash
npm run start:dev
```

### Production Build

```bash
npm run build
```

### Production Server

```bash
npm run start:prod
```

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Create a Migration

```bash
npx prisma migrate dev --name migration_name
```

### Apply Existing Migrations

```bash
npx prisma migrate deploy
```

### Start Docker Stack

```bash
docker compose up --build -d
```

### View Docker Services

```bash
docker compose ps -a
```

### Follow API Logs

```bash
docker compose logs -f app
```

### Stop Docker Stack

```bash
docker compose down
```

---

# Concepts Demonstrated

This project demonstrates:

- NestJS modules, controllers, services, and dependency injection
- REST API design
- DTO validation
- Pipes
- Global exception filters
- Environment configuration and validation
- PostgreSQL relational modelling
- Primary and foreign keys
- One-to-many relationships
- Referential integrity
- Prisma ORM
- Prisma migrations
- Prisma relation queries
- Filtering
- Searching
- Sorting
- Offset pagination
- Database transactions
- PostgreSQL indexing
- Unit testing
- End-to-end testing
- Docker containers
- Docker networking
- Docker volumes
- Multi-stage Docker builds
- Swagger/OpenAPI documentation

---

# License

This project is intended for **learning and demonstration purposes**.