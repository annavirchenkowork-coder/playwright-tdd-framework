import {
  test,
  expect,
  goToStep3,
  BrowserUtility,
} from "../../utilities/sep-ui-utilities.js";

// =========================================================
// SEP29 – Error message for the invalid CVC number
// =========================================================
test.describe("SEP29 - Error message for invalid CVC number @sep29", () => {
  // =========================================================
  // SEP29 – Show inline error "Your card's security code is incomplete." when CVC is too short
  // =========================================================
  test("AC1 - Short CVC shows inline error @sep29-1", async ({ page }) => {
    const reviewPage = await goToStep3(page);

    // Type short CVC using reusable Stripe helper
    await BrowserUtility.fillStripeInput(reviewPage.cvcInput, "12");

    // Check Terms & Conditions to trigger validations
    await reviewPage.clickTermsAndConditionsCheckbox();

    // Assertions
    await expect(reviewPage.cardCVCErrorMessage).toBeVisible();
    await expect(reviewPage.cardCVCErrorMessage).toContainText(
      "Your card’s security code is incomplete.",
      { ignoreCase: true }
    );
  });
});
