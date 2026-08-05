import { test, expect, type Page } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL ?? 'https://dev2.registro.gt/';

test.use({
  ignoreHTTPSErrors: true,
});

async function abrirEstadisticas(page: Page) {
  await page.goto('https://dev2.registro.gt/');

  const checkbox = page.getByRole('checkbox', {
    name: 'No volver a mostrar este',
  });

  if (await checkbox.isVisible().catch(() => false)) {
    await checkbox.check();
  }

  const entendido = page.getByRole('button', {
    name: 'Entendido',
  });

  if (await entendido.isVisible().catch(() => false)) {
    await entendido.click();
  }

  await page.getByRole('button', {
    name: 'Enlaces de Interés',
  }).click();

  await page.getByRole('link', {
    name: 'Estadísticas',
  }).click();

  const segundoEntendido = page.getByRole('button', {
    name: 'Entendido',
  });

  if (await segundoEntendido.isVisible().catch(() => false)) {
    await segundoEntendido.click();
  }
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


    test('TC-RF-1.3-02 filtra las estadísticas por sufijo', async ({ page }) => {
      await abrirEstadisticas(page);

      const estadisticasAntes = await obtenerEstadisticas(page);

      await page.getByRole('combobox').selectOption('.com.gt');

      await page.getByRole('button', { name: 'analytics Consultar' }).click();

      await page.waitForTimeout(1000);

      const estadisticasDespues = await obtenerEstadisticas(page);

      expect(
        estadisticasDespues,
        'Las estadísticas deberían cambiar al seleccionar un sufijo específico',
      ).not.toEqual(estadisticasAntes);

      await page.screenshot({
        path: 'evidencias/RF-1.3/TC-RF-1.3-02-filtro-sufijo.png',
        fullPage: true,
      });
    });


    test('TC-RF-1.3-03 filtra las estadísticas por rango de fechas', async ({
      page,
    }) => {
      await abrirEstadisticas(page);

      const estadisticasAntes = await obtenerEstadisticas(page);

      const fechas = page.getByRole('textbox');

      await fechas.first().fill('2026-01-01');
      await fechas.first().press('Enter');

      await fechas.nth(1).fill('2026-01-31');
      await fechas.nth(1).press('Enter');

      await page.getByRole('button', { name: 'analytics Consultar' }).click();

      await page.waitForTimeout(1000);

      const estadisticasDespues = await obtenerEstadisticas(page);

      expect(
        estadisticasDespues,
        'Las estadísticas deberían cambiar al modificar el rango de fechas',
      ).not.toEqual(estadisticasAntes);

      await page.screenshot({
        path: 'evidencias/RF-1.3/TC-RF-1.3-03-filtro-fechas.png',
        fullPage: true,
      });
    });

  },
);