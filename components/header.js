import { useState, useContext, Fragment } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Store } from "../context/Store";
import { BiMenu } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import Switch from "./Switch";
import { Button, Menu, MenuItem, Link } from "@material-ui/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useStyles from "../utils/styles";

const Header = () => {
  const classes = useStyles();
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart, menuStatus, userInfo } = state;

  const menuHandler = () => {
    dispatch({ type: "MENU" });
  };
  const closeMenuHandler = () => {
    dispatch({ type: "CLOSE_MENU" });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    console.log(e.currentTarget);
    setAnchorEl(null);
    if (redirect !== "backdropClick") {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  return (
    <Fragment>
      <div className="font-serif sticky top-0 left-0 right-0 shadow-xl h-20 transition-all z-50">
        <header className="md:hidden bg-gray-600 shadow-xl dark:bg-indigo-900 flex justify-center items-center relative">
          <ul className="w-3/4 flex items-center justify-between">
            <li className="w-24 md:hidden block text-white">
              <span onClick={menuHandler}>
                <BiMenu fontSize="1.7rem" />
              </span>
            </li>
            <NextLink href="/">
              <Image
                src="/images/asset 12.svg"
                width={100}
                height={100}
                className="cursor-pointer"
              />
            </NextLink>
            <li className="text-white w-24 flex items-center justify-between">
              <div className="p-3 relative hover:text-green-400">
                <NextLink href="/cart">
                  <a>
                    <BsCart3 fontSize="1.3rem" />
                    {cart.cartItems.length > 0 && (
                      <div className="text-indigo-900 w-4 h-4 bg-gray-300 rounded-full absolute top-0 right-1 flex justify-center items-center text-xs">
                        {cart.cartItems.length}
                      </div>
                    )}
                  </a>
                </NextLink>
              </div>
              <div className="hover:text-green-400 flex justify-center items-center h-20">
                {userInfo ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={loginClickHandler}
                      className={classes.navbarButton}
                    >
                      {userInfo.name}
                    </Button>
                  </>
                ) : (
                  <NextLink href="/login" passHref>
                    <Link className={classes.navbarButton}>Login</Link>
                  </NextLink>
                )}
              </div>
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
                <NextLink href="/">
                  <a className="block px-5">خانه</a>
                </NextLink>
              </li>
              <hr className="border-gray-600" />
              <li
                className="p-2 hover:bg-green-500 h-10"
                onClick={closeMenuHandler}
              >
                <NextLink href="/products">
                  <a className="block px-5">فروشگاه</a>
                </NextLink>
              </li>
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
                <NextLink href="/">
                  <a>خانه</a>
                </NextLink>
              </li>
              <li className="mx-8 p-3 hidden md:block text-white text-xl hover:text-green-400 w-24 text-center">
                <NextLink href="/products">
                  <a>فروشگاه</a>
                </NextLink>
              </li>
              <NextLink href="/">
                <Image
                  src="/images/asset 12.svg"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
              </NextLink>
              <li className="mx-8 p-3 hidden md:flex justify-center items-center text-white text-xl hover:text-green-400 w-24">
                <Switch />
              </li>
              <li className="text-white w-24 flex items-center justify-between">
                <div className="p-3 relative hover:text-green-400">
                  <NextLink href="/cart">
                    <a>
                      <BsCart3 fontSize="1.3rem" />
                      {cart.cartItems.length > 0 && (
                        <div className="text-indigo-900 w-4 h-4 bg-green-400 rounded-full absolute top-0 right-1 flex justify-center items-center text-xs">
                          {cart.cartItems.length}
                        </div>
                      )}
                    </a>
                  </NextLink>
                </div>
                <div className="hover:text-green-400 flex justify-center items-center">
                  {userInfo ? (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={loginClickHandler}
                        className={classes.navbarButton}
                      >
                        {userInfo.name}
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={loginMenuCloseHandler}
                      >
                        <MenuItem
                          onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={(e) =>
                            loginMenuCloseHandler(e, "/order-history")
                          }
                        >
                          Order Hisotry
                        </MenuItem>
                        {userInfo.isAdmin && (
                          <MenuItem
                            onClick={(e) =>
                              loginMenuCloseHandler(e, "/admin/dashboard")
                            }
                          >
                            Admin Dashboard
                          </MenuItem>
                        )}
                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <NextLink href="/login" passHref>
                      <Link className={classes.navbarButton}>Login</Link>
                    </NextLink>
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
