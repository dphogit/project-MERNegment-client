import React from "react";

import classes from "./Graphic.module.css";
import image from "../../../assets/Graphic.jpg";

const Graphic = () => {
  return (
    <div className={classes.GraphicWrapper}>
      <img className={classes.Image} src={image} alt="Background" />
      <div className={classes.Text}>
        <h3 className={classes.TextHeading}>Meet Your Goals</h3>
        <h3 className={classes.TextHeading}>Acheive Better Results</h3>
        <br></br>
        <p>
          Make project management and working in a team a seamless experience
          with the tools we provide
        </p>
      </div>
    </div>
  );
};

export default Graphic;
