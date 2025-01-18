import { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private appLogo = '.app_logo';
  private cartBadge = '.shopping_cart_badge';
  private cartButton = '.shopping_cart_link';
  private menuButton = '#react-burger-menu-btn';
  private burgerMenu = '.bm-menu'; // Updated selector
  private logoutButton = '#logout_sidebar_link';

  constructor(page: Page) {
    this.page = page;
  }

  async getAppLogoText() {
    return this.page.textContent(this.appLogo);
  }

  async addItemToCart(itemName: string) {
    await this.page.click(`button[data-test="add-to-cart-${this.formatItemName(itemName)}"]`);
  }

  async getCartBadge() {
    return this.page.textContent(this.cartBadge);
  }

  async goToCart() {
    await this.page.click(this.cartButton);
  }

  async openMenu() {
    await this.page.click(this.menuButton);
    await this.page.waitForSelector(this.burgerMenu, { state: 'visible', timeout: 5000 }); // Wait for menu to be visible
  }

  async isBurgerMenuVisible() {
    return this.page.isVisible(this.burgerMenu);
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }

  private formatItemName(itemName: string) {
    return itemName.toLowerCase().replace(/ /g, '-');
  }
}
