import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
    constructor(private page: Page) {
    }
    
    sideMenu = new SideMenuComponent(this.page);

    transferReceiver = this.page.getByTestId('transfer_receiver');
    transferAccount = this.page.getByTestId('form_account_to');
    transferAmount = this.page.getByTestId('form_amount');
    performTransfer = this.page.getByRole('button', { name: 'wykonaj przelew' });
    okButton = this.page.getByRole('button', { name: 'Ok' });

    messageText = this.page.getByTestId('message-text');

    async payment(transferReceiver: string, transferAccount: string, transferAmount: string): Promise<void> {
    await this.transferReceiver.fill(transferReceiver);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);
    await this.performTransfer.click();
    await this.okButton.click();
    }
}