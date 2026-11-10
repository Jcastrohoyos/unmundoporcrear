# Guía de edición del sitio web — Jardín Infantil CREAR

Sitio: `https://www.unmundoporcrear.com`
Sitio público (estático, sin PHP, sin WordPress): archivos HTML/CSS/JS en hosting GoDaddy cPanel.
Archivo principal a editar: `index.html` (en `public_html`).
Logo oficial: `img/logop.png` (NO uses `logo2.png`).

---

## 1. Antes de empezar — respaldo

Antes de tocar cualquier archivo:

1. Entra al panel de GoDaddy → Hosting → cPanel → **File Manager**.
2. Ve a la carpeta `public_html`.
3. Selecciona `index.html` → clic derecho → **Copy** → pega como `index-backup-YYYYMMDD.html`.

Esto te permite volver atrás si algo sale mal (ver sección 10).

---

## 2. Cómo entrar al panel de GoDaddy (cPanel)

1. Abre el navegador y ve a `https://<tu-usuario>.tu-dominio.com:2083` o entra por tu cuenta GoDaddy → **Manage** en el hosting → **Open cPanel**.
2. Usuario y contraseña son los de tu hosting GoDaddy (los que te llegaron por correo al comprar el plan).
3. Dentro de cPanel busca el icono **Files → File Manager** y ábrelo.
4. Abre la carpeta `public_html`. Ahí están: `index.html`, `css/styles.css`, `js/main.js`, `img/`, `sitemap.xml`, `robots.txt`.

### Cómo editar un archivo (paso a paso)

1. En File Manager, busca `index.html`.
2. Clic derecho → **Edit** (o selecciona el archivo y pulsa el botón **Edit** de la barra superior).
3. Se abrirá el editor de texto dentro del navegador.
4. Busca el texto que quieras cambiar con **Ctrl + F**.
5. Edita solo lo necesario.
6. Pulsa **Save Changes** (disquete) o **Ctrl + S**.
7. Cierra el editor.
8. En el navegador donde ves la web, pulsa **Ctrl + F5** (recarga forzada) para ver los cambios. Si no aparecen, espera 1-2 minutos (caché de GoDaddy).

### Cómo subir una imagen nueva

1. En File Manager, entra a la carpeta `img`.
2. Pulsa el botón **Upload** (subir) de la barra superior.
3. Arrastra o selecciona tu imagen.
4. Importante: ponle un nombre en minúsculas, sin espacios ni acentos (ej. `blog-julio-2026.jpg`).

### Cómo crear una carpeta o archivo nuevo

1. Botón **+ Folder** o **+ File** en la barra superior de File Manager.
2. Nombres: minúsculas, sin espacios, sin acentos.

---

## 3. Mapa de secciones y dónde están en `index.html`

| Sección | ID | Línea aprox. | Qué se edita aquí |
|---|---|---|---|
| Hero (matrículas + título principal) | `#inicio` | 110 | Título, subtítulo, imagen hero |
| Nuestra familia | `#necesidades-familia` | 196 | Textos de la familia |
| Metodología | `#metodologia` | 250 | Textos de metodología |
| Por qué CREAR | `#por-que-crear` | 345 | Ventajas / diferenciadores |
| Niveles y actividades | `#niveles` | 426 | Niveles educativos + extracurriculares |
| Blog para Padres | `#blog` | 592 | Artículos del blog |
| Instalaciones / Ubicación | `#instalaciones` | 1008 | Imágenes, dirección, mapa, teléfonos, correo |
| Contacto (formulario + WhatsApp) | `#contacto` | 1101 | Formulario, botón WhatsApp, datos de contacto |
| Footer | `<footer>` | 1244 | Logo, redes sociales, copyright, contacto directo |

Cada sección lleva un comentario HTML arriba, por ejemplo:
`<!-- BLOG - Grid 3 Columnas con Artículos Completos -->`

---

## 4. Cómo editar textos

Abre `index.html` en el editor de File Manager, usa **Ctrl + F** para buscar la frase exacta y cámbiala.

### Ejemplos prácticos

**Cambiar el título del hero:**
Busca `<h1 id="hero-title"` y edita lo que está dentro de la etiqueta, sin borrar la imagen del logo ni la etiqueta `<span class="animated-word">`.

**Cambiar el subtítulo "Jardín Infantil & Preescolar en Bogotá":**
Busca `<p class="hero-category">` y edita el texto dentro de `<span>...</span>`.

**Cambiar el texto del botón de matrículas:**
Busca `Matrículas` dentro de `<a ... class="btn btn-primary btn-sm navbar-cta">` y cámbialo.

**Cambiar el texto del botón del formulario:**
Busca `Enviar y Contactar por WhatsApp` (línea 1188).

**Cambiar el copyright del pie de página:**
Busca `© 2026 CREAR Jardín Infantil` (línea 1313) y cambia el año o el texto.

---

## 5. Datos de contacto — tabla completa (editar todos los lugares)

