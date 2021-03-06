import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { getError } from "../../utils/error";
import { Store } from "../../context/Store";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import { useSnackbar } from "notistack";
import RTL from "../../components/RTL";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const { enqueueSnackbar } = useSnackbar();
  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        `/api/admin/products`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "CREATE_SUCCESS" });
      enqueueSnackbar("Product created successfully", { variant: "success" });
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Layout>
      <RTL>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NextLink href="/admin/dashboard" passHref>
                  <ListItem component="a">
                    <ListItemText primary="?????????????? ??????????"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/orders" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="?????????? ????"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/products" passHref>
                  <ListItem selected button component="a">
                    <ListItemText primary="??????????????"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/users" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="??????????????"></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Typography component="h1" variant="h4">
                        ??????????????
                      </Typography>
                      {loadingDelete && <CircularProgress />}
                    </Grid>
                    <Grid align="left" item xs={6}>
                      <Button
                        onClick={createHandler}
                        color="primary"
                        variant="contained"
                      >
                        Create
                      </Button>
                      {loadingCreate && <CircularProgress />}
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography className={classes.error}>{error}</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">??????????</TableCell>
                            <TableCell align="center">?????? ??????????</TableCell>
                            <TableCell align="center">???????? ??????????</TableCell>
                            <TableCell align="center">???????? ????????</TableCell>
                            <TableCell align="center">????????</TableCell>
                            <TableCell align="center">
                              ?????????? ?????????? ???? ??????????
                            </TableCell>
                            <TableCell align="center">?????????? ????????????</TableCell>
                            <TableCell align="center">????????????</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product._id}>
                              <TableCell align="center">
                                {product._id.substring(20, 24)}
                              </TableCell>
                              <TableCell align="center">
                                {product.name}
                              </TableCell>
                              <TableCell align="center">
                                {numberWithCommas(product.price)} ??????????
                              </TableCell>
                              <TableCell align="center">
                                {product.category}
                              </TableCell>
                              <TableCell align="center">
                                {product.brand}
                              </TableCell>
                              <TableCell align="center">
                                {product.countInStock}
                              </TableCell>
                              <TableCell align="center">
                                {product.isFreeDelivery ? "??????????????" : "-"}
                              </TableCell>
                              <TableCell align="center">
                                <NextLink
                                  href={`/admin/product/${product._id}`}
                                  passHref
                                >
                                  <Button
                                    size="small"
                                    variant="contained"
                                    className=" text-base"
                                  >
                                    ????????????
                                  </Button>
                                </NextLink>{" "}
                                <Button
                                  onClick={() => deleteHandler(product._id)}
                                  size="small"
                                  variant="contained"
                                  className=" text-base"
                                >
                                  ??????
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </RTL>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
