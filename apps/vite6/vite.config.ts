import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-csp-guard";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
        "img-src": ["https://placehold.co/600x400?text=Hello+World"]
      },
    }) as PluginOption // Needed due to pnpm different dependency versions for Vite,
  ],
  preview: {
    port: 4013,
  },
  server: {
    port: 3013,
  },
});
