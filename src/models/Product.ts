import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "M", "L", "500ml"
    label: { type: String }, // Human-readable name
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    extraInfo: { type: Object }, // Optional additional details
  },
  { _id: false } // Prevents creating a separate _id for each variant
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    discountPrice: Number,
    stock: Number,
    category: String,
    images: [String],
    hasVariants: { type: Boolean, default: false },
    variants: { type: [variantSchema], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
