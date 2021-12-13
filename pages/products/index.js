import { useContext } from "react";
import ListItems from "../../components/list-items";
import { getAllProduct } from "../../data";
import { Store } from "../../context/Store";
import FilterList from "../../components/filter-list";

const ProductsPage = () => {
  // const allProduct = getAllProduct();
  const { state } = useContext(Store);
  const { fiteredProducts } = state;

  return (
    <div className="w-full">
      <div className="flex flex-col w-3/4 pb-8 mx-auto">
        {/* <div className="p-2 m-2 text-center">تمامی محصولات فروشگاه</div> */}
        <FilterList />
        <ListItems products={fiteredProducts} />
      </div>
    </div>
  );
};
// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// }

export default ProductsPage;
