import express from "express";
import multer from "multer";
import { createProductController, deleteProductController, getProductsController } from "../controller/products-controller";

const upload = multer({ storage: multer.memoryStorage() });

export const productsRouter = express.Router();

productsRouter.get('/', getProductsController);
productsRouter.post('/', upload.single("image"), createProductController);
productsRouter.delete('/:id', deleteProductController); 
