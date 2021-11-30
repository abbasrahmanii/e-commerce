import { useState } from "react";
import ListItems from "../../components/list-items";
import { getAllProduct, getInCart } from "../../data";

const ProductsPage = () => {
  const allProduct = getAllProduct();
  const [addCart, setAddCart] = useState(0);
  return (
    <div className="w-full">
      <div className="flex flex-col w-3/4 pb-8 mx-auto">
        <div className="p-2 m-2 text-center">
          تمامی محصولات فروشگاه{" "}
          <span className="px-2 py-1 text-white bg-red-600 rounded-full">
            {addCart}
          </span>
        </div>
        <ListItems
          products={allProduct}
          addCart={addCart}
          setAddCart={setAddCart}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
