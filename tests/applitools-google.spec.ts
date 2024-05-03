import { test, expect } from '@playwright/test';
import { BatchInfo, Configuration, EyesRunner, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes, Target } from '@applitools/eyes-playwright';

export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;

test.beforeAll(async () => {

  // Configure Applitools SDK to run on the Ultrafast Grid
  Runner = new VisualGridRunner({ testConcurrency: 5 });
  Batch = new BatchInfo({ name: `Applitools Playwright Typescript Quickstart Google` });

  Config = new Configuration();
  Config.setBatch(Batch);
  
  Config.addBrowsers(
    { name: BrowserType.CHROME, width: 800, height: 600 },
    { chromeEmulationInfo: { deviceName: DeviceName.iPhone_11, screenOrientation: ScreenOrientation.PORTRAIT } }
  )
});

test.describe('Applitools Playwright Tests', () => {
  let eyes: Eyes;
  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(Runner, Config);
    let apiKey = process.env.APPLITOOLS_API_KEY || 'undefined_apiKeys'
    let batchId =  process.env.APPLITOOLS_BATCH_ID || 'undefined_id'
    let batchName =  process.env.APPLITOOLS_BATCH_NAME || 'undefined_name'
    console.log(`apiKey APPLITOOLS_API_KEY: ${apiKey}`);
    console.log(`batchId APPLITOOLS_BATCH_ID: ${batchId}`);
    console.log(`batchName APPLITOOLS_BATCH_NAME: ${batchName}`);

    eyes.setApiKey(apiKey);
    eyes.setBatch(batchName, batchId);

    // Start Applitools Visual AI Test
    // Args: Playwright Page, App Name, Test Name, Viewport Size for local driver
    await eyes.open(page, 'playwright-applitools', `Applitools Playwright Typescript: Quickstart`, { width: 1200, height: 600 })
  });
  test('applitools test', async ({ page }) => {
    test.setTimeout(1000 * 60);
    await page.goto('https://www.google.com/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Google/);
     // Full Page - Visual AI Assertion
     await eyes.check('google home page', Target.window().fully());
  });


  test.afterEach(async () => {
    // End Applitools Visual AI Test
    await eyes.close();
  });
});

test.afterAll(async () => {
  // Wait for Ultrast Grid Renders to finish and gather results
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});