import fs from 'fs'
import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),

    // Server apple-app-site-association with a JSON mime type
    {
      name: 'configure-server',
      configureServer (server) {
        server.middlewares.use((req, res, next) => {
          if (req.originalUrl === '/.well-known/apple-app-site-association') {
            res.setHeader('Content-Type', 'application/json')
            const filePath = path.join(__dirname, 'public/.well-known/apple-app-site-association')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      },
      configurePreviewServer (server) {
        server.middlewares.use((req, res, next) => {
          if (req.originalUrl === '/.well-known/apple-app-site-association') {
            res.setHeader('Content-Type', 'application/json')
            const filePath = path.join(__dirname, 'public/.well-known/apple-app-site-association')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      }
    }
  ],
  server: {
    allowedHosts: ['content-chicken-truly.ngrok-free.app']
  }
})
