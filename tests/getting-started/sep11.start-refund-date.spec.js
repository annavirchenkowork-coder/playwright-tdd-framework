import {
  test,
  expect,
  BrowserUtility,
} from "../../utilities/sep-ui-utilities.js";
import { productInfo } from "../../utilities/qa-data-reader.js";
import { StartApplicationPage } from "../../pages/StartApplicationPage.js";

test.describe("Start Application - Program & refund dates", () => {
  test("Program and refund dates are visible", async ({ page }) => {
    const startApplicationPage = new StartApplicationPage(page);

    await expect(startApplicationPage.programStartDate).toBeVisible();
    await expect(startApplicationPage.refundEndDate).toBeVisible();
  });

  test("Program and refund dates match expected QA data", async ({ page }) => {
    const startApplicationPage = new StartApplicationPage(page);

    // Clean the UI text before comparison (same as BrowserUtility.cleanText in BDD)
    const actualStartDate = await BrowserUtility.cleanText(
      startApplicationPage.programStartDate
    );
    const actualRefundDate = await BrowserUtility.cleanText(
      startApplicationPage.refundEndDate
    );

    const expectedStartDate = String(productInfo.startDate).trim();
    const expectedRefundDate = String(productInfo.refundDate).trim();

    expect(actualStartDate).toBe(expectedStartDate);
    expect(actualRefundDate).toBe(expectedRefundDate);
  });
});