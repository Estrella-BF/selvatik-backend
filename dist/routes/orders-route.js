"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const orders_controller_1 = require("../controller/orders-controller");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.ordersRouter = (0, express_1.Router)();
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
exports.ordersRouter.get('/', orders_controller_1.getOrdersController);
exports.ordersRouter.post('/', upload.single("image"), orders_controller_1.createOrderController);
exports.ordersRouter.put('/', orders_controller_1.updateOrderController);
