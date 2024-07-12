import { test, expect } from "@playwright/test";

const TITLE = "Vite + Stylus";

test("Index HTML Loaded", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(TITLE);
});

test("Loaded main JS script", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`text=${TITLE}`)).toBeVisible();
});

test("Loaded Stylus styles", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("button", { name: "Click me" });
  await expect(element).toBeVisible();

  // Check for the color
  const color = await element.evaluate(
    (el) => window.getComputedStyle(el).color
  );
  expect(color).toBe("rgb(0, 123, 255)"); // #007bff in rgb

  // Check for the border
  const border = await element.evaluate(
    (el) => window.getComputedStyle(el).border
  );
  expect(border).toBe("1px solid rgb(52, 58, 64)"); // #343a40 in rgb
});
