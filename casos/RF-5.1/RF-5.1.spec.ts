import { expect, test } from '@playwright/test';

test.describe('RF-5.1', () => {

    /* Prueba cuando no existe una traducción para un texto en el idioma seleccionado, 
    es decir, cuando le falta la traducción al texto. */

	test('Texto faltante en español', async ({ page }) => {
		await page.goto('https://dev2.registro.gt/');

		await expect(page.getByRole('navigation').getByRole('link', { name: 'Inicio' })).toBeVisible();

        await page.screenshot({
            path: 'evidencias/RF-5.1/TC-01.png',
            fullPage: true,
        });
	});

    /* Prueba cuando un texto no cambia al cambiar el idioma de la página, 
    es decir, cuando un texto está hardcodeado. */

	test('Texto hardcodeado', async ({ page }) => {
		await page.goto('https://dev2.registro.gt/en');

		await expect(
			page.getByRole('heading', {
				name: 'Del legado del Ing. Luis Furlán al desarrollo de la infraestructura digital de Guatemala',
			})
		).toBeVisible();

        await page.screenshot({
            path: 'evidencias/RF-5.1/TC-02.png',
            fullPage: true,
        });
	});

    /* Prueba cuando un texto excede el tamaño máximo permitido del componente que lo contiene, 
    es decir, cuando un texto tiene overflow. */

	test('Texto con overflow', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('https://dev2.registro.gt/en');

		const article = page.getByRole('article').filter({
			has: page.getByRole('heading', {
				name: 'Del legado del Ing. Luis Furlán al desarrollo de la infraestructura digital de Guatemala',
			}),
		}).first();

		await expect(article).toBeVisible();

		const hasHorizontalOverflow = await article.evaluate((element) => {
			return element.scrollWidth > element.clientWidth;
		});

		expect(hasHorizontalOverflow).toBe(false);

        await page.screenshot({
            path: 'evidencias/RF-5.1/TC-03.png',
            fullPage: true,
        });

	});
});