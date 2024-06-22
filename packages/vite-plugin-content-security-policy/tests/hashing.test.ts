import { expect, test } from "vitest";
import { generateHash } from "../src/core";
import {
  APP_CSS,
  INDEX_CSS,
  JSON_APP_CSS,
  JSON_INDEX_CSS,
  TR_APP_CSS,
} from "../mocks/css";
import { cssParser, extractCSSFromVariable } from "../src/transformers";

const APP_HASH = "oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=";
const INDEX_HASH = "p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=";

test("Hash CSS Correctly in 256", () => {
  const hashApp = generateHash(APP_CSS, "sha256");
  const hashIndex = generateHash(INDEX_CSS, "sha256");
  expect(hashApp).toEqual(APP_HASH);
  expect(hashIndex).toEqual(INDEX_HASH);
});

test("CSS Parser Byte Comparison", () => {
  const encoder = new TextEncoder();

  // Parse the CSS and encode both the result and the expected string to Uint8Array
  const parsedBytes = encoder.encode(cssParser(TR_APP_CSS));
  const expectedBytes = encoder.encode(APP_CSS);

  // Convert Uint8Array to regular arrays for comparison
  const parsedArray = Array.from(parsedBytes);
  const expectedArray = Array.from(expectedBytes);

  // Expect the arrays to be equal
  expect(parsedArray).toEqual(expectedArray);
});

test("CSS Extraction  ", () => {
  const indexCSS = cssParser(extractCSSFromVariable(JSON_INDEX_CSS.code));
  const appCSS = cssParser(extractCSSFromVariable(JSON_APP_CSS.code));
  const hash = generateHash(indexCSS, "sha256");

  expect(appCSS).toEqual(APP_CSS);
  expect(indexCSS).toEqual(INDEX_CSS);
  expect(hash).toEqual(INDEX_HASH);
});
