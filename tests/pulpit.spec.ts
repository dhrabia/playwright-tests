import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { loginData } from '../test-data/loginData';

test.describe('Operations on pulpit', () => {
    let pulpitPage: PulpitPage;

    test.beforeEach(async ({ page }) => {
        const login = loginData.userId;
        const password = loginData.userPassword;

        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(login, password);
        pulpitPage = new PulpitPage(page);
    });

    test('successful cash transfer', async ({ page }) => {
        // Arrange
        const expectedUsername = 'Chuck Demobankowy';
        const receiverId = '2';
        const transferAmount = '150';
        const transferTitle = 'Zwrot srodkow';

        // Act
        pulpitPage.executeQuickPayment(receiverId, transferAmount, transferTitle);

        // Assert
        await expect(pulpitPage.messageText).toHaveText(`Przelew wykonany! ${expectedUsername} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('successful mobile top-up', async ({ page }) => {
        // Arrange
        const topupReceiver = '500 xxx xxx';
        const topupAmount = '20';

        // Act
        pulpitPage.executeMobileTopup(topupReceiver, topupAmount)

        // Assert
        await expect(pulpitPage.messageText).toHaveText(`Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`);
    });

    test('balance update after successful mobile top-up', async ({ page }) => {
        // Arrange
        const topupReceiver = '500 xxx xxx';
        const topupAmount = '20';
        const initialBalance = await pulpitPage.accountBalance.innerText();
        const expectedBalance = Number(initialBalance) - Number(topupAmount);

        // Act
        await pulpitPage.executeMobileTopup(topupReceiver, topupAmount);

        // Assert
        await expect(pulpitPage.accountBalance).toHaveText(`${expectedBalance}`);
    });
});