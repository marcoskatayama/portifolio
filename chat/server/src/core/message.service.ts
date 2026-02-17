import { prisma } from "../infra/db.js";
import type { IMessage, ISendMessagePayload } from "../types/chat.js";

export const MessageService = {
  async saveMessage(data: ISendMessagePayload): Promise<IMessage> {
    return await prisma.message.create({
      data: {
        text: data.text,
        author: data.author,
        room: data.room,
      },
    });
  },

  async getRoomHistory(roomName: string): Promise<IMessage[]> {
    return await prisma.message.findMany({
      where: { room: roomName },
      orderBy: { createdAt: "asc" },
      take: 50,
    });
  },
};
