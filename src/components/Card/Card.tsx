import React from "react";
import type { Priority, Status } from "../../store/types/types";
import s from "./Card.module.scss";

interface CardProps {
  id?: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  createdAt?: string;
}

const Card: React.FC<CardProps> = React.memo(({ ...args }) => {
  const onClickInfo = () => {};
  return (
    <div className={`${s.card} border`}>
      <div className={s.card__wrapper}>
        <h1>{args.title}</h1>
          <div className={s.card__condition}>
            <p>{args.status}</p>
            <p>{args.priority}</p>
          </div>
          <div className={s.card__info} onClick={onClickInfo}>More info</div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;
