import { defineConfig, PluginOption } from "vite";
import preact from "@preact/preset-vite";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    csp({
      dev: {
        run: true,
      },
    }) as PluginOption, //This is a type assertion due to a monorepo issue regarding stylus, this is not needed in a normal project
  ],
  preview: {
    port: 4009,
  },
  server: {
    port: 3009,
  },
});
