export default function Selector({
  onClick1,
  onClick2,
  estado,
  name1,
  name2,
  background = "transparent",
}) {
  return (
    <>
      <div>
        <button className={estado ? "select" : ""} onClick={onClick1}>
          {name1}
        </button>
        <button className={!estado ? "select" : ""} onClick={onClick2}>
          {name2}
        </button>
      </div>
      <style jsx>
        {`
          div {
            position: relative;
            margin: 4rem 0 10px;
            width: 100%;
            height: 38px;
          }
          button {
            width: 50%;
            border: none;
            cursor: pointer;
            opacity: 0.8;
            padding: 7px;
            color: #222;
            font-size: 1.3em;
            transition: all 0.3s;
            background: ${background};
          }
          button:hover {
            opacity: 0.5;
          }

          .select {
            color: #09d;
            border-bottom: 4px solid #09d;
          }
          @media (max-width: 500px) {
            div {
              margin: 1rem 0 10px;
              font-size: 0.9em;
            }
          }
        `}
      </style>
    </>
  );
}
