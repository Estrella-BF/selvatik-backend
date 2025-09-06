"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controller/admin-controller");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.post('/auth/verify-password', admin_controller_1.verifyPasswordController);
