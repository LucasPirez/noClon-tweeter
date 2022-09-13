import { useState } from "react";
import useTimeAgo from "../../hooks/useTimeAgo";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import Avatar from "../Avatar";
import { likes, unLikes } from "../../firebase/client";
import Heart from "../Icons/Heart";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../Modal";
import IconComment from "../Icons/Comments";

export default function Tweet({
  avatar,
  username,
  content,
  createdAt,
  img,
  id,
  userId,
  navigateUser,
  likesCount,
  setLike,
}) {
  const [close, setClose] = useState(null);
  const timestapm = useTimeAgo(createdAt);
  const createdDate = useDateTimeFormat(createdAt);
  const router = useRouter();
  const showCommentIcon = router.asPath.includes("/status");

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/status/${id}`);
  };

  function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    likes(id, navigateUser);
    if (setLike !== undefined) {
      setLike(true);
    }
  }

  function handleunLike(e) {
    e.preventDefault();
    e.stopPropagation();

    unLikes(id, navigateUser);
    if (setLike !== undefined) {
      setLike(true);
    }
  }

  function profilePage(e) {
    e.preventDefault();
    e.stopPropagation();

    if (navigateUser !== userId) {
      router.push(`/profile/${userId}?username=${username}`);
    }
  }

  function handleComment(e) {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/status/${id}?comment=true`);
  }

  function modal(e) {
    e.preventDefault();
    e.stopPropagation();
    setClose !== undefined && setClose(img);
  }

  return (
    <>
      <article onClick={handleClick}>
        <section>
          <button onClick={profilePage} className="button_avatar">
            <Avatar title="avatar" src={avatar} />
          </button>

          <div>
            <header>
              <strong>{username}</strong>

              <span className="span_punto">·</span>
              <Link href={`status/${id}`}>
                <a>
                  <time title={createdDate}>{timestapm}</time>
                </a>
              </Link>
            </header>
            <div className="container_content">
              <p>{content}</p>
            </div>
          </div>
        </section>
        {img && <img src={img} onClick={modal} />}
        <div className="container_icons">
          {!showCommentIcon && (
            <button className="unlike" onClick={handleComment}>
              <IconComment />
            </button>
          )}
          {likesCount.includes(`${navigateUser}`) ? (
            <button onClick={handleunLike} fill="red" className="like">
              {likesCount.length}
              <Heart />
            </button>
          ) : (
            <button onClick={handleLike} className="unlike">
              {likesCount.length}
              <Heart />
            </button>
          )}
        </div>
      </article>
      {typeof close === "string" && <Modal setClose={setClose} close={close} />}
      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          background: #fff;
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          padding: 10px 15px;
          transition: all 0.3s;
        }

        article:hover {
          background: #0099ff17;
          border-radius: 4px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px inset;
          color: #111;
          cursor: pointer;
        }
        section {
          display: flex;
          overflow: hidden;
        }
        .container_icons {
          position: absolute;
          right: 2rem;
          bottom: 0;
          width: 80px;
          display: flex;
        }
        .like,
        .unlike {
          padding: 0.5em;
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
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .like:hover,
        .unlike:hover {
          transform: scale(1.1);
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
        }

        date {
          color: #555;
          font-size: 14px;
        }

        img {
          width: 200px;
          height: auto;
          border-radius: 10px;
        }
        time {
          opacity: 0.75;
        }
        .span_punto {
          margin: 0 5px;
        }
        @media (max-width: 500px) {
          .container_icons {
            right: 0;
          }
        }
      `}</style>
    </>
  );
}
