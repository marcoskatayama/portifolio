import { adminMiddleware } from "@/middlewares/admin.middleware.js";
import { adminRouter } from "@/routes/admin.routes.js";
import { authRoutes } from "@/routes/auth.routes.js";
import cors from "cors";
import express from "express";
import { io } from "./server.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  methods: ["GET", "POST"]
}));

// Middleware para injetar o IO no Request
app.use((req, res, next) => {
  req.io = io; // Adicionamos a instância do socket ao req
  next();
});

// Rotas de Autenticação (Abertas)
app.use("/api/auth", authRoutes);

// Rotas de Admin (Protegidas pelo Middleware)
app.use("/api/admin", adminMiddleware, adminRouter);

// Rota de Health
app.get("/health", (req, res)=>{
  res.status(200).json({status: "ok", uptime: process.uptime()});
})

// Registramos as rotas com um prefixo /api
app.use("/api/admin", adminRouter);

export { app };
