import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import Rating from "@mui/lab/Rating";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <Card>
      <NextLink href={`/products/${product.id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>{product.price} تومان</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          افزودن به سبد خرید
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
