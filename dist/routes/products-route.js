"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const products_controller_1 = require("../controller/products-controller");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.productsRouter = express_1.default.Router();
exports.productsRouter.get('/', products_controller_1.getProductsController);
exports.productsRouter.post('/', upload.single("image"), products_controller_1.createProductController);
exports.productsRouter.delete('/:id', products_controller_1.deleteProductController);
