import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const NETLIFY_TARGET = 'https://pelotense-assets.netlify.app'

const functionsProxy = {
  '/.netlify/functions': {
    target: NETLIFY_TARGET,
    changeOrigin: true,
    secure: true,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: functionsProxy },
  preview: { proxy: functionsProxy },
})
