import React from "react";

import classes from "./Input.module.css";

const Input = ({
  isSignIn,
  inputName,
  labelText,
  inputType,
  placeholder,
  inputChangeHandler,
  value,
  minDate,
}) => {
  const passwordText = isSignIn && (
    <span className={`form-text col-auto ${classes.PasswordSpan}`}>
      Must be at least 6 characters containing letters, numbers and no spaces
    </span>
  );

  let input = (
    <div className={`${classes.InputGroup}`}>
      <div className={`${classes.LabelGroup}`}>
        <label
          htmlFor={inputName}
          className={`form-label col-auto ${classes.Label}`}
        >
          {labelText}
        </label>
        {passwordText}
      </div>
      {
        <input
          type={inputType}
          name={inputName}
          className={`form-control ${classes.Input}`}
          placeholder={placeholder}
          onChange={(e) => inputChangeHandler(e)}
          min={minDate}
          value={value}
        />
      }
    </div>
  );

  if (inputType === "textarea") {
    input = (
      <div className="mb-3">
        <label
          htmlFor={inputName}
          className={`form-label col-auto ${classes.Label}`}
        >
          {labelText}
        </label>
        <textarea
          name={inputName}
          className="form-control"
          rows="5"
          placeholder={placeholder}
          maxLength={100}
          style={{ resize: "none" }}
          onChange={(e) => inputChangeHandler(e)}
          value={value}
        />
      </div>
    );
  }

  return input;
};

export default Input;
