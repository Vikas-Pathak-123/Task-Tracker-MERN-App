import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // This makes vitest globals available
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  }
});