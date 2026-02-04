# Integrated Bimbel Management System

A comprehensive web-based management system for tutoring centers (Bimbel), built with Next.js 14, Prisma, and Shadcn/UI.

## Modules

- **Kesiswaan**: Student Registration (PSB) & Database.
- **Akademik**: Class Management, Scheduling, Grading.
- **Kepegawaian**: Employee Data & Attendance.
- **Keuangan**: Tuition & Invoice Management.
- **Laporan**: Centralized Reporting (PDF Export).

## Prerequisites

- Node.js 18+
- SQLite (for local dev) or PostgreSQL (for production)

## Getting Started

1. **Install Dependencies**

    ```bash
    npm install
    ```

2. **Environment Setup**
    Copy `.env.example` to `.env` (create one if not exists):

    ```env
    DATABASE_URL="file:./dev.db"
    AUTH_SECRET="your-secret-key" # Generate one: openssl rand -base64 32
    ```

3. **Database Setup**

    ```bash
    npx prisma db push
    npx prisma generate
    npx ts-node prisma/seed.ts # (Optional) Seed initial data
    ```

4. **Run Development Server**

    ```bash
    npm run dev
    ```

    Open `http://localhost:3000`.

## Deployment

See `deployment_guide.md` for instructions on Vercel or VPS deployment.
