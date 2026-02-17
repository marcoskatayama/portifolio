import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { Server as httpServer } from "http"
import { Server } from "socket.io"

export const setupSocket = (httpServer: httpServer) =>{
  const io = new Server(httpServer,{
    cors:{
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  // Aplicando o "Segurança na porta"
  io.use(authMiddleware);

  return io;

}
