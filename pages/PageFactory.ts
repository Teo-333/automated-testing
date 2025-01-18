import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { InventoryPage } from './InventoryPage'
import { CartPage } from './CartPage'
import { CheckoutPage } from './CheckoutPage'
import { BasePage } from './BasePage'

export class PageFactory {
  static get(pageType: string, page: Page): BasePage {
    if (pageType === 'login') return new LoginPage(page)
    if (pageType === 'inventory') return new InventoryPage(page)
    if (pageType === 'cart') return new CartPage(page)
    if (pageType === 'checkout') return new CheckoutPage(page)
    throw new Error('Unknown page type')
  }
}
