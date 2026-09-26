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

## Ver la app en Expo Go
Abrir directamente el proyecto importado desde GitHub: https://snack.expo.dev/?platform=mydevice&name=Perspectiva&sourceUrl=https%3A%2F%2Fraw.githubusercontent.com%2Falexfresquet-cmd%2Fperspectiva%2Fmain%2FApp.js . En Snack seleccionar **My Device**, guardar el Snack y abrirlo desde Expo Go. Si la importación no funciona, pegar manualmente el contenido de `App.js`. Crear un repositorio **no equivale** a iniciar el servidor de desarrollo de Expo: el Snack debe crearse una vez y guardarse. El lector también se puede utilizar directamente desde el navegador móvil mediante Pages, sin Expo.

## Actualizaciones
La app consulta: https://raw.githubusercontent.com/alexfresquet-cmd/perspectiva/main/docs/data/edicion.json

Basta actualizar este archivo desde ChatGPT para cambiar las noticias; el código de la aplicación no necesita modificaciones. **La edición inicial está fechada el 25 de septiembre de 2026 y no es una actualización automática.**

No incluir datos personales, claves de API ni información privada en este repositorio público.
