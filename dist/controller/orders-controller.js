"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderController = exports.createOrderController = exports.getOrdersController = void 0;
const Orders_1 = __importDefault(require("../model/Orders"));
const Products_1 = __importDefault(require("../model/Products"));
const mongoose_1 = __importDefault(require("mongoose"));
const images_controller_1 = require("./images.controller");
const getOrdersController = async (request, response) => {
    try {
        const { isPaid, isDelivered } = request.query;
        if (isPaid) {
            const purchases = await Orders_1.default.find({ isPaid: false });
            return response.json(purchases);
        }
        else if (isDelivered) {
            const purchases = await Orders_1.default.find({ isDelivered: false });
            return response.json(purchases);
        }
        else {
            const categoryResponse = await Orders_1.default.find();
            return response.json(categoryResponse);
        }
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.getOrdersController = getOrdersController;
const createOrderController = async (request, response) => {
    try {
        const body = request.body;
        const file = request.file;
        const createOrderFromBody = JSON.parse(body.data);
        const { productsToBuy } = createOrderFromBody;
        // setting file data
        const today = new Date();
        const [day, month, year] = [
            today.getDate(), today.getMonth() + 1, today.getFullYear(),
        ];
        const folder_path = `vouchers/${day}-${month}-${year}`;
        const createOrderData = {
            ...createOrderFromBody,
            receiptFile: {
                name: file?.originalname,
                folder_path
            }
        };
        const updatePromises = productsToBuy.map(async (product) => {
            const newStocks = product.stock.map(item => {
                const newQuantity = item.quantity - item.quantitySelected;
                if (newQuantity < 0) {
                    throw new Error(`Stock can't be a negative value`);
                }
                return {
                    color: item.color,
                    quantity: item.quantity - item.quantitySelected
                };
            });
            const product_id = new mongoose_1.default.Types.ObjectId(product._id);
            const updatedProduct = await Products_1.default.findByIdAndUpdate(product_id, { stocks: newStocks });
            if (!updatedProduct) {
                throw new Error(`Producto con ID ${product_id} no encontrado`);
            }
            return 'updatedProduct';
        });
        await Promise.all(updatePromises);
        if (file) {
            await (0, images_controller_1.uploadImage)(file, folder_path);
        }
        ;
        const newOrderResponse = await Orders_1.default.create(createOrderData);
        return response.status(204).json(newOrderResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.createOrderController = createOrderController;
const updateOrderController = async (request, response) => {
    try {
        const { _id, isPaid, isDelivered, comments } = request.body;
        let updateObjet = {};
        if (isPaid) {
            updateObjet = { isPaid: true };
        }
        else if (isDelivered) {
            updateObjet = { isDelivered: true };
        }
        else if (comments) {
            updateObjet = { comments };
        }
        else {
            throw new Error(`No se encuentra el valor a actualizar`);
        }
        const categoryResponse = await Orders_1.default.findByIdAndUpdate(_id, updateObjet, { new: true });
        return response.status(200).json(categoryResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.updateOrderController = updateOrderController;
