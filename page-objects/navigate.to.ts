import { Page } from "@playwright/test";
export class NavigateTo {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openWebsite() {
    await this.page.goto("https://www.automationexercise.com/");
    await this.handleConsent();
    await this.hideAds();
  }
  async navigateToLoginPage() {
    await this.page.goto("https://www.automationexercise.com/");
    await this.handleConsent();
    await this.hideAds();
    await this.page.getByRole("link", { name: "Signup / Login" }).click();
    await this.page.waitForURL("**/login");
  }

  async navigateToProducts() {
    await this.page.getByRole("link", { name: "Products" }).click();
    await this.hideAds();
    await this.page.waitForURL("**/products**");
  }

  async navigateToCart() {
    await this.page.locator('a[href="/view_cart"]').first().click();
    await this.page.waitForURL("**/view_cart");
    await this.hideAds();
  }

  private async handleConsent() {
    const consentButton = this.page
      .locator(".fc-dialog")
      .getByRole("button", { name: "Consent" });
    if (await consentButton.isVisible({ timeout: 3000 })) {
      await consentButton.click();
    }
  }
  private async hideAds() {
    await this.page.route("**/*google*", (route) => route.abort());
    await this.page.route("**/*doubleclick*", (route) => route.abort());
    await this.page.route("**/*adservice*", (route) => route.abort());
    await this.page.route("**/pagead/**", (route) => route.abort());
  }
}
