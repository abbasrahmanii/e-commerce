import Link from "next/link";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import { getAllProduct, getProductById } from "../../data";
import { useContext } from "react";
import { Store } from "../../context/Store";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const Product = (props) => {
  const router = useRouter();
  const product = props.selectedProduct;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((item) => item.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      window.alert("متاسفانه محصول در انبار موجود نمی‌باشد.");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!product) {
    return (
      <Layout>
        <p>Invalid link</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full bg-gray-100 dark:bg-gray-800">
        <div className="w-5/6 flex mx-auto py-6">
          <div className="w-3/4 flex bg-gray-50 dark:bg-gray-700 rounded">
            <div className="w-5/12 flex flex-col items-center px-4 bg-gray-100 dark:bg-gray-800 ">
              <div className="rounded overflow-hidden transition-all">
                <Image
                  src={product.image}
                  width={440}
                  height={440}
                  className="scale-100 hover:scale-110 duration-300"
                />
              </div>
              <div className="mx-auto flex justify-between w-full">
                <Image
                  src={product.image}
                  width={110}
                  height={110}
                  className="rounded"
                />
                <Image
                  src={product.image}
                  width={110}
                  height={110}
                  className="rounded"
                />
                <Image
                  src={product.image}
                  width={110}
                  height={110}
                  className="rounded border-2 border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>
            <div className="w-7/12 flex flex-col p-4 border-2 border-gray-200 rounded dark:border-gray-800">
              <div className="mb-4">
                <Link href="/">
                  <a className="text-blue-400">Home</a>
                </Link>
                <span className="mx-4">/</span>
                <Link href="/products">
                  <a className="text-blue-400">{product.category}</a>
                </Link>
                <span className="mx-4">/</span>
                <Link href="/products">
                  <a className="text-gray-500 pointer-events-none ">
                    {product.brand}
                  </a>
                </Link>
              </div>
              <div className="dark:text-white">
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">نام محصول:</h4>
                  <p>{product.name}</p>
                </div>
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">دسته بندی:</h4>
                  <p>{product.category}</p>
                </div>
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">برند:</h4>
                  <p>{product.brand}</p>
                </div>
                <div className="flex items-center my-1">
                  <BsDot color="#2c9c16" />
                  <h4 className="mx-2">تعداد موجودی در انبار:</h4>
                  <p>{product.countInStock} عدد</p>
                </div>
                {product.isFreeDelivery ? (
                  <div className="flex items-center my-1">
                    <FiGift size={15} color="#2c9c16" />
                    <h4 className="mr-2 text-green-600 dark:text-green-300">
                      ارسال رایگان
                    </h4>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="w-1/4 bg-gray-100 px-4 dark:bg-gray-800">
            <div className="flex flex-col items-center min-h-full bg-white justify-start p-4 border-2 border-gray-200 rounded dark:bg-gray-700 dark:text-white dark:border-gray-800">
              <div className="flex mb-8">
                <h4 className="ml-2">قیمت محصول:</h4>
                <p>{numberWithCommas(product.price)} تومـان</p>
              </div>
              <button
                className="bg-red-500 text-white p-2 focus:bg-red-600 rounded-lg"
                onClick={addToCartHandler}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductById(productId);
  return {
    props: {
      selectedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const allProduct = getAllProduct();
  const paths = allProduct.map((product) => ({
    params: { productId: product.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export default Product;
