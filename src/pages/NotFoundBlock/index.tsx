import s from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={s.root}>
      <div className={s.text}>
        <h2>
          Opps...
          <br />
          The page is not found
        </h2>
        <h4>This page is not created yet. Please try again</h4>
      </div>
    </div>
  );
};

export default NotFoundBlock;
