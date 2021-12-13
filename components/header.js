import { useContext, useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Store } from "../context/Store";
import { BiMenu } from "react-icons/bi";

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const { cart, menuStatus } = state;

  const menuHandler = () => {
    dispatch({ type: "MENU" });
  };
  const closeMenuHandler = () => {
    dispatch({ type: "CLOSE_MENU" });
  };

  return (
    <Fragment>
      <header
        className="sticky top-0 left-0 bg-green-400 shadow-xl h-20 transition-all flex w-full"
        style={{ zIndex: 1 }}
      >
        <nav className="flex w-full relative justify-center items-center bg-gray-600">
          {/* <Menu /> */}
          <div
            className="w-full bg-green-400 top-20 absolute md:hidden duration-500 ease-in-out"
            style={{
              // transform: menuStatus ? `translateY(0%)` : `translateY(-100%)`,
              visibility: menuStatus ? "visible" : "hidden",
              opacity: menuStatus ? "1" : "0",
            }}
          >
            <ul onMouseLeave={closeMenuHandler}>
              <li className="p-1 m-1">
                <Link href="/">
                  <a className="block">خانه</a>
                </Link>
              </li>
              <li className="p-1 m-1">
                <Link href="/products">
                  <a className="block">فروشگاه</a>
                </Link>
              </li>
              <li className="p-1 m-1" onClick={closeMenuHandler}>
                <Link href="/products">
                  <a className="block">بلاگ</a>
                </Link>
              </li>
              <li className="p-1 m-1">
                <Link href="/cart">
                  <a className="block">
                    سبد خرید
                    {cart.cartItems.length > 0 && (
                      <span className="px-2 py-1 text-white bg-red-600 rounded-full">
                        {cart.cartItems.length}
                      </span>
                    )}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="w-3/4 flex items-center justify-between">
            <li className="p-3 mx-8  md:hidden block">
              <span onClick={menuHandler}>
                <BiMenu />
              </span>
            </li>
            <li className="p-3 mx-8 hidden md:block text-white">
              <Link href="/">
                <a>خانه</a>
              </Link>
            </li>
            <li className="mx-8 p-3 hidden md:block text-white">
              <Link href="/products">
                <a>فروشگاه</a>
              </Link>
            </li>
            <Link href="/">
              <h1 className="p-3 mx-8 text-2xl font-bold cursor-pointer text-green-300">
                فروشگاه اینترنتی
              </h1>
            </Link>
            <li className="p-3 mx-8  hidden md:block text-white">بلاگ</li>
            <li className="p-3 mx-8 hidden md:block text-white">
              <Link href="/cart">
                <a>
                  سبد خرید
                  {cart.cartItems.length > 0 && (
                    <span className="px-2 py-1 text-white bg-red-600 rounded-full">
                      {cart.cartItems.length}
                    </span>
                  )}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
