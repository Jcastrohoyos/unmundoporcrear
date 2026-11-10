# Tipografía Archer (manual de marca CREAR)

La web busca la familia **Archer**. Hoy ya funciona así:

1. Si **Archer está instalada** en el equipo (licencia del jardín), el navegador
   la usa automáticamente (reglas `local(...)` activas en `css/styles.css`).
2. Si **no está instalada**, se usan los respaldos web cargados desde Google
   Fonts: **Zilla Slab** (títulos) y **Plus Jakarta Sans** (texto). No hay
   errores en consola.

## Cómo activar los archivos WOFF2 (opcional)

Si prefieres que la fuente se sirva desde la web (para que se vea igual en
cualquier equipo, sin instalar nada):

1. Copia estos archivos **con los nombres exactos** a esta carpeta `fonts/`:
   - `archer-light.woff2`  → Archer Light (peso 300)
   - `archer-book.woff2`   → Archer Book (peso 400, texto normal)
   - `archer-medium.woff2` → Archer Medium (pesos 500 y 600)
   - `archer-bold.woff2`   → Archer Bold (peso 700, títulos)
2. Abre `css/styles.css`, busca el bloque **"Archer Family"** (líneas 10-50) y
   **descomenta** la línea `/* , url('../fonts/archer-xxx.woff2') format('woff2') */`
   de cada `@font-face` (quita el `/*` y el `*/`).
3. Recarga la página con **Ctrl + F5**.

> Archer es una fuente comercial (Hoefler&Co / House Industries). Usa solo
> archivos licenciados por el jardín.
