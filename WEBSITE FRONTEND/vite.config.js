import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['bootstrap', 'react-bootstrap', 'react-toastify', 'react-hook-form']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
