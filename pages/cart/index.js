import { useContext } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Store } from "../../context/Store";
import { RiDeleteBinLine } from "react-icons/ri";

const CartPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, products } = state;

  const updateCartHandler = (item, e) => {
    const product = products.find((product) => product.id === item.id);
    const quantity = +e.target.value;

    if (product.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };
  const removeItemHandler = (item) => {
    // setTimeout(() => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    // }, 1000);
  };
  const checkOutHandler = () => {
    router.push("/shipping");
  };
  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (cart.cartItems.length === 0) {
    return (
      <div>
        <h1 className="p-4 m-2 text-3xl text-center">Shopping Cart</h1>
        <div className="flex flex-col justify-center items-center p-6">
          سبد خرید شما خالـی است.{" "}
          <Link href="/products">
            <a className="mt-3 text-blue-600">به فروشگاه بروید.</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex w-full">
        <div className="w-3/4">
          <div className="w-full">
            <table className="table w-full">
              <thead className="table-header-group">
                <tr className="table-row h-20 font-serif dark:text-white">
                  <th className="table-cell">تصویر</th>
                  <th>نام محصول</th>
                  <th>تعداد</th>
                  <th>قیمت</th>
                  <th>حذف </th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.id}>
                    <th>
                      <Link href={`/products/${item.id}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="cursor-pointer"
                        ></Image>
                      </Link>
                    </th>
                    <th>
                      <Link href={`/products/${item.id}`}>
                        <h1 className="font-mono cursor-pointer dark:text-indigo-50">
                          {item.name}
                        </h1>
                      </Link>
                    </th>
                    <th>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartHandler(item, e)}
                        className="cursor-pointer bg-indigo-400 text-white dark:text-black dark:bg-indigo-100 focus:outline-none"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1} className="w-6">
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th className="dark:text-indigo-50">
                      {numberWithCommas(item.price)} تومان
                    </th>
                    <th>
                      <span className="flex justify-center items-center text-red-600 dark:text-red-200">
                        <RiDeleteBinLine
                          // color="red"
                          fontSize="1.2rem"
                          cursor="pointer"
                          onClick={() => removeItemHandler(item)}
                        />
                      </span>
                      {/* <button
                          className="bg-red-500 py-1 px-4 rounded-md text-white"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </button> */}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-start justify-center w-1/4 p-4 text-center ">
          <div className="">
            <div className="dark:bg-indigo-200 p-6 rounded-lg bg-indigo-500">
              <div className="flex flex-col items-start space-y-4 text-indigo-50 dark:text-black">
                <p>
                  تعداد محصولات:{" "}
                  {numberWithCommas(
                    cart.cartItems.reduce((a, c) => a + c.quantity, 0)
                  )}
                </p>
                <p>
                  جمع کل:{" "}
                  {numberWithCommas(
                    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                  )}{" "}
                  تومان
                </p>
              </div>
              <div>
                <button
                  className="dark:bg-gray-700 dark:text-white p-2 dark:hover:bg-gray-600 dark:focus:bg-gray-500 rounded-lg py-2 px-4 mt-6 bg-gray-300 text-indigo-900"
                  onClick={checkOutHandler}
                >
                  پرداخت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
// export default CartPage;
