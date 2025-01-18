import { test, expect } from '@playwright/test'
import { Container } from '../../patterns/di/Container'
import { StandardLoginStrategy } from '../../patterns/strategy/StandardLoginStrategy'
import { UserBuilder } from '../../patterns/builder/UserBuilder'
import { PageFactory } from '../../pages/PageFactory'
import { LoginPage } from '../../pages/LoginPage'

test.describe('User Logout Test', () => {
  test('Test Case 8: Verify User is able to logout', async ({ page }) => {
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
    const inventoryPage = PageFactory.get('inventory', page)
    await (inventoryPage as any).openMenu()
    const isBurgerMenuVisible = await (inventoryPage as any).isBurgerMenuVisible()
    expect(isBurgerMenuVisible).toBeTruthy()
    await (inventoryPage as any).logout()
    const newLoginPage = PageFactory.get('login', page) as LoginPage
    const isUsernameVisible = await (newLoginPage as any).isUsernameInputVisible()
    const isPasswordVisible = await (newLoginPage as any).isPasswordInputVisible()
    const isLoginButtonVisible = await (newLoginPage as any).isLoginButtonVisible()
    expect(isUsernameVisible).toBeTruthy()
    expect(isPasswordVisible).toBeTruthy()
    expect(isLoginButtonVisible).toBeTruthy()
  })
})
