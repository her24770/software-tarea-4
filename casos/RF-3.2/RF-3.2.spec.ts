import {test, expect, Page} from '@playwright/test';

const URL = "https://gt.nic.gt/"
const DOMAIN_QUERY = 'prueba123'

async function cerrar_aviso(page: Page) {
   const closeBtn = page.locator('#testPageNoticeModal button', { hasText: 'Entendido' });
   try {
      await closeBtn.waitFor({ state: 'visible', timeout: 3000 });
      await closeBtn.click();
      await closeBtn.waitFor({ state: 'hidden', timeout: 3000 });
   } catch {
   }
}

async function agregarCarrito(page: Page, query: string) { //Agrega dominio al carrito y abre la pagina del carrito
   await page.goto(URL);
   await cerrar_aviso(page);

   await page.fill('#heroSearchInput', query);
   await page.getByRole('button', { name: /Buscar/i }).first().click();
   await page.waitForURL(/\/results\//);
   await cerrar_aviso(page);

   await page.locator('.reserve-btn').first().click();

   const cartLink = page.locator('a').filter({ hasText: 'shopping_cart' }).first();
   await cartLink.click();
   await page.waitForURL(/\/cart\//);
   await cerrar_aviso(page);
}

function get_login_prompt(page: Page) {
   return page.getByRole('heading', { name: 'Inicia sesión para continuar' });
}

test.describe('RF-3.2 - Login requerido para finalizar la compra', () => {
   //RF-3.2-01: El carrito exige iniciar sesion para continuar con la compra
   test('TC-01 - Carrito muestra aviso de inicio de sesion en lugar de finalizar compra', async ({page}) => {
      await agregarCarrito(page, DOMAIN_QUERY);

      await expect(get_login_prompt(page)).toBeVisible();

      await page.screenshot({ path: 'evidencias/RF-3.2/TC-01-login-required-prompt.png', fullPage: true });
   });

   //RF-3.2-02: El boton para completar la compra no esta disponible sin sesion iniciada
   test('TC-02 - Boton de compra no esta disponible sin iniciar sesion', async ({page}) => {
      await agregarCarrito(page, DOMAIN_QUERY);

      const checkoutBtn = page.locator('#checkout-btn');
      await expect(checkoutBtn).toBeHidden();

      await page.screenshot({ path: 'evidencias/RF-3.2/TC-02-checkout-button-hidden.png', fullPage: true });
   });

   //RF-3.2-03: El boton "Iniciar Sesion" del carrito envia al usuario a autenticarse antes de poder pagar
   test('TC-03 - "Iniciar Sesion" envia al usuario a autenticarse antes de poder pagar', async ({page}) => {
      await agregarCarrito(page, DOMAIN_QUERY);

      const loginBtn = page.locator('a:visible, button:visible').filter({ hasText: 'Iniciar Sesión' }).first();
      await loginBtn.click();

      await expect(page).toHaveURL(/\/login\//);
      const emailInput = page.locator('input[type="email"]:visible').first();
      await expect(emailInput).toBeVisible();

      await page.screenshot({ path: 'evidencias/RF-3.2/TC-03-redirect-to-login.png', fullPage: true });
   });
});
