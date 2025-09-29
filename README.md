# SpaceX Mission Explorer

A React + Next.js + TypeScript app that lists SpaceX launches using the SpaceX public API (v4). Built with TailwindCSS and Zustand for state management. Includes search (debounced), year filter, success-only toggle, favorites (localStorage), details modal, responsive & accessible UI, and theme toggle (dark/light).

Live demo:

## Features
- Browse and search launches (debounced input).
- Filter by year, successful only, or favorites only.
- View mission details in a modal with patch image and links.
- Mark/unmark favorites persisted in `localStorage`.
- Loading skeletons, error messaging and empty states.
- Responsive and keyboard accessible UI.
- Dark mode / Light mode toggle.
- Tests: 3 tests using React Testing Library.

## Tech stack
- Next.js (app router)
- React + TypeScript
- TailwindCSS
- Zustand (state management)
- Axios (API calls)
- Jest + React Testing Library (tests)

## Setup

git clone https://github.com/SairamChinta/SpaceX-Mission-Explorer.git
cd spacex-mission-explorer
npm install

npm run dev
# app runs on http://localhost:3000

# for checking test
npm run test


Project structure
src/app — Next.js app entry points and global styles

src/components — UI components (Navbar, MissionList, Card, Filters, Modal, etc.)

src/lib/api.ts — API helper for SpaceX

src/store — Zustand store

src/hooks — small helpers (localStorage hook)

src/tests — React Testing Library tests

TODO's:

UI is kept intentionally minimal but polished.

Virtualized list for very large collections (performance).

Pagination or infinite-scroll.

Better image fallbacks and caching.

More tests (keyboard navigation, accessibility auditing).

lodash.debounce is used for convenience; can be replaced with a small custom debounce if you prefer no additional deps.

## Additional implementation notes & guidance

- The project uses the SpaceX v4 API via the `/launches/query` endpoint for efficient population of rockets. The `fetchLaunches` returns `Launch[]` with `rocket` normalized to a name when available.
- Favorites and filters are persisted via `zustand`'s `persist` middleware to `localStorage` (`mission-store` key). The `useLocalStorage` hook is added for convenience and potential future use.
- Debounced search uses `lodash.debounce`. If you prefer no external lib, I can replace it with a tiny custom debounce function and remove the lodash dep.
- Accessibility: components use semantic HTML, proper ARIA on modal and loading. For full-a11y, consider focus-trap on modal and keyboard handlers (TODO).
- Tests: the three requested tests cover fetch + list rendering, favorites toggle/persistence, and detail modal rendering. They mock API calls.



## What I did **not** include
- `node_modules` (obvious)
- A Loom video (optional per assignment)
- CI workflow (optional; can add GitHub Actions for tests + deployment if you want)
- Heavy accessibility features like focus trap (I added ARIA and modal markup; focus trap is a small TODO)


If you want, I can **immediately**:
- replace `lodash.debounce` with a tiny internal debounce to remove that dependency, or
- provide a ready-to-copy `git` repository ZIP (I cannot create files on your machine, but I can produce a script or the remaining small files), or
- add GitHub Actions for CI and Vercel auto-deploy configuration, or
- add more tests (keyboard navigation, filter UI test, etc.), or
- polish the UI with animations, or
- convert the modal to a routed detail page (currently modal + `fetchLaunchById` is implemented).