import { Router } from "express";
import multer from "multer";
import { createOrderController, getOrdersController, updateOrderController } from "../controller/orders-controller";

const upload = multer({ storage: multer.memoryStorage() });

export const ordersRouter = Router();

/* 
ordersRouter.post(
  '/',
  (req, res, next) => {
    console.log(">>> REQUEST HEADERS:", req.headers["content-type"]);
    next();
  },
  upload.single("image"),
  (req, res, next) => {
    console.log(">>> FIELDS:", req.body);
    console.log(">>> FILE:", req.file);
    next();
  },
  createOrderController
);
 */

ordersRouter.get('/', getOrdersController);
ordersRouter.post('/', upload.single("image"), createOrderController);
ordersRouter.put('/', updateOrderController);
