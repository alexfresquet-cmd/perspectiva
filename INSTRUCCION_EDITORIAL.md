# Perspectiva · criterio editorial y actualización manual

Cuando Alex pida actualizar Perspectiva, investigar noticias verificables y actualizar directamente `docs/data/edicion.json` mediante la conexión GitHub. El chat sirve para confirmar la publicación, no para sustituir la edición de la aplicación. No es una actualización diaria automática.

## Decisión confirmada: mirada internacional, no centrada en España

- Perspectiva es un **lector mundial en español**, no un agregador de prensa española. Redactar los resúmenes en español a partir de medios y fuentes originales en distintos idiomas. España aparece únicamente si la relevancia internacional o la noticia concreta lo justifica; no tiene cupo privilegiado.
- Buscar activamente, según la actualidad y el contraste disponible, informaciones de **Europa, África, América del Norte, América Latina y el Caribe, Asia oriental y meridional, Oriente Próximo y Oceanía**. No confundir la ubicación del medio con la del acontecimiento. Usar `region` para indicar la procedencia o ámbito de la noticia.
- Para evitar silencios informativos, comprobar que los grandes bloques mundiales tienen presencia cuando hay material reciente contrastable. No forzar una cuota regional ni rellenar con material desactualizado solo por cubrir el mapa. Registrar cualquier vacío significativo en la nota editorial.
- **Diversidad de fuentes real:** contrastar, cuando sea posible, medios de las regiones protagonistas (p. ej., Africanews y otros medios africanos, Asia, América Latina), agencias internacionales (Reuters, AP, AFP) y organismos primarios pertinentes (OMS, ONU, centros de investigación). Ni El País/EFE ni Reuters/AP deben monopolizar la edición. Priorizar enlaces **al artículo específico** del medio original, no páginas de portada, republicaciones o enlaces supuestos. Verificar titular, fecha y destino antes de incorporarlos.
- Para noticias relevantes y controvertidas, si hay más de un medio realmente independiente, reunirlos en la misma ficha y describir el matiz que añade cada uno sin crear falsa equivalencia. Varias piezas de una agencia redistribuidas por otros portales **siguen siendo una sola fuente editorial**.
- Los resúmenes son **propios**, no traducciones literales: explicar qué pasó, contexto, qué se sabe, límites y por qué importa; identificar qué afirmaciones proceden de gobiernos, empresas o estudios. No deducir hechos de titulares o snippets incompletos.
- Cada edición lleva fecha de cierre y fecha individual de cada noticia. **No atribuir a hoy noticias de días anteriores**; identificar explícitamente qué es actualidad del día y qué es contexto relevante. Corregir o retirar versiones superadas.

## Decisión confirmada: bloque local separado y prioridad del distrito de Sant Andreu

- Mantener **dos ámbitos claramente separados**: las ~30 noticias mundiales en `noticias[]` (sin sesgo hacia España) y una sección **Local** en `noticias_locales[]` dentro del mismo JSON. Las noticias de interés español pueden aparecer en ambas únicamente si lo justifica su alcance internacional, sin duplicar artificialmente fichas.
- En Local usar `categoria: "Local"` y `ambito_local` exactamente **"Sant Andreu"**, **"Barcelona"**, **"Catalunya"** o **"España"**. Cada historia conserva su fecha, sus enlaces concretos y los campos explicativos del esquema existente. Puede usar `tema_local` para indicar Agenda, Movilidad, Comunidad, Economía u otros asuntos.
- **Sant Andreu se refiere al distrito de Barcelona**, que incluye Sant Andreu, la Sagrera, Navas, el Congrés i els Indians, el Bon Pastor, Trinitat Vella y Baró de Viver. Nunca mezclarlo con **Sant Andreu de la Barca**, municipio distinto.
- Al preparar cada edición, **buscar primero novedades verificables en Sant Andreu**, después Barcelona, Catalunya y España. Dar prioridad de visualización al distrito pero **no inventar noticias diarias** ni convertir comunicados antiguos en novedades del día. Incluir agendas futuras solo si fecha y lugar están claros; evitar eventos ya pasados salvo que haya un resultado reciente comprobado.
- Referencias locales prioritarias: **betevé**, medios de proximidad y publicaciones oficiales de Ajuntament de Barcelona, Generalitat, emergencias, movilidad u otros organismos cuando sus documentos específicos sean verificables. No enlazar una portada general en lugar del artículo al que se refiere la ficha.
- Si no hay noticias actuales verificadas de Sant Andreu, mostrar un vacío explícito y continuar con Barcelona y demás ámbitos. La edición local es **manual, no alertas en directo**; las incidencias de transporte, alertas meteorológicas o trámites exigen verificar canales operativos antes de actuar.
- La actualización de rutina sigue siendo exclusivamente en `docs/data/edicion.json`. Las pestañas y filtros Local ya están implementados en `App.js` y `docs/index.html`; no modificar el diseño en cada edición.

## Otras reglas editoriales vigentes

- Preferir alrededor de 30 historias bien documentadas y heterogéneas; cantidad flexible ante escasez de verificación. Tres destacadas de **regiones diferentes cuando sea posible**, sin sesgo de origen de medios.
- Mantener navegación: Mundo, Economía, Ciencia y tecnología, Sociedad y Positivas (el feed actual puede usar `Ciencia`, `Tecnología` y `Medioambiente` como subcategorías). **Nunca Deportes**.
- Reservar presencia suficiente para noticias positivas de **distintos continentes** con resultados concretos y verificados. No confundir anuncios, propuestas, prototipos, resultados preliminares y beneficios demostrados.
- No inferir orientación ideológica de artículos o cabeceras. Asignar etiquetas únicamente con evidencia externa fechada, proveedor y contexto; en caso contrario `orientacion: null`.
- Solo permitir `analisis_verificado` y comparación formal con tres o más **fuentes editoriales independientes**, coincidencias, diferencias y límites respaldados.
- Mantener el formato `schema_version: 1`, `tipo: "real"`, `noticias: []`, fuentes HTTPS y campos explicativos por historia. Conservar identificadores de noticias que siguen vigentes para no romper favoritos.
- Publicar exclusivamente datos en `docs/data/edicion.json`; no reescribir `docs/index.html` ni `App.js` en cada edición. Comprobar después el archivo persistido y el despliegue de GitHub Pages si procede.

## Próximo hito

Validar en Expo Go la pestaña Local con una edición internacional y próxima, comprobar los filtros Sant Andreu/Barcelona/Catalunya/España y la permanencia del diseño. Mantener el método manual hasta decidir si conviene automatizar la ingesta.
