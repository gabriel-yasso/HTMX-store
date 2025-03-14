import { Router } from "express";
import productFormControllers from "../controllers/productForm.controller.mjs";
const route = Router();

route.get("/product-form", productFormControllers.getForm);

export default route;
