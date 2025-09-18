import { test, expect } from '@playwright/test';

test('Axens website flow', async ({ page }) => {
  await test.step('Login', async () => {
    await page.goto('https://axens.disruptlabs.tech/login');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('factory@axens.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Axens@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
  });

  await test.step('Live Analytics navigation', async () => {
    await page.locator('div').filter({ hasText: /^6 \/6$/ }).click();
    await page.getByRole('link', { name: 'Live Analytics' }).click();
    await page.getByText('AI Accuracy').click();
    await page.getByRole('link', { name: 'Live Analytics' }).click();
    await page.getByText('Total Alerts', { exact: true }).click();
    //await page.getByText('81', { exact: true }).click();
    //await page.locator('div').filter({ hasText: /^High Alerts38\/148DetailsArea: Burner GateModule: Mask$/ }).nth(2).click();
    await page.getByRole('link', { name: 'Live Analytics' }).click();
    //await page.getByText('Back').click();
    //await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  });

  await test.step('AI Model & Reports navigation', async () => {
    await page.getByRole('link', { name: 'AI Model & Reports' }).click();
    // ...existing code...
    await page.click('#pageWrapper > div.page-body-wrapper > div.page-body > div > div > div.p-0.m-0 > div > div.px-1.mt-4.row > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(4) > div.d-flex.seemore.align-items-end > button');
    // ...existing code...
    //await page.locator('div').filter({ hasText: /^Compliance92Non-Compliance31See More$/ }).getByRole('button').click();
    await page.click('#pageWrapper > div.page-body-wrapper > div.page-body > div > div > div > div.d-flex.align-items-center.gap-2 > p')
    await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  });

  await test.step('Sub Area Analysis navigation', async () => {
    await page.getByRole('link', { name: 'Sub Area Analysis' }).click();
    await page.getByText('Camera 7 Alerts').click();
    await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  });

  await test.step('Live Alerts navigation and actions', async () => {
    await page.getByRole('link', { name: 'Live Alerts' }).click();
    await page.locator('div').filter({ hasText: /^Camera ID: 3Gate 3Shift A2025-09-04 09:59 AMAcknowledgeView Image$/ }).locator('div').nth(4).click();
    await page.locator('div').filter({ hasText: /^Camera ID: 3Gate 3Shift A2025-09-04 09:59 AMAcknowledgedView Image$/ }).getByRole('button').click();
    await page.getByRole('dialog').click();
    await page.getByRole('dialog').press('Escape');
  });

  await test.step('Apply and reset filters', async () => {
    await page.getByRole('button', { name: 'Filters' }).click();
    await page.getByLabel('Select Module').selectOption('Helmet');
    await page.getByLabel('Select Sub Area').selectOption('1');
    await page.getByRole('button', { name: 'Shift A' }).click();
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByLabel('Select Module').selectOption('Gloves');
    await page.getByRole('button', { name: 'Accept' }).click();
  });

  await test.step('Camera Status filters', async () => {
    await page.getByRole('link', { name: 'Camera Status' }).click();
    await page.locator('div').filter({ hasText: /^Filters$/ }).nth(2).click();
    await page.locator('#role').selectOption('Active');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('#role').selectOption('InActive');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
  });

  await test.step('Support & Tickets flow', async () => {
    await page.getByRole('link', { name: 'Support & Tickets' }).click();
    await page.getByRole('heading', { name: 'Generate Support Ticket' }).click();
    await page.getByRole('combobox', { name: 'Select Areas...' }).click();
    await page.getByRole('option', { name: 'Exit,' }).click();
    await page.getByRole('combobox', { name: 'Select Subareas...' }).click();
    await page.getByRole('option', { name: 'Air Compressor Gate' }).click();
    await page.getByRole('combobox', { name: 'Select Modules...' }).click();
    await page.getByRole('option', { name: 'Helmet' }).click();
    await page.locator('.css-19bb58m').click();
    await page.getByRole('option', { name: 'High' }).click();
    await page.getByRole('textbox', { name: 'Describe your query...' }).fill('test');
    await page.getByRole('button', { name: 'Submit' }).click();
  });
});