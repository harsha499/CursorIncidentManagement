import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Declare process for TypeScript (available at build time in Node.js environment)
declare const process: { env: Record<string, string | undefined> };

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './index.html',
  },
  source: {
    // Define environment variables that will be available in the client code
    define: {
      __API_URL__: JSON.stringify(
        process.env.VITE_API_URL || 'https://genieimsserver.onrender.com/api'
      ),
    },
  },
});

