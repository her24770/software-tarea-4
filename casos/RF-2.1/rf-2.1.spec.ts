import { expect, test, type Page } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL ?? 'https://dev2.registro.gt/';

test.use({
  ignoreHTTPSErrors: true,
});

async function cerrar_aviso(page: Page) {
   const closeBtn = page.locator('#testPageNoticeModal button', { hasText: 'Entendido' });
   try {
      await closeBtn.waitFor({ state: 'visible', timeout: 3000 });
      await closeBtn.click();
      await closeBtn.waitFor({ state: 'hidden', timeout: 3000 });
   } catch {
   }
}

async function abrirInicio(page: Page) {
  const response = await page.goto(TARGET_URL, {
    waitUntil: 'domcontentloaded',
  });
  await cerrar_aviso(page);

  expect(response, 'La navegación debe producir una respuesta HTTP').not.toBeNull();
  expect(response!.status(), 'La portada debe responder sin error HTTP').toBeLessThan(400);

  await expect(page).toHaveTitle(/Registro de dominios \.gt/i);

  await expect(
    page.getByRole('textbox', { name: 'escribe un nombre de dominio' })
  ).toBeVisible();
}

async function buscarDominio(page: Page, dominio: string) {
  const buscador = page.getByRole('textbox', {
    name: 'escribe un nombre de dominio',
  });

  await expect(buscador).toBeVisible();
  await buscador.fill(dominio);

  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
  await cerrar_aviso(page);
}

test.describe('RF-2.1 - Buscador de disponibilidad de dominios', () => {
  
  test('TC-RF-2.1-01 verifica un dominio que ya está en uso', async ({ page }) => {
    await abrirInicio(page);

    await buscarDominio(page, 'bi.com.gt');

    // El sistema actualmente muestra el dominio como disponible.
    await expect(
      page.getByRole('heading', { name: 'bi.com.gt' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'add_shopping_cart Reservar' }).first()
    ).toBeVisible();

    await page.screenshot({
      path: 'evidencias/RF-2.1/TC-RF-2.1-01-dominio-en-uso.png',
      fullPage: true,
    });
  });

  test('TC-RF-2.1-02 identifica un dominio disponible', async ({ page }) => {
    await abrirInicio(page);

    await buscarDominio(page, 'daniel987654321.gt');

    await expect(
      page.getByRole('heading', { name: 'Disponibles para registro' })
    ).toBeVisible();

    await expect(
      page.getByText('daniel987654321.gt', { exact: true })
    ).toBeVisible();

    await page.screenshot({
      path: 'evidencias/RF-2.1/TC-RF-2.1-02-disponible.png',
      fullPage: true,
    });
  });

  test('TC-RF-2.1-03 muestra un error al buscar sin ingresar un dominio', async ({ page }) => {
  await abrirInicio(page);

  const buscador = page.getByRole('textbox', {
    name: 'escribe un nombre de dominio',
  });

  await buscador.fill('');
  await page.getByRole('button', { name: 'Buscar', exact: true }).click();

  await expect(
    page.getByText('El dominio no puede estar vacío')
  ).toBeVisible();

  await page.screenshot({
    path: 'evidencias/RF-2.1/TC-RF-2.1-03-busqueda-vacia.png',
    fullPage: false,
  });
});
});