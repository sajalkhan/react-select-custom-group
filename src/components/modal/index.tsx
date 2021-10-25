import React, { useState, useEffect } from 'react';
import './index.scss';

type modal = {
  message?: string;
  open: boolean;
};

const Modal = ({ message, open }: modal) => {
  const [openModal, setOpenModal] = useState<boolean | undefined>(false);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return openModal ? (
    <div className="modal">
      <div className="modal__body">
        <p>{message}</p>
        <div className="modal__button">
          <button className="modal__button__cancle" onClick={() => setOpenModal(false)}>
            Cancel
          </button>
          <button className="modal__button__ok" onClick={() => console.log('click')}>
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
