import { expect, test } from "vitest";
import { generateHash } from "../src/core";
import { APP_CSS, INDEX_CSS } from "../mocks/css";

test("Hash CSS Correctly in 256", () => {
  const hashApp = generateHash(APP_CSS, "sha256");
  const hashIndex = generateHash(INDEX_CSS, "sha256");
  console.log(hashApp);
  expect(hashApp).toEqual("oHFeCgntvQ+95lgWp14PoPyLMUxSYMB2jBm/OqwiYho=");
  expect(hashIndex).toEqual("p5OBltPlKyHqPir3S9YLIBKtZi7Y65BbhvmELl+UvcQ=");
});
