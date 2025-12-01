import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/equicare/',
  build: {
    chunkSizeWarningLimit: 1000, // increases the warning limit
  },
})
