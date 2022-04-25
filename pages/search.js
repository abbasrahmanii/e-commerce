import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { CancelIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import useStyles from "../utils/styles";
import ProductItem from "../components/ProductItem";
import { Store } from "../context/Store";
import axios from "axios";
import { Rating, Pagination } from "@mui/material";
import RTL from "../components/RTL";
import CardTwo from "../components/CardTwo";

const PAGE_SIZE = 3;

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

const Search = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;
  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout>
      <RTL>
        <Grid className={classes.mt1} container spacing={1}>
          <Grid item md={3}>
            <List>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>دسته بندی ها</Typography>
                  <Select fullWidth value={category} onChange={categoryHandler}>
                    <MenuItem value="all">همه</MenuItem>
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>برند ها</Typography>
                  <Select value={brand} onChange={brandHandler} fullWidth>
                    <MenuItem value="all">همه</MenuItem>
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>قیمت ها</Typography>
                  <Select value={price} onChange={priceHandler} fullWidth>
                    <MenuItem value="all">همه</MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price.value} value={price.value}>
                        {price.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className={classes.fullWidth}>
                  <Typography>امتیازات</Typography>
                  <Select value={rating} onChange={ratingHandler} fullWidth>
                    <MenuItem value="all">همه</MenuItem>
                    {ratings.map((rating) => (
                      <MenuItem dispaly="flex" key={rating} value={rating}>
                        <Rating value={rating} readOnly />
                        <Typography component="span">و بالاتر</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={9}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {products.length === 0 ? "بدون" : countProducts} نتیجه
                {query !== "all" && query !== "" && " : " + query}
                {category !== "all" && " : " + category}
                {brand !== "all" && " : " + brand}
                {price !== "all" && " : قیمت " + price}
                {rating !== "all" && " : امتیاز " + rating + " و بالاتر"}
                {(query !== "all" && query !== "") ||
                category !== "all" ||
                brand !== "all" ||
                rating !== "all" ||
                price !== "all" ? (
                  <Button onClick={() => router.push("/search")}>
                    <CancelIcon />
                  </Button>
                ) : null}
              </Grid>
              <Grid item>
                <Typography component="span" className={classes.sort}>
                  مرتب سازی بر اساس
                </Typography>
                <Select value={sort} onChange={sortHandler}>
                  <MenuItem value="featured">ویژه ترین</MenuItem>
                  <MenuItem value="lowest">ارزان ‌ترین</MenuItem>
                  <MenuItem value="highest">گران ‌ترین</MenuItem>
                  <MenuItem value="toprated">پربازدید ترین</MenuItem>
                  <MenuItem value="newest">جدید ترین</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid className={classes.mt1} container spacing={3}>
              {products.map((product) => (
                <Grid item md={4} key={product.name}>
                  <CardTwo key={product.id} product={product} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              className={classes.mt1}
              defaultPage={parseInt(query.page || "1")}
              count={pages}
              onChange={pageHandler}
            ></Pagination>
          </Grid>
        </Grid>
      </RTL>
    </Layout>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const brands = await Product.find().distinct("brand");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
