import { useState, useEffect } from "react";
import NavBar from "../../../components/Nav";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import { getTweet, modifiedMessage } from "../../../firebase/client";
import { useRouter } from "next/router";
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function useModified() {
  const router = useRouter();
  const user = useUser();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const { id } = router.query;

  useEffect(() => {
    if (user) {
      getTweet(id)
        .then((data) => data.data())
        .then((data) => {
          setMessage(data);
        });
    }
  }, [user]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    modifiedMessage({
      content: message,
      identificador: id,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  console.log(message);

  const isMessageSending = !message.length || status === COMPOSE_STATES.LOADING;
  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          placeholder="Que esta pasando"
          value={message.content}
        ></textarea>

        <div>
          <Button disabled={isMessageSending}>Submit</Button>
        </div>
      </form>
      <style jsx>
        {`
          textarea {
            width: 90%;
            height: 150px;
            margin: 1rem;
            font-size: 21px;
            resize: none;
            outline: 0;
            border-bottom: 1px solid red;
          }
          section {
            position: relative;
          }
          img {
            width: 200px;
            height: auto;
            border-radius: 10px;
          }
          button {
            padding: 0.3rem 0.5rem;
            background: #003;
            border-radius: 999px;
            border: 0;
            color: #fff;
            position: absolute;
            top: 10px;
            left: 170px;
            transition: all 0.3s;
            opacity: 0.8;
          }

          button:hover {
            background: #eee;
            color: #003;
          }
        `}
      </style>
    </>
  );
}
