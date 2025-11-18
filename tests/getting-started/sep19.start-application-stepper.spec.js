import { test, expect } from "../../utilities/sep-ui-utilities.js";
import { generateTestUser } from "../../utilities/qa-data-reader.js";
import { StartApplicationPage } from "../../pages/StartApplicationPage.js";

test.describe("Start Application - Stepper indicators", () => {
  test("User enters valid data in all required and optional fields", async ({
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

  test("User enters valid data only in required fields", async ({ page }) => {
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
