import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  jssPreset,
  StylesProvider,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../context/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import dynamic from "next/dynamic";
import { create } from "jss";
import jssRTL from "jss-rtl";

const ShippingPage = () => {
  const theme = createTheme({
    direction: "rtl",
  });
  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, jssRTL()] });

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
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("province", shippingAddress.province);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("mobileNumber", shippingAddress.mobileNumber);
    setValue("phoneNumber", shippingAddress.phoneNumber);
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
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <CheckoutWizard activeStep={1} />
          <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
            <Typography component="h4" variant="h4">
              ثبت آدرس
            </Typography>
            {/* <h1 className="text-lg dark:text-white">ثبت آدرس</h1> */}
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
                            ? "Full Name length is more than 6"
                            : errors.fullName.type === "maxLength"
                            ? "Full Name length is less than 45"
                            : errors.fullName.type === "pattern"
                            ? "Please enter Full Name in Persian"
                            : "Full Name is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <Controller
                      name="mobileNumber"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 10,
                        maxLength: 13,
                        pattern:
                          /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/,
                        // /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
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
                                ? "Mobile Number length is more than 10"
                                : errors.mobileNumber.type === "maxLength"
                                ? "Mobile Number length is less than 13"
                                : errors.mobileNumber.type === "pattern"
                                ? "please enter current Mobile Number"
                                : "Mobile Number is required"
                              : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </Grid>
                  <Grid item sm={6}>
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
                                ? "Phone Number length is 11"
                                : errors.phoneNumber.type === "pattern"
                                ? "please enter current Phone Number"
                                : "Phone Number is required"
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
                  <Grid item sm={6}>
                    <Controller
                      name="province"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          variant="outlined"
                          label="Province"
                          fullWidth
                          error={Boolean(errors.province)}
                          helperText={
                            errors.province ? "Province is required" : ""
                          }
                          {...field}
                        >
                          <MenuItem value="Qom">قم</MenuItem>
                          <MenuItem value="Tehran" disabled>
                            تهران
                          </MenuItem>
                          <MenuItem value="Markazi" disabled>
                            مرکزی
                          </MenuItem>
                        </Select>
                      )}
                    ></Controller>
                  </Grid>
                  <Grid item sm={6}>
                    <Controller
                      name="city"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          variant="outlined"
                          label="city"
                          fullWidth
                          disabled={!watchProvince}
                          error={Boolean(errors.city)}
                          helperText={errors.city ? "City is required" : ""}
                          {...field}
                        >
                          <MenuItem value="Qom">قم</MenuItem>
                          <MenuItem value="Salafchegan">سلفچگان</MenuItem>
                          <MenuItem value="Jafariyeh">جعفریه</MenuItem>
                          <MenuItem value="Kahak">کهک</MenuItem>
                          <MenuItem value="Ghanavat">قنوات</MenuItem>
                          <MenuItem value="Dastjerd">دستجرد</MenuItem>
                        </Select>
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
                            ? "Address length is more than 10"
                            : errors.address.type === "maxLength"
                            ? "Address length is less than 120"
                            : "Address is required"
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
                            ? "Postal Code length is 10"
                            : "Postal Code is required"
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
                  Continue
                </Button>
              </ListItem>
            </List>
          </form>
        </StylesProvider>
      </ThemeProvider>
    </Layout>
  );
};

// export default ShippingPage;
export default dynamic(() => Promise.resolve(ShippingPage), { ssr: false });
