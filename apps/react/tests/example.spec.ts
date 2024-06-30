import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React + TS");
});

test("Loaded main JS script", async ({ page }) => {
  await page.goto("/");
  // Expect a selector to be visible
  await expect(page.locator("text=Vite + React")).toBeVisible();
});
