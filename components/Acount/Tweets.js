import { getMessage } from "../../firebase/client";
import { useState, useEffect } from "react";
import Tweet from "../../components/Tweet";
import useUSer from "../../hooks/useUser";

export default function AccountTweets({ userID }) {
  const [like, setLike] = useState(false);
  const [userTweets, setUserTweets] = useState(null);
  const user = useUSer();

  useEffect(() => {
    setLike(false);
    if (userID) {
      getMessage(userID, "==").then((data) => {
        setUserTweets(data);
      });
    }
  }, [userID, like]);

  return (
    <>
      <div className="container_tweets">
        {userTweets &&
          user &&
          userTweets.map((us) => (
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
          width: auto;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
