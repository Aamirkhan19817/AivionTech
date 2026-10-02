import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          restaurant: path.resolve(__dirname, 'demos/restaurant.html'),
          ecommerce: path.resolve(__dirname, 'demos/ecommerce.html'),
          saas: path.resolve(__dirname, 'demos/saas.html'),
          ai: path.resolve(__dirname, 'demos/ai.html'),
          mobileApp: path.resolve(__dirname, 'demos/mobile-app.html'),
          realEstate: path.resolve(__dirname, 'demos/real-estate.html'),
          corporate: path.resolve(__dirname, 'demos/corporate.html'),
          creativeStudio: path.resolve(__dirname, 'demos/creative-studio.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
