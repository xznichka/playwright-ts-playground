import { test } from "../fixtures/test";
import { ProductsPage } from "../page-objects/products.page";

test("verifying product detail page", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.openWebsite();
  await productsPage.navigateToProducts();
  const productName = await productsPage.getProductName(0);
  await productsPage.openProductPageFromMenu(0);
  await productsPage.verifyProductNameOnProductPage(productName);
});
