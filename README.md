# Lead Tracker

A full-stack CRUD application for tracking sales leads. Built as a take-home assignment with a focus on clean architecture, test coverage, and production deployment.

## Live Demo

- **Frontend**: https://deluxe-starship-3f6b2e.netlify.app/
- **Backend API**: https://lead-tracker-e65q.onrender.com/api/leads

## Features

- Create new leads (name, email, phone, status)
- List all leads
- Search leads by name or email (`GET /api/leads?search=`)
- Update lead status via `PATCH /api/leads/:id/status`
- Responsive UI with loading and error states

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript (Vite) |
| Backend | Node.js + Express (ESM) |
| Database | MongoDB Atlas + Mongoose |
| Testing | Jest + Supertest (10 integration tests) |
| Deployment | Frontend → Netlify · Backend → Render |

## Architecture

### Frontend
- `App.tsx` owns application state (`leads`, `loading`) and handles API calls.
- State is passed down via props — no external state library was needed.
- Components: `LeadForm`, `SearchBar`, `LeadList`, `LeadRow`.
- All HTTP requests live in `api.ts` (Axios instance).

### Backend
- `server.js` — entry point (loads env, connects to DB, starts server).
- `src/app.js` — Express app (middleware + routes). Separated so it can be imported directly in tests without starting a live server.
- `src/config/db.js` — MongoDB connection that switches between production and test databases based on `NODE_ENV`.
- `src/models/lead.model.js` — Mongoose schema with `status` enum, field validators, and automatic timestamps.
- Routes and controllers kept separate. Business logic is thin enough that controllers call Mongoose directly (no service layer).

### Testing
10 integration tests covering create, list/search, and update-status endpoints. Tests run against a dedicated test database.

## Local Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file (see `.env.example`):

```
MONGODB_URI=<your MongoDB Atlas connection string>
MONGODB_URI_TEST=<separate test database connection string>
PORT=3000
```

```bash
npm start   # start the server
npm test    # run the test suite
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

## Deployment

### Backend (Render)
1. Connect the GitHub repo and set the root directory to `backend`.
2. Build command: `npm install` · Start command: `npm start`
3. Add `MONGODB_URI` as an environment variable in the Render dashboard.
4. In MongoDB Atlas → Network Access, allow `0.0.0.0/0` (Render does not provide static IPs).

### Frontend (Netlify)
1. Connect the GitHub repo and set the base directory to `frontend`.
2. Build command: `npm run build` · Publish directory: `dist`
3. Add `VITE_API_URL` (pointing to the deployed Render backend) before the first production build — Vite inlines env vars at build time.
4. Set the project to Public so the live URL is accessible without a Netlify login.

## Design Decisions & Trade-offs

| Decision | Rationale |
|---|---|
| No service layer | Controllers talk directly to Mongoose because the business logic is straightforward for a single-entity CRUD app. A service layer would be added if complexity grew. |
| No pagination | Not needed for the expected dataset size; would add `?page=` / `?limit=` for production use. |
| Search as a query parameter | `GET /api/leads?search=` follows standard REST filtering patterns. |
| PATCH for status updates | Correct semantic choice for a partial update. |
| CORS open to all origins | Sufficient for the assignment. Would be restricted to the frontend origin in production. |
| Plain useState (no Redux/Zustand) | Sufficient for a single entity with no complex shared state. |
| Delete not implemented | Outside the required feature set. Prioritized required features, tests, and deployment. |

## Future Improvements

- Add pagination for larger datasets
- Introduce a service layer if business logic expands
- Restrict CORS to the specific frontend origin
- Add a "get lead by ID" detail view
- Add graphs/charts (e.g. lead status distribution or trends over time) for better visualization

## Project Structure (high level)

```
lead-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── server.js
│   └── ...
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── api.ts
    │   └── App.tsx
    └── ...
```
