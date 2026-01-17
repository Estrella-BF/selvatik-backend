"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.createProductController = exports.getProductsController = void 0;
const Products_1 = __importDefault(require("../model/Products"));
const cloudinary_1 = require("cloudinary");
const images_controller_1 = require("./images.controller");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true
});
const getProductsController = async (request, response) => {
    try {
        const { category_id, search } = request.query;
        if (category_id) {
            const allProductsByCategoryId = await Products_1.default.find({ category_id });
            return response.json(allProductsByCategoryId);
        }
        else if (search) {
            const allProductsFinded = await Products_1.default.find({ title: search });
            return response.json(allProductsFinded);
        }
        const categoryResponse = await Products_1.default.find();
        return response.json(categoryResponse);
    }
    catch (error) {
        console.log('**error:', error);
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.getProductsController = getProductsController;
const createProductController = async (request, response) => {
    try {
        const body = request.body;
        const file = request.file;
        const formDetails = JSON.parse(body.formDetails);
        const formNetworks = JSON.parse(body.formNetworks);
        const stocks = JSON.parse(body.stocks);
        const image = { name: file?.originalname, folder_path: "products" };
        const formValue = { ...formDetails, ...formNetworks, stocks, image };
        if (file) {
            await (0, images_controller_1.uploadImage)(file, `products/${formDetails.category_id}`);
        }
        ;
        const categoryResponse = await Products_1.default.create(formValue);
        return response.json(categoryResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.createProductController = createProductController;
const deleteProductController = async (request, response) => {
    try {
        const { id } = request.params;
        await Products_1.default.findByIdAndDelete(id);
        return response.status(200).json({ message: "Product deleted" });
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.deleteProductController = deleteProductController;
