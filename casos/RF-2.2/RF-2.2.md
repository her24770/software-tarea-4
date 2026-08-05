# RF-2.2 - Información WHOIS de dominios registrados

Requisito: **El sistema debe mostrar la información del WHOIS para dominios que ya se encuentran registrados.**

Entorno evaluado: `https://dev2.registro.gt/`, URL autorizada por el PDF de la tarea.

Fecha de ejecución: **4 de agosto de 2026**.

Resultado global: **3 de 3 casos aprobados**.

## TC-RF-2.2-01 - Acceso al WHOIS desde los resultados

| Campo | Detalle |
|---|---|
| ID de prueba | TC-RF-2.2-01 |
| Requisito relacionado | RF-2.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; aplicación disponible; `google.gt` incluido como dominio registrado en los datos públicos del sistema. |
| Pasos realizados | 1. Abrir la página de inicio.<br>2. Escribir `google` en el buscador.<br>3. Presionar **Buscar**.<br>4. Cerrar el aviso **Página de Pruebas** con **Entendido**.<br>5. Verificar `google.gt` en la sección de registrados.<br>6. Verificar el estado **No disponible** y el enlace **Ver detalles...**. |
| Resultado esperado | El dominio registrado no se ofrece para reserva y permite abrir su información WHOIS. |
| Resultado obtenido | **Aprobado.** La búsqueda mostró `google.gt` como **No disponible** y presentó el enlace **Ver detalles...** para consultar su WHOIS. |
| Evidencia | `evidencias/RF-2.2/TC-RF-2.2-01-dominio-registrado.png`. |

## TC-RF-2.2-02 - Datos principales del WHOIS

| Campo | Detalle |
|---|---|
| ID de prueba | TC-RF-2.2-02 |
| Requisito relacionado | RF-2.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; `google.gt` incluido como dominio registrado. |
| Pasos realizados | 1. Abrir los resultados de `google.gt`.<br>2. Cerrar el aviso **Página de Pruebas** con **Entendido**.<br>3. Presionar **Ver detalles...**.<br>4. Verificar que la ruta WHOIS corresponda al dominio.<br>5. Comprobar nombre, estado, fecha y hora de vencimiento, tarifa anual y moneda. |
| Resultado esperado | La vista WHOIS muestra datos principales completos y con formatos válidos para el dominio consultado. |
| Resultado obtenido | **Aprobado.** El enlace abrió `/whois/?q=google.gt` y la vista mostró `google.gt`, estado **ACTIVO**, fecha y hora de vencimiento con formato válido, tarifa anual **$ 40.00** y moneda **USD**. |
| Evidencia | `evidencias/RF-2.2/TC-RF-2.2-02-datos-whois.png`. |

## TC-RF-2.2-03 - Organización, DNS y contactos

| Campo | Detalle |
|---|---|
| ID de prueba | TC-RF-2.2-03 |
| Requisito relacionado | RF-2.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; `galileo.edu.gt` incluido como dominio registrado. |
| Pasos realizados | 1. Abrir el WHOIS de `galileo.edu.gt`.<br>2. Verificar el nombre de dominio y la organización.<br>3. Comprobar los dos servidores DNS publicados.<br>4. Verificar que existan las secciones de contacto administrativo y técnico. |
| Resultado esperado | El WHOIS muestra la organización, servidores DNS y tipos de contacto del dominio registrado. |
| Resultado obtenido | **Aprobado.** La vista mostró **Universidad Galileo**, Guatemala, los servidores `ns1.galileo.edu.` y `ns2.galileo.edu.`, además de las secciones **Contacto Administrativo** y **Contacto Técnico**. |
| Evidencia | `evidencias/RF-2.2/TC-RF-2.2-03-organizacion-dns.png`. |

## Nota de alcance

La página de desarrollo obtiene los datos desde `/api/domains.json`, un conjunto público de demostración. Las pruebas validan lo que el usuario observa en la interfaz y no certifican que esos datos correspondan al WHOIS oficial en producción. No se enviaron formularios ni se modificaron datos.
