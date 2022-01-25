import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getError } from "../../utils/error";
import { Store } from "../../context/Store";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import RTL from "../../components/RTL";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

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
                  <ListItem button component="a">
                    <ListItemText primary="داشبورد ادمین"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/orders" passHref>
                  <ListItem selected button component="a">
                    <ListItemText primary="سفارش ها"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/products" passHref>
                  <ListItem button component="a">
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
                    سفارش ها
                  </Typography>
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
                            <TableCell align="center">شناسه</TableCell>
                            <TableCell align="center">کاربر</TableCell>
                            <TableCell align="center">تاریخ سفارش</TableCell>
                            <TableCell align="center">جمع قیمت</TableCell>
                            <TableCell align="center">وضعیت پرداخت</TableCell>
                            <TableCell align="center">وضعیت ارسال</TableCell>
                            <TableCell align="center">جزئیات</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order._id}>
                              <TableCell align="center">
                                {order._id.substring(20, 24)}
                              </TableCell>
                              <TableCell align="center">
                                {order.user ? order.user.name : "کاربر حذف شده"}
                              </TableCell>
                              <TableCell align="center">
                                {order.createdAt}
                              </TableCell>
                              <TableCell align="center">
                                {numberWithCommas(order.totalPrice)} تومان
                              </TableCell>
                              <TableCell align="center">
                                {order.isPaid
                                  ? `در تاریخ ${order.paidAt} پرداخت شد`
                                  : "پرداخت نشده"}
                              </TableCell>
                              <TableCell align="center">
                                {order.isDelivered
                                  ? `در تاریخ ${order.deliveredAt} تحویل داده شد`
                                  : "تحویل داده نشده"}
                              </TableCell>
                              <TableCell align="center">
                                <NextLink href={`/order/${order._id}`} passHref>
                                  <Button variant="contained">جزئیات</Button>
                                </NextLink>
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
