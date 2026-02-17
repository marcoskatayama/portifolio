import { AdminController } from "@/controllers/admin.controller.js";
import { Router } from "express";

const router = Router();

// POST http://localhost:3001/api/admin/users
router.post("/users", AdminController.createUser);

// POST http://localhost:3001/api/admin/rooms
router.post("/rooms", AdminController.createRoom);

export { router as adminRouter };
