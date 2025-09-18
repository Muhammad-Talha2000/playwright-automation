import { test as base, expect } from '@playwright/test';

// Custom test with network monitoring
const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const errorData = [];
    const successData = [];

    // Monitor network responses
    page.on('response', async (response) => {
      const url = response.url();
      const status = response.status();
      const method = response.request().method();

      // Track API calls to specific domains
      const isApiCall = url.includes('axens.disruptlabs.tech') || 
                       url.includes('beaxens.disruptlabs.tech');

      if (isApiCall) {
        if (status >= 400) {
          errorData.push({
            url,
            status,
            method,
            timestamp: new Date().toISOString()
          });
          console.error(`❌ Failed request: ${status} ${method} ${url}`);
        } else if (status === 200) {
          successData.push({
            url,
            status,
            method,
            timestamp: new Date().toISOString()
          });
          console.log(`✅ Success: ${status} ${method} ${url}`);
        }
      }
    });

    await use(page);

    // Log summary of successful requests
    if (successData.length > 0) {
      console.log(`\n✅ Successful API calls: ${successData.length}`);
      await testInfo.attach('success-requests.json', {
        body: JSON.stringify(successData, null, 2),
        contentType: 'application/json'
      });
    }

    // Check for errors after test
    if (errorData.length > 0) {
      console.error(`\n❌ Failed API calls: ${errorData.length}`);
      await testInfo.attach('error-requests.json', {
        body: JSON.stringify(errorData, null, 2),
        contentType: 'application/json'
      });
      throw new Error(
        `Network errors detected: ${errorData.length} requests failed. Check error-requests.json`
      );
    }
  }
});

test('AI Model Page flow', async ({ page }) => {
  await test.step('Login', async () => {
    await page.goto('https://axens.disruptlabs.tech/login');
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('factory@axens.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Axens@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  await test.step('Closing pop up', async () => {
    await page.getByRole('button', { name: 'Close' }).click();
  });

  await test.step('AI Model Reports Page Navigation', async () => {
    await page.getByRole('link', { name: 'AI Model & Reports' }).click();
  });

  await test.step('Applying Filters', async () => {
    await page.getByText('Filters').first().click();
    await page.getByRole('combobox', { name: 'Select Subarea' }).click();
    await page.getByRole('option', { name: 'Air Compressor Gate' }).click();
    await page.getByRole('combobox', { name: 'Select Shift' }).click();
    await page.getByRole('option', { name: 'Shift A' }).click();
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('#role').selectOption('Month');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').press('ArrowRight');
    await page.getByRole('textbox').fill('2025-08');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('select[name="role"]').selectOption('Daily');
    await page.getByRole('textbox').press('ArrowLeft');
    await page.getByRole('textbox').press('ArrowLeft');
    await page.getByRole('textbox').press('ArrowLeft');
    await page.getByRole('textbox').fill('2025-09-18');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('textbox').fill('2025-09-17');
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
  });

  await test.step('Testing bar graph legends', async () => {
    await page.getByText('80 > value').click();
    await page.getByText('> value > 80').click();
    await page.getByText('< value').click();
    await page.getByText('80 > value').click();
    await page.getByText('> value > 80').click();
    await page.getByText('< value').click();
  });

  await test.step('Compliance details see more button', async () => {
    await page.click('//*[@id="pageWrapper"]/div[2]/div[3]/div/div/div[2]/div/div[3]/div/div/div/div/div[1]/div/div/div[3]/div[3]/button');
    await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  });

  await test.step('Comparison graph filters', async () => {
    await page.locator('div').filter({ hasText: /^ComparisonComparing 2025-W37 - 2025-W38 Filters$/ }).getByRole('paragraph').click();
    await page.getByRole('textbox', { name: 'Week 1' }).click();
    await page.getByRole('textbox', { name: 'Week 1' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Week 1' }).fill('2025-W36');
    await page.getByRole('textbox', { name: 'Week 2' }).click();
    await page.getByRole('textbox', { name: 'Week 2' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Week 2' }).fill('2025-W37');
    await page.click('xpath=//*[@id="pageWrapper"]/div[2]/div[3]/div/div/div[2]/div/div[4]/div[2]/div[2]/div/button');
  });

  await test.step('Download PDF button', async () => {
    await page.click('//*[@id="pageWrapper"]/div[2]/div[3]/div/div/div[2]/div/div[1]/div[2]/div[3]/button');
  });
});

