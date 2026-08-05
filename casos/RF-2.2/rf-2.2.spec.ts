import { expect, test, type Page } from '@playwright/test';

const TARGET_URL = (process.env.TARGET_URL ?? 'https://dev2.registro.gt').replace(/\/$/, '');

async function abrir(page: Page, ruta: string) {
  const response = await page.goto(`${TARGET_URL}${ruta}`, { waitUntil: 'commit' });

  expect(response, 'La navegación debe producir una respuesta HTTP').not.toBeNull();
  expect(response!.status(), 'La página debe responder sin error HTTP').toBeLessThan(400);
}

async function buscarDesdeInicio(page: Page, dominio: string) {
  await abrir(page, '/');
  const buscador = page.getByPlaceholder('escribe un nombre de dominio');
  await expect(buscador).toBeVisible();
  await buscador.fill(dominio);
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`/results/?\\?q=${dominio}$`, 'i'));
}

async function cerrarAvisoDePruebas(page: Page) {
  const modal = page.locator('#testPageNoticeModal');
  const entendido = page.getByRole('button', { name: 'Entendido', exact: true });
  const cerrado = await entendido.click({ timeout: 5_000 }).then(() => true).catch(() => false);
  if (cerrado) await expect(modal).toBeHidden();
}

test.describe('RF-2.2 - Información WHOIS de dominios registrados', () => {
  test('TC-RF-2.2-01 ofrece el detalle WHOIS para un dominio registrado', async ({ page }) => {
    await buscarDesdeInicio(page, 'google');

    const registrados = page.locator('#registeredDomainsContainer');
    await expect(registrados.getByRole('heading', { name: 'google.gt', exact: true })).toBeVisible();
    await expect(registrados.getByText('No disponible', { exact: true })).toBeVisible();
    await expect(registrados.getByRole('link', { name: /Ver detalles/i })).toBeVisible();
    await cerrarAvisoDePruebas(page);

    await page.screenshot({
      path: 'evidencias/RF-2.2/TC-RF-2.2-01-dominio-registrado.png',
      fullPage: false,
    });
  });

  test('TC-RF-2.2-02 muestra estado, vencimiento y tarifa en WHOIS', async ({ page }) => {
    await abrir(page, '/results/?q=google.gt');

    const enlaceWhois = page
      .locator('#registeredDomainsContainer')
      .getByRole('link', { name: /Ver detalles/i });
    await expect(enlaceWhois).toBeVisible();
    await cerrarAvisoDePruebas(page);
    await enlaceWhois.click();
    await expect(page).toHaveURL(/\/whois\/?\?q=google\.gt$/i);
    await cerrarAvisoDePruebas(page);

    await expect(page.locator('#domainNameDisplay')).toHaveText('google.gt');
    await expect(page.locator('#domainStatusDisplay')).toHaveText('ACTIVO');
    await expect(page.locator('#expirationDateDisplay')).toHaveText(/^\d{4}-[A-Z][a-z]{2}-\d{2}$/);
    await expect(page.locator('#expirationTimeDisplay')).toHaveText(/^\d{2}:\d{2}:\d{2}$/);
    await expect(page.locator('#annualFeeDisplay')).toHaveText('$ 40.00');
    await expect(page.locator('#currencyDisplay')).toHaveText('USD');

    await page.screenshot({
      path: 'evidencias/RF-2.2/TC-RF-2.2-02-datos-whois.png',
      fullPage: false,
    });
  });

  test('TC-RF-2.2-03 muestra organización, DNS y tipos de contacto', async ({ page }) => {
    await abrir(page, '/whois?q=galileo.edu.gt');

    await expect(page.locator('#domainNameDisplay')).toHaveText('galileo.edu.gt');
    await cerrarAvisoDePruebas(page);
    await expect(page.locator('#orgNameDisplay')).toHaveText('Universidad Galileo');
    await expect(page.locator('#orgCountryDisplay')).toContainText('Guatemala');

    const nameservers = page.locator('#nameserversContainer');
    await expect(nameservers.getByText('ns1.galileo.edu.', { exact: true })).toBeVisible();
    await expect(nameservers.getByText('ns2.galileo.edu.', { exact: true })).toBeVisible();

    const contactos = page.locator('#contactsContainer');
    await expect(contactos.getByRole('heading', { name: 'Contacto Administrativo' })).toBeVisible();
    await expect(contactos.getByRole('heading', { name: 'Contacto Técnico' })).toBeVisible();

    await nameservers.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: 'evidencias/RF-2.2/TC-RF-2.2-03-organizacion-dns.png',
      fullPage: false,
    });
  });
});
