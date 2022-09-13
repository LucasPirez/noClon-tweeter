import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useUSer from "../../../hooks/useUser";
import { updateChat, getChatMessage } from "../../../firebase/clientChat";
import Back from "../../../components/Back";
import useMessageNotification from "../../../hooks/useMessageNotification";
import SvgComponent from "../../../components/Icons/Send";

const CHAT_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function Conversation() {
  const messagesEndRef = useRef(null);
  const [more, setMore] = useState(7);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [chats, setChats] = useState(null);
  const user = useUSer();
  const router = useRouter();
  const { setMessageNoLeido } = useMessageNotification();

  const ruta = router.query.id;
  const name = router.query.name;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = getChatMessage(ruta, (newChat) => {
        if (newChat) {
          if (newChat.usuarios.includes(user.uid) === false) {
            router.replace("/home");
          } else {
            setChats(newChat);
            setMessageNoLeido(true);

            scrollToBottom();
          }
        } else {
          router.back();
        }
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [user]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);

    value.length !== 0 && setDisabled(false);
    value.length === 0 && setDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(CHAT_STATES.LOADING);
    updateChat(ruta, {
      messages: {
        messages: message,
        usuario1: user.uid,
        semiId: (Math.random() * 1000000).toFixed(0),
      },
    }).catch(() => {
      setDisabled(CHAT_STATES.ERROR);
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <>
      <section>
        {disabled === -1 && (
          <div className="error_send">
            <h4>Error for send message</h4>
          </div>
        )}

        {user && (
          <Back title="Back" subTitle={name} user={user.uid} doc={ruta} />
        )}
        {chats && chats.messages && chats.messages.length > 9 && (
          <button className="more" onClick={() => setMore(more + 10)}>
            more
          </button>
        )}
        <div className="container_map">
          {chats &&
            chats.messages &&
            chats.messages.map((u, i) => {
              if (i >= chats.messages.length - more) {
                return (
                  <div
                    key={Math.random()}
                    className={user.uid === u.usuario1 ? "right" : "left"}
                  >
                    <div className="content_message">
                      <p className="message">{u.messages}</p>
                    </div>
                  </div>
                );
              } else {
                return "";
              }
            })}
          <div className="ref_scroll" ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="Que esta pasando"
            value={message}
            autoFocus
            maxLength="250"
          ></textarea>

          <div>
            <button className="send" disabled={disabled}>
              <SvgComponent />
            </button>
          </div>
        </form>
      </section>
      <style jsx>
        {`
          section {
            position: relative;
            margin: auto;
            max-width: 650px;
            width: auto;
            min-height: 100vh;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: rgba(11, 202, 221, 0.5) 0px 2px 8px 0px;
          }
          form {
            position: fixed;
            background: #fff;
            max-width: 650px;
            bottom: 6px;
            z-index: 9;
            display: flex;
            width: 100%;
            height: 10vh;
            background: transparent;
            align-items: center;
            justify-content: space-around;
            padding-bottom: 3px;
          }
          textarea {
            width: 90vw;
            height: 100%;
            padding: 10px;
            resize: none;
          }
          textarea:focus {
            outline: none;
            border: 2px solid #09f;
            box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
          }

          .more {
            border: none;
            background: transparent;
            border-radius: 999px;
            transition: all 0.3s;
            padding: 4px;
            cursor: pointer;
          }
          .more:hover {
            background: #eee;
          }
          .container_map {
            padding-bottom: 11vh;
          }
          .left {
            width: 90%;
            display: flex;

            justify-content: flex-start;
          }
          .left > .content_message {
            background: rgba(0, 153, 255, 0.5);
          }
          .right > .content_message {
            background: rgba(22, 204, 187, 0.5);
          }
          .error_send {
            position: fixed;
            top: 50%;
            left: 0;
            width: 100%;
            background: #eee;
          }

          .error_send > h4 {
            text-align: center;
          }
          .right {
            width: 99%;

            display: flex;
            justify-content: flex-end;
            text-align: left;
          }
          .content_message {
            max-width: 50%;
            width: auto;
            background: #eee;
            border-radius: 40px;
            padding: 5px;
            display: flex;
            display: inline-block;
            margin: 0.6rem;
          }
          .message {
            margin: 0px 15px 0 15px;
            word-wrap: break-word;
          }
          .send {
            height: 9vh;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
          }
          .send:disabled {
            pointer-events: none;
          }

          .send:hover {
            background: radial-gradient(
              rgb(0, 153, 255, 0.5) 10%,
              transparent 23%
            );
            background-size: 250px 180px;
            background-position: center;
          }

          .ref_scroll {
            padding-bottom: 2vh;
          }
          @media (max-width: 500px) {
            textarea:focus {
              height: 4rem;
            }
            .content_message {
              max-width: 75%;
            }
          }
        `}
      </style>
    </>
  );
}

/* 
          @media (prefers-color-scheme: dark) {
            .left > .content_message {
              background: black;
            }
            .right > .content_message {
              background: green;
            } */
// }
