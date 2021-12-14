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
  const remoteItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkOutHandler = () => {
    router.push("/shipping");
  };
  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1 className="p-4 m-2 text-3xl text-center">Shopping Cart</h1>
      {cart.cartItems.length === 0 ? (
        <div>
          Cart is Empty.{" "}
          <Link href="/">
            <a>Go to Home Page</a>
          </Link>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-3/4">
            <div className="w-full">
              <table className="table w-full">
                <thead className="table-header-group">
                  <tr className="table-row">
                    <th className="table-cell">Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
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
                            width={50}
                            height={50}
                          ></Image>
                        </Link>
                      </th>
                      <th>
                        <Link href={`/products/${item.id}`}>
                          <h1>{item.name}</h1>
                        </Link>
                      </th>
                      <th>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateCartHandler(item, e)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1} className="w-6">
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
                            onClick={() => remoteItemHandler(item)}
                          />
                        </span>
                        {/* <button
                          className="bg-red-500 py-1 px-4 rounded-md text-white"
                          onClick={() => remoteItemHandler(item)}
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
          <div className="flex items-center justify-around w-1/4 p-4 text-center bg-indigo-500">
            <div>
              <div>
                <h2 className="text-white">
                  جمع کل (
                  {numberWithCommas(
                    cart.cartItems.reduce((a, c) => a + c.quantity, 0)
                  )}{" "}
                  محصول) :
                  {numberWithCommas(
                    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                  )}
                  تومان
                </h2>
              </div>
              <div>
                <button
                  className="bg-white py-2 px-4 mt-6"
                  onClick={checkOutHandler}
                >
                  پرداخت
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
