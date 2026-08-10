import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls to the Express server during dev.
      // Host: http://localhost:3111. In Docker: http://api:3111 (see compose).
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:3111',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
