# RF-1.3 - Casos de prueba automatizados

## TC-01 - Visualización de estadísticas de dominios por subdominio

| Campo | Detalle |
|---|---|
| ID de prueba | TC-01 |
| Requisito relacionado | RF-1.3 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible y el usuario puede acceder a la sección de Estadísticas. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Acceder al menú "Enlaces de Interés".<br>3. Seleccionar la opción "Estadísticas".<br>4. Verificar que se muestre la sección de estadísticas.<br>5. Verificar la presencia de los diferentes sufijos de dominio en el desglose de estadísticas. |
| Resultado esperado | La sección de estadísticas debe mostrar información correspondiente a los diferentes subdominios disponibles, incluyendo los sufijos .com.gt, .gt, .edu.gt, .org.gt, .gob.gt, .net.gt, .mil.gt e .ind.gt. |
| Resultado obtenido | Se mostraron correctamente las estadísticas y los diferentes sufijos de dominio en la página. |
| Evidencia | Captura de pantalla generada durante la ejecución de la prueba donde se muestran las estadísticas y el desglose por sufijo. |

## TC-02 - Filtrado de estadísticas por sufijo

| Campo | Detalle |
|---|---|
| ID de prueba | TC-02 |
| Requisito relacionado | RF-1.3 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible, se puede acceder a la sección de Estadísticas y existe un selector de sufijo con la opción .com.gt. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Acceder a la sección "Estadísticas".<br>3. Registrar los valores iniciales de Total de Dominios, Dominios Nuevos y Dominios Eliminados.<br>4. Seleccionar el sufijo .com.gt.<br>5. Presionar el botón "Consultar".<br>6. Comparar los valores obtenidos después de aplicar el filtro con los valores iniciales. |
| Resultado esperado | Al seleccionar un sufijo específico y presionar "Consultar", las estadísticas deben actualizarse y mostrar los datos correspondientes al sufijo seleccionado. |
| Resultado obtenido | Las estadísticas no cambiaron después de seleccionar el sufijo .com.gt y presionar "Consultar". Los valores permanecieron en 27,602 dominios totales, 428 dominios nuevos y 279 dominios eliminados. |
| Evidencia | Captura de pantalla generada por Playwright donde se observa que las estadísticas permanecen sin cambios después de aplicar el filtro por sufijo. |

## TC-03 - Filtrado de estadísticas por rango de fechas

| Campo | Detalle |
|---|---|
| ID de prueba | TC-03 |
| Requisito relacionado | RF-1.3 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible, se puede acceder a la sección de Estadísticas y existen campos para seleccionar una fecha inicial y una fecha final. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Acceder a la sección "Estadísticas".<br>3. Registrar los valores iniciales de Total de Dominios, Dominios Nuevos y Dominios Eliminados.<br>4. Modificar la fecha inicial y la fecha final del reporte.<br>5. Presionar el botón "Consultar".<br>6. Comparar los valores obtenidos después de aplicar el rango de fechas con los valores iniciales. |
| Resultado esperado | Al modificar el rango de fechas y presionar "Consultar", las estadísticas deben actualizarse y mostrar los datos correspondientes al período seleccionado. |
| Resultado obtenido | Las estadísticas no cambiaron después de modificar el rango de fechas y presionar "Consultar". Los valores permanecieron en 27,602 dominios totales, 428 dominios nuevos y 279 dominios eliminados. |
| Evidencia | Captura de pantalla generada por Playwright donde se observa que las estadísticas permanecen sin cambios después de aplicar el filtro por rango de fechas. |