import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = '#continue';
  private summaryTotal = '.summary_total_label';
  private finishButton = '#finish';
  private completeOrderHeader = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  async enterFirstName(firstName: string) {
    await this.page.fill(this.firstNameInput, firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.fill(this.lastNameInput, lastName);
  }

  async enterPostalCode(postalCode: string) {
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async getSummaryTotal() {
    return this.page.textContent(this.summaryTotal);
  }

  async clickFinish() {
    await this.page.click(this.finishButton);
  }

  async getCompleteOrderHeader() {
    return this.page.textContent(this.completeOrderHeader);
  }
}
