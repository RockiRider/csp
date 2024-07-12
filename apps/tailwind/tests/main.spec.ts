import { test, expect } from "@playwright/test";

const TITLE = "Vite + Tailwind";

test("Index HTML Loaded", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(TITLE);
});

test("Loaded main JS script", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`text=${TITLE}`)).toBeVisible();
});

test("Loaded Tailwind styles", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("button", { name: "Count is 0" });
  await expect(element).toBeVisible();

  const color = await element.evaluate(
    (el) => window.getComputedStyle(el).color
  );

  expect(color).toBe("rgb(59, 130, 246, 1");
});
