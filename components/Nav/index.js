import Create from "../../components/Icons/Create";
import Home from "../../components/Icons/Home";
import User from "../../components/Icons/User";
import Send from "../../components/Icons/Send";
import Link from "next/link";
import useMessageNotification from "../../hooks/useMessageNotification";
import { useRouter } from "next/router";

export default function NavBar() {
  const { messageNoLeido } = useMessageNotification();
  const router = useRouter();
  const ruta = router.asPath;

  return (
    <>
      <nav>
        <Link href="/home">
          <a className={ruta.includes("/home") ? "select" : ""}>
            <Home stroke="black" />
          </a>
        </Link>
        <div className="container_send">
          <Link href="/chat/redactar">
            <a className={ruta.includes("/chat") ? "select" : ""}>
              <Send stroke="black" />
            </a>
          </Link>
          {messageNoLeido && (
            <div className="message_unread" title="message unread"></div>
          )}
        </div>
        <Link href="/compose/tweet">
          <a className={ruta.includes("/compose") ? "select" : ""}>
            <Create stroke="black" />
          </a>
        </Link>
        <Link href="/account">
          <a className={ruta.includes("/account") ? "select" : ""}>
            <User stroke="black" />
          </a>
        </Link>
      </nav>
      <style jsx>
        {`
          nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-around;
            background: #f6f7f9;
            z-index: 9999;
          }
          a {
            padding: 0.3rem 2.7rem;
            border-radius: 999px;
            transition: background 0.3s;
          }
          a:hover {
            background: radial-gradient(
              rgb(0, 153, 255, 0.5) 10%,
              transparent 20%
            );
            background-size: 180px 180px;
            background-position: center;
          }

          a:hover > :global(svg) {
            stroke: white;
          }
          .container_send {
            position: relative;
            height: 100%;
            width: auto;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .message_unread {
            position: absolute;
            width: 8px;
            height: 8px;
            right: 20%;
            top: 30%;
            background: #09e;
            border-radius: 50%;
            margin-left: -35px;
          }
          .select {
            background: radial-gradient(
              rgb(0, 153, 255, 0.5) 10%,
              transparent 20%
            );
            background-size: 180px 180px;
            background-position: center;
          }

          @media (max-width: 500px) {
            a {
              padding: 0.3rem 1rem;
              background: transparent;
              border-radius: 999px;
              transition: background 0.3s;
            }
          }

          @media (min-width: 500px) {
            nav {
              position: sticky;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}
