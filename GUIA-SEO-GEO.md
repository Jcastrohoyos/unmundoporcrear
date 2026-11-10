# Guía Profesional de SEO y GEO — Jardín Infantil CREAR

Sitio: `https://www.unmundoporcrear.com`

Esta guía explica qué se configuró, qué significa cada cosa y qué debes hacer para seguir mejorando el posicionamiento en Google (SEO) y en motores de respuesta de IA (GEO - Generative Engine Optimization).

---

## 1. ¿Qué se configuró ya en el sitio?

### SEO (Search Engine Optimization)

| Elemento | Estado | Qué hace |
|---|---|---|
| `<title>` optimizado | ✅ | Título único y descriptivo con palabras clave: "Jardín Infantil CREAR | Educación Infantil en Bogotá - Matrículas Abiertas" |
| Meta descripción optimizada | ✅ | Resumen atractivo con CTA ("Agenda tu visita pedagógica por WhatsApp") y palabras clave locales |
| `meta name="robots"` | ✅ | Permite indexar y seguir enlaces (`index, follow`) |
| `meta name="author"` | ✅ | Atribuye el sitio a Jardín Infantil CREAR |
| `hreflang="es-CO"` | ✅ | Le dice a Google que el contenido es para Colombia en español |
| `rel="canonical"` | ✅ | Evita contenido duplicado, apunta a la URL principal |
| Open Graph (Facebook) | ✅ | Título, descripción, imagen y tipo para compartir en redes |
| Twitter Cards | ✅ | Tarjeta grande con imagen para compartir en X/Twitter |
| `sitemap.xml` | ✅ | Mapa del sitio para Google (homepage + secciones clave) |
| `robots.txt` | ✅ | Permite rastreo completo y apunta al sitemap |
| Preload de hero image | ✅ | Mejora LCP (Largest Contentful Paint) — velocidad de carga |
| Preconnect a dominios externos | ✅ | Acelera carga de fuentes, Google, WhatsApp |
| Datos estructurados JSON-LD | ✅ | EducationalOrganization, BreadcrumbList, FAQPage |
| Breadcrumbs visibles | ✅ | Ruta de navegación visible para usuarios y Google |
| Etiqueta `<main>` | ✅ | Semántica HTML: identifica el contenido principal |
| Sección FAQ visible | ✅ | Preguntas frecuentes con respuestas claras |
| Alt texts en imágenes | ✅ | Descripciones para accesibilidad y búsqueda de imágenes |

### GEO (Generative Engine Optimization)

GEO se trata de optimizar para que los motores de respuesta de IA (Google SGE, Bing AI, Perplexity, etc.) entiendan y citen tu sitio cuando alguien pregunta por jardines infantiles en Bogotá.

| Elemento | Estado | Qué hace |
|---|---|---|
| `EducationalOrganization` JSON-LD | ✅ | Entidad estructurada con nombre, dirección, teléfono, horario, servicios, años de fundación |
| `BreadcrumbList` JSON-LD | ✅ | Jerarquía clara del sitio para la IA |
| `FAQPage` JSON-LD | ✅ | Preguntas y respuestas estructuradas para citas directas |
| Contenido semántico (`<main>`, `<section>`, `<article>`) | ✅ | Estructura clara que los modelos de IA pueden leer fácilmente |
| Entidades nombradas claras | ✅ | Dirección exacta, teléfono, horarios, edades, niveles, localidad (Usaquén, Santa Bárbara) |
| Contenido conversacional | ✅ | Preguntas frecuentes redactadas de forma natural, como las haría un usuario |

---

## 2. Datos estructurados implementados (JSON-LD)

El sitio incluye tres tipos de datos estructurados en `<head>`:

