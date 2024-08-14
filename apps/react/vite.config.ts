import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-hash-csp";

// sha256-CvA/5Jt9LLnZntYQs+tHcL5iw9pe/MwHfvVrF22kwYY=
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
          "sha256-CvA/5Jt9LLnZntYQs+tHcL5iw9pe/MwHfvVrF22kwYY=",
          // "'self'",
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
