# kglacer-macro

> 🇬🇧 **English** and 🇪🇸 **Español** guide for the KGlacer Macro userscript.

---

## English

Macro/UI to support pixel painting on **wplace.live**.

### Highlights (v4.4.11)

- Added an **External tools** section with animated buttons for the Wplace color converter, Samuel archive, and Eralyon archive.
- External archive buttons now reuse the current Wplace `lat`/`lng`/`zoom` URL zone when opening supported archive tools.
- Added quick shortcuts: **Shift+1** color converter, **Shift+2** Samuel archive, and **Shift+3** Eralyon archive.

- Movable and freely resizable color modal (drag from the header).
- Main brand logo now uses `src/img/logo.svg` with a glow style and **KGlacer** label.
- Shortcuts section now has an internal scrollbar for long lists.
- New **Auto farm** section with modal timer controls (seconds/minutes/hours) to trigger random sparse painting cycles.
- Auto farm config is cached in `localStorage` and can be started quickly with **Shift+F** after first setup.
- Color option labels now use compact proportional icons and switch-style toggles.
- "Skip unavailable premium colors" was renamed to "Paint only available colors" to reflect real behavior.
- Updated distributed userscript version in `dist.user.js` for direct install.
- Added compatibility guards that define a safe `fp_assemble_injection` fallback when third-party wrappers call it before definition.
- Added media autoplay-safe handling to avoid noisy uncaught `NotAllowedError: play() failed` promise rejections before user interaction.
- Restored legacy paint-check logic from `wplace-bot-main`: Draw now only paints pixels that are still different on the map, so rerunning Draw no longer repaints already-correct areas.
- Removed color replacement targeting from Draw flow to keep strict source-color checks and avoid repaint loops.
- Added a new **Update script** button in Settings that opens the direct userscript URL.
- Improved Shield Canvas spoofing so noise is applied only to export copies (toDataURL/toBlob) without mutating the live drawing canvas.
- Settings buttons for **Update script**, **Refresh profile**, **Shield checker**, **Shield info**, and **Test proxy** now share the same animated button style.
- Added a Shield info modal that shows the injected Shield diagnostics/profile data from storage/runtime.
- Shield checker and proxy test now render inline pass/fail output instead of relying on browser alerts.
- Fixed the Shield checker **Settings stored** state by persisting merged default Shield settings and reading runtime-injected settings when available.
- Settings and Shield info now show the detected public IP plus whether the current browser route is direct/Shield-only or configured for the proxy route.
- Modal action buttons (**Update script**, **Test proxy**, **Refresh profile**, **Shield checker**, and **Shield info**) now use the same wide outlined style as the main Draw action.
- Added the missing shortcut rows and active key handlers for **Shift+M** minimize, **Shift+S** show panel, and **Shift+H** hide panel.

### Install

1. Install Tampermonkey: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Open: <https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js>
3. Click install.
4. Make sure user scripts are enabled in your browser.

### Quick usage

1. Add your image or import a `###.kgm` file.
2. Position and adjust the image on the map.
3. Reorder images and choose a strategy.
4. Click **Draw**.
5. Use keyboard shortcuts for faster control.
6. Use **Auto farm** to schedule random farming ticks from its modal timer.

### Development

