
## Project Structure

This project is organized into two main directories: **frontend** and **backend**.

### Frontend

- **Tech stack:** TypeScript, Vite, likely React (based on common conventions), ESLint
- **Key folders/files:**
  - `src/` — Main source code for the frontend application
  - `public/` — Static assets
  - `index.html` — App entry HTML
  - `vite.config.ts` — Vite configuration
  - `tsconfig*.json` — TypeScript configuration
  - `eslint.config.js` — Linting configuration

**To run the frontend:**
```bash
cd frontend
npm install
npm run dev
```
By default, the app runs at `http://localhost:5173` (unless configured otherwise).

---

### Backend

- **Tech stack:** Node.js, TypeScript, likely Express
- **Key folders/files:**
  - `src/`
    - `handlers/` — Route handler logic, divided by resource (e.g., `review`, `user`)
    - `router/` — API route definitions
    - `utils/` — Utility functions
    - `server.ts` — Main server entry point
    - `index.ts` — Application setup
    - `db.ts` — Database connection logic
  - `.env.example` — Sample environment configuration
  - `package.json` — Project dependencies and scripts
  - `vitest.config.ts` — Testing configuration (using Vitest)
  - `tsconfig.json` — TypeScript config

**To run the backend:**
```bash
cd backend
npm install
cp .env.example .env    # Update .env with your settings
npm run dev             # or npm start as appropriate
```
The backend will run at `http://localhost:PORT`, where `PORT` is defined in your `.env`.

---
