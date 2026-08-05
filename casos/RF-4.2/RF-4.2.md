# RF-4.2 - Pago de renovación y notificación a contactos

**Requisito:** El sistema debe procesar el pago de la renovación y enviar los datos de
facturación/notificación a los contactos previamente registrados (Administrativo, Técnico,
Cobro).

**Entorno evaluado:** `https://dev2.registro.gt/whois/?q=uvg.edu.gt`

**Fecha de ejecución:** 5 de agosto de 2026.

**Nota sobre el alcance:** este requisito involucra procesar un pago real y el envío de
notificaciones a bandejas de correo reales. Siguiendo la guía de la tarea ("si para algún
caso no es práctico o no se logra automatizar, documenten esa prueba de forma manual"), no
se completó ningún pago ni se ingresaron datos de tarjeta en ningún momento de esta
evaluación.

**Resultado global:** 2 de 3 casos automatizados y aprobados; 1 caso no ejecutable de forma
segura en este entorno (ver TC-RF-4.2-03).

---

## TC-RF-4.2-01 - La pantalla de renovación muestra la tarifa y el botón de pago

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada (`localStorage` sin `current_user`); acceso a la ficha del dominio `uvg.edu.gt`, que está activo y vencido a futuro. |
| Pasos realizados | 1. Abrir `https://dev2.registro.gt/whois/?q=uvg.edu.gt` sin sesión iniciada. 2. Verificar el nombre del dominio consultado. 3. Verificar que se muestra la sección "Renovación Rápida" con la tarifa anual. 4. Verificar que el botón **Pagar Ahora** está habilitado. |
| Resultado esperado | El sistema muestra el monto a pagar por la renovación y habilita un control para iniciar el pago. |
| Resultado obtenido | **Aprobado.** Se mostró `uvg.edu.gt`, la sección "Renovación Rápida", una tarifa anual con formato `$ 20.00` y el botón **Pagar Ahora** habilitado. |
| Evidencia | `./evidencias/RF-4.2/TC-01-pantalla-renovacion.png` |

---

## TC-RF-4.2-02 - Al presionar "Pagar Ahora" no se inicia ningún flujo de pago observable

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; en la ficha del dominio `uvg.edu.gt`. |
| Pasos realizados | 1. Abrir la ficha del dominio sin sesión iniciada. 2. Localizar y presionar el botón **Pagar Ahora**. 3. Esperar 2 segundos y verificar si la URL cambia o aparece algún modal/diálogo visible. |
| Resultado esperado | El sistema debe iniciar un flujo de pago observable: un formulario para capturar datos de tarjeta, una redirección a una pasarela de pago, o al menos una solicitud de inicio de sesión visible. |
| Resultado obtenido | **Defecto encontrado.** La URL no cambia y no aparece ningún modal ni diálogo visible. Sin embargo, se detectó que el clic sí dispara en segundo plano la carga de los recursos de Google Sign-In (`accounts.google.com/gsi/...`), lo que sugiere que el flujo está pensado para exigir inicio de sesión antes de pagar, pero el modal correspondiente nunca llega a mostrarse. El usuario que presiona "Pagar Ahora" no recibe ningún feedback. |
| Evidencia | `./evidencias/RF-4.2/TC-02-pagar-ahora-sin-efecto.png` |

---

## TC-RF-4.2-03 - Notificación a los contactos registrados tras el pago

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.2 |
| Herramienta / método | Manual (no automatizado, no ejecutado) |
| Precondiciones | Requeriría completar un pago real de renovación y tener acceso a las bandejas de correo de los contactos Administrativo, Técnico y de Cobro del dominio. |
| Pasos realizados | No ejecutados. Verificar esto de forma completa requiere: 1. Completar un pago real con tarjeta de crédito. 2. Tener acceso a los correos `admin@uvg.edu.gt`, `tech@uvg.edu.gt` y al contacto de Cobro del dominio. 3. Confirmar la recepción de la notificación/factura en cada bandeja. |
| Resultado esperado | Tras un pago exitoso, el sistema envía los datos de facturación/notificación a los tres contactos registrados (Administrativo, Técnico, Cobro). |
| Resultado obtenido | **No ejecutable en este entorno de forma segura.** No se procesó ningún pago real (fuera del alcance permitido de la prueba) y no se tiene acceso a las bandejas de correo de los contactos para confirmar la recepción. Adicionalmente, se observó que la ficha del dominio `uvg.edu.gt` solo expone un **Contacto Administrativo** y un **Contacto Técnico** visibles en la interfaz — no se identificó ningún **Contacto de Cobro** diferenciado, lo cual ya es un hallazgo relevante para este requisito: no es posible confirmar desde la interfaz que exista un tercer contacto de Cobro al cual notificar. |
| Evidencia | No aplica (caso no ejecutado). Ver `./evidencias/RF-4.2/TC-01-pantalla-renovacion.png` para observar los contactos visibles en la ficha del dominio. |
