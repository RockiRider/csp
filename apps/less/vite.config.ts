import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-csp-guard";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as PluginOption[], //This is a type assertion due to a monorepo issue regarding stylus, this is not needed in a normal project
    csp({
      dev: {
        run: true,
        outlierSupport: ["less"],
      },
      build: {
        hash: true,
      },
    })
  ],
  preview: {
    port: 4005,
  },
  server: {
    port: 3005,
  },
});
