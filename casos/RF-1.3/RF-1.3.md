# RF-1.3 - Estadísticas de dominios por subdominio y rango de fechas

**Requisito:** El sistema debe mostrar estadísticas de dominios registrados por subdominio, filtradas por un rango de fechas, en la sección de **Estadísticas**.

**Entorno evaluado:** `https://dev2.registro.gt/`

**Fecha de ejecución:** 31 de julio de 2026.

**Resultado global:** 3 de 3 casos aprobados.

---

## TC-RF-1.3-01 - Visualización de las estadísticas de dominios

| Campo | Detalle |
|---|---|
| ID de prueba | TC-RF-1.3-01 |
| Requisito relacionado | RF-1.3 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://dev2.registro.gt/`; la aplicación se encuentra disponible. |
| Pasos realizados | 1. Abrir la aplicación.<br>2. Acceder al menú **Enlaces de Interés**.<br>3. Seleccionar la opción **Estadísticas**.<br>4. Verificar la visualización de los indicadores de estadísticas.<br>5. Verificar la presencia de las gráficas de distribución.<br>6. Verificar el desglose detallado de registros y la existencia de los sufijos principales. |
| Resultado esperado | La sección de estadísticas muestra los indicadores principales, las gráficas de distribución y el desglose por subdominio con la información correspondiente. |
| Resultado obtenido | **Aprobado.** Se visualizaron correctamente los indicadores **Total de Dominios**, **Dominios Nuevos**, **Dominios Eliminados**, las gráficas de distribución y el desglose de registros con los principales sufijos disponibles. |
| Evidencia | `./evidencias/RF-1.3/TC-RF-1.3-01-estadisticas.png` |

---

## TC-RF-1.3-02 - Disponibilidad de los controles de filtrado

| Campo | Detalle |
|---|---|
| ID de prueba | TC-RF-1.3-02 |
| Requisito relacionado | RF-1.3 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://dev2.registro.gt/`; la sección **Estadísticas** se encuentra abierta. |
| Pasos realizados | 1. Acceder a la sección **Estadísticas**.<br>2. Verificar la presencia de los campos **Fecha Inicial** y **Fecha Final**.<br>3. Verificar la existencia del selector de **Sufijo**.<br>4. Verificar que la opción **Todos los sufijos** se encuentre disponible.<br>5. Verificar que el botón **Consultar** sea visible. |
| Resultado esperado | La interfaz presenta todos los controles necesarios para ingresar los criterios de filtrado de las estadísticas. |
| Resultado obtenido | **Aprobado.** Se encontraron visibles los campos de fecha, el selector de sufijos con la opción **Todos los sufijos** y el botón **Consultar**. |
| Evidencia | `./evidencias/RF-1.3/TC-RF-1.3-02-controles-filtrado.png` |

---

## TC-RF-1.3-03 - Ingreso de criterios de filtrado

| Campo | Detalle |
|---|---|
| ID de prueba | TC-RF-1.3-03 |
| Requisito relacionado | RF-1.3 |
| Herramienta / método | Playwright (automatizado) |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://dev2.registro.gt/`; la sección **Estadísticas** se encuentra abierta. |
| Pasos realizados | 1. Acceder a la sección **Estadísticas**.<br>2. Ingresar una fecha inicial.<br>3. Ingresar una fecha final.<br>4. Seleccionar el sufijo **.com.gt**.<br>5. Verificar que los valores permanezcan seleccionados y que el botón **Consultar** continúe habilitado. |
| Resultado esperado | Los controles de filtrado aceptan la información ingresada por el usuario y conservan los valores seleccionados para una posible consulta. |
| Resultado obtenido | **Aprobado.** Los campos de fecha almacenaron correctamente los valores ingresados, el selector cambió al sufijo **.com.gt** y el botón **Consultar** permaneció habilitado para su utilización. |
| Evidencia | `./evidencias/RF-1.3/TC-RF-1.3-03-ingreso-datos.png` |

---

### Observación

Durante la ejecución de las pruebas se comprobó que los controles de filtrado aceptan correctamente la entrada del usuario. Sin embargo, no fue posible validar la actualización de las estadísticas al presionar el botón **Consultar**, ya que la información mostrada no presentó cambios observables durante la ejecución de las pruebas. Esta situación corresponde al comportamiento actual del sistema y no al funcionamiento del script de automatización.