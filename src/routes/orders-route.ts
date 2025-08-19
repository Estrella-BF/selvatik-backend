import { Router } from "express";
import { createOrderController, getOrdersController, updateOrderController } from "../controller/orders-controller";

export const ordersRouter = Router();

ordersRouter.get('/', getOrdersController);
ordersRouter.post('/', createOrderController);
ordersRouter.put('/', updateOrderController);
