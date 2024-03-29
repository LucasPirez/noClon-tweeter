import { useEffect } from "react";
import Head from "next/head";
// import Image from 'next/image'
import styles from "../styles/Home.module.css";
// import Link from "next/link";
import Button from "../components/Button";
import { loginWithGitHub, loginWithGoogle } from "../firebase/client";
import Avatar from "../components/Avatar";

import { useRouter } from "next/router";
import useUSer, { USER_STATE } from "../hooks/useUser";

export default function Home() {
  const router = useRouter();
  const user = useUSer();

  useEffect(() => {
    user && router.replace("home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err);
    });
  };
  const handleClickGoogle = () => {
    loginWithGoogle().catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user === USER_STATE.NOT_LOGGED && (
          <>
            <Button onClick={handleClick}>login with github</Button>
            <Button onClick={handleClickGoogle}>login with google</Button>
          </>
        )}

        {user && user.avatar && (
          <div>
            <Avatar alt="username" src={user.avatar} text={user.username} />
          </div>
        )}
      </main>
    </div>
  );
}
