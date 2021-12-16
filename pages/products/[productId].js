import Link from "next/link";

import { getAllProduct, getProductById } from "../../data";

const Product = (props) => {
  const product = props.selectedProduct;

  if (props.length === 0) {
    return <p>Invalid link</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Taghir Bdahim Bdn */}
      {/* <Card
        id={productById[0].id}
        title={productById[0].title}
        image={productById[0].image}
        price={productById[0].price}
      /> */}
      {/* Taghir Bdahim Bdn */}
      <Link href="/products">
        <a>برگشت به فروشگاه</a>
      </Link>
    </div>
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
