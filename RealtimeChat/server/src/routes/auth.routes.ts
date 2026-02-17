import { AuthController } from "@/controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

// POST http://localhost:3001/api/auth/login
router.post("/login", AuthController.login);

// PATCH http://localhost:3001/api/auth/change-password
router.patch("/change-password", AuthController.changePassword);

export { router as authRoutes };
