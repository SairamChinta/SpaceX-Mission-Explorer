# SpaceX Mission Explorer

A React + Next.js + TypeScript app that lists SpaceX launches using the SpaceX public API (v4). Built with TailwindCSS and Zustand for state management. Includes search (debounced), year filter, success-only toggle, favorites (localStorage), details modal, responsive & accessible UI, and theme toggle (dark/light).

Live demo: ` https://space-x-mission-explorer-ten.vercel.app/ `

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
### app runs on http://localhost:3000

## for checking test
npm run test


## Project structure
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