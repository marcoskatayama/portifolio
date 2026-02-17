import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerChatHandlers } from "./handlers/chat.handler.js";
import { logger } from "./infra/logger.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Aceita tanto localhost quanto o IP 127.0.0.1
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://localhost:5173",
      "https://127.0.0.1:5173",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      "https://localhost:3001",
      "https://127.0.0.1:3001",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  logger("Novo socket conectado: %s", socket.id);

  // Registra os handlers de chat
  registerChatHandlers(io, socket);
});

const PORT = Number(process.env.PORT) || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} em 0.0.0.0`);
});
