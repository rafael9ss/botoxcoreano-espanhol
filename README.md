# Botox Coreano Manual — Quiz (Español LATAM)

Funnel interactivo pixel-fiel al original en portugués, localizado a **español latinoamericano**.

## Stack

**Sitio estático** (HTML + CSS + JS vanilla). Sin React/Next. Misma estructura, clases, IDs e interacciones del original.

## Contenido

- `index.html` — 12 pantallas (`#step0` … `#step11`)
- `style.css` — design system original
- `script.js` — auto-avance, back, slider antes/después, chart, loader %, carrusel
- `assets/` — imágenes originales del extract (sin Unsplash)
- `fonts/` — Inter local (woff2 + ttf)

## Cambios vs. original PT

- Todo el copy visible → español LATAM natural
- Video VTurb → placeholder vertical **9:16** (mismo slot de layout)
- Meta Pixel comentado / deshabilitado
- Fuentes servidas en local (opcional; sin dependencia de Google en runtime)

## Desarrollo local

```bash
# Cualquier servidor estático, por ejemplo:
npx serve .
# o
python3 -m http.server 3000
```

Abrí `http://localhost:3000`.

## Deploy (Vercel)

1. Conectá el repo `rafael9ss/botoxcoreano-espanhol`.
2. Framework preset: **Other** (estático).
3. Build: vacío · Output: raíz del repo (o dejá que Vercel sirva `index.html`).
4. Cuando tengas el video real, reemplazá el placeholder 9:16 en `#step10`.

## Notas

- Respuestas del quiz en `userData` (cliente).
- Marca: **Botox Coreano Manual**.
- Sin checkout ni pixels activos en v1.
