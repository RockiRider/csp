import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-csp-guard";

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
        "font-src": ["https://fonts.gstatic.com"],
        "script-src-elem": ["'self'"],
        "img-src": ["*"],
      },
      override: true,
    }),
  ],
  preview: {
    port: 4000,
  },
  server: {
    port: 3000,
  },
});
