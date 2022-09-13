import { useState, useEffect } from "react";
import Microphone from "../Icons/Microphone";

export default function VoiceListe({ setMessage }) {
  const [bool, setBool] = useState(false);
  const Recognition = window.webkitSpeechRecognition;

  const recognition = new Recognition();

  useEffect(() => {
    if (bool) {
      recognition.lang = "es-ES";
      console.log(recognition);

      recognition.maxAlternatives = 20;
      recognition.onresult = (e) => {
        for (const result of e.results) {
          setMessage((message) => message.concat(" " + result[0].transcript));
        }
      };
      recognition.onend = (e) => {
        setBool(false);
      };
      recognition.start();
    }
  }, [bool]);

  function handleListen(e) {
    e.preventDefault();
    if (!bool) {
      setBool(true);
    } else {
      setBool(false);
      recognition.stop();
    }
  }

  return (
    <>
      {bool ? (
        <button onClick={(e) => handleListen(e)} className="open">
          <Microphone />
        </button>
      ) : (
        <button onClick={(e) => handleListen(e)} className={"close"}>
          <Microphone />
        </button>
      )}
      <style jsx>
        {`
          button {
            background: transparent;
            border: none;
            border-radius: 50%;
            width: 12px;
            position: relative;
            margin: 0 20px 0 0;
          }

          button > :global(svg) {
            stroke: black;
          }
          .open > :global(svg) {
            stroke: #eee;

            background: radial-gradient(
              rgb(0, 153, 255, 0.5) 10%,
              transparent 20%
            );
            background-size: 180px 180px;
            background-position: center;
            border-radius: 50%;
          }

          @media (max-width: 500px) {
            .close {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}
