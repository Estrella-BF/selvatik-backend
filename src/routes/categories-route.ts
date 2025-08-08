import { Router } from "express";
import { getAllCategoriesController } from "../controller/categories-controller";

export const categoriesRouter = Router();

categoriesRouter.get('/all-categories', getAllCategoriesController);
