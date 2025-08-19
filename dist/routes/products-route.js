"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_controller_1 = require("../controller/products-controller");
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get('/', products_controller_1.getProductsController);
exports.productsRouter.post('/', products_controller_1.createProductController);
exports.productsRouter.delete('/:id', products_controller_1.deleteProductController);
