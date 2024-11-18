import BigNumber from "bignumber.js";
import type { Currency } from "@/types";

// prevent bignumber converting to exponential notation
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

// type Currency = {
//   symbol: string;
//   decimals: number;
//   name?: string;
// };

export default class Amount {
  private amount: BigNumber;
  public currency: Currency;
  public fiatValue: BigNumber;
  private roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN;
  private displayDecimals = 6;
  private displayDecimalsFiat = 2;
  private locale: string = "en-US";
  private fiatCurrency: string = "USD";

  constructor(amount: string, currency: Currency, fiatValue = "0") {
    this.amount = new BigNumber(amount);
    this.currency = currency;
    this.fiatValue = new BigNumber(fiatValue);
  }

  /**
   * Alters the default number of decimal places to display
   * this is useful for display purposes, and does not alter the underlying value
   * Note that the DISPLAY decimals set does does not affect the number of decimals used
   * to shift the decimal in the currency. IE, just because you want to DISPLAY 5 decimals on an
   * ETH value does not stop ETH having 18 decimals.
   * @example
   * ```typescript
   * const amount = new Amount("50030", { symbol: "USD", decimals: 2 });
   * amount.setDisplayDecimals(2).toString(); // "$500.30"
   * ```
   * @remarks These setter functions will permanently change the internal properties
   * @param decimals - Number of decimal places to display
   * @this {Amount}
   * @returns this - Returns the instance of the Amount class
   */
  setDisplayDecimals(decimals: number) {
    this.displayDecimals = decimals;
    return this;
  }

  /**
   * Alters the default number of decimal places to display when the currency is a fiat amount
   * this is useful for display purposes, and does not alter the underlying value. As above, note that the
   * display decimals set does not affect the number of decimals in the currency
   * @example
   * ```typescript
   * const amount = new Amount("5003018", { symbol: "USD", decimals: 4 });
   * amount.toString() // $500.30
   * amount.setDisplayDecimalsFiat(4).toString(); // "$500.3018"
   * ```
   * @param decimals - Number of decimal places to display
   * @this {Amount}
   * @returns this - Returns the instance of the Amount class
   */
  setDisplayDecimalsFiat(decimals: number) {
    this.displayDecimalsFiat = decimals;
    return this;
  }

  /**
   * Alters the default rounding mode for the amount
   * this is useful for display purposes, and does not alter the underlying value
   * @example
   * ```typescript
   * const amount = new Amount("127298403429659153", { symbol: "ETH", decimals: 16 });
   * amount.setRoundingMode(BigNumber.ROUND_UP).toString(); // "12.730 ETH"
   * ```
   * @param mode - BigNumber.RoundingMode to use
   * @this {Amount}
   * @returns this - Returns the instance of the Amount class
   */
  setRoundingMode(mode: BigNumber.RoundingMode) {
    this.roundingMode = mode;
    return this;
  }

  /**
   * Set the internal locale fallback for display formatting
   * @example
   * ```typescript
   * const amount = new Amount("51212127298403429659153", { symbol: "ETH", decimals: 18 });
   * amount.setLocale("in-IN").toString(); // "51,21,212.730 ETH"
   * ```
   * @param locale - set the locale to use for this instance
   * @this {Amount}
   * @returns this - Returns the instance of the Amount class
   */
  setLocale(locale: string) {
    this.locale = locale;
    return this;
  }

  /**
   * Set the currency fiat is denominated in
   * @example
   * ```typescript
   * const amount = Amount.fromDecimal("6500", { symbol: "BAT", decimals: 18 }, "1039.49");
   * amount.localAmountFiat(); // "$1,039.49"
   * amount.setFiatCurrency("EUR").localAmountFiat(); // "€1,039.49"
   * ```
   * @param mode - BigNumber.RoundingMode to use
   * @remark This does not perform any conversion, merely sets the unit name
   * @this {Amount}
   * @returns this - Returns the instance of the Amount class
   */
  setFiatCurrency(locale: string) {
    this.fiatCurrency = locale;
    return this;
  }

  /**
   * Convenience method to return internal BigNumber
   * @returns {BigNumber} - Returns the amount as a BigNumber
   */
  asBigNumber() {
    return this.amount;
  }

  /**
   * Convenience method to return internal BigNumber as JS BigInt
   * @returns {BigInt} - Returns the amount as a BigInt
   */
  asBigInt() {
    return BigInt(this.amount.toString());
  }

  /**
   * Returns the amount as a string, with decimal shifted correctly
   * this is mostly intended for use with form inputs, etc
   * @returns {string} - Returns the amount as a string
   */
  asValue() {
    return this.down().toString();
  }

  /**
   * Returns the amount as a string, without decimal shifted
   * this is often the value needed in a payload or request
   * @returns {string} - Returns the amount as a long string - eg Wei value
   */
  asSubunit() {
    return this.amount.toString();
  }

  // asDecimalFormat() {
  //   const value = this.down().toFormat(
  //     this.currency.decimals,
  //     this.roundingMode
  //   );
  //   return `${value} ${this.currency}`;
  // }

  // asUSD(decimals = 2, removeDecimals = false) {
  //   const amount = `$${this.fiatValue.toFormat(decimals, this.roundingMode)}`;
  //   if (removeDecimals) return amount.replace(".00", "");
  //   return amount;
  // }

