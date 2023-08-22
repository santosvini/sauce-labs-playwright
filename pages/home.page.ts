import { Page, expect } from '@playwright/test'

export class HomePage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async go() {
    await this.page.goto('/')
    expect(await this.page.title()).toBe('Swag Labs');
  }

  async sucessLogin(standard: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(standard);
    await this.page.locator('[data-test="password"]').fill(pass);
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page).toHaveURL('inventory.html')
    const productTitle = this.page.locator('.header_secondary_container > span');
    await expect(productTitle).toHaveText('Products')
  }

  async errorLogin(standard: string, errorpass: string) {
    await this.page.locator('[data-test="username"]').fill(standard);
    await this.page.locator('[data-test="password"]').fill(errorpass);

    await this.page.locator('[data-test="login-button"]').click();
  }

  async locked(locked: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(locked);
    await this.page.locator('[data-test="password"]').fill(pass);

    await this.page.locator('[data-test="login-button"]').click();

    const error = this.page.getByText('Epic sadface: Sorry, this user has been locked out.');
    await expect(error).toBeVisible()
  }

  async lockedLogin(locked: string, errorpass: string) {
    await this.page.locator('[data-test="username"]').fill(locked);
    await this.page.locator('[data-test="password"]').fill(errorpass);

    await this.page.locator('[data-test="login-button"]').click();
  }

  async problemLogin(problem: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(problem);
    await this.page.locator('[data-test="password"]').fill(pass);

    await this.page.locator('[data-test="login-button"]').click();

    await expect(this.page).toHaveURL('inventory.html')
  }
  
  async problemError(problem: string, errorpass: string) {
    await this.page.locator('[data-test="username"]').fill(problem);
    await this.page.locator('[data-test="password"]').fill(errorpass);

    await this.page.locator('[data-test="login-button"]').click();
  }

  async performanceError(performance: string, errorpass: string) {
    await this.page.locator('[data-test="username"]').fill(performance);
    await this.page.locator('[data-test="password"]').fill(errorpass);

    await this.page.locator('[data-test="login-button"]').click();
  }

  async performanceLogin(performance: string, pass: string) {
    await this.page.locator('[data-test="username"]').fill(performance);
    await this.page.locator('[data-test="password"]').fill(pass);

    await this.page.locator('[data-test="login-button"]').click();

    await expect(this.page).toHaveURL('inventory.html')

    const productTitle = this.page.locator('.header_secondary_container > span');
    await expect(productTitle).toHaveText('Products')
  }

  async errorMessage(error: string) {
    const message = this.page.getByText(error);
    await expect(message).toBeVisible()
  }
}