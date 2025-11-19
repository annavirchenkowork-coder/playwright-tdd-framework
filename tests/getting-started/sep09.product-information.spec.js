import { test, expect } from "../../utilities/sep-ui-utilities.js";
import { StartApplicationPage } from "../../pages/StartApplicationPage.js";
import { LeftMainPage } from "../../pages/LeftMainPage.js";
import { qaData } from "../../utilities/qa-data-reader.js";
import { BrowserUtility } from "../../utilities/sep-ui-utilities.js";

test.describe("SEP09 - Display product information @sep09", () => {
  // Helper to get both pages quickly
  const initPages = (page) => ({
    startApp: new StartApplicationPage(page),
    left: new LeftMainPage(page),
  });
  // =========================================================
  // AC1 –
  // =========================================================
  test("AC1 - Product name visible on information card @sep09-1", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.programNameOnInfoCard).toBeVisible();
  });

  // =========================================================
  // AC2 –
  // =========================================================
  test("AC2 - Product name matches left header @sep09-2", async ({ page }) => {
    const { startApp } = initPages(page);

    await expect(startApp.programNameOnInfoCard).toHaveText(
      new RegExp(`^\\s*${qaData.productName}\\s*$`, "i")
    );
  });
  // =========================================================
  // AC3 –
  // =========================================================
  test("AC3 - Discounted/original price display is correct @sep09-3", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.discountedPrice).toBeVisible();

    const tag = await startApp.originalPrice.evaluate((el) => el.tagName);
    expect(tag).toBe("S");

    const oneTime = qaData.prices.find(
      (p) => p.active && p.type === "one-time"
    );

    const expectedOriginal = oneTime.baseAmount;
    const expectedDiscounted = oneTime.upfrontDiscount
      ? oneTime.baseAmount - oneTime.upfrontDiscountAmount
      : oneTime.baseAmount;

    const originalText = await startApp.originalPrice.textContent();
    const discountedText = await startApp.discountedPrice.textContent();

    const original = BrowserUtility.moneyToNumber(originalText);
    const discounted = BrowserUtility.moneyToNumber(discountedText);

    expect(original).toBe(expectedOriginal);
    expect(discounted).toBe(expectedDiscounted);
  });
  // =========================================================
  // AC4 –
  // =========================================================
  test("AC4 - Flexible payments plan text visible @sep09-4", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.flexiblePaymentsPlanAvailableText).toBeVisible();
    await expect(startApp.flexiblePaymentsPlanAvailableText).toHaveText(
      /flexible payments plan available/i
    );
  });
  // =========================================================
  // AC5 –
  // =========================================================

  test("AC5 - Program start date visible & matches test data @sep09-5", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    await expect(startApp.programStartDate).toBeVisible();
    const dateEscaped = qaData.startDate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    await expect(startApp.programStartDate).toHaveText(
      new RegExp(dateEscaped, "i")
    );
  });
  // =========================================================
  // AC6 –
  // =========================================================
  test("AC6 - Refund policy text & date visible @sep09-6", async ({ page }) => {
    const { startApp } = initPages(page);

    await expect(startApp.refundEndDate).toBeVisible();

    const refundEscaped = qaData.refundDate.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    await expect(startApp.refundEndDate).toHaveText(
      new RegExp(refundEscaped, "i")
    );
  });
});
