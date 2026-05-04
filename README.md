# kglacer-macro

> 🇬🇧 **English** and 🇪🇸 **Español** guide for the KGlacer Macro userscript.

---

## English

Macro/UI to support pixel painting on **wplace.live**.

### Highlights (v4.3.7)

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

### Novedades (v4.3.7)

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
