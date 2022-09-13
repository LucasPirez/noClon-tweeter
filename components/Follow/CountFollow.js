import { useState, useEffect } from "react";
import { countFollows } from "../../firebase/followers";

export default function CountFollow({ userUid, boolFollow }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    countFollows(userUid).then((data) => {
      setCount(data);
    });
  }, [userUid, boolFollow]);

  return (
    <>
      <div>
        <p>{count && count.countFollowers}</p>
        <span> Followers</span>
        <p>{count && count.countFollowing}</p>
        <span>Following</span>
      </div>
      <style jsx>{`
        div {
        width:100%;
          display: flex;
          align-items:center;
          justify-content:center;
        }
        p {
          font-weight: 600;
          margin-right:0.2em;
          aling
        }
        span {
          margin-right: 22px;
          font-weight: 400;
          opacity: 0.85;
        }
      `}</style>
    </>
  );
}
