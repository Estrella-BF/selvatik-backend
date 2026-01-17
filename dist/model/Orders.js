"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ItemsSchema = new mongoose_1.Schema({
    color: {
        type: String,
        required: true,
        trim: true,
    },
    quantitySelected: {
        type: Number,
        required: true
    },
});
const ReceiptFileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    folder_path: {
        type: String,
        required: true,
        trim: true,
    },
});
const ProducstsToBuy = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    items: {
        type: [ItemsSchema],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    unitPrice: {
        type: Number,
        required: true,
        trim: true
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true
    }
});
const Orders = new mongoose_1.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true,
    },
    customerShippingAddress: {
        type: String,
        required: true,
        trim: true,
    },
    customerCardID: {
        type: String,
        required: true,
        trim: true,
    },
    customerPhone: {
        type: Number,
        required: true,
        trim: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true,
    },
    receiptFile: {
        type: ReceiptFileSchema,
        required: true,
    },
    productsToBuy: {
        type: [ProducstsToBuy],
        required: true,
    },
    comments: {
        type: String,
        required: false,
        default: '',
        trim: true,
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.models.Orders || mongoose_1.default.model('Orders', Orders);
