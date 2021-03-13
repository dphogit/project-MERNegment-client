import React, { Fragment, useState } from "react";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classes from "./AuthForm.module.css";

// NOTE: profilePicture is an object of the file
const initialAuthForm = {
  email: "",
  password: "",
  profilePicture: null,
};

// TODO Make the Authentication Page responsive
const AuthForm = ({ setError, setIsAuth, setToken, setAutoLogout }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState(initialAuthForm);
  const [invalidMessage, setInvalidMessage] = useState(null);
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);

  const authModeHandler = () => {
    document.getElementsByTagName("FORM")[0].reset();
    setIsSignIn((isSignIn) => !isSignIn);
    setFormData(initialAuthForm);
    setInvalidMessage(null);
    setSignUpSuccessful(false);
  };

  const inputChangeHandler = (e) => {
    const inputName = e.target.name;
    let updatedForm = { ...formData };
    if (inputName === "profilePicture") {
      // console.log(e.target.files[0]);
      updatedForm[inputName] = e.target.files[0];
    } else {
      updatedForm[inputName] = e.target.value;
    }
    // updatedForm[inputName] = e.target.value;
    setFormData(updatedForm);
  };

  const signInHandler = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // User errors (validiation) are dealt with at back end and are sent as JSON
      const data = await response.json();

      if (response.status >= 400) {
        validationMessageHandler(data.message);
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      setToken(data.token);
      setIsAuth(true);

      // Backend token expires in 3 hours of creation
      const remainingMilliseconds = 3 * 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

      localStorage.setItem("expiryDate", expiryDate);
      setAutoLogout(remainingMilliseconds);
      console.log("Successfully Logged In", data);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpHandler = async (postData) => {
    const formData = new FormData();
    formData.append("email", postData.email);
    formData.append("password", postData.password);
    formData.append("profilePicture", postData.profilePicture);

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        body: formData,
      });

      // User errors (validiation) are dealt with at back end and are sent as JSON
      const result = await response.json();

      if (response.status >= 400) {
        validationMessageHandler(result.message);
        throw new Error(result.message);
      }

      authModeHandler();
      setSignUpSuccessful(true);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    if (isSignIn) {
      console.log("Signing In...");
      signInHandler(formData);
    } else {
      console.log("Signing Up...");
      signUpHandler(formData);
    }
  };

  const validationMessageHandler = (message) => {
    // Purely for UI only, validation of data is done on backend
    setInvalidMessage(message);
  };

  const footerText = isSignIn ? (
    <p className={classes.FooterText}>
      Don't Have an Account?{" "}
      <span className={classes.Span} onClick={() => authModeHandler()}>
        Sign Up
      </span>
    </p>
  ) : (
    <p className={classes.FooterText}>
      Already Have an Account?{" "}
      <span className={classes.Span} onClick={() => authModeHandler()}>
        Sign In
      </span>
    </p>
  );

  return (
    <Fragment>
      <div className={classes.AuthFormWrapper}>
        <div className={classes.AuthForm}>
          <h2 className={classes.Title}>{isSignIn ? "Sign In" : "Sign Up"}</h2>
          {invalidMessage && (
            <div className={classes.Invalid}>{invalidMessage}</div>
          )}
          {signUpSuccessful && (
            <div className={classes.Success}>
              Sign up successful, login in with your new account
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e, formData)}>
            <Input
              inputName="email"
              inputType="email"
              labelText="Email *"
              placeholder="youremail@example.com"
              inputChangeHandler={inputChangeHandler}
            />
            <Input
              inputName="password"
              inputType="password"
              labelText="Password *"
              placeholder="Enter Password"
              isSignIn={!isSignIn}
              inputChangeHandler={inputChangeHandler}
            />
            {!isSignIn ? (
              <Input
                inputName="profilePicture"
                inputType="file"
                labelText="Profile Picture *"
                placeholder="myprofilepicture.png"
                inputChangeHandler={inputChangeHandler}
              />
            ) : null}
            <div className={classes.Center}>
              <Button btnType="submit" className={`btn ${classes.SubmitBtn}`}>
                {isSignIn ? "Login" : "Create Account"}
              </Button>
            </div>
          </form>
          {footerText}
        </div>
      </div>
    </Fragment>
  );
};

export default AuthForm;
