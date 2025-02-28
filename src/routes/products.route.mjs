import { Router } from "express";
import multer from "multer";
import productsController from "../controllers/products.controller.mjs";
const route = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post(
  "/products",
  upload.single("productImage"),
  productsController.createProduct
);

route.get("/products/image/:id", productsController.getProductImage);

route.get("/products", productsController.getProducts);

export default route;
