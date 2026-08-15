import React from "react";
import s from "./ButtonApp.module.scss";

interface ButtonProps {
  title: string;
  max_width?: string;
  disable?: boolean
  onClick?: () => void;
}

const ButtonApp = React.memo(({
  title,
  max_width = "280px",
  disable,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={s.button__template}
      style={{
        maxWidth: max_width,
      }}
      disabled={disable}
    >
      {title}
    </button>
  );
});

export default ButtonApp;
