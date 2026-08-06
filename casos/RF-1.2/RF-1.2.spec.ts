import {test, expect, Page} from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL ?? 'https://dev2.registro.gt/';

async function cerrar_aviso(page: Page) {
   const closeBtn = page.locator('#testPageNoticeModal button', { hasText: 'Entendido' });
   try {
      await closeBtn.waitFor({ state: 'visible', timeout: 3000 });
      await closeBtn.click();
      await closeBtn.waitFor({ state: 'hidden', timeout: 3000 });
   } catch {
   }
}

async function get_section_noticias(page:Page){
   return page.locator('section').filter({
      has: page.getByRole("heading", {name: /Novedades y noticias|News and Updates/i})
   })
}

test.describe('RF-1.2 - Sección de noticias', () => {
   //RF-1.2-01: Existen 3 publicaciones de la sección noticias de news.registro.gt
   test('TC-01 - has 3 news', async ({page}) => {
   await page.goto(TARGET_URL);

   await cerrar_aviso(page);
   
   const section_noticias = await get_section_noticias(page);
   const articulos = section_noticias.locator('article');
   await expect(articulos).toHaveCount(3)

   await section_noticias.screenshot({path: 'evidencias/RF-1.2/TC-01-has-3-news.png'})
   });


   //RF-1.2-02: Las publicaciones se componen de título, fecha y una breve descripción
   test('TC-02 - Each news has title, date and description', async ({page}) => {
   await page.goto(TARGET_URL);

   await cerrar_aviso(page);   
   
   const section_noticias = await get_section_noticias(page);

   const articulos = section_noticias.locator('article');
   const cant_articulos = await articulos.count();

   for (let i = 0; i < cant_articulos; i++) {
      const articulo = articulos.nth(i);
      const titulo = articulo.locator('h3');
      const fecha = articulo.locator('p').first();
      const descripcion = articulo.locator('p').last();
      await expect(titulo).toBeVisible()
      await expect(fecha).toBeVisible()
      await expect(descripcion).toBeVisible()
   }

   await section_noticias.screenshot({path: 'evidencias/RF-1.2/TC-02-each-news-has-title-date-and-description.png'})
   });

   //RF-1.2-03: Cada articulo tiene un elemento para acceder a más información
   test('TC-03 - Each news has a "See more" control', async ({ page }) => {
    await page.goto(TARGET_URL);

    await cerrar_aviso(page);   
    
    const section_noticias = await get_section_noticias(page);

    const articulos = section_noticias.locator('article');
    const cant_articulos = await articulos.count();

    for (let i = 0; i < cant_articulos; i++) {
        const control = articulos.nth(i).locator('a, button');

        await expect(control).toHaveCount(1);
        await expect(control).toBeVisible();
        await expect(control).toHaveText(/See more|Ver más/i);
    }

    await section_noticias.screenshot({path: 'evidencias/RF-1.2/TC-03-each-news-has-see-more-control.png'})
});
   
});