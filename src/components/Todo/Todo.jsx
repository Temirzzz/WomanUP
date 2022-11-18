import React, { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import Image from "../../UI/Image/Image";
import Input from "../../UI/Input/Input";
import Paragraph from "../Paragraph/Paragraph";
import "./todo.scss";
import dayjs from "dayjs";

const Todo = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  const [newBody, setNewBody] = useState(todo.body);
  const dateToChange = dayjs().format("DD.MM.YYYY");
  const dateNow = Number(dateToChange.split(".").join(""));
  const dateTodo = Number(todo.date.split(".").join(""));

  const handleChange = (event) => {
    event.preventDefault();

    if (todo.isComplited === true) {
      setNewBody(todo.body);
    } else {
      todo.body = "";
      setNewBody(event.target.value);
    }
  };

  if (dateNow >= dateTodo) {
    todo.isComplited = true;
  }

  return (
    <div className="todo">
      <Paragraph className="paragraph paragraph_todo-title">
        {todo.title}
      </Paragraph>
      <div className="todo__content">
        <Input
          className="input input_todo"
          type="text"
          style={{ textDecoration: todo.isComplited && "line-through" }}
          value={todo.body === "" ? newBody : todo.body}
          onChange={handleChange}
        />
        <Paragraph className="paragraph paragraph_date">{todo.date}</Paragraph>
        {todo.filePreview !== "" ? (
          <Image
            src={todo.filePreview}
            alt={todo.filePreview}
            className="image image_todo"
          />
        ) : (
          ""
        )}
        <Button
          className="button button_todo"
          onClick={() => toggleComplete(todo)}
        >
          &#10004;
        </Button>
        <Button
          className="button button_todo"
          onClick={() => handleEdit(todo, newBody)}
        >
          &#9998;
        </Button>
        <Button
          className="button button_todo"
          onClick={() => handleDelete(todo.id)}
        >
          &#10008;
        </Button>
      </div>
    </div>
  );
};

export default Todo;
