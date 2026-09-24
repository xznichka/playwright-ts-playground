import { test, expect } from "../fixtures/test";
import { NavigateTo } from "../page-objects/navigate.to";
import { ProductsPage } from "../page-objects/products.page";
import { SignupLogin } from "../page-objects/signup.login.page";

test("Search product", async ({ page }) => {
  const navigateTo = new NavigateTo(page);
  const productPage = new ProductsPage(page);
  const login = new SignupLogin(page);

  await navigateTo.openWebsite();
  await navigateTo.navigateToProducts();

  const productName = await productPage.getProductName(0);
  await productPage.searchProduct(productName);
  await productPage.verifySearchResult(productName);

  await productPage.addProductToCartFromProductPage(0);
  await navigateTo.navigateToCart();
  await productPage.verifyCartContainsProduct(productName);

  await navigateTo.navigateToLoginPage();
  await login.login("myuser@meow.com", "password");

  await navigateTo.navigateToCart();
  await productPage.verifyCartContainsProduct(productName);
});