El número de WhatsApp aparece en muchos lugares. Si cambia, actualiza **todos**:

| Dato | Valor actual | Dónde está (líneas de `index.html`) |
|---|---|---|
| WhatsApp (enlace) | `https://wa.me/573104711322` | 77, 102, 138, 335, 462, 484, 506, 528, 1204, 1231 (y en `js/main.js` línea 211) |
| WhatsApp (texto visible) | `310 471 13 22` | 1063, 1218, 1307 |
| Teléfono fijo | `(601) 214 76 62` | 1062, 1218, 1303 |
| Correo electrónico | `unmundoporcrear@gmail.com` | 1081, 1219, 1299 |
| Dirección | `Carrera 11a # 113 - 23, Barrio Santa Bárbara, Usaquén, Bogotá` | 1053, 1089 (mapa), 1217, 1295 |
| Correo del JSON-LD | `unmundoporcrear@gmail.com` | 31-35 (bloque de datos estructurados, `<head>`) |
| Teléfono JSON-LD | `+573104711322` | 38 |

**Regla de oro:** si cambias el número de WhatsApp, reemplaza `573104711322` en todos los enlaces `https://wa.me/573104711322` y también en el texto visible `310 471 13 22`. No cambies el código país `57`.

---

## 6. Cómo cambiar imágenes

### Cambiar la imagen del hero
Busca en la sección `#inicio` una etiqueta `<img ... src="img/hero.jpg">`.
- Para reemplazarla: sube una imagen nueva a la carpeta `img` (mismo nombre `hero.jpg` o nombre nuevo).
- Si usas nombre nuevo, cambia el `src="img/hero.jpg"` por `src="img/tu-nueva-imagen.jpg"`.
- Tamaño recomendado: ancho 800 px, peso menor a 300 KB.

### Cambiar el logo
El logo oficial es `img/logop.png`. Aparece en:
- Línea 64 (navbar)
- Línea 129 (título del hero)
- Línea 1248 (footer)
- Línea 17 (ícono de pestaña del navegador)

**No uses `logo2.png`; ese archivo no es el logo correcto.**

### Cambiar imágenes de instalaciones
En la sección `#instalaciones` (líneas 1021, 1025, 1028, 1031) están:
- `img/instalaciones.jpeg`
- `img/SECIONNOSOTROS.jpg`
- `img/hero.jpg`
- `img/SECIONNOSOTROS.avif`

Sustituye el archivo en la carpeta `img` con el mismo nombre, o cambia el `src` en el HTML.

### Cambiar imágenes del blog
Cada `<article class="blog-card">` tiene una `<div class="blog-card-image">` con un ``. Busca el `src` y cámbialo por la URL de tu nueva imagen.

---

## 7. Cómo agregar un artículo nuevo al blog

La sección `#blog` empieza en la línea 592. Cada artículo es un bloque `<article class="blog-card reveal" id="blog-...">`.

Copia este bloque completo (desde `<article ...>` hasta `</article>`) y pégalo justo antes de `</div>` que cierra el `.blog-grid` (al final de la sección blog, antes de `</section>`).

**Plantilla de artículo:**

```html
<article class="blog-card reveal" id="blog-nombre-corto">
  <div class="blog-card-image">
    <img src="img/tu-imagen.jpg" alt="Título del artículo" loading="lazy">
    <span class="blog-card-date">30 abr 2026</span>
  </div>
  <div class="blog-card-body">
    <div class="blog-card-meta">
      <span class="blog-category-tag">Categoría</span>
    </div>
    <h3 class="blog-card-title">Título del artículo</h3>
    <div class="blog-card-content collapsed">
      <p class="lead">Primer párrafo (resumen).</p>
      <p>Más párrafos del artículo...</p>
    </div>
    <button class="expand-btn" aria-expanded="false" aria-label="Expandir artículo">
      <span class="expand-text">Leer más</span>
      <i class="ph ph-caret-down"></i>
    </button>
  </div>
</article>
```

**Cosas que debes cambiar:**
- `id="blog-nombre-corto"`: pon un id único sin espacios ni acentos (ej. `blog-cuidado-dental`).
- `src="img/tu-imagen.jpg"`: pon tu imagen subida en la carpeta `img`.
- `alt="..."`: descripción breve de la imagen.
- `<span class="blog-card-date">`: fecha de publicación.
- `<span class="blog-category-tag">`: categoría (ej. Salud, Nutrición, Crianza).
- `<h3 class="blog-card-title">`: título del artículo.
- El contenido dentro de `<div class="blog-card-content collapsed">`: escribe tus párrafos con `<p>...</p>`.

**IMPORTANT:** No borres la clase `collapsed` del `div.blog-card-content`, ni el botón `expand-btn`, porque el botón "Leer más" necesita ambas cosas para funcionar.

---

## 8. Cómo agregar una actividad extracurricular nueva

