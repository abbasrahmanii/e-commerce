import {
  createTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@mui/material";
import { create } from "jss";
import jssRTL from "jss-rtl";

const RTLTwo = (props) => {
  const theme = createTheme({
    direction: "rtl",
  });
  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, jssRTL()] });

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>{props.children}</StylesProvider>
    </ThemeProvider>
  );
};

export default RTLTwo;
