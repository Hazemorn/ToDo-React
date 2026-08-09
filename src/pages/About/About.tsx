import s from "./About.module.scss";

const About = () => {
  return (
    <section className={s.about}>
      <h1>ToDo List Application</h1>
      <h3>
        A modern, responsive web application designed to help users efficiently
        manage daily tasks, organize schedules, and track personal productivity.
        This project was built as a study case to master the component-driven
        architecture of React, strict data typing with TypeScript, modular
        styling, and client-side state persistence.
      </h3>
      <h2> 🚀 Features</h2>
      <ul>
        <li>
          Task Management:Easily add, view, track, and delete daily tasks
          through a clean and intuitive user interface.
        </li>
        <li>
          Smart Filtering & Search: Quick search functionality by task title and
          instant filtering based on priority levels.
        </li>
        <li>
          Analytical Dashboard: A dedicated left-side sidebar that displays
          real-time statistics of created, pending, and completed tasks.
        </li>
        <li>
          State Persistence: Automatic data synchronization with the browser's
          local storage to ensure data remains intact after page reloads.
        </li>
      </ul>

      <h2>🛠️ Tech Stack </h2>
      <ul>
        <li>
          React: For building a declarative, component-based user interface with
          efficient DOM updates.
        </li>
        <li>
          TypeScript: For strict typing of component props, state structures,
          and application logic to prevent runtime errors.
        </li>
        <li>
          SCSS Modules: For scoped, modular, and maintainable styling that
          eliminates class name collisions.
        </li>
        <li>
          Web Storage API (LocalStorage): For seamless, client-side data
          persistence.
        </li>
      </ul>
    </section>
  );
};

export default About;
