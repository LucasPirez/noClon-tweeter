import Avatar from "../Avatar";
import useUSer from "../../hooks/useUser";
import { useRouter } from "next/router";
export default function ShowComment({ avatar, content, userComment, useID }) {
  const router = useRouter();
  const user = useUSer();
  function profilePage(e) {
    e.preventDefault();
    e.stopPropagation();

    if (useID !== user.uid) {
      router.push(`/profile/${useID}`);
    }
  }
  return (
    <>
      <article>
        <section>
          <button onClick={profilePage} className="button_avatar">
            <Avatar title="avatar" src={avatar} />
          </button>

          <div>
            <header>
              <strong>{userComment}</strong>

              <span className="span_punto">·</span>
            </header>
            <div className="container_content">
              <p>{content}</p>
            </div>
          </div>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          background: #fff;
          width: 96%;
          display: flex;
          flex-direction: column;
          position: relative;
          padding: 10px 15px;
          margin-left: 0.7rem;
        }

        article:hover {
          background: #eee;
          cursor: pointer;
        }
        section {
          display: flex;
          overflow: hidden;
        }

        .like > :global(svg) {
          fill: red;
          stroke: red;
          transform: translate(0, 5px);
        }
        .unlike > :global(svg) {
          fill: none;
          stroke: black;
          transform: translate(0, 5px);
        }

        img {
          margin: auto;
        }
        .like,
        .unlike {
          position: absolute;
          right: 2rem;
          bottom: 0;
          background: none;
          border: none;
          cursor: pointer;
        }
        .button_avatar {
          border: none;
          background: transparent;
        }
        .container_content {
          max-width: 550px;
          width: auto;
        }

        p {
          word-wrap: break-word;
          line-height: 1.3125;
          margin: 0.6rem;
          margin-left: 1rem;
        }

        date {
          color: #555;
          font-size: 14px;
        }

        img {
          width: 150px;
          height: auto;
          border-radius: 10px;
        }
        time {
          opacity: 0.75;
        }
        .span_punto {
          margin: 0 5px;
        }
      `}</style>
    </>
  );
}
