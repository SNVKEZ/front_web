import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚙️ Конфигурация Vite
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,        // 🌐 теперь dev-сервер запустится на http://localhost:3010
    open: true,        // 🚀 автоматически открывает браузер при старте
    proxy: {
      // 🔁 Проксирование API-запросов на backend
      '/api': {
        target: 'http://localhost:8000', // адрес твоего backend
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''), // убирает /api из пути, если нужно
      },
    },
  },
})