import { expect, test, type Page } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL ?? 'https://dev2.registro.gt/';

async function abrirInicio(page: Page) {
  // La portada carga recursos externos de forma variable. Esperamos la respuesta
  // principal y dejamos que las aserciones web determinen cuándo el DOM está listo.
  const response = await page.goto(TARGET_URL, { waitUntil: 'commit' });

  expect(response, 'La navegación debe producir una respuesta HTTP').not.toBeNull();
  expect(response!.status(), 'La portada debe responder sin error HTTP').toBeLessThan(400);
  await expect(page).toHaveTitle(/Registro de dominios \.gt/i);
}

test.describe('RF-1.1 - Información principal del registro de dominios', () => {
  test('TC-RF-1.1-01 muestra la propuesta del servicio y el buscador', async ({ page }) => {
    await abrirInicio(page);

    await expect(page.getByText('Registra tu dominio .gt hoy mismo.', { exact: true })).toBeVisible();
    await expect(
      page.getByPlaceholder('escribe un nombre de dominio'),
      'El usuario debe poder identificar dónde consultar un dominio',
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Buscar', exact: true })).toBeVisible();

    await page.screenshot({
      path: 'evidencias/RF-1.1/TC-RF-1.1-01-portada.png',
      fullPage: false,
    });
  });

  test('TC-RF-1.1-02 muestra beneficios, tipos y pasos de registro', async ({ page }) => {
    await abrirInicio(page);

    const secciones = [
      page.getByRole('heading', { name: /Beneficios de Dominios/i }),
      page.getByRole('heading', { name: 'Tipos de Dominios Disponibles' }),
      page.getByRole('heading', { name: 'Pasos para Registrar tu Dominio' }),
    ];

    for (const seccion of secciones) {
      await seccion.scrollIntoViewIfNeeded();
      await expect(seccion).toBeVisible();
    }

    await expect(page.getByRole('heading', { name: 'Identidad Nacional' })).toBeVisible();
    await expect(page.getByText('Dominio de nivel superior directo. Corto y memorable.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Verificar Disponibilidad' })).toBeVisible();

    await page.screenshot({
      path: 'evidencias/RF-1.1/TC-RF-1.1-02-informacion.png',
      fullPage: true,
    });
  });

  test('TC-RF-1.1-03 conserva la información principal en vista móvil', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await abrirInicio(page);

    await expect(page.getByText('Registra tu dominio .gt hoy mismo.', { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('escribe un nombre de dominio')).toBeVisible();

    const pasos = page.getByRole('heading', { name: 'Pasos para Registrar tu Dominio' });
    await pasos.scrollIntoViewIfNeeded();
    await expect(pasos).toBeVisible();

    const tieneDesbordeHorizontal = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(tieneDesbordeHorizontal, 'La portada no debe desbordarse horizontalmente').toBe(false);

    await page.screenshot({
      path: 'evidencias/RF-1.1/TC-RF-1.1-03-movil.png',
      fullPage: true,
    });
  });
});
