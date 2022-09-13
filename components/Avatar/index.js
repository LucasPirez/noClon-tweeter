export default function Avatar({ alt, src, text }) {
  return (
    <div>
      <img alt={alt} src={src} title={alt} />
      <strong>{text || alt}</strong>
      <style jsx>{`
        img {
          border-radius: 999px;
          width: 60px;
          height: 60px;
        }
        img + strong {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}
