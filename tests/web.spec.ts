import { test, expect } from "@playwright/test";
import "dotenv/config";

test.describe.parallel("@web testing", () => {
  const web_url = process.env.web_url;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${web_url}`);
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

  test("confirm about page assertion", async ({ page }) => {
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
    await page.locator('a[href="/about"]').click();
    const accept = page.getByRole("button", { name: "Accept" });

    if ((await accept.count()) > 0) {
      await accept.click();
      await expect(page.locator("#id-footer")).toBeVisible();
      await expect(page.locator('footer[id="id-footer"]')).toBeVisible();
    } else {
      await expect(page.locator("#id-footer")).toBeVisible();
      await expect(page.locator('footer[id="id-footer"]')).toBeVisible();
    }
  });
  test("verify qrCode in about page", async ({ page }) => {
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
    await page.locator(".qcode").isVisible();
    const links = page.locator("a");
    const count = await links.count();
    const expectedHrefValue = "https://github.com/mzrahman74";
    let found = false;

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      console.log(`link ${i}: ${href}`);
      if (href === expectedHrefValue) {
        await expect(links.nth(i)).toHaveAttribute("href", expectedHrefValue);
        console.log(`Verified github link at the index ${i}: ${href}`);
        found = true;
        break;
      }
    }
    expect(found).toBeTruthy();
  });
});
