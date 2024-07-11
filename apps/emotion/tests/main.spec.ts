import { test, expect } from "@playwright/test";

const TITLE = "Vite + Emotion";

test("Index HTML Loaded", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(TITLE);
});

test("Loaded main JS script", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`text=${TITLE}`)).toBeVisible();
});

test("Loaded Inline styles", async ({ page }) => {
  await page.goto("/");

  const element = page.getByRole("button", { name: "Something else" });
  await expect(element).toBeVisible();

  const color = await element.evaluate(
    (el) => window.getComputedStyle(el).color
  );

  expect(color).toBe("rgb(255, 0, 0)");
});

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

test("JQuery is blocked by CSP", async ({ page }) => {
  let cspViolationDetected = false;
  const expectedErrorMessage =
    "Refused to load the script 'https://code.jquery.com/jquery-3.7.1.slim.js' because it violates the following Content Security Policy directive:";

  // Listen for console events and check if the expected CSP violation error occurs
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      message.text().includes(expectedErrorMessage)
    ) {
      cspViolationDetected = true;
    }
  });

  await page.goto("/");

  // Assert that the CSP violation was detected
  expect(cspViolationDetected).toBe(true);
});
