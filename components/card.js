import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useContext } from "react";
import { Store } from "../context/Store";

const Card = (props) => {
  const { id, name, price, image } = props;
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
  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col justify-between w-1/4 p-4 bg-indigo-200 rounded-lg shadow-xl hover:bg-indigo-300">
      <Link href={`products/${id}`}>
        <a>
          {/* <div className="text-center w-full rounded-lg h-52 bg-green-700 mx-auto flex items-center justify-center text-white">
            image c
          </div> */}
          <Image src={image} width={250} height={250} className="rounded-lg" />
          <h3 className="my-2">{name}</h3>
          <p className="my-2">{numberWithCommas(price)} تـومـان</p>
        </a>
      </Link>
      <button
        className="bg-gray-700 text-white p-2 hover:bg-gray-600 focus:bg-gray-500 rounded-lg"
        onClick={addToCartHandler}
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default Card;