La sección de actividades está dentro de `#niveles`, en el bloque `<div class="extra-grid">` (líneas 543-568 y 573-586).

**Plantilla de una actividad:**

```html
<div class="extra-card">
  <div class="extra-icon" style="background:var(--color-primary-100);color:var(--color-primary-700)">
    <i class="ph ph-nombre-del-icono"></i>
  </div>
  <h4>Nombre de la actividad</h4>
  <p>Descripción corta de la actividad.</p>
</div>
```

**Colores disponibles para el icono:**
- `--color-primary-100` / `--color-primary-700` (verde principal)
- `--color-secondary-100` / `--color-secondary-700` (amarillo)
- `--color-tertiary-100` / `--color-tertiary-700` (azul)
- `--color-success-100` / `--color-success-700` (verde claro)
- `--color-coral-100` / `--color-coral-700` (coral)

**Iconos:** usa cualquiera de [Phosphor Icons](https://phosphoricons.com/) con la clase `ph ph-nombre` (ej. `ph ph-music-notes`, `ph ph-football`, `ph ph-flask`). El sitio ya carga la librería en la línea 19.

---

## 9. Cómo publicar los cambios

En este sitio no hay botón de "publicar" separado. En GoDaddy cPanel File Manager:

1. Edita `index.html`.
2. Pulsa **Save Changes** (o `Ctrl + S`).
3. Cierra el editor.
4. Abre tu web `https://www.unmundoporcrear.com`.
5. Pulsa **Ctrl + F5** (recarga forzada) para ver los cambios. Si no aparecen, espera 1-2 minutos y vuelve a recargar.

Los cambios se ven inmediatamente en internet una vez guardados en File Manager.

---

## 10. Errores frecuentes y cómo solucionarlos

| Problema | Causa probable | Solución |
|---|---|---|
| Pantalla en blanco o texto raro | Se borró una llave `}`, una etiqueta `</div>` o se escribió mal el HTML | Restaura `index.html` desde el respaldo (`index-backup-...html`) o descarga la copia original y vuelve a subirla |
| Los cambios no se ven | Caché del navegador o de GoDaddy | Pulsa `Ctrl + F5`; espera 1-2 minutos y vuelve a recargar |
| Imagen no aparece | Nombre mal escrito, mayúsculas/minúsculas, o archivo no subido | Revisa que el nombre en `src=` coincida exactamente con el archivo en la carpeta `img` |
| Botón WhatsApp no abre | Falta `https://wa.me/` delante del número | Verifica que el enlace tenga el formato completo `https://wa.me/573104711322` |
| Menú móvil no funciona | Se borró algo de `js/main.js` | No toques `js/main.js`; restaura desde respaldo |

---

## 11. Lo que NO debes tocar

| Archivo / elemento | Por qué no tocarlo |
|---|---|
| `css/styles.css` | Controla colores, tamaños, responsive y diseño. Si lo editas puedes romper la web en móvil |
| `js/main.js` | Controla el menú móvil, el formulario de WhatsApp, los contadores y el botón "Leer más" del blog |
| `img/logo2.png` | No es el logo oficial. El logo correcto es `img/logop.png` |
| `sitemap.xml` | Archivo para Google. No lo edites salvo que cambies el dominio |
| `robots.txt` | Archivo para motores de búsqueda. Solo toca si quieres añadir el sitemap (ver abajo) |

---

## 12. Configurar el sitemap en `robots.txt` (opcional, para Google)

El archivo `sitemap.xml` ya está creado y apunta a tu homepage. Para que Google lo encuentre, edita `robots.txt` y descomenta la última línea, reemplazando con tu dominio real:

```
Sitemap: https://www.unmundoporcrear.com/sitemap.xml
```

Guarda y listo.

---

## 13. Cheatsheet rápido

| Tarea | Qué buscar en `index.html` | Dónde está |
|---|---|---|
| Cambiar título principal | `<h1 id="hero-title"` | Línea 128 |
| Cambiar subtítulo hero | `<p class="hero-category">` | Línea 123 |
| Cambiar número WhatsApp | `wa.me/573104711322` | Líneas 77, 102, 138, 335, 462, 484, 506, 528, 1204, 1231 |
| Cambiar correo | `unmundoporcrear@gmail.com` | Líneas 1081, 1219, 1299 |
| Cambiar dirección | `Carrera 11a # 113 - 23` | Líneas 1053, 1217, 1295 |
| Cambiar copyright | `© 2026 CREAR Jardín Infantil` | Línea 1313 |
| Cambiar logo | `img/logop.png` | Líneas 64, 129, 1248 |
| Agregar artículo blog | `<article class="blog-card reveal"` | Línea 605 (copiar bloque completo) |
| Agregar actividad | `<div class="extra-card">` | Línea 544 |

---

Si algo no queda claro o se rompe la web, restaura el archivo `index-backup-...html` que hiciste al principio y vuelve a intentarlo. Si necesitas ayuda, contacta a quien te entregó el sitio.