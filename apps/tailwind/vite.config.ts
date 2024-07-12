import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      dev: {
        run: true,
        outlierSupport: ["tailwind"],
      },
      policy: {
        "style-src-elem": ["'unsafe-inline'"],
      },
    }),
  ],
  preview: {
    port: 4003,
  },
  server: {
    port: 3003,
  },
});
