import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const APPS = {
  "r:dev": {
    url: "http://localhost:3000",
    command: `pnpm r:dev`,
  },
  "r:preview": {
    url: "http://localhost:4000",
    command: `pnpm r:preview`,
  },
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  name: "React Tests",
  outputDir: "test-results",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Base React - Dev",
      use: { ...devices["Desktop Chrome"], baseURL: APPS["r:dev"].url },
      testDir: "./apps/react/tests",
    },
    {
      name: "Base React - Build",
      use: { ...devices["Desktop Chrome"], baseURL: APPS["r:preview"].url },
      testDir: "./apps/react/tests",
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: APPS["r:dev"].command,
      url: APPS["r:dev"].url,
      timeout: 60 * 1000, // 60 seconds
      reuseExistingServer: !process.env.CI,
    },
    {
      command: APPS["r:preview"].command,
      url: APPS["r:preview"].url,
      timeout: 60 * 1000, // 60 seconds
      reuseExistingServer: !process.env.CI,
    },
  ],
});