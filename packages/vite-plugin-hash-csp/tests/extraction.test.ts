import { describe, expect, test } from "vitest";
import {
  EDGE_CASE_APP_CSS,
  EDGE_CASE_INDEX_CSS,
  EDGE_CASE_TAILWIND,
} from "../mocks/post";
import { getCSS } from "../src/css/extraction";
import { EDGE_CASE_INDEX, EDGE_CASE_APP, TAILWIND_CSS } from "../mocks/css";

describe("Extracting CSS", () => {
  test("Extract CSS from Post Code Bundle", () => {
    const cssIndex = getCSS(EDGE_CASE_INDEX_CSS);
    const cssApp = getCSS(EDGE_CASE_APP_CSS);
    expect(cssIndex).toEqual(EDGE_CASE_INDEX);
    expect(cssApp).toEqual(EDGE_CASE_APP);
  });

  test("Extract Tailwind CSS from Post Code Bundle", () => {
    const css = getCSS(EDGE_CASE_TAILWIND);
    expect(css).toEqual(TAILWIND_CSS);
  });
});
