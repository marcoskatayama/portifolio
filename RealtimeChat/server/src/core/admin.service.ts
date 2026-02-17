import { prisma } from "@/infra/db.js";
import { UserRole } from "@prisma-generated";

export const AdminService = {
  // Criar novo usuário de suporte
  async createUser(userName: string, role: UserRole = "SUPPORT") {
    return await prisma.user.create({
      data: { userName, password: "123", role } // Senha padrão para o tutorial
    });
  },

  // Gerenciar Salas
  async createRoom(name: string, description?: string) {
    return await prisma.room.create({
      data: {
        name,
        description: description ?? null
      }
    });
  },

  async listAllRooms() {
    return await prisma.room.findMany({
      include: { _count: { select: { messages: true } } }
    });
  }
};
