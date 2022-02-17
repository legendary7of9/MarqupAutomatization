import { test , expect, chromium } from '@playwright/test'
import { Users } from '../../framework'
import { SignInPage } from '../../framework'
import { DealsPage } from '../../framework'
import { NewEditDealPage } from '../../framework'
import { DealAnalysisPage } from '../../framework'
import { Helpers } from '../../lib/helpers/randomCharactersAndDigits.preload'

test.beforeEach(async ({ page }) => {
    const users = new Users(page);
    const signIn = new SignInPage(page);
    await page.goto('');
    await users.AA();
    await signIn.signInButton();
    await page.waitForURL('/dashboard');
}); 

test('dealName @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const title = page.locator('.section__title');
    console.log('dealAnalysis Deal Name');
    await page.goto('/deals/analysis-deal/8250');
    await expect(title).toHaveText(' test100test100DealDoNotRemove -  Client 1HT(test) -  test 20%');
    console.log(title);
    })

test('completionStatus @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const status = page.locator('.progress-wr');
    const persent = page.locator('.percent');
    console.log('dealAnalysis Completion Status');
    await page.goto('/deals/analysis-deal/8250');
    await expect(status).toBeVisible();
    await expect(persent).toHaveText('20%');
    })
    
    //to be refactored
test('dealStatus @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const archivedModelDealMessage = page.locator('.status-message.ng-star-inserted');
    const editingDisabled = page.locator('#btn-final-draft-finish');
    console.log('dealAnalysis Deal Status');
    await page.goto('/deals/analysis-deal/8281');
    await expect(archivedModelDealMessage).toBeVisible();
    await expect(archivedModelDealMessage).toHaveText('The model is no longer available. Please create a deal using an existing model');
    await expect(editingDisabled).toHaveAttribute('disabled', '');
    })
    
test('editPancilButton @regChecklistNewHigh @dealAnalysis', async ({ page }) => {
    const dealAnalysis = new DealAnalysisPage(page);
    console.log('dealAnalysis Edit Pancil Button');
    await page.goto('/deals/analysis-deal/8250');
    await dealAnalysis.editDealPancilClick();
    await expect(page).toHaveURL('deals/edit-deal/8250');
    })

test('linkedDealOpeningLinkedDeal @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const linkedDeal = page.locator('#deal-analysis-linked-deal');
    console.log('dealAnalysis Linked Deal Opening Linked Deal');
    await page.goto('/deals/analysis-deal/8250');
    await expect(linkedDeal).toBeHidden();
    await page.goto('/deals/analysis-deal/8274');
    await expect(linkedDeal).toBeVisible();
    await expect(linkedDeal).toHaveText('Is linked to BB test (Score: 48%)');
    await dealAnalysis.linkedDealLinkClick();
    await expect(page).toHaveURL('/deals/analysis-deal/435');
    })

test('exportButton @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    console.log('dealAnalysis Export Button');
    await page.goto('/deals/analysis-deal/8250');
    const [ download ] = await Promise.all([
        page.waitForEvent('download'),
        dealAnalysis.exportButtonClick(),
    ]);
    await download.delete()
    })

test('avaliableDisableSummaryButton @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const summaryButton = page.locator('#deal-analysis-summary');
    console.log('dealAnalysis Avaliable Disable Summary Button');
    await page.goto('/deals/analysis-deal/8346');
    await expect(summaryButton).toBeHidden();
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(summaryButton).toBeVisible();
    await expect(summaryButton).toHaveAttribute('disabled', '');
    await dealAnalysis.finalDraftDropDownChoose();
    await expect(summaryButton).toBeVisible();
    await expect(summaryButton).toHaveAttribute('disabled', '');
    await dealAnalysis.finalDraftFinishButtonClick();
    await expect(page).toHaveURL('/deals/summary-report/8346');
    await page.goto('/deals/analysis-deal/8346');
    await expect(summaryButton).toBeVisible();
    await dealAnalysis.finalDraftReopenButtonClick();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('summaryButtonValidation @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    console.log('dealAnalysis Summary Button Validation');
    await page.goto('/deals/analysis-deal/8251');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.finalDraftFinishButtonClick();
    await page.goto('/deals/analysis-deal/8251');
    await page.waitForSelector('#deal-analysis-summary');
    await dealAnalysis.summaryButtonClick();
    await expect(page).toHaveURL('/deals/summary-report/8251');
    await page.goto('/deals/analysis-deal/8251');
    await page.waitForSelector('.mat-column-first_draft >> nth=1');
    await dealAnalysis.finalDraftReopenButtonClick();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('notesIinternalField @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const notesInternalField = page.locator('.mat-card');
    console.log('dealAnalysis Notes Iinternal Field');
    await page.goto('/deals/analysis-deal/8250');
    await expect(notesInternalField).toBeVisible();
    await expect(notesInternalField).toHaveText('test');
    await page.goto('/deals/analysis-deal/458');
    await expect(notesInternalField).toBeHidden();
    })

test('termQuestionColumns @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const termColumn = page.locator('.mat-column-term >> nth=0');
    const termColumnRow0 = page.locator('.mat-column-term >> nth=1');
    const termColumnRow1 = page.locator('.mat-column-term >> nth=2');
    const termColumnRow2 = page.locator('.mat-column-term >> nth=3');
    const questionColumnRow0 = page.locator('.mat-column-question >> nth=1');
    const questionColumnRow1 = page.locator('.mat-column-question >> nth=2');
    const questionColumnRow2 = page.locator('.mat-column-question >> nth=3');
    console.log('dealAnalysis Term Question Columns');
    await page.goto('/deals/analysis-deal/8250');
    await expect(termColumn).toHaveAttribute('role', 'columnheader');
    await expect(termColumnRow0).toHaveText('test100test100Term1Do...');
    await expect(termColumnRow1).toHaveText('test100test100Term2Do...');
    await expect(termColumnRow2).toHaveText('test100test100Term3Do...');
    await expect(questionColumnRow0).toHaveText('test1');
    await expect(questionColumnRow1).toHaveText('test1test1');
    await expect(questionColumnRow2).toHaveText('test1test1test1');
    })

test('firstDraftAnswersDropDown @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const deal = new DealsPage(page);
    const copyDeal = new NewEditDealPage(page);
    const dealAnalysis = new DealAnalysisPage(page);
    const firstDraftColumnRole = page.locator('.mat-column-first_draft .mat-select >> nth=1');
    const firstDraftScore = page.locator('.mat-column-first_draft.mat-table-sticky');
    const firstDraftField1 = page.locator('.mat-column-first_draft >> nth=1');
    const firstDraftField2 = page.locator('.mat-column-first_draft >> nth=2');
    const firstDraftField3 = page.locator('.mat-column-first_draft >> nth=3');
    console.log('dealAnalysis First Draft Answers Drop Down');
    await page.goto('/deals/analysis-deal/8347');
    await expect(firstDraftColumnRole).toHaveAttribute('role', 'listbox');
    await page.click('.mat-column-first_draft >> nth=1');
    await page.click('.mat-option >> text=test5');
    await page.waitForTimeout(500);
    await expect(firstDraftScore).toHaveText('-171%');
    await page.click('.mat-column-first_draft >> nth=1');
    await page.click('.mat-option >> text=test3');
    await page.waitForTimeout(500);
    await expect(firstDraftScore).toHaveText('-102%');
    await page.click('.mat-column-first_draft >> nth=1');
    await page.click('.mat-option >> text=test6');
    await page.waitForTimeout(500);
    await expect(firstDraftScore).toHaveText('0%');
    await page.click('.mat-column-first_draft >> nth=1');
    await page.click('.mat-option >> text=test2');
    await page.waitForTimeout(500);
    await expect(firstDraftScore).toHaveText('85%');
    await page.click('.mat-column-first_draft >> nth=1');
    await page.click('.mat-option >> text=test4');
    await page.waitForTimeout(500);
    await expect(firstDraftScore).toHaveText('120%');
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.goto('/deals?&sort=contract_name');
    await deal.statusFilterClick();
    await deal.threeDotsMenuSaveAsNewButtonClick();
    await copyDeal.createButtonClick();
    await page.waitForSelector('.mat-column-first_draft >> nth=1');
    await expect(firstDraftField1).toHaveText('AA2');
    await expect(firstDraftField2).toHaveText('BB answer 1');
    await expect(firstDraftField3).toHaveText('AA NAswer 3');
    })

