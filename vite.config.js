import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { updateNews } from './scripts/update-news.mjs'

const NEWS_REFRESH_INTERVAL = 5 * 60 * 1000

// Atualiza public/news.json localmente (scraping do portal) para o dev/preview
// funcionarem sem depender das Netlify Functions.
const localNews = () => ({
  name: 'local-news',
  configureServer(server) {
    updateNews()
    const timer = setInterval(updateNews, NEWS_REFRESH_INTERVAL)
    server.httpServer?.once('close', () => clearInterval(timer))
  },
  configurePreviewServer() {
    updateNews()
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
  plugins: [react(), localNews()],
  server: {
    port: 5174,
    strictPort: true,
    proxy: functionsProxy,
    watch: { ignored: ['**/public/news.json'] },
  },
  preview: {
    port: 5174,
    strictPort: true,
    proxy: functionsProxy,
  },
})
