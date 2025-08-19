import { Router } from "express";
import { createProductController, getProductsController } from "../controller/products-controller";

export const productsRouter = Router();

productsRouter.get('/', getProductsController);
productsRouter.post('/', createProductController);
