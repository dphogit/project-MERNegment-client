import React from "react";

const Button = ({
  btnType,
  disabled,
  className,
  clickEvent,
  children,
  modalIdTarget,
  paginatorAction,
}) => {
  let button;

  switch (btnType) {
    case "submit":
      return (button = (
        <button type="submit" disabled={disabled} className={className}>
          {children}
        </button>
      ));
    case "toggler":
      return (button = (
        <button
          className="navbar-toggler"
          type="button"
          style={{ color: "white" }}
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      ));
    case "toggle-modal":
      return (button = (
        <button
          type="button"
          className={className}
          data-bs-toggle="modal"
          // data-bs-target="#staticBackdrop"
          data-bs-target={`#${modalIdTarget}`}
          onClick={() => clickEvent()}
        >
          {children}
        </button>
      ));
    case "dismiss-modal":
      return (button = (
        <button
          type="button"
          className={className}
          data-bs-dismiss="modal"
          onClick={() => clickEvent()}
          id="closeModalButton"
        >
          {children}
        </button>
      ));
    case "options":
      return (button = (
        <button
          className={`dropdown-toggle ${className}`}
          type="button"
          data-bs-toggle="dropdown"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
      ));
    case "paginator":
      return (button = (
        <button
          type="button"
          className={className}
          onClick={() => clickEvent(paginatorAction)}
        >
          {children}
        </button>
      ));
    default:
      return (button = (
        <button
          type="button"
          className={className}
          onClick={() => clickEvent()}
        >
          {children}
        </button>
      ));
  }
};

export default Button;
