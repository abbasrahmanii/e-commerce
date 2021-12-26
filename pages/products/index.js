import { useContext } from "react";
import ListItems from "../../components/list-items";
import { Store } from "../../context/Store";
import FilterList from "../../components/filter-list";

const ProductsPage = () => {
  const { state } = useContext(Store);
  const { fiteredProducts } = state;

  return (
    <div className="w-full">
      <div className="flex flex-col w-3/4 pb-8 mx-auto dark:bg-gray-800">
        <FilterList />
        <ListItems products={fiteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
