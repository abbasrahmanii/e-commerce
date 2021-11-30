import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import ListItems from "../components/list-items";
import Slider from "../components/slider";

import { getPopularProduct } from "../data";

export default function Home(props) {
  // const popularProductsList = getPopularProduct();
  const popularProductsList = props.selectedProducts;

  if (!popularProductsList) {
    <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <ul className="flex items-center justify-between">
          <li className="p-3 mx-8">
            <Link href="/">
              <a>خانه</a>
            </Link>
          </li>
          <li className="p-3 mx-8">
            <Link href="/products">
              <a>فروشگاه</a>
            </Link>
          </li>
          <h1 className="p-3 mx-8 text-2xl font-bold">فروشگاه اینترنتی</h1>
          <li className="p-3 mx-8">بلاگ</li>
          <li className="p-3 mx-8">ارتباط با ما</li>
        </ul>
      </nav>

      <main
        className="w-full p-10 my-10 font-semibold text-center bg-red-200l"
        id="slider"
      >
        <Slider />
      </main>

      <main className="flex flex-row items-center justify-center flex-1 w-full px-20 text-center h-3/5">
        <div className="flex flex-col items-center justify-between flex-1 h-48">
          <h3>فروشگاه آنلاین</h3>
          <p>
            سوهان خودکار با بیش از نیم قرن سابقه در زمینه پخت سوهان و شیرینیجات
            ، برترین برند سوهان ایران و جهان میباشد که کیفیت و رضایت مشتریان
            عزیز را مهمترین سرمشق فعالیت خود میداند.
          </p>
          <Link href="/products">
            <a className="inline-block px-4 py-2 my-4 bg-indigo-300 rounded-md">
              ورود به فروشگاه
            </a>
          </Link>
        </div>
        <div className="flex-1">
          <Image
            src="/images/asset22.jpeg"
            alt="shop"
            width={400}
            height={400}
          />
        </div>
      </main>
      <main className="flex flex-col w-7/12">
        <h1 className="p-2 m-2 text-xl text-center">محبوب ترین محصولات</h1>
        <section className="flex justify-between mb-8">
          <ListItems products={popularProductsList} />
          {/* <div className="card">P</div>
          <div className="card">P</div>
          <div className="card">P</div>
          <div className="card">P</div> */}
        </section>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <div class="dokmeh-copyrights">
          Made with <span>💛</span> by Abbas Rahmani
        </div>
      </footer>
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
