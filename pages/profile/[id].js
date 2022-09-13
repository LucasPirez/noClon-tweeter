import useUSer from "../../hooks/useUser";
import NavBar from "../../components/Nav";
import { useRouter } from "next/router";

import { useState } from "react";
import { AddChats } from "../../firebase/clientChat";
import Follow from "../../components/Follow";
import Selector from "../../components/Acount/Selector";
import AccountTweets from "../../components/Acount/Tweets";
import Likes from "../../components/Acount/Likes";

export default function Profile() {
  const [change, setChange] = useState(true);

  const user = useUSer();
  const router = useRouter();
  console.log(router.query);
  const { id, username } = router.query;

  const handleMessage = (e) => {
    e.preventDefault();

    AddChats({
      usuarios: [`${user.uid}`, id],
      usernames: [user.username, username],
    }).then((data) => {
      router.push(`/chat/redactar/?id=${data}&user=${id}`);
    });
  };

  return (
    <>
      {user && (
        <>
          <NavBar />
          <section>
            <h2>Profile Tweets</h2>
            <h3>{username}</h3>

            {user && (
              <Follow
                uid={user.uid}
                useProfile={id}
                handleMessage={handleMessage}
              />
            )}

            <Selector
              onClick1={() => setChange(true)}
              onClick2={() => setChange(false)}
              estado={change}
              name1={"Tweets"}
              name2={"Likes"}
            />
            <div className="container_selector">
              {change ? (
                <AccountTweets userID={id} />
              ) : (
                <>
                  <Likes userID={id} />
                </>
              )}
            </div>
          </section>
          <style jsx>
            {`
              section {
                padding: 10px;
                background: #eee;
              }
        
              h2 {
                text-align: center;
              }
              h3 {
                text-align: center;
              }
              .perfil {
                display: flex;
              }
              span {
                margin: 0.5rem;
              }
              img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-right: 14px;
              }
              } button {
                width: 130px;
                padding: 0.3em;
                border-radius: 4px;
                background: #333;
                color: #eee;
                font-weight: 600;
                float: right;
                margin-right: 1rem;
              }

              button:hover {
                background: #eee;
                color: #333;
              }
              .container_buttons{
               width:100%;
               background:red;
              }
              .container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .container_selector {
                width: 100%;
                background: #fff;
              }

            `}
          </style>
        </>
      )}
    </>
  );
}
