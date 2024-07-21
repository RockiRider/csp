import { test, expect } from "@playwright/test";

const TITLE = "Vite + Preact";

test("Index HTML Loaded", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(TITLE);
});

test("Loaded main JS script", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`text=${TITLE}`)).toBeVisible();
});

test("Loaded CSS Styles", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("heading", { name: TITLE });
  const button = page.getByRole("button", { name: "count is" });
  await expect(element).toBeVisible();

  const color = await button.evaluate(
    (el) => window.getComputedStyle(el).backgroundColor
  );

  expect(color).toBe("rgb(103, 58, 184)");
});
