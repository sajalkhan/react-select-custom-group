import React from 'react';
import './index.scss';

type modal = {
  message?: string;
  openModal: (message: string, open: boolean) => void;
};

const Modal = ({ message, openModal }: modal) => {
  return (
    <div className="modal">
      <div className="modal__body">
        <p>{message}</p>
        <div className="modal__button">
          <button className="modal__button__cancle" onClick={() => openModal('close', false)}>
            Cancel
          </button>
          <button className="modal__button__ok" onClick={() => openModal('close', false)}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
