import { logger } from "@/infra/logger.js";
import type { NextFunction, Request, Response } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.headers["x-user-role"];

  // Criamos uma lista de quem tem permissão de "gerência"
  const rolesAutorizadas = ["ADMIN", "ROOT"];

  // Verificamos se a role vinda do header está na nossa lista
  // Usamos o 'as string' ou fazemos um cast para o TS não reclamar da comparação
  if (!userRole || !rolesAutorizadas.includes(userRole as string)) {
    logger('warn', "Acesso negado: O usuário com role '%s' tentou acessar área restrita.", userRole || 'NULA');

    return res.status(403).json({
      error: "Acesso negado: Permissão insuficiente para realizar esta ação."
    });
  }

  // Se chegou aqui, é ADMIN ou ROOT
  next();
};
