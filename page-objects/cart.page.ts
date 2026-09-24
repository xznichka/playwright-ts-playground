import { expect, Locator, Page } from "@playwright/test";
import { NavigateTo } from "./navigate.to";

export class CartPage extends NavigateTo {
  private readonly cartPrices: Locator;
  private readonly cartQuantities: Locator;
  private readonly cartTotalPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.cartPrices = this.page.locator(".cart_price");
    this.cartQuantities = this.page.locator(".cart_quantity button");
    this.cartTotalPrices = this.page.locator(".cart_total_price");
  }

  async totalPriceVerification() {
    await this.cartPrices.first().waitFor();

    const productPrices = await this.cartPrices.allTextContents();
    const productQuantities = await this.cartQuantities.allTextContents();
    const totalPrices = await this.cartTotalPrices.allTextContents();

    for (let i = 0; i < productPrices.length; i++) {
      const price = Number(productPrices[i].replace("Rs. ", ""));
      const quantity = Number(productQuantities[i]);
      const calculatedRowTotalPrice = price * quantity;
      const displayedTotalPrice = Number(totalPrices[i].replace("Rs. ", ""));

      expect(calculatedRowTotalPrice).toBe(displayedTotalPrice);
    }
  }
}
