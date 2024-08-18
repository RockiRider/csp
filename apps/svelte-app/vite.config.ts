import { defineConfig, PluginOption } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import csp from "vite-plugin-csp-guard";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    csp({
      dev: {
        run: true,
      },
      build: {
        hash: true,
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
