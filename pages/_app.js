import { Fragment } from "react";
import "tailwindcss/tailwind.css";
import { StoreProvider } from "../context/Store";
import { AuthContextProvider } from "../context/authContext";
//dark mode
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <StoreProvider>
        <AuthContextProvider>
          <div className="min-h-screen relative">
            <ThemeProvider attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </div>
        </AuthContextProvider>
      </StoreProvider>
    </Fragment>
  );
}
export default MyApp;
