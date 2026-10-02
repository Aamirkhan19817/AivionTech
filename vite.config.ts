import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/AivionTech/',
  
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        restaurant: fileURLToPath(new URL('./demos/restaurant.html', import.meta.url)),
        ecommerce: fileURLToPath(new URL('./demos/ecommerce.html', import.meta.url)),
        saas: fileURLToPath(new URL('./demos/saas.html', import.meta.url)),
        ai: fileURLToPath(new URL('./demos/ai.html', import.meta.url)),
        mobileApp: fileURLToPath(new URL('./demos/mobile-app.html', import.meta.url)),
        realEstate: fileURLToPath(new URL('./demos/real-estate.html', import.meta.url)),
        corporate: fileURLToPath(new URL('./demos/corporate.html', import.meta.url)),
        creativeStudio: fileURLToPath(new URL('./demos/creative-studio.html', import.meta.url)),
      },
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
