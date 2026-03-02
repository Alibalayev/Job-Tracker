Live link: https://job-tracker-alpha-self.vercel.app/

## Tech Stack

| Technology | Role |
|------------|------|
| **React 19** | UI library — components, state, rendering |
| **TypeScript** | Static type checking across the entire codebase |
| **Redux Toolkit** | Global state management (jobs data) |
| **React Router v7** | Client-side routing (SPA navigation) |
| **Tailwind CSS v4** | Utility-first CSS framework for styling |
| **Vite 7** | Build tool and dev server |
| **Axios** | HTTP client for API calls |

---

## Project Architecture

```
src/
├── components/           # Reusable UI pieces
│   ├── layout/
│   │   ├── Header.tsx        # Top bar — logo + page title
│   │   ├── Sidebar.tsx       # Left nav — Dashboard & Jobs links
│   │   └── MainLayout.tsx    # Wraps Sidebar + Header + page content
│   └── ui/               # (future) Buttons, inputs, cards
│
├── pages/                # Route-level components (one per URL)
│   ├── Dashboard/
│   │   └── Dashboard.tsx     # Stats overview — cards by status
│   ├── Jobs/
│   │   └── Jobs.tsx          # Job list + add/delete via modal
│   └── Auth/
│       └── Login.tsx         # Login form (WIP)
│
├── store/                # Redux state management
│   ├── index.ts              # Store configuration + type exports
│   ├── jobsSlice.ts          # Jobs reducer — add, delete, update
│   └── hooks.ts              # Typed useAppSelector & useAppDispatch
│
├── services/             # API layer
│   ├── api.ts                # Axios instance (baseURL config)
│   └── jobsService.ts       # CRUD functions — getJobs, createJob, etc.
│
├── types/                # TypeScript interfaces
│   └── job.ts                # Job interface — the core data shape
│
├── hooks/                # (future) Custom React hooks
├── utils/                # (future) Helper functions
├── styles/               # (future) Shared style tokens
│
├── App.tsx               # Router setup — maps URLs to pages
├── App.css               # App-level styles
├── index.css             # Tailwind CSS entry point
└── main.tsx              # Entry point — ReactDOM + Redux Provider
```

---

## How It All Works Together

### The Data Flow

```
User clicks "Add Job"
        ↓
Jobs.tsx dispatches addJob(newJob)     ← React component
        ↓
jobsSlice.ts reducer runs             ← Redux Toolkit
        ↓
state.jobs array is updated            ← Immer (built into RTK)
        ↓
Dashboard.tsx re-renders               ← React re-render (useAppSelector)
        ↓
Stat cards show updated counts
```

### Entry Point (`main.tsx`)

Everything starts here. React renders `<App />` inside two wrappers:
- **`<Provider>`** — gives every component access to the Redux store
- **`<StrictMode>`** — enables extra development checks

### Routing (`App.tsx`)

React Router maps URLs to page components:
- `/` → `Dashboard` (inside `MainLayout`)
- `/jobs` → `Jobs` (inside `MainLayout`)

`MainLayout` is a **layout route** — it renders the Sidebar and Header once, and swaps only the page content via `<Outlet />`.

### State Management (`store/`)

Redux Toolkit manages the jobs data globally:
- **`jobsSlice.ts`** defines 3 actions: `addJob`, `deleteJob`, `updateJob`
- **`index.ts`** creates the store and exports `RootState` / `AppDispatch` types
- **`hooks.ts`** provides `useAppSelector` and `useAppDispatch` — typed versions of the default Redux hooks

### Pages read and write state:
```tsx
// READ from store
const jobs = useAppSelector((state) => state.jobs.jobs);

// WRITE to store
dispatch(addJob({ id: "...", company: "Google", ... }));
