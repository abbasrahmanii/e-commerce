import { useState, useContext, Fragment } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Store } from "../context/Store";
import Switch from "./Switch";
import {
  Button,
  Menu,
  IconButton,
  Badge,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { FiLogIn } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useStyles from "../utils/styles";
import RTL from "./RTL";
import Dropdown from "./Dropdown";

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
    dispatch({ type: "CLOSE_MENU" });
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
        <header className="md:hidden bg-gray-600 shadow-xl dark:bg-indigo-900 flex justify-center items-center relative h-20">
          <ul className="w-3/4 flex items-center justify-between">
            <li className="w-24 md:hidden block text-white">
              {/* <span onClick={menuHandler}>
                <BiMenu fontSize="1.7rem" />
              </span> */}
              <IconButton onClick={menuHandler} color="inherit">
                <MenuIcon
                // color="#fff"
                // sx={{ color: green[100] }}
                />
              </IconButton>
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
                    <Badge
                      badgeContent={cart.cartItems.length}
                      color="error"
                      className="hover:text-green-400"
                    >
                      <ShoppingCartIcon color="#fff" titleAccess="سبد خرید" />
                    </Badge>
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
                      {userInfo.name.split(" ", 1)}
                    </Button>
                  </>
                ) : (
                  <NextLink href="/login">
                    <a>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        className="hover:text-green-800"
                      >
                        <FiLogIn color="#fff" title="ورود / ثبت نام" />
                      </IconButton>
                    </a>
                  </NextLink>
                )}
              </div>
            </li>
          </ul>
          <div
            className="w-full top-20 absolute md:hidden duration-500 ease-in-out bg-green-500 dark:bg-green-400 text-white dark:text-black"
            style={{
              visibility: menuStatus ? "visible" : "hidden",
              opacity: menuStatus ? "1" : "0",
            }}
          >
            <List
              component="nav"
              aria-label="main mailbox folders"
              onMouseLeave={closeMenuHandler}
            >
              <ListItem button onClick={(e) => loginMenuCloseHandler(e, "/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText secondary="خانه" color="" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={(e) => loginMenuCloseHandler(e, "/products")}
              >
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText secondary="فروشگاه" />
              </ListItem>
            </List>
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
                {/* <Switch /> */}
                <Dropdown />
              </li>
              <li className="text-white w-24 flex items-center justify-between">
                <NextLink href="/cart">
                  <a>
                    <Badge
                      badgeContent={cart.cartItems.length}
                      color="error"
                      className="hover:text-green-400"
                    >
                      <ShoppingCartIcon color="#fff" titleAccess="سبد خرید" />
                    </Badge>
                  </a>
                </NextLink>
                {/* </div> */}
                <div className="hover:text-green-400 flex justify-center items-center">
                  {userInfo ? (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={loginClickHandler}
                        className={classes.navbarButton}
                      >
                        {userInfo.name.split(" ", 1)}
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={loginMenuCloseHandler}
                      >
                        <RTL>
                          <List
                            component="nav"
                            aria-label="main mailbox folders"
                            // dir="ltr"
                          >
                            <ListItem
                              button
                              onClick={(e) =>
                                loginMenuCloseHandler(e, "/profile")
                              }
                            >
                              <ListItemIcon>
                                <AccountCircleIcon />
                              </ListItemIcon>
                              <ListItemText primary="پروفایل" />
                            </ListItem>
                            <Divider />
                            <ListItem
                              button
                              onClick={(e) =>
                                loginMenuCloseHandler(e, "/order-history")
                              }
                            >
                              <ListItemIcon>
                                <ShoppingBasketIcon />
                              </ListItemIcon>
                              <ListItemText primary="تاریخچه سفارش ها" />
                            </ListItem>
                            <Divider />
                            {userInfo.isAdmin && (
                              <>
                                <ListItem
                                  button
                                  onClick={(e) =>
                                    loginMenuCloseHandler(e, "/admin/dashboard")
                                  }
                                >
                                  <ListItemIcon>
                                    <DashboardIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="داشبورد ادمین" />
                                </ListItem>
                                <Divider />
                              </>
                            )}
                            <ListItem button onClick={logoutClickHandler}>
                              <ListItemIcon>
                                <ExitToAppIcon />
                              </ListItemIcon>
                              <ListItemText primary="خروج" />
                            </ListItem>
                          </List>
                        </RTL>
                      </Menu>
                    </>
                  ) : (
                    <NextLink href="/login">
                      <a>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          className="hover:text-green-800"
                        >
                          <FiLogIn color="#fff" title="ورود / ثبت نام" />
                        </IconButton>
                      </a>
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
