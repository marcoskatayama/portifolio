import { MessageService } from '@/core/message.service.js';
import { logger } from "@/infra/logger.js";
import type { ISendMessagePayload, ITypingPayload } from '@/types/chat.types.js';
import { Server, Socket } from "socket.io";

export const registerChatHandlers = (io: Server, socket: Socket) =>{
  socket.on("join_room", async(roomName: string)=>{
    socket.join(roomName);
    logger('info', "Usuário %s entrou na sala %s", socket.id, roomName);

    try{
      const history = await MessageService.getRoomHistory(roomName);

      socket.emit("load_history", history);

    }catch(error){
      logger('error', "Erro ao carregar histórico: %s", error )
    }
  });

  socket.on("send_message", async(data: ISendMessagePayload)=>{
    try{
      const newMessage = await MessageService.saveMessage(data);

      logger('info', 'Mensagem de %s salva na sala %s', data.author, data.room);

      // O evento de retorno envia a mensagem completa (IMessage)
      io.to(data.room).emit("receive_message", newMessage);
    }catch(error){
      logger('error', "Erro ao salvar mensagem: %s", error)
    }
  });

  socket.on("typing", async(data: ITypingPayload)=>{
    socket.to(data.room).emit("display_typing", data);
  });

  socket.on("disconnect", ()=>{
    logger('info', "Usuário %s desconectado", socket.id);
  });
}
