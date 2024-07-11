import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: "sha256",
      unstable_runOnDev: false,
      policy: {
        "style-src-elem": [
          "'self'",
          "https://fonts.googleapis.com",
          "'unsafe-inline'",
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
      },
    }),
  ],
  preview: {
    port: 4001,
  },
  server: {
    port: 3001,
  },
});
