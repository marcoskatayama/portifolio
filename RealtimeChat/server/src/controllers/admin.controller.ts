import { AdminService } from "@/core/admin.service.js";
import { logger } from "@/infra/logger.js";
import type { Request, Response } from "express";

export const AdminController = {
  async createUser(req: Request, res: Response) {
    try {
      const { userName, role } = req.body;

      const newUser = await AdminService.createUser(userName, role);

      logger('success', "Admin criou usuário: %s", userName);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  },

  async createRoom(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      // 1. Salvano banco via Service
      const newRoom = await AdminService.createRoom(name, description);

      // 2. Dispara o evento em tempo real via Socket.io
      // Isso avisará todos os suportes conectados que uma nova sala surgiu
      req.io.emit("room_created", newRoom);

      logger('success', "Nova sala criada e notificada: %s", name);
      return res.status(201).json(newRoom);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar sala" });
    }
  }
};