1. Install [Bun](https://bun.sh/).
2. `bun i`
3. Update version in `src/version.ts`
4. `bun run lint`
5. `bun test`
6. `bun start`

---

## Español

Macro/UI para apoyar el pintado en **wplace.live**.

### Novedades (v4.4.11)

- Se agregó una sección **Herramientas externas** con botones animados para el convertidor de color de Wplace, el archivo Samuel y el archivo Eralyon.
- Los botones de archivo externo ahora reutilizan la zona actual de la URL de Wplace (`lat`/`lng`/`zoom`) al abrir herramientas compatibles.
- Se agregaron atajos rápidos: **Shift+1** convertidor de color, **Shift+2** archivo Samuel y **Shift+3** archivo Eralyon.

- Modal de colores movible y redimensionable libremente (arrastrando la cabecera).
- El logo principal ahora usa `src/img/logo.svg` con estilo glow y etiqueta **KGlacer**.
- La sección de atajos ahora tiene scrollbar interno para listas largas.
- Nueva sección **Auto farm** con modal de temporizador (segundos/minutos/horas) para ejecutar ciclos de pintado aleatorio disperso.
- La configuración de auto farm se guarda en `localStorage` y se puede iniciar rápido con **Shift+F** después de configurarla una vez.
- Las opciones de color ahora usan iconos proporcionales y toggles tipo switch.
- "Omitir colores premium no disponibles" ahora se llama "Pintar solo colores disponibles" para reflejar el comportamiento real.
- Versión del userscript distribuido actualizada en `dist.user.js` para instalación directa.
- Se agregaron guardas de compatibilidad que definen un fallback seguro para `fp_assemble_injection` cuando wrappers de terceros lo invocan antes de estar definido.
- Se agregó manejo seguro de autoplay para evitar rechazos no capturados `NotAllowedError: play() failed` antes de la interacción del usuario.
- Se restauró la lógica clásica de pintado de `wplace-bot-main`: Draw ahora solo pinta píxeles que siguen diferentes en el mapa, evitando repintar zonas ya correctas al volver a ejecutar Draw.
- Se eliminó la lógica de reemplazo de colores en Draw para mantener comparación estricta con los colores de origen y evitar repintados en bucle.
- Se agregó un botón **Update script** en Settings que abre la URL directa del userscript.
- Se mejoró el spoof de Canvas del Shield: ahora el ruido se aplica en una copia de exportación (toDataURL/toBlob) sin mutar el canvas activo de pintado.
- Los botones de configuración **Actualizar script**, **Refrescar perfil**, **Shield checker**, **Info Shield** y **Test proxy** ahora comparten el mismo estilo animado.
- Se agregó un modal de Info Shield que muestra la data/perfil inyectado del Shield desde storage/runtime.
- Shield checker y Test proxy ahora muestran resultados inline de éxito/error sin depender de alerts del navegador.
- Se corrigió el estado **Configuración guardada** del Shield checker persistiendo los valores por defecto combinados y leyendo la configuración inyectada en runtime cuando existe.
- Configuración e Info Shield ahora muestran la IP pública detectada y si la ruta actual del navegador va directa/solo Shield o por la ruta proxy configurada.
- Los botones dentro de modales (**Actualizar script**, **Test proxy**, **Refrescar perfil**, **Shield checker** e **Info Shield**) ahora usan el mismo estilo ancho con borde que la acción principal Draw.
- Se agregaron los atajos faltantes en la lista y sus handlers activos: **Shift+M** minimizar, **Shift+S** mostrar panel y **Shift+H** ocultar panel.

### Instalación

1. Instala Tampermonkey: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Abre: <https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js>
3. Pulsa instalar.
4. Habilita los user scripts en el navegador.

### Uso rápido

1. Agrega tu imagen o importa un archivo `###.kgm`.
2. Posiciona y ajusta la imagen en el mapa.
3. Ordena imágenes y configura estrategia.
4. Pulsa **Dibujar / Draw**.
5. Usa atajos de teclado para operar más rápido.
6. Usa **Auto farm** para programar ticks de farm aleatorio desde su modal.

### Desarrollo

1. Instala [Bun](https://bun.sh/).
2. `bun i`
3. Ajusta la versión en `src/version.ts`
4. `bun run lint`
5. `bun test`
6. `bun start`


## Shield and profile updates
- Settings now include profile selector, refresh, and shield+proxy test button.
- Removed external `Open Shield settings` button from config modal.
- Added i18n labels for Shield feature names and profile controls.
- Color tool icons are now highlighted and replace flow is always available from color chips.

- Fixed color modal bulk actions: Enable all / Disable all now work as direct action buttons.

- Restored legacy draw task comparison to use only source image colors vs current map color (replacement mapping no longer participates in paint targeting).
