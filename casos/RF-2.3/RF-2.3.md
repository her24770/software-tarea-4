# RF-2.3 - Herramienta IDN (traducción a Punycode y viceversa)

**Requisito:** El sistema debe incluir una herramienta IDN para traducir nombres con caracteres especiales a Punycode y viceversa.

**Entorno evaluado:** `https://dev2.registro.gt/idn`

**Fecha de ejecución:** 31 de julio de 2026.

**Resultado global:** 3 de 3 casos aprobados.

---

## TC-RF-2.3-01 - Convertir dominio con tilde a Punycode

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-2.3 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://dev2.registro.gt/idn`. |
| Pasos realizados | 1. Abrir la página de la herramienta IDN. 2. Escribir `café.gt` en el campo "Nombre de dominio (español)". 3. Presionar el botón **Convertir**. 4. Leer el valor del campo "Punycode (xn--)". |
| Resultado esperado | El campo Punycode muestra `xn--caf-dma.gt`. |
| Resultado obtenido | **Aprobado.** El campo Punycode mostró `xn--caf-dma.gt`. |
| Evidencia | `./evidencias/RF-2.3/TC-01-tilde.png` |

---

## TC-RF-2.3-02 - Convertir dominio con ñ a Punycode

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-2.3 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://dev2.registro.gt/idn`. |
| Pasos realizados | 1. Abrir la página de la herramienta IDN. 2. Escribir `niño.gt` en el campo "Nombre de dominio (español)". 3. Presionar el botón **Convertir**. 4. Leer el valor del campo "Punycode (xn--)". |
| Resultado esperado | El campo Punycode muestra `xn--nio-8ma.gt`. |
| Resultado obtenido | **Aprobado.** El campo Punycode mostró `xn--nio-8ma.gt`. |
| Evidencia | `./evidencias/RF-2.3/TC-02-enie.png` |

---

## TC-RF-2.3-03 - Convertir dominio sin caracteres especiales

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-2.3 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://dev2.registro.gt/idn`. |
| Pasos realizados | 1. Abrir la página de la herramienta IDN. 2. Escribir `hola.gt` (sin tildes, ñ ni diéresis) en el campo "Nombre de dominio (español)". 3. Presionar el botón **Convertir**. 4. Leer el valor del campo "Punycode (xn--)". |
| Resultado esperado | Al no tener caracteres especiales, el dominio no requiere codificación Punycode: el campo Punycode muestra el mismo valor `hola.gt`. |
| Resultado obtenido | **Aprobado.** El campo Punycode mostró `hola.gt`, sin agregar el prefijo `xn--`. |
| Evidencia | `./evidencias/RF-2.3/TC-03-sin-caracteres-especiales.png` |
