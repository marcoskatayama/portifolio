import { prisma } from "@/infra/db.js";
import { logger } from "@/infra/logger.js";
import { Socket } from "socket.io";

export const authMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
  const userName = socket.handshake.auth.userName;

  try {
    const user = await prisma.user.findUnique({ where: { userName } });

    if (!user) {
      logger('warn', "Acesso negado: Usuário %s não encontrado no banco.", userName);
      return next(new Error("Usuário não autorizado."));
    }

    // Anexamos o objeto user inteiro ao socket
    socket.data.user = user;

    logger('info', "Usuário %s [%s] logado.", user.userName, user.role);
    next();
  } catch (error) {
    next(new Error("Erro interno na autenticação."));
  }
};
