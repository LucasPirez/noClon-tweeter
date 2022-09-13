import { useEffect, useState } from "react";
import {
  deleteChat,
  getAllChats,
  messageRead,
} from "../../../firebase/clientChat";
import useUSer from "../../../hooks/useUser";
import Delete from "../../../components/Icons/Delete";
import { useRouter } from "next/dist/client/router";
import NavBar from "../../../components/Nav";
import useMessageNotification from "../../../hooks/useMessageNotification";

export default function Chat() {
  const [chats, setChats] = useState(null);
  const [chatDelete, setChatDelete] = useState(0);
  const user = useUSer();
  const router = useRouter();
  const { contentMessage } = useMessageNotification();

  useEffect(() => {
    if (user) {
      getAllChats(user.uid).then((data) => {
        let equal = 0;
        data.map((u) => {
          const query = router.query.user;

          if (u.usuarios.indexOf(query) !== -1) {
            equal++;
          }
          return () => "";
        });
        if (equal > 1) {
          deleteChat(router.query.id).then(() => {
            getAllChats(user.uid).then((newdata) => {
              setChats(newdata);
            });
          });
        }

        setChats(data);
      });
    }
  }, [user, chatDelete, contentMessage]);

  const nameChat = (data) => {
    if (data.usernames[0] !== user.username) {
      return data.usernames[0];
    } else {
      return data.usernames[1];
    }
  };

  const handleChat = (e, id, name) => {
    e.preventDefault();
    e.stopPropagation();
    messageRead(id, user.uid);
    router.push(`/chat/redactar/${id}?name=${nameChat(name)}`);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    deleteChat(id).then(() => {
      setChatDelete(delete +1);
    });
  };

  const lastMessage = (chat) => {
    let str = "";

    if (contentMessage) {
      contentMessage.forEach((u) => {
        if (chat.usuarios.includes(u.messageUser)) {
          str = u.lastMessage;
        }
      });
    }
    return str;
  };

  return (
    <>
      <section>
        <NavBar />
        <h2>Conversations</h2>
        <article>
          {chats &&
            (chats.length === 0 ? (
              <h5>You don&apos;t any conversation opened</h5>
            ) : (
              chats.map((data) => (
                <div
                  className="container_chats"
                  key={data.id}
                  onClick={(e) => handleChat(e, data.id, data)}
                >
                  <div>
                    <p className="name_chat">{nameChat(data)}</p>

                    {data.messages &&
                      data.messages[data.messages.length - 1].usuario1 !==
                        user.uid && (
                        <div className="container_last">
                          <p className="last_message">
                            <strong>last :</strong>
                            {lastMessage(data)}
                          </p>
                        </div>
                      )}
                  </div>

                  <button
                    title="Delete"
                    onClick={(e) => handleDelete(e, data.id)}
                  >
                    <Delete />
                  </button>
                </div>
              ))
            ))}
        </article>
      </section>
      <style jsx>
        {`
          section {
            height: 100vh;
          }
          h2 {
            text-align: center;
            color: #09d;
          }
          button {
            border: none;
            background: transparent;
          }
          h5 {
            text-align: center;
            margin: 2rem;
          }

          button:hover {
            transform: scale(1.1);
          }
          .container_chats {
            display: flex;
            justify-content: space-between;
            width: 80%;
            height: auto;
            border: 2px solid #09f;
            margin: 1rem;
            padding: 0.5rem;
            border-radius: 999px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            transition: all 0.4s;
            cursor: pointer;
            color: #333;
            font-weight: 600;
          }
          .name_chat {
            margin-left: 2rem;
            font-size: 1.2rem;
          }
          .container_chats:hover {
            background: #0099ff67;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px inset;
            color: #111;
            border: 2px solid #09a;
          }

          .container_last {
            width: auto;
            font-size: 0.8em;
            margin-top: -17px;
            margin-left: 33px;
            height: 30px;
            overflow: hidden;
          }
        `}
      </style>
    </>
  );
}
