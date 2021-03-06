import React from "react";
import { Link } from "react-router-dom";

import Button from "../../Button/Button";
import Avatar from "../../Image/Avatar";
import classes from "./NavigationItem.module.css";

const NavigationItem = ({
  name,
  link,
  dropdown,
  logoutHandler,
  className,
  activePath,
  profilePictureUrl,
}) => {
  const navLinkClassName = activePath
    ? `nav-link ${classes.NavigationItem} ${classes.Active}`
    : `nav-link ${classes.NavigationItem}`;

  let navItem = dropdown ? (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${classes.NavigationItem} ${className}`}
        href={link || "#"}
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {name}
      </a>
      <ul
        className={`dropdown-menu ${classes.DropdownMenu}`}
        aria-labelledby="navbarDropdown"
      >
        <li>
          <Button
            className={`dropdown-item ${classes.DropdownItem}`}
            // modalIdTarget="staticBackdrop"
            modalIdTarget="editProfile"
            btnType="toggle-modal"
            clickEvent={() => console.log("Editing Profile...")}
          >
            Edit Profile
          </Button>
        </li>
        <li>
          <Button
            clickEvent={logoutHandler}
            className={`dropdown-item ${classes.DropdownItem}`}
          >
            Logout
          </Button>
        </li>
      </ul>
    </li>
  ) : (
    <li className={`nav-item ${className}`}>
      <Link className={navLinkClassName} to={link || "#"}>
        {name}
      </Link>
    </li>
  );

  if (name === "Avatar") {
    const url = `http://localhost:8080/${profilePictureUrl}`;
    const avatarStyles = {
      height: "50px",
      width: "50px",
    };
    navItem = (
      <Avatar
        imageUrl={url}
        avatarStyles={avatarStyles}
        className={className}
      />
    );
  }

  return navItem;
};

export default NavigationItem;
