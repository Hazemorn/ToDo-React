import { useCallback, useState } from "react";
import s from "./Home.module.scss";

import FilterApp from "../../components/FilterApp/FilterApp";
//import Skeleton from "../../components/Skeleton/Skeleton";
import CreateTask from "../../components/CreateTask/CreateTask";
import Card from "../../components/Card/Card";
import type { ITask } from "../../store/types/types";

const Home = () => {
  const handleAddTask = useCallback((newTask: ITask) => {
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const [tasks, setTasks] = useState<ITask[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const count = tasks.length;
  const isEmpty = tasks.length === 0;

  return (
    <>
      <CreateTask onAddTask={handleAddTask}/>
      <FilterApp />
      <main className={`${s.layout} top-indent`}>
        <aside className={s.sidebar}>
          <div className={s.sidebar__count}>
            <h2>Created tasks:</h2>
            <h1>{count}</h1>
          </div>
        </aside>

        <section className={s.tasks}>
          {isEmpty ? (
            <div className={s.tasks__no_result}>
              <h2>No tasks</h2>
            </div>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                priority={task.priority}
                description={task.description}
                createdAt={task.createdAt}
              />
            ))
          )}
          {/* <Skeleton /> */}
        </section>
      </main>
    </>
  );
};

export default Home;
