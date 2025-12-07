import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  html: {
    template: './index.html',
  },
  entry: {
    main: './src/index.tsx',
  }
  // Removed the invalid output configuration, as 'path' and '__dirname' are not defined and Rsbuild handles output via its own config conventions.
});

