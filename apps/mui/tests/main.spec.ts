import { test, expect } from "@playwright/test";
import { genericTests, jQueryTest } from '@repo/tests';

const TITLE = "Vite + Material UI + TS";
const COLOUR = "rgb(63, 80, 181)"

genericTests(TITLE, COLOUR)
jQueryTest()

test("Roboto font is loaded", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("heading", { name: TITLE });
  await expect(element).toBeVisible();

  const fontFamily = await element.evaluate(
    (el) => window.getComputedStyle(el).fontFamily
  );

  expect(fontFamily).toBe("Roboto, Helvetica, Arial, sans-serif");
});
