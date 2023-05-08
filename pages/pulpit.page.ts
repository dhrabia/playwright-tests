import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
    constructor(private page: Page) {
    }
    sideMenu = new SideMenuComponent(this.page);

    usernameText = this.page.getByTestId('user-name');
    transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    transferAmount = this.page.locator('#widget_1_transfer_amount');
    transferTitle = this.page.locator('#widget_1_transfer_title');
    performTransfer = this.page.getByRole('button', { name: 'wykonaj' });
    closeButton = this.page.getByTestId('close-button');

    topupReceiver = this.page.locator('#widget_1_topup_receiver');
    topupAmount = this.page.locator('#widget_1_topup_amount');
    topupAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');
    performTopup = this.page.getByRole('button', { name: 'doładuj telefon' });

    messageText = this.page.getByTestId('message-text');
    accountBalance = this.page.locator('#money_value');

    async executeQuickPayment(receiverId: string, transferAmount: string, transferTitle: string): Promise<void> {
        await this.transferReceiver.selectOption(receiverId);
        await this.transferAmount.fill(transferAmount);
        await this.transferTitle.fill(transferTitle);
        await this.performTransfer.click();
        await this.closeButton.click();
    }

    async executeMobileTopup(topupReceiver: string, topupAmount: string): Promise<void> {
        await this.topupReceiver.selectOption(topupReceiver);
        await this.topupAmount.fill(topupAmount);
        await this.topupAgreement.click();
        await this.performTopup.click();
        await this.closeButton.click();
    }
}