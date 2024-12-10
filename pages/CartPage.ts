import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  private cartItems = '.cart_item';
  private checkoutButton = '#checkout';
  private removeButton = (itemName: string) => `button[data-test="remove-${this.formatItemName(itemName)}"]`;

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItemsCount() {
    return this.page.$$eval(this.cartItems, items => items.length.toString());
  }

  async isItemVisible(itemName: string) {
    return this.page.isVisible(`.inventory_item_name >> text=${itemName}`);
  }

  async removeItem(itemName: string) {
    await this.page.click(this.removeButton(itemName));
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  private formatItemName(itemName: string) {
    return itemName.toLowerCase().replace(/ /g, '-');
  }
}
