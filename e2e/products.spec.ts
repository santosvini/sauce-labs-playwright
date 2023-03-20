import { test, expect } from '@playwright/test'

test('All products names begin "Sauce Labs"', async ({ page }) => {
  test.describe('Products Screen', async () => {
    test.fail()
    await test.step('login', async () => {
      await page.goto('https://www.saucedemo.com/');
      await expect(await page.title()).toBe('Swag Labs');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
    });

    await test.step('product titlte verification', async () => {
      const titleListLocator = await page.locator('.inventory_item_name');
      const productTitleList = await titleListLocator.allTextContents();

      for (const item of productTitleList) {
        await expect(item.slice(0, 10)).toBe('Sauce Labs');
      }
    });
  })
});