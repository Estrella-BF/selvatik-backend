import { Router } from "express";
import { verifyPasswordController } from "../controller/admin-controller";

export const adminRouter = Router();

adminRouter.post('/auth/verify-password', verifyPasswordController);
