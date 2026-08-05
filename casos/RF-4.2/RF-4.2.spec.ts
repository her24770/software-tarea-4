import { expect, test, type Page } from '@playwright/test';

const TARGET_URL = 'https://dev2.registro.gt/whois/?q=uvg.edu.gt';
const DOMAIN = 'uvg.edu.gt';

async function abrirDominioSinSesion(page: Page) {
  await page.addInitScript(() => {
    localStorage.removeItem('current_user');
    localStorage.setItem('test_page_modal_dismissed', 'true');
  });

  const response = await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  expect(response, 'La consulta debe producir una respuesta HTTP').not.toBeNull();
  expect(response!.status(), 'La consulta debe responder sin error HTTP').toBeLessThan(400);
  await expect(page.locator('#domain-content')).toBeVisible();
}

test.describe('RF-4.2 - Pago de renovación y notificación a contactos', () => {
  test('TC-RF-4.2-01 muestra la tarifa de renovación y el botón de pago habilitado', async ({ page }) => {
    await abrirDominioSinSesion(page);

    await expect(page.locator('#domainNameDisplay')).toHaveText(DOMAIN);
    await expect(page.getByText('Renovación Rápida')).toBeVisible();
    await expect(page.locator('#annualFeeDisplay')).toHaveText(/^\$ \d+\.\d{2}$/);
    await expect(page.getByRole('button', { name: /Pagar Ahora/i })).toBeEnabled();

    await page.screenshot({
      path: 'evidencias/RF-4.2/TC-01-pantalla-renovacion.png',
      fullPage: true,
    });
  });

  test('TC-RF-4.2-02 al presionar Pagar Ahora no se inicia ningún flujo de pago observable', async ({ page }) => {
    await abrirDominioSinSesion(page);

    const urlInicial = page.url();

    const boton = page.getByRole('button', { name: /Pagar Ahora/i });
    await boton.scrollIntoViewIfNeeded();
    await boton.click();
    await page.waitForTimeout(2000);

    // Comportamiento actual observado: se cargan recursos de Google Sign-In en segundo
    // plano, pero no se muestra ningún modal de inicio de sesión ni formulario de pago.
    await expect(page).toHaveURL(urlInicial);
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await page.screenshot({
      path: 'evidencias/RF-4.2/TC-02-pagar-ahora-sin-efecto.png',
      fullPage: true,
    });
  });
});
