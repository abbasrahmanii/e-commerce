export const SHOP_DATA = {
  products: [
    {
      id: "p1",
      name: "shoes",
      price: "139988",
      image: "/images/asset21.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 20,
      freeDelivery: false,
    },
    {
      id: "p2",
      name: "book",
      price: "148988",
      image: "/images/asset22.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Personal",
      quantity: 0,
      countInStock: 20,
      freeDelivery: false,
    },
    {
      id: "p3",
      name: "watch",
      price: "126988",
      image: "/images/asset23.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 20,
      freeDelivery: true,
    },
    {
      id: "p4",
      name: "shirt",
      price: "19988",
      image: "/images/asset24.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 20,
      freeDelivery: true,
    },
    {
      id: "p5",
      name: "carpet",
      price: "239938",
      image: "/images/asset28.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 20,
      freeDelivery: false,
    },
    {
      id: "p6",
      name: "knife",
      price: "69988",
      image: "/images/asset30.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 20,
      freeDelivery: true,
    },
    {
      id: "p7",
      name: "fan",
      price: "72988",
      image: "/images/asset32.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 20,
      freeDelivery: false,
    },
    {
      id: "p8",
      name: "bag",
      price: "14988",
      image: "/images/asset33.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 20,
      freeDelivery: true,
    },

    {
      id: "p9",
      name: "spray",
      price: "139988",
      image: "/images/asset44.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 0,
      freeDelivery: false,
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
