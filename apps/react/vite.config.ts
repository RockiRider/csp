import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-csp-guard";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as PluginOption,
    csp({
      algorithm: "sha256",
      dev: {
        run: true,
      },
      policy: {
        "font-src": ["https://fonts.gstatic.com"],
        "script-src-elem": ["'self'"],
        "connect-src": ["*"],
        "object-src": ["'none'"],
      },
      build: {
        hash: true
      },
      // override: true,
    }),
  ],
  preview: {
    port: 4000,
  },
  server: {
    port: 3000,
  },
});
