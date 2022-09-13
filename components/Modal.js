import ModalChildren from "./ModalChildre";
import ModalPortal from "./ModalPortal";

export default function Modal({ setClose, close }) {
  return (
    <ModalPortal>
      <ModalChildren close={close} setClose={setClose} />
    </ModalPortal>
  );
}
