export const SHOP_DATA = {
  products: [
    {
      id: "p1",
      title: "shoes",
      price: "139,988",
      image: "image/asset21.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p2",
      title: "book",
      price: "148,988",
      image: "image/asset22.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p3",
      title: "watch",
      price: "126,988",
      image: "/image/asset23.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p4",
      title: "shirt",
      price: "19,988",
      image: "image/asset24.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p5",
      title: "carpet",
      price: "239,938",
      image: "image/asset28.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p6",
      title: "knife",
      price: "69,988",
      image: "image/asset30.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p7",
      title: "fan",
      price: "72,988",
      image: "image/asset32.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
    },
    {
      id: "p8",
      title: "bag",
      price: "14,988",
      image: "image/asset33.jpeg",
      popular: false,
      addCart: false,
      off: null,
      brand: "Nothing",
    },

    {
      id: "p9",
      title: "spray",
      price: "139,988",
      image: "image/asset44.jpeg",
      popular: true,
      addCart: false,
      off: null,
      brand: "Nothing",
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

export const getProductById = (productId) => {
  return SHOP_DATA.products.filter((product) => product.id === productId);
};

export const getInCart = () => {
  return SHOP_DATA.products.filter((product) => product.addCart);
};

//Slider

export const getAllSlider = () => {
  return SHOP_DATA.sliders;
};
