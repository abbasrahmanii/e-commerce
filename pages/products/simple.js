import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
import { Box, Card, Grid, List, ListItem, Paper } from "@material-ui/core";
import { useContext } from "react";
import { Store } from "../../context/Store";
import { BsDot } from "react-icons/bs";
import { FiGift } from "react-icons/fi";

const simple = () => {
  const { state, dispatch } = useContext(Store);
  const { products } = state;

  const product = products[0];

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
          <List>
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
            <ListItem>
              <Grid container spacing={3}>
                <Grid item sm={4}>
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
                </Grid>
                <Grid item sm={4}>
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
                </Grid>
                <Grid item sm={4}>
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
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm={5}>
          <Card>
            <List>
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
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">نام محصول:</h4>
                  <p>{product.name}</p>
                </div>
              </ListItem>
              <ListItem>
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">دسته بندی:</h4>
                  <p>{product.category}</p>
                </div>
              </ListItem>
              <ListItem>
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">برند:</h4>
                  <p>{product.brand}</p>
                </div>
              </ListItem>
              <ListItem>
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">تعداد موجودی در انبار:</h4>
                  <p>{product.countInStock} عدد</p>
                </div>
              </ListItem>
              <ListItem>
                {product.freeDelivery ? (
                  <div className="flex items-center my-1">
                    <FiGift size={15} color="#2c9c16" />
                    <h4 className="mr-2 text-green-600 dark:text-green-300">
                      ارسال رایگان
                    </h4>
                  </div>
                ) : (
                  ""
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <List>
              <ListItem>
                <div className="flex mb-8">
                  <h4 className="ml-2">قیمت محصول:</h4>
                  <p>{numberWithCommas(product.price)} تومـان</p>
                </div>
              </ListItem>
              <ListItem>
                <button
                  className="bg-red-500 text-white p-2 focus:bg-red-600 rounded-lg"
                  onClick={addToCartHandler}
                >
                  افزودن به سبد خرید
                </button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default simple;
