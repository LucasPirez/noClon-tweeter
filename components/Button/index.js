export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>

      <style jsx>{`
        button {
          background: #222;
          color: #eee;
          font-size: 1.2rem;
          border-radius: 999px;
          padding: 0.3rem 0.8rem;
          transition: all 0.3s;
        }

        button:hover {
          opacity: 0.75;
          cursor: pointer;
        }

        button[disabled] {
          pointer-events: none;
          background: #eee;
          color: #333;
        }
        button:focus {
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
      `}</style>
    </>
  );
}
