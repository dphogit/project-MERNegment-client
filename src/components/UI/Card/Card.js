import React from "react";

const Card = ({ styles, children, className }) => {
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export default Card;
