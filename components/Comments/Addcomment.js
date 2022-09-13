import { useState } from "react";
import { addComment } from "../../firebase/client";
import useUSer from "../../hooks/useUser";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function AddComment({ tweetId }) {
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [message, setMessage] = useState("");
  const user = useUSer();

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addComment(tweetId, {
      avatar: user.avatar,
      content: message,
      userComment: user.username,
      useID: user.uid,
    })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleChange = (event) => {
    setStatus(COMPOSE_STATES.USER_NOT_KNOWN);
    setMessage(event.target.value);
  };

  const isMessageSending = !message.length || status === COMPOSE_STATES.LOADING;
  return (
    <>
      <h5>Add Comment</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Deja tu Comentario"
          onChange={handleChange}
          value={message}
          maxLength="250"
          autoFocus
        ></textarea>
        <button type="submit" disabled={isMessageSending}>
          Comment
        </button>
      </form>

      <style jsx>
        {`
          h5 {
            text-align: center;
            animation: opacity 0.6s linear;
          }
          form {
            width: 100%;
            heigth: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            animation: opacity 0.6s linear;
          }
          textarea {
            margin: auto;
            width: 95%;
            max-width: 650px;
            padding: 0.6rem;
          }
          button {
            background: #222;
            color: #eee;
            width: 150px;
            font-size: 1.2rem;
            border-radius: 999px;
            background: linear-gradient(top, #222, #555);
            padding: 0.3rem 0.8rem;
            font-weight: 400;
            margin: 1rem;
            margin-bottom: 0.3rem;
            cursor: pointer;
            transition: all 0.4s;
          }

          button:hover {
            color: #222;
            background: #fff;
            box-shadow: 0px 2px 5px #000;
          }
          button[disabled] {
            pointer-events: none;
            background: #555;
          }

          @keyframes opacity {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
