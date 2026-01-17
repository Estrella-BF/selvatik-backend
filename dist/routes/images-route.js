"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesRouter = void 0;
const express_1 = __importDefault(require("express"));
const images_controller_1 = require("../controller/images.controller");
exports.imagesRouter = express_1.default.Router();
exports.imagesRouter.get('/', images_controller_1.getFolderImagesController);
