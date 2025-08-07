import { Router } from "express";
import { getAllCategories } from "../controller/categories-controller";

export const categoriesRouter = Router();

categoriesRouter.get('/all-categories', getAllCategories);
