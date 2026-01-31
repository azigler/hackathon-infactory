import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4000,
    proxy: {
      '/api/infactory': {
        target: 'https://atlantichack-api.infactory.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/infactory/, '/v1'),
        secure: true,
      },
    },
  },
})
