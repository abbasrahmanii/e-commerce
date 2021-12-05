import ListItems from "../../components/list-items";
import { getAllProduct } from "../../data";
import { Store } from "../../context/Store";
import { useContext } from "react";

const ProductsPage = () => {
  const allProduct = getAllProduct();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <div className="w-full">
      <div className="flex flex-col w-3/4 pb-8 mx-auto">
        <div className="p-2 m-2 text-center">تمامی محصولات فروشگاه</div>
        <ListItems products={allProduct} />
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
