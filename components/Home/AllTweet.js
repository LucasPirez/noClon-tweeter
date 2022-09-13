import { useState, useEffect } from "react";
import Tweet from "../Tweet";
import { listenLatestTweet } from "../../firebase/client";
import { useIntersection } from "../../hooks/useIntersection";

export default function AllTweet({ user, limitAll, setLimitAll }) {
  const [timeline, setTimeline] = useState([]);
  const [containerRef, visible] = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    let unsubscribe;
    console.log("snapshot");

    if (user) {
      unsubscribe = listenLatestTweet(limitAll, (newTweet) => {
        setTimeline(newTweet);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [user, limitAll]);

  useEffect(() => {
    visible && setLimitAll(limitAll + 10);
  }, [visible]);

  return (
    <>
      <div className="container_time">
        {timeline.map((us) => (
          <div key={us.id}>
            <Tweet {...us} navigateUser={user.uid} />
          </div>
        ))}
      </div>
      <div className="lazy_load" ref={containerRef}></div>
      <style jsx>
        {`
          .container_time {
            position: relative;
            min-height: 100vh;
          }
          .lazy_load {
            width: 100%;
            height: 100px;
          }
        `}
      </style>
    </>
  );
}
