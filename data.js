export const SHOP_DATA = {
  products: [
    {
      id: "p1",
      name: "shoes",
      price: "139988",
      image: "/images/shop2.jpg",
      popular: true,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p2",
      name: "book",
      price: "148988",
      image: "image/asset22.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p3",
      name: "watch",
      price: "126988",
      image: "image/asset23.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p4",
      name: "shirt",
      price: "19988",
      image: "image/asset24.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p5",
      name: "carpet",
      price: "239938",
      image: "image/asset28.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p6",
      name: "knife",
      price: "69988",
      image: "image/asset30.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p7",
      name: "fan",
      price: "72988",
      image: "image/asset32.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },
    {
      id: "p8",
      name: "bag",
      price: "14988",
      image: "image/asset33.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 20,
    },

    {
      id: "p9",
      name: "spray",
      price: "139988",
      image: "image/asset44.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Nothing",
      quantity: 0,
      countInStock: 0,
    },
  ],
  sliders: [
    { id: "s0", title: "slider 0", image: "/images/slider0.jpeg" },
    { id: "s1", title: "slider 1", image: "/images/slider1.jpeg" },
    { id: "s2", title: "slider 2", image: "/images/slider2.jpeg" },
    { id: "s3", title: "slider 3", image: "/images/slider3.jpeg" },
  ],
};

export const getAllProduct = () => {
  return SHOP_DATA.products;
};

export const getPopularProduct = () => {
  return SHOP_DATA.products.filter((product) => product.popular);
};

// export const getProductById = (productId) => {
//   return SHOP_DATA.products.filter((product) => product.id === productId);
// };
export const getProductById = (productId) => {
  return SHOP_DATA.products.find((product) => product.id === productId);
};

export const getInCart = () => {
  return SHOP_DATA.products.filter((product) => product.addCart);
};

//Slider

export const getAllSlider = () => {
  return SHOP_DATA.sliders;
};
