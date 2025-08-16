import { Router } from "express";
import { 
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controller/categories-controller";

export const categoriesRouter = Router();

categoriesRouter.get('/', getAllCategoriesController);
categoriesRouter.post('/', createCategoryController);
categoriesRouter.put('/', updateCategoryController);
/* 

categoriesRouter.delete('/', deleteCategoryController); */
