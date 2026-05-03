import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@foliate': resolve(__dirname, 'public/foliate-js'),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from project root
      allow: ['..']
    },
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    exclude: ['public/foliate-js']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
