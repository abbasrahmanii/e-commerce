import nextConnect from "next-connect";
import User from "../../models/User";
import Product from "../../models/Product";
import db from "../../db";
import data from "../../data";

const handler = nextConnect();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
