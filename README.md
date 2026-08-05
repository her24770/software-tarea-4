# Tarea 4 - Pruebas de caja negra de Dominios .GT

Automatización con Playwright de los casos de prueba de caja negra sobre la landing page
del sistema de registro de Dominios .GT, sin acceso al código fuente.

## Instalación

```bash
npm install
npx playwright install chromium
```

## Ejecutar todos los casos

```bash
npm test
```

Corre todos los `*.spec.ts` dentro de `casos/` (uno por requisito funcional). El reporte
HTML queda en `evidencias/reporte-html/` y se abre con:

```bash
npm run report
```

Cada ejecución también conserva capturas, video y traza por caso en `evidencias/`.

## Ejecutar un requisito individual

```bash
npx playwright test casos/RF-1.1/rf-1.1.spec.ts --project=chromium
npx playwright test casos/RF-1.2/RF-1.2.spec.ts --project=chromium
npx playwright test casos/RF-2.1/rf-2.1.spec.ts --project=chromium
npx playwright test casos/RF-2.3/RF-2.3.spec.ts --project=chromium
npx playwright test casos/RF-3.1/RF-3.1.spec.ts --project=chromium
npx playwright test casos/RF-4.2/RF-4.2.spec.ts --project=chromium
npx playwright test casos/RF-5.1/RF-5.1.spec.ts --project=chromium
```

Agregar `--headed` a cualquiera de estos comandos para ver el navegador mientras corre.

## URL objetivo

Algunos casos leen la variable de entorno `TARGET_URL` para elegir el sitio (por omisión
usan `https://dev2.registro.gt/`, una de las URLs autorizadas en el enunciado):

```bash
TARGET_URL=https://gt.nic.gt/ npx playwright test casos/RF-1.1/rf-1.1.spec.ts --project=chromium
```

Esto aplica a **RF-1.1, RF-2.1 y RF-2.3**. Los casos de **RF-1.2, RF-3.1 y RF-5.1** tienen
la URL escrita directamente en el `.spec.ts`, por lo que `TARGET_URL` no los afecta.

## Problema conocido: RF-1.2 y RF-3.1 fallan actualmente

`RF-1.2.spec.ts` y `RF-3.1.spec.ts` apuntan a `https://gt.nic.gt/`. Esa URL ahora redirige
a `https://www.gt/sitio/`, una página distinta que ya no tiene la sección de noticias ni el
buscador que esas pruebas esperaban, por lo que ambos casos truenan por timeout. No es un
error de las pruebas en sí: el sitio de producción cambió de estructura después de que se
escribieron. Mientras no se actualicen a `https://dev2.registro.gt/` (la otra URL
autorizada, que sigue funcionando), esos dos requisitos van a fallar al correr el suite
completo.

## Cobertura de requisitos

| RF | Descripción | Estado |
|---|---|---|
| RF-1.1 | Información principal en la página de inicio | ✅ Hecho |
| RF-1.2 | Resumen de últimas 3 publicaciones de noticias | ✅ Hecho (falla por cambio en `gt.nic.gt`, ver arriba) |
| RF-1.3 | Estadísticas de dominios por subdominio | ⬜ Pendiente |
| RF-2.1 | Buscador de disponibilidad de dominios | ✅ Hecho |
| RF-2.2 | Información WHOIS de dominios registrados | ⬜ Pendiente |
| RF-2.3 | Herramienta IDN (Punycode) | ✅ Hecho |
| RF-3.1 | Carrito sin iniciar sesión (localStorage) | ✅ Hecho (falla por cambio en `gt.nic.gt`, ver arriba) |
| RF-3.2 | Requiere sesión para finalizar la compra | ⬜ Pendiente |
| RF-4.1 | Renovación de dominio sin sesión | ⬜ Pendiente |
| RF-4.2 | Pago de renovación y notificación a contactos | ✅ Hecho |
| RF-5.1 | Alternar idioma español/inglés | ✅ Hecho |

## Documentación de los casos

Cada carpeta `casos/RF-X.Y/` incluye el `.spec.ts` y un `.md` con la tabla de
documentación (requisito, herramienta, precondiciones, pasos, resultado esperado/obtenido
y evidencia) de sus 3 casos de prueba.
