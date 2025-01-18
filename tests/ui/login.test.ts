import { test, expect } from '@playwright/test'
import { Container } from '../../patterns/di/Container'
import { StandardLoginStrategy } from '../../patterns/strategy/StandardLoginStrategy'
import { UserBuilder } from '../../patterns/builder/UserBuilder'
import { PageFactory } from '../../pages/PageFactory'

test.describe('User Login Tests', () => {
  test('Test Case 1: Verify User Login', async ({ page }) => {
    const container = new Container()
    container.register('loginStrategy', new StandardLoginStrategy())
    const loginStrategy = container.resolve<StandardLoginStrategy>('loginStrategy')
    const user = new UserBuilder()
      .withUsername('standard_user')
      .withPassword('secret_sauce')
      .build()
    const loginPage = PageFactory.get('login', page)
    await loginPage.navigate()
    await loginStrategy.login(page, user.username, user.password)
    const logoText = await page.textContent('.app_logo')
    expect(logoText).toBe('Swag Labs')
  })

  test('Test Case 7: Verify Non-Existing User Is not Able to Login', async ({ page }) => {
    const container = new Container()
    container.register('loginStrategy', new StandardLoginStrategy())
    const loginStrategy = container.resolve<StandardLoginStrategy>('loginStrategy')
    const user = new UserBuilder()
      .withUsername('standard_user_123')
      .withPassword('secret_sauce_123')
      .build()
    const loginPage = PageFactory.get('login', page)
    await loginPage.navigate()
    await loginStrategy.login(page, user.username, user.password)
    const errorMessage = await (loginPage as any).getErrorMessage()
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service')
  })
})
