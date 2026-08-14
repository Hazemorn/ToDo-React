# ToDo List Application

## 📝 Description

A modern, responsive web application designed to help users efficiently manage daily tasks, organize schedules, and track personal productivity. 

This project was built as a study case to master the component-driven architecture of React, strict data typing with TypeScript, modular styling, and client-side state persistence.

---
## 🚀 Getting Started

Follow these steps to clone and run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com
cd ToDo-React/toDo-vite
```

### 2. Install Dependencies
Make sure you have Node.js installed (v18+ is recommended). Install the required packages using npm or yarn:
```bash
npm install
```

### 3. Set Up Environment Variables (.env)
Create a `.env` file in the root of your Vite project folder (`toDo-vite/`) and provide the base URL for your backend API (e.g., MockAPI endpoint):

### 4. Run the Development Server
Start the local Vite dev server:
```bash
npm run dev
```

---

## 🛠️ Tech Stack

This project is built using an efficient, modern, and highly scalable stack:

*   **React 18** — A declarative JavaScript library for building component-based user interfaces.
*   **Vite** — A next-generation frontend build tool providing blistering fast Hot Module Replacement (HMR).
*   **TypeScript** — Provides strict static typing to catch bugs early during development and boost IDE autocomplete.
*   **TanStack Query v5 (React Query)** — React Query handles the cache and server requests (loading, creating, editing, deleting).
*   **Zustand** — Zustand-page handles only the local interface (UI) (search, filters).
*   **Axios** — A promise-based HTTP client featuring pre-configured instances and interceptor configurations.
*   **React Router v6** — A declarative client-side routing library supporting dynamic URL parameters (`:id`).
*   **SASS / SCSS Modules** — Scoped and modular styling that prevents CSS class name collisions across different views.

--
## 🛠️ Technical Decisions & Best Practices

Several architectural choices were made during the development of this application to ensure performance and reliability:

1.  **Strict State Separation (Server State vs UI State):**
    *   All server-side values are exclusively managed by **React Query**. This eliminates the anti-pattern of syncing API data into local stores or context hooks, giving full caching control to TanStack Query.
    *   Purely client-side reactive components—like the text-based filter input (`searchQuery`) or selected filter buttons (`statusFilter`)—are isolated inside **Zustand**.
2.  **Instant-Load UX via `placeholderData`:**
    *   When navigating to the single task screen (`TaskDetail`), the page avoids awkward loading spinner states. Using `placeholderData`, the hook instantly fetches the task properties from the main home feed cache. The updated copy is pulled asynchronously from the network in the background.
3.  **Using `PUT` instead of `PATCH` for MockAPI Compatibility:**
    *   To overcome standard preflight CORS options limitations commonly found in free MockAPI hosting layers (where partial `PATCH` requests are blocked), data modification utilizes a standard `PUT` request method. It passes a full replacement object safely without triggering server network crashes.
4.  **Network Optimization with `AbortSignal`:**
    *   All asynchronous network getters accept a default `{ signal }` variable. If a user quickly switches routes or double-clicks back-and-forth, React Query instantly cancels stale pending XMLHttpRequests, protecting bandwidth.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
