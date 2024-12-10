import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
  });

  test('Test Case 2: Verify Adding Item to Cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartBadge = await inventoryPage.getCartBadge();
    expect(cartBadge).toBe('1');
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe('1');
    const isItemVisible = await cartPage.isItemVisible('Sauce Labs Backpack');
    expect(isItemVisible).toBeTruthy();
  });

  test('Test Case 3: Verify Adding Multiple Items to Cart', async ({ page }) => {
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
  });

  test('Test Case 4: Verify Removing Item from Cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    let cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe('1');
    const isItemVisible = await cartPage.isItemVisible('Sauce Labs Backpack');
    expect(isItemVisible).toBeTruthy();
    await cartPage.removeItem('Sauce Labs Backpack');
    cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe('0');
    const cartBadgeVisible = await page.isVisible('.shopping_cart_badge');
    expect(cartBadgeVisible).toBeFalsy();
  });
});
