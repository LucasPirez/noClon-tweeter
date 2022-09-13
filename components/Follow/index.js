import { useState, useEffect } from "react";
import { follow, following, unfollow } from "../../firebase/followers";
import Button from "../Button";
import CountFollow from "./CountFollow";

export default function Follow({ uid, useProfile, handleMessage }) {
  const [boolFollow, setBoolFollow] = useState(null);

  useEffect(() => {
    following({ seguidor: uid, seguir: useProfile }).then((data) => {
      setBoolFollow(data);
    });
  }, []);

  const handleFollow = (e) => {
    e.preventDefault();
    follow({ seguidor: uid, seguir: useProfile }).then(() => {
      setBoolFollow(true);
    });
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    unfollow({ seguidor: uid, seguir: useProfile }).then(() => {
      setBoolFollow(false);
    });
  };
  return (
    <>
      <CountFollow userUid={useProfile} boolFollow={boolFollow} />

      <div className="container_follow">
        {!boolFollow ? (
          <Button onClick={handleFollow}>Follow</Button>
        ) : (
          <Button onClick={handleUnFollow}>unFollow</Button>
        )}
        <div className="send">
          <Button onClick={handleMessage}>Send Mesage</Button>
        </div>
      </div>
      <style jsx>
        {`
          .container_follow {
            display: flex;
            justify-content: center;
            margin-bottom: 35px;
          }
          .send {
            margin-left: 10px;
          }
        `}
      </style>
    </>
  );
}
