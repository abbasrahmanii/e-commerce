import { useContext } from "react";
import ListItems from "../../components/ListItems";
import { Store } from "../../context/Store";
import FilterList from "../../components/FilterList";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import Product from "../../models/Product";

const ProductsPage = (props) => {
  const { state } = useContext(Store);
  const { fiteredProducts } = state;

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col w-3/4 mx-auto dark:bg-gray-800 pb-36">
          <FilterList />
          {/* <ListItems products={fiteredProducts} /> */}
          <ListItems products={props.products} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  await db.connect();
  const products = await Product.find({}, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
    revalidate: 5000,
  };
}

export default ProductsPage;