test('firstDraftAnswersModelWasEdited @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page); 
    const reopenFirstDraftButton = page.locator('#btn-first-draft-reopen');
    const finishFirstDraftButton = page.locator('#btn-first-draft-finish');
    const editedTerm = page.locator('.mat-column-term.ng-star-inserted >> nth=2');
    const newDeletedTerm = page.locator('.mat-column-question >> text=test3');
    console.log('dealAnalysis First Draft Answers Model Was Edited');
    await page.goto('/models/edit-model/1542');
    await page.locator('[formcontrolname="name"]').fill('DoNotRemoveTestModelTest');
    await page.click('#model-details-save-changes');
    await page.waitForTimeout(1000);
    await page.goto('/deals/analysis-deal/8280');
    await page.waitForTimeout(1000);
    await expect(reopenFirstDraftButton).toBeHidden();
    await expect(finishFirstDraftButton).toBeVisible();
    await page.waitForTimeout(1000);
    await page.goto('/models/edit-model/1542');
    await page.waitForTimeout(1000);
    await page.locator('[formcontrolname="name"]').fill('DoNotRemoveTestModel');
    await page.click('#model-details-save-changes');
    await page.waitForTimeout(1000);
    await page.goto('/deals/analysis-deal/8280');
    await page.waitForTimeout(1000);
    await dealAnalysis.firstDraftFinishButtonClick();
    await page.goto('/models/1542/terms/edit-term/1850');
    await page.waitForTimeout(1000);
    await page.locator('[formcontrolname="term"]').fill('test2test2');
    await page.click('#term-detail-save');
    await page.waitForTimeout(1000);
    await page.goto('/deals/analysis-deal/8280');
    await page.waitForTimeout(1000);
    await expect(editedTerm).toHaveText('test2test2');
    await page.goto('/models/1542/terms/edit-term/1850');
    await page.waitForTimeout(1000);
    await page.locator('[formcontrolname="term"]').fill('test2');
    await page.click('#term-detail-save')
    await page.waitForTimeout(1000);
    await page.goto('/deals/analysis-deal/8280');
    await page.waitForTimeout(1000);
    await dealAnalysis.firstDraftFinishButtonClick();
    await page.goto('/models/1542/terms/add-term');
    await page.waitForTimeout(1000);
    await page.locator('[formcontrolname="term"]').fill(Helpers.generateRandomString());
    await page.locator('#form-control-weight-manual input').fill('73');
    await page.locator('[formcontrolname="description"]').fill('test');
    await page.locator('[formcontrolname="question"]').fill('test3');
    await page.locator('[formcontrolname="answer"]').fill('test3');
    await page.locator('#form-control-answer-weight-manual-0 input').fill('-2');
    await page.click('#term-detail-save');
    await page.waitForTimeout(1000);
    await page.goto('/deals/analysis-deal/8280');
    await page.waitForTimeout(1000);
    await expect(newDeletedTerm).toBeVisible();
    await page.goto('/models/1542/terms?&sort=term');
    await page.waitForTimeout(1000);
    await page.click('.action-btn >> nth=0');
    await page.click('.action-archive');
    await page.click('#confirm-active-archive');
    await page.waitForTimeout(1000);
    await page.goto('/deals/analysis-deal/8280');
    await page.waitForTimeout(1000);
    await expect(newDeletedTerm).toBeHidden();
    await dealAnalysis.firstDraftFinishButtonClick();
    })
    
test('clearAllLinkFirstFinalDraft @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const clearALlPopup = page.locator('.mat-dialog-container');
    const clearALlPopupText = page.locator('.modal-header');
    const finalDraftField1 = page.locator('.mat-column-final_draft >> nth=1');
    const finalDraftField2 = page.locator('.mat-column-final_draft >> nth=2');
    const finalDraftField3 = page.locator('.mat-column-final_draft >> nth=3');
    const firstDraftField1 = page.locator('.mat-column-first_draft >> nth=1');
    const firstDraftField2 = page.locator('.mat-column-first_draft >> nth=2');
    const firstDraftField3 = page.locator('.mat-column-first_draft >> nth=3');
    console.log('dealAnalysis Clear All Link First Final Draft');
    await page.goto('/deals/analysis-deal/8350');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await expect(clearALlPopup).toBeVisible();
    await expect(clearALlPopupText).toHaveText('Are you sure you want to clear all answers?');
    await dealAnalysis.clearAllPopupClearButtonClick();
    await expect(finalDraftField1).toHaveText('');
    await expect(finalDraftField2).toHaveText('');
    await expect(finalDraftField3).toHaveText('');
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await expect(clearALlPopup).toBeVisible();
    await expect(clearALlPopupText).toHaveText('Are you sure you want to clear all answers?');
    await dealAnalysis.clearAllPopupClearButtonClick();
    await expect(firstDraftField1).toHaveText('');
    await expect(firstDraftField2).toHaveText('');
    await expect(firstDraftField3).toHaveText('');
    })

test('finalDraftAnswersDropDown @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const deal = new DealsPage(page);
    const copyDeal = new NewEditDealPage(page);
    const finalDraftField1 = page.locator('.mat-column-final_draft >> nth=1');
    const finalDraftField2 = page.locator('.mat-column-final_draft >> nth=2');
    const finalDraftField3 = page.locator('.mat-column-final_draft >> nth=3');
    const firstDraftField1 = page.locator('.mat-column-first_draft >> nth=1');
    const firstDraftField2 = page.locator('.mat-column-first_draft >> nth=2');
    const firstDraftField3 = page.locator('.mat-column-first_draft >> nth=3');
    const finalDraftScore = page.locator('.mat-column-final_draft.mat-table-sticky');
    console.log('dealAnalysis Final Draft Answers Drop Down');
    await page.goto('/deals/analysis-deal/8351');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(finalDraftField1).toHaveText('test3');
    await expect(finalDraftField2).toHaveText('test5test5');
    await expect(finalDraftField3).toHaveText('test2test2test2');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.click('.mat-column-final_draft >> nth=1');
    await page.click('.mat-option >> text=test5');
    await page.waitForTimeout(500);
    await expect(finalDraftScore).toHaveText('-171%');
    await page.click('.mat-column-final_draft >> nth=1');
    await page.click('.mat-option >> text=test3');
    await page.waitForTimeout(500);
    await expect(finalDraftScore).toHaveText('-102%');
    await page.click('.mat-column-final_draft >> nth=1');
    await page.click('.mat-option >> text=test6');
    await page.waitForTimeout(500);
    await expect(finalDraftScore).toHaveText('0%');
    await page.click('.mat-column-final_draft >> nth=1');
    await page.click('.mat-option >> text=test2');
    await page.waitForTimeout(500);
    await expect(finalDraftScore).toHaveText('85%');
    await page.click('.mat-column-final_draft >> nth=1');
    await page.click('.mat-option >> text=test4');
    await page.waitForTimeout(500);
    await expect(finalDraftScore).toHaveText('120%');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.goto('/deals?&sort=contract_name');
    await deal.statusFilterClick();
    await deal.threeDotsMenuSaveAsNewButtonClick();
    await copyDeal.createButtonClick();
    await page.waitForSelector('.mat-column-first_draft >> nth=1');
    await expect(firstDraftField1).toHaveText('AA2');
    await expect(firstDraftField2).toHaveText('BB answer 1');
    await expect(firstDraftField3).toHaveText('AA NAswer 3');
    })

