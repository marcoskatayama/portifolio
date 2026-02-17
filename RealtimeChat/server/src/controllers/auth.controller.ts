import { prisma } from "@/infra/db.js";
import { logger } from "@/infra/logger.js";
import type { Request, Response } from "express";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { userName, password } = req.body;

    const user = await prisma.user.findUnique({ where: { userName } });

    if (!user || user.password !== password) {
      logger('warn', "Falha de login para o usuário: %s", userName);
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }

    logger('success', "Usuário %s logado com sucesso via HTTP", userName);
    return res.status(200).json({
      id: user.id,
      userName: user.userName,
      role: user.role
    });
  },

  async changePassword(req: Request, res: Response) {
    const { userName, oldPassword, newPassword } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { userName } });

      if (!user || user.password !== oldPassword) {
        return res.status(401).json({ error: "Senha antiga incorreta." });
      }

      await prisma.user.update({
        where: { userName },
        data: { password: newPassword }
      });

      logger('success', "Senha do usuário %s alterada.", userName);
      return res.status(200).json({ message: "Senha alterada com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao trocar senha." });
    }
  }
};
