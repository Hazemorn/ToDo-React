import React from "react";
import s from "./Card.module.scss";
import type { Priority, Status } from "../../store/types/types";
import { useNavigate } from "react-router";
import useTaskStore from "../../store/store";

import trashcanImg from "../../assets/icons/trash-can.svg";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../store/constans";
import { useDeleteTask } from "../../services/tasks/deleteTask";

interface CardProps {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
}

const Card: React.FC<CardProps> = React.memo((props) => {

  const selectTask = useTaskStore((state) => state.selectTask);
  const navigate = useNavigate();
  const deleteTaskMutation = useDeleteTask();
  
  const onClickInfo = () => {
    selectTask(props);
    navigate(`/details/${props.id}`); 
  };
  const onClickDelete = () => {
    deleteTaskMutation.mutate(props.id)
  }

  const selectedStatus = STATUS_OPTIONS.find((s) => s.value === props.status);

  return (
    <div className={`${s.card} border`}>
      <div className={s.card__wrapper}>
        <h3>{props.title}</h3>
        <div className={s.card__condition}>
          <p>{selectedStatus.label}</p>
          <p style={{ color: PRIORITY_OPTIONS.find(option => option.value === props.priority)?.color || 'var(--title)'}}>{props.priority}</p>
        </div>
        <div className={s.card__info}>
          <h4 className="pointer" onClick={onClickInfo}>More info</h4>
          <div className={s.card__delete}>
            <img
              className="pointer"
              src={trashcanImg}
              alt="delete"
              loading="lazy"
              style={{ width: "25px" }}
              onClick={onClickDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;
