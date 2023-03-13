import { useState, useEffect, lazy, Suspense } from "react";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import { addMessage, uploadImage } from "../../../firebase/client";
import { useRouter } from "next/router";
import NavBar from "../../../components/Nav";
import VoiceListe from "../../../components/Comments/VoiceListen";

const Emoticon = lazy(() => import("../../../components/Emoticons"));

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [viewEmoticons, setViewEmoticons] = useState(false);

  const user = useUser();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = (e) => {
        console.log(e);
      };
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }

    if (typeof window !== "undefined") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addMessage({
      avatar: user.avatar,
      content: message,
      img: imgURL,
      userId: user.uid,
      username: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    let file;
    if (e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else {
      file = e.target.files[0];
    }

    const task = uploadImage(file);

    setTask(task);
  };

  const isMessageSending = !message.length || status === COMPOSE_STATES.LOADING;
  return (
    <>
      <NavBar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="What's happening?"
            value={message}
          ></textarea>

          {!viewEmoticons ? (
            <button onClick={() => setViewEmoticons(true)} className="emoticon">
              😃
            </button>
          ) : (
            <div className="container_emoticon">
              <button onClick={() => setViewEmoticons(false)}>X</button>
              <Suspense fallback={<p></p>}>
                <Emoticon setMessage={setMessage} />
              </Suspense>
            </div>
          )}

          <div className="container_send">
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>X</button>
                <img src={imgURL} />
              </section>
            )}

            <div className="container_submit">
              <input
                type="file"
                aria-label="dale"
                onChange={(e) => handleDrop(e)}
              />
              {disabled && <VoiceListe setMessage={setMessage} />}

              <Button disabled={isMessageSending}>Submit</Button>
            </div>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          form {
            margin-top: 3rem;
          }
          textarea {
            width: 90%;
            height: 150px;
            margin: 1rem;
            font-size: 21px;
            resize: none;
            outline: 0;
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid rgba(171, 31, 22,0.3)"};
            padding: 1rem;
            border-radius: 4px;
            margin: center;
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
          input {
            position: relative;
            display: inline-block;
            height: 32px;
            width: 200px;
            transform: translate(-10px, -7px);
            cursor: pointer;
          }

          input::before {
            background-color: #222;

            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 9px;
            content: "Seleccionar imagen"; /* testo por defecto */
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
          .container {
            position: relative;

            height: auto;
          }

          .container_send {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          .remove-img {
            width: 350px;
          }
          .emoticon {
            position: absolute;
            left: 85%;
            top: 20px;
            width: 50px;
          }
          .container_emoticon {
            position: absolute;
            right: 0;
            top: -20px;
            width: auto;
            height: auto;
            z-index: 99;
          }
          .container_emoticon > button {
            position: absolute;
            left: 10px;
            top: -20px;
            width: 90%;
            height: auto;

            z-index: 9;
          }
          .container_submit {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-right: 3rem;
          }
        `}
      </style>
    </>
  );
}
