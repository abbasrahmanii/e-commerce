import Card from "./card";

const ListItems = (props) => {
  const { products } = props;

  if (products.length === 0) {
    return <p>Shop is Empty</p>;
  }

  return (
    <ul className="flex flex-wrap items-center justify-between w-full gap-5">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
        />
      ))}
    </ul>
  );
};

export default ListItems;
