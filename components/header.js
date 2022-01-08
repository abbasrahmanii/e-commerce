import { useContext, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../context/Store";
import { BiMenu } from "react-icons/bi";
import {
  BsCart3,
  BsFillPersonFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import Switch from "./switch";
import { useSession, signIn } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

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
            <Link href="/">
              <Image src="/images/asset 12.svg" width={100} height={100} />
            </Link>
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
            className="w-full top-20 absolute md:hidden duration-500 ease-in-out bg-green-600 dark:bg-green-400 text-white dark:text-black"
            style={{
              visibility: menuStatus ? "visible" : "hidden",
              opacity: menuStatus ? "1" : "0",
            }}
          >
            <ul onMouseLeave={closeMenuHandler}>
              <li
                className="p-2 hover:bg-green-500 h-10"
                onClick={closeMenuHandler}
              >
                <Link href="/">
                  <a className="block px-5">خانه</a>
                </Link>
              </li>
              <hr className="border-gray-600" />
              <li
                className="p-2 hover:bg-green-500 h-10"
                onClick={closeMenuHandler}
              >
                <Link href="/products">
                  <a className="block px-5">فروشگاه</a>
                </Link>
              </li>
              {/* <hr className="border-gray-600" />
              <li
                className="p-2 hover:bg-green-500 h-10"
                onClick={closeMenuHandler}
              >
                <Link href="/products">
                  <a className="block px-5">بلاگ</a>
                </Link>
              </li> */}
              <hr className="border-gray-600" />
              <li className="p-2 hover:bg-green-500 h-10 flex items-center">
                <div className="flex items-center px-5">
                  <Switch />
                </div>
              </li>
            </ul>
          </div>
        </header>
        <header className="hidden md:flex justify-center items-center shadow-2xl">
          <nav className="flex w-full relative justify-center items-center bg-gray-600 shadow-xl dark:bg-indigo-900">
            <ul className="w-3/4 flex items-center justify-between">
              <li className="p-3 mx-8 hidden md:block text-white text-xl hover:text-green-400 w-24 text-center">
                <Link href="/">
                  <a>خانه</a>
                </Link>
              </li>
              <li className="mx-8 p-3 hidden md:block text-white text-xl hover:text-green-400 w-24 text-center">
                <Link href="/products">
                  <a>فروشگاه</a>
                </Link>
              </li>
              <Link href="/">
                <Image src="/images/asset 12.svg" width={100} height={100} />
              </Link>
              <li className="mx-8 p-3 hidden md:flex justify-center items-center text-white text-xl hover:text-green-400 w-24">
                <Switch />
              </li>
              <li className="text-white w-24 flex items-center justify-between">
                <div className="p-3 relative hover:text-green-400">
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
                </div>
                <div className="hover:text-green-400">
                  {session ? (
                    <Link href="/profile">
                      <a title={session.user.name}>
                        <BsFillPersonFill fontSize="1.3rem" />
                      </a>
                    </Link>
                  ) : (
                    <BsFillPersonPlusFill
                      fontSize="1.3rem"
                      onClick={() => signIn()}
                      className="cursor-pointer"
                      title="Sign in"
                    />
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </Fragment>
  );
};

export default Header;
