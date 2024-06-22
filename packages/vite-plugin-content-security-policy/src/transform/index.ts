import { createFilter } from "vite";
import { addHash, generateHash } from "../core";
import { HashAlgorithms, HashCollection } from "../types";

const cssFilter = createFilter("**.css");
const jsTsFilter = createFilter(["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"]);

export const transformHandler = (
  code: string,
  id: string,
  algorithm: HashAlgorithms,
  CORE_COLLECTION: HashCollection
) => {
  const isCss = cssFilter(id);
  const isJs = jsTsFilter(id);

  if (isJs) {
    const hash = generateHash(code, algorithm);
    addHash({
      hash,
      key: "scriptSrcHashes",
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
      key: "styleSrcHashes",
      data: {
        algorithm,
        content: code,
      },
      collection: CORE_COLLECTION,
    });
  }

  return null;
};
