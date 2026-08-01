# RF-2.1 - Casos de prueba automatizados

## TC-01 - Verificación de un dominio que ya se encuentra en uso

| Campo | Detalle |
|---|---|
| ID de prueba | TC-01 |
| Requisito relacionado | RF-2.1 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible y el buscador de dominios se encuentra accesible. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Ingresar el dominio `bi.com.gt` en el buscador.<br>3. Presionar el botón **Buscar**.<br>4. Verificar los resultados mostrados para el dominio consultado. |
| Resultado esperado | El sistema debe identificar que el dominio consultado no está disponible para registro si ya se encuentra en uso. |
| Resultado obtenido | El sistema mostró `bi.com.gt` dentro de los resultados disponibles para registro, incluyendo un precio y la opción **Reservar**. |
| Evidencia | Captura de pantalla donde se observa el dominio `bi.com.gt` dentro de los resultados disponibles para registro. |

## TC-02 - Verificación de un dominio disponible

| Campo | Detalle |
|---|---|
| ID de prueba | TC-02 |
| Requisito relacionado | RF-2.1 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible y el buscador de dominios se encuentra accesible. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Ingresar el dominio `daniel987654321.gt` en el buscador.<br>3. Presionar el botón **Buscar**.<br>4. Verificar que el dominio aparezca dentro de los resultados disponibles para registro. |
| Resultado esperado | El sistema debe mostrar el dominio consultado como disponible para registro. |
| Resultado obtenido | El dominio `daniel987654321.gt` apareció correctamente dentro de la sección **Disponibles para registro**. |
| Evidencia | Captura de pantalla donde se observa el dominio `daniel987654321.gt` dentro de los resultados disponibles para registro. |

## TC-03 - Búsqueda sin ingresar un dominio

| Campo | Detalle |
|---|---|
| ID de prueba | TC-03 |
| Requisito relacionado | RF-2.1 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible y el buscador de dominios se encuentra accesible. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Dejar vacío el campo de búsqueda.<br>3. Presionar el botón **Buscar**.<br>4. Verificar el mensaje de validación mostrado por el sistema. |
| Resultado esperado | El sistema debe impedir la consulta y mostrar un mensaje indicando que no se puede realizar la búsqueda sin ingresar un dominio. |
| Resultado obtenido | El sistema mostró el mensaje **"El dominio no puede estar vacío"**. |
| Evidencia | Captura de pantalla donde se observa el mensaje de validación mostrado al realizar la búsqueda con el campo vacío. |