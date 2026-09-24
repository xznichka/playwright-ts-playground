import { test } from "../fixtures/test";
import { NavigateTo } from "../page-objects/navigate.to";
import { ProductsPage } from "../page-objects/products.page";
import { CartPage } from "../page-objects/cart.page";

test("Add Products in Cart", async ({ page }) => {
  const navigateTo = new NavigateTo(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  await navigateTo.openWebsite();
  await navigateTo.navigateToProducts();
  await productsPage.addProductToCartFromProductPage(0);
  await productsPage.addProductToCartFromProductPage(0);
  await productsPage.addProductToCartFromProductPage(10);
  await productsPage.navigateToCart();
  await cartPage.totalPriceVerification();
});
