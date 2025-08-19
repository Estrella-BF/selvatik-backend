"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderController = exports.createOrderController = exports.getOrdersController = void 0;
const Orders_1 = __importDefault(require("../model/Orders"));
const getOrdersController = async (request, response) => {
    try {
        const { isPaid, isDelivered } = request.query;
        if (isPaid) {
            console.log('** IS PAID SEARCH');
            const purchases = await Orders_1.default.find({ isPaid: false });
            return response.json(purchases);
        }
        else if (isDelivered) {
            console.log('** IS DELIVERY SEARCH');
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
        const purchaseResponse = await Orders_1.default.create(request.body);
        return response.status(200).json(purchaseResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.createOrderController = createOrderController;
const updateOrderController = async (request, response) => {
    try {
        const { _id, isPaid, isDelivered } = request.body;
        let updateObjet = {};
        if (isPaid) {
            updateObjet = { isPaid: true };
        }
        else if (isDelivered) {
            updateObjet = { isDelivered: true };
        }
        const categoryResponse = await Orders_1.default.findByIdAndUpdate(_id, updateObjet, { new: true });
        return response.status(200).json(categoryResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.updateOrderController = updateOrderController;
