// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/safe-typed-storage.ts'),
      name: 'safe-typed-storage',
      // the proper extensions will be added
      fileName: 'safe-typed-storage',
    },
  },
})
