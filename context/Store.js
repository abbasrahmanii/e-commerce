import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
import { getAllProduct } from "../data";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    // shippingAddress: Cookies.get("shippingAddress")
    //   ? JSON.parse(Cookies.get("shippingAddress"))
    //   : {},
    shippingAddress: {},
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
  },
  // userInfo: Cookies.get("userInfo") ? Cookies.get("userInfo") : null,
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  menuStatus: false,
  checkbox: false,
  products: getAllProduct(),
  fiteredProducts: getAllProduct(),
  darkMode: Cookies.get("darkMode") ? Cookies.get("darkMode") : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "USER_LOGIN":
      return {
        ...state,
        userInfo: action.payload,
        cart: { cartItems: [] },
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    case "FILTER_LIST":
      if (action.payload.selectFilter === "") {
        if (action.payload.check === false) {
          const rangedProducts = state.products.filter(
            (p) => p.price >= action.payload.rangeValue
          );
          return {
            ...state,
            fiteredProducts: rangedProducts,
          };
        } else {
          const freeDeliveryProducts = state.products.filter(
            (p) => p.freeDelivery === true
          );
          const fiteredProducts = freeDeliveryProducts.filter(
            (p) => p.price >= action.payload.rangeValue
          );
          return {
            ...state,
            fiteredProducts,
          };
        }
      } else {
        if (action.payload.check === false) {
          const categoryFiltered = state.products.filter(
            (p) => p.category === action.payload.selectFilter
          );
          const fiteredProducts = categoryFiltered.filter(
            (p) => p.price >= action.payload.rangeValue
          );
          return {
            ...state,
            fiteredProducts,
          };
        } else {
          const filteredProducts = state.products.filter(
            (p) =>
              p.category === action.payload.selectFilter &&
              p.freeDelivery === true
          );
          const fiteredProducts = filteredProducts.filter(
            (p) => p.price >= action.payload.rangeValue
          );
          return {
            ...state,
            fiteredProducts,
          };
        }
      }
    case "USER_LOGIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "MENU":
      return {
        ...state,
        menuStatus: !state.menuStatus,
      };
    case "CLOSE_MENU":
      return {
        ...state,
        menuStatus: false,
      };
    case "DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
