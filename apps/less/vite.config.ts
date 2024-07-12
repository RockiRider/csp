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
        outlierSupport: ["less"],
      },
    }),
  ],
  preview: {
    port: 4005,
  },
  server: {
    port: 3005,
  },
});
