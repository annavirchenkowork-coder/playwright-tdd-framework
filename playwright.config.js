import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.SEP_API_BASE_URL,
    trace: 'on-first-retry',
    headless: false,
  },

  projects: [

    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        viewport: { width: 1800, height: 1000 }, // simulate max window
      },
    },

/*

  {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: {width: 1900, height: 1080} 
      },
    },
    
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1800, height: 1000 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1800, height: 1000 },
      },
    },
*/

/* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    
  ],
});
