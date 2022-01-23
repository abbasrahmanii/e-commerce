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
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../context/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import dynamic from "next/dynamic";
import RTL from "../components/RTL";

const ShippingPage = () => {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
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
            ثبت آدرس
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
                  pattern: /[آ-ی]/,
                }}
                render={({ field }) => (
                  <TextField
                    className={classes.affected}
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="نام و نام خانوادگی"
                    placeholder="رضا مرادی"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === "minLength"
                          ? "نام و نام خانوادگی نباید کمتر از 6 کاراکتر باشد"
                          : errors.fullName.type === "maxLength"
                          ? "نام و نام خانوادگی نباید بیشتر از 45 کاراکتر باشد"
                          : errors.fullName.type === "pattern"
                          ? "لطفاً نام و نام خانوادگی را فارسی وارد کنید"
                          : "نام و نام خانوادگی الزامی است"
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
                        label="تلفن همراه"
                        placeholder="09123456789"
                        error={Boolean(errors.mobileNumber)}
                        helperText={
                          errors.mobileNumber
                            ? errors.mobileNumber.type === "minLength"
                              ? "تلفن همراه نباید کمتر از 10 کاراکتر باشد"
                              : errors.mobileNumber.type === "maxLength"
                              ? "تلفن همراه نباید بیشتر از 13 کاراکتر باشد"
                              : errors.mobileNumber.type === "pattern"
                              ? "لطفاً الگوی تلفن همراه را رعایت کنید"
                              : "تلفن همراه الزامی است"
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
                        label="تلفن ثابت"
                        placeholder="02134567890"
                        error={Boolean(errors.phoneNumber)}
                        helperText={
                          errors.phoneNumber
                            ? errors.phoneNumber.type === "minLength" ||
                              errors.phoneNumber.type === "maxLength"
                              ? "تلفن ثابت باید 11 کاراکتر باشد"
                              : errors.phoneNumber.type === "pattern"
                              ? "لطفاً الگوی تلفن ثابت را رعایت کنید"
                              : "تلفن ثابت الزامی است"
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
                        label="استان"
                        fullWidth
                        error={Boolean(errors.province)}
                        helperText={errors.province ? "استان الزامی است" : ""}
                        {...field}
                      >
                        <MenuItem value="قم">قم</MenuItem>
                        <MenuItem value="تهران" disabled>
                          تهران
                        </MenuItem>
                        <MenuItem value="مرکزی" disabled>
                          مرکزی
                        </MenuItem>
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
                        label="شهرستان"
                        disabled={!watchProvince}
                        error={Boolean(errors.city)}
                        helperText={errors.city ? "شهرستان الزامی است" : ""}
                        {...field}
                      >
                        <MenuItem value="قم">قم</MenuItem>
                        <MenuItem value="سلفچگان">سلفچگان</MenuItem>
                        <MenuItem value="جعفریه">جعفریه</MenuItem>
                        <MenuItem value="کهک">کهک</MenuItem>
                        <MenuItem value="قنوات">قنوات</MenuItem>
                        <MenuItem value="دستجرد">دستجرد</MenuItem>
                      </TextField>
                    )}
                  ></Controller>
                </Grid>
              </Grid>
            </ListItem>
            {/* <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="شهر"
                  placeholder="قم"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City length is more than 1"
                        : "City is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem> */}
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
                    label="آدرس"
                    placeholder="منطقه، خیابان اصلی، خیابان فرعی، کوچه، پلاک، طبقه، واحد"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "آدرس نباید کمتر از 10 کاراکتر باشد"
                          : errors.address.type === "maxLength"
                          ? "آدرس نباید بیشتر از 120 کاراکتر باشد"
                          : "آدرس الزامی است"
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
                    label="کد پستی"
                    placeholder="3711111111"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === "minLength" ||
                          errors.postalCode.type === "maxLength"
                          ? "کد پستی باید 10 کاراکتر باشد"
                          : errors.postalCode.type === "pattern"
                          ? "لطفاً الگوی تلفن ثابت را رعایت کنید"
                          : "کد پستی الزامی است"
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
                ادامه
              </Button>
            </ListItem>
          </List>
        </form>
      </RTL>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(ShippingPage), { ssr: false });
