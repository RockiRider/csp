import { expect, test } from "vitest";
import { generateHash } from "../src/core";
import { ALT_CHUNK_CSS, APP_CSS, CHUNK_CSS, INDEX_CSS } from "../mocks/css";
import { JS_MOCK } from "../mocks/js";

const APP_HASH = "oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=";
const INDEX_HASH = "p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=";
const JS_HASH = "gdgp4QhxZKdMhnpz1m/wTtQEbP8b2wsJECnn/U8mXnA=";

test("Hash CSS Correctly in 256", () => {
  const hashApp = generateHash(APP_CSS, "sha256");
  const hashIndex = generateHash(INDEX_CSS, "sha256");
  const chunkIndex = generateHash(CHUNK_CSS, "sha256");
  const altChunk = generateHash(ALT_CHUNK_CSS, "sha256");
  console.log(chunkIndex);
  console.log(altChunk);
  expect(hashApp).toEqual(APP_HASH);
  expect(hashIndex).toEqual(INDEX_HASH);
});

test("Hash JS Bundle Correctly in 256", async () => {
  const mock = await JS_MOCK;
  const hash = generateHash(mock, "sha256");
  expect(hash).toEqual(JS_HASH);
});
