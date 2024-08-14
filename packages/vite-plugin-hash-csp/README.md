# Vite Plugin Hash CSP

This is has moved to [vite-plugin-csp-guard]()

## Documentation

Full documentation and helpful guides are available [here](https://vite-csp.tsotne.co.uk).

## Installation

```bash
npm install -D vite-plugin-hash-csp
# or
yarn add -D vite-plugin-hash-csp
# or
pnpm add -D vite-plugin-hash-csp
```

## Basic Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import csp from "vite-plugin-hash-csp";

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
