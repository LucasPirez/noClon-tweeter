import { useState, useEffect } from "react";
import { listenLastComment } from "../../firebase/client";
import useUSer from "../../hooks/useUser";
import AddComment from "./Addcomment";
import ShowComment from "./ShowComment";
import { useRouter } from "next/router";

export default function Comments({ id, commentView }) {
  const user = useUSer();
  const [timeline, setTimeline] = useState(null);
  const router = useRouter();
  console.log(router.asPath.includes("/status"));

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = listenLastComment(id, (newComment) => {
        const order = newComment.sort((a, b) => {
          return b.created - a.created;
        });

        setTimeline(order);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [user]);

  //   console.log(timeline);

  return (
    <section>
      {commentView && <AddComment tweetId={id} />}
      <h3>Comments</h3> <span>.</span>
      <span>{timeline && timeline.length}</span>
      {timeline &&
        timeline.map((comment) => (
          <div key={Math.random()}>
            <ShowComment {...comment} />
          </div>
        ))}
      <style jsx>
        {`
          section {
            width: 100%;
            height: auto;
          }
          h3 {
            display: inline-block;
            margin-left: 2rem;
          }
        `}
      </style>
    </section>
  );
}
