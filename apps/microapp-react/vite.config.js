import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9530,
    cors: true,
    origin: 'http://localhost:9530'
  }
})