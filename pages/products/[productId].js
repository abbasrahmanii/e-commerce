import Image from "next/image";
import NextLink from "next/link";
import Layout from "../../components/Layout";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Rating } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import { FiberManualRecord, LocalShipping, Reviews } from "@mui/icons-material";
import { getAllProduct, getProductById } from "../../data";
import { useRouter } from "next/router";
import RTL from "../../components/RTL";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import db from "../../utils/db";
import Product from "../../models/Product";
import { getError } from "../../utils/error";
import useStyles from "../../utils/styles";
import axios from "axios";

const ProductId = (props) => {
  const router = useRouter();
  const product = props.product;

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((item) => item.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      window.alert("متاسفانه محصول در انبار موجود نمی‌باشد.");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!product) {
    return (
      <Layout>
        <p>Invalid link</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <RTL>
        <Grid
          spacing={4}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item sm={4}>
            <ListItem>
              <Card>
                <List>
                  <ListItem>
                    <Image
                      src={product.image}
                      width={440}
                      height={440}
                      className="scale-100 hover:scale-110 duration-300"
                    />
                  </ListItem>
                </List>
              </Card>
            </ListItem>
            {product.otherImages && (
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item sm={4}>
                    <Card>
                      <List>
                        <ListItem>
                          <Image
                            src={product.otherImages[0]}
                            width={440}
                            height={440}
                            className="scale-100 hover:scale-110 duration-300"
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card>
                      <List>
                        <ListItem>
                          <Image
                            src={product.otherImages[1]}
                            width={440}
                            height={440}
                            className="scale-100 hover:scale-110 duration-300"
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item sm={4}>
                    <Card>
                      <List>
                        <ListItem>
                          <Image
                            src={product.otherImages[2]}
                            width={440}
                            height={440}
                            className="scale-100 hover:scale-110 duration-300"
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                </Grid>
              </ListItem>
            )}
          </Grid>
          <Grid item xs={5}>
            <ListItem>
              <NextLink href="/">
                <a className="text-blue-400">Home</a>
              </NextLink>
              <span className="mx-4">/</span>
              <NextLink href="/products">
                <a className="text-blue-400">{product.category}</a>
              </NextLink>
              <span className="mx-4">/</span>
              <NextLink href="/products">
                <a className="text-gray-500 pointer-events-none ">
                  {product.brand}
                </a>
              </NextLink>
            </ListItem>
            <ListItem>
              <Box>
                {" "}
                <FiberManualRecord fontSize="0.3rem" color="success" />
                <Typography variant="p" className="mx-2">
                  نام محصول:
                </Typography>
                <Typography variant="p" color="darkviolet">
                  {product.name}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <FiberManualRecord fontSize="0.3rem" color="success" />
                <Typography variant="p" className="mx-2">
                  دسته بندی:
                </Typography>
                <Typography variant="p">{product.category}</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <FiberManualRecord fontSize="0.3rem" color="success" />
                <Typography variant="p" className="mx-2">
                  برند:
                </Typography>
                <Typography variant="p">{product.brand}</Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <FiberManualRecord fontSize="0.3rem" color="success" />
                <Typography variant="p" className="mx-2">
                  امتیاز:
                </Typography>
                <Rating value={product.rating} readOnly></Rating>
                <NextLink href="#review">
                  <Link>({product.numReviews} دیدگاه)</Link>
                </NextLink>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <FiberManualRecord fontSize="0.3rem" color="success" />
                <Typography variant="p" className="mx-2">
                  تعداد موجودی در انبار:
                </Typography>
                <Typography variant="p">{product.countInStock} عدد</Typography>
              </Box>
            </ListItem>
            <ListItem>
              {product.isFreeDelivery ? (
                <Box>
                  <LocalShipping fontSize="0.3rem" color="success" />
                  <Typography variant="p" color="green" className="mr-2">
                    ارسال رایگان
                  </Typography>
                </Box>
              ) : (
                ""
              )}
            </ListItem>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>قیمت محصول:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {numberWithCommas(product.price)} تومان
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>وضعیت:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0
                          ? "در انبار موجود است"
                          : "تمام شده"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="info"
                    onClick={addToCartHandler}
                  >
                    افزودن به سبد خرید
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
        <List>
          <ListItem>
            <Typography name="reviews" id="reviews" variant="h4">
              دیدگاه های مشتریان
            </Typography>
          </ListItem>
          {reviews.length === 0 && <ListItem>بدون دیدگاه</ListItem>}
          {reviews.map((review) => (
            <ListItem key={review._id}>
              <Grid container>
                <Grid item className={classes.reviewItem}>
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <Typography>{review.createdAt.substring(0, 10)}</Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly></Rating>
                  <Typography>{review.comment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <ListItem>
            {userInfo ? (
              <form onSubmit={submitHandler} className={classes.reviewForm}>
                <List>
                  <ListItem>
                    <Typography variant="h4">دیدگاه خود را بنویسید</Typography>
                  </ListItem>
                  <ListItem>
                    <TextField
                      multiline
                      variant="outlined"
                      fullWidth
                      name="review"
                      label="نظرات"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      ثبت دیدگاه
                    </Button>

                    {loading && <CircularProgress></CircularProgress>}
                  </ListItem>
                </List>
              </form>
            ) : (
              <Typography variant="h2">
                Please{" "}
                <Link href={`/login?redirect=/product/${product.slug}`}>
                  login
                </Link>{" "}
                to write a review
              </Typography>
            )}
          </ListItem>
        </List>
      </RTL>
    </Layout>
  );
};

// export async function getStaticProps(context) {
//   const productId = context.params.productId;
//   const product = await getProductById(productId);
//   return {
//     props: {
//       product,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const allProduct = getAllProduct();
//   const paths = allProduct.map((product) => ({
//     params: { productId: product.id },
//   }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// }

export async function getServerSideProps(context) {
  const { params } = context;
  const { productId } = params;
  await db.connect();
  const product = await Product.findOne({ productId }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

export default ProductId;
