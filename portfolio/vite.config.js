import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aquila: resolve(__dirname, 'project-aquila.html'),
        aegis: resolve(__dirname, 'project-aegis.html'),
        aegisMobile: resolve(__dirname, 'project-aegis-mobile.html'),
        codemortem: resolve(__dirname, 'project-codemortem.html'),
        vertexswarm: resolve(__dirname, 'project-vertexswarm.html')
      }
    }
  }
})
