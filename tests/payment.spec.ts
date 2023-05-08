import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
import { loginData } from '../test-data/loginData';

test.describe('Operations on pulpit', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const login = loginData.userId;
    const password = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page)
    await loginPage.login(login, password)

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '111';

    // Act
    paymentPage.payment(transferReceiver, transferAccount, transferAmount);

    await expect(paymentPage.messageText).toHaveText(`Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`)
  });
});