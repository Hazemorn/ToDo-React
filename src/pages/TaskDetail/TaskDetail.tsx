import s from "./TaskDetail.module.scss";
import { useNavigate } from "react-router";
import { useState } from "react"; //useEffect,
import ButtonApp from "../../components/ui/ButtonApp/ButtonApp";
import DropDownApp from "../../components/ui/DropDownApp/DropDownApp";

import editImg from "../../assets/icons/edit.svg";
import trashcanImg from "../../assets/icons/trash-can.svg";

import type { Priority, Status } from "../../store/types/types";
import { useDeleteTask, useUpdateTask } from "../../hooks/tasksMutations";
import { useTaskDetail } from "../../hooks/tasksQuery";
import { getErrorInput, getErrorText, useInput } from "../../hooks/customInput";

const TaskDetail = () => {
  const { data: currentTask, isError, isLoading } = useTaskDetail();
  if (isLoading) {
    return (
      <div className={s.loading}>
        <h4>Loading task details...</h4>
      </div>
    );
  }

  if (isError || !currentTask) {
    return (
      <div>
        <h4>Something went wrong. Please try again</h4>
      </div>
    );
  }

  return <TaskDetailForm currentTask={currentTask} />;
};

const TaskDetailForm = ({ currentTask }: { currentTask }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();
  const [localPriority, setLocalPriority] = useState<Priority>(currentTask.priority);
  const [localStatus, setLocalStatus] = useState<Status>(currentTask.status);

  const title = useInput(currentTask.title, { isEmpty: true });
  const description = useInput(currentTask.description || "", {
    isEmpty: true,
  });

  const errorInput = getErrorInput(title);
  const errorText = getErrorText(description);

  const onClickBack = () => navigate("/");

  const deleteHandler = () => {
    if (!currentTask?.id) return;

    deleteTaskMutation.mutate(currentTask.id, {
      onSuccess: () => navigate("/"),
    });
  };

  const editHandler = () => {
    setEdit(true);
  };

  const saveHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentTask?.id) return;
    const updatedFields = {
      title: title.value,
      description: description.value,
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
    title.onChange({ target: { value: currentTask.title } });
    description.onChange({ target: { value: currentTask.description || "" } });
    setLocalPriority(currentTask.priority);
    setLocalStatus(currentTask.status);
    setEdit(false);
  };

  return (
    <>
      <form className={`${s.detail} border`} onSubmit={(e) => saveHandler(e)}>
        <ButtonApp
          title="< Back"
          onClick={onClickBack}
          max_width="fit-content"
        />
        <div className={`${s.new_task__title} top-indent`}>
          <h2>
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
              readOnly={!edit}
            />
          </h2>
          {errorInput && <p style={{ color: "red" }}>{errorInput}</p>}
        </div>
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
        <div className={s.detail__description}>
          <textarea
            className={`$ border`}
            id="taskDetails"
            value={description.value}
            onChange={(e) => description.onChange(e)}
            onBlur={(e) => description.onBlur(e)}
            placeholder="Enter task details*"
            maxLength={300}
            rows={5}
            readOnly={!edit}
            required
          />
          {errorText && <p style={{ color: "red" }}>{errorText}</p>}
        </div>
        {!edit && (
          <div className={s.detail__buttons}>
            <div className={s.button} onClick={editHandler}>
              <h4>Edit</h4>
              <img src={editImg} alt="edit" loading="lazy" />
            </div>
            <div className={s.button} onClick={deleteHandler}>
              <h4>Delete</h4>
              <img src={trashcanImg} alt="delete" loading="lazy" />
            </div>
          </div>
        )}
        {edit && (
          <div className={s.detail__buttons}>
            <ButtonApp
              disable={!title.inputValid || !description.inputValid}
              title="Save"
              max_width="150px"
            />
            <ButtonApp
              title="Cancel"
              max_width="150px"
              onClick={cancelHandler}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default TaskDetail;
