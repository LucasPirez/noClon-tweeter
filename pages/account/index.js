import useUSer from "../../hooks/useUser";
import NavBar from "../../components/Nav";
import Button from "../../components/Button";
import { singOut } from "../../firebase/client";
import { useState } from "react";
import AccountTweets from "../../components/Acount/Tweets";
import Likes from "../../components/Acount/Likes";
import Selector from "../../components/Acount/Selector";
import CountFollow from "../../components/Follow/CountFollow";

export default function PageAccount() {
  const user = useUSer();
  const [change, setChange] = useState(true);
  const handleClose = () => {
    singOut();
  };

  return (
    <>
      {user && (
        <>
          <NavBar />
          <section>
            <h2>Page Account</h2>
            <div className="perfil">
              <img src={user.avatar} />
              <div className="container">
                <h3>{user.username}</h3>
                <CountFollow userUid={user.uid} />
                <span>{user.email}</span>
                <Button onClick={handleClose}>Sing Out</Button>
              </div>
            </div>

            <Selector
              onClick1={() => setChange(true)}
              onClick2={() => setChange(false)}
              estado={change}
              name1={"Tweets"}
              name2={"Likes"}
            />

            <div className="container_selector">
              {change ? (
                <AccountTweets userID={user.uid} />
              ) : (
                <>
                  <Likes userID={user.uid} />
                </>
              )}
            </div>
          </section>
          <style jsx>
            {`
              section {
                width: 100%;
                background: #f6f7f9;
                display: flex;
                flex-direction: column;
                aling-items: space-around;
                padding: 10px;
                padding-bottom: 5vh;
              }
              h2 {
                text-align: center;
                color: #09d;
              }
              .perfil {
                display: flex;
                justify-content: space-around;
                align-items: center;
              }
              span {
                margin: 0.5rem;
              }
              img {
                width: 180px;
                height: 180px;
                border-radius: 50%;
              }
              .container {
                display: flex;
                width: 250px;
                flex-direction: column;
                justify-content: space-between;
              }
              .container_selector {
                width: 100%;
                background: #fff;
              }
              @media (max-width: 500px) {
                h2 {
                  display: none;
                }
                h3 {
                  margin-top: 20px;
                }
                span {
                  margin: 0.3rem;
                  align-self: center;
                }
                button {
                  align-self: center;
                }
                img {
                  width: 160px;
                  height: 160px;
                  z-index: 999;
                }

                .perfil {
                  flex-direction: column;
                  margin: 2rem 0 4rem;
                }

                .perfil::before {
                  content: "";
                  top: 0;
                  z-index: 9;
                  width: 100%;
                  height: 10rem;

                  background: #00111b;
                  position: absolute;
                }

                .perfil::after {
                  content: "";
                  position: absolute;
                  top: 8rem;
                  width: 101%;
                  height: 4.4rem;
                  z-index: 99;
                  background: #f6f7f9;
                  border-radius: 999px;
                }

                .container {
                  width: 200px;
                }
                .container > button {
                  width: 100px;
                }
              }
            `}
          </style>
        </>
      )}
    </>
  );
}
