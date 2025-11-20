import { test, expect } from "../../utilities/sep-ui-utilities.js";
import { generateTestUser } from "../../utilities/qa-data-reader.js";
import { StartApplicationPage } from "../../pages/StartApplicationPage.js";

// =========================================================
// SEP19 - Proceed to Step 2 after completing Step 1
// =========================================================
test.describe("SEP19 - Start Application - Stepper indicators @sep19", () => {
  // =========================================================
  // Validate with all fields completed (required + optional)
  // =========================================================
  test("User enters valid data in all required and optional fields @sep19-1", async ({
    page,
  }) => {
    const startApplicationPage = new StartApplicationPage(page);
    // Step 1: Enter all valid information
    const user = generateTestUser();
    await startApplicationPage.fillPersonalInformation(user);

    // Step 2: Click Next button
    await startApplicationPage.clickNextButton();

    // Step 3: Validate stepper indicators
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)" // completed green
    );

    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      "background-color",
      "rgb(1, 201, 255)" // active blue
    );
  });
  // =========================================================
  // Validate with only required fields completed
  // =========================================================
  test("User enters valid data only in required fields @sep19-2", async ({
    page,
  }) => {
    const startApplicationPage = new StartApplicationPage(page);

    // Step 1: Enter only required fields
    const user = generateTestUser();
    await startApplicationPage.fillPersonalInformation({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      // no optional fields on purpose
    });

    // Step 2: Click Next button
    await startApplicationPage.clickNextButton();

    // Step 3: Validate stepper indicators
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)" // completed green
    );

    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
      "background-color",
      "rgb(1, 201, 255)" // active blue
    );
  });
});
