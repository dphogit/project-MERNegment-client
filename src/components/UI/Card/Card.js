import React from "react";

import classes from "./Card.module.css";

const Card = ({ styles, children }) => {
  return (
    <div className={classes.Card} style={styles}>
      {children}
    </div>
  );
};

export default Card;
