"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = require("express");
const orders_controller_1 = require("../controller/orders-controller");
exports.ordersRouter = (0, express_1.Router)();
exports.ordersRouter.get('/', orders_controller_1.getOrdersController);
exports.ordersRouter.post('/', orders_controller_1.createOrderController);
exports.ordersRouter.put('/', orders_controller_1.updateOrderController);
