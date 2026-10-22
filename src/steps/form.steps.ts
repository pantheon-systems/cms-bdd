import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { fieldLocator, fillField } from '../utils/field-locator';

const { When } = createBdd(test);

When('I fill in {string} with {string}', async ({ page }, field: string, value: string) => {
  await fillField(fieldLocator(page, field), value);
});

When('I fill in the following:', async ({ page }, dataTable: DataTable) => {
  for (const [field, value] of Object.entries(dataTable.rowsHash())) {
    await fillField(fieldLocator(page, field), value);
  }
});

When('I press {string}', async ({ page }, buttonName: string) => {
  await page.getByRole('button', { name: buttonName }).click();
});

When('I follow {string}', async ({ page }, linkText: string) => {
  await page.getByRole('link', { name: linkText }).click();
});

When('I select {string} from {string}', async ({ page }, option: string, field: string) => {
  await fieldLocator(page, field).selectOption({ label: option });
});

When('I check {string}', async ({ page }, label: string) => {
  await fieldLocator(page, label).check();
});

When('I uncheck {string}', async ({ page }, label: string) => {
  await fieldLocator(page, label).uncheck();
});

When(
  'I attach the file {string} to {string}',
  async ({ page }, filePath: string, field: string) => {
    await fieldLocator(page, field).setInputFiles(filePath);
  },
);
