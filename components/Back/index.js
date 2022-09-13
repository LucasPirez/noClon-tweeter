import ArrowLeft from "../../components/Icons/ArrowLeft";
import { useRouter } from "next/router";
import { messageRead } from "../../firebase/clientChat";
export default function Back({ title, subTitle, user, doc }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    user && messageRead(doc, user);
    router.back();
  };
  return (
    <>
      <div onClick={handleClick}>
        <ArrowLeft />
        <strong>{title}</strong>

        <span>{subTitle}</span>
      </div>
      <style jsx>
        {`
          div {
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;
            border-bottom: 2px solid #eee;
            background: #fff;
            padding-left: 1.3rem;
            cursor: pointer;
          }

          span {
            margin: auto;
          }
        `}
      </style>
    </>
  );
}
