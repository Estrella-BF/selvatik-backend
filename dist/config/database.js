"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI ?? '';
const connectDB = async () => {
    try {
        const db = await mongoose_1.default.connect(MONGODB_URI, {
            dbName: "selvatika_backend",
        });
        console.log("Connected to MongoDB => ", db.connection.name);
    }
    catch (error) {
        console.log("MongoDB connection error:", error);
    }
};
exports.default = connectDB;
