import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  createTheme,
  jssPreset,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../context/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import useStyles from "../utils/styles";
import { getError } from "../utils/error";
import { create } from "jss";
import jssRTL from "jss-rtl";

export default function Register() {
  const theme = createTheme({
    direction: "rtl",
  });
  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, jssRTL()] });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const classes = useStyles();

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title="Register">
      {" "}
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
            <Typography component="h1" variant="h4">
              ثبت نام
            </Typography>
            <List>
              <ListItem>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="نام"
                      type="text"
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === "minLength"
                            ? "Name length is more than 1"
                            : "Name is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="پست الکترونیکی"
                      type="email"
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === "pattern"
                            ? "Email is not valid"
                            : "Email is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 8,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="رمز عبور"
                      type="password"
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === "minLength"
                            ? "Password length is more than 8"
                            : errors.password.type === "pattern"
                            ? "Password must contain at least 1 uppercase & 1 lowercase alphabetical & 1 numeric character"
                            : "Password is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 8,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="confirmPassword"
                      label="تأیید رمز عبور"
                      type="password"
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.confirmPassword
                          ? errors.confirmPassword.type === "minLength"
                            ? "Confirm Password length is more than 8"
                            : "Confirm  Password is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  ثبت نام
                </Button>
              </ListItem>
              <ListItem>
                Already have an account? &nbsp;
                <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
                  <Link>Login</Link>
                </NextLink>
              </ListItem>
            </List>
          </form>
        </StylesProvider>
      </ThemeProvider>
    </Layout>
  );
}
