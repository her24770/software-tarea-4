import { expect, test, type Page } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL ?? 'https://dev2.registro.gt/';

async function abrirInicio(page: Page) {
  const response = await page.goto(TARGET_URL, { waitUntil: 'commit' });

  expect(response, 'La navegación debe producir una respuesta HTTP').not.toBeNull();
  expect(response!.status(), 'La portada debe responder sin error HTTP').toBeLessThan(400);

  await expect(page).toHaveTitle(/Registro de dominios \.gt/i);
}

async function buscarDominio(page: Page, dominio: string) {
  await page
    .getByPlaceholder('escribe un nombre de dominio')
    .fill(dominio);

  await page.getByRole('button', { name: 'Buscar', exact: true }).click();
}

test.describe('RF-2.1 - Buscador de disponibilidad de dominios', () => {
  test('TC-RF-2.1-01 identifica un dominio registrado', async ({ page }) => {
    await abrirInicio(page);

    await buscarDominio(page, 'dominios.gt');

    await expect(
      page.getByRole('heading', { name: 'Registrados' })
    ).toBeVisible();

    await expect(
      page.getByText('dominios.gt', { exact: true })
    ).toBeVisible();

    await page.screenshot({
      path: 'evidencias/RF-2.1/TC-RF-2.1-01-registrado.png',
      fullPage: true,
    });
  });

    test('TC-RF-2.1-02 identifica un dominio disponible', async ({ page }) => {
    await abrirInicio(page);

    await buscarDominio(page, 'daniel987654321.gt');

    await expect(
      page.getByRole('heading', { name: 'Disponibles' })
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

    await page.getByRole('button', { name: 'Buscar', exact: true }).click();

    await expect(
      page.getByText('Error en la consulta', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText(
        'La longitud mínima del nombre de dominio es de 1 elemento.',
        { exact: true }
      )
    ).toBeVisible();

    await page.screenshot({
      path: 'evidencias/RF-2.1/TC-RF-2.1-03-busqueda-vacia.png',
      fullPage: false,
    });
  });
});