import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
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
import { useTheme } from "next-themes";
import { useMemo } from "react";
import Layout from "../../components/layout";
import { useContext } from "react";
import { Store } from "../../context/Store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = ({ session }) => {
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/");
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout>
      <div className="my-14">
        <form onSubmit={submitHandler}>
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
        </form>
        <div className="flex flex-col justify-center items-center p-8">
          {session ? (
            <>
              <h1 className="text-lg">
                Signed in as{" "}
                <Link>
                  <LinkNext href="/profile">{session.user.name}</LinkNext>
                </Link>
              </h1>
              <button
                onClick={() => signOut()}
                className="py-2 px-3 m-2 bg-red-500 text-white"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              Not signed in <br />
              <button
                onClick={() =>
                  signIn("github", { callbackUrl: "http://localhost:3000" })
                }
                className="py-2 px-3 m-2 bg-green-500 text-white"
              >
                Sign in with GitHub
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
