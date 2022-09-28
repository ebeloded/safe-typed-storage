// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { name, dependencies } from './package.json'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name,
      fileName: 'lib',
    },
    rollupOptions: {
      external: Object.keys(dependencies),
    },
  },
  plugins: [
    dts({
      include: ['src/lib'],
      exclude: ['**/*.test.ts'],
    }),
  ],
})
