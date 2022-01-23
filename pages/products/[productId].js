import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Button, Card, Grid, List, ListItem, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Store } from "../../context/Store";
import { FiberManualRecord, LocalShipping } from "@mui/icons-material";
import { BsDot } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import { getAllProduct, getProductById } from "../../data";
import { useRouter } from "next/router";
import RTL from "../../components/RTL";
import { Box } from "@mui/system";

const ProductId = (props) => {
  const router = useRouter();
  const product = props.selectedProduct;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

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

  const selectImageHandler = (e) => {
    console.log(e.target);
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
            <Link href="/">
              <a className="text-blue-400">Home</a>
            </Link>
            <span className="mx-4">/</span>
            <Link href="/products">
              <a className="text-blue-400">{product.category}</a>
            </Link>
            <span className="mx-4">/</span>
            <Link href="/products">
              <a className="text-gray-500 pointer-events-none ">
                {product.brand}
              </a>
            </Link>
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
              {" "}
              <FiberManualRecord fontSize="0.3rem" color="success" />
              <Typography variant="p" className="mx-2">
                دسته بندی:
              </Typography>
              <Typography variant="p">{product.category}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <Box>
              {" "}
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
                تعداد موجودی در انبار:
              </Typography>
              <Typography variant="p">{product.countInStock} عدد</Typography>
            </Box>
          </ListItem>
          <ListItem>
            {product.freeDelivery ? (
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
          <RTL>
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
          </RTL>
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductById(productId);
  return {
    props: {
      selectedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const allProduct = getAllProduct();
  const paths = allProduct.map((product) => ({
    params: { productId: product.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export default ProductId;
