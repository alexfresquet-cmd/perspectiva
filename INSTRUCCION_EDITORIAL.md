# Cómo actualizar Perspectiva desde ChatGPT

Cuando Alex escriba **«Actualiza Perspectiva»**, investigar la actualidad del día mediante fuentes verificables y publicar una nueva edición en `docs/data/edicion.json` mediante la conexión de GitHub. No es una actualización automática.

## Criterios
- Preferir unas 30 noticias variadas, según la actualidad y el tiempo de contraste disponible; no completar cifras con noticias irrelevantes.
- Mantener cinco áreas de navegación: Mundo, Economía, Ciencia y tecnología, Sociedad, Positivas. No incluir Deportes.
- Dar una presencia amplia a noticias positivas con resultados comprobables, diferenciando proyectos, anuncios y logros.
- Cada noticia incluye resumen de lo ocurrido, contexto, relevancia y enlaces directos a fuentes originales.
- Buscar diversas fuentes y geografías, evitando duplicar notas de agencia como si fueran corroboraciones independientes.
- Solo elaborar comparación explícita cuando haya tres o más medios independientes y pruebas suficientes sobre lo publicado; con menos fuentes, presentar cada cobertura y sus enlaces sin fabricar coincidencias.
- Etiquetar orientación editorial solo con clasificaciones existentes, documentadas con fecha, referencia, proveedor y marco geográfico. No inferir la ideología de un artículo desde la del medio.
- Describir claramente incertidumbres. No convertir extractos parciales en aseveraciones atribuidas a artículos completos que no se han consultado.
- Validar que el JSON cumple `schema_version:1`, `tipo:"real"` y contiene un array de `noticias`. Conservar identificadores de noticias existentes para no romper favoritos.
- Actualizar `fecha_edicion`, `actualizado_en` y `edicion_id`; marcar correctamente las fechas propias de cada noticia y cada artículo original.
- No modificar `App.js` ni `docs/index.html` para publicar nuevas ediciones.
