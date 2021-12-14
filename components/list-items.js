import Card from "./card";

const ListItems = (props) => {
  const { products } = props;

  if (products.length === 0) {
    return <p className="text-center">Shop is Empty</p>;
  }

  return (
    // <ul className="flex flex-wrap items-center justify-between w-full gap-5">
    //taghir dadim az flex be grid
    <ul className="grid grid-cols-1 justify-items-center content-center sm:grid-cols-2 md:grid-cols-3 w-full gap-12">
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
