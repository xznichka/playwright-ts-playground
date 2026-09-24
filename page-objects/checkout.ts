import { expect, Locator, Page } from "@playwright/test";
import { NavigateTo } from "./navigate.to";
import { faker } from "@faker-js/faker";

export class Checkout extends NavigateTo {
  readonly proceedToCheckoutButton: Locator;
  readonly addressDeliveryBlock: Locator;
  readonly addressInvoiceBlock: Locator;
  readonly placeOrderButton: Locator;

  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmButton: Locator;

  readonly orderPlacedText: Locator;

  constructor(page: Page) {
    super(page);

    this.proceedToCheckoutButton = page.locator(".check_out");
    this.addressDeliveryBlock = page.locator("#address_delivery");
    this.addressInvoiceBlock = page.locator("#address_invoice");
    this.placeOrderButton = page.getByRole("link", { name: "Place Order" });
    this.nameOnCardInput = page.getByTestId("name-on-card");
    this.cardNumberInput = page.getByTestId("card-number");
    this.cvcInput = page.getByTestId("cvc");
    this.expiryMonthInput = page.getByTestId("expiry-month");
    this.expiryYearInput = page.getByTestId("expiry-year");
    this.payAndConfirmButton = page.getByRole("button", {
      name: "Pay and Confirm Order",
    });
    this.orderPlacedText = page.getByTestId("order-placed");
  }

  async proceedToCheckoutFromCart() {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForURL("https://www.automationexercise.com/checkout");
  }

  async verifyCheckoutPageElements() {
    await expect(this.addressDeliveryBlock).toBeVisible();
    await expect(this.addressInvoiceBlock).toBeVisible();
  }

  async proceedToPayment() {
    await this.placeOrderButton.click();
    await this.page.waitForURL("https://www.automationexercise.com/payment");
  }

  async fullfilPaymentDetails() {
    await this.nameOnCardInput.fill(faker.person.fullName());
    await this.cardNumberInput.fill(faker.finance.creditCardNumber());
    await this.cvcInput.fill(faker.finance.creditCardCVV());
    await this.expiryMonthInput.fill(faker.date.month());
    await this.expiryYearInput.fill("2030");
  }

  async confirmPayment() {
    await this.payAndConfirmButton.click();
    await this.page.waitForURL("**/payment_done/*");
  }
  async orderPlacedTextVerification() {
    expect(this.orderPlacedText).toBeVisible();
  }
}
