import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false, // Set to true to auto-open browser on start
    host: true   // Listen on all addresses for network access
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
