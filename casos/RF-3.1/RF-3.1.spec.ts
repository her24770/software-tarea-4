import {test, expect, Page} from '@playwright/test';

const URL = "https://gt.nic.gt/"
const DOMAIN_QUERY = 'prueba123'
const EXPECTED_DOMAIN = 'prueba123.com.gt'

async function search_domain(page: Page, query: string) {
   await page.goto(URL);
   await page.fill('#heroSearchInput', query);
   await page.getByRole('button', { name: /Buscar/i }).first().click();
   await page.waitForURL(/\/results\//);
}

function get_cart_badge(page: Page) {
   return page.locator('a').filter({ hasText: 'shopping_cart' }).first();
}

async function get_cart_from_storage(page: Page) {
   const raw = await page.evaluate(() => localStorage.getItem('domain-cart'));
   return raw ? JSON.parse(raw) : [];
}

test.describe('RF-3.1 - Carrito sin iniciar sesion', () => {
   //RF-3.1-01: El sistema permite agregar un dominio disponible al carrito sin iniciar sesion
   test('TC-01 - Agregar dominio disponible al carrito', async ({page}) => {
      await search_domain(page, DOMAIN_QUERY);

      const reserveBtn = page.locator('.reserve-btn').first();
      await reserveBtn.click();

      const badge = get_cart_badge(page);
      await expect(badge).toContainText('1');

      await page.screenshot({ path: 'evidencias/RF-3.1/TC-01-add-domain-to-cart.png', fullPage: true });
   });

   //RF-3.1-02: El dominio agregado se guarda en el localStorage del navegador
   test('TC-02 - El carrito se persiste en el localStorage', async ({page}) => {
      await search_domain(page, DOMAIN_QUERY);

      const emptyCart = await get_cart_from_storage(page);
      expect(emptyCart).toHaveLength(0);

      const reserveBtn = page.locator('.reserve-btn').first();
      await reserveBtn.click();
      await expect(get_cart_badge(page)).toContainText('1');

      const cart = await get_cart_from_storage(page);
      expect(cart).toHaveLength(1);
      expect(cart[0].domain).toBe(EXPECTED_DOMAIN);

      await page.screenshot({ path: 'evidencias/RF-3.1/TC-02-cart-in-localstorage.png', fullPage: true });
   });

   //RF-3.1-03: El carrito persiste luego de recargar la pagina, sin necesidad de iniciar sesion
   test('TC-03 - El carrito persiste luego de recargar la pagina, sin necesidad de iniciar sesion', async ({page}) => {
      await search_domain(page, DOMAIN_QUERY);

      const reserveBtn = page.locator('.reserve-btn').first();
      await reserveBtn.click();
      await expect(get_cart_badge(page)).toContainText('1');

      await page.reload();

      const cartAfterReload = await get_cart_from_storage(page);
      expect(cartAfterReload).toHaveLength(1);
      expect(cartAfterReload[0].domain).toBe(EXPECTED_DOMAIN);
      await expect(get_cart_badge(page)).toContainText('1');

      // No debe existir sesion iniciada: no hay redireccion a una pantalla de login tras recargar
      await expect(page).toHaveURL(/\/results\//);

      await page.screenshot({ path: 'evidencias/RF-3.1/TC-03-cart-persists-after-reload.png', fullPage: true });
   });
});
