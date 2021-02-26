import React from "react";

const Button = ({ btnType, disabled, className, clickEvent, children }) => {
  let button;
  // Convert to switch case;
  if (btnType === "submit") {
    button = (
      <button type="submit" disabled={disabled} className={className}>
        {children}
      </button>
    );
  } else if (btnType === "toggler") {
    button = (
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
    );
  } else if (btnType === "toggle-modal") {
    button = (
      <button
        type="button"
        className={className}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {children}
      </button>
    );
  } else if (btnType === "dismiss-modal") {
    button = (
      <button
        type="button"
        className={className}
        data-bs-dismiss="modal"
        onClick={() => clickEvent()}
      >
        {children}
      </button>
    );
  } else {
    button = (
      <button type="button" className={className} onClick={() => clickEvent()}>
        {children}
      </button>
    );
  }

  return button;
};

export default Button;
