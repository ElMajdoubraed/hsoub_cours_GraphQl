import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  isDisabled?: boolean;
}

export default function SimpleModal({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText,
  isDisabled,
}: Props) {
  return (
    <div>
      <Modal show={true} onHide={onCancel} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm} disabled={isDisabled}>
            {confirmText}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
