





# Full-Stack User Management System SPA

A production-style Single Page Application (SPA) designed to demonstrate user management with role-based access control (RBAC). Built with an **Angular 18** frontend, and a **Node.js + Express + TypeScript** backend.

---

## Key Features

1. **Role-Based Access Control (RBAC)**:
   - **Admin**: Full control. Can view all users, register new users, and edit or delete existing ones.
   - **General User**: Read-only, sandboxed access. Can only view their own user profile card and data record.
2. **Robust Security**:
   - Simulated token-based JWT authentication.
   - API endpoints guarded on the backend, and routes protected on the frontend with custom Route Guards.
3. **Immersive Premium UI/UX**:
   - Modern Dark-Indigo aesthetic with vibrant glassmorphic backdrops, smooth gradient accents, hover animations, and pulsing glow fields.
   - Full-screen loading screen overlay synchronizing with active HTTP calls to indicate simulated background database queries.
4. **Mock Database**:
   - Built-in array database seeded with 8 sample users spanning multiple departments and system roles.
5. **Artificial Delay**:
   - Integrated middleware on backend responses (2–5 seconds) to explicitly showcase asynchronous states and the loading visualizers.

---

## Project Structure

```
c:\Users\HP\Downloads\new\
├── backend/               # Express API server + TypeScript
│   ├── src/
│   │   ├── controllers/   # Route handler actions
│   │   ├── data/          # Mock database & CRUD utils
│   │   ├── middleware/    # Auth & delay filters
│   │   ├── models/        # Shared data definitions
│   │   ├── routes/        # App router bindings
│   │   ├── services/      # Business logic controllers
│   │   └── server.ts      # Server bootstrap script
│   ├── tsconfig.json
│   └── package.json
├── frontend/              # Angular 18 Single Page Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Guards, interceptors, core services
│   │   │   ├── features/  # Login & Dashboard features
│   │   │   ├── shared/    # Models, components (Spinner)
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   ├── styles.scss    # Custom Angular Material global style rules
│   │   └── index.html
│   └── package.json
└── README.md              # Documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/) (usually bundled with Node)

### Installation

First, clone or copy the project files to your system, then navigate to each subfolder and install dependencies:

1. **Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Application

For the application to function correctly, both servers must be running concurrently:

### 1. Start the Backend API Server
Navigate to the `backend` folder and run the developer dev-server:
```bash
cd backend
npm run dev
```
The server will boot and listen on **`http://localhost:3000`**.

### 2. Start the Frontend Application
Navigate to the `frontend` folder and run the dev server:
```bash
cd frontend
npm start
```
The application will launch and compile. Open your browser and go to **`http://localhost:4200`**.

---

## Test Credentials

Use these seeded logins to test the differing privilege architectures:

| User ID | Password | Role | Description |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | **Admin** | Full system directory access (Read, Create, Update, Delete) |
| `john.doe` | `password123` | **GeneralUser** | Read-only access restricted solely to John Doe's profile |
| `jane.smith` | `password123` | **GeneralUser** | Read-only access restricted solely to Jane Smith's profile |

---

## API Documentation

- **`POST /api/auth/login`**: Authenticates user credentials. Returns a verification token and profile object.
- **`GET /api/users`**: Fetches user records. (RBAC: Admin gets all users; General Users only get their own profile).
- **`POST /api/users`**: Creates a new user record. (*Admin Only*)
- **`PUT /api/users/:id`**: Modifies an existing user record. (*Admin Only*)
- **`DELETE /api/users/:id`**: Deletes a user record. (*Admin Only*)
- **`GET /api/health`**: Simple server health verification.
