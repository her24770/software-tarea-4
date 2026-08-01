import { test, expect } from '@playwright/test';

const URL = process.env.TARGET_URL ?? 'https://dev2.registro.gt/idn';

test.describe('RF-2.3 - Herramienta IDN', () => {

  test('TC-RF-2.3-01: Convertir dominio con tilde a Punycode', async ({ page }) => {
    await page.goto(URL);

    await page.locator('#idnInput').fill('café.gt');
    await page.locator('#idnConvertBtn').click();

    await expect(page.locator('#idnOutput')).toHaveValue('xn--caf-dma.gt');

    await page.screenshot({ path: 'evidencias/RF-2.3/TC-01-tilde.png', fullPage: true });
  });

  test('TC-RF-2.3-02: Convertir dominio con ñ a Punycode', async ({ page }) => {
    await page.goto(URL);

    await page.locator('#idnInput').fill('niño.gt');
    await page.locator('#idnConvertBtn').click();

    await expect(page.locator('#idnOutput')).toHaveValue('xn--nio-8ma.gt');

    await page.screenshot({ path: 'evidencias/RF-2.3/TC-02-enie.png', fullPage: true });
  });

  test('TC-RF-2.3-03: Convertir dominio sin caracteres especiales', async ({ page }) => {
    await page.goto(URL);

    await page.locator('#idnInput').fill('hola.gt');
    await page.locator('#idnConvertBtn').click();

    // Sin caracteres especiales, el Punycode debe coincidir con el mismo texto
    await expect(page.locator('#idnOutput')).toHaveValue('hola.gt');

    await page.screenshot({ path: 'evidencias/RF-2.3/TC-03-sin-caracteres-especiales.png', fullPage: true });
  });

});
