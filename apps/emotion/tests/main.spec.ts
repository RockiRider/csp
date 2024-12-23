import { test, expect } from "@playwright/test";
import { genericTests, jQueryTest } from '@repo/tests';

const TITLE = "Vite + Emotion";
const COLOUR = "rgb(255, 0, 0)"

genericTests(TITLE, COLOUR)
jQueryTest()


test("Loaded Emotion styles", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("button", { name: "Click Me" });
  await expect(element).toBeVisible();

  const color = await element.evaluate(
    (el) => window.getComputedStyle(el).color
  );
  const borderColor = await element.evaluate(
    (el) => window.getComputedStyle(el).borderColor
  );

  expect(color).toBe("rgb(255, 0, 0)");
  expect(borderColor).toBe("rgb(0, 0, 0)");
});
