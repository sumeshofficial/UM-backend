# User Management System

A scalable and production-oriented User Management Backend built with Node.js, Express, TypeScript, PostgreSQL, MongoDB, Redis, and BullMQ following Clean Architecture principles.

This project demonstrates modern backend architecture concepts including dual database synchronization, event-driven processing, queue-based workflows, repository pattern, and SOLID principles.

---

# Features

## Authentication & User Management

- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Role-Based Access Control (RBAC)
- Protected Routes

## Admin Features

- Admin Authentication
- Get All Users
- Get Single User
- Block / Unblock Users
- Admin Protected APIs

## Dual Database Synchronization

This project uses a dual database architecture:

| Database | Purpose |
|---|---|
| PostgreSQL | Primary Source of Truth |
| MongoDB | Read / Mirror Database |

### Synchronization Flow

```text
Client Request
      ↓
Express API
      ↓
PostgreSQL (Primary DB)
      ↓
BullMQ Queue
      ↓
Redis
      ↓
Worker Process
      ↓
MongoDB Mirror DB
```

### Queue Events

- `sync-created-user`
- `sync-updated-user`

### Benefits

- Asynchronous Processing
- Better Scalability
- Retry Handling
- Decoupled Architecture
- Event-Driven Workflows

---

# Architecture

The project follows Clean Architecture principles.

## Folder Structure

```bash
src/
├── application/
│   ├── dtos/
│   ├── errors/
│   ├── ports/
│   ├── types/
│   └── use-cases/
│
├── config/
│   └── env.config.ts
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── types/
│   └── value-objects/
│
├── infrastructure/
│   ├── constants/
│   ├── database/
│   ├── mappers/
│   ├── queues/
│   ├── redis/
│   ├── repositories/
│   ├── services/
│   └── workers/
│
├── presentation/
│   ├── constants/
│   ├── http/
│   └── types/
│
├── shared/
│   ├── constants/
│   └── errors/
│
└── main.ts
```

---

# Architectural Concepts Used

## Clean Architecture

Separation of:

- Domain Layer
- Application Layer
- Infrastructure Layer
- Presentation Layer

## Repository Pattern

Database operations are abstracted using repository contracts.

## Dependency Injection

Dependencies are injected through constructors for:

- Loose Coupling
- Scalability
- Testability

## Event-Driven Queue System

Background tasks are processed asynchronously using:

- BullMQ Workers
- Redis Queues

---

# Security

- Password Hashing using bcrypt / argon2
- JWT Authentication
- RBAC Authorization
- Protected Routes
- Sensitive Data Not Synced to MongoDB

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | API Framework |
| TypeScript | Type Safety |
| PostgreSQL | Primary Database |
| MongoDB | Mirror Database |
| Prisma | PostgreSQL ORM |
| Mongoose | MongoDB ODM |
| Redis | Queue Backend |
| BullMQ | Background Jobs |

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/sumeshofficial/UM-backend.git
cd UM-Backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment File

Create a `.env` file using the provided `.env.example` template.

```bash
cp .env.example .env
```

Example `.env.example`

```env
PORT=5000

DATABASE_URL=
MONGODB_URL=

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

JWT_SECRET=
NODE_ENV=development
```

After creating `.env`, update all required environment variable values.

## 6. Run MongoDB

Start MongoDB locally.

## 7. Run Redis

```bash
redis-server
```

## 8. Run Prisma Migration

```bash
npx prisma migrate dev
```

## 9. Start Development Server

```bash
npm run dev
```

---

# Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build project
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

# Queue Testing

Example queue test:

```bash
npx tsx scripts/test-created-user-sync.ts
```

---

# Queue Workflow Example

```text
Register User
      ↓
Save User in PostgreSQL
      ↓
Add Queue Job
      ↓
Worker Consumes Job
      ↓
Sync User to MongoDB
```

---

# Key Learnings Demonstrated

- Clean Architecture
- SOLID Principles
- Repository Pattern
- Dependency Injection
- Event-Driven Design
- Queue-Based Systems
- Background Workers
- Dual Database Architecture
- Type-Safe Backend Development
- Scalable System Design

---

# License

This project is created for learning and educational purposes.

---

# Author

Developed by Sumesh J