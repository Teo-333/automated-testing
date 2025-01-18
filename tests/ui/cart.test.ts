import { test, expect } from '@playwright/test'
import { Container } from '../../patterns/di/Container'
import { StandardLoginStrategy } from '../../patterns/strategy/StandardLoginStrategy'
import { UserBuilder } from '../../patterns/builder/UserBuilder'
import { PageFactory } from '../../pages/PageFactory'

test.describe('Cart Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    const container = new Container()
    container.register('loginStrategy', new StandardLoginStrategy())
    const loginStrategy = container.resolve<StandardLoginStrategy>('loginStrategy')
    const user = new UserBuilder()
      .withUsername('standard_user')
      .withPassword('secret_sauce')
      .build()
    const loginPage = PageFactory.get('login', page)
    await loginPage.navigate()
    await loginStrategy.login(page, user.username, user.password)
  })

  test('Test Case 2: Verify Adding Item to Cart', async ({ page }) => {
    const inventoryPage = PageFactory.get('inventory', page)
    await (inventoryPage as any).addItemToCart('Sauce Labs Backpack')
    const cartBadge = await (inventoryPage as any).getCartBadge()
    expect(cartBadge).toBe('1')
    await (inventoryPage as any).goToCart()
    const cartPage = PageFactory.get('cart', page)
    const cartItemsCount = await (cartPage as any).getCartItemsCount()
    expect(cartItemsCount).toBe('1')
    const isItemVisible = await (cartPage as any).isItemVisible('Sauce Labs Backpack')
    expect(isItemVisible).toBeTruthy()
  })

  test('Test Case 3: Verify Adding Multiple Items to Cart', async ({ page }) => {
    const inventoryPage = PageFactory.get('inventory', page)
    await (inventoryPage as any).addItemToCart('Sauce Labs Backpack')
    let cartBadge = await (inventoryPage as any).getCartBadge()
    expect(cartBadge).toBe('1')
    await (inventoryPage as any).addItemToCart('Sauce Labs Bike Light')
    cartBadge = await (inventoryPage as any).getCartBadge()
    expect(cartBadge).toBe('2')
    await (inventoryPage as any).goToCart()
    const cartPage = PageFactory.get('cart', page)
    const cartItemsCount = await (cartPage as any).getCartItemsCount()
    expect(cartItemsCount).toBe('2')
    const isBackpackVisible = await (cartPage as any).isItemVisible('Sauce Labs Backpack')
    const isBikeLightVisible = await (cartPage as any).isItemVisible('Sauce Labs Bike Light')
    expect(isBackpackVisible).toBeTruthy()
    expect(isBikeLightVisible).toBeTruthy()
  })

  test('Test Case 4: Verify Removing Item from Cart', async ({ page }) => {
    const inventoryPage = PageFactory.get('inventory', page)
    await (inventoryPage as any).addItemToCart('Sauce Labs Backpack')
    await (inventoryPage as any).goToCart()
    const cartPage = PageFactory.get('cart', page)
    let cartItemsCount = await (cartPage as any).getCartItemsCount()
    expect(cartItemsCount).toBe('1')
    const isItemVisible = await (cartPage as any).isItemVisible('Sauce Labs Backpack')
    expect(isItemVisible).toBeTruthy()
    await (cartPage as any).removeItem('Sauce Labs Backpack')
    cartItemsCount = await (cartPage as any).getCartItemsCount()
    expect(cartItemsCount).toBe('0')
    const cartBadgeVisible = await page.isVisible('.shopping_cart_badge')
    expect(cartBadgeVisible).toBeFalsy()
  })
})
