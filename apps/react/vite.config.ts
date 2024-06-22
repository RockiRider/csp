import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import csp from "vite-plugin-content-security-policy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    csp({
      algorithm: "sha256",
      runOnDev: true,
    }),
  ],
});
