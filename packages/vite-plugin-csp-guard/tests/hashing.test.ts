import { describe, expect, test } from "vitest";
import { generateHash } from "../src/policy/core";
import { APP_CSS, CHUNK_CSS, INDEX_CSS, TAILWIND_CSS } from "../mocks/css";
import { getCSS } from "../src/css/extraction";
import { JSON_APP_CSS, JSON_INDEX_CSS } from "../mocks/post";

const APP_HASH = "oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=";
const INDEX_HASH = "p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=";

describe("Hashing Tests", () => {
  test("Hash CSS Correctly in 256", () => {
    const hashApp = generateHash(APP_CSS, "sha256");
    const hashIndex = generateHash(INDEX_CSS, "sha256");
    expect(hashApp).toEqual(APP_HASH);
    expect(hashIndex).toEqual(INDEX_HASH);
  });

  test("CSS Extraction and Hashing", () => {
    const indexCSS = getCSS(JSON_INDEX_CSS.code);
    const appCSS = getCSS(JSON_APP_CSS.code);
    const hash = generateHash(indexCSS, "sha256");

    expect(appCSS).toEqual(APP_CSS);
    expect(indexCSS).toEqual(INDEX_CSS);
    expect(hash).toEqual(INDEX_HASH);
  });

  test("Tailwind CSS Hashing", () => {
    const TAILWIND_HASH = "mOVp/ihEwO3hk0cZbCG190/lUPdu8zDouI4u4xrtezc=";
    const tailwindHash = generateHash(TAILWIND_CSS, "sha256");
    expect(tailwindHash).toEqual(TAILWIND_HASH);
  });

  test("Chunk CSS Hashing", () => {
    const CHUNK_HASH = "o22LaMaNL7OsoVecyuE7bIOCCdvBjkvxOCg2FJJMm5w=";
    const calculatedHash = generateHash(CHUNK_CSS, "sha256");
    expect(calculatedHash).toEqual(CHUNK_HASH);
  });
});
