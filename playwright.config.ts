import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

// Чтение переменных окружения из файла .env
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { open: "never" }]],

  use: {
    baseURL: process.env.BASE_URL || "https://www.automationexercise.com",
    testIdAttribute: "data-qa",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        //storageState: "playwright/.auth/user.json",
      },
      //dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // storageState: "playwright/.auth/user.json",
      },
      //dependencies: ["setup"],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        // storageState: "playwright/.auth/user.json",
      },
      //dependencies: ["setup"],
    },
  ],
});
