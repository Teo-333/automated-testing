import { Page } from '@playwright/test'

export interface LoginStrategy {
  login(page: Page, username: string, password: string): Promise<void>
}

