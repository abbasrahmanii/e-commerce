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
  Button,
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

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
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
    }
  }, [order]);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography component="h5" variant="h5">
        Order {orderId}
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
                    آدرس سفارش
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
                  وضعیت ارسال:{" "}
                  {isDelivered
                    ? `در تاریخ ${deliveredAt} تحویل داده شد`
                    : "تحویل داده نشده"}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    روش پرداخت
                  </Typography>
                </ListItem>
                <ListItem>
                  {paymentMethod === "Cart"
                    ? "با کارت عضو شتاب"
                    : paymentMethod === "Check"
                    ? "بصورت چکی"
                    : "نقدی"}
                </ListItem>
                <ListItem>
                  وضعیت پرداخت:{" "}
                  {isPaid ? `در تاریخ ${paidAt} پرداخت شد` : "پرداخت نشده"}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    محصولات
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>تصویر</TableCell>
                          <TableCell>نام محصول</TableCell>
                          <TableCell align="right">تعداد</TableCell>
                          <TableCell align="right">قیمت</TableCell>
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
                                {numberWithCommas(item.price)} تومان
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
                  <Typography variant="h5">خلاصه سفارش ها</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">قیمت محصولات:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {numberWithCommas(itemsPrice)} تومان
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">مالیات:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {numberWithCommas(taxPrice)} تومان
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">هزینه ارسال:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {shippingPrice
                          ? `${numberWithCommas(shippingPrice)} تومان`
                          : "رایـگان"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography align="left">
                        <strong>جمع:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>{numberWithCommas(totalPrice)} تومان</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
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
