import { useContext } from "react";
import ListItems from "../../components/list-items";
import { Store } from "../../context/Store";
import FilterList from "../../components/filter-list";
import Layout from "../../components/layout";

const ProductsPage = (props) => {
  const { state } = useContext(Store);
  const { fiteredProducts } = state;

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col w-3/4 mx-auto dark:bg-gray-800 pb-36">
          <FilterList />
          <ListItems products={fiteredProducts} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 2000,
  };
}

export default ProductsPage;
