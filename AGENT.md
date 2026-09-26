# AGENT.md

## AI Tools Used

- Claude and ChatGPT — used as review and acceleration tools at different stages of the build.

## How AI Was Used

I designed the overall architecture, folder structure, API routes, validation rules, and error-handling approach myself. Claude was primarily used to review my code, catch small issues, and explain the reasoning behind suggested fixes so I fully understood every change.

Near the deadline, the backend test suite and frontend (React components, state wiring, and CSS) were generated more directly with AI assistance. I carefully reviewed every part, ran the tests myself, and performed manual testing of the full flow before committing.

## AI-Generated vs Manually Written

**Designed and implemented by me (with AI review):**

- Backend folder structure (`routes/`, `controllers/`, `models/`, `config/`)
- REST API design: `POST /api/leads`, `GET /api/leads?search=`, `PATCH /api/leads/:id/status`
- Mongoose schema (status enum, timestamps, field validators)
- `app.js` / `server.js` split for better testability
- Environment handling (`MONGO_URI_TEST` based on `NODE_ENV`)
- Decision to keep the codebase simple (no service layer, no Zustand/Redux) given the scope
- Git workflow and commit structure

**AI-assisted, then fully reviewed and tested by me:**

- Jest + Supertest test suite (`__tests__/lead.test.js`)
- React components: `LeadForm`, `SearchBar`, `LeadList`, `LeadRow`, and `App.tsx` state/data-fetching logic
- CSS styling

## Key Engineering Decisions

- **No service layer** — Controllers talk directly to Mongoose because the business logic is straightforward for a single-entity CRUD app. A service layer would be added if complexity grew.
- **No pagination** — Not needed for the expected dataset size; would add `?page=` / `?limit=` for production use.
- **Search as a query parameter** on the list endpoint (`GET /api/leads?search=`) — follows standard REST filtering patterns.
- **PATCH for status updates** — Correct semantic choice for a partial update.
- **Plain `useState` in `App.tsx`** — Sufficient for a single entity with no complex shared state.

## Debugging & Problem-Solving

A few small, easy-to-miss issues that were caught and fixed during development and testing:

- Missing CORS middleware (blocked all frontend requests)
- Tiny Mongoose query typo (`$option` instead of `$options`) that silently broke search
- Missing `return` after early Express responses (caused “headers already sent” errors)
- Git repository accidentally initialized inside `backend/` instead of the project root
- Form showing a generic alert and clearing input on failed submission — updated to show inline errors and only clear on success

## Future Improvements

- Add pagination for larger datasets
- Introduce a service layer if business logic expands
- Restrict CORS to the specific frontend origin
- Add a “get lead by ID” detail view
- Add graphs/charts (e.g. lead status distribution or trends over time) for better visualization
