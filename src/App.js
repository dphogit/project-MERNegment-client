// TODO Commit changes
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
// import Modal from "./components/UI/Modal/Modal";
import EditProfile from "./components/EditProfile/EditProfile";
// import ErrorHandler from "./components/UI/ErrorHandler/ErrorHandler";
import "./App.css";

// TODO Introduce Redux for asynchronous calls and general state management
// * isAuth, login, logout, signup, signin actions ?

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null); // ? May not need this when user is outsourced into redux
  const [error, setError] = useState(null);
  const [activePath, setActivePath] = useState(null);

  const setAutoLogout = useCallback((milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userIdToSet = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
    setIsAuth(true);
    setToken(token);
    setUserId(userIdToSet);
  }, [setAutoLogout, isAuth]);

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const routes = isAuth ? (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return (
            <Home
              setUser={setUser}
              token={token}
              userId={userId}
              logoutHandler={logoutHandler}
              error={error}
              setError={setError}
              activePath={activePath}
              setActivePath={setActivePath}
              user={user}
            />
          );
        }}
      />
      {/* <Route 
        exact
        path="/projects"
        render={() => (
          <Projects />
        )}
      /> */}
      {/* <Route 
        exact
        path="/tasks"
        render={() => (
          <TaskManagement />
        )}
      /> */}
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Auth
            setIsAuth={setIsAuth}
            setToken={setToken}
            setAutoLogout={setAutoLogout}
            setError={setError}
          />
        )}
      />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Fragment>
      {/* <ErrorHandler error={error} setError={setError} /> */}
      {user && <EditProfile user={user} token={token} />}
      {routes}
    </Fragment>
  );
}

export default App;