test('behaviorAnswerFirstFinalDraft @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const firstDraftScore = page.locator('.mat-column-first_draft.mat-table-sticky');
    const firstDraftScoreColor = page.locator('.mat-column-first_draft.mat-table-sticky .ng-star-inserted');
    const firstDraftAnswerColor = page.locator('.mat-form-field-underline >> nth=0');
    const firstDraftAnswerText = page.locator('.mat-column-first_draft >> nth=1');
    const finalDraftScore = page.locator('.mat-column-final_draft.mat-table-sticky');
    const finalDraftScoreColor = page.locator('.mat-column-final_draft.mat-table-sticky .ng-star-inserted');
    const finalDraftAnswerColor = page.locator('.mat-form-field-underline >> nth=0');
    const finalDraftAnswerText = page.locator('.mat-column-final_draft >> nth=1');
    console.log('dealAnalysis Behavior Answer First Final Draft');
    await page.goto('/deals/analysis-deal/8355');
    await page.locator('.mat-column-first_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test5').click();
    await expect(firstDraftAnswerColor).toHaveCSS('background-color', 'rgb(255, 83, 132)');
    await expect(firstDraftScore).toHaveText('-171%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-first_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test3').click();
    await expect(firstDraftAnswerColor).toHaveCSS('background-color', 'rgb(255, 163, 94)');
    await expect(firstDraftScore).toHaveText('-102%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-first_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test2').click();
    await expect(firstDraftAnswerColor).toHaveCSS('background-color', 'rgb(12, 198, 134)');
    await expect(firstDraftScore).toHaveText('85%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-first_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test4').click();
    await expect(firstDraftAnswerColor).toHaveCSS('background-color', 'rgb(24, 146, 104)');
    await expect(firstDraftScore).toHaveText('120%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await page.reload();
    await expect(firstDraftAnswerText).toHaveText('test4');
    await expect(firstDraftAnswerColor).toHaveCSS('background-color', 'rgb(24, 146, 104)');
    await expect(firstDraftScore).toHaveText('120%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-final_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test5').click();
    await expect(finalDraftAnswerColor).toHaveCSS('background-color', 'rgb(255, 83, 132)');
    await expect(finalDraftScore).toHaveText('-171%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-final_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test3').click();
    await expect(finalDraftAnswerColor).toHaveCSS('background-color', 'rgb(255, 163, 94)');
    await expect(finalDraftScore).toHaveText('-102%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-final_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test2').click();
    await expect(finalDraftAnswerColor).toHaveCSS('background-color', 'rgb(12, 198, 134)');
    await expect(finalDraftScore).toHaveText('85%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.locator('.mat-column-final_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test4').click();
    await expect(finalDraftAnswerColor).toHaveCSS('background-color', 'rgb(24, 146, 104)');
    await expect(finalDraftScore).toHaveText('120%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)')
    await page.reload();
    await expect(finalDraftAnswerText).toHaveText('test4');
    await expect(finalDraftAnswerColor).toHaveCSS('background-color', 'rgb(24, 146, 104)');
    await expect(finalDraftScore).toHaveText('120%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })
    
test('finishReopen1stDraftAnsewersColumn @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const finishButton1stDraft = page.locator('#btn-first-draft-finish');
    const firstDraftDisabledEnabled0 = page.locator('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=0');
    const firstDraftDisabledEnabled1 = page.locator('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=1');
    const firstDraftDisabledEnabled2 = page.locator('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=2');
    const finalDraftDisabledEnabled0 = page.locator('.mat-column-final_draft .mat-select-arrow-wrapper >> nth=0');
    const finalDraftDisabledEnabled1 = page.locator('.mat-column-final_draft .mat-select-arrow-wrapper >> nth=1');
    const finalDraftDisabledEnabled2 = page.locator('.mat-column-final_draft .mat-select-arrow-wrapper >> nth=2');
    const finalDraftValue1 = page.locator('.mat-column-final_draft >> nth=1');
    const finalDraftValue2 = page.locator('.mat-column-final_draft >> nth=2');
    const finalDraftValue3 = page.locator('.mat-column-final_draft >> nth=3');
    const reopenButton1stDraft = page.locator('#btn-first-draft-reopen');
    console.log('dealAnalysis Finish Reopen1st Draft Ansewers Column');
    await page.goto('/deals/analysis-deal/8356');
    await expect(finishButton1stDraft).toHaveAttribute('disabled', '');
    await page.locator('.mat-column-first_draft >> nth=1').click();
    await page.locator('.mat-option >> text=test5').click();
    await page.waitForTimeout(1000);
    await expect(finishButton1stDraft).toHaveAttribute('disabled', '');
    await page.locator('.mat-column-first_draft >> nth=2').click();
    await page.locator('.mat-option >> text=test2test2').click();
    await page.waitForTimeout(1000);
    await expect(finishButton1stDraft).toHaveAttribute('disabled', '');
    await page.locator('.mat-column-first_draft >> nth=3').click();
    await page.locator('.mat-option >> text=test3test3test3').click();
    await page.waitForTimeout(1000);
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(firstDraftDisabledEnabled0).toBeHidden();
    await expect(firstDraftDisabledEnabled1).toBeHidden();
    await expect(firstDraftDisabledEnabled2).toBeHidden();
    await expect(reopenButton1stDraft).toBeVisible();
    await expect(finalDraftDisabledEnabled0).toBeVisible();
    await expect(finalDraftDisabledEnabled1).toBeVisible();
    await expect(finalDraftDisabledEnabled2).toBeVisible();
    await expect(finalDraftValue1).toHaveText('test5');
    await expect(finalDraftValue2).toHaveText('test2test2');
    await expect(finalDraftValue3).toHaveText('test3test3test3');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await expect(firstDraftDisabledEnabled0).toBeVisible();
    await expect(firstDraftDisabledEnabled1).toBeVisible();
    await expect(firstDraftDisabledEnabled2).toBeVisible();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('errorMessageForSignatureEffectiveExpirationDate @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const errorMessage = page.locator('.no-valid-dates-message');
    console.log('dealAnalysis Error Message For Signature Effective Expiration Date');
    await page.goto('/deals/analysis-deal/8357');
    await expect(errorMessage).toBeHidden();
    await dealAnalysis.firstDraftDropDownChoose();
    await expect(errorMessage).toBeHidden();
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(errorMessage).toBeHidden();
    await dealAnalysis.signatureEditIconClick();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('To finish the deal please set and confirm Signature Date, Effective Date, and Expiration Date.');
    await dealAnalysis.signatureOkIconClick();
    await expect(errorMessage).toBeHidden();
    await dealAnalysis.effectiveEditIconClick();
    await expect(errorMessage).toBeVisible();
    await dealAnalysis.effectiveOkIconClick();
    await expect(errorMessage).toBeHidden();
    await dealAnalysis.expirationEditIconClick();
    await expect(errorMessage).toBeVisible();
    await dealAnalysis.expirationOkIconClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupCancelButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupCancelButtonClick();
    })

test('twoUsersClickReopenFinishClosePopupFirstFinalDrafts @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const newPage = await context.newPage();
    const dealAnalysis = new DealAnalysisPage(page);
    const popup = newPage.locator('.mat-dialog-container');
    const popupText = newPage.locator('.modal-header');
    const finishButtonFirstDraft = newPage.locator('#btn-first-draft-finish');
    const reopenButtonFirstDraft = newPage.locator('#btn-first-draft-reopen');
    const reopenButtonFinalDraft = newPage.locator('#btn-final-draft-reopen');
    const finishButtonFinalDraft = newPage.locator('#btn-final-draft-finish');
    console.log('dealAnalysis Two Users Click Reopen Finish Close Popup First Final Drafts');
    await page.goto('/deals/analysis-deal/8358');
    await newPage.goto('https://marqup.test.noredlines.com/')
    await newPage.fill('[formcontrolname="email"]', 'iryna.nema+8423@mobindustry.net')
    await newPage.fill('[formcontrolname="password"]', 'Zaq123456!')
    await newPage.click('#login-sign-in')
    await newPage.waitForURL('/clients/265');
    await newPage.goto('https://marqup.test.noredlines.com/deals/analysis-deal/8358');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await newPage.reload();
    await dealAnalysis.firstDraftReopenButtonClick();
    await newPage.click('#btn-first-draft-reopen');
    await expect(popup).toBeVisible();
    await expect(popupText).toHaveText('This deal is currently being edited by AA Client HT. Please refresh your page to see the latest changes. Your changes may not be saved until at this time.');
    await newPage.click('.mat-dialog-container .mat-button');
    await expect(finishButtonFirstDraft).toBeVisible();
    await dealAnalysis.firstDraftFinishButtonClick();
    await newPage.click('#btn-first-draft-finish');
    await expect(popup).toBeVisible();
    await expect(popupText).toHaveText('This deal is currently being edited by AA Client HT. Please refresh your page to see the latest changes. Your changes may not be saved until at this time.');
    await newPage.click('.mat-dialog-container .mat-button');
    await expect(reopenButtonFirstDraft).toBeVisible();
    await dealAnalysis.finalDraftFinishButtonClick();
    await newPage.click('#btn-final-draft-finish');
    await expect(popup).toBeVisible();
    await expect(popupText).toHaveText('This deal is currently being edited by AA Client HT. Please refresh your page to see the latest changes. Your changes may not be saved until at this time.');
    await newPage.click('.mat-dialog-container .mat-button');
    await expect(reopenButtonFinalDraft).toBeVisible();
    await page.goto('/deals/analysis-deal/8358')
    await dealAnalysis.finalDraftReopenButtonClick();
    await newPage.click('#btn-final-draft-reopen');
    await expect(popup).toBeVisible();
    await expect(popupText).toHaveText('This deal is currently being edited by AA Client HT. Please refresh your page to see the latest changes. Your changes may not be saved until at this time.');
    await newPage.click('.mat-dialog-container .mat-button');
    await expect(finishButtonFinalDraft).toBeVisible();
    await expect(finishButtonFinalDraft).toHaveAttribute('disabled', '')
    await expect(finishButtonFirstDraft).toBeVisible();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('completeDealFinishedWhenTheModelWasEdited @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const firstDraftField1 = page.locator('.mat-column-first_draft >> nth=1');
    const firstDraftField2 = page.locator('.mat-column-first_draft >> nth=2');
    const firstDraftField3 = page.locator('.mat-column-first_draft >> nth=3');
    const finalDraftField1 = page.locator('.mat-column-final_draft >> nth=1');
    const finalDraftField2 = page.locator('.mat-column-final_draft >> nth=2');
    const finalDraftField3 = page.locator('.mat-column-final_draft >> nth=3');
    const firstDraftScore = page.locator('.mat-column-first_draft.mat-table-sticky');
    const finalDraftScore = page.locator('.mat-column-final_draft.mat-table-sticky');
    console.log('dealAnalysis Complete Deal Finished When The Model Was Edited');
    await page.goto('/deals/analysis-deal/8251');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.finalDraftFinishButtonClick();
    await page.goto('/deals/analysis-deal/8251');
    await expect(firstDraftField1).toHaveText('test3');
    await expect(firstDraftField2).toHaveText('test5test5');
    await expect(firstDraftField3).toHaveText('test2test2test2');
    await expect(finalDraftField1).toHaveText('test3');
    await expect(finalDraftField2).toHaveText('test5test5');
    await expect(finalDraftField3).toHaveText('test2test2test2');
    await expect(firstDraftScore).toHaveText('-187%');
    await expect(finalDraftScore).toHaveText('-187%');
    await dealAnalysis.finalDraftReopenButtonClick();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftDropDownChoose2();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.finalDraftFinishButtonClick();
    await page.goto('/deals/analysis-deal/8251');
    await expect(firstDraftField1).toHaveText('test5');
    await expect(firstDraftField2).toHaveText('test3test3');
    await expect(firstDraftField3).toHaveText('test6test6test6');
    await expect(finalDraftField1).toHaveText('test5');
    await expect(finalDraftField2).toHaveText('test3test3');
    await expect(finalDraftField3).toHaveText('test6test6test6');
    await expect(firstDraftScore).toHaveText('-7%');
    await expect(finalDraftScore).toHaveText('-7%');
    await dealAnalysis.finalDraftReopenButtonClick();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('finishReopenButtonFinalDraft @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const finalDraftFinishButtonDisabled = page.locator('#btn-final-draft-finish');
    const firstDraftReopenButtonDisabled = page.locator('#btn-first-draft-reopen');
    const firstDraftDisabledEnabled0 = page.locator('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=0');
    const firstDraftDisabledEnabled1 = page.locator('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=1');
    const firstDraftDisabledEnabled2 = page.locator('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=2');
    const finalDraftDisabledEnabled0 = page.locator('.mat-column-final_draft .mat-select-arrow-wrapper >> nth=0');
    const finalDraftDisabledEnabled1 = page.locator('.mat-column-final_draft .mat-select-arrow-wrapper >> nth=1');
    const finalDraftDisabledEnabled2 = page.locator('.mat-column-final_draft .mat-select-arrow-wrapper >> nth=2');
    console.log('dealAnalysis Finish Reopen Button Final Draft');
    await page.goto('/deals/analysis-deal/8359');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await expect(finalDraftFinishButtonDisabled).toHaveAttribute('disabled', '')
    await dealAnalysis.finalDraftDropDownChoose2();
    await dealAnalysis.finalDraftFinishButtonClick();
    await expect(page).toHaveURL('/deals/summary-report/8359');
    await page.goto('/deals/analysis-deal/8359');
    await expect(firstDraftReopenButtonDisabled).toHaveAttribute('disabled', '')
    await expect(finalDraftDisabledEnabled0).toBeHidden();
    await expect(finalDraftDisabledEnabled1).toBeHidden();
    await expect(finalDraftDisabledEnabled2).toBeHidden();
    await dealAnalysis.finalDraftReopenButtonClick();
    await expect(firstDraftDisabledEnabled0).toBeVisible();
    await expect(firstDraftDisabledEnabled1).toBeVisible();
    await expect(firstDraftDisabledEnabled2).toBeVisible();
    await expect(finalDraftFinishButtonDisabled).toHaveAttribute('disabled', '')
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('sectionRefNoteColumn @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const noteField = page.locator('.mat-column-note textarea >> nth=0')
    console.log('dealAnalysis Section Ref Note Column');
    await page.goto('/deals/analysis-deal/8250');
    await expect(noteField).toHaveAttribute('matautosizemaxrows', '10');
    await expect(noteField).toHaveAttribute('matautosizeminrows', '1');
    await expect(noteField).toHaveAttribute('mattextareaautosize', '');
    await expect(noteField).toHaveAttribute('maxlength', '1000');
    })

test('sectionRefNoteColumnIncludesToExport @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    console.log('dealAnalysis Section Ref Note Column Includes To Export');
    await page.goto('/deals/analysis-deal/8252');
    const [ download ] = await Promise.all([
        page.waitForEvent('download'),
        dealAnalysis.exportButtonClick(),
    ]);
    await download.path();
    const downloadUrl = await download.url();
    await page.goto(downloadUrl);
    await expect(page.locator('pre')).toHaveText('Contract name,Name of the other party, My company (Subsidiary),Model,Terms,Model answers,Estimated value,First draft answer,Final draft answer,Samples,Total,Status,Created by,Edited by "test100test100DealDoNotRemove3","test","Client 1HT(test)","test100test100DoNotRemove16","test100test100Term1DoNotRemove16","test2","2222222","test3","test3","","20, 20","50","AA Client HT","AA Client HT" "test100test100DealDoNotRemove3","test","Client 1HT(test)","test100test100DoNotRemove16","test100test100Term2DoNotRemove16","test2test2","2222222","test3test3","test3test3","","20, 20","50","AA Client HT","AA Client HT" "test100test100DealDoNotRemove3","test","Client 1HT(test)","test100test100DoNotRemove16","test100test100Term3DoNotRemove16","test2test2test2","2222222","test4test4test4","test4test4test4","","20, 20","50","AA Client HT","AA Client HT"');
    await download.delete()
    })
    
test('sampleColumn @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const view0 = page.locator('.deal-analysis-sample-view >> nth=0')
    const view1 = page.locator('.deal-analysis-sample-view >> nth=1')
    const view2 = page.locator('.deal-analysis-sample-view >> nth=2')
    console.log('dealAnalysis Sample Column');
    await page.goto('/deals/analysis-deal/8250');
    await page.waitForSelector('.mat-column-first_draft >> nth=1');
    await expect(view0).toHaveClass('link-name deal-analysis-sample-view disabled');
    await expect(view1).toHaveClass('link-name deal-analysis-sample-view disabled');
    await expect(view2).toHaveClass('link-name deal-analysis-sample-view disabled');
    await page.goto('/deals/analysis-deal/458');
    await page.waitForSelector('.mat-column-first_draft >> nth=1');
    await expect(view0).toHaveClass('link-name deal-analysis-sample-view');
    await expect(view1).toHaveClass('link-name deal-analysis-sample-view');
    await expect(view2).toHaveClass('link-name deal-analysis-sample-view');
    })

test('viewHyperlink @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const viewLinkPopup = page.locator('.mat-dialog-container');
    const sample0 = page.locator('.sample >> nth=0');
    const sample1 = page.locator('.sample >> nth=1');
    const sample0EditButton = page.locator('.sample-buttons .btn-action--edit >> nth=0');
    const sample1EditButton = page.locator('.sample-buttons .btn-action--edit >> nth=1');
    const sample0CopyButton = page.locator('.sample-buttons .btn-action--copy >> nth=0');
    const sample1CopyButton = page.locator('.sample-buttons .btn-action--copy >> nth=1');
    const copied = page.locator('.mat-tooltip-panel >> text=Sample is copied');
    const saveButton = page.locator('.sample-buttons .btn-action--save >> nth=0');
    const sampleField = page.locator('[formcontrolname="sample"]');
    const sampleValue = page.locator('.sample-preview >> nth=0');
    console.log('dealAnalysis View Hyperlink');
    await page.goto('/deals/analysis-deal/458');
    await dealAnalysis.viewLinkClick();
    await expect(viewLinkPopup).toBeVisible();
    await expect(sample0).toBeVisible();
    await expect(sample1).toBeVisible();
    await expect(sample0EditButton).toBeVisible();
    await expect(sample1EditButton).toBeVisible();
    await expect(sample0CopyButton).toBeVisible();
    await expect(sample1CopyButton).toBeVisible();
    await dealAnalysis.viewLinkPopupCopyFieldButtonClick();
    await expect(copied).toBeVisible();
    await dealAnalysis.viewLinkPopupEditFieldButtonClick();
    await expect(saveButton).toBeVisible();
    await expect(sampleField).toBeVisible();
    await expect(sampleField).toHaveAttribute('matautosizemaxrows','5');
    await expect(sampleField).toHaveAttribute('matautosizeminrows','1');
    await expect(sampleField).toHaveAttribute('mattextareaautosize','');
    await expect(sampleField).toHaveAttribute('matinput','');
    await expect(sampleField).toHaveAttribute('maxlength','2000');
    await expect(sampleField).toHaveAttribute('placeholder','Sample');
    await dealAnalysis.viewLinkPopupFieldFill();
    await expect(sampleField).toHaveValue('Sample 1 est test test test test test est test test test test test est test test test test test est test test test test test v')
    await dealAnalysis.viewLinkPopupCloseButtonClick();
    await page.waitForTimeout(1000);
    await dealAnalysis.viewLinkClick();
    await expect(sampleValue).toHaveText('Sample 1 est test test test test test est test test test test test est test test test test test est test test test test test v')
    await dealAnalysis.viewLinkPopupEditFieldButtonClick();
    await dealAnalysis.viewLinkPopupFieldFill();
    await dealAnalysis.viewLinkPopupSaveFieldButtonClick();
    await expect(saveButton).toBeHidden();
    await expect(sampleValue).toHaveText('Sample 1 est test test test test test est test test test test test est test test test test test est test test test test test v')
    await dealAnalysis.viewLinkPopupCloseButtonClick();
    await page.waitForTimeout(1000);
    await expect(viewLinkPopup).toBeHidden();
    await expect(page).toHaveURL('/deals/analysis-deal/458')
    })

test('draftFinlaDraftUrlFields @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const draftFieldUrl = page.locator('[name="draft_link"]');
    const draftFieldUrlValidation = page.locator('#deal-analysis-form_link1 mat-error');
    const finalFieldUrl = page.locator('[name="final_link"]');
    const finalFieldUrlValidation = page.locator('#deal-analysis-form_link2 mat-error');
    console.log('dealAnalysis Draft Final Draft Url Fields');
    await page.goto('/deals/analysis-deal/8358');
    await expect(draftFieldUrl).toHaveAttribute('placeholder', 'Draft deal');
    await expect(draftFieldUrl).toHaveAttribute('aria-required', 'false');
    await expect(finalFieldUrl).toHaveAttribute('placeholder', 'Final deal');
    await expect(finalFieldUrl).toHaveAttribute('aria-required', 'false');
    await dealAnalysis.draftLinkFieldValidationFill();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await expect(draftFieldUrlValidation).toHaveText('2000 characters are allowed in this input field')
    await dealAnalysis.draftLinkFieldClear();
    await dealAnalysis.finalLinkFieldValidationFill();
    await dealAnalysis.finalLinkFieldOkIconClick();
    await expect(finalFieldUrlValidation).toHaveText('2000 characters are allowed in this input field')
    await dealAnalysis.finalLinkFieldClear();
    })

test('checkmarkButtonForDraftFinalDraftUrlFields&UrlValidation @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const firstLink = page.locator('#deal-analysis-link1');
    const editButtonFirstLink = page.locator('#deal-analysis-link1-edit');
    const copyButtonFirstLink = page.locator('#deal-analysis-link1-copy');
    const finalLink = page.locator('a.ng-star-inserted >> text=Final deal');
    const editButtonFinalLink = page.locator('#deal-analysis-link2-edit');
    const copyButtonFinalLink = page.locator('#deal-analysis-link2-copy');
    console.log('dealAnalysis Checkmark Button For Draft&Final Draft Url Fields&UrlValidation');
    await page.goto('/deals/analysis-deal/8250');
    await dealAnalysis.draftLinkFieldFill();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await expect(firstLink).toBeVisible();
    await expect(editButtonFirstLink).toBeVisible();
    await expect(copyButtonFirstLink).toBeVisible();
    await dealAnalysis.finalLinkFieldFill();
    await dealAnalysis.finalLinkFieldOkIconClick();
    await expect(finalLink).toBeVisible();
    await expect(editButtonFinalLink).toBeVisible();
    await expect(copyButtonFinalLink).toBeVisible();
    await dealAnalysis.draftLinkClick();
    const [page1] = await Promise.all([
        page.waitForEvent('popup'),
      ]);
    await page1.waitForLoadState();
    await expect(page1).toHaveURL('/deals/analysis-deal/8251');
    await page1.close();
    await dealAnalysis.finalLinkClick();
    const [page2] = await Promise.all([
        page.waitForEvent('popup'),
      ]);
      await page2.waitForLoadState();
    await expect(page2).toHaveURL('/deals/analysis-deal/8251');
    await page2.close();
    await dealAnalysis.draftLinkClickEditClick();
    await dealAnalysis.draftLinkFieldClear();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await dealAnalysis.finalLinkFieldEditClick();
    await dealAnalysis.finalLinkFieldClear();
    await dealAnalysis.finalLinkFieldOkIconClick();
    await page.reload();
    })

test('closeButtonForDraftFinalDraftUrlFields @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const draftFieldUrl = page.locator('[name="draft_link"]');
    const closeButtonDraftUrl = page.locator('#deal-analysis-form_link1-close');
    const finalFieldUrl = page.locator('[name="final_link"]');
    const closeButtonFinalUrl = page.locator('#deal-analysis-form_link2-close');
    console.log('dealAnalysis Close Button For Draft Final Draft Url Fields');
    await page.goto('/deals/analysis-deal/8357');
    await expect(closeButtonDraftUrl).toBeVisible();
    await expect(closeButtonFinalUrl).toBeVisible();
    await dealAnalysis.draftLinkFieldCancelIconClick();
    await expect(draftFieldUrl).toBeVisible();
    await expect(draftFieldUrl).toHaveText('');
    await dealAnalysis.finalLinkFieldCancelIconClick();
    await expect(finalFieldUrl).toBeVisible();
    await expect(finalFieldUrl).toHaveText('');
    await dealAnalysis.draftLinkFieldFill();
    await dealAnalysis.draftLinkFieldCancelIconClick();
    await expect(draftFieldUrl).toBeVisible();
    await expect(draftFieldUrl).toHaveText('');
    await dealAnalysis.finalLinkFieldFill();
    await dealAnalysis.finalLinkFieldCancelIconClick();
    await expect(finalFieldUrl).toBeVisible();
    await expect(finalFieldUrl).toHaveText('');
    await page.reload();
    await expect(closeButtonDraftUrl).toBeVisible();
    await expect(draftFieldUrl).toBeVisible();
    await expect(draftFieldUrl).toHaveText('');
    await expect(finalFieldUrl).toBeVisible();
    await expect(finalFieldUrl).toHaveText('');
    await expect(closeButtonFinalUrl).toBeVisible();
    })

