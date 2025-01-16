import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "test.desu.one", // Замените на ваш IP
    port: 3000, // Укажите порт
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
        assetFileNames: ({ names }) => {
          if (/\.(css)$/.test(names[0] ?? "")) {
            return "index.css";
          }
          return "index[extname]";
        },
      },
    },
  },
});
