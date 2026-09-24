import { test } from "../fixtures/test";
import { NavigateTo } from "../page-objects/navigate.to";
import { ProductsPage } from "../page-objects/products.page";
import { CartPage } from "../page-objects/cart.page";
import { Checkout } from "../page-objects/checkout";

test.use({ storageState: "playwright/.auth/user.json" });

test("Place Order: Login before Checkout", async ({ page }) => {
  const navigateTo = new NavigateTo(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkout = new Checkout(page);
  await navigateTo.openWebsite();
  await productsPage.addProductToCartFromProductPage(0);
  await productsPage.navigateToCart();
  await checkout.proceedToCheckoutFromCart();
  await checkout.verifyCheckoutPageElements();
  await checkout.proceedToPayment();
  await checkout.fullfilPaymentDetails();
  await checkout.confirmPayment();
  await checkout.orderPlacedTextVerification();
});
