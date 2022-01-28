import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import ListItems from "../components/ListItems";
import Slider from "../components/Slider";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import { CircularProgress, Typography, Link, Grid } from "@mui/material";
import { ClassNames } from "@emotion/react";
import useStyles from "../utils/styles";
import Carousel from "react-material-ui-carousel";

export default function Home(props) {
  const classes = useStyles();

  const { topRatedProducts, featuredProducts } = props;

  if (!topRatedProducts) {
    <CircularProgress></CircularProgress>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>My Commerce</title>
          <meta name="theme-color" content="#FC334A" />
        </Head>
        <main
          className="w-full p-4 mt-4 mb-10 font-semibold text-center bg-red-200l"
          id="slider"
        >
          <Slider />
        </main>

        <main className="flex flex-row flex-wrap items-center justify-center flex-1 w-full px-20 text-center min-h-full">
          <div className="flex flex-col items-center justify-between md:flex-1">
            <h2 className="dark:text-white text-xl p-3">فروشگاه آنلاین</h2>
            <p className="dark:text-gray-300">
              فروشگاه اینترنتی ما با بیش از نیم قرن سابقه در زمینه فروش و پخش ،
              برترین فروشگاه ایران و جهان میباشد که کیفیت و رضایت مشتریان عزیز
              را مهمترین سرمشق فعالیت خود میداند.
            </p>
            <Link href="/products">
              <a className="inline-block px-4 py-2 my-4 bg-gray-700 text-white p-2 hover:bg-gray-600 focus:bg-gray-500 rounded-lg dark:bg-indigo-500">
                ورود به فروشگاه
              </a>
            </Link>
          </div>
          <div className="md:flex-1">
            <Image
              src="/images/shop2.jpg"
              alt="shop"
              width={575}
              height={400}
            />
          </div>
        </main>
        <main className="flex flex-col w-3/4 md:w-2/3">
          {/* <Grid container>
          <Grid item sx={12}> */}
          <Carousel className={classes.mt1} animation="slide">
            {featuredProducts.map((product) => (
              <NextLink
                key={product._id}
                href={`/products/${product.id}`}
                passHref
              >
                <Link>
                  <Image
                    src={product.featuredImage}
                    alt={product.name}
                    className={classes.featuredImage}
                    width={1650}
                    height={660}
                  />
                </Link>
              </NextLink>
            ))}
          </Carousel>
          {/* </Grid> */}
          {/* <Grid item sx={12}> */}
          <Typography variant="h4"> محبوب ترین محصولات</Typography>
          <section className="flex justify-between mb-8">
            <ListItems products={topRatedProducts} />
          </section>
          {/* </Grid>
        </Grid> */}
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({ rating: -1 })
    .limit(6);
  await db.disconnect();
  // const popularProductsList = products.filter((p) => p.isPopular);

  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
