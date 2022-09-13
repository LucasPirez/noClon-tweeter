export default function ModalChildren({ close, setClose }) {
  return (
    <>
      <div className="container" onClick={() => setClose(null)}>
        <img src={close} />
      </div>
      <style jsx>
        {`
          .container {
            background: rgba(0, 0, 0, 0.6);
            position: fixed;
            display: flex;
            items-align: center;
            justify-content: center;
            top: 0;
            width: 100%;
            height: 100vh;
          }

          img {
            margin-top: 2rem;
            align-self: center;
            width: auto;
            max-width: 800px;
            height: auto;
            max-height: 700px;
          }

          @media (max-width: 800px) {
            img {
              width: 90%;
              height: auto;
            }
@media (orientation: landscape) {
  img {
              height:100%;
              width: auto;
            }
}
          
        `}
      </style>
    </>
  );
}