test('pancilCopyButtonsDraftFinlaDraftUrlFields @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const pancilButtonDraftUrl = page.locator('#deal-analysis-link1-edit');
    const copyButtonDraftUrl = page.locator('#deal-analysis-link1-copy');
    const pancilButtonFinalUrl = page.locator('#deal-analysis-link2-edit');
    const copyButtonFinalUrl = page.locator('#deal-analysis-link2-copy');
    const copiedPopup = page.locator('.mat-tooltip-panel');
    console.log('dealAnalysis Pancil&Copy Button For Draft Final Draft Url Fields');
    await page.goto('/deals/analysis-deal/8356');
    await expect(pancilButtonDraftUrl).toBeHidden();
    await expect(copyButtonDraftUrl).toBeHidden();
    await expect(pancilButtonFinalUrl).toBeHidden();
    await expect(copyButtonFinalUrl).toBeHidden();
    await dealAnalysis.draftLinkFieldFill();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await expect(pancilButtonDraftUrl).toBeVisible();
    await expect(copyButtonDraftUrl).toBeVisible();
    await dealAnalysis.finalLinkFieldFill();
    await dealAnalysis.finalLinkFieldOkIconClick();
    await expect(pancilButtonFinalUrl).toBeVisible();
    await expect(copyButtonFinalUrl).toBeVisible();
    await dealAnalysis.draftLinkClickCopyClick()
    await expect(copiedPopup).toBeVisible();
    await dealAnalysis.finalLinkFieldCopyClick();
    await page.waitForTimeout(500);
    await expect(copiedPopup).toBeVisible();
    await dealAnalysis.draftLinkClickEditClick();
    await dealAnalysis.draftLinkFieldClear();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await dealAnalysis.finalLinkFieldEditClick();
    await dealAnalysis.finalLinkFieldClear();
    await dealAnalysis.finalLinkFieldOkIconClick();
    })

    test('deletingInsertedLinkForDraftFinalUrlFields @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const draftFieldUrl = page.locator('[name="draft_link"]');
    const finalFieldUrl = page.locator('[name="final_link"]');
    console.log('dealAnalysis Deleting Inserted Link For Draft&Final Url Fields');
    await page.goto('/deals/analysis-deal/8359');
    await dealAnalysis.draftLinkFieldFill();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await dealAnalysis.finalLinkFieldFill();
    await dealAnalysis.finalLinkFieldOkIconClick();
    await dealAnalysis.draftLinkClickEditClick();
    await dealAnalysis.draftLinkFieldClear();
    await dealAnalysis.draftLinkFieldOkIconClick();
    await dealAnalysis.finalLinkFieldEditClick();
    await dealAnalysis.finalLinkFieldClear();
    await dealAnalysis.finalLinkFieldOkIconClick();
    await expect(draftFieldUrl).toBeVisible();
    await expect(draftFieldUrl).toHaveText('');
    await expect(finalFieldUrl).toBeVisible();
    await expect(finalFieldUrl).toHaveText('');
    await page.reload();
    await expect(draftFieldUrl).toBeVisible();
    await expect(draftFieldUrl).toHaveText('');
    await expect(finalFieldUrl).toBeVisible();
    await expect(finalFieldUrl).toHaveText('');
    })

