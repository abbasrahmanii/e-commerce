import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utils/auth";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    id: "p" + Math.random(),
    name: "sample name",
    image: "/images/shirt1.jpg",
    price: 0,
    isPopular: false,
    brand: "sample brand",
    category: "sample category",
    quantity: 0,
    countInStock: 0,
    isFreeDelivery: false,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product Created", product });
});

export default handler;
