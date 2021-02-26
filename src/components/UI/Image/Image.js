import React from "react";

const styles = {
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "50%",
};

const Image = ({ imageUrl }) => {
  return <img src={imageUrl} alt="profile" style={styles} />;
};

export default Image;
