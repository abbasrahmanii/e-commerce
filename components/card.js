import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Fragment, useContext } from "react";
import { Store } from "../context/Store";

const Card = (props) => {
  const { id, name, price, image, freeDelivery } = props.product;
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { products, cart } = state;

  const product = products.find((item) => item.id === id);

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
  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Fragment>
      <li className="flex flex-col justify-between p-4 dark:bg-indigo-300 rounded-lg shadow-xl dark:hover:bg-indigo-400 bg-indigo-500 hover:bg-indigo-600 w-64">
        <Link href={`products/${id}`}>
          <a>
            <Image
              src={image}
              width={250}
              height={250}
              className="rounded-lg"
            />
            <h3 className="my-2 text-indigo-50 dark:text-black">{name}</h3>
            <p className="my-2 text-indigo-50 dark:text-black">
              {numberWithCommas(price)} تـومـان
            </p>
            {freeDelivery ? (
              <div className="my-2">
                <h5 className="text-sm dark:text-yellow-900 text-red-200">
                  ارسال رایگان
                </h5>
              </div>
            ) : (
              ""
            )}
          </a>
        </Link>
        <button
          className="text-base dark:bg-gray-700 dark:text-white p-2 dark:hover:bg-gray-600 dark:focus:bg-gray-500 rounded-lg bg-gray-300 text-dark hover:bg-gray-200 focus:bg-gray-100"
          onClick={addToCartHandler}
        >
          افزودن به سبد خرید
        </button>
      </li>
    </Fragment>
  );
};

export default Card;