test('appearingSignatureEffectiveExpirationDateBoxes @regChecklistNewHigh @dealAnalysis', async ({ page }) => {
    const deal = new DealsPage(page);
    const newDeal = new NewEditDealPage(page);
    const dealAnalysis = new DealAnalysisPage(page);
    const signatureDate = page.locator('#deal-analysis-signature-date');
    const effectiveDate = page.locator('#deal-analysis-effective-date');
    const expirationDate = page.locator('#deal-analysis-expiration-date');
    const signatureDateValue = page.locator('#deal-analysis-signature-date input');
    const effectiveDateValue = page.locator('#deal-analysis-effective-date input');
    const expirationDateValue = page.locator('#deal-analysis-expiration-date input');
    const today = new Date();
    const date = ("0" + (today.getMonth() + 1)).slice(-2)+'/'+("0" + today.getDate()).slice(-2)+'/'+today.getFullYear();
    console.log('dealAnalysis Appearing Signature&Effective&Expiration Date Boxes');
    await page.goto('/deals?&sort=contract_name');
    await deal.addDealButtonClick();
    await newDeal.modelDropDownChoose();
    await newDeal.contractNameFieldFill(Helpers.generateRandomString());
    await newDeal.nameOfTheOtherPartyFieldFill(Helpers.generateRandomString());
    await newDeal.esimatedValueFieldFill();
    await newDeal.createButtonClick();
    await page.waitForSelector('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=0');
    await expect(signatureDate).toBeHidden();
    await expect(effectiveDate).toBeHidden();
    await expect(expirationDate).toBeHidden();
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(signatureDate).toBeVisible();
    await expect(effectiveDate).toBeVisible();
    await expect(expirationDate).toBeVisible();
    await expect(signatureDateValue).toHaveValue(date);
    await expect(effectiveDateValue).toHaveValue(date);
    await expect(expirationDateValue).toHaveValue(date);
    })

