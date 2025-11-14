import { BasePage } from "./BasePage";

export class StartApplicationPage extends BasePage {
  
  /** @type {import('@playwright/test').Locator} */
  startApplicationText = this.locator("(//div[@class = 'step-title'])[1]");

  /** @type {import('@playwright/test').Locator} */
  paymentPlanText = this.locator("(//div[@class = 'step-title'])[2]");

  /** @type {import('@playwright/test').Locator} */
  reviewText = this.locator("(//div[@class = 'step-title'])[3]");

  /** @type {import('@playwright/test').Locator} */
  startApplicationStepCircle = this.locator("(//*[@class='step-circle'])[1]");

  /** @type {import('@playwright/test').Locator} */
  paymentPlanStepCircle = this.locator("(//*[@class='step-circle'])[2]");

  /** @type {import('@playwright/test').Locator} */
  reviewStepCircle = this.locator("(//*[@class='step-circle'])[3]");

  /** @type {import('@playwright/test').Locator} */
  firstNameInputBox = this.locator("//input[@formcontrolname='firstName']");

  /** @type {import('@playwright/test').Locator} */
  lastNameInputBox = this.locator("//input[@formcontrolname='lastName']");

  /** @type {import('@playwright/test').Locator} */
  emailInputBox = this.locator("//input[@formcontrolname='email']");

  /** @type {import('@playwright/test').Locator} */
  phoneNumberInputBox = this.locator("//input[@formcontrolname='phoneNumber']");

  /** @type {import('@playwright/test').Locator} */
  howDidYouHearAboutUsDropDown = this.locator("//mat-label[text()='How did you hear about us?']");

  /** @type {import('@playwright/test').Locator} */
  emailOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'Email')]");

  /** @type {import('@playwright/test').Locator} */
  facebookOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'Facebook')]");

  /** @type {import('@playwright/test').Locator} */
  googleOption = this.locator("//mat-option/span[contains(text(), 'Google')]");

  /** @type {import('@playwright/test').Locator} */
  instagramOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'Instagram')]");

  /** @type {import('@playwright/test').Locator} */
  linkedInOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'LinkedIN')]");

  /** @type {import('@playwright/test').Locator} */
  twitterOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'Twitter')]");

  /** @type {import('@playwright/test').Locator} */
  referredByFriedOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'Referred by a friend')]");

  /** @type {import('@playwright/test').Locator} */
  otherOptionFromDropDown = this.locator("//mat-option/span[contains(text(), 'Other')]");

  /** @type {import('@playwright/test').Locator} */
  firstNameInputBoxForParents = this.locator("(//input[@formcontrolname='firstName'])[2]");

  /** @type {import('@playwright/test').Locator} */
  lastNameInputBoxForParents = this.locator("(//input[@formcontrolname='lastName'])[2]");

  /** @type {import('@playwright/test').Locator} */
  emailInputBoxForParents = this.locator("(//input[@formcontrolname='email'])[2]");

  /** @type {import('@playwright/test').Locator} */
  phoneNumberInputBoxForParents = this.locator("(//input[@formcontrolname='phoneNumber'])[2]");

  /** @type {import('@playwright/test').Locator} */
  flexiblePaymentsPlanAvailableText = this.locator("//p[text() = 'Flexible payments plan available']");

  /** @type {import('@playwright/test').Locator} */
  programStartDate = this.locator("//div[contains(text(), 'Program Start Date')]/b[@class='info-value']");

  /** @type {import('@playwright/test').Locator} */
  refundEndDate = this.locator("(//b[@class='info-value'])[2]");

  /** @type {import('@playwright/test').Locator} */
  programNameOnInfoCard = this.locator("//p[@class='program-title primary-color']");

  /** @type {import('@playwright/test').Locator} */
  programPrice = this.locator("//div[@class='col-sm']/b[@class = 'info-primary']");

  /** @type {import('@playwright/test').Locator} */
  footer = this.locator("//p[@class = 'footer-text' and contains(text(), 'Need help?')]");

  /** @type {import('@playwright/test').Locator} */
  nextButton = this.locator("//button[@class = 'next-button'][contains(text(), 'Next')]");

  /** @type {import('@playwright/test').Locator} */
  programBasePrice = this.locator("//span[@class='ng-star-inserted']/s");

  /** @type {import('@playwright/test').Locator} */
  enterPersonalDetails = this.locator("//b[contains(.,'Enter personal details')]");

  /** @type {import('@playwright/test').Locator} */
  discountedPrice = this.locator("//b[@class='info-primary']");

  /** @type {import('@playwright/test').Locator} */
  originalPrice = this.locator("//s[contains(.,'$')]");

  /**
   * @param {string} firstName
   */
  async enterFirstName(firstName) {
    await this.firstNameInputBox.fill(firstName);
  }

  /**
   * @param {string} lastName
   */
  async enterLastName(lastName) {
    await this.lastNameInputBox.fill(lastName);
  }

  /**
   * @param {string} email
   */
  async enterEmail(email) {
    await this.emailInputBox.fill(email);
  }

  /**
   * @param {string} phoneNumber
   */
  async enterPhoneNumber(phoneNumber) {
    await this.phoneNumberInputBox.fill(phoneNumber);
  }

  /**
   * @param {string} howDidYouHear
   */
  async selectHowDidYouHearAboutUs(howDidYouHear) {
    howDidYouHear = howDidYouHear.toLowerCase();
    await this.howDidYouHearAboutUsDropDown.click();
    switch (howDidYouHear) {
      case "email":
        await this.emailOptionFromDropDown.click();
        break;
      case "facebook":
        await this.facebookOptionFromDropDown.click();
        break;
      case "google":
        await this.googleOption.click();
        break;
      case "instagram":
        await this.instagramOptionFromDropDown.click();
        break;
      case "linkedin":
        await this.linkedInOptionFromDropDown.click();
        break;
      case "twitter":
        await this.twitterOptionFromDropDown.click();
        break;
    }
  }

  async clickNextButton() {
    await this.nextButton.click();
  }
}