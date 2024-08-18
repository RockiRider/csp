import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-csp-guard";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      dev: {
        run: true,
        outlierSupport: ["tailwind"],
      },
      build: {
        hash: true,
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
