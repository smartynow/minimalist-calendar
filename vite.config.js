import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'MinimalistCalendar',
      fileName: 'minimalist-calendar'
    },
    rollupOptions: {
      output: {
        globals: {
          'minimalist-calendar': 'MinimalistCalendar',
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import './src/style.css';`
      }
    }
  }
})
