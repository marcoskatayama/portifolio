import { app } from "@/infra/http.js";
import { setupSocket } from "@/infra/socket.js";
import { createServer } from "http";

const httpServer = createServer(app);
const io = setupSocket(httpServer);

export { httpServer, io };
