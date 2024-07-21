import { defineConfig, PluginOption } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    csp({
      dev: {
        run: true,
      },
    }) as PluginOption,
  ],
  preview: {
    port: 4008,
  },
  server: {
    port: 3008,
  },
});
