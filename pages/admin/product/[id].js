import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
} from "@mui/material";
import { getError } from "../../../utils/error";
import { Store } from "../../../context/Store";
import Layout from "../../../components/Layout";
import useStyles from "../../../utils/styles";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import RTL from "../../../components/RTL";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

function ProductEdit({ params }) {
  const productId = params.id;
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/products/${productId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("id", data.id);
          setValue("name", data.name);
          setValue("price", data.price);
          setValue("image", data.image);
          setValue("isPopular", data.isPopular);
          setValue("brand", data.brand);
          setValue("category", data.category);
          setValue("countInStock", data.countInStock);
          setValue("isFreeDelivery", data.isFreeDelivery);
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      fetchData();
    }
  }, []);
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/admin/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue("image", data.secure_url);
      enqueueSnackbar("File uploaded successfully", { variant: "success" });
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const submitHandler = async ({
    id,
    name,
    price,
    image,
    isPopular,
    brand,
    category,
    countInStock,
    isFreeDelivery,
  }) => {
    closeSnackbar();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/products/${productId}`,
        {
          id,
          name,
          price,
          image,
          isPopular,
          brand,
          category,
          countInStock,
          isFreeDelivery,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("Product updated successfully", { variant: "success" });
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title={`Edit Product ${productId}`}>
      <RTL>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NextLink href="/admin/dashboard" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="داشبورد ادمین"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/orders" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="سفارش ها"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/products" passHref>
                  <ListItem selected button component="a">
                    <ListItemText primary="محصولات"></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h4">
                    ویرایش محصول {productId}
                  </Typography>
                </ListItem>
                <ListItem>
                  {loading && <CircularProgress></CircularProgress>}
                  {error && (
                    <Typography className={classes.error}>{error}</Typography>
                  )}
                </ListItem>
                <ListItem>
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className={classes.form}
                  >
                    <List>
                      <ListItem>
                        <Controller
                          name="id"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="id"
                              label="Id"
                              error={Boolean(errors.slug)}
                              helperText={errors.slug ? "Id is required" : ""}
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="name"
                              label="Name"
                              error={Boolean(errors.name)}
                              helperText={errors.name ? "Name is required" : ""}
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      <ListItem>
                        <Controller
                          name="price"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="price"
                              label="Price"
                              error={Boolean(errors.price)}
                              helperText={
                                errors.price ? "Price is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="image"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="image"
                              label="Image"
                              error={Boolean(errors.image)}
                              helperText={
                                errors.image ? "Image is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Button variant="contained" component="label">
                          Upload File
                          <input type="file" onChange={uploadHandler} hidden />
                        </Button>
                        {loadingUpload && <CircularProgress />}
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="isPopular"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="isPopular"
                              label="Popular"
                              error={Boolean(errors.isPopular)}
                              helperText={
                                errors.isPopular ? "Popular is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="brand"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="brand"
                              label="Brand"
                              error={Boolean(errors.brand)}
                              helperText={
                                errors.brand ? "Brand is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="category"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="category"
                              label="Category"
                              error={Boolean(errors.category)}
                              helperText={
                                errors.category ? "Category is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="countInStock"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="countInStock"
                              label="Count in stock"
                              error={Boolean(errors.countInStock)}
                              helperText={
                                errors.countInStock
                                  ? "Count in stock is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>
                      <ListItem>
                        <Controller
                          name="isFreeDelivery"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="isFreeDelivery"
                              label="Free Delivery"
                              error={Boolean(errors.isFreeDelivery)}
                              helperText={
                                errors.isFreeDelivery
                                  ? "Free Delivery is required"
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
                          بروزرسـانی
                        </Button>
                        {loadingUpdate && <CircularProgress />}
                      </ListItem>
                    </List>
                  </form>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </RTL>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });