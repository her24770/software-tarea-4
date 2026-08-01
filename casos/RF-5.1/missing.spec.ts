/* Prueba cuando no existe una traducción para un texto en el idioma seleccionado, 
es decir, cuando le falta la traducción al texto. */

import { test, expect } from '@playwright/test';

test.describe('Prueba de textos faltantes', () => {
    test('Texto faltante en español', async ({ page }) => {
        await page.goto('https://dev2.registro.gt/en'); 

        // Verifica que el texto esperado esté presente en la página
        const textoEsperado = 'Inicio';
        const elemento = await page.locator(`text=${textoEsperado}`);
        await expect(elemento).toBeVisible();
    });

    test('Texto faltante en inglés', async ({ page }) => {
        await page.goto('https://dev2.registro.gt/en');

        // Verifica que el texto esperado esté presente en la página
        const textoEsperado = 'Home';
        const elemento = await page.locator(`text=${textoEsperado}`);
        await expect(elemento).toBeVisible();
    });             
})