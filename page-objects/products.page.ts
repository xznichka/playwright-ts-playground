import { expect, Locator, Page } from "@playwright/test";
import { NavigateTo } from "./navigate.to";

export class ProductsPage extends NavigateTo {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly productCards: Locator;
  private readonly productNameTexts: Locator;
  private readonly viewProductLinks: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly productOverlays: Locator;
  private readonly productNameInCart: Locator;
  private readonly productNameOnProductPage: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");
    this.productCards = this.page.locator(".single-products");
    this.productNameTexts = this.page.locator(".productinfo p");
    this.viewProductLinks = this.page.getByRole("link", {
      name: "View Product",
    });
    this.continueShoppingButton = this.page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.productOverlays = this.page.locator(".product-overlay");
    this.productNameInCart = this.page.locator("td.cart_description a");
    this.productNameOnProductPage = this.page.locator(
      ".product-information h2",
    );
  }

  async openProductPageFromMenu(index: number) {
    await this.viewProductLinks.nth(index).click();
    await this.page.waitForURL("**/product_details/**");
  }

  async addProductToCartFromProductPage(index: number) {
    const singleProduct = this.productCards.nth(index);
    await singleProduct.hover();
    await this.productOverlays.nth(index).getByText("Add to cart").click();
    await this.continueShoppingButton.click();
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async getProductName(index: number) {
    return await this.productNameTexts.nth(index).innerText();
  }

  async verifySearchResult(productName: string) {
    const countProducts = await this.productNameTexts.count();
    for (let i = 0; i < countProducts; i++) {
      await expect(this.productNameTexts.nth(i)).toContainText(productName);
    }
  }

  async verifyCartContainsProduct(productName: string, index = 0) {
    await expect(this.productNameInCart.nth(index)).toContainText(productName);
  }

  async verifyProductNameOnProductPage(productName: string) {
    await expect(this.productNameOnProductPage).toContainText(productName);
  }
}
