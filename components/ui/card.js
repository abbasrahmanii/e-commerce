import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  const { id, title, image, price, addCart, setAddCart } = props;
  // const link = `/` + image;
  const addCartHandler = (e) => {
    setAddCart((prevState) => prevState + 1);
    console.log(e);
    e.target.disabled = true;
    e.target.style.opacity = 0.5;
  };
  return (
    <div className="flex flex-col justify-between w-1/4 h-64 p-4 bg-indigo-200 rounded-lg shadow-xl">
      <div className="text-center">
        image place
        {/* <img
          src={link}
          alt={image}
          //  width={100} height={180}
        /> */}
      </div>
      <div className="flex flex-col">
        <h3>{title}</h3>
        <p>{price} تـومـان</p>
        <div className="flex justify-between gap-2">
          <Link href={`products/${id}`}>
            <a className="inline-block p-2 m-2 mx-auto text-sm text-white bg-yellow-600">
              توضیحات بیشتر
            </a>
          </Link>
          <button
            className="inline-block p-2 m-2 mx-auto text-sm bg-green-600"
            onClick={addCartHandler}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
