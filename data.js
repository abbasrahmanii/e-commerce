export const SHOP_DATA = {
  products: [
    {
      id: "p1",
      name: "shoes",
      price: 146250,
      image: "/images/asset21.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 18,
      freeDelivery: false,
    },
    {
      id: "p2",
      name: "book",
      price: 45000,
      image: "/images/asset22.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Personal",
      quantity: 0,
      countInStock: 22,
      freeDelivery: false,
    },
    {
      id: "p3",
      name: "watch",
      price: 396000,
      image: "/images/asset23.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 5,
      freeDelivery: true,
    },
    {
      id: "p4",
      name: "shirt",
      price: 159000,
      image: "/images/asset24.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 17,
      freeDelivery: true,
    },
    {
      id: "p5",
      name: "carpet",
      price: 1250000,
      image: "/images/asset28.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 4,
      freeDelivery: false,
    },
    {
      id: "p6",
      name: "knife",
      price: 318000,
      image: "/images/asset30.jpeg",
      popular: true,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 12,
      freeDelivery: true,
    },
    {
      id: "p7",
      name: "fan",
      price: 1850000,
      image: "/images/asset32.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Home Appliances",
      quantity: 0,
      countInStock: 10,
      freeDelivery: false,
    },
    {
      id: "p8",
      name: "bag",
      price: 365250,
      image: "/images/asset33.jpeg",
      popular: false,
      brand: "Nothing",
      category: "Clothing",
      quantity: 0,
      countInStock: 13,
      freeDelivery: true,
    },

    {
      id: "p9",
      name: "spray",
      price: 23000,
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
    {
      id: "s1",
      title: "slider 1",
      image: "/images/slider1.jpeg",
      url: "/products",
    },
    {
      id: "s2",
      title: "slider 2",
      image: "/images/slider2.jpeg",
      url: "/products",
    },
    {
      id: "s0",
      title: "slider 0",
      image: "/images/slider0.jpeg",
      url: "/products",
    },
    {
      id: "s3",
      title: "slider 3",
      image: "/images/slider3.jpeg",
      url: "/products",
    },
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
