# Botox Coreano Manual — Quiz (Español LATAM)

Funnel interactivo (12 pantallas) clonado del protocolo original, localizado a español latinoamericano natural. Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

## Pantallas

1. Splash / carga inicial  
2. Edad  
3. Tipo de piel  
4. Objetivo principal  
5. Área del rostro  
6. Comparador Antes/Después (slider táctil + mouse)  
7. Tiempo diario  
8. Rutina de skincare  
9. Gráfico de resultados estimados (animado)  
10. Loader de plan personalizado + carrusel  
11. Resultado de la evaluación  
12. Placeholder de video 9:16 (sin VTurb)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # producción
npm start       # servir build
```

## Deploy en Vercel

1. Conectá el repo `rafael9ss/botoxcoreano-espanhol` en Vercel.  
2. Framework preset: **Next.js** (detectado automáticamente).  
3. Build command: `npm run build` · Output: `.next`.  
4. No hace falta variable de entorno para v1 (todo es client-side).  
5. Después del deploy, reemplazá el placeholder de video en `src/components/quiz/screens/VideoScreen.tsx` por el player real (VTurb u otro).

## Notas

- Respuestas del quiz viven en estado del cliente (`QuizApp`).  
- Imágenes stock en `/public/images` (Unsplash / SVG logo).  
- Marca usada de forma consistente: **Botox Coreano Manual • 28D**.  
- Sin checkout, pixels ni backend en v1.

## Licencia de assets

Fotos de Unsplash (uso libre). Logo SVG propio del proyecto.
