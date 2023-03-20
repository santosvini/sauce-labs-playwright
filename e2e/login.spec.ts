import { test, expect } from '@playwright/test';

test.describe('Login tests',async () => {
  
  test('The user login with success', async ({ page }) => {
    await test.step('Success Login', async () => {
    
      await page.goto('https://www.saucedemo.com/');
      await expect(await page.title()).toBe('Swag Labs');
    
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
    
      await page.locator('[data-test="login-button"]').click();
    
      await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')
    
      const productTitle = await page.locator('.header_secondary_container > span');
      await expect(productTitle).toHaveText('Products')
    });
  });
  
  test('The user inserts wrong credentials', async ({ page }) => {
      
    await test.step('Error Login', async () => {
    
      await page.goto('https://www.saucedemo.com/');
    
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('random123245');
    
      await page.locator('[data-test="login-button"]').click();
      const error = await page.getByText('Epic sadface: Username and password do not match any user in this service');
    
      await expect(error).toBeVisible()
    });
  });
});