import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('User Login Tests', () => {
  test('Test Case 1: Verify User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryLogo = await page.textContent('.app_logo');
    expect(inventoryLogo).toBe('Swag Labs');
  });

  test('Test Case 7: Verify Non-Existing User Is not Able to Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user_123', 'secret_sauce_123');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });
});
