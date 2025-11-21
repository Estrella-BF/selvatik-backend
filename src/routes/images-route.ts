import express from "express";
import { getFolderImagesController } from "../controller/images.controller";

export const imagesRouter = express.Router();

imagesRouter.get('/', getFolderImagesController);
