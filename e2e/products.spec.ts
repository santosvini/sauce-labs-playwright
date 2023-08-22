import { test, expect } from '@playwright/test'
import { login } from './helper';
import { HomePage } from '../pages/home.page';

let home: HomePage

test.describe('Products Screen', async () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    await home.go()
  })

  test.skip('All products names begin "Sauce Labs"', async ({ page }) => {
    await test.step('login', async () => {
      
      await page.locator('[data-test="username"]').fill(login.standard);
      await page.locator('[data-test="password"]').fill(login.pass);
      await page.locator('[data-test="login-button"]').click();
    });

    test('product titlte verification', async () => {
      const titleListLocator = page.locator('.inventory_item_name');
      const productTitleList = await titleListLocator.allTextContents();

      for (const item of productTitleList) {
        expect(item.slice(0, 10)).toBe('Sauce Labs');
      }
    });
  });
});