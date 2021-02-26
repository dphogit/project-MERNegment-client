/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import Toggler from "./Toggler/Toggler";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./Navigation.module.css";

const Navigation = ({ logoutHandler, activePath, profilePictureUrl }) => {
  return (
    <div>
      <nav className={`navbar navbar-expand-md navbar-dark ${classes.NavBar}`}>
        <div className="container-fluid" style={{ marginLeft: "2rem" }}>
          <a
            className="navbar-brand"
            href="#"
            style={{ fontSize: "28px", marginRight: "2rem" }}
          >
            Brand
          </a>
          <Toggler />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <NavigationItem
                name="Home"
                activePath={activePath === "home"}
                link="/"
              />
              <NavigationItem
                name="Projects"
                activePath={activePath === "projects"}
              />
              <NavigationItem
                name="Task Management"
                activePath={activePath === "tasks"}
              />
            </ul>
            <div className={classes.NavBarEnd}>
              <NavigationItem
                name="Profile"
                className={classes.Profile}
                dropdown
                logoutHandler={logoutHandler}
              />
              {/* TODO Change this to actual avatar */}
              <NavigationItem
                className={classes.Avatar}
                name="Avatar"
                profilePictureUrl={profilePictureUrl}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
