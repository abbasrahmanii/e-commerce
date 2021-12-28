import { Fragment } from "react";
import "tailwindcss/tailwind.css";
import { StoreProvider } from "../context/Store";
//dark mode
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <StoreProvider>
        <div className="min-h-screen relative">
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </div>
      </StoreProvider>
    </Fragment>
  );
}
export default MyApp;
