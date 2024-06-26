import { ViteDevServer, createFilter } from "vite";
import { addHash, generateHash } from "../core";
import { HashAlgorithms, HashCollection } from "../types";

const cssFilter = createFilter("**.css");
const jsTsFilter = createFilter(["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"]);
const htmlFilter = createFilter("**.html");

export interface TransformHandlerProps {
  code: string;
  id: string;
  algorithm: HashAlgorithms;
  CORE_COLLECTION: HashCollection;
  server?: ViteDevServer; // This is the ViteDevServer, if this exists it means we are in dev mode
}

export const transformHandler = async ({
  code,
  id,
  algorithm,
  CORE_COLLECTION,
  server,
}: TransformHandlerProps) => {
  const isCss = cssFilter(id);
  const isJs = jsTsFilter(id);
  const isHtml = htmlFilter(id);

  if (isJs) {
    const hash = generateHash(code, algorithm);
    addHash({
      hash,
      key: "script-src",
      data: {
        algorithm,
        content: code,
      },
      collection: CORE_COLLECTION,
    });
  }

  if (isCss) {
    const hash = generateHash(code, algorithm);
    addHash({
      hash,
      key: "style-src",
      data: {
        algorithm,
        content: code,
      },
      collection: CORE_COLLECTION,
    });
  }

  if (isHtml) {
    console.log("HTML file found", id);
  }

  if (server && (isCss || isJs)) {
    await server.transformIndexHtml("/index.html", "", "/");
    server.ws.send({
      type: "full-reload",
    });
  }

  return null;
};
