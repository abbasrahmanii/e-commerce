import { useContext } from "react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Store } from "../context/Store";
import Layout from "../components/layout";
import {
  IconButton,
  Link,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CartPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, products } = state;

  const updateCartHandler = (item, e) => {
    const product = products.find((product) => product.id === item.id);
    const quantity = +e.target.value;

    if (product.countInStock < quantity) {
      window.alert("متاسفانه محصول در انبار موجود نمی‌باشد.");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
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
      <Layout>
        <div>
          <h1 className="p-4 m-6 text-3xl text-center dark:text-white">
            Shopping Cart
          </h1>
          <div className="flex flex-col justify-center items-center p-6 dark:text-white">
            سبد خرید شما خالـی است.{" "}
            <NextLink href="/products">
              <a className="mt-3 text-blue-600 dark:text-blue-400">
                به فروشگاه بروید.
              </a>
            </NextLink>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div className="flex w-full pb-36 flex-wrap">
          <div className="w-full md:w-3/4 mt-6">
            <div className="w-full">
              {/* <table className="table w-full">
                <thead className="table-header-group">
                  <tr className="table-row h-20 font-serif dark:text-white">
                    <th className="hidden md:table-cell">تصویر</th>
                    <th>نام محصول</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>حذف </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item) => (
                    <tr key={item.id}>
                      <th className="hidden md:table-cell">
                        <NextLink href={`/products/${item.id}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="cursor-pointer"
                          ></Image>
                        </NextLink>
                      </th>
                      <th>
                        <NextLink href={`/products/${item.id}`}>
                          <h1 className="font-mono cursor-pointer dark:text-indigo-50">
                            {item.name}
                          </h1>
                        </NextLink>
                      </th>
                      <th>
                        {/* <select
                          value={item.quantity}
                          onChange={(e) => updateCartHandler(item, e)}
                          className="cursor-pointer bg-indigo-400 text-white dark:text-black dark:bg-indigo-100 focus:outline-none"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1} className="w-6">
                              {x + 1}
                            </option>
                          ))}
                        </select> */}
              {/* <TextField
                          select
                          variant="outlined"
                          // label="دسته بندی"

                          value={item.quantity}
                          onChange={(e) => updateCartHandler(item, e)}
                          color="primary"
                          // className={classes.select}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1} className="w-6">
                              {x + 1}
                            </MenuItem>
                          ))}
                        </TextField>
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
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table> */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">تصویر</TableCell>
                      <TableCell align="center">نام محصول</TableCell>
                      <TableCell align="center">تعداد</TableCell>
                      <TableCell align="center">قیمت</TableCell>
                      <TableCell align="center">حذف</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell align="center">
                          <NextLink href={`/products/${item.id}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="center">
                          <NextLink href={`products/${item.id}`} passHref>
                            <Link>
                              <Typography>{item.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            select
                            variant="outlined"
                            value={item.quantity}
                            onChange={(e) => updateCartHandler(item, e)}
                            color="primary"
                            // className={classes.select}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem
                                key={x + 1}
                                value={x + 1}
                                className="w-6"
                              >
                                {x + 1}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {numberWithCommas(item.price)} تومان
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => removeItemHandler(item)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="flex items-start justify-center w-full md:w-1/4 p-4 text-center mt-8">
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
                      cart.cartItems.reduce(
                        (a, c) => a + c.quantity * c.price,
                        0
                      )
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
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 2000,
  };
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
// export default CartPage;
