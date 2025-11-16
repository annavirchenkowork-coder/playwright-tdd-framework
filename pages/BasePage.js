export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  locator(selector) {
    return this.page.locator(selector);
  }

  frameLocator(selector) {
    return this.page.frameLocator(selector);
  }
}
