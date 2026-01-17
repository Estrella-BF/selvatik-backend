"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordController = void 0;
const Admin_1 = __importDefault(require("../model/Admin"));
const verifyPasswordController = async (request, response) => {
    try {
        const { password } = request.body;
        const all = await Admin_1.default.find({});
        const dataResponse = await Admin_1.default.exists({ password });
        console.log('*** data Response:', dataResponse);
        const valid = !!dataResponse;
        return response.status(200).json({ valid });
    }
    catch (error) {
        console.log('*** data error:', error);
        return response.status(error.status || 500).json({ error: error.message });
    }
};
exports.verifyPasswordController = verifyPasswordController;
