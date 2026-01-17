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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
require("dotenv/config");
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const categories_route_1 = require("./routes/categories-route");
const products_route_1 = require("./routes/products-route");
const orders_route_1 = require("./routes/orders-route");
const admin_route_1 = require("./routes/admin-route");
const images_route_1 = require("./routes/images-route");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
// Connect to MongoDB
(0, database_1.default)();
// ROUTES USER
app.use('/admin', admin_route_1.adminRouter);
app.use('/assets', images_route_1.imagesRouter);
app.use('/categories', categories_route_1.categoriesRouter);
app.use('/products1', products_route_1.productsRouter);
app.use('/orders', orders_route_1.ordersRouter);
app.use((err, _req, res, next) => {
    // Handle the error
    res.status(err.status || 500).json({ error: err.message });
});
app.get('/favicon.ico', (_req, res) => res.status(204));
app.get('/', (_req, res) => res.send('hello!'));
app.listen(PORT, () => {
    console.log(`Server in running on port: ${PORT}`);
});
