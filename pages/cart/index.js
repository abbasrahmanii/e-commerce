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
        <div>
          Cart is Empty.{" "}
          <Link href="/products">
            <a>Go to Shop</a>
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
                <tr className="table-row h-20 font-serif">
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
                        ></Image>
                      </Link>
                    </th>
                    <th>
                      <Link href={`/products/${item.id}`}>
                        <h1 className="font-mono">{item.name}</h1>
                      </Link>
                    </th>
                    <th>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartHandler(item, e)}
                        className="cursor-pointer bg-indigo-100"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            className="w-6 bg-indigo-50"
                          >
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th>{numberWithCommas(item.price)} تومان</th>
                    <th className="">
                      <span className="flex justify-center items-center">
                        <RiDeleteBinLine
                          color="red"
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
        <div className="flex items-start justify-center w-1/4 p-4 text-center">
          <div className="">
            <div className="bg-indigo-100 p-6 rounded-lg">
              <div className="flex flex-col items-start space-y-4">
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
                  className="bg-gray-700 text-white p-2 hover:bg-gray-600 focus:bg-gray-500 rounded-lg py-2 px-4 mt-6"
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
