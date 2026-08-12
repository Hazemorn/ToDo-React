import { useState } from "react";
import s from "./CreateTask.module.scss";
import DropDownApp from "../ui/DropDownApp/DropDownApp";
import type { ITask, Priority } from "../../store/types/types";
import { getDateFrame } from "../../utils/getDate";
import closeImg from "../../assets/icons/close.svg";
import useTaskStore from "../../store/store";
import ButtonApp from "../ui/ButtonApp/ButtonApp";

interface CreateTaskProps {
    onClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({onClose}) => {

  const addTask = useTaskStore(state => state.addTask)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const newTask: ITask = {
      id: Date.now().toString(),
      title,
      description,
      status: "todo",
      priority,
      createdAt: getDateFrame(),
    };
    addTask(newTask);
    onClose();
    setTitle("");
    setDescription("");
    setPriority("low");
    
  };

  return (
    <section className={`${s.new_task} top-indent`}>
      <img className="pointer" src={closeImg} alt="close" loading="lazy" onClick={onClose}/>
      <h1>Create a new task</h1>
      <form id="form" className='top-indent' onSubmit={handleSubmit}>
        <input
          className={`${s.new_task__title} border`}
          type="text"
          value={title}
          id="taskTitle"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title*"
          maxLength={50}
          required
        />
        <div className={s.new_task__priority}>
          <DropDownApp label="Choose priority" value={priority} onChange={setPriority}/>
        </div>
        <textarea
          className={`${s.new_task__details} border`}
          id="taskDetails"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task details*"
          maxLength={300}
          rows={5}
          required
        />
        <div className={s.new_task__button}>
          <ButtonApp title="Add new Task"/>
        </div>
        <div className={s.new_task__footnote}>* - required fields</div>
      </form>
    </section>
  );
};

export default CreateTask;
