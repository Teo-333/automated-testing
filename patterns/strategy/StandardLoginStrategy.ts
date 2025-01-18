import { LoginStrategy } from './LoginStrategy'
import { Page } from '@playwright/test'

export class StandardLoginStrategy implements LoginStrategy {
  async login(page: Page, username: string, password: string): Promise<void> {
    await page.fill('#user-name', username)
    await page.fill('#password', password)
    await page.click('#login-button')
  }
}
