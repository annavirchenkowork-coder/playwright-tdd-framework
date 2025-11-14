import { BasePage } from "./BasePage";

export class PaymentPlanPage extends BasePage {

  /** @type {import('@playwright/test').Locator} */
  chooseAPaymentPlanText = this.locator("//*[text()='Choose a payment plan']");

  /** @type {import('@playwright/test').Locator} */
  upfrontPaymentOption = this.locator("//span[@class='payment-type'][contains(text(),'Upfront')]");

  /** @type {import('@playwright/test').Locator} */
  upfrontPaymentAmount = this.locator("//span[@class='discount-price']");

  /** @type {import('@playwright/test').Locator} */
  payOnceTextUpFront = this.locator("//span[@class='discount-price']/span");

  /** @type {import('@playwright/test').Locator} */
  upfrontPaymentFrame = this.locator("(//mat-expansion-panel-header[@role='button'])[1]");

  /** @type {import('@playwright/test').Locator} */
  greenBadgeUpfrontDiscount = this.locator("//span[@class='chip-content']");

  /** @type {import('@playwright/test').Locator} */
  greenBadgeElectricBoltUpfrontDiscount = this.locator("//span[@class='chip-content']/span[@class='material-symbols-outlined light-icon']");

  /** @type {import('@playwright/test').Locator} */
  greenBadgeTextUpfrontDiscount = this.locator("//span[@class='chip-content']");

  /** @type {import('@playwright/test').Locator} */
  couponAvailableBadgeUpfrontDiscount = this.locator("//mat-chip[contains(@class, 'coupon-badge')]");

  /** @type {import('@playwright/test').Locator} */
  couponBoxCloseBtnX = this.locator('//*[@id="cdk-accordion-child-0"]/div/div/div[3]/mat-form-field/div[1]/div[2]/div[2]/button/span[3]');

  /** @type {import('@playwright/test').Locator} */
  basePriceTextUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]");

  /** @type {import('@playwright/test').Locator} */
  basePriceAmountUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  upfrontDiscountTextUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]");

  /** @type {import('@playwright/test').Locator} */
  upfrontDiscountAmountUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  iHaveAPromoCodeButtonUnderUpfront = this.locator("//button[contains(text(), 'I have a promo code')]");

  /** @type {import('@playwright/test').Locator} */
  subtotalTextUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]");

  /** @type {import('@playwright/test').Locator} */
  subtotalAmountUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  excludingFeesTextUnderUpfront = this.locator("//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')]");

  /** @type {import('@playwright/test').Locator} */
  installmentsPaymentOption = this.locator("//span[@class='payment-type'][contains(text(),'Installments')]");

  /** @type {import('@playwright/test').Locator} */
  installmentsPaymentFrame = this.locator("(//mat-expansion-panel-header[@role='button'])[2]");

  /** @type {import('@playwright/test').Locator} */
  installmentsPaymentAmount = this.locator("//span[@class='discount-price ng-star-inserted']");

  /** @type {import('@playwright/test').Locator} */
  perMonthTextInstallments = this.locator("//span[@class='discount-price ng-star-inserted']/span");

  /** @type {import('@playwright/test').Locator} */
  couponAvailableBadgeInstallments = this.locator("(//mat-chip[contains(@class, 'coupon-badge')])[2]");

  /** @type {import('@playwright/test').Locator} */
  basePriceTextUnderInstallments = this.locator("//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]");

  /** @type {import('@playwright/test').Locator} */
  basePriceAmountUnderInstallments = this.locator("//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  installmentsTextUnderInstallments = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]");

  /** @type {import('@playwright/test').Locator} */
  installmentsNumberUnderInstallments = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  pricePerInstallmentsTextUnderInstallments = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]");

  /** @type {import('@playwright/test').Locator} */
  pricePerInstallmentsAmountUnderInstallments = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  dueTodayTextUnderInstallments = this.locator("//span[@class='sub-item-panel ng-star-inserted' and contains(text(), 'Due Today')]");

  /** @type {import('@playwright/test').Locator} */
  firstMonthPaymentTextUnderInstallments = this.locator("//div[@class='fee-items-holder']/span[contains(text(), 'First month')]");

  /** @type {import('@playwright/test').Locator} */
  firstMonthPaymentAmountUnderInstallments = this.locator("//div[@class='fee-items-holder']/span[contains(text(), 'First month')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  excludingFeesTextUnderInstallments = this.locator("(//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')])[2]");

  /** @type {import('@playwright/test').Locator} */
  iHaveAPromoCodeButtonUnderInstallments = this.locator("(//button[contains(text(), 'I have a promo code')])[2]");

  /** @type {import('@playwright/test').Locator} */
  inactiveNextButton = this.locator("//button[text()='Next']");

  /** @type {import('@playwright/test').Locator} */
  activeNextButton = this.locator("//button[@class = 'next-button' and text()='Next']");

  /** @type {import('@playwright/test').Locator} */
  backButton = this.locator("//span[@class='back-button']");

  /** @type {import('@playwright/test').Locator} */
  footerText = this.locator("(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[2]");

  /** @type {import('@playwright/test').Locator} */
  paymentPlanBoxes = this.locator("//mat-accordion[@class='mat-accordion']/div/mat-expansion-panel/mat-expansion-panel-header");

  /** @type {import('@playwright/test').Locator} */
  step1 = this.locator("//div[@class='step-circle'][contains(.,'1')]");

  /** @type {import('@playwright/test').Locator} */
  step2 = this.locator("//div[@class='step-circle'][contains(.,'2')]");

  /** @type {import('@playwright/test').Locator} */
  step3 = this.locator("//div[@class='step-circle'][contains(.,'3')]");

  /** @type {import('@playwright/test').Locator} */
  UpfrontText = this.locator("//span[@class='payment-type']");
  
  async selectPaymentPlan(paymentPlan) {
    paymentPlan = paymentPlan.toLowerCase();
    switch (true) {
      case paymentPlan.includes('upfront'):
        await this.upfrontPaymentOption.click();
        break;
      case paymentPlan.includes('installments'):
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