import { chromium } from '@playwright/test';

async function openBrowser() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Open a website
  await page.goto('https://example.com');
  
  console.log('Browser opened. Press Ctrl+C to close.');
  
  // Keep the browser open for 30 seconds (you can adjust this)
  await page.waitForTimeout(30000);
  
  await browser.close();
}

openBrowser().catch(console.error);
