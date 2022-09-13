import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container_app">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
