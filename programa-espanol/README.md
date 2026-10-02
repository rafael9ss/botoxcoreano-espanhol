# Botox Coreano Manual · 28 días

Portal estático en español latinoamericano, pensado primero para celular. No requiere cuenta, servidor, dependencias ni proceso de compilación.

## Contenido

- 28 días con cuatro ejercicios cada uno: 112 videos principales alojados en Vimeo.
- Las instrucciones de cada movimiento aparecen encima de su video.
- Los videos empiezan desde el segundo cero.
- Los 16 videos complementarios conservan sus referencias actuales de YouTube.
- El avance se guarda localmente en el navegador de cada alumno.
- `vimeo-videos.csv` y `vimeo-video-ids.json` relacionan los días y las clases con sus IDs de Vimeo.

Se necesita conexión a internet para cargar las fuentes, las imágenes remotas y los reproductores.

## Publicar en Netlify

Este sitio es HTML, CSS y JavaScript estáticos; deja vacío el campo **Build command**.

- Si este directorio es la raíz del repositorio, el **Publish directory** es `.`.
- Si el repositorio es la carpeta de trabajo completa, el **Publish directory** es `outputs/app28d-espanol-latino`.

La configuración `netlify.toml` de este directorio ya indica `publish = "."`. La carpeta que Netlify publique debe incluir `index.html`, `app.js`, `data-es.js`, `styles.css` y `assets/logo.png`.
