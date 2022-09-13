import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function ModalPortal({ children }) {
  const portalNode = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portalNode);

    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  return ReactDOM.createPortal(children, portalNode);
}
