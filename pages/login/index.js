import LinkNext from "next/link";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Layout from "../../components/layout";

const useStyles = makeStyles({
  button: {
    margin: "1rem 0",
  },
});

const LoginPage = () => {
  // const submitHandler = (e) => {
  //   e.preventDefault();
  // };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  //dark mode
  const { theme, setTheme } = useTheme();
  console.log(theme);

  const themeOne = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#6366f1",
          },
          dark: {
            main: "#FFF",
          },
          type: theme ? "light" : "dark",
        },
      }),
    [theme]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const classes = useStyles();

  return (
    <Layout>
      <div className="my-14">
        {/* <div className="mb-6">
        <form onSubmit={submitHandler}>
          <h1 className="text-center text-2xl p-4 dark:text-white">Login</h1>
          <div className="w-1/4 mx-auto">
            <div className="flex flex-col my-2 justify-between h-14 dark:text-white">
              <label htmlFor="email" className="mb-2">
                ایمیل:
              </label>
              <input
                type="email"
                id="email"
                className="bg-indigo-200 py-1 px-3"
                placeholder="📧"
              />
            </div>
            <div className="flex flex-col my-2 justify-between h-14 dark:text-white">
              <label htmlFor="password" className="mb-2">
                رمز عبور:
              </label>
              <input
                type="password"
                id="password"
                className="bg-indigo-200 py-1 px-3"
                placeholder="🔒"
              />
            </div>
            <button
              type="submit"
              className="block bg-indigo-600 w-full my-6 p-2 rounded text-white dark:bg-indigo-300 dark:text-gray-900"
            >
              ورود
            </button>
            <div className="dark:text-white">
              <p>
                آیا هنوز در سایت ثبت نام نکردی؟{" "}
                <Link href="/register">
                  <a>بازیابی رمز</a>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div> */}
        <ThemeProvider theme={themeOne} attribute="class">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlined color="secondary" />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                className="dark:text-white"
              >
                Login Page
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  dir="ltr"
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  dir="ltr"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="secondary"
                      className="dark:text-white"
                    />
                  }
                  label="Remember me"
                  className="dark:text-white"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                  // className={classes.button}
                  className="dark:bg-red-400"
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2">
                      <LinkNext href="/">Forgot password?</LinkNext>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2">
                      <LinkNext href="/register">
                        Don't have an account? Sign Up
                      </LinkNext>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </Layout>
  );
};

// export async function getStaticProps() {
//   return {
//     props: {},
//     revalidate: 2000,
//   };
// }

export default LoginPage;
