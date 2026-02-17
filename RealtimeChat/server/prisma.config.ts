// server/prisma.config.ts
import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  migrations: {
    seed: 'tsx prisma/seed.ts', // 👈 Verifique se este caminho bate com a pasta
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
