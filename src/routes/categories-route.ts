import { Router } from "express";
import { 
  getAllCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController
} from "../controller/categories-controller";

export const categoriesRouter = Router();

categoriesRouter.get('/', getAllCategoriesController);
/* categoriesRouter.post('/', createCategoryController);
categoriesRouter.put('/', updateCategoryController);
categoriesRouter.delete('/', deleteCategoryController); */
