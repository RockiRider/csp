import csp from "vite-plugin-hash-csp";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  vite: {
    html: {
      cspNonce: "PLACEHOLDER",
    },
    plugins: [csp({ dev: { run: true }, features: { mpa: true } })],
  },
});
