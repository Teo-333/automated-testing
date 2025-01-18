import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('User Logout Test', () => {
  test('Test Case 8: Verify User is able to logout', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.openMenu();
    const isBurgerMenuVisible = await inventoryPage.isBurgerMenuVisible();
    expect(isBurgerMenuVisible).toBeTruthy();
    await inventoryPage.logout();
    const loginPage = new LoginPage(page);
    const isUsernameVisible = await loginPage.isUsernameInputVisible();
    const isPasswordVisible = await loginPage.isPasswordInputVisible();
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isUsernameVisible).toBeTruthy();
    expect(isPasswordVisible).toBeTruthy();
    expect(isLoginButtonVisible).toBeTruthy();
  });
});
