
import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Process Tests', () => {
  test('Test Case 5: Verify Checkout Process', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.isItemVisible('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Dou');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinue();
    const summaryTotal = await checkoutPage.getSummaryTotal();
    expect(summaryTotal).toBe('Total: $32.39');
    await checkoutPage.clickFinish();
    const completeOrderHeader = await checkoutPage.getCompleteOrderHeader();
    expect(completeOrderHeader).toBe('Thank you for your order!');
  });

  test('Test Case 6: Verify Checkout Process for multiple items', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    let cartBadge = await inventoryPage.getCartBadge();
    expect(cartBadge).toBe('1');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    cartBadge = await inventoryPage.getCartBadge();
    expect(cartBadge).toBe('2');
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe('2');
    const isBackpackVisible = await cartPage.isItemVisible('Sauce Labs Backpack');
    const isBikeLightVisible = await cartPage.isItemVisible('Sauce Labs Bike Light');
    expect(isBackpackVisible).toBeTruthy();
    expect(isBikeLightVisible).toBeTruthy();
    await cartPage.proceedToCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Dou');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinue();
    const summaryTotal = await checkoutPage.getSummaryTotal();
    expect(summaryTotal).toBe('Total: $43.18');
    await checkoutPage.clickFinish();
    const completeOrderHeader = await checkoutPage.getCompleteOrderHeader();
    expect(completeOrderHeader).toBe('Thank you for your order!');
  });
});
