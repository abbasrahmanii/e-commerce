import Header from "./Header";
import Footer from "./Footer";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Store } from "../context/Store";
import { useContext } from "react";

const Layout = ({ children }) => {
  //dark mode
  // const theme = createTheme({
  //   palette: {
  //     type: darkMode ? "dark" : "light",
  //   },
  // });
  return (
    <>
      <CssBaseline />
      {/* <ThemeProvider theme={theme}> */}
      <Header />
      <main className="mt-10 px-4">{children}</main>
      <Footer />
      {/* </ThemeProvider> */}
    </>
  );
};

export default Layout;
