import React from "react";
import type { Priority, Status } from "../../store/types/types";
import s from "./Card.module.scss";
import useTaskStore from "../../store/store";
import trashcanImg from "../../assets/icons/trash-can.svg";

interface CardProps {
  id?: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  createdAt?: string;
}

const Card: React.FC<CardProps> = React.memo(({ ...args }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const onClickInfo = () => {};
  return (
    <div className={`${s.card} border`}>
      <div className={s.card__wrapper}>
        <h3>{args.title}</h3>
        <div className={s.card__condition}>
          <p>{args.status}</p>
          <p>{args.priority}</p>
        </div>
        <div className={s.card__info} onClick={onClickInfo}>
          <h4 className="pointer">More info</h4>
          <div className={s.card__delete}>
            <img
              className="pointer"
              src={trashcanImg}
              alt="delete"
              loading="lazy"
              style={{ width: "25px" }}
              onClick={() => deleteTask(args.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;
