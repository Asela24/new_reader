import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.1.2', // Замените на ваш IP
    port: 3000,           // Укажите порт
  },
})
