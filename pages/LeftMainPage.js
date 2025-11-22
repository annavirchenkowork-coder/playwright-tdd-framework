import { BasePage } from "./BasePage.js";

export class LeftMainPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    /** @type {import('@playwright/test').Locator} */
    this.cydeoImageAtLeftWindow = this.locator(
      "(//img[@src = 'assets/images/logo.svg'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.secureCheckout = this.locator("//p[@class='checkout-title']");

    /** @type {import('@playwright/test').Locator} */
    this.footerElements = this.locator(
      "//a[contains(@href, 'https://cydeo.com/')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.programName = this.locator("//p[@class='course-name']/a");
  }
}
