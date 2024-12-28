import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  html: {
    cspNonce: "NONCE-PLACEHOLDER", // Add a placeholder for CSP nonce
  },
  ssr: {
    // Define entry file for server-side rendering
    noExternal: ['@vitejs/plugin-react'] // Example to prevent externalizing the React plugin
  }
});