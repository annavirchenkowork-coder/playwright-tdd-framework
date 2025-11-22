import { BasePage } from "./BasePage.js";

export class StartApplicationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    /** @type {import('@playwright/test').Locator} */
    this.startApplicationText = this.locator(
      "(//div[@class = 'step-title'])[1]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.paymentPlanText = this.locator("(//div[@class = 'step-title'])[2]");

    /** @type {import('@playwright/test').Locator} */
    this.reviewText = this.locator("(//div[@class = 'step-title'])[3]");

    // Step circles – less brittle than 3 separate XPaths
    const circles = this.locator(".step-circle");
    /** @type {import('@playwright/test').Locator} */
    this.startApplicationStepCircle = circles.nth(0);
    /** @type {import('@playwright/test').Locator} */
    this.paymentPlanStepCircle = circles.nth(1);
    /** @type {import('@playwright/test').Locator} */
    this.reviewStepCircle = circles.nth(2);

    /** @type {import('@playwright/test').Locator} */
    this.firstNameInputBox = this.locator(
      "//input[@formcontrolname='firstName']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.lastNameInputBox = this.locator(
      "//input[@formcontrolname='lastName']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.emailInputBox = this.locator("//input[@formcontrolname='email']");

    /** @type {import('@playwright/test').Locator} */
    this.phoneNumberInputBox = this.locator(
      "//input[@formcontrolname='phoneNumber']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.howDidYouHearAboutUsDropDown = this.locator(
      "//mat-label[text()='How did you hear about us?']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.emailOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Email')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.facebookOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Facebook')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.googleOption = this.locator(
      "//mat-option/span[contains(text(), 'Google')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.instagramOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Instagram')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.linkedInOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'LinkedIN')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.twitterOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Twitter')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.referredByFriedOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Referred by a friend')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.otherOptionFromDropDown = this.locator(
      "//mat-option/span[contains(text(), 'Other')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.firstNameInputBoxForParents = this.locator(
      "(//input[@formcontrolname='firstName'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.lastNameInputBoxForParents = this.locator(
      "(//input[@formcontrolname='lastName'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.emailInputBoxForParents = this.locator(
      "(//input[@formcontrolname='email'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.phoneNumberInputBoxForParents = this.locator(
      "(//input[@formcontrolname='phoneNumber'])[2]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.flexiblePaymentsPlanAvailableText = this.locator(
      "//p[text() = 'Flexible payments plan available']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.programStartDate = this.locator(
      "//div[contains(text(), 'Program Start Date')]/b[@class='info-value']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.refundEndDate = this.locator("(//b[@class='info-value'])[2]");

    /** @type {import('@playwright/test').Locator} */
    this.programNameOnInfoCard = this.locator(
      "//p[@class='program-title primary-color']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.programPrice = this.locator(
      "//div[@class='col-sm']/b[@class = 'info-primary']"
    );

    /** @type {import('@playwright/test').Locator} */
    this.footer = this.locator(
      "//p[@class = 'footer-text' and contains(text(), 'Need help?')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.nextButton = this.locator(
      "//button[@class = 'next-button'][contains(text(), 'Next')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.programBasePrice = this.locator("//span[@class='ng-star-inserted']/s");

    /** @type {import('@playwright/test').Locator} */
    this.enterPersonalDetails = this.locator(
      "//b[contains(.,'Enter personal details')]"
    );

    /** @type {import('@playwright/test').Locator} */
    this.discountedPrice = this.locator("//b[@class='info-primary']");

    /** @type {import('@playwright/test').Locator} */
    this.originalPrice = this.locator("//s[contains(.,'$')]");
  }

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
    const option = howDidYouHear.toLowerCase();
    await this.howDidYouHearAboutUsDropDown.click();

    switch (option) {
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
      // you can add "other", "referred", etc later if needed
    }
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  /**
   * Convenience helper to fill personal data in one call.
   * @param {{ firstName?: string, lastName?: string, email?: string, phone?: string, howDidYouHear?: string }} d
   */
  async fillPersonalInformation(d = {}) {
    if (d.firstName) await this.firstNameInputBox.fill(d.firstName);
    if (d.lastName) await this.lastNameInputBox.fill(d.lastName);
    if (d.email) await this.emailInputBox.fill(d.email);
    if (d.phone) await this.phoneNumberInputBox.fill(d.phone);
    if (d.howDidYouHear) await this.selectHowDidYouHearAboutUs(d.howDidYouHear);
  }
}
