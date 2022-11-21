import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Input from "../../UI/Input/Input";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import dayjs from "dayjs";
import Loader from "../Loader/Loader";
import "./todo-form.scss";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [filePreview, setFilePreview] = useState("");
  const [isDesabled, setIsDesabled] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (title !== "" && body !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        body,
        date,
        filePreview,
        isComplited: false,
      });
      setTitle("");
      setBody("");
      setFilePreview("");
      setDate("");
    }
  };

  const uploadFiles = (event) => {
    setIsDesabled(true);
    const file = event.target.files[0];

    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (url) => setFilePreview(url),
          setIsDesabled(false)
        );
      }
    );
  };

  return (
    <form className="todo-form " onSubmit={submitHandler}>
      <Input
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Заголовок"
        value={title}
        className="input input_form"
      />
      <Input
        type="text"
        onChange={(event) => setBody(event.target.value)}
        placeholder="Задача"
        value={body}
        className="input input_form"
      />
      <Input
        type="date"
        onChange={(event) =>
          setDate(dayjs(event.target.value).format("DD.MM.YYYY"))
        }
        placeholder="Дата завершения"
        className="input input_form"
      />

      <label className="input__label">
        Загрузить файл
        <Input
          onChange={uploadFiles}
          type="file"
          placeholder="Документ"
          className="input input_form input_file"
        />
      </label>
      <Loader className="loader loader_file">
        Загружено {progress} %{" "}
        <span
          style={{
            background: "#fffdfd",
            display: "inline-block",
            marginLeft: "10px",
            height: "20px",
            width: progress + "px",
          }}
        ></span>
      </Loader>
      <Button disabled={isDesabled} className="button button_form">
        Добавить
      </Button>
    </form>
  );
};

export default TodoForm;
