import Header from "./Header";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";
import { Fragment } from "react";

const Layout = ({ children }) => {
  //dark mode
  // const theme = createTheme({
  //   palette: {
  //     type: darkMode ? "dark" : "light",
  //   },
  // });
  return (
    <Fragment>
      <CssBaseline />
      {/* <ThemeProvider theme={theme}> */}
      <Header />
      <main className="mt-10 px-4">{children}</main>
      <Footer />
      {/* </ThemeProvider> */}
    </Fragment>
  );
};

export default Layout;
