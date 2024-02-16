import React from 'react';

import Button from '@components/Button';
import Modal, {ModalProps} from '@components/Modal';

import styles from './ConfirmationModal.module.scss';

interface IProps {
  handleModalConfirm: () => void;
  action: string;
}

const ConfirmationModal = ({
  close,
  title = 'Confirmation',
  handleModalConfirm,
  action,
}: IProps & ModalProps) => (
  <Modal title={title} close={close}>
    <hr />
    <p>Are you sure you want to {action}?</p>
    <div className={styles.modalButtonContainer}>
      <Button
        onClick={() => {
          handleModalConfirm();
          close();
        }}>
        Confirm
      </Button>
      <Button color="primary" onClick={close}>
        Cancel
      </Button>
    </div>
  </Modal>
);

export default ConfirmationModal;
