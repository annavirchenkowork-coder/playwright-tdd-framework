import { readFileSync } from "fs";

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
   * @param {boolean} productData.available
   * @param {string} productData.productName
   * @param {string} productData.productId
   * @param {boolean} productData.teen
   * @param {string} productData.type
   * @param {string} productData.programId
   * @param {string} productData.programCode
   * @param {string} productData.programName
   * @param {string} productData.startDate
   * @param {string} productData.refundDate
   * @param {string} productData.externalUrl
   * @param {string} productData.terms
   * @param {Object[]} productData.prices
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

/**
 * Exports a Product instance created from JSON data in a file
 * @type {Product}
 */
export const productInfo = new Product(
  JSON.parse(readFileSync("./data/qa_data.json", "utf8"))
);