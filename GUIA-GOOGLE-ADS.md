# Guía de configuración de Google Ads — Jardín Infantil CREAR

Sitio: `https://www.unmundoporcrear.com`

Este documento te indica paso a paso qué hacer en Google Ads para que el sitio pueda medir conversiones (WhatsApp, formulario y llamadas).

---

## 1. Qué se instaló ya en la web

Se agregó al `index.html`:

| Elemento | Dónde está | Qué hace |
|---|---|---|
| Configuración de IDs (`CREAR_ANALYTICS`) | `<head>` de `index.html` | Aquí pones tus IDs reales de GA4 y Google Ads (ver paso 4). |
| Carga de `gtag.js` | `js/main.js` | Se carga **solo si el visitante acepta las cookies** (banner de cookies). |
| Evento `whatsapp_click` | Antes de `</body>` | Cuenta cada clic en los botones/enlaces de WhatsApp. |
| Evento `lead_form_submit` | Antes de `</body>` | Cuenta cada envío del formulario de contacto. |
| Evento `phone_click` | Antes de `</body>` | Cuenta cada clic en números de teléfono (`tel:`). |
| Banner de cookies | Antes de `</body>` | Pide el consentimiento antes de medir. La elección se recuerda en el navegador. |
| Aviso de privacidad | `privacidad.html` | Página legal exigida por la Ley 1581 de 2012. |

Estos eventos están listos para usar, pero **no enviarán datos hasta que pongas tus IDs de Google en el código**, aceptes las cookies y configures las conversiones en la plataforma.

---

## 2. Paso a paso en Google Ads

