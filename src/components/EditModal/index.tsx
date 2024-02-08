// EditModal.tsx
import React from "react";
import { Modal, Button } from "@mui/material";

import styles from "./EditModal.module.scss";
import Form from "../Form";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: any;
  onSubmit: (data: any) => void;
  id: string;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
  id,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Edit Row Modal</h2>
            <Button onClick={onClose}>X</Button>
          </div>

          <Form onSubmit={onSubmit} initialValues={initialValues} />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
