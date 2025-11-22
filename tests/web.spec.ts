import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://webgopros.com");
});

test("verify home page", async ({ page }) => {
  await expect(page.locator(".logo")).toBeVisible();
  await expect(page.locator("video.responsive_video")).toBeVisible();
  await expect(page.locator("iframe.video_one")).toBeVisible();
  const frame = page.locator("iframe.video_one");

  await expect(frame).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/L7dAYld_7aM"
  );
  await expect(page.locator("iframe.video_two")).toHaveId("video");
});

test("@web confirm about page assertion", async ({ page }) => {
  const viewportSize = await page.evaluate(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  if (viewportSize.width <= 991) {
    await page.locator(".navbar-toggler-icon").click();
    await page.locator('a[href="/about"]').click();
  } else {
    await page.locator('a[href="/about"]').click();
  }
  await expect(page.locator("#id-footer")).toBeVisible();
  await expect(page.locator('footer[id="id-footer"] p')).toBeVisible();
});