### 1. EducationalOrganization
Define al jardín como organización educativa con:
- Nombre, URL, logo, imagen
- Dirección completa (Carrera 11a # 113 - 23, Santa Bárbara, Usaquén, Bogotá, CO)
- Teléfonos (WhatsApp y fijo) con tipo de contacto
- Redes sociales (Facebook, Instagram, YouTube)
- Fecha de fundación (1986)
- Audiencia (niños de 1 a 6 años)
- Tipos de servicio (educación inicial, preescolar, maternal, párvulos, prekínder, kínder)
- Área servida (Bogotá, Colombia)
- Rango de precios (`$$`)
- Horario de atención (Lunes a Viernes, 7:00 - 17:00)

### 2. BreadcrumbList
Ruta de navegación: Inicio > Niveles y Actividades > Contacto

### 3. FAQPage
Cuatro preguntas frecuentes con respuestas estructuradas:
- ¿Qué edades atiende?
- ¿Dónde queda el jardín?
- ¿Cuál es el horario?
- ¿Cómo matricular o agendar visita?

---

## 3. Qué debes hacer tú (checklist de mantenimiento)

### Mensual
- [ ] **Actualizar `sitemap.xml`** si agregas contenido nuevo o cambias secciones importantes
- [ ] **Revisar Google Search Console** (search.google.com) para ver errores de rastreo, impresiones y clics
- [ ] **Verificar que las imágenes tengan `alt` descriptivo** al agregar contenido nuevo
- [ ] **Actualizar la meta descripción** si cambian promociones o matrículas

### Trimestral
- [ ] **Revisar velocidad de carga** en PageSpeed Insights (pagespeed.web.dev)
- [ ] **Actualizar horarios o teléfonos** en JSON-LD y en el contenido visible si cambian
- [ ] **Agregar nuevas preguntas frecuentes** basadas en lo que te preguntan los padres
- [ ] **Revisar que los enlaces de WhatsApp funcionen** (`wa.me/573104711322`)

### Anual
- [ ] **Renovar el dominio y hosting** de GoDaddy
- [ ] **Actualizar el año del copyright** en el footer (`© 2026`)
- [ ] **Revisar y actualizar las fotos** del sitio para que se vean actuales

---

## 4. Cómo mejorar el SEO local (Bogotá / Usaquén)

El SEO local es clave para un jardín infantil. Los padres buscan "jardín infantil cerca de mí", "preescolar Usaquén", "matrículas Bogotá".

### Acciones recomendadas:

1. **Google Business Profile (Google My Business)**
   - Crea o reclama tu perfil en [google.com/business](https://www.google.com/business)
   - Verifica la dirección (Carrera 11a # 113 - 23, Santa Bárbara, Usaquén, Bogotá)
   - Agrega fotos reales de las instalaciones, aulas y patio
   - Pide a los padres actuales que dejen reseñas con estrellas
   - Mantén actualizado el horario y el número de WhatsApp

2. **Palabras clave locales para usar en el contenido**
   - jardín infantil Bogotá
   - preescolar Usaquén
   - maternal Santa Bárbara Bogotá
   - matrículas jardín infantil Bogotá
   - guardería cerca de mí Usaquén
   - educación inicial Bogotá

3. **Contenido del blog (SEO continuo)**
   - Publica artículos en la sección `#blog` con temas como:
     - "Cómo elegir un jardín infantil en Usaquén"
     - "Beneficios de la educación inicial para niños de 1 a 3 años"
     - "Actividades extracurriculares para preescolar en Bogotá"
   - Cada artículo debe tener: título, fecha, categoría, imagen con `alt`, y contenido útil de 600+ palabras

4. **Citas locales (NAP consistente)**
   - Asegúrate de que Nombre, Dirección y Teléfono (NAP) sean idénticos en:
     - Tu sitio web
     - Google Business Profile
     - Facebook, Instagram
     - Directorios locales de Bogotá

---

## 5. Cómo mejorar el GEO (IA Generativa)

Los motores de IA (Google SGE, Bing Copilot, etc.) responden preguntas citando fuentes. Para que te citen:

### Escribe contenido que responda preguntas específicas
En lugar de solo decir "Somos un buen jardín", responde:
- "¿Qué edades atiende el Jardín Infantil CREAR en Usaquén?"
- "¿Cuánto cuesta la matricula en CREAR Bogotá?"
- "¿Qué actividades extracurriculares ofrece CREAR?"

### Usa lenguaje claro y estructurado
- Párrafos cortos (2-4 oraciones)
- Listas con viñetas para servicios, niveles, horarios
- Encabezados (`<h2>`, `<h3>`) con preguntas reales de usuarios

### Incluye datos estructurados (ya hechos)
El JSON-LD de `EducationalOrganization`, `FAQPage` y `BreadcrumbList` ya está implementado. Mantén estos datos actualizados.

### Menciona tu entidad claramente
- Nombre completo: "Jardín Infantil CREAR"
- Ciudad: Bogotá
- Localidad: Usaquén, Santa Bárbara
- Teléfono: +573104711322
- Dirección: Carrera 11a # 113 - 23

---

## 6. Archivos modificados en este sitio

| Archivo | Cambio |
|---|---|
| `index.html` | Meta tags mejorados, JSON-LD estructurado (EducationalOrganization + BreadcrumbList + FAQPage), breadcrumbs visibles, `<main>`, sección FAQ, hreflang, robots meta |
| `css/styles.css` | Estilos de breadcrumbs, main, FAQ grid, items, preguntas y respuestas |
| `sitemap.xml` | Actualizado con lastmod y secciones clave (niveles, contacto, blog) |
| `robots.txt` | Apunta al sitemap correcto |
| `GUIA-GOOGLE-ADS.md` | Guía para Google Ads (creada previamente) |
| `GUIA-EDICION-GODADDY.md` | Guía para editar desde GoDaddy cPanel (creada previamente) |

---

## 7. Herramientas gratuitas recomendadas

| Herramienta | Para qué sirve | URL |
|---|---|---|
| Google Search Console | Ver cómo te ve Google, errores, clics, impresiones | search.google.com |
| PageSpeed Insights | Medir velocidad de carga y mejorar | pagespeed.web.dev |
| Rich Results Test | Validar que tus datos estructurados son correctos | search.google.com/test/rich-results |
| Schema Markup Validator | Validar JSON-LD | schema.org/validator |
| Google Business Profile | SEO local (mapa de Google) | google.com/business |

---

## 8. Checklist rápido de publicación

Cada vez que hagas cambios SEO en `index.html`:

1. Edita el archivo en **File Manager de GoDaddy** (cPanel)
2. Guarda con **Ctrl + S**
3. Valida el JSON-LD en [Rich Results Test](https://search.google.com/test/rich-results)
4. Recarga tu web con **Ctrl + F5**
5. Solicita reindexación en Google Search Console (opcional, acelera que Google vea los cambios)

---

## 9. Si necesitas ayuda

Si no te sientes cómodo editando el código, puedes:
1. Pedirle a quien te entregó el sitio que haga los cambios por ti
2. Usar la guía `GUIA-EDICION-GODADDY.md` para editar de forma segura desde cPanel
3. Hacer un respaldo de `index.html` antes de cualquier cambio (copia como `index-backup-YYYYMMDD.html`)