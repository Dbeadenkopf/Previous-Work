import React, {useEffect} from 'react';

import styles from './Modal.module.scss';

export interface ModalProps {
  close: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({close, title, children}) => {
  useEffect(() => {
    const closeKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.body.addEventListener('keydown', closeKeyDown);

    return () => {
      document.body.removeEventListener('keydown', closeKeyDown);
    };
  }, [close]);

  return (
    <div className={styles.overlayContainer} onClick={close}>
      <dialog open className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header>
          {!!title && <h2 className={styles.modalTitle}>{title}</h2>}
          <button onClick={close} className={styles.closeBtn}></button>
        </header>
        <div>{children}</div>
      </dialog>
    </div>
  );
};

export default Modal;
