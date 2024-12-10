import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

export async function login(page: Page, username: string, password: string) {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(username, password);
  await inventoryPage.getAppLogoText();
}
