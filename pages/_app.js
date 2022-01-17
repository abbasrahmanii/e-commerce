import "tailwindcss/tailwind.css";
import { Fragment } from "react";
import { StoreProvider } from "../context/Store";
import { SessionProvider } from "next-auth/react";
//dark mode
// import { ThemeProvider } from "next-themes";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SessionProvider session={session}>
          <StoreProvider>
            <div className="min-h-screen relative">
              {/* <ThemeProvider attribute="class"> */}
              <Component {...pageProps} />
              {/* </ThemeProvider> */}
            </div>
          </StoreProvider>
        </SessionProvider>
      </SnackbarProvider>
    </Fragment>
  );
}
export default MyApp;
