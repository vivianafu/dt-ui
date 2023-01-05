import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: ['./tailwind.config.js', 'node_modules/**'],
    },
  },
  optimizeDeps: {
    include: ['tailwind-config'],
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
      'tailwind-config': path.resolve(__dirname, './tailwind.config.cjs'),
    },
  },
});
