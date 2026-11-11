import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { updateNews } from './scripts/update-news.mjs'
import { updateAgro } from './scripts/update-agro.mjs'

const REFRESH_INTERVAL = 5 * 60 * 1000

// Atualiza os JSONs locais (public/news.json e public/agro.json) ao iniciar o
// dev server e a cada 5 minutos, para funcionar sem as Netlify Functions.
const localData = (name, task) => ({
  name,
  configureServer(server) {
    task()
    const timer = setInterval(task, REFRESH_INTERVAL)
    server.httpServer?.once('close', () => clearInterval(timer))
  },
  configurePreviewServer() {
    task()
  },
})

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
  plugins: [
    react(),
    localData('local-news', updateNews),
    localData('local-agro', updateAgro),
  ],
  server: {
    port: 5174,
    strictPort: true,
    proxy: functionsProxy,
    watch: { ignored: ['**/public/news.json', '**/public/agro.json'] },
  },
  preview: {
    port: 5174,
    strictPort: true,
    proxy: functionsProxy,
  },
})
