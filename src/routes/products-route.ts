import { Router } from "express";
import { getAllProductsController } from "../controller/products-controller";

export const productsRouter = Router();

productsRouter.get('/', getAllProductsController);
/* productsRouter.get('/:id', getProductsByCategoryId); */
/* productsRouter.post('/', createCategoryController);
productsRouter.put('/', updateCategoryController);
productsRouter.delete('/', deleteCategoryController); */
