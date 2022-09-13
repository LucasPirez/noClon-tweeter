import { useState } from "react";
import useUSer from "../../hooks/useUser";
import NavBar from "../../components/Nav";
import Filter from "../../components/Home/Filter";
import Selector from "../../components/Acount/Selector";
import AllTweet from "../../components/Home/AllTweet";

export default function HomePage() {
  const [all, setAll] = useState(true);
  const [limitAll, setlimitAll] = useState(10);
  const [limitFilter, setLimitFilter] = useState(10);

  const user = useUSer();

  return (
    <>
      <NavBar />

      <h1> Welcome to Home</h1>
      <Selector
        onClick1={() => setAll(true)}
        onClick2={() => setAll(false)}
        estado={all}
        name1={"All"}
        name2={"Follow"}
        background={"#fff"}
      />

      {all ? (
        <AllTweet user={user} setLimitAll={setlimitAll} limitAll={limitAll} />
      ) : (
        <Filter
          user={user}
          setLimitFilter={setLimitFilter}
          limitFilter={limitFilter}
        />
      )}

      <style jsx>{`
        h1 {
          text-align: center;
          color: #09d;
        }
        img {
          margin: center;
          width: 200px;
          height: auto;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