### Paso A — Crear cuenta de Google Ads
1. Entra a [https://ads.google.com](https://ads.google.com).
2. Inicia sesión con tu cuenta de Gmail.
3. Si es la primera vez, sigue el asistente para crear tu primera campaña (puedes pausarla o no completar el pago por ahora).

### Paso B — Configurar conversiones en Google Ads
1. En el menú de Google Ads, ve a **Medición → Conversiones**.
2. Pulsa **+ Nueva acción de conversión**.
3. Elige **Importar → Desde Google Analytics** o crea manualmente. Recomiendo crear tres acciones separadas:

#### A) WhatsApp — clic
- Nombre: `WhatsApp - Clic`
- Categoría: `Interactuar`
- Valor: `Sin valor` o `1`
- Contar: `Cada conversión`

#### B) Formulario — envío de contacto
- Nombre: `Formulario - Envío`
- Categoría: `Lead`
- Valor: `Sin valor` o `1`
- Contar: `Cada conversión`

#### C) Teléfono — clic en llamada
- Nombre: `Teléfono - Clic`
- Categoría: `Interactuar`
- Valor: `Sin valor` o `1`
- Contar: `Cada conversión`

4. Guarda cada acción. Google Ads te dará un **ID de conversión** y una **etiqueta de conversión** para cada una.

---

## 3. Paso a paso en Google Analytics 4 (GA4)

1. Entra a [https://analytics.google.com](https://analytics.google.com).
2. Crea una **propiedad GA4** si no tienes una.
3. Obtén el **ID de medición** (se ve como `G-XXXXXXXXXX`).
4. En GA4, ve a **Administrador → Eventos** y marca como conversión los eventos que quieras medir (`whatsapp_click`, `lead_form_submit`, `phone_click`).

---

## 4. Actualizar el código de la web (`index.html`)

Abre `index.html` en el File Manager de GoDaddy (cPanel → File Manager → `public_html/index.html`).

Busca el bloque que dice:

```html
<!-- ANALYTICS - Google Analytics 4 + Google Ads (se cargan SOLO con consentimiento)
     REEMPLAZA 'G-XXXXXXXXXX' por tu ID de medición de GA4
     REEMPLAZA 'AW-XXXXXXXXXX' por tu ID de conversión de Google Ads
     Mientras el ID contenga "XXXXX" no se carga nada (modo seguro). -->
<script>
  window.CREAR_ANALYTICS = {
    ga4Id: 'G-XXXXXXXXXX',
    adsId: 'AW-XXXXXXXXXX'
  };
</script>
```

Y reemplázalo por algo así (ejemplo con IDs ficticios — usa los tuyos):

```html
<script>
  window.CREAR_ANALYTICS = {
    ga4Id: 'G-A1B2C3D4E5',
    adsId: 'AW-987654321'
  };
</script>
```

**Reglas importantes:**
- Donde dice `G-XXXXXXXXXX`, pon tu ID de medición de GA4 (lo encuentras en Google Analytics → Administrador → Flujos de datos → ID de medición).
- Donde dice `AW-XXXXXXXXXX`, pon tu ID de conversión de Google Ads (lo encuentras en Google Ads → Medición → Conversiones → Detalles de la etiqueta).
- Si no tienes el ID de Google Ads todavía, deja `adsId: ''` y agrégalo después.
- **No agregues el `gtag.js` por tu cuenta en otro lado del código.** La web lo carga solo y **únicamente después de que el visitante acepte las cookies** (banner de cookies). Cargar la analítica antes del consentimiento incumple la Ley 1581 de 2012.

5. Guarda el archivo con **Ctrl + S**.
6. Recarga tu web con **Ctrl + F5** y, la primera vez, acepta las cookies para que se active la medición.

> Al medir el Consent Mode de Google: si más adelante quieres enviar el `deny` cuando el visitante rechaza, el evento ya queda registrado en `dataLayer` con la opción de privacidad `analytics_storage: denied`.

---

## 5. Verificar que funciona

1. Entra a tu sitio `https://www.unmundoporcrear.com`.
2. Haz clic en un botón de WhatsApp y envía el formulario de contacto.
3. En Google Ads, ve a **Medición → Conversiones**. Después de unas horas (puede tardar hasta 24h la primera vez), deberías ver las conversiones registradas.
4. También puedes usar la extensión del navegador **Google Tag Assistant** para verificar que `gtag` se dispare correctamente al hacer clic.

---

## 6. Crear tu primera campaña en Google Ads (opcional)

Una vez que las conversiones estén activas:

1. En Google Ads, ve a **Campañas → Nueva campaña**.
2. Objetivo: `Contactos potenciales` o `Ventas`.
3. Tipo de campaña: `Búsqueda`.
4. Configura:
   - Red: Búsqueda de Google.
   - Ubicación: Bogotá, Colombia (y alrededores como Usaquén).
   - Idioma: Español.
   - Presupuesto diario: el que decidas (ej. $10.000 - $30.000 COP).
5. Crea grupos de anuncios con palabras clave como:
   - "jardín infantil Bogotá"
   - "matrículas jardín infantil Usaquén"
   - "preescolar Santa Bárbara Bogotá"
   - "guardería cerca de mí"
6. Redacta anuncios que inviten a escribir por WhatsApp o llenar el formulario.
7. Enlaza la campaña a las conversiones que configuraste en el Paso B.

---

## 7. Archivos modificados en este sitio

| Archivo | Cambio |
|---|---|
| `index.html` | Se agregó `gtag.js` en `<head>` y los eventos de conversión antes de `</body>` |
| `GUIA-EDICION-GODADDY.md` | Guía para editar la web desde GoDaddy (no toca Google Ads) |

---

## 8. Checklist rápido

- [ ] Cuenta de Google Ads creada
- [ ] Propiedad GA4 creada y ID de medición copiado (`G-...`)
- [ ] Tres acciones de conversión creadas en Google Ads (WhatsApp, Formulario, Teléfono)
- [ ] IDs reemplazados en `index.html` (`G-XXXXXXXXXX` y `AW-XXXXXXXXXX`)
- [ ] Archivo subido a GoDaddy File Manager y web recargada (`Ctrl + F5`)
- [ ] Prueba de clic en WhatsApp y formulario hecha
- [ ] Primera campaña de Google Ads creada y enlazada a las conversiones

Si te trabas en algún paso, dime en qué punto estás y te ayudo a continuar.