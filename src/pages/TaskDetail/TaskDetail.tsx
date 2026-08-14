import s from "./TaskDetail.module.scss";
import { useNavigate} from "react-router";//, useParams 
import { useEffect, useState } from "react";
import ButtonApp from "../../components/ui/ButtonApp/ButtonApp";
import DropDownApp from "../../components/ui/DropDownApp/DropDownApp";

import editImg from "../../assets/icons/edit.svg";
import trashcanImg from "../../assets/icons/trash-can.svg";

import type { Priority, Status } from "../../store/types/types";
import { useTaskDetail } from "../../services/tasks/getTasks";
import { useDeleteTask } from "../../services/tasks/deleteTask";
import { useUpdateTask } from "../../services/tasks/updateTask";

const TaskDetail = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const {data: currentTask, isError, isLoading} = useTaskDetail();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const [localTitle, setLocalTitle] = useState<string>('');
  const [localDescription, setLocalDescription] = useState<string>('');
  const [localPriority, setLocalPriority] = useState<Priority>('low' as Priority);
  const [localStatus, setLocalStatus] =useState<Status>('todo' as Status);

  useEffect(() => {
    if(currentTask) {
      setLocalTitle(currentTask.title);
      setLocalDescription(currentTask.description || "");
      setLocalPriority(currentTask.priority);
      setLocalStatus(currentTask.status);
    }
  }, [currentTask]);

  if (isLoading) {
    return <div className={s.loading}><h4>Loading task details...</h4></div>;
  }

  const onClickBack = () => {
    navigate("/");
  };

  const deleteHandler = () => {
    if (!currentTask?.id) return; 

    deleteTaskMutation.mutate(currentTask.id , {
      onSuccess: () => {
        navigate("/");
      }
    });
  };

  const editHandler = () => {
    setEdit(true);
  };

  const saveHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentTask?.id) return;
    const updatedFields = {
      title: localTitle,
      description: localDescription,
      priority: localPriority,
      status: localStatus,
    };

    updateTaskMutation.mutate(
      { id: currentTask.id, fields: updatedFields },
      {
        onSuccess: () => {
          setEdit(false);
        },
      }
    );
  };

  const cancelHandler = () => {
    setLocalTitle(currentTask.title);
    setLocalDescription(currentTask.description);
    setLocalPriority(currentTask.priority);
    setLocalStatus(currentTask.status);
    setEdit(false);
  };



  return (
    <>
    {isError ? (
      <div><h4>Something went wrong. Please try again</h4></div>
    ) :
    (<form className={`${s.detail} border`} onSubmit={(e)=>saveHandler(e)}>
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
            onChange={(val) => setLocalPriority(val as Priority)}
            disable={!edit}
          />
        </div>
        <div>
          <DropDownApp
            label="Status"
            isPriotity={false}
            value={localStatus}
            onChange={(val) => setLocalStatus(val as Status)}
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
    </form>)
    }
    </> 
  );
};

export default TaskDetail;
