import { Fragment } from "react/cjs/react.production.min";
import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
