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
  CardContent,
  CardActions,
} from "@mui/material";
import { getError } from "../../utils/error";
import { Store } from "../../context/Store";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Chart as ChartJS, defaults } from "chart.js";
import RTL from "../../components/RTL";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminProdcuts() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`, {
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
                  <ListItem selected button component="a">
                    <ListItemText primary="?????????????? ??????????"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/orders" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="?????????? ????"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/admin/products" passHref>
                  <ListItem button component="a">
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
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography className={classes.error}>{error}</Typography>
                  ) : (
                    <Grid container spacing={5}>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant="h4">
                              {numberWithCommas(summary.ordersPrice)} ??????????
                            </Typography>
                            <Typography>????????</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink href="/admin/orders" passHref>
                              <Button size="small" color="primary">
                                ?????????? ???????? ????
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant="h4">
                              {summary.ordersCount}
                            </Typography>
                            <Typography>??????????</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink href="/admin/orders" passHref>
                              <Button size="small" color="primary">
                                ?????????? ?????????? ????
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant="h4">
                              {summary.productsCount}
                            </Typography>
                            <Typography>??????????</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink href="/admin/products" passHref>
                              <Button size="small" color="primary">
                                ?????????? ??????????????
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant="h4">
                              {summary.usersCount}
                            </Typography>
                            <Typography>??????????</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink href="/admin/users" passHref>
                              <Button size="small" color="primary">
                                ?????????? ??????????????
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                    </Grid>
                  )}
                </ListItem>
                <ListItem>
                  <Typography component="h1" variant="h4">
                    ???????????? ????????
                  </Typography>
                </ListItem>
                <ListItem>
                  <Bar
                    data={{
                      labels: summary.salesData.map((x) => x._id),
                      datasets: [
                        {
                          label: "Sales",
                          backgroundColor: "rgba(162, 222, 208, 1)",
                          data: summary.salesData.map((x) => x.totalSales),
                        },
                      ],
                    }}
                    options={{
                      legend: { display: true, position: "right" },
                    }}
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </RTL>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminProdcuts), { ssr: false });
