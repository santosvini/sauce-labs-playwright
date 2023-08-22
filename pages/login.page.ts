import { expect, Page } from '@playwright/test'

export class LogiPage {
  readonly page: Page

  constructor(page:Page) { this.page = page }
}

