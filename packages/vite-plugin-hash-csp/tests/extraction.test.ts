import { describe, expect, test } from "vitest";
import { getCSS } from "../src/css/extraction";
import { TAILWIND_CSS } from "../mocks/css";

describe.skip("Extracting CSS", () => {
  test("Extract CSS from Post Code Bundle", () => {
    const css = getCSS(CODE_AS_STRING);

    expect(css).toEqual(TAILWIND_CSS);
  });
});
