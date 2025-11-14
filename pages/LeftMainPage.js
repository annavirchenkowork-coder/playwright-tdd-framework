import { BasePage } from "./BasePage";

export class LeftMainPage extends BasePage {

  /** @type {import('@playwright/test').Locator} */
  cydeoImageAtLeftWindow = this.locator("(//img[@src = 'assets/images/logo.svg'])[2]");

  /** @type {import('@playwright/test').Locator} */
  secureCheckout = this.locator("//p[@class='checkout-title']");

  /** @type {import('@playwright/test').Locator} */
  footerElements = this.locator("//a[contains(@href, 'https://cydeo.com/')]");

  /** @type {import('@playwright/test').Locator} */
  programName = this.locator("//p[@class='course-name']/a");

}