test('appearingDataPickerSignatureEffectiveExpirationDateBoxes @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const dataPicker = page.locator('.mat-calendar');
    console.log('dealAnalysis Appearing Data Picker For Signature&Effective&Expiration Date Boxes');
    await page.goto('/deals/analysis-deal/8360');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.signatureEditIconClick();
    await dealAnalysis.signatureCalendarIconClick();
    await expect(dataPicker).toBeVisible();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.signatureOkIconClick();
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCalendarIconClick();
    await expect(dataPicker).toBeVisible();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.effectiveOkIconClick();
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCalendarIconClick();
    await expect(dataPicker).toBeVisible();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.expirationOkIconClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('savingInputedDateSignatureEffectiveExpirationDateBoxes @regChecklistNewHigh @dealAnalysis', async ({ page }) => {
    const dealAnalysis = new DealAnalysisPage(page);
    const signatureDateValue = page.locator('#deal-analysis-signature-date input');
    const effectiveDateValue = page.locator('#deal-analysis-effective-date input');
    const expirationDateValue = page.locator('#deal-analysis-expiration-date input');
    console.log('dealAnalysis Saving Inputed Date Signature&Effective&Expiration Date Boxes');
    await page.goto('/deals/analysis-deal/8264');
    await dealAnalysis.signatureEditIconClick();
    await dealAnalysis.signatureCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue15Choose();
    await dealAnalysis.signatureOkIconClick();
    await expect(signatureDateValue).toHaveValue('01/15/2022');
    await dealAnalysis.signatureEditIconClick();
    await dealAnalysis.signatureCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.signatureOkIconClick();
    await expect(signatureDateValue).toHaveValue('01/21/2022');
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue28Choose();
    await dealAnalysis.effectiveOkIconClick();
    await expect(effectiveDateValue).toHaveValue('01/28/2022');
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.effectiveOkIconClick();
    await expect(effectiveDateValue).toHaveValue('01/21/2022');
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue12Choose();
    await dealAnalysis.expirationOkIconClick();
    await expect(expirationDateValue).toHaveValue('01/12/2022');
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.expirationOkIconClick();
    await expect(expirationDateValue).toHaveValue('01/21/2022');
    })

    //to be refactored
test.skip('editButtonSignatureEffectiveExpirationDateBoxes @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    console.log('dealAnalysis Edit Button For Signature&Effective&Expiration Date Boxes');
    await page.goto('/deals/analysis-deal/8264');

    })

