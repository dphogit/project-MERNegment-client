import React from "react";

import Image from "./Image";
import classes from "./Avatar.module.css";

const Avatar = ({ imageUrl, avatarStyles, className }) => {
  return (
    <div className={`classes.Avatar ${className}`} style={avatarStyles}>
      <Image imageUrl={imageUrl} />
    </div>
  );
};

export default Avatar;
