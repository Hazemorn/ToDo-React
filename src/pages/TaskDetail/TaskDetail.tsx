import s from "./TaskDetail.module.scss";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ButtonApp from "../../components/ui/ButtonApp/ButtonApp";
import DropDownApp from "../../components/ui/DropDownApp/DropDownApp";

import editImg from "../../assets/icons/edit.svg";
import trashcanImg from "../../assets/icons/trash-can.svg";

import useTaskStore from "../../store/store";
import type { Priority, Status } from "../../store/types/types";

const TaskDetail = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const currentTask = useTaskStore((state) => state.currentTask);

  const [localTitle, setLocalTitle] = useState<string>(currentTask.title);
  const [localDescription, setLocalDescription] = useState<string>(currentTask.description);
  const [localPriority, setLocalPriority] = useState<Priority>(currentTask.priority);
  const [localStatus, setLocalStatus] =useState<Status>(currentTask.status);

  useEffect(() => {
    setLocalTitle(currentTask.title);
    setLocalDescription(currentTask.description || "");
    setLocalPriority(currentTask.priority);
    setLocalStatus(currentTask.status);
  }, [currentTask]);


  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/");
  };

  const deleteHandler = () => {
    deleteTask(currentTask.id);
    navigate("/");
  };
  const editHandler = () => {
    setEdit(true);
  };

  const saveHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    editTask(currentTask.id, {
      title: localTitle,
      description: localDescription,
      priority: localPriority,
      status: localStatus,
    });
    
    setEdit(false); 
  };

  const cancelHandler = () => {
    setLocalTitle(currentTask.title);
    setLocalDescription(currentTask.description);
    setLocalPriority(currentTask.priority);
    setLocalStatus(currentTask.status);
    setEdit(false);
  };

  return (
    <form className={`${s.detail} border`} onSubmit={(e)=>saveHandler(e)}>
      <ButtonApp title="< Back" onClick={onClickBack} max_width="fit-content" />
      <h2 className={"top-indent"}>
        <input
          className={`${s.detail__title} border`}
          type="text"
          value={localTitle}
          id="taskTitle"
          placeholder="Enter task title*"
          onChange={(e) => setLocalTitle(e.target.value)}
          maxLength={50}
          required
          readOnly={!edit}
        />
      </h2>
      <p>Created date: {currentTask.createdAt}</p>
      <div className={s.detail__options}>
        <div>
          <DropDownApp
            label="Priority"
            value={localPriority}
            onChange={setLocalPriority}
            disable={!edit}
          />
        </div>
        <div>
          <DropDownApp
            label="Status"
            isPriotity={false}
            value={localStatus}
            onChange={setLocalStatus}
            disable={!edit}
          />
        </div>
      </div>
      <h4>
        <textarea
          className={`${s.detail__description} border`}
          id="taskDetails"
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          placeholder="Enter task details*"
          maxLength={300}
          rows={5}
          readOnly={!edit}
          required
        />
      </h4>
      {!edit &&(
      <div className={s.detail__buttons}>
        <div className={s.button} onClick={editHandler}>
          <h4>Edit</h4>
          <img src={editImg} alt="edit" loading="lazy" />
        </div>
        <div className={s.button} onClick={deleteHandler}>
          <h4>Delete</h4>
          <img src={trashcanImg} alt="delete" loading="lazy" />
        </div>
      </div>)}
      {edit && (
        <div className={s.detail__buttons}>
          <ButtonApp title="Save" max_width="150px" />
          <ButtonApp title="Cancel" max_width="150px" onClick={cancelHandler} />
        </div>
      )}
    </form>
  );
};

export default TaskDetail;
