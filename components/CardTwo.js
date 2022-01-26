import Link from "next/link";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Rating } from "@mui/lab";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../context/Store";
import useStyles from "../utils/styles";

const CartTwo = ({ product }) => {
  const { id, name, price, image, isFreeDelivery } = product;
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
        <CardActionArea className="p-2">
          <CardMedia
            className="p-5"
            component="img"
            alt={name}
            height="120"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography component="p" className={classes.cartText}>
              {name}
            </Typography>
            <Typography>{numberWithCommas(price)} تـومـان</Typography>
            {isFreeDelivery ? (
              <Typography
                component="p"
                className={classes.cartText}
                color="darkgreen"
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
            <Rating value={product.rating} readOnly></Rating>
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
