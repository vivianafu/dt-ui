import path from 'path'
import fs from 'fs'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  // serve configuration
  if (command === 'serve') {
    return {
      plugins: [react(), svgrPlugin()],
    }
  }

  // build configuration
  if (command === 'build') {
    const dts = (await import('vite-plugin-dts')).default
    const cssInjectedByJsPlugin = (await import('vite-plugin-css-injected-by-js')).default
    const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString())
    return {
      plugins: [
        react(),
        svgrPlugin(),
        dts({
          insertTypesEntry: true,
        }),
        cssInjectedByJsPlugin(),
      ],
      build: {
        lib: {
          name: 'DT-UI',
          entry: path.resolve(__dirname, 'src/index.ts'),
          formats: ['es', 'umd'],
          fileName: (format) => `vi-dt-ui.${format}.js`,
        },
        rollupOptions: {
          external: Object.keys(pkg.dependencies),
          output: {
            globals: {
              react: 'React',
            },
          },
        },
      },
    }
  }
})
