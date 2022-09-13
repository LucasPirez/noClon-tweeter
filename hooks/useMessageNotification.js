import { useState, useEffect } from "react";
import useUSer from "./useUser";
import { getSnaptsChats } from "../firebase/clientChat";
// import { useRouter } from "next/router";

export default function useMessageNotification() {
  const [messageNoLeido, setMessageNoLeido] = useState(false);
  const [contentMessage, setContentMessage] = useState(null);
  const user = useUSer();
  // const router = useRouter();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = getSnaptsChats(user.uid, (snap) => {
        setContentMessage(snap);

        let count = 0;
        snap.forEach((u) => {
          if (u.noRead !== user.uid && u.noRead !== "") {
            count++;
          }
        });
        if (count > 0) {
          setMessageNoLeido(true);
        } else {
          setMessageNoLeido(false);
        }
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [user]);

  return {
    setMessageNoLeido,
    messageNoLeido,
    setContentMessage,
    contentMessage,
  };
}
