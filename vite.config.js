import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isNetlifyDev = process.env.NETLIFY_DEV === 'true'
const NETLIFY_TARGET = isNetlifyDev ? 'http://localhost:8888' : 'https://pelotense-assets.netlify.app'

const functionsProxy = {
  '/.netlify/functions': {
    target: NETLIFY_TARGET,
    changeOrigin: true,
    secure: !isNetlifyDev,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: functionsProxy },
  preview: { proxy: functionsProxy },
})
