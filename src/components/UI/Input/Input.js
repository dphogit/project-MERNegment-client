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
}) => {
  const passwordText = isSignIn ? (
    <span className={`form-text col-auto ${classes.PasswordSpan}`}>
      Must be at least 6 characters containing letters, numbers and no spaces
    </span>
  ) : null;

  return (
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
          value={value}
        />
      }
    </div>
  );
};

export default Input;
