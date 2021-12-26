import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import ListItems from "../components/list-items";
import Slider from "../components/slider";

import { getPopularProduct } from "../data";

export default function Home(props) {
  const popularProductsList = props.selectedProducts;
  if (!popularProductsList) {
    <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>My Commerce</title>
      </Head>

      <main
        className="w-full p-4 mt-4 mb-10 font-semibold text-center bg-red-200l"
        id="slider"
      >
        <Slider />
      </main>

      <main className="flex flex-row flex-wrap items-center justify-center flex-1 w-full px-20 text-center h-3/5">
        <div className="flex flex-col items-center justify-between flex-1 h-48">
          <h3 className="dark:text-white">فروشگاه آنلاین</h3>
          <p className="dark:text-gray-300">
            فروشگاه اینترنتی ما با بیش از نیم قرن سابقه در زمینه فروش و پخش ،
            برترین فروشگاه ایران و جهان میباشد که کیفیت و رضایت مشتریان عزیز را
            مهمترین سرمشق فعالیت خود میداند.
          </p>
          <Link href="/products">
            <a className="inline-block px-4 py-2 my-4 bg-gray-700 text-white p-2 hover:bg-gray-600 focus:bg-gray-500 rounded-lg">
              ورود به فروشگاه
            </a>
          </Link>
        </div>
        <div className="flex-1 ">
          <Image src="/images/shop2.jpg" alt="shop" width={575} height={400} />
        </div>
      </main>
      <main className="flex flex-col w-7/12">
        <h1 className="p-2 m-2 text-xl text-center dark:text-white">
          محبوب ترین محصولات
        </h1>
        <section className="flex justify-between mb-8">
          <ListItems products={popularProductsList} />
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const popularProductsList = getPopularProduct();
  return {
    props: { selectedProducts: popularProductsList },
    revalidate: 2000,
  };
}
