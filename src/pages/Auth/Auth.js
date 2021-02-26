import React from "react";

import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import Graphic from "../../components/Auth/Graphic/Graphic";
import Card from "../../components/UI/Card/Card";

import classes from "./Auth.module.css";

const Auth = ({ setIsAuth, setToken, setAutoLogout, setError }) => {
  const styles = {
    width: "1150px",
    height: "650px",
    display: "flex",
  };

  return (
    <div className={classes.Auth}>
      <Card styles={styles}>
        <Graphic />
        <AuthForm
          setError={setError}
          setIsAuth={setIsAuth}
          setToken={setToken}
          setAutoLogout={setAutoLogout}
        />
      </Card>
    </div>
  );
};

export default Auth;
