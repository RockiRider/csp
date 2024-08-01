import { defineConfig, PluginOption } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      csr: true,
    }),
    csp({ dev: { run: true } }) as PluginOption,
  ],
  preview: {
    port: 4011,
  },
  server: {
    port: 3011,
  },
});
