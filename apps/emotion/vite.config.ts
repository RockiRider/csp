import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: "sha256",
      dev: {
        run: true,
      },
      policy: {
        "style-src-elem": ["'self'", "'unsafe-inline'"],
      },
      build: {
        hash: true,
      },
    }),
  ],
  preview: {
    port: 4002,
  },
  server: {
    port: 3002,
  },
});
