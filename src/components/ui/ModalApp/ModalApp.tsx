import s from "./ModalApp.module.scss";

type ModalType = {
  isModalOpen: boolean | null;
  children: any;
  width?: string;
};

const ModalApp = ({ isModalOpen, children, width='400px'}: ModalType) => {
  return (
    <>
      {isModalOpen ? (
        <div className={s.overlaw}>
        <div className={s.modal} style={{width: width}}>
          <div className={s.modal__wrapper}>{children}</div>]
        </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalApp;
