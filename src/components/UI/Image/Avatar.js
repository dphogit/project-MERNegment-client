import React from "react";

import Image from "./Image";
import classes from "./Avatar.module.css";

const Avatar = ({ imageUrl, avatarStyles }) => {
  return (
    <div className={classes.Avatar} style={avatarStyles}>
      <Image imageUrl={imageUrl} />
    </div>
  );
};

export default Avatar;
