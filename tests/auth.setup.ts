import { test as setup, expect } from "@playwright/test";
import path from "path";
import { SignupLogin } from "../page-objects/signup.login.page";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  const signupLogin = new SignupLogin(page);
  await signupLogin.navigateToLoginPage();
  await signupLogin.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await page.waitForURL("https://www.automationexercise.com/");

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
