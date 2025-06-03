/** @prettier */

import { defineConfig } from 'vite';
import { resolve } from 'path';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

const copyright = `/*! ${pkg.name} v${pkg.version} ${pkg.author} | ${pkg.license} License */`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [banner(copyright)],
  server: {
    port: 3000,
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SwsScrollableContainer',
      fileName: (format: string): string => {
        switch (format) {
          case 'umd':
            return 'sws-scrollable-container.umd.js';
          default:
            return 'index.esm.js';
        }
      },
      formats: ['es', 'umd'],
    },
  },
});
