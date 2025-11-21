import {
  test,
  expect,
  goToStep3,
  microSettle,
} from "../../utilities/sep-ui-utilities.js";

// =========================================================
// SEP23 – Make a payment with a valid card
// =========================================================
test.describe("SEP23 - Make a payment with a valid card @sep23", () => {
  test("AC1 - Successful payment with a valid test card @sep23-1", async ({
    page,
  }) => {
    // Go through Step 1 + Step 2 (upfront plan) and land on Review Payment
    const review = await goToStep3(page);

    // ---- Fill valid payment data ----
    await review.enterCardNumber(
      process.env.CARD_NUMBER || "4242 4242 4242 4242"
    );

    await review.enterExpiryDate(process.env.CARD_EXPIRATION_DATE || "12/40");

    await review.enterCVC(process.env.CARD_SECURITY_CODE || "123");

    await review.enterZipCode(process.env.ZIP_CODE || "12345");

    // Terms & conditions
    await review.clickTermsAndConditionsCheckbox();

    // Click Pay and wait a bit for Stripe + confirmation UI
    await review.clickPayButton();
    await microSettle(page, 1500);

    // ---- Assertions for success state ----
    await expect(review.confirmationBox).toBeVisible();

    // Steps 1 & 2 done, Step 3 completed/active
    await expect(review.step1Container).toHaveClass(/done/);
    await expect(review.step2Container).toHaveClass(/done/);
    await expect(review.step3Container).toHaveClass(/editing|done/);
  });

  // =========================================================
  // SEP23 – Negative: User cannot pay without accepting Terms
  // =========================================================
  test("NEG1 - Pay button stays disabled if Terms are not accepted @sep23-neg1", async ({
    page,
  }) => {
    const review = await goToStep3(page);

    // Fill all valid Stripe fields
    await review.enterCardNumber("4242 4242 4242 4242");
    await review.enterExpiryDate("12/40");
    await review.enterCVC("123");
    await review.enterZipCode("12345");

    // DO NOT check the checkbox
    // review.clickTermsAndConditionsCheckbox(); // intentionally skipped

    // User should NOT be able to click Pay
    await expect(review.payButton).toBeDisabled();
  });
});
