import Tweet from "../../components/Tweet";
import useUser from "../../hooks/useUser";
import { deleteMessage, getTweet } from "../../firebase/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import IconComment from "../../components/Icons/Comments";
import Comments from "../../components/Comments";
import Edit from "../../components/Icons/Edit";
import Back from "../../components/Back";

export default function TweetPage() {
  const [like, setLike] = useState(false);
  const [editView, setEditView] = useState(false);
  const [commentView, setCommentView] = useState(false);
  const [tweet, setTweet] = useState(null);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    setLike(false);
  }, [like]);

  useEffect(() => {
    const { id, comment } = router.query;

    comment && setCommentView(true);

    if (user) {
      getTweet(id)
        .then((data) => data.data())
        .then((data) => {
          const { createdAt } = data;
          setTweet({ ...data, createdAt: +createdAt.toDate() });
        });
    }
  }, [user]);

  const handleLink = (e) => {
    e.preventDefault();
    const { id } = router.query;

    router.push(`/compose/tweet/${id}`);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = router.query;

    deleteMessage(id)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(tweet);

  return (
    <>
      {tweet && (
        <>
          <Back title="Back" />
          <div className="tweets_container">
            <Tweet
              {...tweet}
              id={router.query.id}
              navigateUser={user.uid}
              setLike={setLike}
            />
          </div>
          <div className="container_icons">
            {user.uid === tweet.userId && editView && (
              <div className="button_container">
                <button className="edit_delete" onClick={handleLink}>
                  edit
                </button>
                <button className="edit_delete" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
            {user.uid === tweet.userId && (
              <button
                className="button_icons"
                onClick={() => setEditView(!editView)}
              >
                <Edit />
              </button>
            )}

            {
              <button
                className="button_icons"
                onClick={() => setCommentView(!commentView)}
              >
                <IconComment />
              </button>
            }
          </div>
          <Comments id={router.query.id} commentView={commentView} />
          <style jsx>{`
            button[disabled] {
              pointer-events: none;
            }
            .tweets_container {
            }
            .button_container {
              right: 20px;
              margin: 0.7rem;
            }
            .container_icons {
              display: flex;
              justify-content: flex-end;
              height: auto;
              position: relative;
            }
            .edit_delete {
              background: #222;
              color: #eee;
              font-size: 1.2rem;
              border-radius: 999px;
              background: linear-gradient(top, #222, #555);
              padding: 0.3rem 0.8rem;
              font-weight: 400;
              margin-right: 1rem;
              cursor: pointer;
              transition: all 0.4s;
              animation: opacity 0.6s linear;
            }

            .edit_delete:hover {
              color: #222;
              background: #fff;
              box-shadow: 0px 2px 5px #000;
            }

            .button_icons {
              border: none;
              background: transparent;
              margin: 0.7rem;
            }
            .button_icons:hover {
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
            @keyframes opacity {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
}
