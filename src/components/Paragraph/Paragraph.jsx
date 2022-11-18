import React from "react";
import "./paragraph.scss";

const Paragraph = ({ title, children, ...props }) => {
  return (
    <>{title ? <h1 {...props}>{children}</h1> : <p {...props}>{children}</p>}</>
  );
};

export default Paragraph;
