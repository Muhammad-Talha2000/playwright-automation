import { test, expect } from '@playwright/test';

// Helper for login
async function login(page) {
  await page.goto('https://axens.disruptlabs.tech/login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('factory@axens.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Axens@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
}

test('Login', async ({ page }) => {
  await login(page);
});

test('Navigate and interact with Live Analytics', async ({ page }) => {
  await login(page);
  await page.getByText('Live Cameras Count').click();
  await page.getByRole('link', { name: 'Live Analytics' }).click();
  await page.getByText('AI Accuracy').click();
  await page.getByRole('link', { name: 'Live Analytics' }).click();
  await page.getByText('High Alerts').click();
  await page.getByRole('link', { name: 'Live Analytics' }).click();
});

test('Heatmap interaction', async ({ page }) => {
  await login(page);
  await page.locator('#SvgjsRect1370').click();
  await page.locator('div').filter({ hasText: /^Back$/ }).nth(1).click();
});

test('Filtering options', async ({ page }) => {
  await login(page);
  await page.getByText('Filter').click();
  await page.locator('div').filter({ hasText: /^MonthWeekDaily$/ }).locator('#role').selectOption('Month');
  await page.getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^MonthWeekDaily$/ }).locator('#role').selectOption('Week');
  await page.locator('#week').click();
  await page.locator('#week').press('ArrowLeft');
  await page.locator('#week').fill('2025-W36');
  await page.locator('div').filter({ hasText: /^Select ShiftShift AShift B$/ }).locator('#role').selectOption('Shift A');
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
});