import { useState, useEffect } from "react";

import { countFollows } from "../../firebase/followers";
import { getMessage } from "../../firebase/client";
import Tweet from "../Tweet";
import { useIntersection } from "../../hooks/useIntersection";

export default function Filter({ user, limitFilter, setLimitFilter }) {
  const [like, setLike] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const [containerRef, visible] = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    setLike(false);
    (async () => {
      const response = await countFollows(user.uid);
      const response2 = await getMessage(response.following, "in", limitFilter);
      setDataFilter(response2);
    })();
  }, [user, limitFilter, like]);

  useEffect(() => {
    visible && setLimitFilter(limitFilter + 10);
  }, [visible]);

  return (
    <>
      <div className="container_time">
        {dataFilter.map((us) => (
          <div key={us.id}>
            <Tweet {...us} navigateUser={user.uid} setLike={setLike} />
          </div>
        ))}
      </div>
      <div className="lazy_load" ref={containerRef}></div>

      <style jsx>{`
        .container_time {
          position: relative;
          min-height: 100vh;
        }
        .lazy_load {
          width: 100%;
          height: 100px;
        }
      `}</style>
    </>
  );
}
