import { BUY_PRODUCT } from "../action-type";
import { getAllProduct } from "../../data";

const allProduct = getAllProduct();

export const buyProductHandler = (id) => {
  return {
    type: BUY_PRODUCT,
    payload: {
      id,
      data: allProduct.find((event) => event.id === id),
    },
  };
};
