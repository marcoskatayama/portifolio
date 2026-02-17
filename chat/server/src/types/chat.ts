// Interfaces para os dados do banco (Prisma)
export interface IMessage {
  id: string;
  text: string;
  author: string;
  room: string;
  createdAt: Date | string;
}

// Interfaces para os eventos de entrada (Payloads)
export interface ISendMessagePayload {
  text: string;
  author: string;
  room: string;
}

export interface ITypingPayload {
  room: string;
  user: string;
  isTyping: boolean;
}
