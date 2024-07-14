import { describe, expect, test } from "vitest";
import { generateHash } from "../src/policy/core";
import {
  APP_CSS,
  INDEX_CSS,
  JSON_APP_CSS,
  JSON_INDEX_CSS,
  TAILWIND_CSS,
} from "../mocks/css";
import { getCSS } from "../src/css/extraction";

const APP_HASH = "oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=";
const INDEX_HASH = "p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=";

describe("Hashing Tests", () => {
  test("Hash CSS Correctly in 256", () => {
    const hashApp = generateHash(APP_CSS, "sha256");
    const hashIndex = generateHash(INDEX_CSS, "sha256");
    expect(hashApp).toEqual(APP_HASH);
    expect(hashIndex).toEqual(INDEX_HASH);
  });

  test("CSS Extraction  ", () => {
    const indexCSS = getCSS(JSON_INDEX_CSS.code);
    const appCSS = getCSS(JSON_APP_CSS.code);
    const hash = generateHash(indexCSS, "sha256");

    expect(appCSS).toEqual(APP_CSS);
    expect(indexCSS).toEqual(INDEX_CSS);
    expect(hash).toEqual(INDEX_HASH);
  });

  test.only("Tailwind CSS Hashing", () => {
    const TAILWIND_HASH = "mOVp/ihEwO3hk0cZbCG190/lUPdu8zDouI4u4xrtezc=";

    const css = getCSS(TAILWIND_CSS.code);

    const tailwindHash = generateHash(css, "sha256");

    expect(tailwindHash).toEqual(TAILWIND_HASH);
  });
});
