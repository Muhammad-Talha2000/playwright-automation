//@ts-check

const {test, expect} = require('@playwright/test');

test('OrangeHRM Title Test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/OrangeHRM/);
});
