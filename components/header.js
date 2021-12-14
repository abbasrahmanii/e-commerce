import { useContext, useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Store } from "../context/Store";
import { BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";

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
        className="font-serif sticky top-0 left-0 bg-green-400 shadow-xl h-20 transition-all flex w-full"
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
                  <a className="block px-5">خانه</a>
                </Link>
              </li>
              <hr className="border-gray-600" />
              <li className="p-1 m-1">
                <Link href="/products">
                  <a className="block px-5">فروشگاه</a>
                </Link>
              </li>
              <hr className="border-gray-600" />
              <li className="p-1 m-1" onClick={closeMenuHandler}>
                <Link href="/products">
                  <a className="block px-5">بلاگ</a>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="w-3/4 flex items-center justify-between">
            <li className="p-3 mx-8 md:hidden block text-white">
              <span onClick={menuHandler}>
                <BiMenu fontSize="1.7rem" />
              </span>
            </li>
            <li className="p-3 mx-8 hidden md:block text-white text-xl hover:text-green-400">
              <Link href="/">
                <a>خانه</a>
              </Link>
            </li>
            <li className="mx-8 p-3 hidden md:block text-white text-xl hover:text-green-400">
              <Link href="/products">
                <a>فروشگاه</a>
              </Link>
            </li>
            <Link href="/">
              <h1 className="p-3 mx-8 text-2xl font-bold cursor-pointer text-green-300">
                فروشگاه اینترنتی
              </h1>
            </Link>
            <li className="p-3 mx-8  hidden md:block text-white text-xl hover:text-green-400">
              بلاگ
            </li>
            <li className="p-3 mx-8 text-white relative hover:text-green-400">
              <Link href="/cart">
                <a>
                  <BsCart3 fontSize="1.3rem" />
                  {cart.cartItems.length > 0 && (
                    <div className="text-indigo-900 w-4 h-4 bg-gray-300 rounded-full absolute top-0 right-1 flex justify-center items-center text-xs">
                      {cart.cartItems.length}
                    </div>
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
