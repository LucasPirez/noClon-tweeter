import Tweet from "../../components/Tweet";
import { useState, useEffect } from "react";
import { getLikeUser } from "../../firebase/client";
import useUSer from "../../hooks/useUser";

export default function Likes({ userID }) {
  const [like, setLike] = useState(false);
  const [userLikes, setUserLikes] = useState(null);
  const user = useUSer();

  useEffect(() => {
    setLike(false);
    if (userID) {
      getLikeUser(userID).then((data) => {
        const order = data.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        setUserLikes(order);
      });
    }
  }, [userID, like]);
  return (
    <>
      <div className="container_tweets">
        {userLikes &&
          user &&
          userLikes.map((us) => (
            <Tweet
              key={us.id}
              {...us}
              navigateUser={user.uid}
              likesCount={us.likesCount}
              setLike={setLike}
            />
          ))}
      </div>
      <style jsx>{`
        .container_tweets {
          margin: auto;
          overflow: hidden;
          padding-bottom: 30px;
        }
      `}</style>
    </>
  );
}
