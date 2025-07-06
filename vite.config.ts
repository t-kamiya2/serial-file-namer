import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/serial-file-namer/',
  build: {
    outDir: 'dist',
  },
})