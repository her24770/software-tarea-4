# RF-3.1 - Carrito sin iniciar sesion

**Requisito:** El sistema debe permitir agregar dominios al carrito y guardarlos en el localStorage
sin iniciar sesión.

**Entorno evaluado:** `https://gt.nic.gt/`

**Fecha de ejecución:** 31 de julio de 2026.

**Resultado global:** 3 de 3 casos aprobados.

---

## TC-RF-3.1-01 - Se puede agregar un dominio disponible al carrito

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://gt.nic.gt/`. |
| Pasos realizados | 1. Buscar un dominio disponible (`prueba123`). 2. En los resultados, presionar el botón **Reservar** del primer dominio disponible (`prueba123.com.gt`). 3. Verificar el contador del carrito en el header. |
| Resultado esperado | El contador del carrito muestra 1 elemento tras agregar el dominio, sin requerir inicio de sesión. |
| Resultado obtenido | **Aprobado.** El contador del carrito pasó de 0 a 1 después de presionar "Reservar". |
| Evidencia | `./evidencias/RF-3.1/TC-01-add-domain-to-cart.png` |

---

## TC-RF-3.1-02 - El dominio agregado se guarda en el localStorage

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://gt.nic.gt/`. |
| Pasos realizados | 1. Buscar un dominio disponible. 2. Confirmar que la clave `domain-cart` del `localStorage` está vacía. 3. Presionar **Reservar**. 4. Leer nuevamente `localStorage.getItem('domain-cart')` y verificar contenido. |
| Resultado esperado | Después de agregar el dominio, `localStorage` contiene la clave `domain-cart` con un arreglo de un elemento cuyo campo `domain` coincide con el dominio agregado (`prueba123.com.gt`). |
| Resultado obtenido | **Aprobado.** `domain-cart` almacenó un arreglo JSON con el dominio, precio y demás metadatos del ítem agregado. |
| Evidencia | `./evidencias/RF-3.1/TC-02-cart-in-localstorage.png` |

---

## TC-RF-3.1-03 - El carrito persiste tras recargar la página, sin iniciar sesión

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.1 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; acceso a `https://gt.nic.gt/`. |
| Pasos realizados | 1. Buscar un dominio disponible y agregarlo al carrito. 2. Recargar la página (`page.reload()`). 3. Verificar que `domain-cart` en `localStorage` sigue conteniendo el dominio. 4. Verificar que el contador del carrito sigue mostrando 1 y que no hubo redirección a una pantalla de inicio de sesión. |
| Resultado esperado | El carrito conserva el dominio agregado después de recargar la página, sin que se solicite iniciar sesión. |
| Resultado obtenido | **Aprobado.** El dominio permaneció en `localStorage` y el contador del carrito tras la recarga. |
| Evidencia | `./evidencias/RF-3.1/TC-03-cart-persists-after-reload.png` |
