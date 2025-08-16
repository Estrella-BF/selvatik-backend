import { Router } from "express";
import { getOrdersController, updateOrderController } from "../controller/orders-controller";

export const ordersRouter = Router();

ordersRouter.get('/', getOrdersController);
ordersRouter.put('/', updateOrderController);
