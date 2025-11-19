import { test, expect } from "../../utilities/sep-ui-utilities.js";
import { StartApplicationPage } from "../../pages/StartApplicationPage.js";
import { LeftMainPage } from "../../pages/LeftMainPage.js";
import { qaData } from "../../utilities/qa-data-reader.js";

test.describe("SEP07 - View Product Landing Page @sep07", () => {
  // Small helper: create page objects for the current test
  const initPages = (page) => ({
    startApp: new StartApplicationPage(page),
    left: new LeftMainPage(page),
  });

  // =========================================================
  // AC1 – Secure checkout title is visible on the left panel
  // =========================================================
  test('AC1 - "Cydeo Secure checkout" title is visible on the left panel @sep07-1', async ({
    page,
  }) => {
    const { left } = initPages(page);

    await expect(left.secureCheckout).toBeVisible();
  });

  // =========================================================
  // AC2 – Program name is displayed and matches expected
  // =========================================================
  test("AC2 - Program name is visible on the left panel @sep07-2", async ({
    page,
  }) => {
    const { left } = initPages(page);

    await expect(left.programName).toBeVisible();
  });

  test("AC2 - Program name matches expected value @sep07-2", async ({
    page,
  }) => {
    const { left } = initPages(page);

    const actual = (await left.programName.innerText()).trim();
    expect(actual).toBe(qaData.programName);
  });

  // =========================================================
  // AC3 – Left footer contains items in correct order
  // =========================================================
  test("AC3 - Left footer contains items in correct order @sep07-3", async ({
    page,
  }) => {
    const { left } = initPages(page);

    const expected = [
      "CYDEO logo",
      "Terms and conditions",
      "Privacy Policy",
      "Disclaimer",
      "Cookie Policy",
    ];

    const actual = [];

    // First: logo, if visible
    if (await left.cydeoImageAtLeftWindow.isVisible()) {
      actual.push("CYDEO logo");
    }

    // Then footer links in order
    const linkTexts = await left.footerElements.allInnerTexts();
    actual.push(
      ...linkTexts.map(
        (t) => t.trim().replace(/\s+/g, " ") // collapse weird whitespaces
      )
    );

    expect(actual).toEqual(expected);
  });

  // =========================================================
  // AC4 – Right footer help contact line
  // =========================================================
  test("AC4 - Right footer help text is visible and contains help email @sep07-4", async ({
    page,
  }) => {
    const { startApp } = initPages(page);

    const helpFooter = startApp.footer.first();
    await expect(helpFooter).toBeVisible();
    await expect(helpFooter).toContainText(
      "Need help? Contact us at enrollment@cydeo.com"
    );
  });
});
