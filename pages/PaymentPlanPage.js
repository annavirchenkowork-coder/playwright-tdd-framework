import { BasePage } from "./BasePage.js";

export class PaymentPlanPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    /** @type {import('@playwright/test').Locator} */
    this.chooseAPaymentPlanText = this.locator(
      "//*[text()='Choose a payment plan']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.upfrontPaymentOption = this.locator(
      "//span[@class='payment-type'][contains(text(),'Upfront')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.upfrontPaymentAmount = this.locator("//span[@class='discount-price']");

    /** @type {import('@playwright/test').Locator} */
    this.payOnceTextUpFront = this.locator(
      "//span[@class='discount-price']/span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.upfrontPaymentFrame = this.locator(
      "(//mat-expansion-panel-header[@role='button'])[1]"
    );

    this.upfrontPanelContent = this.locator(
      "(//mat-expansion-panel)[1]//div[contains(@class,'mat-expansion-panel-content')]"
    );

    this.installmentsPanelContent = this.locator(
      "(//mat-expansion-panel)[2]//div[contains(@class,'mat-expansion-panel-content')]"
    );
    
    /** @type {import('@playwright/test').Locator} */
    this.greenBadgeUpfrontDiscount = this.locator(
      "//span[@class='chip-content']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.greenBadgeElectricBoltUpfrontDiscount = this.locator(
      "//span[@class='chip-content']/span[@class='material-symbols-outlined light-icon']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.greenBadgeTextUpfrontDiscount = this.locator(
      "//span[@class='chip-content']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.couponAvailableBadgeUpfrontDiscount = this.locator(
      "//mat-chip[contains(@class, 'coupon-badge')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.couponBoxCloseBtnX = this.locator(
      '//*[@id="cdk-accordion-child-0"]/div/div/div[3]/mat-form-field/div[1]/div[2]/div[2]/button/span[3]'
    );

    /** @type {import('@playwright/test').Locator} */
    this.basePriceTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.basePriceAmountUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.upfrontDiscountTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.upfrontDiscountAmountUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.iHaveAPromoCodeButtonUnderUpfront = this.locator(
      "//button[contains(text(), 'I have a promo code')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.subtotalTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.subtotalAmountUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.excludingFeesTextUnderUpfront = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentsPaymentOption = this.locator(
      "//span[@class='payment-type'][contains(text(),'Installments')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentsPaymentFrame = this.locator(
      "(//mat-expansion-panel-header[@role='button'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentsPaymentAmount = this.locator(
      "//span[@class='discount-price ng-star-inserted']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.perMonthTextInstallments = this.locator(
      "//span[@class='discount-price ng-star-inserted']/span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.couponAvailableBadgeInstallments = this.locator(
      "(//mat-chip[contains(@class, 'coupon-badge')])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.basePriceTextUnderInstallments = this.locator(
      "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.basePriceAmountUnderInstallments = this.locator(
      "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentsTextUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentsNumberUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.pricePerInstallmentsTextUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.pricePerInstallmentsAmountUnderInstallments = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.dueTodayTextUnderInstallments = this.locator(
      "//span[@class='sub-item-panel ng-star-inserted' and contains(text(), 'Due Today')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.firstMonthPaymentTextUnderInstallments = this.locator(
      "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.firstMonthPaymentAmountUnderInstallments = this.locator(
      "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.excludingFeesTextUnderInstallments = this.locator(
      "(//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.iHaveAPromoCodeButtonUnderInstallments = this.locator(
      "(//button[contains(text(), 'I have a promo code')])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.inactiveNextButton = this.locator(
      "//button[text()='Next' and @disabled]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.activeNextButton = this.locator(
      "//button[@class='next-button' and text()='Next']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.backButton = this.locator("//span[@class='back-button']");

    /** @type {import('@playwright/test').Locator} */
    this.footerText = this.locator(
      "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.paymentPlanBoxes = this.locator(
      "//mat-accordion[@class='mat-accordion']/div/mat-expansion-panel/mat-expansion-panel-header"
    );

    /** @type {import('@playwright/test').Locator} */
    this.step1 = this.locator("//div[@class='step-circle'][contains(.,'1')]");

    /** @type {import('@playwright/test').Locator} */
    this.step2 = this.locator("//div[@class='step-circle'][contains(.,'2')]");

    /** @type {import('@playwright/test').Locator} */
    this.step3 = this.locator("//div[@class='step-circle'][contains(.,'3')]");

    /** @type {import('@playwright/test').Locator} */
    this.upfrontText = this.locator("//span[@class='payment-type']");
  }

  async selectPaymentPlan(paymentPlan) {
    const plan = paymentPlan.toLowerCase();
    switch (true) {
      case plan.includes("upfront"):
        await this.upfrontPaymentOption.click();
        break;
      case plan.includes("installments"):
        await this.installmentsPaymentOption.click();
        break;
      default:
        throw new Error(`Invalid payment plan: ${paymentPlan}`);
    }
  }

  async clickNextButton() {
    await this.activeNextButton.click();
  }
}