import { test as base, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import path from "path";
import fs from "fs";
import { StartApplicationPage } from "../pages/StartApplicationPage";
import { PaymentPlanPage } from "../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../pages/ReviewPaymentPage";

/**
 * Extends the base test with custom UI setup for SEP application.
 *
 * @param {Object} options - The options object.
 * @param {import('@playwright/test').Page} options.page - The Playwright Page object for UI interactions.
 * @param {Function} use - The function to use the configured page in UI tests.
 * @param {import('@playwright/test').TestInfo} testInfo - Information about the current UI test.
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const authToken = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${authToken}` });
    await page.goto(process.env.SEP_QA_URL ?? "");
    await page.waitForLoadState("networkidle");
    expect(await page.title()).toBe("Checkout | Cydeo");

    BasePage.setPage(page); // Set the page in BasePage for global access

    await use(page); // Use the page fixture in the test functions

    await takeScreenshotIfFailed(page, testInfo); // After the test, take a screenshot if it failed
  },
});

export { expect, test as describe }; // Export commonly used Playwright test functions

export class CommonUI {
  static starteAppPage;
  static paymentPlanPage;
  static reviewPaymentPage;

  // Completes the start application form with provided or default user information.
  static async completeStartApplicationForm(page, firstName = "John", lastName = "Doe",
    email = "John.Doe@example.com", phoneNumber = "123456790") {
    this.starteAppPage = new StartApplicationPage(page);
    await this.starteAppPage.enterFirstName(firstName);
    await this.starteAppPage.enterLastName(lastName);
    await this.starteAppPage.enterEmail(email);
    await this.starteAppPage.enterPhoneNumber(phoneNumber);
    await this.starteAppPage.selectHowDidYouHearAboutUs("Email");
    await this.starteAppPage.clickNextButton();
  }

  // Selects a payment with provided or default payment plan after completing the start application form.
  static async completeSelectingPaymentPlan(page, paymentPlanType = "upfront") {
    this.paymentPlanPage = new PaymentPlanPage(page);
    await this.paymentPlanPage.selectPaymentPlan(paymentPlanType);
    await this.paymentPlanPage.clickNextButton();
  }

  // Enters credit card info with provided or default card information on the payment review page.
  static async completeEnteringCardInformation(page,
    cardNumber = process.env.CARD_NUMBER ?? "",
    expirationDate = process.env.CARD_EXPIRATION_DATE ?? "",
    cvc = process.env.CARD_SECURITY_CODE ?? "",
    zipCode = process.env.ZIP_CODE ?? ""
  ) {
    this.reviewPaymentPage = new ReviewPaymentPage(page);
    await this.reviewPaymentPage.enterCardNumber(cardNumber);
    await this.reviewPaymentPage.enterExpiryDate(expirationDate);
    await this.reviewPaymentPage.enterCVC(cvc);
    await this.reviewPaymentPage.enterZipCode(zipCode);
  }
  

}

// Takes a screenshot of the page if the test has failed.
async function takeScreenshotIfFailed(page, testInfo) {
  if (testInfo.status !== "failed") return;

  const screenshotDir = path.join(__dirname, "../screenshots");
  fs.mkdirSync(screenshotDir, { recursive: true });

  const currentDateTime = new Date().toISOString().replace(/[:T.]/g, "_").slice(0, -5);
  const screenshotFileName = `${testInfo.title.replace(/\s+/g, '_')}_failed_${currentDateTime}.png`;
  const screenshotPath = path.join(screenshotDir, screenshotFileName);
  
  await page.screenshot({ path: screenshotPath, fullPage: true });
}