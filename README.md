# Tarea 4 - Pruebas de caja negra de Dominios .GT

Automatización con Playwright para los casos asociados con el requisito RF-1.1.

## Ejecución

```bash
npm install
npx playwright install chromium
npm run test:rf-1.1
```

Por omisión las pruebas usan `https://dev2.registro.gt/`, una de las URLs autorizadas
en el enunciado. Puede elegirse la URL de producción sin modificar el script:

```bash
TARGET_URL=https://gt.nic.gt/ npm run test:rf-1.1
```

El informe queda en `evidencias/reporte-html/`. Cada ejecución también conserva
capturas, video y traza en `evidencias/`.
