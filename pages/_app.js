import { Fragment } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import "tailwindcss/tailwind.css";
import { StoreProvider } from "../context/Store";
//dark mode
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <StoreProvider>
        <ThemeProvider attribute="class">
          <Header />
          <Component {...pageProps} />
          <Footer />{" "}
        </ThemeProvider>
      </StoreProvider>
    </Fragment>
  );
}
export default MyApp;
