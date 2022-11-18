import React from "react";
import "./loader.scss";

const Loader = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default Loader;
