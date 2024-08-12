import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

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
      // TODO: Looks like style-src-elem needs self + integrity attribute - https://stackoverflow.com/questions/77338818/content-security-policy-hashes-for-files-dont-seem-to-work
      // policy: {
      //   // "style-src-elem": ["'self'"],
      // },
    }),
  ],
  preview: {
    port: 4000,
  },
  server: {
    port: 3000,
  },
});
