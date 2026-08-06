import { test, expect, type Page } from '@playwright/test';

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

async function abrirEstadisticas(page: Page) {
  await page.goto(TARGET_URL);
  await cerrar_aviso(page);

  await page.getByRole('button', {
    name: 'Enlaces de Interés',
  }).click();
  
  await page.getByRole('link', {
    name: 'Estadísticas',
  }).click();
  
  await cerrar_aviso(page);
}

async function obtenerEstadisticas(page: Page) {
  return {
    total: await page.getByText('Total de Dominios').locator('..').innerText(),
    nuevos: await page.getByText('Dominios Nuevos').locator('..').innerText(),
    eliminados: await page.getByText('Dominios Eliminados').locator('..').innerText(),
  };
}

test.describe(
  'RF-1.3 - Estadísticas de dominios por subdominio y rango de fechas',
  () => {

    test('TC-RF-1.3-01 muestra las estadísticas de dominios por subdominio', async ({
      page,
    }) => {
      await abrirEstadisticas(page);

      await expect(page.getByText('Total de Dominios')).toBeVisible();
      await expect(page.getByText('Dominios Nuevos')).toBeVisible();
      await expect(page.getByText('Dominios Eliminados')).toBeVisible();

      await expect(page.locator('#suffixChart')).toBeVisible();
      await expect(page.locator('#statusChart')).toBeVisible();

      await expect(
        page.getByText('Desglose Detallado de Registros'),
      ).toBeVisible();

      await expect(
        page.getByRole('cell', { name: '.com.gt', exact: true })
        ).toBeVisible();

        await expect(
        page.getByRole('cell', { name: '.gt', exact: true })
        ).toBeVisible();

        await expect(
        page.getByRole('cell', { name: '.edu.gt', exact: true })
        ).toBeVisible();

        await expect(
        page.getByRole('cell', { name: '.org.gt', exact: true })
        ).toBeVisible();

      await page.screenshot({
        path: 'evidencias/RF-1.3/TC-RF-1.3-01-estadisticas.png',
        fullPage: true,
      });
    });


    test('TC-RF-1.3-02 muestra los controles para filtrar estadísticas', async ({ page }) => {
      await abrirEstadisticas(page);

      // Labels de fechas
      await expect(page.getByText('Fecha Inicial')).toBeVisible();
      await expect(page.getByText('Fecha Final')).toBeVisible();

      const fechas = page.locator('input[type="date"]');
      await expect(fechas).toHaveCount(2);

      // Selector de sufijo
      const sufijo = page.locator('select');
      await expect(sufijo).toBeVisible();

      const opciones = sufijo.locator('option');
      await expect(opciones.first()).toHaveText('Todos los sufijos');

      // Botón
      await expect(
        page.getByRole('button', { name: /Consultar/i })
      ).toBeVisible();
      
      await page.screenshot({
        path: 'evidencias/RF-1.3/TC-RF-1.3-02-controles-filtrado.png',
        fullPage: true,
      });
    });


    test('TC-RF-1.3-03 permite ingresar criterios de filtrado', async ({ page }) => {
      await abrirEstadisticas(page);

      const fechas = page.locator('input[type="date"]');

      // Fecha inicial
      await fechas.first().fill('2026-01-01');
      await expect(fechas.first()).toHaveValue('2026-01-01');

      // Fecha final
      await fechas.nth(1).fill('2026-01-31');
      await expect(fechas.nth(1)).toHaveValue('2026-01-31');

      // Cambio de sufijo
      const sufijo = page.locator('select');

      await sufijo.selectOption('.com.gt');
      await expect(sufijo).toHaveValue('.com.gt');

      // El botón sigue disponible después de ingresar datos
      await expect(
        page.getByRole('button', { name: /Consultar/i })
      ).toBeEnabled();

      await page.screenshot({
        path: 'evidencias/RF-1.3/TC-RF-1.3-03-ingreso-datos.png',
        fullPage: true,
      });
    });

  },
);