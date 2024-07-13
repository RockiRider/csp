import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as PluginOption[], //This is a type assertion due to a monorepo issue regarding stylus, this is not needed in a normal project
    csp({
      dev: {
        run: true,
        outlierSupport: ["tailwind"],
      },
      policy: {
        "style-src-elem": ["'unsafe-inline'"], //For testing purposes on dev
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
