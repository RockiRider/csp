import { test, expect } from "@playwright/test";
import { genericTests, jQueryTest, viteLogoTest } from '@repo/tests';

const TITLE = "Vite + Material UI + TS";
const HEADER_COLOUR = "rgb(63, 80, 181)"
const BTN_COLOUR = "rgb(0, 0, 255)"

genericTests(TITLE, {headerColour: HEADER_COLOUR, buttonColour: BTN_COLOUR})
viteLogoTest();
test("Roboto font is loaded", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("heading", { name: TITLE });
  await expect(element).toBeVisible();

  const fontFamily = await element.evaluate(
    (el) => window.getComputedStyle(el).fontFamily
  );

  expect(fontFamily).toBe("Roboto, Helvetica, Arial, sans-serif");
});
