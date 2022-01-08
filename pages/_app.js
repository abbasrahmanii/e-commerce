import "tailwindcss/tailwind.css";
import { Fragment } from "react";
import { StoreProvider } from "../context/Store";
import { SessionProvider } from "next-auth/react";
//dark mode
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <SessionProvider session={session}>
        <StoreProvider>
          <div className="min-h-screen relative">
            <ThemeProvider attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </div>
        </StoreProvider>
      </SessionProvider>
    </Fragment>
  );
}
export default MyApp;
