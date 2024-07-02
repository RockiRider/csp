import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: "sha256",
      unstable_runOnDev: true,
    }),
  ],
  preview: {
    port: 4000,
  },
  server: {
    port: 3000,
  },
});
