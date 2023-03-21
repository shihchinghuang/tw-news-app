import Toolbar from "../components/toolbar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import styles from "../styles/About.module.css";
export default function About() {
  const [isCopied, setIsCopied] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText("sunnyhuang.sc@gmail.com");
    } else {
      return document.execCommand("copy", true, "sunnyhuang.sc@gmail.com");
    }
  }
  const handleCopyClick = () => {
    copyTextToClipboard()
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmitForm = async (value) => {
    let config = {
      method: "post",
      url: "http://localhost:3000/api/contact",
      headers: { "Content-type": "application/json" },
      data: value,
    };
    try {
      const res = await axios(config);
      if (res.status === 200) {
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Toolbar></Toolbar>
      <div className={styles.container}>
        <p>Hi there - </p>
        <br />
        <p>
          Would love to connect through{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/shihching-huang/"
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <span onClick={handleCopyClick}>
            {isCopied ? "Copied" : "Click here to copy my email"}
          </span>
          !
          <br />
          <br />
          Any feedback is appreciated!
        </p>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit(onSubmitForm)} method="post">
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
            <input
              {...register("email", {
                required: false,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "The email address is invalid",
                },
              })}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span id={styles.emailErrMsg}>{message}</span>
              )}
            />
            <textarea
              {...register("msg", {
                required: "Message is required",
              })}
              type="text"
              id="msg"
              placeholder="Leave a message"
              name="msg"
              rows="8"
            />
            <ErrorMessage
              errors={errors}
              name="msg"
              render={({ message }) => <span>{message}</span>}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
