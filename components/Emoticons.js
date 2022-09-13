import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";

export default function Emoticon({ setMessage }) {
  const [load, setLoad] = useState(null);

  useEffect(() => {
    setLoad(true);
  }, []);

  const select = (e, emojiObject) => {
    console.log(emojiObject.emoji);
    // const emoji = String.fromCodePoint(`0x${code}`);
    setMessage((message) => message + emojiObject.emoji);
  };

  return load && <EmojiPicker onEmojiClick={select} />;
}
