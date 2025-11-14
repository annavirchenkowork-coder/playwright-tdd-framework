import { test } from '@playwright/test';

export class BasePage {
  static page;

  constructor(page) {
    BasePage.page = page; // Optional if you're consistently using static pattern
  }

  locator(selector) {
    return BasePage.page.locator(selector);
  }

  frameLocator(selector) {
    return BasePage.page.frameLocator(selector);
  }

  static setPage(page) {
    this.page = page;
  }
}