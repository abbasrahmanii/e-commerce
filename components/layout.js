import Header from "./Header";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { getError } from "../utils/error";
import { useSnackbar } from "notistack";
import axios from "axios";

const Layout = ({ children }) => {
  //dark mode
  // const theme = createTheme({
  //   palette: {
  //     type: darkMode ? "dark" : "light",
  //   },
  // });

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
