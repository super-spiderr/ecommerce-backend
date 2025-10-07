import { FastifyInstance } from "fastify";
import { createProduct, getProducts } from "../controllers/productController";

export default async function productRoutes(app: FastifyInstance) {
  app.get("/products", getProducts);
  app.post("/products", createProduct);
}
