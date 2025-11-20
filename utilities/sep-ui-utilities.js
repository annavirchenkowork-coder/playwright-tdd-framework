import { test as base, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

import { BasePage } from "../pages/BasePage.js";
import { StartApplicationPage } from "../pages/StartApplicationPage.js";
import { PaymentPlanPage } from "../pages/PaymentPlanPage.js";
import { ReviewPaymentPage } from "../pages/ReviewPaymentPage.js";
import { LeftMainPage } from "../pages/LeftMainPage.js";
import { defaultEnrollmentData } from "./qa-data-reader";

/**
 * Extends the base test with custom UI setup for SEP application.
 *
 * - Adds Basic Auth header using SEP_USERNAME / SEP_PASSWORD
 * - Navigates to SEP_QA_URL
 * - Verifies page title
 * - Registers the page in BasePage
 * - Takes a screenshot on failure
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const authToken = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
    ).toString("base64");

    await page.setExtraHTTPHeaders({ Authorization: `Basic ${authToken}` });

    await page.goto(process.env.SEP_QA_URL ?? "");
    await page.waitForLoadState("networkidle");

    expect(await page.title()).toBe("Checkout | Cydeo");

    // Run the actual test body
    await use(page);

    // After the test: capture screenshot on failure
    await takeScreenshotIfFailed(page, testInfo);
  },
});

export function initPages(page) {
  return {
    startApp: new StartApplicationPage(page),
    paymentPlan: new PaymentPlanPage(page),
    review: new ReviewPaymentPage(page),
    leftMain: new LeftMainPage(page),
  };
}
export async function goToStep2(page) {
  const { startApp, paymentPlan } = initPages(page);
  const d = defaultEnrollmentData;

  await startApp.enterFirstName(d.firstName);
  await startApp.enterLastName(d.lastName);
  await startApp.enterEmail(d.email);
  await startApp.enterPhoneNumber(d.phone);
  await startApp.selectHowDidYouHearAboutUs(d.howDidYouHear);

  await startApp.clickNextButton();
  await microSettle(page);

  await expect(paymentPlan.chooseAPaymentPlanText).toBeVisible();

  return { startApp, paymentPlan };
}

export async function goToStep3(page) {
  const paymentPlan = await goToStep2(page);

  await paymentPlan.selectPaymentPlan("upfront");
  await microSettle(page);
  await paymentPlan.clickNextButton();

  await microSettle(page);
  return new ReviewPaymentPage(page);
}
// convenient re-exports for tests
export { expect, test as describe };

/**
 * High-level UI flows that chain Page Objects together.
 */
export class CommonUI {
  static startAppPage;
  static paymentPlanPage;
  static reviewPaymentPage;

  /**
   * Completes the start application form.
   */
  static async completeStartApplicationForm(
    page,
    firstName = "John",
    lastName = "Doe",
    email = "John.Doe@example.com",
    phoneNumber = "123456790"
  ) {
    this.startAppPage = new StartApplicationPage(page);
    await this.startAppPage.enterFirstName(firstName);
    await this.startAppPage.enterLastName(lastName);
    await this.startAppPage.enterEmail(email);
    await this.startAppPage.enterPhoneNumber(phoneNumber);
    await this.startAppPage.selectHowDidYouHearAboutUs("Email");
    await this.startAppPage.clickNextButton();
  }

  /**
   * Selects the payment plan after completing the start application step.
   */
  static async completeSelectingPaymentPlan(page, paymentPlanType = "upfront") {
    this.paymentPlanPage = new PaymentPlanPage(page);
    await this.paymentPlanPage.selectPaymentPlan(paymentPlanType);
    await this.paymentPlanPage.clickNextButton();
  }

  /**
   * Fills in credit card information on the review payment page.
   */
  static async completeEnteringCardInformation(
    page,
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

/**
 * A collection of lower-level browser / control helpers.
 * Ported from the BDD framework and adapted for TDD usage.
 */
export class BrowserUtility {
  /**
   * Returns a LeftMainPage instance for the given Page.
   * (In BDD this was cached per World; in TDD we just construct it.)
   *
   * @param {import('@playwright/test').Page} page
   * @returns {LeftMainPage}
   */
  static getLeftMain(page) {
    return new LeftMainPage(page);
  }

  /**
   * Cleans text content by trimming and collapsing whitespace.
   *
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  static async cleanText(locator) {
    const raw = (await locator.textContent()) ?? "";
    return raw
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Converts a formatted money string like "$400" or "$1,200.50"
   * into a numeric value.
   *
   * @param {string} text
   * @returns {number}
   */
  static moneyToNumber(text) {
    const n = Number(String(text).replace(/[^\d.]/g, ""));
    if (Number.isNaN(n)) {
      throw new Error(`Cannot parse money from: ${text}`);
    }
    return n;
  }

  /**
   * Returns native validity when available, otherwise falls back
   * to common Angular / Mat markers on the element or its field container.
   *
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  static async controlIsValid(locator) {
    return await locator.evaluate((el) => {
      if (typeof el.checkValidity === "function") return el.checkValidity();

      const field =
        el.closest(".mat-mdc-form-field") || el.closest("mat-form-field");
      const take = (n) => n === true || n === "true";

      if (el.hasAttribute("aria-invalid"))
        return !take(el.getAttribute("aria-invalid"));
      if (field && field.hasAttribute("aria-invalid"))
        return !take(field.getAttribute("aria-invalid"));

      const cl = (node) =>
        (node && node.classList) || { contains: () => false };

      if (cl(el).contains("ng-invalid") || cl(field).contains("ng-invalid"))
        return false;
      if (cl(el).contains("ng-valid") || cl(field).contains("ng-valid"))
        return true;

      return true; // safest default
    });
  }

  /**
   * Angular form-level validity helper.
   *
   * @param {import('@playwright/test').Page} page
   * @returns {Promise<boolean>}
   */
  static async ngFormValid(page) {
    const formEl = await page.$("form");
    if (!formEl) return true;
    return await formEl.evaluate((f) => {
      if (f.hasAttribute("aria-invalid")) {
        const v = f.getAttribute("aria-invalid");
        if (v === "true") return false;
        if (v === "false") return true;
      }
      const cl = f.classList || { contains: () => false };
      if (cl.contains("ng-invalid")) return false;
      if (cl.contains("ng-valid")) return true;
      return f.checkValidity ? f.checkValidity() : true;
    });
  }

  /**
   * Type value into a field, blur it, and wait briefly for validators.
   *
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value
   */
  static async typeAndBlur(locator, value) {
    await locator.fill("");
    if (value) await locator.type(value);
    await locator.blur();
    await locator.page().waitForTimeout(120);
  }

  /**
   * Poll-based assertion for control validity.
   *
   * @param {import('@playwright/test').Locator} locator
   * @param {boolean} expected
   */
  static async expectControlValidity(locator, expected) {
    await expect
      .poll(async () => await BrowserUtility.controlIsValid(locator), {
        timeout: 4000,
        intervals: [120, 200, 300, 500, 900, 1200],
      })
      .toBe(expected);
  }

  /**
   * Checks if an input element has the "required" attribute.
   *
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<boolean>}
   */
  static async isRequired(locator) {
    return await locator.evaluate((el) => !!el.required);
  }

  /**
   * Returns header and summary locators for a payment plan name.
   * Handles "upfront" and "installments" cases.
   *
   * @param {string} name
   * @param {PaymentPlanPage} paymentPlanPage
   */
  static panelFor(name, paymentPlanPage) {
    const k = name.toLowerCase();
    if (k.includes("upfront")) {
      return {
        header: paymentPlanPage.upfrontPaymentFrame,
        summaryProbe: paymentPlanPage.basePriceAmountUnderUpfront,
      };
    }
    if (k.includes("installments")) {
      return {
        header: paymentPlanPage.installmentsPaymentFrame,
        summaryProbe: paymentPlanPage.basePriceAmountUnderInstallments,
      };
    }
    throw new Error(`Unknown plan: ${name}`);
  }

  /**
   * Normalizes a plan name and returns its lowercase key.
   * "Installments" → "installments", everything else → "upfront".
   *
   * @param {string} name
   * @returns {"upfront" | "installments"}
   */
  static normalizePlan(name) {
    return name.toLowerCase().includes("install") ? "installments" : "upfront";
  }

  /**
   * Returns the primary locators for a payment plan type.
   *
   * @param {"upfront" | "installments"} planKey
   * @param {PaymentPlanPage} paymentPlanPage
   */
  static planLocators(planKey, paymentPlanPage) {
    if (planKey === "upfront") {
      return {
        frame: paymentPlanPage.upfrontPaymentFrame,
        option: paymentPlanPage.upfrontPaymentOption,
        amount: paymentPlanPage.upfrontPaymentAmount,
      };
    }
    if (planKey === "installments") {
      return {
        frame: paymentPlanPage.installmentsPaymentFrame,
        option: paymentPlanPage.installmentsPaymentOption,
        amount: paymentPlanPage.installmentsPaymentAmount,
      };
    }
    throw new Error(`Unknown plan: ${planKey}`);
  }

  /**
   * Fills a Stripe iframe input field (card number, expiry, etc.)
   *
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value
   */
  static async fillStripeInput(locator, value) {
    await expect(locator).toBeVisible();
    await locator.fill("");
    await locator.type(value);
  }

  /** Checks a checkbox and verifies it is checked. */
  static async check(locator) {
    await locator.check();
    await expect(locator).toBeChecked();
  }

  /** Unchecks a checkbox and verifies it is unchecked. */
  static async uncheck(locator) {
    await locator.uncheck();
    await expect(locator).not.toBeChecked();
  }

  /** Verifies page title. */
  static async verify_title(page, expected) {
    const actual = await page.title();
    expect(actual).toBe(expected);
    // or: await expect(page).toHaveTitle(expected);
  }

  /** Fill an input if visible, else throw. */
  static async enter_input(locator, input) {
    if (await locator.isVisible()) {
      await locator.fill(input);
    } else {
      throw new Error(`Element is not visible: ${locator}`);
    }
  }
}

/**
 * Waits a short time for UI/DOM transitions to settle.
 * Useful after expanding accordions, switching plans, etc.
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} [ms=250]
 */
export async function microSettle(page, ms = 250) {
  await page.waitForTimeout(ms);
}

/**
 * Takes a screenshot of the page if the test has failed.
 *
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').TestInfo} testInfo
 */
async function takeScreenshotIfFailed(page, testInfo) {
  if (testInfo.status !== "failed") return;

  const screenshotDir = path.join(process.cwd(), "screenshots");
  fs.mkdirSync(screenshotDir, { recursive: true });

  const currentDateTime = new Date()
    .toISOString()
    .replace(/[:T.]/g, "_")
    .slice(0, -5);

  const screenshotFileName = `${testInfo.title.replace(
    /\s+/g,
    "_"
  )}_failed_${currentDateTime}.png`;

  const screenshotPath = path.join(screenshotDir, screenshotFileName);

  await page.screenshot({ path: screenshotPath, fullPage: true });
}
