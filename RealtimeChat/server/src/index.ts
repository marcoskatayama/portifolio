import { registerChatHandlers } from '@/handlers/chat.handler.js';
import { prisma } from "@/infra/db.js";
import { logger } from "@/infra/logger.js";
import { httpServer, io } from "@/infra/server.js";
import "dotenv/config";

// Registro de eventos global
io.on("connection", (socket)=>{
  logger('info', "Conexão estabelecida: %s (User: %s)", socket.id, socket.data.userName);

  registerChatHandlers(io, socket);

  socket.on("disconnect", (reason)=>{
    logger("warn", "Usuário %s desconectado. Motivo: %s", socket.data.userName, reason);
  })
})

const PORT = Number(process.env.PORT) || 3001;

// Inicialização com tratamento de erro
async function bootstrap(){
  try{
    logger('debug', "Tentando conectar ao banco de dados...");

    await prisma.$connect();
    logger('success', "Banco de dados conectado com sucesso!");

    httpServer.listen(PORT, "0.0.0.0", ()=>{
      logger('success', "Servidor iniciado em http://localhost:%s", PORT);
    })
  }catch(error){
    logger('error', "❌ FALHA NO BOOTSTRAP: Não foi possível conectar ao banco de dados.");
    logger('error', "Detalhes do erro: %s", error);

    process.exit(1);
  }

}

bootstrap();
