import {
  createTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import { create } from "jss";
import jssRTL from "jss-rtl";

const RTL = (props) => {
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

export default RTL;
