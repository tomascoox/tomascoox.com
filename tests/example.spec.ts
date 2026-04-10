import { test, expect } from '@playwright/test';

test('Kontrollera startsida och grundläggande sektioner', async ({ page }) => {
  await page.goto('/');
  // 1. Kolla titeln
  await expect(page).toHaveTitle(/Full-Stack Developer, Musician, & Graphic Designer | Tomas Coox/);

  // 2. Verifiera att huvudrubriken är synlig
  await expect(page.getByRole('heading', { name: 'Tomas Coox', exact: true })).toBeVisible();
});
