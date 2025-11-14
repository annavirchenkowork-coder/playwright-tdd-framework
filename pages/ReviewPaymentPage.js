import { BasePage } from "./BasePage";

export class ReviewPaymentPage extends BasePage {

  /** @type {import('@playwright/test').Locator} */
  paymentForm = this.locator("//form[@id='payment-form']");

  /** @type {import('@playwright/test').FrameLocator} */
  paymentFrame = this.frameLocator("(//iframe[contains(@title, 'Secure payment')])[1]");

  /** @type {import('@playwright/test').Locator} */
  cardNumberInput = this.paymentFrame.locator("(//input[@type='text'])[1]");

  /** @type {import('@playwright/test').Locator} */
  expiryDateInput = this.paymentFrame.locator("(//input[@type='text'])[2]");

  /** @type {import('@playwright/test').Locator} */
  cvcInput = this.paymentFrame.locator("(//input[@type='text'])[3]");

  /** @type {import('@playwright/test').Locator} */
  countryDropDown = this.paymentFrame.locator("//select[@name = 'country']");

  /** @type {import('@playwright/test').Locator} */
  zipCodeInput = this.paymentFrame.locator("(//input[@type='text'])[4]");

  /** @type {import('@playwright/test').Locator} */
  byProvidingCardInformationText = this.locator("//p[contains(., 'By providing your card information')]");

  /** @type {import('@playwright/test').Locator} */
  productPriceText = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]");

  /** @type {import('@playwright/test').Locator} */
  productPriceAmount = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Product Price')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  installmentPriceText = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]");

  /** @type {import('@playwright/test').Locator} */
  installmentPriceAmount = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installment Price')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  subtotalText = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]");

  /** @type {import('@playwright/test').Locator} */
  subtotalAmount = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Subtotal')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  processingFeeText = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]");

  /** @type {import('@playwright/test').Locator} */
  processingFeeAmount = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Processing')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  totalText = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]");

  /** @type {import('@playwright/test').Locator} */
  totalAmount = this.locator("//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Total')]/following-sibling::span");

  /** @type {import('@playwright/test').Locator} */
  termsAndConditionsCheckbox = this.locator("//input[@type = 'checkbox']");

  /** @type {import('@playwright/test').Locator} */
  termsAndConditionsLink = this.locator("//u[normalize-space()='Terms and Conditions']");

  /** @type {import('@playwright/test').Locator} */
  payButton = this.locator("//button[@type='button']");

  /** @type {import('@playwright/test').Locator} */
  cardNumberErrorMessage = this.paymentFrame.locator("//p[@id='Field-numberError' and @class='p-FieldError Error' and @role='alert']");

  /** @type {import('@playwright/test').Locator} */
  backButton = this.locator("(//span[@class='back-button'])[2]");

  /** @type {import('@playwright/test').Locator} */
  footerText = this.locator("(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[3]");

  /** @type {import('@playwright/test').Locator} */
  cardExpiryErrorMessage = this.paymentFrame.locator("//p[@id='Field-expiryError' and @class='p-FieldError Error' and @role='alert']");

  /** @type {import('@playwright/test').Locator} */
  cardCVCErrorMessage = this.paymentFrame.locator("//p[@id='Field-cvcError' and @class='p-FieldError Error' and @role='alert']");

  /** @type {import('@playwright/test').Locator} */
  zipCodeErrorMessage = this.paymentFrame.locator("//p[@id='Field-postalCodeError' and @class='p-FieldError Error' and @role='alert']");

  /** @type {import('@playwright/test').Locator} */
  progressBar = this.locator("//mat-spinner[@role='progressbar']");

  /** @type {import('@playwright/test').Locator} */
  termsAndConditionsCheckBox = this.locator("//input[@type='checkbox']");

  /** @type {import('@playwright/test').Locator} */
  readAgreeTerms = this.locator("//div[3]/div[4]/div[1]/div[2]/div/div[6]");

  /** @type {import('@playwright/test').Locator} */
  termsAgreementTextPop = this.locator("//h1[@id='mat-mdc-dialog-title-0']");

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