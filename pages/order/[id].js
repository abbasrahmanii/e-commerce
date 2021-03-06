import React, { useContext, useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import { Store } from "../../context/Store";
import NextLink from "next/link";
import Image from "next/image";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Card,
  List,
  ListItem,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import useStyles from "../../utils/styles";
import { useSnackbar } from "notistack";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: "",
      };
    default:
      state;
  }
}

function Order({ params }) {
  const orderId = params.id;
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order, loadingDeliver, successDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    }
  }, [order, successDeliver]);

  const { enqueueSnackbar } = useSnackbar();

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      enqueueSnackbar("Order is delivered", { variant: "success" });
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography component="h1" variant="h4">
        ?????????? {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    ???????? ??????????
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.province},{" "}
                  {shippingAddress.city}, {shippingAddress.address},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.mobileNumber},
                  {""}
                  {shippingAddress.phoneNumber}
                </ListItem>
                <ListItem>
                  ?????????? ??????????:{" "}
                  {isDelivered
                    ? `???? ?????????? ${deliveredAt} ?????????? ???????? ????`
                    : "?????????? ???????? ????????"}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    ?????? ????????????
                  </Typography>
                </ListItem>
                <ListItem>
                  {paymentMethod === "Cart"
                    ? "???? ???????? ?????? ????????"
                    : paymentMethod === "Check"
                    ? "?????????? ??????"
                    : "????????"}
                </ListItem>
                <ListItem>
                  ?????????? ????????????:{" "}
                  {isPaid ? `???? ?????????? ${paidAt} ???????????? ????` : "???????????? ????????"}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    ??????????????
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>??????????</TableCell>
                          <TableCell>?????? ??????????</TableCell>
                          <TableCell align="right">??????????</TableCell>
                          <TableCell align="right">????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.id}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.id}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {numberWithCommas(item.price)} ??????????
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h5">?????????? ?????????? ????</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">???????? ??????????????:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {numberWithCommas(itemsPrice)} ??????????
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">????????????:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {numberWithCommas(taxPrice)} ??????????
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">?????????? ??????????:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {shippingPrice
                          ? `${numberWithCommas(shippingPrice)} ??????????`
                          : "??????????????"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">
                        <strong>??????:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>{numberWithCommas(totalPrice)} ??????????</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {!isPaid && (
                  <ListItem>
                    {/* {isPending ? ( */}
                    {true ? (
                      <ListItem alignItems="center">
                        <CircularProgress />
                      </ListItem>
                    ) : (
                      <div className={classes.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                  </ListItem>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={deliverOrderHandler}
                    >
                      ?????????? ??????????
                    </Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
