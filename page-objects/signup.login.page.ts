import { Page } from "@playwright/test";
import { NavigateTo } from "./navigate.to";

export class SignupLogin extends NavigateTo {
  constructor(page: Page) {
    super(page);
  }
  async login(email: string, password: string) {
    const loginForm = this.page.locator(".login-form");
    await loginForm.locator('[data-qa="login-email"]').fill(email);
    await loginForm.locator('[data-qa="login-password"]').fill(password);
    await loginForm.getByRole("button", { name: "Login" }).click();
  }
}
