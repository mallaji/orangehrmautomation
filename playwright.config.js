import dotenv from "dotenv";
const { defineConfig, devices } = require("@playwright/test");

dotenv.config();

/**
 * Playwright Configuration File
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests", // Define the base directory for tests
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests (configurable based on environment) */
  retries: process.env.CI ? 2 : 1,
  /* Workers for parallel execution */
  workers: process.env.CI ? 1 : undefined,
  /* Default screenshot directory */
  snapshotDir: "./screenshots",
  /* Default reporters */
  reporter: [
    ["html"], // HTML report for local viewing
    ["junit", { outputFile: "test-results/results.xml" }], // JUnit for CI integration
  ],
  /* Shared settings for all projects */
  use: {
    /* Base URL for tests */
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    /* Collect trace on failure */
    trace: "on-first-retry",
    /* Capture screenshots on failure */
    screenshot: "only-on-failure",
  },
  /* Define projects for different test groups */
  projects: [
    {
      name: "tests",
      testDir: "./tests",
    },
    {
      name: "orangehrmtests",
      testDir: "./orangehrmtests",
      use: { ...devices["Desktop Chrome"], trace: "on-first-retry" },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        screenshot: "off",
        video: "off",
        trace: "off",
      },
    },
    // Uncomment these for other browsers or devices as needed
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "mobile-chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "mobile-safari",
    //   use: { ...devices["iPhone 12"] },
    // },
  ],
  /* Configure web server */
  webServer: process.env.CI
    ? {
        command: "npm run start",
        url: process.env.BASE_URL || "http://localhost:3000",
        reuseExistingServer: true,
      }
    : undefined,
});
