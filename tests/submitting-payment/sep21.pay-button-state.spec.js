import { test, expect, goToStep3 } from "../../utilities/sep-ui-utilities.js";

test.describe("SEP21 - Pay button state on Review Payment page @sep21", () => {
  // Each test starts directly on Step 3 thanks to reusable helper
  test.beforeEach(async ({ page }) => {
    const review = await goToStep3(page);
    // Save page object for the tests
    test
      .info()
      .annotations.push({
        type: "reviewPage",
        description: "Initialized at Step 3",
      });
    page.review = review;
  });

  // =========================================================
  // AC1 – Pay button is visible
  // =========================================================
  test("AC1 - Pay button should be visible @sep21-1", async ({ page }) => {
    const review = page.review;
    await expect(review.payButton).toBeVisible();
  });

  // =========================================================
  // AC2 – Pay button is disabled by default
  // =========================================================
  test("AC2 - Pay button should be disabled by default @sep21-2", async ({
    page,
  }) => {
    const review = page.review;
    await expect(review.payButton).toBeDisabled();
  });

  // =========================================================
  // AC3 – Pay button becomes enabled only when all fields valid
  // =========================================================
  test("AC3 - Pay button enables only after all fields valid @sep21-3", async ({
    page,
  }) => {
    const review = page.review;

    await review.enterCardNumber("4242 4242 4242 4242");
    await review.enterExpiryDate("12/40");
    await review.enterCVC("123");
    await review.enterZipCode("12345");
    await review.clickTermsAndConditionsCheckbox();

    await expect(review.payButton).toBeEnabled();
  });
});
