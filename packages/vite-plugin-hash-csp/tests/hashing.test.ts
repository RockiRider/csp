import { expect, test } from "vitest";
import { generateHash } from "../src/policy/core";
import { APP_CSS, INDEX_CSS } from "../mocks/css";

const APP_HASH = "oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=";
const INDEX_HASH = "p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=";

test("Hash CSS Correctly in 256", () => {
  const hashApp = generateHash(APP_CSS, "sha256");
  const hashIndex = generateHash(INDEX_CSS, "sha256");
  expect(hashApp).toEqual(APP_HASH);
  expect(hashIndex).toEqual(INDEX_HASH);
});
