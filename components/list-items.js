import Card from "./ui/card";

const ListItems = (props) => {
  const { products } = props;
  return (
    <ul className="flex flex-wrap items-center justify-between w-full gap-5">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          setAddCart={props.setAddCart}
          addCart={props.addCart}
        />
      ))}
    </ul>
  );
};

export default ListItems;
