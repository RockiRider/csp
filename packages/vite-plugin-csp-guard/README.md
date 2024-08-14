# Vite Plugin CSP Guard

This is a well tested Vite Plugin that allows you to declare your Content Security Policy (CSP) for your Vite project. First class support for SPA's

## Documentation

Full documentation and helpful guides are available [here](https://vite-csp.tsotne.co.uk).

## Installation

```bash
npm install -D vite-plugin-csp-guard
# or
yarn add -D vite-plugin-csp-guard
# or
pnpm add -D vite-plugin-csp-guard
```

## Basic Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import csp from "vite-plugin-csp-guard";

export default defineConfig({
  plugins: [
    csp({
      algorithm: "sha256", // The algorithm to use for hashing
      dev: {
        run: true, // If you want to run the plugin in `vite dev` mode
      },
      policy: {
        // Specify the policy here.
        "script-src": ["'self'", "https://www.google-analytics.com"], // Example: Allow Google Analytics
        "style-src": ["'self'", "https://fonts.googleapis.com"], // Example: Allow Google Fonts
      },
    }),
  ],
});
```
