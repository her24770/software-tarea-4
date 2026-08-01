# RF-5.1 - Casos de prueba automatizados

## TC-01 - Falta de traducción para un texto en el idioma seleccionado

| Campo | Detalle |
|---|---|
| ID de prueba | TC-01 |
| Requisito relacionado | RF-5.1 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está disponible y se encuentra en el idioma seleccionado para la prueba. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Seleccionar el idioma correspondiente.<br>3. Navegar hasta la vista donde aparece el texto a validar.<br>4. Verificar que el texto tenga su traducción en el idioma activo. |
| Resultado esperado | Todos los textos visibles deben mostrarse traducidos al idioma seleccionado; no debe existir texto sin traducir. |
| Resultado obtenido | Se identificó un texto sin traducción para el idioma seleccionado. |
| Evidencia | Captura de pantalla o referencia al momento de la ejecución donde se observa el texto faltante. |

## TC-02 - Texto hardcodeado que no cambia al cambiar el idioma

| Campo | Detalle |
|---|---|
| ID de prueba | TC-02 |
| Requisito relacionado | RF-5.1 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La aplicación está cargada con un idioma inicial y existe la opción de cambiar el idioma. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Registrar el texto objetivo en el idioma inicial.<br>3. Cambiar el idioma de la página.<br>4. Revisar si el texto objetivo se actualiza correctamente. |
| Resultado esperado | El texto debe cambiar al idioma nuevo; no debe permanecer fijo en el idioma anterior. |
| Resultado obtenido | El texto no cambió al modificar el idioma de la página, por lo que está hardcodeado. |
| Evidencia | Captura de pantalla comparando el texto antes y después del cambio de idioma. |

## TC-03 - Texto con overflow en el componente contenedor

| Campo | Detalle |
|---|---|
| ID de prueba | TC-03 |
| Requisito relacionado | RF-5.1 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | La interfaz contiene un componente con ancho o tamaño limitado para mostrar el texto. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Ubicar el componente que contiene el texto largo.<br>3. Visualizar el contenido en el idioma seleccionado.<br>4. Comprobar si el texto se ajusta correctamente dentro del contenedor. |
| Resultado esperado | El texto debe respetar el tamaño del componente sin desbordarse ni romper el diseño. |
| Resultado obtenido | El texto excedió el tamaño máximo del componente y generó overflow. |
| Evidencia | Captura de pantalla donde se observe el desbordamiento del texto. |
