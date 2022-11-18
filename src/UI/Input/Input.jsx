import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./input.scss";

const Input = ({ text, ...props }) => {
  return <>{text ? <TextareaAutosize {...props} /> : <input {...props} />}</>;
};

export default Input;
