import { useState } from "react";
import s from "./Home.module.scss";

import FilterApp from "../../components/FilterApp/FilterApp";
import Skeleton from "../../components/ui/Skeleton/Skeleton";
import CreateTask from "../../components/CreateTask/CreateTask";
import Card from "../../components/Card/Card";
import ModalApp from "../../components/ui/ModalApp/ModalApp";
import ButtonApp from "../../components/ui/ButtonApp/ButtonApp";

import useTaskStore from "../../store/store";
import { useTasks } from "../../services/tasks/getTasks";


const Home = () => {
  const { data: tasks = [], isLoading } = useTasks();

  const searchQuery = useTaskStore((state) => state.searchQuery);
  const statusFilter = useTaskStore((state) => state.statusFilter);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const visibleTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesText =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    return matchesStatus && matchesText;
  });
  const count = tasks.length;
  const isEmpty = visibleTasks.length === 0;

  return (
    <>
      {isModalOpen && (
        <ModalApp isModalOpen={isModalOpen} width="100%">
          <CreateTask onClose={() => setIsModalOpen(false)} />
        </ModalApp>
      )}
      <FilterApp />
      <main className={`${s.layout} top-indent`}>
        <aside className={s.sidebar}>
          <div className={s.sidebar__count}>
            <h2>Created tasks:</h2>
            <h1>{count}</h1>
            <ButtonApp
              title="Create new task"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </aside>

        <section className={s.tasks}>
        {isLoading ? (
          <div className={s.tasks__skeleton}>
            {[...Array(3)].map((_, index) => (
            <Skeleton key={index} />
          ))}
          </div>
          ) : isEmpty ? ( 
            <div className={s.tasks__no_result}>
              <h2>No tasks</h2>
            </div>
          ) : (
            visibleTasks.map((task) => (
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
        </section>
      </main>
    </>
  );
};

export default Home;
