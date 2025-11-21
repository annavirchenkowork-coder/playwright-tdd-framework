import { BasePage } from "./BasePage.js";

export class ReviewPaymentPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    /** @type {import('@playwright/test').Locator} */
    this.paymentForm = this.locator("//form[@id='payment-form']");

    /** @type {import('@playwright/test').FrameLocator} */
    this.paymentFrame = this.frameLocator(
      "(//iframe[contains(@title, 'Secure payment')])[1]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.cardNumberInput = this.paymentFrame.locator(
      "(//input[@type='text'])[1]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.expiryDateInput = this.paymentFrame.locator(
      "(//input[@type='text'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.cvcInput = this.paymentFrame.locator("(//input[@type='text'])[3]");

    /** @type {import('@playwright/test').Locator} */
    this.countryDropDown = this.paymentFrame.locator(
      "//select[@name = 'country']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.zipCodeInput = this.paymentFrame.locator("(//input[@type='text'])[4]");

    /** @type {import('@playwright/test').Locator} */
    this.byProvidingCardInformationText = this.locator(
      "//p[contains(., 'By providing your card information')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.productPriceText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.productPriceAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentPriceText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.installmentPriceAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.subtotalText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.subtotalAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.processingFeeText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.processingFeeAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.totalText = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.totalAmount = this.locator(
      "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]/following-sibling::span"
    );

    /** @type {import('@playwright/test').Locator} */
    this.termsAndConditionsCheckbox = this.locator(
      "//input[@type = 'checkbox']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.termsAndConditionsLink = this.locator(
      "//u[normalize-space()='Terms and Conditions']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.payButton = this.locator("//button[@type='button']");

    /** @type {import('@playwright/test').Locator} */
    this.cardNumberErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-numberError' and @role='alert']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.cardExpiryErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-expiryError' and @class='p-FieldError Error' and @role='alert']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.cardCVCErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-cvcError' and @class='p-FieldError Error' and @role='alert']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.cardZipErrorMessage = this.paymentFrame.locator(
      "//p[@id='Field-postalCodeError' and @class='p-FieldError Error' and @role='alert']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.progressBar = this.locator("//mat-spinner[@role='progressbar']");

    /** @type {import('@playwright/test').Locator} */
    this.backButton = this.locator("(//span[@class='back-button'])[2]");

    /** @type {import('@playwright/test').Locator} */
    this.footerText = this.locator(
      "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[3]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.readAgreeTerms = this.locator(
      "//div[3]/div[4]/div[1]/div[2]/div/div[6]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.termsAgreementTextPop = this.locator(
      "//h1[@id='mat-mdc-dialog-title-0']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.confirmationBox = this.locator(
      "//div[contains(., 'Payments confirmation')][contains(@class,'ng-star-inserted')]"
    );

    /** Confirmation box (success message only) */
    this.confirmationBoxSeccess = this.locator(
      "//div[contains(@class,'success-container') or contains(., 'Payment successful')]"
    );

    // Stepper states on Review page

    /** @type {import('@playwright/test').Locator} */
    this.step1Container = this.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='1']]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.step2Container = this.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='2']]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.step3Container = this.locator(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' step ')][.//div[contains(@class,'step-circle')]/span[normalize-space()='3']]"
    );
  }

  /**
   * @param {string} [cardNumber]
   */
  async enterCardNumber(cardNumber = process.env.CARD_NUMBER) {
    await this.cardNumberInput.fill(cardNumber);
  }

  /**
   * @param {string} [expiryDate]
   */
  async enterExpiryDate(expiryDate = process.env.CARD_EXPIRATION_DATE) {
    await this.expiryDateInput.fill(expiryDate);
  }

  /**
   * @param {string} [cvc]
   */
  async enterCVC(cvc = process.env.CARD_SECURITY_CODE) {
    await this.cvcInput.fill(cvc);
  }

  /**
   * @param {string} [zipCode]
   */
  async enterZipCode(zipCode = process.env.ZIP_CODE) {
    await this.zipCodeInput.fill(zipCode);
  }

  async clickTermsAndConditionsCheckbox() {
    await this.termsAndConditionsCheckbox.click();
  }

  async clickBackButton() {
    await this.backButton.click();
  }

  async clickPayButton() {
    await this.payButton.click();
  }
}
