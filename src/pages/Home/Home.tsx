import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";
import s from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <section className={s.new_task}>
        <div className={s.new_task__container}>
          <form id="form">
            <input
              className={`${s.new_task__title} ${s.border}`}
              type="text"
              id="taskTitle"
              placeholder="Enter task title*"
              maxLength={50}
              required
            />
            <div className={s.priority__container}>
              <select name="priority--add" id="priority--add">
                <option value="Low">Choose priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <textarea
              className={`${s.new_task__details} ${s.border}`}
              id="taskDetails"
              placeholder="Enter task details*"
              maxLength={200}
              rows={5}
              required
            />
            <div className={s.new_task__button}>
                <Button title="Add new Task" />
            </div>
            <div className={s.new_task__footnote}>* - required fields</div>
          </form>
          </div>
      </section>
      <section className={s.tasks}>
            <Skeleton/>
      </section>
    </>
  );
};

export default Home;
