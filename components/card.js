import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useContext } from "react";
import { Store } from "../context/Store";
import loadConfig from "next/dist/server/config";

const Card = (props) => {
  const { id, name, image, price } = props;
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { products, cart } = state;

  const product = products.find((item) => item.id === id);

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((item) => item.id === id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <div className="flex flex-col justify-between w-1/4 h-64 p-4 bg-indigo-200 rounded-lg shadow-xl">
      <div className="text-center">image c</div>
      <div className="flex flex-col">
        <h3>{name}</h3>
        <p>{price} تـومـان</p>
        <div className="flex justify-between gap-2">
          <Link href={`products/${id}`}>
            <a className="inline-block p-2 m-2 mx-auto text-sm text-white bg-yellow-600">
              توضیحات بیشتر
            </a>
          </Link>
          <button
            className="inline-block p-2 m-2 mx-auto text-sm bg-green-600"
            onClick={addToCartHandler}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
