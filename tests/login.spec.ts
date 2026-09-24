import { test, expect } from "../fixtures/test";
import { SignupLogin } from "../page-objects/signup.login.page";

test("signup with valid credentials", async ({ page }) => {
  const signupLogin = new SignupLogin(page);
  await signupLogin.navigateToLoginPage();
  await signupLogin.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await expect(page).toHaveURL("https://www.automationexercise.com/");
});
