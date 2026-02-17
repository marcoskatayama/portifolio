import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "node:fs";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

// --- CONFIGURAÇÕES E BANCO ---
const SECRET_KEY = "sua_chave_mestra_secreta"; // Em produção, use process.env.JWT_SECRET
const db = new Database("chat.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT,
    password TEXT
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_name TEXT,
    content TEXT,
    time TEXT,
    file_url TEXT,
    user_id INTEGER
  );
`);

// --- INTERFACES ---
interface UserSession {
  id: string;
  userId: number;
  name: string;
  status: string;
}

const app = express();
const server = createServer(app);
const io = new Server(server, { maxHttpBufferSize: 1e7 });

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, "../public");
const uploadDir = join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const users = new Map<string, UserSession>();

// --- MULTER CONFIG ---
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// --- ROTAS DE AUTENTICAÇÃO ---

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    );
    stmt.run(name, email, hashedPassword);
    res.status(201).send("Usuário criado");
  } catch (err) {
    res.status(400).send("E-mail já existe");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user: any = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
      expiresIn: "1d",
    });
    res.json({ token, user: { id: user.id, name: user.name } });
  } else {
    res.status(401).send("Credenciais inválidas");
  }
});

// --- ROTA DE UPLOAD ---
app.post("/upload", upload.single("anexo"), (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Acesso negado");

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const fileName = Buffer.from(req.file!.originalname, "latin1").toString(
      "utf8",
    );
    const fileUrl = `/files/${req.file!.filename}`;
    const time = new Date().toLocaleTimeString();

    const stmt = db.prepare(
      "INSERT INTO messages (sender_name, content, time, file_url, user_id) VALUES (?, ?, ?, ?, ?)",
    );
    stmt.run(
      decoded.name,
      `📎 Arquivo: ${fileName}`,
      time,
      fileUrl,
      decoded.id,
    );

    io.emit(
      "chat message",
      `${decoded.name}: 📎 Arquivo: ${fileName}`,
      time,
      fileUrl,
      decoded.id,
    );
    res.json({ url: fileUrl });
  } catch (err) {
    res.status(401).send("Token inválido");
  }
});

app.use("/files", express.static(uploadDir));
app.use(express.static(publicPath));

app.get("/", (_req, res) => res.sendFile(join(publicPath, "index.html")));

// --- SOCKET.IO ---
io.on("connection", (socket) => {
  const history = db
    .prepare("SELECT * FROM messages ORDER BY id ASC LIMIT 50")
    .all();
  socket.emit("load history", history);

  socket.on("login", (name, userId) => {
    users.set(socket.id, { id: socket.id, userId, name, status: "Disponível" });
    io.emit("user list", Array.from(users.values()));
  });

  socket.on("update status", (status) => {
    const user = users.get(socket.id);
    if (user) {
      user.status = status;
      io.emit("user list", Array.from(users.values()));
    }
  });

  socket.on("chat message", (msg, time, userId) => {
    const user = users.get(socket.id);
    if (!user) return;

    const stmt = db.prepare(
      "INSERT INTO messages (sender_name, content, time, user_id) VALUES (?, ?, ?, ?)",
    );
    stmt.run(user.name, msg, time, userId);

    io.emit("chat message", `${user.name}: ${msg}`, time, undefined, userId);
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("user list", Array.from(users.values()));
  });
});

server.listen(3000, () => console.log("Servidor rodando na porta %d", 3000));
