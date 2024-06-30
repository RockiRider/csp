import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: "sha256",
      runOnDev: true,
      policy: {
        "script-src": ["'self'"],
        "style-src": ["sha-256-o22LaMaNL7OsoVecyuE7bIOCCdvBjkvxOCg2FJJMm5w="],
        // "style-src-elem": [
        // "'self'",
        // "sha-256-o22LaMaNL7OsoVecyuE7bIOCCdvBjkvxOCg2FJJMm5w=",
        // "sha-256-7oOY9dTIVN4QElYp+bjo8qcaCyQUVU+xBWXoR2jywFQ=",
        // ],
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
