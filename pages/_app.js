import { Fragment } from "react";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Footer from "../components/footer";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </Fragment>
  );
}

export default MyApp;
