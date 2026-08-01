# RF-1.2 - Resumen de las últimas publicaciones

**Requisito:** El sistema debe mostrar un resumen (título, fecha y extracto) de las últimas 3 publicaciones de la sección de noticias de `news.registro.gt`.

**Entorno evaluado:** `https://gt.nic.gt/`

**Fecha de ejecución:** 31 de julio de 2026.

**Resultado global:** 3 de 3 casos aprobados.

---

## TC-RF-1.2-01 - Se muestran las últimas tres publicaciones

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-1.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://gt.nic.gt/`. |
| Pasos realizados | 1. Abrir la página principal. 2. Localizar la sección **Novedades y noticias**. 3. Contar los artículos (`article`) mostrados en la sección. |
| Resultado esperado | La sección muestra exactamente tres publicaciones. |
| Resultado obtenido | **Aprobado.** Se localizaron exactamente tres artículos en la sección de noticias. |
| Evidencia | `./evidencias/RF-1.2/TC-01-has-3-news.png` |

---

## TC-RF-1.2-02 - Cada publicación presenta título, fecha y descripción

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-1.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://gt.nic.gt/`. |
| Pasos realizados | 1. Abrir la página principal. 2. Localizar la sección **Novedades y noticias**. 3. Recorrer cada artículo mostrado. 4. Verificar que cada publicación contiene un título (`h3`), una fecha y una descripción visibles. |
| Resultado esperado | Cada una de las tres publicaciones presenta un título, una fecha y un extracto visibles para el usuario. |
| Resultado obtenido | **Aprobado.** Las tres publicaciones mostraron correctamente un título, una fecha y una descripción visibles. |
| Evidencia | `./evidencias/RF-1.2/TC-02-each-news-has-title-date-and-description.png` |

---

## TC-RF-1.2-03 - Cada publicación presenta un control para acceder a más información

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-1.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://gt.nic.gt/`. |
| Pasos realizados | 1. Abrir la página principal. 2. Localizar la sección **Novedades y noticias**. 3. Recorrer cada publicación. 4. Verificar que cada artículo contiene exactamente un control (`<a>` o `<button>`) identificado con el texto **"See more"** o **"Ver más"**. |
| Resultado esperado | Cada publicación presenta un control visible que permite al usuario acceder a información adicional de la noticia. |
| Resultado obtenido | **Aprobado.** Las tres publicaciones contienen un único control visible con el texto **"See more..."**, utilizado para ampliar la información de la noticia. |
| Evidencia | `./evidencias/RF-1.2/TC-03-each-news-has-see-more-control.png` |