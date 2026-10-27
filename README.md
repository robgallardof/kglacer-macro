<a id="top"></a>

<h1 align="center">kglacer-macro</h1>

<p align="center">Una ayuda para pintar en WPlace: carga una imagen, colócala en el mapa y elige cómo avanzar.</p>

Macro para apoyar el pintado en **wplace.live**.

## Instalacion

1. Instala **Tampermonkey: BETA**:
   <https://chromewebstore.google.com/detail/gcalenpjmijncebpfijmoaglllgpjagf>
2. En los detalles de la extension habilita:
   - Acceso a sitios: **En todos los sitios**.
   - **Permitir secuencias de comandos del usuario**.
   - Incognito solo si vas a usar WPlace en incognito.
   - Acceso a URL de archivo.
3. Instala el userscript:
   <https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js>
4. Recarga **wplace.live**.

En desktop la macro requiere Tampermonkey Beta. En mobile no se bloquea por este requisito.

## Uso

1. Inicia sesion en WPlace.
2. Abre la macro en el panel flotante.
3. Agrega una imagen o importa un archivo `.kgm`.
4. Coloca y ajusta la imagen sobre el mapa.
5. Elige la estrategia de pintado.
6. Usa **Draw** para preparar/pintar los pixeles pendientes.
7. Usa **Draw + Paint** para esperar el cooldown y pulsar el boton nativo de pintar.
8. Usa **Auto farm** o **Auto draw** si quieres ciclos automaticos por temporizador.

## Como pinta

- La macro lee los colores actuales del mapa.
- Compara la imagen con el mapa y solo conserva los pixeles que siguen pendientes.
- Respeta colores desactivados y la opcion de pintar solo colores disponibles.
- El progreso general y por color cuenta los píxeles que coinciden con el mapa; excluye colores desactivados y la transparencia cuando no se pinta.
- El tiempo estimado descuenta las cargas disponibles y usa el tiempo de regeneración de la cuenta.
- Las estrategias cambian el orden de pintado, no los colores de la imagen.
- El panel de colores permite activar, desactivar y reordenar prioridades.

---

# English

Painting helper macro for **wplace.live**.

## Install

1. Install **Tampermonkey: BETA**:
   <https://chromewebstore.google.com/detail/gcalenpjmijncebpfijmoaglllgpjagf>
2. In the extension details enable:
   - Site access: **On all sites**.
   - **Allow user scripts**.
   - Incognito only if you use WPlace in incognito.
   - Allow access to file URLs.
3. Install the userscript:
   <https://github.com/robgallardof/kglacer-macro/raw/refs/heads/main/dist.user.js>
4. Reload **wplace.live**.

On desktop the macro requires Tampermonkey Beta. On mobile this requirement does not block the macro.

## Usage

1. Sign in to WPlace.
2. Open the floating macro panel.
3. Add an image or import a `.kgm` file.
4. Position and adjust the image on the map.
5. Choose a paint strategy.
6. Use **Draw** to prepare/paint pending pixels.
7. Use **Draw + Paint** to wait for cooldown and click the native paint button.
8. Use **Auto farm** or **Auto draw** for timed automatic cycles.

## How Painting Works

- The macro reads current map colors.
- It compares the image against the map and keeps only pixels that are still pending.
- It respects disabled colors and the paint-only-available-colors option.
- Overall and per-color progress counts pixels matching the map, excluding disabled colors and transparency when not painted.
- Estimated waiting time accounts for available charges and the account regeneration rate.
- Strategies change paint order, not the image colors.
- The color panel can enable, disable, and reorder paint priority.

<p align="center"><a href="#top">Volver al inicio</a></p>

<!-- readme-builder:signature:start -->
<p align="center"><a href="https://github.com/robgallardof"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/readme/brand/signature-es-dark.svg" /><img src="assets/readme/brand/signature-es-light.svg" alt="kglacer-macro / Roberto Gallardo" width="360" /></picture></a></p>
<!-- readme-builder:signature:end -->
