import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = 'h3[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return this.page.textContent(this.errorMessage);
  }

  async isUsernameInputVisible() {
    return this.page.isVisible(this.usernameInput);
  }

  async isPasswordInputVisible() {
    return this.page.isVisible(this.passwordInput);
  }

  async isLoginButtonVisible() {
    return this.page.isVisible(this.loginButton);
  }
}
