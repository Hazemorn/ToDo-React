# ToDo List Application

## 📝 Description

A modern, responsive web application designed to help users efficiently manage daily tasks, organize schedules, and track personal productivity. 

This project was built as a study case to master the component-driven architecture of React, strict data typing with TypeScript, modular styling, and client-side state persistence.

## 🚀 Features

*   **Task Management:** Easily add, view, track, and delete daily tasks through a clean and intuitive user interface.
*   **Smart Filtering & Search:** Quick search functionality by task title and instant filtering based on priority levels.
*   **Analytical Dashboard:** A dedicated left-side sidebar that displays real-time statistics of created, pending, and completed tasks.
*   **State Persistence:** Automatic data synchronization with the browser's local storage to ensure data remains intact after page reloads.

## 🛠️ Tech Stack

*   **React:** For building a declarative, component-based user interface with efficient DOM updates.
*   **TypeScript:** For strict typing of component props, state structures, and application logic to prevent runtime errors.
*   **SCSS Modules:** For scoped, modular, and maintainable styling that eliminates class name collisions.
*   **Prettier:** Сode formatting.
*   **Zustand:** Zustand-page handles only the local interface (UI) (search, filters).
*   **React Query:** React Query handles the cache and server requests (loading, creating, editing, deleting).

---
## How to run project
---
1. Open project in VSCode (for example)
2. Run command npm i in terminal (console) for installing all required packages (Node.js is required: https://nodejs.org/en/)
3. For builing project you can use the following commands:
- npm run build-prod - building production version (minimized and optimized). The project will be builded into build folder. You can change destination in webpack.common.js (line 19)
- npm run build-dev - building development version
- npm run serve - building development hot-reloaded version with webpack-dev-server




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
