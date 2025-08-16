import { Router } from "express";
import { getProductsController } from "../controller/products-controller";

export const productsRouter = Router();

productsRouter.get('/', getProductsController);
/* productsRouter.get('/:id', getProductsByCategoryId); */
/* productsRouter.post('/', createCategoryController);
productsRouter.put('/', updateCategoryController);
productsRouter.delete('/', deleteCategoryController); */
