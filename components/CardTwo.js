import Link from "next/link";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../context/Store";
import useStyles from "../utils/styles";

const CartTwo = ({ product }) => {
  const { id, name, price, image, freeDelivery } = product;
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const classes = useStyles();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((item) => item.id === id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      window.alert("متاسفانه محصول در انبار موجود نمی‌باشد.");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };
  const cartActionHandler = () => {
    router.push(`/products/${id}`);
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card elevation={8}>
      <Link href={`/products/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography component="p" className={classes.cartText}>
              {name}
            </Typography>
            <Typography>{numberWithCommas(price)} تـومـان</Typography>
            {freeDelivery ? (
              <Typography
                component="p"
                className={classes.cartText}
                color="secondary"
              >
                ارسال رایگان
              </Typography>
            ) : (
              <Typography component="p" className={classes.cartText}>
                <br />
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" component="p">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.cardAction}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={addToCartHandler}
        >
          افزودن به سبد خرید
        </Button>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={cartActionHandler}
        >
          توضیحات
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartTwo;
