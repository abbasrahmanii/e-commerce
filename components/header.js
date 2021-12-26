import { useContext, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../context/Store";
import { BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import Switch from "./switch";

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
      <div className="font-serif sticky top-0 left-0 shadow-xl h-20 transition-all z-50">
        <header className="md:hidden bg-gray-600 shadow-xl dark:bg-indigo-900 flex justify-center items-center relative h-20">
          <ul className="w-3/4 flex items-center justify-between">
            <li className="p-3 mx-8 md:hidden block text-white">
              <span onClick={menuHandler}>
                <BiMenu fontSize="1.7rem" />
              </span>
            </li>
            <li className="p-3 mx-8 hidden md:block text-white text-xl hover:text-green-400 w-18">
              <Link href="/">
                <a>خانه</a>
              </Link>
            </li>
            <li className="mx-8 p-3 hidden md:block text-white text-xl hover:text-green-400 w-18">
              <Link href="/products">
                <a>فروشگاه</a>
              </Link>
            </li>
            <Link href="/">
              <Image src="/images/asset 12.svg" width={100} height={100} />
            </Link>
            <li className="mx-8 p-3 hidden md:flex md:items-center text-white text-xl hover:text-green-400 w-18 ">
              <Switch />
            </li>
            <li className="p-3 mx-8 text-white relative hover:text-green-400 w-18">
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
          <div
            className="w-full top-20 absolute md:hidden duration-500 ease-in-out bg-green-600"
            style={{
              visibility: menuStatus ? "visible" : "hidden",
              opacity: menuStatus ? "1" : "0",
            }}
          >
            <ul onMouseLeave={closeMenuHandler}>
              <li className="p-2 hover:bg-green-500" onClick={closeMenuHandler}>
                <Link href="/">
                  <a className="block px-5">خانه</a>
                </Link>
              </li>
              <hr className="border-gray-600" />
              <li className="p-2 hover:bg-green-500" onClick={closeMenuHandler}>
                <Link href="/products">
                  <a className="block px-5">فروشگاه</a>
                </Link>
              </li>
              <hr className="border-gray-600" />
              <li className="p-2 hover:bg-green-500" onClick={closeMenuHandler}>
                <Link href="/products">
                  <a className="block px-5">بلاگ</a>
                </Link>
              </li>
              <hr className="border-gray-600" />
              <li className="p-2 hover:bg-green-500">
                <div className="block px-5">
                  <Switch />
                </div>
              </li>
            </ul>
          </div>
        </header>
        <header className="hidden md:flex justify-center items-center">
          <nav className="flex w-full relative justify-center items-center bg-gray-600 shadow-xl dark:bg-indigo-900">
            <ul className="w-3/4 flex items-center justify-between">
              <li className="p-3 mx-8 md:hidden block text-white">
                <span onClick={menuHandler}>
                  <BiMenu fontSize="1.7rem" />
                </span>
              </li>
              <li className="p-3 mx-8 hidden md:block text-white text-xl hover:text-green-400 w-18">
                <Link href="/">
                  <a>خانه</a>
                </Link>
              </li>
              <li className="mx-8 p-3 hidden md:block text-white text-xl hover:text-green-400 w-18">
                <Link href="/products">
                  <a>فروشگاه</a>
                </Link>
              </li>
              <Link href="/">
                <Image src="/images/asset 12.svg" width={100} height={100} />
              </Link>
              <li className="mx-8 p-3 hidden md:flex md:items-center text-white text-xl hover:text-green-400 w-18 ">
                <Switch />
              </li>
              <li className="p-3 mx-8 text-white relative hover:text-green-400 w-18">
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
      </div>
    </Fragment>
  );
};

export default Header;
