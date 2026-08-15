import { useState } from "react";
import s from "./CreateTask.module.scss";
import DropDownApp from "../ui/DropDownApp/DropDownApp";
import type { ITask, Priority } from "../../store/types/types";
import { getDateFrame } from "../../utils/getDate";
import closeImg from "../../assets/icons/close.svg";
import ButtonApp from "../ui/ButtonApp/ButtonApp";
import { useCreateTask } from "../../hooks/tasksMutations";
import { getErrorInput, getErrorText, useInput } from "../../hooks/customInput";

interface CreateTaskProps {
  onClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onClose }) => {
  const createTaskMutation = useCreateTask();

  const title = useInput("", { isEmpty: true });
  const description = useInput("", { isEmpty: true });
  const [priority, setPriority] = useState<Priority>("low");

  const errorInput = getErrorInput(title);
  const errorText= getErrorText(description);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: ITask = {
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      status: "todo",
      priority,
      createdAt: getDateFrame(),
    };
    createTaskMutation.mutate(
      { newTask },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
    onClose();
    setPriority("low");
  };

  return (
    <section className={`${s.new_task} top-indent`}>
      <img
        className="pointer"
        src={closeImg}
        alt="close"
        loading="lazy"
        onClick={onClose}
      />
      <h1>Create a new task</h1>
      <form id="form" className="top-indent" onSubmit={handleSubmit}>
        <div className={s.new_task__title}>
          <input
            className={`border`}
            type="text"
            value={title.value}
            id="taskTitle"
            onChange={(e) => title.onChange(e)}
            onBlur={(e) => title.onBlur(e)}
            placeholder="Enter task title*"
            maxLength={50}
            required
          />
          {errorInput && <p style={{ color: "red" }}>{errorInput}</p>}
        </div>
        <div className={s.new_task__priority}>
          <DropDownApp
            label="Choose priority"
            value={priority}
            onChange={(val) => setPriority(val as Priority)}
          />
        </div>
        <div className={s.new_task__details}>
          <textarea
            className={`$ border`}
            id="taskDetails"
            value={description.value}
            onChange={(e) => description.onChange(e)}
            onBlur={(e) => description.onBlur(e)}
            placeholder="Enter task details*"
            maxLength={300}
            rows={5}
            required
          />
           {errorText && <p style={{ color: "red" }}>{errorText}</p>}
        </div>
        <div className={s.new_task__button}>
          <ButtonApp disable={!title.inputValid || !description.inputValid} title="Add new Task" />
        </div>
        <div className={s.new_task__footnote}>* - required fields</div>
      </form>
    </section>
  );
};

export default CreateTask;
