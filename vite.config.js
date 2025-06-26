import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  _plugins: [react()],
  get plugins() {
    return this._plugins
  },
  set plugins(value) {
    this._plugins = value
  },
})
