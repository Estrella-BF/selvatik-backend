import { Router } from "express";
import { createProductController, deleteProductController, getProductsController } from "../controller/products-controller";

export const productsRouter = Router();

productsRouter.get('/', getProductsController);
productsRouter.post('/', createProductController);
productsRouter.delete('/:id', deleteProductController); 
