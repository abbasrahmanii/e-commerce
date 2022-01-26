import Header from "./Header";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";

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
