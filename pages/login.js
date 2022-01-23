import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
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
import RTL from "../components/RTL";

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const classes = useStyles();
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(data);
      dispatch({ type: "USER_LOGIN", payload: data });
      // Cookies.set("userInfo", data);
      Cookies.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout>
      <RTL>
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography
            component="h1"
            variant="h4"
            className={classes.alignCenter}
          >
            ورود
          </Typography>
          <List>
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
                    dir="rtl"
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "لطفا فرمت پست الکترونیکی را رعایت کنید"
                          : "فیلد پست الکترونیکی الزامی است"
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
                          ? "رمز عبور نباید کمتر از 8 کاراکتر باشد"
                          : "رمز عبور الزامی است"
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
                className={classes.mainButton}
              >
                ورود به سایت
              </Button>
            </ListItem>
            <ListItem>
              هنوز ثبت نام نکرده‌اید؟ &nbsp;
              <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
                <Link>ثبت نام</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </RTL>
    </Layout>
  );
}
