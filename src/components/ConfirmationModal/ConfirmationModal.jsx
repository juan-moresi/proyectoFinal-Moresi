import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-confirm-btn">Sí</button>
          <button onClick={onCancel} className="modal-cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;