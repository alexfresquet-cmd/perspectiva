# Perspectiva

Lector personal de noticias en español. Código público; coste de uso previsto: 0 €.

## Estructura
- `docs/index.html`: lector web para publicar en GitHub Pages.
- `docs/data/edicion.json`: edición actualizada desde ChatGPT bajo demanda.
- `App.js`: lector móvil para Expo Snack/Expo Go; descarga el JSON público de la rama `main` al abrir y al actualizar.
- `app.json` y `package.json`: metadatos de Expo.
- `INSTRUCCION_EDITORIAL.md`: criterios para preparar y publicar ediciones futuras.

## Ver la web desde cualquier móvil
En **Settings → Pages**, seleccionar **Deploy from a branch → main → /docs → Save**. La URL prevista es https://alexfresquet-cmd.github.io/perspectiva/ (solo funcionará cuando Pages esté activo).

## Uso móvil: diferencias entre Snack y Expo Go

**Importante (26/09/2026): Expo Snack todavía solo admite SDK 54**. No basta con agregar `sdkVersion=57` al enlace: Snack lo rebaja automáticamente a SDK 54. El proyecto principal de este repositorio utiliza SDK 57 y requiere un servidor Expo compatible, una compilación nativa o un sistema alternativo de ejecución; GitHub solo almacena el código, no sirve el bundle de Expo Go.

Para **probar el lector con Snack en Android**:

1. Instalar la versión oficial de Expo Go **SDK 54** desde https://expo.dev/go?device=true&platform=android&sdkVersion=54 (puede ser necesario reemplazar la instalación SDK 57; no hacerlo si se necesita para otros proyectos).
2. Abrir Snack SDK54 con `App.js` importado: https://snack.expo.dev/?sdkVersion=54.0.0&platform=mydevice&name=Perspectiva&sourceUrl=https%3A%2F%2Fraw.githubusercontent.com%2Falexfresquet-cmd%2Fperspectiva%2Fmain%2FApp.js
3. En Snack elegir **My Device** y abrirlo en la versión SDK 54 de Expo Go. Esta ruta no ha sido verificada físicamente todavía.

Si prefieres **no cambiar la versión actual de Expo Go**, activa GitHub Pages en Settings → Pages → Deploy from a branch → main → /docs → Save y usa https://alexfresquet-cmd.github.io/perspectiva/ desde el navegador del móvil. Esta versión web utiliza el mismo JSON de noticias, funciona fuera de casa y no depende de Expo Go.

## Actualizaciones
La app consulta: https://raw.githubusercontent.com/alexfresquet-cmd/perspectiva/main/docs/data/edicion.json

Basta actualizar este archivo desde ChatGPT para cambiar las noticias; el código de la aplicación no necesita modificaciones. **La edición inicial está fechada el 25 de septiembre de 2026 y no es una actualización automática.**

No incluir datos personales, claves de API ni información privada en este repositorio público.
