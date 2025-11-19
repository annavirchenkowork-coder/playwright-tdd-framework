import { test, expect } from "../../utilities/sep-ui-utilities.js";
import { StartApplicationPage } from "../../pages/StartApplicationPage.js";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage.js";

const GREEN = "rgb(172, 245, 138)";
const BLUE = "rgb(1, 201, 255)";

/**
 * Helper: go from Step 1 → Step 2 (Payment Plans page)
 * This is your TDD equivalent of:
 *   Background:
 *     Given User is on the enrollment page
 *     And User completed the start application step
 */
async function goToPaymentPlanStep(page) {
  const startApplicationPage = new StartApplicationPage(page);
  const paymentPlanPage = new PaymentPlanPage(page);

  // Fill minimal valid data to pass Step 1
  await startApplicationPage.enterFirstName("Anna");
  await startApplicationPage.enterLastName("Virchenko");
  await startApplicationPage.enterEmail("anna.virchenko@example.com");
  await startApplicationPage.enterPhoneNumber("2025550188");
  await startApplicationPage.selectHowDidYouHearAboutUs("LinkedIn");

  await startApplicationPage.clickNextButton();

  await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();

  return { startApplicationPage, paymentPlanPage };
}

test.describe("Payment Plans - Next button and stepper behavior", () => {
  test("Next button activates after selecting a plan @sep16-1", async ({
    page,
  }) => {
    const { paymentPlanPage } = await goToPaymentPlanStep(page);
    // =========================================================
    // AC1: Next should be disabled by default
    // =========================================================
    await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();

    // When user selects upfront payment plan
    await paymentPlanPage.selectPaymentPlan("upfront");

    // Then Next becomes enabled
    await expect(paymentPlanPage.activeNextButton).toBeVisible();
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
  });

  test("Stepper colors update correctly when proceeding to Step 3  @sep16-2", async ({
    page,
  }) => {
    const { startApplicationPage, paymentPlanPage } = await goToPaymentPlanStep(
      page
    );

    // Initial state on Step 2
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      "background-color",
      GREEN
    );
    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      "background-color",
      BLUE
    );

    // Select upfront and go Next
    await paymentPlanPage.selectPaymentPlan("upfront");
    await paymentPlanPage.clickNextButton();

    // On Step 3: Step 1 & 2 green, Step 3 blue
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      "background-color",
      GREEN
    );
    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      "background-color",
      GREEN
    );
    await expect(startApplicationPage.reviewStepCircle).toHaveCSS(
      "background-color",
      BLUE
    );
  });

  test("Price summary is shown for each plan selection  @sep16-3", async ({
    page,
  }) => {
    const { paymentPlanPage } = await goToPaymentPlanStep(page);

    // Upfront plan summary
    await paymentPlanPage.selectPaymentPlan("upfront");
    await expect(paymentPlanPage.basePriceAmountUnderUpfront).toBeVisible();
    await expect(
      paymentPlanPage.upfrontDiscountAmountUnderUpfront
    ).toBeVisible();
    await expect(paymentPlanPage.subtotalAmountUnderUpfront).toBeVisible();

    // Installments plan summary
    await paymentPlanPage.selectPaymentPlan("installments");
    await expect(
      paymentPlanPage.basePriceAmountUnderInstallments
    ).toBeVisible();
    await expect(
      paymentPlanPage.installmentsNumberUnderInstallments
    ).toBeVisible();
    await expect(
      paymentPlanPage.pricePerInstallmentsAmountUnderInstallments
    ).toBeVisible();
    await expect(
      paymentPlanPage.firstMonthPaymentAmountUnderInstallments
    ).toBeVisible();
  });

  test("Back button is present and navigates back to Step 1 @sep16-4", async ({
    page,
  }) => {
    const { startApplicationPage, paymentPlanPage } = await goToPaymentPlanStep(
      page
    );

    // Back button visible and enabled
    await expect(paymentPlanPage.backButton).toBeVisible();
    await expect(paymentPlanPage.backButton).toBeEnabled();

    // Click Back → go to Step 1
    await paymentPlanPage.backButton.click();

    // Step 1 should now be blue (active)
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      "background-color",
      BLUE
    );

    // And Step 1 fields should be visible again
    await expect(startApplicationPage.firstNameInputBox).toBeVisible();
  });
});
