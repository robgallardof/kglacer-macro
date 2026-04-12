# kglacer-macro

Macro/UI para apoyar el pintado en **wplace.live**.

## Novedades v1.0.0

- Rename completo de marca a **kglacer-macro**.
- Persistencia migrada de `wbot` a `kglacermacro` (con compatibilidad hacia atrás).
- Import/Export ahora usa extensión de configuración **`.kgm`**.
- UI/UX modernizada (Poppins, widgets más limpios, responsive móvil, iconos).
- Soporte de i18n para **es/en** (textos clave del widget e imagen).
- Atajos de teclado: `Shift+B` (mostrar/ocultar), `Shift+Enter` (dibujar), `Shift+I` (agregar imagen).
- Nuevas estrategias menos robóticas: `Humanized`, `Zigzag`, `Brush strokes` y `Diagonal brush` para simular pinceladas humanas.
- Build más robusto: la versión del userscript sale de `src/version.ts`.

## Instalación

1. Instala Tampermonkey: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Abre: <https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js>
3. Pulsa instalar.
4. Habilita user scripts en el navegador.

## Uso rápido

1. Agrega tu imagen o un archivo exportado `###.kgm`.
2. Posiciona y ajusta la imagen en el mapa.
3. Ordena imágenes y configura estrategia.
4. Pulsa **Draw / Dibujar**.
5. Usa atajos de teclado para operar sin abrir menús.

## Desarrollo

1. Instala [Bun](https://bun.sh/)
2. `bun i`
3. Ajusta versión en `src/version.ts`
4. `bun run lint`
5. `bun test`
6. `bun start`
