// import { getAllProduct } from "../../data";
import { BUY_PRODUCT } from "../action-type";

// const dataArray = getAllProduct();

const initialState = {
  numOfProduct: 4,
  data: [
    {
      id: "p1",
      title: "shoes",
      price: "139988",
      image: "image/asset21.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p2",
      title: "book",
      price: "148988",
      image: "image/asset22.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p3",
      title: "watch",
      price: "126988",
      image: "/image/asset23.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p4",
      title: "shirt",
      price: "19988",
      image: "image/asset24.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p5",
      title: "carpet",
      price: "239938",
      image: "image/asset28.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p6",
      title: "knife",
      price: "69988",
      image: "image/asset30.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p7",
      title: "fan",
      price: "72988",
      image: "image/asset32.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p8",
      title: "bag",
      price: "14988",
      image: "image/asset33.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
    {
      id: "p9",
      title: "spray",
      price: "139988",
      image: "image/asset44.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
      number: 0,
    },
  ],
};

// const allProduct = getAllProduct();

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_PRODUCT:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return {
        state,
      };
  }
};

// data: state.data.map((row) => {
//   if (row.id === id) {
//     return {
//       number: 1,
//     };
//   } else {
//     return row;
//   }
// }),
