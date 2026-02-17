import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '.ngrok-free.app', // Dica: use o ponto inicial para aceitar QUALQUER subdomínio do ngrok
    ],
    host: true,
    port: 5173,
  },
});
