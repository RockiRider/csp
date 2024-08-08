import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts", // Your plugin's entry point
  output: {
    file: "dist/index.js",
    format: "esm", // Output as ES Module
    sourcemap: false,
  },
  external: ["lightningcss", "fsevents", "vite", "cheerio"],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      include: ["src/**/*.ts"],
      sourceMap: false,
    }), // Transpile TypeScript
    resolve(), // Resolves node modules
    commonjs(), // Converts commonjs to ES modules
  ],
});
