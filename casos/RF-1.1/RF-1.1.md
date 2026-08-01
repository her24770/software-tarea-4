# RF-1.1 - Información principal del servicio

Requisito: **El sistema debe mostrar la información principal del servicio de registro de dominios en la página de inicio.**

Entorno evaluado: `https://dev2.registro.gt/`, URL autorizada por el PDF de la tarea.

Fecha de ejecución: **31 de julio de 2026**. Resultado global: **3 de 3 casos aprobados**.

## TC-RF-1.1-01 - Propuesta del servicio y buscador

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-1.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; conexión al sitio de desarrollo. |
| Pasos realizados | 1. Abrir la página de inicio. 2. Verificar una respuesta HTTP sin error y el título de la pestaña. 3. Verificar el mensaje principal del servicio. 4. Verificar que el campo para escribir el dominio y el botón **Buscar** sean visibles. |
| Resultado esperado | La portada identifica el servicio de registro .gt y presenta de forma visible el acceso a la búsqueda de dominios. |
| Resultado obtenido | **Aprobado.** La portada respondió sin error HTTP y mostró el título **Registro de dominios .gt**, el mensaje **Registra tu dominio .gt hoy mismo.**, el campo de dominio y el botón **Buscar**. |
| Evidencia | `./evidencias/TC-RF-1.1-01-portada.png` |

## TC-RF-1.1-02 - Información para conocer y contratar el servicio

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-1.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; conexión al sitio de desarrollo. |
| Pasos realizados | 1. Abrir la página de inicio. 2. Desplazarse a **Beneficios de Dominios**. 3. Verificar el beneficio **Identidad Nacional**. 4. Desplazarse a **Tipos de Dominios Disponibles** y comprobar la descripción de `.gt`. 5. Desplazarse a **Pasos para Registrar tu Dominio** y comprobar **Verificar Disponibilidad**. |
| Resultado esperado | La portada muestra beneficios, tipos de dominio y orientación básica del proceso de registro. |
| Resultado obtenido | **Aprobado.** Se visualizaron las tres secciones y sus datos de control: **Identidad Nacional**, la descripción del dominio `.gt` y el paso **Verificar Disponibilidad**. |
| Evidencia | `./evidencias/TC-RF-1.1-02-informacion.png`|

## TC-RF-1.1-03 - Contenido principal en vista móvil

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-1.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, vista de 390 x 844 px, automatizado |
| Precondiciones | Navegador sin sesión iniciada; conexión al sitio de desarrollo. |
| Pasos realizados | 1. Configurar una vista móvil de 390 x 844 px. 2. Abrir la portada. 3. Verificar el mensaje principal y el buscador. 4. Desplazarse hasta **Pasos para Registrar tu Dominio**. 5. Verificar que no exista desbordamiento horizontal. |
| Resultado esperado | La información principal permanece visible y utilizable en una pantalla móvil, sin contenido fuera del ancho de la página. |
| Resultado obtenido | **Aprobado.** En 390 x 844 px permanecieron visibles el mensaje, el buscador y los pasos de registro. La medición `scrollWidth > innerWidth` resultó falsa, por lo que no hubo desbordamiento horizontal. |
| Evidencia | `./evidencias/TC-RF-1.1-03-movil.png`|
