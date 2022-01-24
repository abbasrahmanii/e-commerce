import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isPopular: { type: Boolean, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    freeDelivery: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
