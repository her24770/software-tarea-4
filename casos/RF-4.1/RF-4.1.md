# RF-4.1 - Búsqueda y renovación rápida sin iniciar sesión

**Requisito:** El sistema debe permitir buscar y renovar un dominio existente sin necesidad de
iniciar sesión.

**Entorno evaluado:** `https://dev2.registro.gt/whois/?q=uvg.edu.gt`

**Dominio de prueba:** `uvg.edu.gt`

**Fecha de documentación:** 5 de agosto de 2026.

**Resultado global:** 3 casos automatizados; ejecución completa contra el entorno remoto pendiente.

---

## TC-RF-4.1-01 - Muestra la información del dominio existente consultado

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada y acceso directo a la ruta WHOIS con `q=uvg.edu.gt`. |
| Pasos realizados | 1. Eliminar cualquier usuario almacenado en `current_user`. 2. Abrir la URL de consulta. 3. Verificar que la respuesta HTTP sea exitosa. 4. Comprobar el nombre, estado, organización titular y servidores del dominio. |
| Resultado esperado | La página muestra `uvg.edu.gt` con estado **ACTIVO**, junto con la organización titular y sus servidores, sin solicitar autenticación. |
| Resultado obtenido | Pendiente de ejecución contra el entorno remoto. |
| Evidencia | Playwright guarda captura al fallar, video y traza en `evidencias/resultados/`. |

---

## TC-RF-4.1-02 - Ofrece la renovación con vencimiento y tarifa anual

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Dominio `uvg.edu.gt` cargado correctamente y navegador sin sesión iniciada. |
| Pasos realizados | 1. Abrir la consulta WHOIS. 2. Verificar que exista una fecha de expiración. 3. Comprobar que la tarifa anual tenga formato monetario. 4. Verificar que el botón **Pagar Ahora** esté habilitado. |
| Resultado esperado | El usuario puede consultar el vencimiento y precio de renovación, y dispone de una acción habilitada para iniciar el pago. |
| Resultado obtenido | Pendiente de ejecución contra el entorno remoto. |
| Evidencia | Playwright guarda captura al fallar, video y traza en `evidencias/resultados/`. |

---

## TC-RF-4.1-03 - Inicia la renovación sin solicitar inicio de sesión

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Dominio `uvg.edu.gt` cargado y `current_user` ausente del almacenamiento local. |
| Pasos realizados | 1. Registrar la URL, contenido y cantidad de páginas abiertas. 2. Presionar **Pagar Ahora**. 3. Verificar que no aparezca el diálogo de inicio de sesión. 4. Comprobar que la acción produzca un cambio observable: navegación, nueva página o actualización del contenido. |
| Resultado esperado | El flujo de renovación comienza sin redirigir al usuario al inicio de sesión ni mostrar una solicitud de autenticación. |
| Resultado obtenido | Pendiente de ejecución. La inspección actual indica que **Pagar Ahora** no tiene una acción asociada, por lo que este caso debe revelar la incidencia mientras no se implemente el flujo. |
| Evidencia | Playwright guarda la captura del fallo, video y traza en `evidencias/resultados/`. |
