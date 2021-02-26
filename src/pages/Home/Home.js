import React, { useState, useEffect } from "react";

import Navigation from "../../components/UI/Navigation/Navigation";
import classes from "./Home.module.css";

const Home = ({
  logoutHandler,
  token,
  userId,
  activePath,
  setActivePath,
  setUser,
  user,
}) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // TODO outsource the getUser into Redux
    const getUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.status === 404) {
          throw new Error(data.message);
        }

        const user = data.user;
        setUser(user);
        if (user.username) {
          setUsername(user.username);
        }
      } catch (error) {
        throw new Error("Failed to Get User");
      }
    };
    getUser();
    setActivePath("home");
  }, [token, userId, setActivePath, setUser]);

  const header = username
    ? `Welcome back ${username}, let's get to work...`
    : `Welcome! You should add a username by editing your profile`;

  return (
    <div className={classes.Home}>
      {user && (
        <Navigation
          logoutHandler={logoutHandler}
          activePath={activePath}
          profilePictureUrl={user.profilePictureUrl}
        />
      )}
      <h1 className={classes.Header}>{header}</h1>
      <div className={classes.Content}>Content Placeholder</div>
    </div>
  );
};

export default Home;
