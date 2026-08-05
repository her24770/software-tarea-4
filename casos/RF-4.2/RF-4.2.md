# RF-4.2 - Pago de renovación y notificación a contactos

**Requisito:** El sistema debe procesar el pago de la renovación y enviar los datos de
facturación/notificación a los contactos previamente registrados (Administrativo, Técnico,
Cobro).

**Entorno evaluado:** `https://dev2.registro.gt/whois/?q=uvg.edu.gt`

**Fecha de ejecución:** 5 de agosto de 2026.

**Nota sobre el alcance:** el requisito completo (procesar un pago real y confirmar la
recepción de la notificación en las bandejas de correo de los contactos) no se puede
verificar en caja negra sin completar una transacción real y sin acceso a esos correos. En
ningún momento de esta evaluación se completó un pago ni se ingresaron datos de tarjeta. El
TC-RF-4.2-03 se automatizó verificando, en cambio, que los contactos a los que el sistema
debería notificar existan y estén expuestos en la ficha del dominio.

**Resultado global:** 3 de 3 casos automatizados. TC-RF-4.2-01 y TC-RF-4.2-02 aprobados;
TC-RF-4.2-03 aprobado como prueba, pero revela que falta el Contacto de Cobro (ver detalle).

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

## TC-RF-4.2-03 - Se exponen los contactos a notificar (Administrativo, Técnico y Cobro)

| Campo | Detalle |
|---|---|
| Requisito relacionado | RF-4.2 |
| Herramienta / método | Playwright 1.62.1, Chromium, automatizado |
| Precondiciones | Navegador sin sesión iniciada; en la ficha del dominio `uvg.edu.gt`. |
| Pasos realizados | 1. Abrir la ficha del dominio sin sesión iniciada. 2. Verificar que existe la sección **Contacto Administrativo**. 3. Verificar que existe la sección **Contacto Técnico**. 4. Buscar una sección de **Contacto de Cobro**. |
| Resultado esperado | El sistema debe exponer los tres contactos registrados (Administrativo, Técnico y Cobro) a los que se enviarían los datos de facturación/notificación tras procesar el pago. |
| Resultado obtenido | **Defecto encontrado.** Se muestran correctamente **Contacto Administrativo** y **Contacto Técnico**, pero no existe ninguna sección de **Contacto de Cobro** en la ficha del dominio. El sistema no puede estar cumpliendo la parte de notificación del requisito para los tres contactos, porque el tercer destinatario (Cobro) ni siquiera está definido en la interfaz. Sumado a que "Pagar Ahora" no inicia ningún flujo (TC-RF-4.2-02), no hay evidencia de que el requisito se cumpla en ninguna de sus partes. |
| Evidencia | `./evidencias/RF-4.2/TC-03-contactos-sin-cobro.png` |
