import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
import { getAllProduct } from "../data";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  products: getAllProduct(),
  menuStatus: false,
  checkbox: false,
  fiteredProducts: getAllProduct(),
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
    case "FILTER_LIST":
      if (action.payload.filter === "") {
        if (action.payload.check === false) {
          return {
            ...state,
            fiteredProducts: state.products,
          };
        } else {
          const updated = state.products.filter((p) => p.freeDelivery === true);
          return {
            ...state,
            fiteredProducts: updated,
          };
        }
      } else {
        if (action.payload.check === false) {
          const updated = state.products.filter(
            (p) => p.category === action.payload.filter
          );
          return {
            ...state,
            fiteredProducts: updated,
          };
        } else {
          const updated = state.products.filter(
            (p) =>
              p.category === action.payload.filter && p.freeDelivery === true
          );
          return {
            ...state,
            fiteredProducts: updated,
          };
        }
      }
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
    case "USER_LOGIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
