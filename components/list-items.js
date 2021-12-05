import Card from "./card";

const ListItems = (props) => {
  const { products } = props;
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