  /**
   * Determines if the amount is a non-zero value, intended primarily for
   * use in conditional statements or filters
   * @returns {boolean} - The amount is not zero - Note this does not support negative amounts
   */
  nonZero() {
    return this.amount.isGreaterThan(0);
  }

  /**
   * Determines if the amount is zero, intended primarily for
   * use in conditional statements or filters
   * @returns {boolean} - The amount is zero
   */
  isZero() {
    return this.amount.isZero();
  }

  localAmountFiat(opts: Intl.NumberFormatOptions = {}) {
    const setOpts = {
      maximumFractionDigits: this.displayDecimalsFiat,
      minimumFractionDigits: this.displayDecimalsFiat,
      currency: this.fiatCurrency,
      ...opts,
    };

    return this.formatCurrency(
      this.fiatCurrency,
      this.fiatValue.toNumber(),
      setOpts
    );
  }

  /**
   * return the amount of fiat currency, but as a value not a display string
   *  - used to calculate total balances, for example
   * @returns {number} - returns a float amount
   */
  localAmountFiatValue() {
    return this.fiatValue.toNumber();
  }

  localAmount(opts: Intl.NumberFormatOptions = {}) {
    const setOpts = {
      maximumFractionDigits: this.displayDecimals,
      ...opts,
    };

    const formattedAmount = this.formatNumber(this.down().toNumber(), setOpts);
    return formattedAmount.replace(".0000", "") + " " + this.currency.symbol;
  }

  /**
   *
   * @param currencyCode {string} - String to test as a currency code
   * @returns {boolean}
   */

  isValidCurrency(currencyCode: string): boolean {
    try {
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  fullLocalAmount() {
    const isFiat = this.isValidCurrency(this.currency.symbol);
    if (isFiat) {
      return this.localAmount().replace(".00", "");
    }
    const formattedAmount = this.down().toFormat();
    return `${formattedAmount} ${this.currency.symbol}`;
  }

  getLocale() {
    if (process.env.LOCALE) {
      return process.env.LOCALE;
    }

    if (navigator) {
      return navigator.languages[0];
    }

    return this.locale;
  }

  formatCurrency(
    currency: string,
    value: number,
    opts: Intl.NumberFormatOptions = {}
  ) {
    return new Intl.NumberFormat(this.getLocale(), {
      style: "currency",
      currencyDisplay: "narrowSymbol", // Uses a narrow format symbol ("$100" rather than "US$100").
      currency,
      ...opts,
    }).format(value);
  }

  formatNumber(value: number, opts: Intl.NumberFormatOptions = {}) {
    return new Intl.NumberFormat(this.getLocale(), opts).format(value);
  }

  down() {
    return this.amount.shiftedBy(-this.currency.decimals);
  }

  isNegative() {
    return this.amount.isNegative();
  }

  toString() {
    return this.localAmount();
  }

  toFloat() {
    return this.down().toNumber();
  }

  equals(amount: Amount) {
    return (
      this.amount.isEqualTo(amount.amount) &&
      this.currency.symbol === amount.currency.symbol
    );
  }

  isLessThanValue(value: string) {
    return this.down().isLessThan(value);
  }

  isMoreThanValue(value: string) {
    return this.down().isGreaterThan(value);
  }

  isCurrency(currency: string) {
    return this.currency.symbol === currency;
  }

  setUsdValueFromRate(rate: number) {
    if (this.isZero()) return this;
    this.fiatValue = this.down().multipliedBy(rate);
    return this;
  }

  // percentage should be passed in as a decimal eg. 0.1 for 10%
  multiplyPercentage(percentage: number) {
    return this.amount
      .multipliedBy(percentage)
      .shiftedBy(-this.currency.decimals)
      .decimalPlaces(this.currency.decimals, this.roundingMode)
      .toString();
  }

  takeFee(fee: number, remainder = false) {
    if (remainder) fee = 1 - fee;
    return Amount.fromDecimal(this.multiplyPercentage(fee), this.currency);
  }

  multipliedBy(multiplier: number) {
    return new Amount(
      this.amount.multipliedBy(multiplier).toString(),
      this.currency,
      this.fiatValue.multipliedBy(multiplier).toString()
    );
  }

  dividedBy(divisor: number) {
    return new Amount(
      this.amount.dividedBy(divisor).toString(),
      this.currency,
      this.fiatValue.dividedBy(divisor).toString()
    );
  }

  mergeAmount(amount: Amount) {
    return new Amount(
      this.amount.plus(amount.amount).toString(),
      this.currency,
      this.fiatValue.plus(amount.fiatValue).toString()
    );
  }

  static fromDecimal(
    decimalString: string,
    currency: Currency,
    fiatValue = "0"
  ) {
    const bn = new BigNumber(decimalString).decimalPlaces(
      currency.decimals,
      BigNumber.ROUND_FLOOR
    );
    return new Amount(
      bn.shiftedBy(currency.decimals).toString(),
      currency,
      fiatValue
    );
  }

  /**
   * Creates a new instance from the current instance, to maintain settings such as rounding mode
   * or display decimals
   * @param amount -
   */
  amountFrom(amount: string, currency: Currency, fiatValue: string) {}
  amountFromDecimal(amount: string, currency: Currency, fiatValue: string) {}
}
