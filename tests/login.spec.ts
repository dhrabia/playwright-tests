import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { loginData } from '../test-data/loginData';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const login = loginData.userId;
    const password = loginData.userPassword;
    const expectedUsername = 'Jan Demobankowy';

    // Act
    // await loginPage.loginInput.fill(login);
    // await loginPage.passwordInput.fill(password);
    // await loginPage.loginButton.click();
    loginPage.login(login, password);

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.usernameText).toHaveText(expectedUsername)
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectLogin = 'test123';
    const password = loginData.userPassword;
    const expectedIncorrectLoginText = 'identyfikator ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(incorrectLogin);
    await loginPage.passwordInput.fill(password);

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedIncorrectLoginText);
    await expect(loginPage.loginButton).toBeDisabled;
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const login = loginData.userId;
    const incorrectPassword = 'qwertyu';
    const expectedIncorrectPasswordText = 'hasło ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(login);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedIncorrectPasswordText);
    await expect(loginPage.loginButton).toBeDisabled;
  });
});
