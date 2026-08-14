import s from "./About.module.scss";

const About = () => {
  return (
    <section className={s.about}>
      <h2>📝 ToDo List Application</h2>

      <h3>🗒️ Description</h3>
      <p>
        A modern, responsive web application designed to help users efficiently
        manage daily tasks, organize schedules, and track personal productivity.
      </p>
      <p>
        This project was built as a study case to master the component-driven
        architecture of React, strict data typing with TypeScript, modular
        styling, and client-side state persistence.
      </p>

      <hr />

      <h3>🚀 Getting Started</h3>
      <p>
        Follow these steps to clone and run the project locally on your machine:
      </p>

      <h4>1. Clone the Repository</h4>
      <pre>
        <code>git clone https://github.com/Hazemorn/ToDo-React.git</code>
      </pre>

      <h4>2. Install Dependencies</h4>
      <p>
        Make sure you have Node.js installed (v18+ is recommended). Install the
        required packages using npm or yarn:
      </p>
      <pre>
        <code>npm install</code>
      </pre>

      <h4>3. Set Up Environment Variables (.env)</h4>
      <p>
        Create a <code>.env</code> file in the root of your Vite project folder
        (<code>toDo-vite/</code>) and provide the base URL for your backend API
        (e.g., MockAPI endpoint).
      </p>

      <p>
        <img
          width="762"
          height="442"
          alt="Screenshot 2026-08-14 at 13 28 19"
          src="https://github.com/user-attachments/assets/7d284155-e39c-4bd3-9bb6-be6657fc2af8"
        />
      </p>

      <h4>4. Run the Development Server</h4>
      <p>Start the local Vite dev server:</p>
      <pre>
        <code>npm run dev</code>
      </pre>

      <hr />

      <h3>🛠️ Tech Stack</h3>
      <p>
        This project is built using an efficient, modern, and highly scalable
        stack:
      </p>
      <ul>
        <li>
          <strong>React 18</strong> — A declarative JavaScript library for
          building component-based user interfaces.
        </li>
        <li>
          <strong>Vite</strong> — A next-generation frontend build tool
          providing blistering fast Hot Module Replacement (HMR).
        </li>
        <li>
          <strong>TypeScript</strong> — Provides strict static typing to catch
          bugs early during development and boost IDE autocomplete.
        </li>
        <li>
          <strong>TanStack Query v5 (React Query)</strong> — React Query handles
          the cache and server requests (loading, creating, editing, deleting).
        </li>
        <li>
          <strong>Zustand</strong> — Zustand-page handles only the local
          interface (UI) (search, filters).
        </li>
        <li>
          <strong>Axios</strong> — A promise-based HTTP client featuring
          pre-configured instances and interceptor configurations.
        </li>
        <li>
          <strong>React Router v6</strong> — A declarative client-side routing
          library supporting dynamic URL parameters (<code>:id</code>).
        </li>
        <li>
          <strong>SASS / SCSS Modules</strong> — Scoped and modular styling that
          prevents CSS class name collisions across different views.
        </li>
        <li>
          <strong>Debounce</strong> — Using debounce for searching.
        </li>
      </ul>

      <hr />

      <h3>🛠️ Technical Decisions & Best Practices</h3>
      <p>
        Several architectural choices were made during the development of this
        application to ensure performance and reliability:
      </p>
      <ol>
        <li>
          <strong>Strict State Separation (Server State vs UI State):</strong>
          <ul>
            <li>
              All server-side values are exclusively managed by{" "}
              <strong>React Query</strong>. This eliminates the anti-pattern of
              syncing API data into local stores or context hooks, giving full
              caching control to TanStack Query.
            </li>
            <li>
              Purely client-side reactive components—like the text-based filter
              input (<code>searchQuery</code>) or selected filter buttons (
              <code>statusFilter</code>)—are isolated inside{" "}
              <strong>Zustand</strong>.
            </li>
          </ul>
        </li>
        <li>
          <strong>
            Instant-Load UX via <code>placeholderData</code>:
          </strong>
          <ul>
            <li>
              When navigating to the single task screen (<code>TaskDetail</code>
              ), the page avoids awkward loading spinner states. Using{" "}
              <code>placeholderData</code>, the hook instantly fetches the task
              properties from the main home feed cache. The updated copy is
              pulled asynchronously from the network in the background.
            </li>
          </ul>
        </li>
        <li>
          <strong>
            Using <code>PUT</code> instead of <code>PATCH</code> for MockAPI
            Compatibility:
          </strong>
          <ul>
            <li>
              To overcome standard preflight CORS options limitations commonly
              found in free MockAPI hosting layers (where partial{" "}
              <code>PATCH</code> requests are blocked), data modification
              utilizes a standard <code>PUT</code> request method. It passes a
              full replacement object safely without triggering server network
              crashes.
            </li>
          </ul>
        </li>
        <li>
          <strong>
            Network Optimization with <code>AbortSignal</code>:
          </strong>
          <ul>
            <li>
              All asynchronous network getters accept a default{" "}
              <code> signal </code> variable. If a user quickly switches routes
              or double-clicks back-and-forth, React Query instantly cancels
              stale pending XMLHttpRequests, protecting bandwidth.
            </li>
          </ul>
        </li>
      </ol>
    </section>
  );
};

export default About;
