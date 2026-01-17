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
exports.StockSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.StockSchema = new mongoose_1.Schema({
    color: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    photo_URL: {
        type: String,
        required: true,
        trim: true,
    },
});
const ImageSchema = new mongoose_1.Schema({
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
const ProductsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: ImageSchema,
        required: true,
    },
    url_facebook: {
        type: String,
        trim: true,
    },
    url_instagram: {
        type: String,
        trim: true,
    },
    url_tiktok: {
        type: String,
        trim: true,
    },
    url_threads: {
        type: String,
        trim: true,
    },
    stocks: {
        type: [exports.StockSchema],
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.models.Products || mongoose_1.default.model('Products', ProductsSchema);
