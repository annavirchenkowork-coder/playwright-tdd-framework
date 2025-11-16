import { readFileSync } from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

/**
 * Class representing a price option for a product
 */
class Price {
  /**
   * Constructs a Price instance
   * @param {Object} priceData - Object containing price information
   * @param {boolean} priceData.active
   * @param {number} priceData.baseAmount
   * @param {string} priceData.type
   * @param {boolean} priceData.upfrontDiscount
   * @param {number} priceData.upfrontDiscountAmount
   * @param {boolean} priceData.allowCoupons
   * @param {number} priceData.couponDiscount
   * @param {number} [priceData.numberOfInstallments]
   */
  constructor({
    active,
    baseAmount,
    type,
    upfrontDiscount,
    upfrontDiscountAmount,
    allowCoupons,
    couponDiscount,
    numberOfInstallments,
  }) {
    this.active = active;
    this.baseAmount = baseAmount;
    this.type = type;
    this.upfrontDiscount = upfrontDiscount;
    this.upfrontDiscountAmount = upfrontDiscountAmount;
    this.allowCoupons = allowCoupons;
    this.couponDiscount = couponDiscount;
    this.numberOfInstallments = numberOfInstallments || null;
  }
}

/**
 * Class representing a product
 */
class Product {
  /**
   * Constructs a Product instance
   * @param {Object} productData - Object containing product information
   */
  constructor({
    available,
    productName,
    productId,
    teen,
    type,
    programId,
    programCode,
    programName,
    startDate,
    refundDate,
    externalUrl,
    terms,
    prices,
  }) {
    this.available = available;
    this.productName = productName;
    this.productId = productId;
    this.teen = teen;
    this.type = type;
    this.programId = programId;
    this.programCode = programCode;
    this.programName = programName;
    this.startDate = startDate;
    this.refundDate = refundDate;
    this.externalUrl = externalUrl;
    this.terms = terms;
    this.prices = prices.map((price) => new Price(price));
  }
}

/** -----------------------------
 * Load QA data from JSON (once)
 * ----------------------------- */

const dataPath = path.resolve("data/qa_data.json");
const rawData = readFileSync(dataPath, "utf8");

/**
 * Raw parsed JSON data from qa_data.json
 * @type {any}
 */
export const qaData = JSON.parse(rawData);

/**
 * Strongly-typed Product instance created from qa_data.json
 * @type {Product}
 */
export const productInfo = new Product(qaData);

/** ---------------------------------
 * Dynamic + static user test data
 * --------------------------------- */

/**
 * Generates a random test user using faker.
 * Can be used in TDD tests when you want
 * fresh data per run.
 */
export function generateTestUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({ provider: "example.com" }),
    phone: faker.string.numeric(10),
    howDidYouHear: "LinkedIn",
  };
}

/**
 * Default user + date info based on qaData.
 * Useful when you want stable, non-random data.
 */
export const defaultEnrollmentData = {
  firstName: "Anna",
  lastName: "Virchenko",
  email: "anna.virchenko@example.com",
  phone: "5551234567",
  howDidYouHear: "LinkedIn",
  startDate: qaData.startDate,
  refundDate: qaData.refundDate,
};

export const upfrontPrice = productInfo.prices.find(
  (p) => p.type === "one-time"
);

export const installmentsPrice = productInfo.prices.find(
  (p) => p.type === "recurring"
);