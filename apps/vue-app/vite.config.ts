import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), csp()],
  preview: {
    port: 4007,
  },
  server: {
    port: 3007,
  },
});
