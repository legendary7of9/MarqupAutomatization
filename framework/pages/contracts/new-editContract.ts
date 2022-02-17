import { Locator, Page } from '@playwright/test';


class NewEditContractPage {
    test: any;
    page: Page;
    expect: any;
    contractTitleField: Locator;
    contractDescriptionTitleField: Locator;
    saveAndGenerateLinkButton: Locator;
    saveButton: Locator;
    publishToggle: Locator;
    draftToggle: Locator;
    iIcon: Locator;
    previewContractButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.contractTitleField = page.locator('[formcontrolname="title"]');
        this.contractDescriptionTitleField = page.locator('[formcontrolname="description"]');
        this.saveAndGenerateLinkButton = page.locator('#contract-detail-save-and-generate');
        this.saveButton = page.locator('#contract-detail-save');
        this.publishToggle = page.locator('#contract-detail-status-publish-button');
        this.draftToggle = page.locator('#contract-detail-status-draft-button');
        this.iIcon = page.locator('#contract-detail-info');
        this.previewContractButton = page.locator('#contract-detail-preview-contract');
    }

    async contractTitleFieldFillRandom(text:string) {
        await this.contractTitleField.click();
        await this.contractTitleField.fill(text);
    }

    async contractDescriptionTitleFieldFillRandom(text:string) {
        await this.contractDescriptionTitleField.click();
        await this.contractDescriptionTitleField.fill(text);
    }

    async saveAndGenerateLinkButtonClick() {
        await this.saveAndGenerateLinkButton.click();
    }

    async saveButtonClick() {
        await this.saveButton.click();
    }

    async publishToggleClick() {
        await this.publishToggle.click();
    }

    async draftToggleClick() {
        await this.publishToggle.click();
    }

    async iIconFocus() {
        await this.iIcon.focus();
    }

    async previewContractButtonClick() {
        await this.previewContractButton.click();
    }
}


export {
    NewEditContractPage
}