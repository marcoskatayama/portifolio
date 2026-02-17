// prisma/seed.ts
// Tente importar o PrismaClient diretamente da pasta onde ele foi gerado
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import pg from 'pg'; // Importação direta do driver pg ajuda na estabilidade
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL não definida");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando o Seed...");

  // Verifique se o nome do modelo está correto (Prisma costuma usar minúsculo: user, room)
  // Se o seu schema tem "model User", o prisma expõe como "prisma.user"
  const root = await prisma.user.upsert({
    where: { userName: 'root' },
    update: {},
    create: {
      userName: 'root',
      password: 'root123',
      role: 'ROOT',
    },
  });

  console.log("✅ Usuário Root criado:", root.userName);

  const admin = await prisma.user.upsert({
    where: { userName: 'admin' },
    update: {},
    create: {
      userName: 'admin',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  const room = await prisma.room.upsert({
    where: { name: 'Geral' },
    update: {},
    create: {
      name: 'Geral',
      description: 'Sala principal de suporte',
    },
  });

  console.log("✅ Seed finalizado!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
