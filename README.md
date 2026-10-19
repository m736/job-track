# Job Tracker — React + TypeScript

A single-user Job Tracker application that helps users organize job applications and track their application progress in one place.

## Features

- **Dashboard:** View total applications, interviews, offers, and rejected applications.
- **Job Management:** Add, edit, and delete job applications.
- **Search:** Search applications by company name or job position.
- **Filter:** Filter applications by status.
- **Sorting:** Sort applications by application date.
- **Persistent Storage:** Save job application data in the browser using LocalStorage.
- **Form Validation:** Validate required company and position fields.
- **Responsive UI:** Organize job application information in a clean interface.

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- Tailwind CSS / CSS
- Vitest
- React Testing Library
- ESLint
- LocalStorage

## Redux Toolkit Concepts

This project demonstrates:

- Redux Toolkit slices and reducers
- Centralized state management
- `createEntityAdapter` for normalized job data
- Memoized selectors using `createSelector`
- React Redux hooks
- Component optimization using `React.memo` and `useCallback`

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/m736/job-track/
```

Move into the project folder:

```bash
cd job-track
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
```

- `npm run dev` — Start the development server.
- `npm run build` — Build the application for production.
- `npm run lint` — Check code quality with ESLint.
- `npm run test` — Run tests with Vitest.

## Testing

The project uses Vitest and React Testing Library to test application behavior, Redux logic, selectors, forms, and dashboard functionality.

## Future Improvements

- Add backend integration and user authentication.
- Add cloud-based data storage.
- Improve accessibility and expand test coverage.

## Author

Frontend Developer | React | TypeScript | Redux Toolkit
