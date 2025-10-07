import Product from "../models/Product";

export const getProducts = async (request: any, reply: any) => {
  try {
    const products = await Product.find();
    return reply.send({ products });
  } catch (error: any) {
    console.error("Error getting products:", error);
    return reply.status(500).send({ error: "Failed to get products" });
  }
};

export const createProduct = async (request: any, reply: any) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      category,
      images,
      hasVariants,
      variants,
    } = request.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      stock,
      category,
      images,
      hasVariants,
      variants,
    });

    await product.save();
    return reply.send({ message: "Product created successfully", product });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return reply.status(500).send({ error: "Failed to create product" });
  }
};