test('xButtonSignatureEffectiveExpirationDateBoxes @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const signatureDateValue = page.locator('#deal-analysis-signature-date input');
    const signatureDateValidation = page.locator('#deal-analysis-signature-date mat-error');
    const effectiveDateValue = page.locator('#deal-analysis-effective-date input');
    const effectiveDateValueValidation = page.locator('#deal-analysis-effective-date mat-error');
    const expirationDateValue = page.locator('#deal-analysis-expiration-date input');
    const expirationDateValidation = page.locator('#deal-analysis-expiration-date mat-error');
    console.log('dealAnalysis Edit Button For Signature&Effective&Expiration Date Boxes');
    await page.goto('/deals/analysis-deal/8264');
    await dealAnalysis.signatureEditIconClick();
    await dealAnalysis.signatureCancelIconClick();
    await expect(signatureDateValue).toHaveValue('');
    await dealAnalysis.signatureCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.signatureOkIconClick();
    await dealAnalysis.signatureEditIconClick();
    await dealAnalysis.signatureCancelIconClick();
    await expect(signatureDateValidation).toHaveText('Field required');
    await dealAnalysis.signatureCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.signatureOkIconClick();
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCancelIconClick();
    await expect(effectiveDateValue).toHaveValue('');
    await dealAnalysis.effectiveCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.effectiveOkIconClick();
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCancelIconClick();
    await expect(effectiveDateValueValidation).toHaveText('Field required');
    await dealAnalysis.effectiveCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.effectiveOkIconClick();
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCancelIconClick();
    await expect(expirationDateValue).toHaveValue('');
    await dealAnalysis.expirationCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.expirationOkIconClick();
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCancelIconClick();
    await expect(expirationDateValidation).toHaveText('Field required');
    await dealAnalysis.expirationCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.expirationOkIconClick();
    })

test('displayingPreliminaryDateCheckbox @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const preliminaryDate = page.locator('#deal-analysis-preliminary-date');
    const preliminaryDateCheckedUnchecked = page.locator('#deal-analysis-preliminary-date-input');
    console.log('dealAnalysis Displaying Preliminary Date Checkbox');
    await page.goto('/deals/analysis-deal/8361');
    await expect(preliminaryDate).toBeHidden();
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(preliminaryDate).toBeVisible();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'false');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('switchingPreliminaryDateCheeckbox @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const signatureDateBoxName = page.locator('#mat-form-field-label-1');
    const preliminaryDateCheckBoxColor = page.locator('.mat-checkbox-background');
    const signatureBoxEditIcon = page.locator('#deal-analysis-signature-date-edit');
    const signatureBoxOkIcon = page.locator('#deal-analysis-signature-date-check');
    const signatureBoxCancelIcon = page.locator('#deal-analysis-signature-date-close');
    console.log('dealAnalysis Switching Preliminary Date Cheeckbox');
    await page.goto('/deals/analysis-deal/8264');
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(signatureDateBoxName).toHaveText('Preliminary Date');
    await expect(preliminaryDateCheckBoxColor).toHaveCSS('background-color', 'rgb(92, 168, 8)');
    await expect(signatureBoxEditIcon).toBeHidden();
    await expect(signatureBoxOkIcon).toBeVisible();
    await expect(signatureBoxCancelIcon).toBeVisible();
    await dealAnalysis.signatureOkIconClick();
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(signatureDateBoxName).toHaveText('Signature Date');
    await expect(preliminaryDateCheckBoxColor).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(signatureBoxEditIcon).toBeVisible();
    await expect(signatureBoxOkIcon).toBeHidden();
    await expect(signatureBoxCancelIcon).toBeHidden();
    })

test('confirmedSignatureDateSwitchingPreliminaryDate @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const signatureDateBoxName = page.locator('#mat-form-field-label-1');
    const signatureBoxEditIcon = page.locator('#deal-analysis-signature-date-edit');
    const signatureBoxOkIcon = page.locator('#deal-analysis-signature-date-check');
    const signatureBoxCancelIcon = page.locator('#deal-analysis-signature-date-close');
    const signatureDateValue = page.locator('#deal-analysis-signature-date input');
    console.log('dealAnalysis Confirmed Signature Date Switching Preliminary Date');
    await page.goto('/deals/analysis-deal/8264');
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(signatureDateBoxName).toHaveText('Preliminary Date');
    await expect(signatureBoxEditIcon).toBeHidden();
    await expect(signatureBoxOkIcon).toBeVisible();
    await expect(signatureBoxCancelIcon).toBeVisible();
    await expect(signatureDateValue).toHaveValue('01/21/2022');
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(signatureDateBoxName).toHaveText('Signature Date');
    await expect(signatureBoxEditIcon).toBeVisible();
    await expect(signatureBoxOkIcon).toBeHidden();
    await expect(signatureBoxCancelIcon).toBeHidden();
    await expect(signatureDateValue).toHaveValue('01/21/2022');
    })

test('savingPreliminaryDate @regChecklistNewHigh @dealAnalysis', async ({ page }) => {
    const dealAnalysis = new DealAnalysisPage(page);
    const signatureDateValue = page.locator('#deal-analysis-signature-date input');
    const effectiveDateValue = page.locator('#deal-analysis-effective-date input');
    const expirationDateValue = page.locator('#deal-analysis-expiration-date input');
    console.log('dealAnalysis Confirmed Signature Date Switching Preliminary Date');
    await page.goto('/deals/analysis-deal/8264');
    await dealAnalysis.preliminaryCheckboxClick();
    await dealAnalysis.signatureCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue12Choose();
    await expect(signatureDateValue).toHaveValue('01/12/2022');
    await dealAnalysis.signatureOkIconClick();
    await expect(signatureDateValue).toHaveValue('01/12/2022');
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue15Choose();
    await expect(effectiveDateValue).toHaveValue('01/15/2022');
    await dealAnalysis.effectiveOkIconClick();
    await expect(effectiveDateValue).toHaveValue('01/15/2022');
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue28Choose();
    await expect(expirationDateValue).toHaveValue('01/28/2022');
    await dealAnalysis.expirationOkIconClick();
    await expect(expirationDateValue).toHaveValue('01/28/2022');
    await page.reload();
    await expect(signatureDateValue).toHaveValue('01/12/2022');
    await expect(effectiveDateValue).toHaveValue('01/15/2022');
    await expect(expirationDateValue).toHaveValue('01/28/2022');
    await dealAnalysis.preliminaryCheckboxClick();
    await dealAnalysis.signatureEditIconClick();
    await dealAnalysis.signatureCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.signatureOkIconClick();
    await dealAnalysis.effectiveEditIconClick();
    await dealAnalysis.effectiveCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.effectiveOkIconClick();
    await dealAnalysis.expirationEditIconClick();
    await dealAnalysis.expirationCalendarIconClick();
    await dealAnalysis.datapickerPeriodButtonClick();
    await dealAnalysis.datapickerPeriod2022ValueChoose();
    await dealAnalysis.datapickerPeriodJanValueChoose();
    await dealAnalysis.datapickerValue21Choose();
    await dealAnalysis.expirationOkIconClick();
    })

