import Card from "./Card";

const ListItems = (props) => {
  const { products } = props;

  if (products.length === 0) {
    return (
      <p className="text-center dark:text-white">متاسفانه محصولی یافت نشد.</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 justify-items-center content-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 w-full gap-12">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ListItems;