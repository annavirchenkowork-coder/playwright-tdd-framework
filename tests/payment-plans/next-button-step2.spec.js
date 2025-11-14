import { test, expect, CommonUI } from "../../utilities/sep-ui-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe("Next button on selecting payment page", () => {
    
    /**
     * @type {PaymentPlanPage}
     */
    let paymentPlanPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page, "Muhtar", "M", "muhtar.mahmoud@example.com", "1234567890");
    });

    test('Verify that the next button is displayed', async ({page}) => {
        await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    });

    test('Verify that the next button is disabled by default', async ({page}) => {
        await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
    });

    //TODO Complete the other remaining tests of this user story ...
    
});