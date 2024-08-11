import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

/**
 *
 * CSS
 * sha256-qsfMV6JqdfePzldeVBtWAnvLnLg+d3fAdaIq0Lh+V+I=
 * sha256-o22LaMaNL7OsoVecyuE7bIOCCdvBjkvxOCg2FJJMm5w=
 */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: "sha256",
      dev: {
        run: true,
      },
      build: {
        hash: true,
      },
      policy: {
        "script-src-elem": [
          "sha256-oWml5nrPINRkZhELs/sKk06aIJNksax12wCLOZDmZP0=",
          "sha256-T+n1ZMrNyBOJSV/0+0XknK27nMmRwgIItRQzIzcXOag=",
          // "'self'",
        ],
        "style-src-elem": [
          "sha256-qsfMV6JqdfePzldeVBtWAnvLnLg+d3fAdaIq0Lh+V+I=",
        ],
      },
    }),
  ],
  preview: {
    port: 4000,
  },
  server: {
    port: 3000,
  },
});
