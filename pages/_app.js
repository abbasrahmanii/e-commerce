import { Fragment } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import "tailwindcss/tailwind.css";
import { StoreProvider } from "../context/Store";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <StoreProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StoreProvider>
    </Fragment>
  );
}

export default MyApp;
