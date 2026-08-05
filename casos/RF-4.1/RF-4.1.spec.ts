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

    test.describe('RF-4.1: Búsqueda y renovación de dominio sin iniciar sesión', () => {
    test('RF-4.1-01: muestra la información del dominio existente consultado', async ({ page }) => {
        await abrirDominioSinSesion(page);

        await expect(page.locator('#domainNameDisplay')).toHaveText(DOMAIN);
        await expect(page.locator('#domainStatusDisplay')).toHaveText('ACTIVO');
        await expect(page.getByRole('heading', { name: 'Organización Titular' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Servidores' })).toBeVisible();
    });

    test('RF-4.1-02: ofrece la renovación con su vencimiento y tarifa anual', async ({ page }) => {
        await abrirDominioSinSesion(page);

        await expect(page.getByText('Expiración', { exact: true })).toBeVisible();
        await expect(page.locator('#expirationDateDisplay')).not.toBeEmpty();
        await expect(page.locator('#annualFeeDisplay')).toHaveText(/^\$ \d+\.\d{2}$/);
        await expect(page.getByRole('button', { name: /Pagar Ahora/i })).toBeEnabled();
    });

    test('RF-4.1-03: inicia la renovación sin solicitar inicio de sesión', async ({ page, context }) => {
        await abrirDominioSinSesion(page);

        expect(await page.evaluate(() => localStorage.getItem('current_user'))).toBeNull();

        const urlInicial = page.url();
        const contenidoInicial = await page.locator('#domain-content').innerHTML();
        const paginasIniciales = context.pages().length;

        await page.getByRole('button', { name: /Pagar Ahora/i }).click();

        await expect(page.getByRole('dialog', { name: 'Iniciar sesión' })).toBeHidden();
        await expect
        .poll(
            async () =>
            page.url() !== urlInicial ||
            context.pages().length > paginasIniciales ||
            (await page.locator('#domain-content').innerHTML()) !== contenidoInicial,
            { message: 'Pagar Ahora debe iniciar un flujo de renovación observable' },
        )
        .toBe(true);
    });
});
