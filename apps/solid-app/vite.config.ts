import { defineConfig, PluginOption } from "vite";
import solid from "vite-plugin-solid";
import csp from "vite-plugin-csp-guard";

export default defineConfig({
  plugins: [
    solid(),
    csp({ dev: { run: true }, build: { hash: true } }) as PluginOption,
  ],
  preview: {
    port: 4010,
  },
  server: {
    port: 3010,
  },
});
