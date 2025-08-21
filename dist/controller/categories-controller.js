"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.createCategoryController = exports.getAllCategoriesController = void 0;
const Categories_1 = __importDefault(require("../model/Categories"));
const getAllCategoriesController = async (_req, response) => {
    try {
        const data = await Categories_1.default.find();
        return response.json(data);
    }
    catch (error) {
        console.log('** error category:', error);
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.getAllCategoriesController = getAllCategoriesController;
const createCategoryController = async (request, response) => {
    try {
        const { category_name } = request.body;
        const categoryResponse = await Categories_1.default.create({ name: category_name });
        return response.json(categoryResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.createCategoryController = createCategoryController;
const updateCategoryController = async (request, response) => {
    try {
        const { name, _id } = request.body;
        const categoryResponse = await Categories_1.default.findByIdAndUpdate(_id, { name }, { new: true });
        return response.status(200).json(categoryResponse);
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = async (request, response) => {
    try {
        const { id } = request.params;
        await Categories_1.default.findByIdAndDelete(id);
        return response.status(200).json({ message: "Task deleted" });
    }
    catch (error) {
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.deleteCategoryController = deleteCategoryController;
