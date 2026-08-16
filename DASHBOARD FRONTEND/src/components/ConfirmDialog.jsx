import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ConfirmDialog = ({
  show,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="font-display d-flex align-items-center gap-2" style={{ fontSize: '1.15rem' }}>
          <i className={`bi ${isDanger ? 'bi-exclamation-octagon text-danger' : 'bi-question-circle text-info'}`}></i>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0 text-muted" style={{ fontSize: '0.92rem' }}>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-tensora-secondary" onClick={onCancel}>
          {cancelText}
        </button>
        <button
          className={isDanger ? 'btn btn-tensora-danger' : 'btn btn-tensora-primary'}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