test('applyingPreliminaryDateToggleToAnyDeal @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const preliminaryDateCheckedUnchecked = page.locator('#deal-analysis-preliminary-date-input');
    console.log('dealAnalysis Applying Preliminary Date Toggle To Any Deal');
    await page.goto('/deals/analysis-deal/8264');
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'true');
    await dealAnalysis.signatureOkIconClick();
    await page.reload();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'true');
    await dealAnalysis.preliminaryCheckboxClick();
    await page.goto('/deals/analysis-deal/8430');
    await page.waitForSelector('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=0');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'true');
    await dealAnalysis.signatureOkIconClick();
    await page.reload();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'true');
    await dealAnalysis.preliminaryCheckboxClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await page.goto('/deals/analysis-deal/8431');
    await page.waitForSelector('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=0');
    await dealAnalysis.firstDraftDropDownChoose();
    await dealAnalysis.firstDraftFinishButtonClick();
    await dealAnalysis.preliminaryCheckboxClick();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'true');
    await dealAnalysis.signatureOkIconClick();
    await page.reload();
    await expect(preliminaryDateCheckedUnchecked).toHaveAttribute('aria-checked', 'true');
    await dealAnalysis.preliminaryCheckboxClick();
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('totalScoreLine @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const totalScoreText = page.locator('.mat-column-term.mat-table-sticky');
    const totalScore = page.locator('.mat-column-answer.mat-table-sticky');
    const totalScoreColor = page.locator('.mat-column-answer.mat-table-sticky.ng-star-inserted');
    console.log('dealAnalysis Confirmed Signature Date Switching Preliminary Date');
    await page.goto('/deals/analysis-deal/8362');
    await expect(totalScoreText).toHaveText('Total');
    await expect(totalScore).toHaveText('100%');
    await expect(totalScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.firstDraftDropDownChoose();
    await expect(totalScore).toHaveText('100%');
    await expect(totalScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(totalScore).toHaveText('100%');
    await expect(totalScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.finalDraftDropDownChoose2();
    await expect(totalScore).toHaveText('100%');
    await expect(totalScoreColor).toHaveCSS('color', 'rgb(12, 198, 134)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('riskScoreWhenChangeAnswerWeight @regChecklistNewHigh @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const firstDraftScore = page.locator('.mat-column-first_draft.mat-table-sticky');
    const firstDraftScoreColor = page.locator('.mat-column-first_draft.mat-table-sticky .ng-star-inserted');
    const finalDraftScore = page.locator('.mat-column-final_draft.mat-table-sticky');
    const finalDraftScoreColor = page.locator('.mat-column-final_draft.mat-table-sticky .ng-star-inserted');
    console.log('dealAnalysis Risk Score When Change Answer Weight');
    await page.goto('/deals/analysis-deal/8363');
    await page.waitForSelector('.mat-column-first_draft .mat-select-arrow-wrapper >> nth=0');
    await dealAnalysis.firstDraftDropDownChoose();
    await expect(firstDraftScore).toHaveText('-187%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(firstDraftScore).toHaveText('-187%');
    await expect(finalDraftScore).toHaveText('-187%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.finalDraftDropDownChoose2();
    await expect(finalDraftScore).toHaveText('-7%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftDropDownChoose2();
    await expect(firstDraftScore).toHaveText('-7%');
    await expect(firstDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.firstDraftFinishButtonClick();
    await expect(firstDraftScore).toHaveText('-7%');
    await expect(finalDraftScore).toHaveText('-7%');
    await expect(finalDraftScoreColor).toHaveCSS('color', 'rgb(255, 83, 132)');
    await dealAnalysis.clearAllButtonFinalDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    await dealAnalysis.firstDraftReopenButtonClick();
    await dealAnalysis.clearAllButton1stDraftClick();
    await dealAnalysis.clearAllPopupClearButtonClick();
    })

test('showPreviousScoresLink @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const scoreFirstLink = page.locator('.deal-link-name >> text=test100test100DealDoNotRemove4 - test');
    const scoreFirstLinkDraftValue = page.locator('.mat-column-first_draft >> text=161%');
    const scoreFirstLinkFinalValue = page.locator('.mat-column-final_draft >> text=161%');
    const scoreSecondLink = page.locator('.deal-link-name >> text=test100test100DealDoNotRemove3 - test');
    const scoreSecondLinkDraftValue = page.locator('.mat-column-first_draft >> text=20%');
    const scoreSecondLinkFinalValue = page.locator('.mat-column-final_draft >> text=20%');
    console.log('dealAnalysis Show Previous Scores Link');
    await page.goto('/deals/analysis-deal/8250');
    await dealAnalysis.showHidePreviousScoreButtonClick();
    await expect(scoreFirstLink).toHaveText('test100test100DealDoNotRemove4 - test');
    await expect(scoreFirstLink).toBeVisible();
    await expect(scoreFirstLinkDraftValue).toHaveText('161%');
    await expect(scoreFirstLinkDraftValue).toBeVisible();
    await expect(scoreFirstLinkFinalValue).toHaveText('161%');
    await expect(scoreFirstLinkFinalValue).toBeVisible();
    await expect(scoreSecondLink).toHaveText('test100test100DealDoNotRemove3 - test');
    await expect(scoreSecondLink).toBeVisible();
    await expect(scoreSecondLinkDraftValue).toHaveText('20%');
    await expect(scoreSecondLinkDraftValue).toBeVisible();
    await expect(scoreSecondLinkFinalValue).toHaveText('20%');
    await expect(scoreSecondLinkFinalValue).toBeVisible();
    })

test('disablingShowPreviousScores @regChecklistNewLow @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium');
    const dealAnalysis = new DealAnalysisPage(page);
    const showPriviousScore = page.locator('#deal-analysis-show-hide-table-scores');
    console.log('dealAnalysis Disabling Show Previous Scores');
    await page.goto('/deals/analysis-deal/412');
    await expect(showPriviousScore).toHaveClass('toggle-link disabled ng-star-inserted');
    })

test('showPrivousLinkRedirections @regChecklistNewHigh @dealAnalysis', async ({ page }) => {
    const dealAnalysis = new DealAnalysisPage(page);
    console.log('dealAnalysis Show Privous Link Redirections');
    await page.goto('/deals/analysis-deal/8250');
    await dealAnalysis.showHidePreviousScoreButtonClick();
    await page.click('.deal-link-name >> text=test100test100DealDoNotRemove4 - test');
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('/deals/analysis-deal/8264');
    await page.goto('/deals/analysis-deal/8250');
    await page.waitForTimeout(1000);
    await dealAnalysis.showHidePreviousScoreButtonClick();
    await page.click('.deal-link-name >> text=test100test100DealDoNotRemove3 - test');
    await expect(page).toHaveURL('/deals/analysis-deal/8252');
    })

test('hidePreviousScoresLink @regChecklistNewMedium @dealAnalysis', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit');
    const dealAnalysis = new DealAnalysisPage(page);
    const showPriviousScoreButton = page.locator('#deal-analysis-show-hide-table-scores >> text=show previous scores');
    const hidePriviousScoreButton = page.locator('#deal-analysis-show-hide-table-scores >> text=hide previous scores');
    const scoreFirstLink = page.locator('.deal-link-name >> nth=0');
    const scoreFirstLinkDraftValue = page.locator('.mat-column-first_draft >> text=161%');
    const scoreFirstLinkFinalValue = page.locator('.mat-column-final_draft >> text=161%');
    const scoreSecondLink = page.locator('.deal-link-name >> nth=1');
    const scoreSecondLinkDraftValue = page.locator('.mat-column-first_draft >> text=20%');
    const scoreSecondLinkFinalValue = page.locator('.mat-column-final_draft >> text=20%');
    console.log('dealAnalysis Hide Previous Scores Link');
    await page.goto('/deals/analysis-deal/8250');
    await expect(hidePriviousScoreButton).toBeHidden();
    await dealAnalysis.showHidePreviousScoreButtonClick();
    await expect(hidePriviousScoreButton).toBeVisible();
    await expect(showPriviousScoreButton).toBeHidden();
    await dealAnalysis.showHidePreviousScoreButtonClick();
    await expect(scoreFirstLink).toBeHidden();
    await expect(scoreFirstLinkDraftValue).toBeHidden();
    await expect(scoreFirstLinkFinalValue).toBeHidden();
    await expect(scoreSecondLink).toBeHidden();
    await expect(scoreSecondLinkDraftValue).toBeHidden();
    await expect(scoreSecondLinkFinalValue).toBeHidden();
    })