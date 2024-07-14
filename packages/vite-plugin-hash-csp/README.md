# Vite Plugin Content Security Policy

This plugin allows you to declare your Content Security Policy (CSP) for all Vite applications.

## Documentation

[Available here](https://vite-csp.tsotne.co.uk)

**Warning**: This Plugin is still in development.

## Usage

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
      },
    }),
  ],
});
```
