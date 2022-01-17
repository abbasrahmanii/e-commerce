import Header from "./Header";
import Footer from "./Footer";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Store } from "../context/Store";
import { useContext } from "react";

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
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
      <main>{children}</main>
      <Footer />
      {/* </ThemeProvider> */}
    </>
  );
};

export default Layout;
