## Instalar directamente en Android (sin Codespaces ni Expo Go)

He añadido un flujo de GitHub Actions llamado **APK de Perspectiva**. Compila Android en GitHub y adjunta un APK a la ejecución si termina correctamente; no se necesita iniciar Expo ni ejecutar nada en el teléfono. **La primera compilación todavía no está verificada**.

1. Abre [APK de Perspectiva — GitHub Actions](https://github.com/alexfresquet-cmd/perspectiva/actions/workflows/android-apk.yml).
2. Abre la ejecución más reciente. Si figura ✅, en **Artifacts** descarga **Perspectiva-Android-APK** (archivo ZIP).
3. Descomprime el ZIP y abre el archivo `app-release.apk` para instalarlo; Android puede pedirte que autorices la instalación desde tu navegador o administrador de archivos.
4. Si no se ejecutó automáticamente, selecciona **Run workflow → main → Run workflow**.

**Avisos:** La versión inicial es una compilación de prueba. No distribuirla; su firma no está configurada para actualizaciones permanentes. No generar sucesivos APK para actualizar instalaciones con datos locales hasta configurar una clave de firma estable. El lector descarga la edición desde GitHub en cada apertura; no contiene información personal publicada.

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

## Probar en Expo Go desde el móvil sin ordenador

Puedes utilizar **GitHub Codespaces**, que ejecuta Metro en un entorno remoto. No utilizamos Snack y no es necesaria una segunda cuenta de Expo. El Codespace debe permanecer activo durante la prueba.

1. En el móvil, abre https://codespaces.new/alexfresquet-cmd/perspectiva para crear un Codespace. El repositorio tiene `.devcontainer/devcontainer.json` para instalar dependencias durante el arranque.
2. En la terminal del Codespace ejecuta `npm run dev:go` para arrancar Expo con túnel. Si se solicita instalar o autorizar Ngrok, acepta. Espera a que aparezca una URL `exp://` o un QR.
3. Copia el enlace `exp://` y ábrelo con Expo Go o utiliza el lector QR de Expo Go desde otro dispositivo.
4. Si Metro informa de incompatibilidades de dependencias, comprueba primero `npx expo install --check`, corrige las versiones sugeridas y vuelve a arrancar. La ejecución real en tu teléfono sigue pendiente de validación.

En Codespaces, cuando hayas terminado, **detén el Codespace** desde GitHub para no consumir cuotas gratuitas innecesariamente. Metro dejará de servir la app al detenerlo; las noticias continúan disponibles a través de la versión web.

**Para el uso diario**, está prevista una compilación APK independiente con EAS; requiere vincular el nuevo proyecto a tu misma cuenta de Expo y autorizar la compilación. GitHub por sí solo no puede servir una sesión Expo Go sin Metro.

## Actualizaciones
La app consulta: https://raw.githubusercontent.com/alexfresquet-cmd/perspectiva/main/docs/data/edicion.json

Basta actualizar este archivo desde ChatGPT para cambiar las noticias; el código de la aplicación no necesita modificaciones. **La edición inicial está fechada el 25 de septiembre de 2026 y no es una actualización automática.**

No incluir datos personales, claves de API ni información privada en este repositorio público.
