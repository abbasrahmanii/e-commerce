import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../context/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import dynamic from "next/dynamic";
import RTL from "../components/RTL";
import { getAllProvince } from "../data";

const ShippingPage = () => {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm();
  const watchProvince = watch("province");
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    if (shippingAddress) {
      setValue("fullName", shippingAddress.fullName);
      setValue("address", shippingAddress.address);
      setValue("province", shippingAddress.province);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
      setValue("mobileNumber", shippingAddress.mobileNumber);
      setValue("phoneNumber", shippingAddress.phoneNumber);
    }
  }, []);

  const [cities, setCities] = useState(null);

  const getVal = getValues("province");
  useEffect(() => {
    if (getVal) {
      setCities(getAllProvince().find((prov) => prov.province === getVal));
    }
  }, [getVal]);

  const submitHandler = ({
    fullName,
    address,
    province,
    city,
    postalCode,
    mobileNumber,
    phoneNumber,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        province,
        city,
        postalCode,
        mobileNumber,
        phoneNumber,
      },
    });
    Cookies.set("shippingAddress", {
      fullName,
      address,
      province,
      city,
      postalCode,
      mobileNumber,
      phoneNumber,
    });
    router.push("/payment");
  };
  return (
    <Layout>
      <RTL>
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h4" variant="h4">
            ?????? ????????
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                  maxLength: 45,
                  pattern: /[??-??]/,
                }}
                render={({ field }) => (
                  <TextField
                    className={classes.affected}
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="?????? ?? ?????? ????????????????"
                    placeholder="?????? ??????????"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === "minLength"
                          ? "?????? ?? ?????? ???????????????? ?????????? ???????? ???? 6 ?????????????? ????????"
                          : errors.fullName.type === "maxLength"
                          ? "?????? ?? ?????? ???????????????? ?????????? ?????????? ???? 45 ?????????????? ????????"
                          : errors.fullName.type === "pattern"
                          ? "?????????? ?????? ?? ?????? ???????????????? ???? ?????????? ???????? ????????"
                          : "?????? ?? ?????? ???????????????? ???????????? ??????"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="mobileNumber"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 10,
                      maxLength: 13,
                      pattern: /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="mobileNumber"
                        label="???????? ??????????"
                        placeholder="09123456789"
                        error={Boolean(errors.mobileNumber)}
                        helperText={
                          errors.mobileNumber
                            ? errors.mobileNumber.type === "minLength"
                              ? "???????? ?????????? ?????????? ???????? ???? 10 ?????????????? ????????"
                              : errors.mobileNumber.type === "maxLength"
                              ? "???????? ?????????? ?????????? ?????????? ???? 13 ?????????????? ????????"
                              : errors.mobileNumber.type === "pattern"
                              ? "?????????? ?????????? ???????? ?????????? ???? ?????????? ????????"
                              : "???????? ?????????? ???????????? ??????"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 11,
                      maxLength: 11,
                      pattern: /^0[0-9]{2,}[0-9]{7,}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="phoneNumber"
                        label="???????? ????????"
                        placeholder="02134567890"
                        error={Boolean(errors.phoneNumber)}
                        helperText={
                          errors.phoneNumber
                            ? errors.phoneNumber.type === "minLength" ||
                              errors.phoneNumber.type === "maxLength"
                              ? "???????? ???????? ???????? 11 ?????????????? ????????"
                              : errors.phoneNumber.type === "pattern"
                              ? "?????????? ?????????? ???????? ???????? ???? ?????????? ????????"
                              : "???????? ???????? ???????????? ??????"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="province"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        select
                        variant="outlined"
                        label="??????????"
                        fullWidth
                        error={Boolean(errors.province)}
                        helperText={errors.province ? "?????????? ???????????? ??????" : ""}
                        {...field}
                      >
                        {getAllProvince().map((d) => (
                          <MenuItem value={d.province} key={d.province}>
                            {d.province}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        select
                        variant="outlined"
                        fullWidth
                        id="city"
                        label="??????????????"
                        disabled={!watchProvince}
                        error={Boolean(errors.city)}
                        helperText={errors.city ? "?????????????? ???????????? ??????" : ""}
                        {...field}
                      >
                        {cities ? (
                          cities.city.map((c) => (
                            <MenuItem value={c}>{c}</MenuItem>
                          ))
                        ) : (
                          <MenuItem value="null">null</MenuItem>
                        )}
                      </TextField>
                    )}
                  ></Controller>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 10,
                  maxLength: 120,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="????????"
                    placeholder="???????????? ???????????? ?????????? ???????????? ?????????? ?????????? ?????????? ?????????? ????????"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "???????? ?????????? ???????? ???? 10 ?????????????? ????????"
                          : errors.address.type === "maxLength"
                          ? "???????? ?????????? ?????????? ???? 120 ?????????????? ????????"
                          : "???????? ???????????? ??????"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: /(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalCode"
                    label="???? ????????"
                    placeholder="3711111111"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === "minLength" ||
                          errors.postalCode.type === "maxLength"
                          ? "???? ???????? ???????? 10 ?????????????? ????????"
                          : errors.postalCode.type === "pattern"
                          ? "?????????? ?????????? ???? ???????? ???? ?????????? ????????"
                          : "???? ???????? ???????????? ??????"
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
                ??????????
              </Button>
            </ListItem>
          </List>
        </form>
      </RTL>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(ShippingPage), { ssr: false });
