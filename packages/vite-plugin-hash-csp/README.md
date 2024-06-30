# Vite Plugin Content Security Policy

This plugin allows you to declare your Content Security Policy (CSP) for all SPA applications using Vite as their bundler.

If you are not using a SPA, you should consider using the documented [nonce strategy instead](https://vitejs.dev/guide/features#content-security-policy-csp).

If you are using a SPA, the nonce solution will not work for you, as it requires a server. Use this plugin instead.

Proper documentation coming soon.

**Warning**: This Plugin is still in development.

## Installation

```bash

npm install vite-plugin-hash-csp

```

## Usage

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import csp from "vite-plugin-hash-csp";

export default defineConfig({
  plugins: [
    csp({
      algorithm: "sha256",
      runOnDev: true, // If you want to run the plugin on dev mode
      policy: {
        // Specify the policy here.
      },
    }),
  ],
});
```
