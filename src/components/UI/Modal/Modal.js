import React from "react";

import Button from "../Button/Button";
import classes from "./Modal.module.css";

// TODO Create user feedback modals when all routes are completed e.g. loading => when user successfully does something && closes the modal

const Modal = ({
  title,
  children,
  modalAction,
  onCloseModal,
  cancelText,
  actionText,
  idTarget,
}) => {
  return (
    <div
      className="modal fade"
      // id="staticBackdrop"
      id={idTarget}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${classes.Content}`}>
          <div className="modal-header">
            <h5
              className={`modal-title ${classes.Title}`}
              id="staticBackdropLabel"
            >
              {title}
            </h5>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button
              btnType="dismiss-modal"
              className="btn btn-danger"
              clickEvent={onCloseModal}
            >
              {cancelText}
            </Button>
            <Button
              btnType="button"
              className="btn btn-primary"
              clickEvent={modalAction}
            >
              {actionText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
