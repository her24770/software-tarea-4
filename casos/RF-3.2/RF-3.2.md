# RF-3.2 - Login requerido para finalizar la compra

**Requisito:** El sistema debe requerir que el usuario inicie sesión para poder finalizar la compra
de los dominios en el carrito.

**Entorno evaluado:** `https://gt.nic.gt/`

**Fecha de ejecución:** 4 de agosto de 2026.

**Resultado global:** 3 de 3 casos aprobados.

---

## TC-RF-3.2-01 - El carrito muestra un aviso de inicio de sesión en vez del pago

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; se agregó `prueba123.com.gt` al carrito (ver RF-3.1). |
| Pasos realizados | 1. Buscar `prueba123` y agregar el dominio disponible al carrito. 2. Abrir el carrito (`/cart/`). 3. Verificar el panel lateral. |
| Resultado esperado | En lugar del resumen de pago, se muestra el mensaje **"Inicia sesión para continuar"**. |
| Resultado obtenido | **Aprobado.** El panel "Inicia sesión para continuar" se mostró en vez del resumen de compra. |
| Evidencia | `./evidencias/RF-3.2/TC-01-login-required-prompt.png` |

---

## TC-RF-3.2-02 - El botón para completar la compra no está disponible sin sesión

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; carrito con `prueba123.com.gt`. |
| Pasos realizados | 1. Agregar el dominio al carrito. 2. Abrir `/cart/`. 3. Verificar la visibilidad del botón `#checkout-btn` ("Comprar ahora"). |
| Resultado esperado | El botón de pago (`Comprar ahora`) no está visible/disponible mientras no haya sesión iniciada. |
| Resultado obtenido | **Aprobado.** El botón `#checkout-btn` permaneció oculto; solo se ofreció la opción de iniciar sesión o crear cuenta. |
| Evidencia | `./evidencias/RF-3.2/TC-02-checkout-button-hidden.png` |

---

## TC-RF-3.2-03 - "Iniciar Sesión" desde el carrito envía a autenticarse antes de pagar

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; carrito con `prueba123.com.gt`. |
| Pasos realizados | 1. Agregar el dominio al carrito y abrir `/cart/`. 2. Presionar el botón **Iniciar Sesión** del panel. 3. Verificar la URL resultante y la presencia del formulario de login. |
| Resultado esperado | El usuario es dirigido a la página de inicio de sesión (`/login/`) antes de poder continuar con el pago. |
| Resultado obtenido | **Aprobado.** El sistema redirigió a `https://gt.nic.gt/login/`, donde se mostró el formulario de inicio de sesión (correo/contraseña). |
| Evidencia | `./evidencias/RF-3.2/TC-03-redirect-to-login.png` |

---

## TC-RF-3.2-04 - Al iniciar sesion muestra boton de comprar

Los 3 casos automatizados verifican que **no es posible llegar al pago sin sesión iniciada**. 
| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-3.2 |
| Herramienta / método | Prueba automatizada|
| Precondiciones | Navegador con sesion iniciada y carrito con `prueba123.com.gt`. |
| Pasos realizados | 1. Agregar el dominio al carrito y abrir `/cart/`. 2. Presionar el botón **Crear cuenta** 3.Creacion de cuenta |
| Resultado esperado | El usuario es dirigido a la página misma pagina de carrito y ahora cambia el panel por un btn de comprar ahora o seguir buscando |
| Resultado obtenido | **Aprobado.** El sistema permite comprar unicamente al crear cuenta o iniciar sesion |

