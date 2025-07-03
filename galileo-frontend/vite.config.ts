import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Zgodnie z Galileo User Help s.72 konfigurujemy Vite z pluginem React

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});
