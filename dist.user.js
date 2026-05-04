// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      4.4.0
// @description  Paint automation macro for https://wplace.live / Macro para automatizar pintado en https://wplace.live
// @author       robgallardof + contributors
// @license      MPL-2.0
// @homepageURL  https://github.com/robgallardof/kglacer-macro
// @updateURL    https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @downloadURL  https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @run-at       document-start
// @match        *://*.wplace.live/*
// @match        *://*.hcaptcha.com/*
// @grant        none
// ==/UserScript==

// Wplace  --> https://wplace.live
// License --> https://www.mozilla.org/en-US/MPL/2.0/
function co(o,a,r){let s=o[r];return o[r]=o[a],o[a]=s,o}function go(o,a){let r=o.indexOf(a);if(r!==-1)o.splice(r,1);return r}var Ha=Math.floor(Math.random()*65536),ka=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function J(o){return new Promise((a)=>setTimeout(a,o))}function K(o,a,r=["error"],s="addEventListener"){return new Promise((l,p)=>{for(let c=0;c<a.length;c++)o[s]?.(a[c],l);for(let c=0;c<r.length;c++)o[s]?.(r[c],p)})}class Oo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,a=15000){this.size=o,this.historyTime=a}push(o){if(o<0)throw new Error("Negative chunk size");let{time:a,historyTime:r}=this.getTime();if(this.history.push({time:a,chunk:o}),this.history[0]&&this.history[0].time+r<a)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((a,r)=>a+r.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),a=o-this.startTime,r=Math.min(a,this.historyTime);return{time:o,historyTime:r}}}function io(o,a){if(a===void 0)console.log(`[KGM][Challenge] ${o}`);else console.log(`[KGM][Challenge] ${o}`,a)}function B(o){return new Promise((a)=>setTimeout(a,o))}function oo(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function _o(o){return[...o.matchAll(/-?\d+/g)].map((a)=>Number.parseInt(a[0],10))}function Yo(o){let a=oo(o).replace(/,/g,"."),r=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(a);if(!r)return;let s=Number.parseFloat(r[1]),l=r[2],p=Number.parseFloat(r[3]);if(!Number.isFinite(s)||!Number.isFinite(p))return;if(l==="+")return String(s+p);if(l==="-")return String(s-p);if(l==="/"&&p!==0)return String(s/p);if((l==="x"||l==="×"||l==="*")&&p!==0)return String(s*p)}function Xo(o){let a=oo(o),r=_o(a);if(/es .* par|is .* even|numero par|número par/.test(a)&&r.length>0)return r[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(a)&&r.length>0)return r[0]%2!==0?"sí":"no";let s=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(a);if(s){let l=Number.parseInt(s[1],10),p=Number.parseInt(s[3],10),c=s[2];return(c===">"?l>p:c==="<"?l<p:c===">="?l>=p:c==="<="?l<=p:l===p)?"sí":"no"}if(/verdadero|true/.test(a))return"sí";if(/falso|false/.test(a))return"no"}function vo(o,a){let r=`${o} ${a}`.trim(),s=oo(r),l=Yo(r);if(l!==void 0)return l;let p=Xo(r);if(p)return p;if(/responde (si|sí) o no|answer yes or no/.test(s))return Math.random()<0.5?"sí":"no";return"sí"}async function Io(o,a){o.focus(),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0}));for(let r=0;r<a.length;r++)o.value+=a[r],o.dispatchEvent(new Event("input",{bubbles:!0})),await B(35+Math.floor(Math.random()*55));o.dispatchEvent(new Event("change",{bubbles:!0}))}function fo(o){if(!o)return;o.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),o.click()}async function xo(){fo(document.querySelector("#menu-info")),await B(150),fo(document.querySelector("#text_challenge"))}function $o(){let o=document.querySelector('[aria-live="polite"]'),a=document.querySelector("div.error-text"),r=/intentalo de nuevo|try again|incorrect/i.test(oo(a?.textContent??""));return Boolean(o&&!r)}async function yo(){await B(1000),await xo();for(;;){if($o()){io("Challenge solved");return}let o=document.querySelector("h2.prompt-text#prompt")?.innerText??"",a=document.querySelector("div.text-text#prompt-text")?.innerText??"",r=document.querySelector('input[type="text"]'),s=document.querySelector(".button-submit");if(!o||!a||!r||!s){await B(300);continue}let l=vo(o,a);io("Answering text challenge",{prompt:o,promptDetails:a,answer:l}),await Io(r,l),await B(180),fo(s),await B(2200)}}function ho(){if(!location.hostname.includes("hcaptcha.com"))return;io("Solver booted"),yo().catch((o)=>{console.error("[KGM][Challenge] Solver crashed",o)})}var zo=["kglacermacro:locale"],ao={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",proxyTitle:"Proxy (Beta)",proxyEnabled:"Enable proxy for web requests (beta)",shieldTitle:"Shield",shieldEnabled:"Enable Script Shield (recommended)",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",skipUnavailableColors:"Paint only available colors",enableAllColors:"Enable all",disableAllColors:"Disable all",replaceWith:"Replace with",shieldProfile:"Profile",shieldProfileAuto:"Auto",shieldExpires:"Expires",shieldRefreshProfile:"Refresh profile",shieldTest:"Test shield + proxy",shieldFeatureNavigator:"Navigator",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Screen",shieldFeatureTimezone:"Timezone",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Media devices",shieldFeatureStorage:"Storage",shieldFeatureBattery:"Battery",shieldFeatureSpeech:"Speech",shieldFeatureFonts:"Fonts",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Show smart replacement suggestions",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",proxyTitle:"Proxy (Beta)",proxyEnabled:"Habilitar proxy para solicitudes web (beta)",shieldTitle:"Shield",shieldEnabled:"Activar Script Shield (recomendado)",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",skipUnavailableColors:"Pintar solo colores disponibles",enableAllColors:"Activar todos",disableAllColors:"Desactivar todos",replaceWith:"Reemplazar por",shieldProfile:"Perfil",shieldProfileAuto:"Auto",shieldExpires:"Expira",shieldRefreshProfile:"Refrescar perfil",shieldTest:"Probar shield + proxy",shieldFeatureNavigator:"Navegador",shieldFeatureUaData:"UA-Data",shieldFeatureScreen:"Pantalla",shieldFeatureTimezone:"Zona horaria",shieldFeatureCanvas:"Canvas",shieldFeatureWebgl:"WebGL",shieldFeatureAudio:"Audio",shieldFeaturePlugins:"Plugins",shieldFeatureMediaDevices:"Dispositivos",shieldFeatureStorage:"Almacenamiento",shieldFeatureBattery:"Batería",shieldFeatureSpeech:"Voz",shieldFeatureFonts:"Fuentes",shieldFeatureMatchMedia:"Match media",shieldFeatureSharedArrayBuffer:"SharedArrayBuffer",smartReplaceMode:"Mostrar sugerencias inteligentes de reemplazo",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área"}};function oa(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in ao)return o;for(let a=0;a<zo.length;a++){let r=localStorage.getItem(zo[a]);if(!r||!(r in ao))continue;return localStorage.setItem("kglacer-macro:locale",r),r}return oa()}function ro(o){localStorage.setItem("kglacer-macro:locale",o)}function Ao(){return Object.keys(ao)}function t(o){let a=_();return ao[a][o]}function P(o){for(let a of o.querySelectorAll("[data-i18n]"))a.textContent=t(a.dataset.i18n);for(let a of o.querySelectorAll("[data-i18n-title]"))a.setAttribute("title",t(a.dataset.i18nTitle));for(let a of o.querySelectorAll("[data-i18n-aria-label]"))a.setAttribute("aria-label",t(a.dataset.i18nAriaLabel));for(let a of o.querySelectorAll("[data-i18n-placeholder]"))a.setAttribute("placeholder",t(a.dataset.i18nPlaceholder))}class Y{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,a){for(let r in a)this[r]=o.querySelector(a[r])}registerEvent(o,a,r,s={}){s.passive??=!0,o.addEventListener(a,r,s),this.runOnDestroy.push(()=>{o.removeEventListener(a,r)})}}function no(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function Mo(o,a,r){let s=no(o/255),l=no(a/255),p=no(r/255),c=Math.cbrt(0.4122214708*s+0.5363325363*l+0.0514459929*p),g=Math.cbrt(0.2119034982*s+0.6806995451*l+0.1073969566*p),i=Math.cbrt(0.0883024619*s+0.2817188376*l+0.6299787005*p),f=0.2104542553*c+0.793617785*g-0.0040720468*i,n=1.9779984951*c-2.428592205*g+0.4505937099*i,u=0.0259040371*c+0.7827717662*g-0.808675766*i;return[f,n,u]}function Ho(o,a,r){let[s,l,p]=o,[c,g,i]=a,f=(po)=>po*180/Math.PI,n=(po)=>po*Math.PI/180,u=1,d=1,b=1,e=Math.sqrt(l**2+p**2),w=Math.sqrt(g**2+i**2),m=(e+w)/2,h=0.5*(1-Math.sqrt(m**7/(m**7+6103515625))),z=l*(1+h),H=g*(1+h),F=Math.sqrt(z**2+p**2),U=Math.sqrt(H**2+i**2),W=p===0&&z===0?0:f(Math.atan2(p,z))%360,C=i===0&&H===0?0:f(Math.atan2(i,H))%360,I=c-s,O=U-F,Q=0;if(F*U!==0){if(Q=C-W,Q>180)Q-=360;else if(Q<-180)Q+=360}let x=2*Math.sqrt(F*U)*Math.sin(n(Q)/2),$=(s+c)/2,y=(F+U)/2,R=(W+C)/2;if(Math.abs(W-C)>180)R+=180;let Bo=1-0.17*Math.cos(n(R-30))+0.24*Math.cos(n(2*R))+0.32*Math.cos(n(3*R+6))-0.2*Math.cos(n(4*R-63)),Vo=1+0.015*($-50)**2/Math.sqrt(20+($-50)**2),bo=1+0.045*y,eo=1+0.015*y*Bo,To=30*Math.exp((-((R-275)/25))**2),Eo=-(2*Math.sqrt(y**7/(y**7+6103515625)))*Math.sin(n(2*To));return Math.sqrt((I/(1*Vo))**2+(O/(1*bo))**2+(x/(1*eo))**2+Eo*(O/(1*bo))*(x/(1*eo)))-I*r}var Z=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],S=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function so(o){if(o===0)return"transparent";let a=Z[o],r=`oklab(${a[0]*100}% ${a[1]} ${a[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",r))return r;let[s=0,l=0,p=0]=(S[o]??"0,0,0").split(",").map((c)=>Number.parseInt(c,10));return`rgb(${s} ${l} ${p})`}var ko=`<div class="wtopbar">
  <button
    class="open-colors"
    type="button"
    data-i18n-title="openColorPanel"
    data-i18n-aria-label="openColorPanel"
  >
    <i class="icon fa-solid fa-palette" aria-hidden="true"></i>
  </button>
  <button class="export" data-i18n-title="exportImage" data-i18n-aria-label="exportImage">
    <i class="icon fa-solid fa-download" aria-hidden="true"></i>
  </button>
  <button class="lock" data-i18n-title="lockImage" data-i18n-aria-label="lockImage">
    <i class="icon icon-lock-open fa-solid fa-lock-open" aria-hidden="true"></i>
    <i class="icon icon-lock-closed fa-solid fa-lock" aria-hidden="true"></i>
  </button>
  <button class="delete" data-i18n-title="deleteImage" data-i18n-aria-label="deleteImage">
    <i class="icon fa-solid fa-trash" aria-hidden="true"></i>
  </button>
</div>
<div class="wrapper">
  <div class="wform">
    <div class="wprogress">
      <div></div>
      <span></span>
    </div>
    <label><span data-i18n="opacity">Opacity</span>:&nbsp;<input class="opacity" type="range" min="0" max="100"/></label>
    <label class="strategy-row">
      <span data-i18n="strategy">Strategy</span>:&nbsp;
      <span class="strategy-controls">
        <select class="strategy">
          <option value="RANDOM" selected data-i18n="random">Random</option>
          <option value="HUMANIZED" data-i18n="humanized">Humanized</option>
          <option value="HUMAN_SOFT_DITHER" data-i18n="humanSoftDither">Human soft dither</option>
          <option value="HUMAN_PATCHY" data-i18n="humanPatchy">Human patchy</option>
          <option value="HUMAN_SWEEP_ARCS" data-i18n="humanSweepArcs">Human sweep arcs</option>
          <option value="HUMAN_MICRO_CORRECTIONS" data-i18n="humanMicroCorrections">Human micro corrections</option>
          <option value="HUMAN_JITTER_FILL" data-i18n="humanJitterFill">Human jitter fill</option>
          <option value="HUMAN_CORNER_BIAS" data-i18n="humanCornerBias">Human corner bias</option>
          <option value="HUMAN_LONG_STROKES" data-i18n="humanLongStrokes">Human long strokes</option>
          <option value="HUMAN_TAP_CLUSTERS" data-i18n="humanTapClusters">Human tap clusters</option>
          <option value="HUMAN_MESSY_SPIRAL" data-i18n="humanMessySpiral">Human messy spiral</option>
          <option value="HUMAN_DRUNK_WALK" data-i18n="humanDrunkWalk">Human drunk walk</option>
          <option value="HUMAN_NOISE_CLOUD" data-i18n="humanNoiseCloud">Human noise cloud</option>
          <option value="HUMAN_PATCH_JUMP" data-i18n="humanPatchJump">Human patch jump</option>
          <option value="HUMAN_HESITANT_LINES" data-i18n="humanHesitantLines">Human hesitant lines</option>
          <option value="HUMAN_OVERLAP_SWEEPS" data-i18n="humanOverlapSweeps">Human overlap sweeps</option>
          <option value="HUMAN_WOBBLE_DRIFT" data-i18n="humanWobbleDrift">Human wobble drift</option>
          <option value="HUMAN_GAP_RECOVERY" data-i18n="humanGapRecovery">Human gap recovery</option>
          <option value="HUMAN_STAIRCASE" data-i18n="humanStaircase">Human staircase</option>
          <option value="HUMAN_EDGE_HUGGER" data-i18n="humanEdgeHugger">Human edge hugger</option>
          <option value="HUMAN_BLOBS" data-i18n="humanBlobs">Human blobs</option>
          <option value="HUMAN_BACKTRACK" data-i18n="humanBacktrack">Human backtrack</option>
          <option value="HUMAN_SHAKY_DIAGONAL" data-i18n="humanShakyDiagonal">Human shaky diagonal</option>
          <option value="HUMAN_LATE_FIXES" data-i18n="humanLateFixes">Human late fixes</option>
          <option value="ZIGZAG" data-i18n="zigzag">Zigzag</option>
          <option value="BRUSH_STROKES" data-i18n="brushStrokes">Brush strokes</option>
          <option value="DIAGONAL_BRUSH" data-i18n="diagonalBrush">Diagonal brush</option>
          <option value="SCRIBBLE" data-i18n="scribble">Scribble</option>
          <option value="CROSSHATCH" data-i18n="crosshatch">Crosshatch</option>
          <option value="WAVE_SWEEP" data-i18n="waveSweep">Wave sweep</option>
          <option value="SCATTERED_LINES" data-i18n="scatteredLines">Scattered lines</option>
          <option value="CONTOUR_JITTER" data-i18n="contourJitter">Contour jitter</option>
          <option value="SPIRAL_WOBBLE" data-i18n="spiralWobble">Spiral wobble</option>
          <option value="CLUSTER_BURSTS" data-i18n="clusterBursts">Cluster bursts</option>
          <option value="ORBITAL" data-i18n="orbital">Orbital</option>
          <option value="FLOW_FIELD" data-i18n="flowField">Flow field</option>
          <option value="EDGE_IN" data-i18n="edgeIn">Edge in</option>
          <option value="DOWN" data-i18n="down">Down</option>
          <option value="UP" data-i18n="up">Up</option>
          <option value="LEFT" data-i18n="left">Left</option>
          <option value="RIGHT" data-i18n="right">Right</option>
          <option value="SPIRAL_FROM_CENTER" data-i18n="spiralOut">Spiral out</option>
          <option value="SPIRAL_TO_CENTER" data-i18n="spiralIn">Spiral in</option>
        </select>
        <button
          class="open-preview"
          type="button"
          data-i18n="previewStrategy"
          data-i18n-title="previewStrategyTitle"
          data-i18n-aria-label="previewStrategyTitle"
        >
          Preview
        </button>
      </span>
    </label>
    <button class="reset-size"><span data-i18n="resetSize">Reset size</span> [<span></span>px]</button>
    <label class="kgm-switch-row">
      <span class="with-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5zm2 2v10h10V7zM3 3h2v2H3zm16 0h2v2h-2zM3 19h2v2H3zm16 0h2v2h-2z"/></svg><span data-i18n="eraseTransparent">Erase transparent pixels</span></span>
      <span class="kgm-switch">
        <input type="checkbox" class="draw-transparent" />
        <span class="kgm-switch-slider" aria-hidden="true"></span>
      </span>
    </label>
    <label class="kgm-switch-row">
      <span class="with-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v2H4zm3 5h13v2H7zm3 5h10v2H10z"/></svg><span data-i18n="drawColorsInOrder">Draw colors in order</span></span>
      <span class="kgm-switch">
        <input type="checkbox" class="draw-colors-in-order" />
        <span class="kgm-switch-slider" aria-hidden="true"></span>
      </span>
    </label>
    <label class="kgm-switch-row">
      <span class="with-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h10v2H3zm12-5h6v2h-6zm0 10h6v2h-6zM7 7l2 2-2 2-2-2zm0 10 2 2-2 2-2-2z"/></svg><span data-i18n="skipUnavailableColors">Paint only available colors</span></span>
      <span class="kgm-switch">
        <input type="checkbox" class="skip-unavailable" />
        <span class="kgm-switch-slider" aria-hidden="true"></span>
      </span>
    </label>
  </div>
  <dialog class="kgm-modal colors-dialog">
    <div class="kgm-modal-head colors-dialog-head">
      <strong data-i18n="overlayColors">Overlay colors</strong>
      <button
        class="modal-close close-colors"
        type="button"
        aria-label="Close"
        data-i18n-aria-label="close"
      >
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
    <p class="colors-dialog-help" data-i18n="colorPanelHelp">
      Toggle each color to enable/disable it. Drag colors in the strip to reorder paint priority.
    </p>
    <p class="colors-dialog-help order" data-i18n="colorPanelOrderHint">
      Color #1 paints first.
    </p>
    <div class="color-tools">
      <label class="kgm-switch-row">
        <span class="with-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3a3 3 0 0 1 3 3v1h8v2h-1v2h1v2h-1v2h1v2h-8v1a3 3 0 1 1-6 0v-1H4v-2h1v-2H4v-2h1V9H4V7h5V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"/></svg><span data-i18n="smartReplaceMode">Smart replacement suggestions</span></span>
        <span class="kgm-switch">
          <input type="checkbox" class="smart-replace-mode" />
          <span class="kgm-switch-slider" aria-hidden="true"></span>
        </span>
      </label>
      <button type="button" class="color-tool-btn enable-all-colors"><i class="fa-solid fa-toggle-on"></i><span data-i18n="enableAllColors">Enable all</span></button>
      <button type="button" class="color-tool-btn disable-all-colors"><i class="fa-solid fa-toggle-off"></i><span data-i18n="disableAllColors">Disable all</span></button>
    </div>
    <input class="color-search" type="search" data-i18n-placeholder="searchColors" placeholder="Search color by hex, English or Spanish"/>
    <div class="colors-dialog-list"></div>
  </dialog>
  <dialog class="kgm-modal preview-dialog">
    <div class="kgm-modal-head preview-dialog-head">
      <strong data-i18n="previewStrategyTitle">Paint preview</strong>
      <button
        class="modal-close close-preview"
        type="button"
        aria-label="Close"
        data-i18n-aria-label="close"
      >
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
    <p class="preview-dialog-help" data-i18n="previewStrategyHelp">
      Simple visual reference using the KGlacer logo.
    </p>
    <div class="preview-dialog-list"></div>
  </dialog>
  <div class="resize n"></div>
  <div class="resize e"></div>
  <div class="resize s"></div>
  <div class="resize w"></div>
</div>
`;class q{bot;image;width;exactColor;static async fromJSON(o,a){let r=new Image;return r.src=a.url.startsWith("http")?await fetch(a.url,{cache:"no-store"}).then((s)=>s.blob()).then((s)=>URL.createObjectURL(s)):a.url,await K(r,["load"],["error"]),new q(o,r,a.width,a.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,a,r=a.naturalWidth,s=!1){this.bot=o;this.image=a;this.width=r;this.exactColor=s;if(s)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let r=1;r<64;r++)if(this.exactColor||!this.bot.unavailableColors.has(r))o.set(S[r],[r,r]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let a=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let r=0;r<this.canvas.height;r++)for(let s=0;s<this.canvas.width;s++){let l=(r*this.canvas.width+s)*4,p=a[l],c=a[l+1],g=a[l+2],i=a[l+3],f=p,n=c,u=g,d=`${f},${n},${u}`;if(this.exactColor){this.pixels[r][s]=i<100?0:S.indexOf(d);continue}let b,e;if(i<100)b=e=0;else if(o.has(d))[b,e]=o.get(d);else{let m=1/0,h=1/0;for(let z=0;z<Z.length;z++){let H=Z[z],F=Ho(Mo(f,n,u),H,0);if(!this.bot.unavailableColors.has(z)&&F<m)m=F,b=z;if(F<h)h=F,e=z}o.set(d,[b,e])}if(b!==0)this.context.fillStyle=`oklab(${Z[b][0]*100}% ${Z[b][1]} ${Z[b][2]})`,this.context.fillRect(s,r,1,1);this.pixels[r][s]=b;let w=this.colors.get(e);if(w)w.amount++;else this.colors.set(e,{color:b,amount:1,realColor:e})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var V="kglacer-macro-settings",Fo=["kglacermacro","wbot"],X="kgm";function ra(){let o=[V,...Fo];for(let a=0;a<o.length;a++){let r=o[a],s=localStorage.getItem(r);if(!s)continue;return{json:s,key:r}}return}function No(){let o=ra();if(!o)return;let a;try{if(a=JSON.parse(o.json),typeof a!=="object")throw new Error("NOT VALID SAVE");if(a.version===1){let r=a;a.images=r.widget.images,a.strategy=r.widget.strategy,delete r.widget}if(o.key!==V)localStorage.setItem(V,o.json)}catch{localStorage.removeItem(o.key),a=void 0}return a}var Po;function A(o,a=!1){if(clearTimeout(Po),a)localStorage.setItem(V,JSON.stringify(o));else Po=setTimeout(()=>{localStorage.setItem(V,JSON.stringify(o))},600)}var M=1000,sa=2048,T=M*sa,G=[],E=[],la=Date.now();function v(o){G.push(o),E.push({id:la++,latitude:(2*Math.atan(Math.exp(-(o.y/T*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/T*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}v({x:T/3|0,y:T/3|0});v({x:T/3*2|0,y:T/3*2|0});function L(o){let[a,r]=o.style.transform.slice(32,-31).split(", ").map((s)=>Number.parseFloat(s));return{x:a,y:r}}class k{bot;static fromJSON(o,a){return new k(o,...a)}static fromScreenPosition(o,a){let{anchorScreenPosition:r,pixelSize:s,anchorWorldPosition:l}=o.findAnchorsForScreen(a);return new k(o,l.x+(a.x-r.x)/s|0,l.y+(a.y-r.y)/s|0)}globalX=0;globalY=0;get tileX(){return this.globalX/M|0}set tileX(o){this.globalX=o*M+this.x}get tileY(){return this.globalY/M|0}set tileY(o){this.globalY=o*M+this.y}get x(){return this.globalX%M}set x(o){this.globalX=this.tileX*M+o}get y(){return this.globalY%M}set y(o){this.globalY=this.tileY*M+o}anchor1Index;anchor2Index;get pixelSize(){return(L(this.bot.$stars[this.anchor2Index]).x-L(this.bot.$stars[this.anchor1Index]).x)/(G[this.anchor2Index].x-G[this.anchor1Index].x)}constructor(o,a,r,s,l){this.bot=o;if(s===void 0||l===void 0)this.globalX=a,this.globalY=r;else this.globalX=a*M+s,this.globalY=r*M+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,a=1/0;for(let r=0;r<G.length;r++){let{x:s,y:l}=G[r];if(s<this.globalX&&l<this.globalY){let p=this.globalX-s+(this.globalY-l);if(p<o)o=p,this.anchor1Index=r}else if(s>this.globalX&&l>this.globalY){let p=s-this.globalX+(l-this.globalY);if(p<a)a=p,this.anchor2Index=r}}}toScreenPosition(){let o=G[this.anchor1Index],a=L(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+a.x,y:(this.globalY-o.y)*this.pixelSize+a.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:a}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:a-window.innerHeight/3})}clone(){return new k(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class j extends Y{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;skipUnavailableColors;smartReplaceMode;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,a){return new j(o,k.fromJSON(o,a.position),await q.fromJSON(o,a.pixels),a.strategy,a.opacity,a.drawTransparentPixels,a.drawColorsInOrder,a.skipUnavailableColors,a.smartReplaceMode,a.colors,a.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$enableAllColors;$disableAllColors;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$skipUnavailable;$smartReplaceMode;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;$replacementDialog;constructor(o,a,r,s="SPIRAL_FROM_CENTER",l=50,p=!1,c=!1,g=!0,i=!1,f=[],n=!1){super();this.bot=o;this.position=a;this.pixels=r;this.strategy=s;this.opacity=l;this.drawTransparentPixels=p;this.drawColorsInOrder=c;this.skipUnavailableColors=g;this.smartReplaceMode=i;this.colors=f;this.lock=n;this.element.innerHTML=ko,this.element.classList.add("wimage"),P(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$enableAllColors:".enable-all-colors",$disableAllColors:".disable-all-colors",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$skipUnavailable:".skip-unavailable",$smartReplaceMode:".smart-replace-mode",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();A(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),A(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),A(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,A(this.bot)}),this.registerEvent(this.$skipUnavailable,"click",()=>{this.skipUnavailableColors=this.$skipUnavailable.checked,this.updateTasks(),A(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,A(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),A(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$enableAllColors,"click",()=>{for(let u of this.colors)u.disabled=void 0;this.updateTasks(),this.updateColors(),A(this.bot)}),this.registerEvent(this.$disableAllColors,"click",()=>{for(let u of this.colors)u.disabled=!0;this.updateTasks(),this.updateColors(),A(this.bot)}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,skipUnavailableColors:this.skipUnavailableColors,smartReplaceMode:this.smartReplaceMode,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),a=new Set,r=new Map;for(let s=0;s<this.colors.length;s++){let l=this.colors[s];if(l.disabled)a.add(l.realColor);r.set(l.replacementColor??l.realColor,s)}for(let{x:s,y:l}of this.strategyPositionIterator()){let p=this.pixels.pixels[l][s],c=this.colors.find((n)=>n.realColor===p),g=this.pixels.colors.get(p)?.color??p,i=c?.replacementColor??g;if(a.has(p))continue;o.globalX=this.position.globalX+s,o.globalY=this.position.globalY+l;let f=o.getMapColor();if(i!==f&&(this.drawTransparentPixels||i!==0))this.tasks.push({position:o.clone(),color:i})}if(this.drawColorsInOrder)this.tasks.sort((s,l)=>(r.get(s.color)??0)-(r.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:a}=this.position.toScreenPosition(),r=this.position.pixelSize*this.pixels.width,s=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${a.toFixed(3)}px, 0)`,this.element.style.width=`${r}px`,this.element.style.height=`${s}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder,this.$skipUnavailable.checked=this.skipUnavailableColors,this.$smartReplaceMode.checked=this.smartReplaceMode;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,p=Math.max(0,l-this.tasks.length),c=l>0?p/l*100|0:0;this.$progressText.textContent=`${p}/${l} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),go(this.bot.images,this),this.bot.widget.update(),A(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let r=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-r.left,offsetY:o.clientY-r.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let a=this.$colorsDialog.getBoundingClientRect(),r=Math.max(8,window.innerWidth-a.width-8),s=Math.max(8,window.innerHeight-a.height-8),l=Math.min(r,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),p=Math.min(s,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(p)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let a=document.createDocumentFragment(),r=document.createElement("article");r.className="preview-card";let s=document.createElement("strong");s.textContent=this.getStrategyLabel(o);let l=document.createElement("canvas");l.className="preview-canvas",l.width=156,l.height=156,this.paintStrategyPreview(l,o),r.append(s,l),a.append(r),this.$previewDialogList.append(a)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((r,s)=>`${s}:${r.realColor}:${r.disabled?1:0}`).join("|"),a=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===a)return;this.previewCacheSignature=a,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return t("random");case"HUMANIZED":return t("humanized");case"HUMAN_SOFT_DITHER":return t("humanSoftDither");case"HUMAN_PATCHY":return t("humanPatchy");case"HUMAN_SWEEP_ARCS":return t("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return t("humanMicroCorrections");case"HUMAN_JITTER_FILL":return t("humanJitterFill");case"HUMAN_CORNER_BIAS":return t("humanCornerBias");case"HUMAN_LONG_STROKES":return t("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return t("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return t("humanMessySpiral");case"HUMAN_DRUNK_WALK":return t("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return t("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return t("humanPatchJump");case"HUMAN_HESITANT_LINES":return t("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return t("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return t("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return t("humanGapRecovery");case"HUMAN_STAIRCASE":return t("humanStaircase");case"HUMAN_EDGE_HUGGER":return t("humanEdgeHugger");case"HUMAN_BLOBS":return t("humanBlobs");case"HUMAN_BACKTRACK":return t("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return t("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return t("humanLateFixes");case"ZIGZAG":return t("zigzag");case"BRUSH_STROKES":return t("brushStrokes");case"DIAGONAL_BRUSH":return t("diagonalBrush");case"DOWN":return t("down");case"UP":return t("up");case"LEFT":return t("left");case"RIGHT":return t("right");case"SPIRAL_FROM_CENTER":return t("spiralOut");case"SPIRAL_TO_CENTER":return t("spiralIn");case"SCRIBBLE":return t("scribble");case"CROSSHATCH":return t("crosshatch");case"WAVE_SWEEP":return t("waveSweep");case"SCATTERED_LINES":return t("scatteredLines");case"CONTOUR_JITTER":return t("contourJitter");case"SPIRAL_WOBBLE":return t("spiralWobble");case"CLUSTER_BURSTS":return t("clusterBursts");case"ORBITAL":return t("orbital");case"FLOW_FIELD":return t("flowField");case"EDGE_IN":return t("edgeIn");default:return o}}paintStrategyPreview(o,a){let r=o.getContext("2d");if(!r)return;r.fillStyle="#0f1526",r.fillRect(0,0,o.width,o.height);let s=this.getSampledImagePreviewData(),l=this.getCachedPreviewSequence(a,s.mask,s.width,s.height),p=Math.min(o.width/s.width,o.height/s.height),c=(o.width-s.width*p)/2,g=(o.height-s.height*p)/2,i=this.previewAnimations.get(o);if(i)cancelAnimationFrame(i),this.previewAnimationHandles.delete(i);let f=(m)=>{let h=requestAnimationFrame((z)=>{this.previewAnimationHandles.delete(h),m(z)});return this.previewAnimationHandles.add(h),h},n=(m)=>{r.fillStyle="#0f1526",r.fillRect(0,0,o.width,o.height);for(let h=0;h<Math.min(m,l.length);h++){let z=l[h],H=s.colors.get(`${z.x}:${z.y}`)??0;if(!H)continue;r.fillStyle=so(H),r.fillRect(c+z.x*p,g+z.y*p,Math.max(1,p),Math.max(1,p))}},u=Math.min(3400,Math.max(900,l.length*8)),b=u+220,e=(m,h)=>{if(!this.$previewDialog.open)return;let z=(h-m)%b,H=Math.min(1,z/u),F=H*H*(3-2*H);n(Math.floor(l.length*F));let U=f((W)=>{e(m,W)});this.previewAnimations.set(o,U)},w=performance.now();e(w,w)}getCachedPreviewSequence(o,a,r=this.pixels.width,s=this.pixels.height){let l=this.colors.map((i,f)=>`${f}:${i.realColor}:${i.disabled?1:0}`).join("|"),p=`${o}:${r}x${s}:${a.length}:${this.drawColorsInOrder?1:0}:${l}`,c=this.previewSequenceCache.get(p);if(c)return c;let g=r===this.pixels.width&&s===this.pixels.height?this.getExactPreviewSequence(o,a):this.getApproxPreviewSequence(o,a,r);if(this.drawColorsInOrder){let i=new Map;for(let f=0;f<this.colors.length;f++)i.set(this.colors[f].realColor,f);g.sort((f,n)=>(i.get(this.pixels.pixels[f.y]?.[f.x]??0)??0)-(i.get(this.pixels.pixels[n.y]?.[n.x]??0)??0))}return this.previewSequenceCache.set(p,g),g}getExactPreviewSequence(o,a){let r=this.strategy;this.strategy=o;let s=[...this.strategyPositionIterator()];this.strategy=r;let l=new Set(a.map(({x:p,y:c})=>`${p}:${c}`));return s.filter(({x:p,y:c})=>l.has(`${p}:${c}`))}getApproxPreviewSequence(o,a,r){let s=[...a],l=(g,i,f)=>{return(g*73856093+i*19349663+f*83492791>>>0)/4294967296},p=(g,i)=>s.sort((f,n)=>f.x*g+f.y*i-(n.x*g+n.y*i)||f.y-n.y||f.x-n.x),c=s.sort((g,i)=>{if(g.y!==i.y)return g.y-i.y;let f=g.y%2===0?g.x:r-g.x,n=i.y%2===0?i.x:r-i.x;return f-n});switch(o){case"UP":return p(0,-1);case"LEFT":return p(-1,0);case"RIGHT":return p(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=r/2,i=Math.max(1,Math.round(s.reduce((f,n)=>f+n.y,0)/Math.max(1,s.length)));return s.sort((f,n)=>{let u=(f.x-g)**2+(f.y-i)**2,d=(n.x-g)**2+(n.y-i)**2;return o==="SPIRAL_FROM_CENTER"?u-d:d-u}),s}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return s.sort((g,i)=>l(g.x,g.y,o.length)-l(i.x,i.y,o.length));default:return c}}getSampledImagePreviewData(){let o=this.pixels.width,a=this.pixels.height,r=j.PREVIEW_MASK_BASE_WIDTH,s=j.PREVIEW_MASK_BASE_HEIGHT,l=Math.min(1,r/Math.max(1,o),s/Math.max(1,a)),p=Math.max(1,Math.round(o*l)),c=Math.max(1,Math.round(a*l)),g=new Set;for(let u=0;u<this.colors.length;u++){let d=this.colors[u];if(d.disabled)g.add(d.realColor)}let i=new Map,f=new Map;for(let u=0;u<a;u++)for(let d=0;d<o;d++){let b=this.pixels.pixels[u]?.[d]??0;if(!b||g.has(b))continue;let e=Math.min(p-1,Math.floor(d/o*p)),w=Math.min(c-1,Math.floor(u/a*c)),m=`${e}:${w}`;if(!i.has(m))i.set(m,{x:e,y:w});if(!f.has(m))f.set(m,b)}let n=[...i.values()];if(!n.length){let u=this.fallbackPreviewMask();return{width:o,height:a,mask:u,colors:new Map(u.map((d)=>[`${d.x}:${d.y}`,this.pixels.pixels[d.y]?.[d.x]??0]))}}return{width:p,height:c,mask:n,colors:f}}getImagePreviewMask(){let o=this.pixels.width,a=this.pixels.height,r=new Set;for(let l=0;l<this.colors.length;l++){let p=this.colors[l];if(p.disabled)r.add(p.realColor)}let s=[];for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=this.pixels.pixels[l]?.[p]??0;if(c!==0&&!r.has(c))s.push({x:p,y:l})}return s.length?s:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],a=this.pixels.width/2,r=this.pixels.height/2,s=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let l=0;l<this.pixels.height;l++)for(let p=0;p<this.pixels.width;p++)if((p-a)**2+(l-r)**2<=s**2)o.push({x:p,y:l});return o}applyLocale(){if(P(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let a=S[o]??"0,0,0",[r=0,s=0,l=0]=a.split(",").map((p)=>Number.parseInt(p,10));return`#${[r,s,l].map((p)=>p.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let a=S[o]??"0,0,0",[r=0,s=0,l=0]=a.split(",").map((i)=>Number.parseInt(i,10)),p=Math.max(r,s,l),c=Math.min(r,s,l);if(p-c<15)return["gray","grey","gris","neutral","neutro"];if(r>s+30&&r>l+30)return["red","rojo"];if(s>r+30&&s>l+30)return["green","verde"];if(l>r+30&&l>s+30)return["blue","azul"];if(r>170&&s>120&&l<130)return["orange","naranja"];if(r>170&&s>110&&l>140)return["pink","rosa"];if(r>120&&s<100&&l>120)return["purple","violet","morado"];if(r>130&&s>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}colorFamily(o){let[a=0,r=0,s=0]=(S[o]??"0,0,0").split(",").map((l)=>Number.parseInt(l,10));if(a>r+35&&a>s+35)return"red";if(r>a+25&&r>s+20)return a>90?"olive":"green";if(s>a+25&&s>r+25)return"blue";if(a>120&&s>120)return"wine";return"neutral"}replacementCandidates(o){let a=this.colorFamily(o);return Array.from({length:S.length-1},(r,s)=>s+1).filter((r)=>!this.bot.unavailableColors.has(r)&&this.colorFamily(r)===a)}openReplacementPicker(o,a){this.$replacementDialog?.remove();let r=document.createElement("dialog");r.className="kgm-modal replacement-dialog";let s=this.pixels.colors.get(a)?.color??a,l=o.replacementColor??s,c=(this.smartReplaceMode?this.replacementCandidates(a):Array.from({length:S.length-1},(g,i)=>i+1)).filter((g)=>!this.bot.unavailableColors.has(g)).map((g)=>{let i=this.colorHex(g).toUpperCase();return`<button type="button" class="replacement-option ${g===l?"active":""}" data-color="${g}" style="--option-color:${so(g)}"><span class="dot"></span><span>#${g}</span><span>${i}</span></button>`}).join("");r.innerHTML=`<div class="kgm-modal-head"><strong>${t("replaceWith")}</strong><button class="modal-close" type="button" aria-label="${t("close")}"><i class="icon fa-solid fa-xmark" aria-hidden="true"></i></button></div><div class="replacement-grid">${c}</div>`,document.body.append(r),this.$replacementDialog=r,r.querySelector(".modal-close").onclick=()=>{r.close(),r.remove()};for(let g of r.querySelectorAll(".replacement-option"))g.onclick=()=>{let i=Number.parseInt(g.dataset.color??"0",10);if(!i)return;o.replacementColor=i,this.updateTasks(),this.updateColors(),A(this.bot),r.close(),r.remove()};r.showModal()}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",t("colorPanelResults"));let a=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((r)=>!this.pixels.colors.has(r.realColor))){let r=new Map(this.colors.map((s)=>[s.realColor,s]));this.colors=this.pixels.colors.values().toArray().sort((s,l)=>l.amount-s.amount).map((s)=>({realColor:s.realColor,disabled:r.get(s.realColor)?.disabled,replacementColor:r.get(s.realColor)?.replacementColor})),A(this.bot)}for(let r=0;r<this.colors.length;r++){let s=this.colors[r],l=this.pixels.colors.get(s.realColor),p=!1,c=l.realColor!==l.color;if(this.skipUnavailableColors&&c&&s.replacementColor===void 0)s.disabled=!0;let g=l.amount/o*100,i=this.colorHex(l.realColor),f=this.colorKeywords(l.realColor),n=()=>{s.disabled=s.disabled?void 0:!0,u.classList.toggle("disabled",Boolean(s.disabled));let w=u.querySelector(".state");if(w)w.textContent=s.disabled?t("disabled"):t("enabled");A(this.bot)},u=document.createElement("button");u.className=`color-chip ${s.disabled?"disabled":""}`,u.draggable=!0,u.setAttribute("aria-label",`${t("overlayColors")} #${r+1}: ${i.toUpperCase()}`);let d=s.replacementColor??l.color,b=`#${d} ${this.colorHex(d).toUpperCase()}`;u.innerHTML=`<span class="order-index">#${r+1}</span>
<span class="drag" title="${t("up")} / ${t("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${g.toFixed(1)}%</span>
  <span class="hex">${i.toUpperCase()}</span>
  <span class="state">${s.disabled?t("disabled"):t("enabled")}</span>
  <span class="replacement">${t("replaceWith")}: ${b}</span>
</span>
<span class="premium ${c?"on":""}">${c?t("premium"):""}</span>`,u.querySelector(".swatch").style.setProperty("--swatch-color",so(l.realColor)),u.addEventListener("click",()=>{if(p){p=!1;return}n(),this.updateTasks()}),u.addEventListener("dragstart",(w)=>{p=!0,u.classList.add("dragging"),w.dataTransfer?.setData("text/plain",String(r)),w.dataTransfer.effectAllowed="move"}),u.addEventListener("dragend",()=>{u.classList.remove("dragging")}),u.addEventListener("dragover",(w)=>{w.preventDefault(),u.classList.add("drag-target")}),u.addEventListener("dragleave",()=>{u.classList.remove("drag-target")}),u.addEventListener("drop",(w)=>{w.preventDefault(),u.classList.remove("drag-target");let m=Number.parseInt(w.dataTransfer?.getData("text/plain")??"-1",10);if(m<0||m===r||m>=this.colors.length)return;this.colors.splice(r,0,...this.colors.splice(m,1)),A(this.bot),this.updateColors()});{let w=document.createElement("button");w.className="replacement-select",w.type="button",w.textContent=`\uD83C\uDFA8 ${t("replaceWith")}`,w.addEventListener("click",(m)=>{m.stopPropagation(),this.openReplacementPicker(s,l.realColor)}),u.append(w)}{let w=document.createElement("button");w.textContent=t("buy"),w.className="buy-chip",w.addEventListener("click",(m)=>{m.stopPropagation(),document.getElementById("color-"+l.realColor)?.click()}),u.append(w)}let e=`${i} ${f.join(" ")} ${l.realColor} ${S[l.realColor]}`;if(!a||e.toLowerCase().includes(a))this.$colorsDialogList.append(u)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,a=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let r=0;r<a;r++)for(let s=0;s<o;s++)yield{x:s,y:r};break}case"UP":{for(let r=a-1;r>=0;r--)for(let s=0;s<o;s++)yield{x:s,y:r};break}case"LEFT":{for(let r=0;r<o;r++)for(let s=0;s<a;s++)yield{x:r,y:s};break}case"RIGHT":{for(let r=o-1;r>=0;r--)for(let s=0;s<a;s++)yield{x:r,y:s};break}case"RANDOM":{let r=[];for(let s=0;s<a;s++)for(let l=0;l<o;l++)r.push({x:l,y:s});for(let s=r.length-1;s>=0;s--){let l=Math.floor(Math.random()*(s+1)),p=r[s];r[s]=r[l],r[l]=p}yield*r;break}case"ZIGZAG":{for(let r=0;r<a;r++)if(r%2===0)for(let s=0;s<o;s++)yield{x:s,y:r};else for(let s=o-1;s>=0;s--)yield{x:s,y:r};break}case"HUMANIZED":{let r=Math.max(4,Math.floor(Math.min(o,a)/10)),s=[];for(let l=0;l<a;l+=r)for(let p=0;p<o;p+=r)s.push({x:p,y:l});for(let l=s.length-1;l>=0;l--){let p=Math.floor(Math.random()*(l+1)),c=s[l];s[l]=s[p],s[p]=c}for(let l=0;l<s.length;l++){let p=s[l],c=Math.min(a,p.y+r),g=Math.min(o,p.x+r);for(let i=p.y;i<c;i++)if(Math.random()>0.35)for(let n=p.x;n<g;n++)yield{x:n,y:i};else for(let n=g-1;n>=p.x;n--)yield{x:n,y:i}}break}case"HUMAN_SOFT_DITHER":{let r=new Set;for(let s=0;s<a;s++){let l=Math.floor(Math.random()*3)-1;if((s+l)%2===0)for(let c=0;c<o;c+=2)r.add(`${c},${s}`),yield{x:c,y:s};else for(let c=1;c<o;c+=2)r.add(`${c},${s}`),yield{x:c,y:s}}for(let s=0;s<a;s++)for(let l=0;l<o;l++){let p=`${l},${s}`;if(r.has(p))continue;yield{x:l,y:s}}break}case"HUMAN_PATCHY":{let r=new Set,s=o*a;while(r.size<s){let l=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*5);for(let g=p-c;g<=p+c;g++)for(let i=l-c;i<=l+c;i++){if(i<0||i>=o||g<0||g>=a)continue;if(Math.hypot(i-l,g-p)>c+Math.random()*1.2)continue;let f=`${i},${g}`;if(r.has(f))continue;r.add(f),yield{x:i,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let r=new Set,s=(o-1)/2,l=(a-1)/2,p=Math.hypot(s,l);for(let c=0;c<4;c++){let g=Math.random()*Math.PI*2;for(let i=0;i<=p;i+=0.35){let f=Math.PI/2+Math.random()*(Math.PI/1.5),n=Math.max(10,Math.floor(i*8));for(let u=0;u<n;u++){let d=g+f*u/n+Math.sin(i)*0.08,b=Math.round(s+Math.cos(d)*i),e=Math.round(l+Math.sin(d)*i);if(b<0||b>=o||e<0||e>=a)continue;let w=`${b},${e}`;if(r.has(w))continue;r.add(w),yield{x:b,y:e}}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let i=`${g},${c}`;if(r.has(i))continue;yield{x:g,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let r=new Set;for(let s=0;s<a;s++){let l=s%2===0?1:-1,p=l>0?0:o-1;for(let c=0;c<o;c++){let g=p+(Math.random()>0.82?l:0),i=s+(Math.random()>0.9?1:0);for(let f of[{x:p,y:s},{x:g,y:s},{x:p,y:i}]){if(f.x<0||f.x>=o||f.y<0||f.y>=a)continue;let n=`${f.x},${f.y}`;if(r.has(n))continue;r.add(n),yield f}p+=l}}for(let s=0;s<a;s++)for(let l=0;l<o;l++){let p=`${l},${s}`;if(r.has(p))continue;yield{x:l,y:s}}break}case"HUMAN_JITTER_FILL":{let r=[];for(let s=0;s<a;s++)for(let l=0;l<o;l++)r.push({x:l,y:s});r.sort((s,l)=>{let p=s.y+(Math.random()-0.5)*1.8,c=l.y+(Math.random()-0.5)*1.8;if(p!==c)return p-c;return s.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*r;break}case"HUMAN_CORNER_BIAS":{let r=[{x:0,y:0},{x:o-1,y:0},{x:0,y:a-1},{x:o-1,y:a-1}],s=r[Math.floor(Math.random()*r.length)],l=[];for(let p=0;p<a;p++)for(let c=0;c<o;c++){let i=Math.hypot(c-s.x,p-s.y)+Math.random()*3.5;l.push({point:{x:c,y:p},score:i})}l.sort((p,c)=>p.score-c.score);for(let p of l)yield p.point;break}case"HUMAN_LONG_STROKES":{let r=new Set,s=o*a;while(r.size<s){let l=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=Math.random()*Math.PI*2,g=Math.sign(Math.cos(c)),i=Math.sign(Math.sin(c)),f=10+Math.floor(Math.random()*40);for(let n=0;n<f;n++){if(l<0||l>=o||p<0||p>=a)break;let u=`${l},${p}`;if(!r.has(u))r.add(u),yield{x:l,y:p};if(Math.random()>0.78)l+=i,p+=g;else l+=g,p+=i}}break}case"HUMAN_TAP_CLUSTERS":{let r=new Set,s=o*a;while(r.size<s){let l=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=3+Math.floor(Math.random()*10);for(let g=0;g<c;g++){let i=Math.round(l+(Math.random()-0.5)*6),f=Math.round(p+(Math.random()-0.5)*6);if(i<0||i>=o||f<0||f>=a)continue;let n=`${i},${f}`;if(r.has(n))continue;r.add(n),yield{x:i,y:f}}}break}case"HUMAN_MESSY_SPIRAL":{let r=new Set,s=(o-1)/2,l=(a-1)/2,p=Math.hypot(s,l)+2;for(let c=0;r.size<o*a;c++){let g=c/3,i=Math.min(p,g*0.18),f=g*0.29+Math.sin(g*0.13)*0.8,n=Math.round(s+Math.cos(f)*i+Math.sin(g)*0.7),u=Math.round(l+Math.sin(f)*i+Math.cos(g)*0.7);if(n<0||n>=o||u<0||u>=a){if(c>o*a*18)break;continue}let d=`${n},${u}`;if(r.has(d)){if(Math.random()>0.9)continue}else r.add(d),yield{x:n,y:u};if(c>o*a*18)break}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let i=`${g},${c}`;if(r.has(i))continue;yield{x:g,y:c}}break}case"HUMAN_DRUNK_WALK":{let r=new Set,s=Math.floor(Math.random()*o),l=Math.floor(Math.random()*a),p=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(r.size<o*a){let c=`${s},${l}`;if(!r.has(c))r.add(c),yield{x:s,y:l};let g=[];for(let n of p){let u=s+n.x,d=l+n.y;if(u<0||u>=o||d<0||d>=a)continue;g.push({x:u,y:d})}if(!g.length)break;let i=g.filter((n)=>{return!r.has(`${n.x},${n.y}`)});if(i.length&&Math.random()>0.2){let n=i[Math.floor(Math.random()*i.length)];s=n.x,l=n.y;continue}let f=g[Math.floor(Math.random()*g.length)];s=f.x,l=f.y}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let i=`${g},${c}`;if(r.has(i))continue;yield{x:g,y:c}}break}case"HUMAN_NOISE_CLOUD":{let r=[];for(let s=0;s<a;s++)for(let l=0;l<o;l++){let p=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((s+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,g=Math.hypot(l-o/2,s-a/2)*0.08;r.push({point:{x:l,y:s},score:p+c+g})}r.sort((s,l)=>s.score-l.score);for(let s of r)yield s.point;break}case"HUMAN_PATCH_JUMP":{let r=new Set,s=[];for(let l=0;l<Math.max(6,o*a/18);l++)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});while(r.size<o*a){let l=s[Math.floor(Math.random()*s.length)],p=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let g=l.y-c;g<=l.y+c;g++)for(let i=l.x-p;i<=l.x+p;i++){if(i<0||i>=o||g<0||g>=a)continue;if(Math.random()>0.86)continue;let f=`${i},${g}`;if(r.has(f))continue;r.add(f),yield{x:i,y:g}}if(Math.random()>0.72&&s.length<o*a/2)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});if(r.size>o*a*0.92)break}for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=`${p},${l}`;if(r.has(c))continue;yield{x:p,y:l}}break}case"HUMAN_HESITANT_LINES":{let r=new Set;for(let s=0;s<a;s++){let l=s%2===0;for(let p=0;p<o;p++){let c=l?p:o-1-p,g=`${c},${s}`;if(!r.has(g))r.add(g),yield{x:c,y:s};if(Math.random()>0.7){let i=Math.max(0,Math.min(o-1,c+(Math.random()>0.5?1:-1))),f=Math.max(0,Math.min(a-1,s+(Math.random()>0.65?1:0))),n=`${i},${f}`;if(!r.has(n))r.add(n),yield{x:i,y:f}}}}for(let s=0;s<a;s++)for(let l=0;l<o;l++){let p=`${l},${s}`;if(r.has(p))continue;yield{x:l,y:s}}break}case"HUMAN_OVERLAP_SWEEPS":{let r=[],s=Math.random()*Math.PI*2;for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=Math.sin((p+l)*0.42+s)*2.2,g=Math.cos((p-l)*0.3+s)*1.4;r.push({point:{x:p,y:l},score:l+c+g+(Math.random()-0.5)*3.4})}r.sort((l,p)=>l.score-p.score);for(let l of r)yield l.point;break}case"HUMAN_WOBBLE_DRIFT":{let r=[],s=o/2,l=a/2;for(let p=0;p<a;p++)for(let c=0;c<o;c++){let g=Math.hypot(c-s,p-l)*0.25,i=Math.sin((c+1)*0.9)*1.8+Math.cos((p+1)*1.1)*1.8+Math.sin((c+p)*0.35)*1.4;r.push({point:{x:c,y:p},score:g+i+(Math.random()-0.5)*2.8})}r.sort((p,c)=>p.score-c.score);for(let p of r)yield p.point;break}case"HUMAN_GAP_RECOVERY":{let r=new Set,s=[];for(let l=0;l<a;l++)for(let p=0;p<o;p++){if(Math.random()>0.87){s.push({x:p,y:l});continue}r.add(`${p},${l}`),yield{x:p,y:l}}s.sort((l,p)=>Math.hypot(l.x-o/2,l.y-a/2)-Math.hypot(p.x-o/2,p.y-a/2));for(let l of s){let p=`${l.x},${l.y}`;if(r.has(p))continue;r.add(p),yield l}break}case"HUMAN_STAIRCASE":{let r=new Set,s=o+a-1;for(let l=0;l<s;l++){let p=Math.max(0,l-o+1),c=Math.min(a-1,l);for(let g=p;g<=c;g++){let i=l-g,f=[{x:i,y:g},{x:i+(Math.random()>0.5?1:-1),y:g},{x:i,y:g+(Math.random()>0.5?1:-1)}];for(let n of f){if(n.x<0||n.x>=o||n.y<0||n.y>=a)continue;let u=`${n.x},${n.y}`;if(r.has(u))continue;r.add(u),yield n}}}for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=`${p},${l}`;if(r.has(c))continue;yield{x:p,y:l}}break}case"HUMAN_EDGE_HUGGER":{let r=[];for(let s=0;s<a;s++)for(let l=0;l<o;l++){let p=Math.min(l,s,o-1-l,a-1-s);r.push({point:{x:l,y:s},score:p*3.5+(Math.random()-0.5)*5.5})}r.sort((s,l)=>s.score-l.score);for(let s of r)yield s.point;break}case"HUMAN_BLOBS":{let r=new Set,s=o*a;while(r.size<s){let l=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*4);for(let g=p-c;g<=p+c;g++)for(let i=l-c;i<=l+c;i++){if(i<0||i>=o||g<0||g>=a)continue;let f=Math.atan2(g-p,i-l),n=c+Math.sin(f*3+Math.random())*0.8;if(Math.hypot(i-l,g-p)>n)continue;let u=`${i},${g}`;if(r.has(u))continue;r.add(u),yield{x:i,y:g}}}break}case"HUMAN_BACKTRACK":{let r=new Set,s=[];for(let l=0;l<a;l++)for(let p=0;p<o;p++)s.push({x:p,y:l});s.sort((l,p)=>l.y-p.y+(Math.random()-0.5)*2.2+(l.x-p.x)*0.04);for(let l=0;l<s.length;l++){let p=s[l],c=`${p.x},${p.y}`;if(r.has(c))continue;if(r.add(c),yield p,l>1&&Math.random()>0.74){let g=s[l-1],i=`${g.x},${g.y}`;if(!r.has(i))r.add(i),yield g}}for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=`${p},${l}`;if(r.has(c))continue;yield{x:p,y:l}}break}case"HUMAN_SHAKY_DIAGONAL":{let r=[];for(let s=0;s<a;s++)for(let l=0;l<o;l++){let p=Math.abs(l-s)*0.6,c=Math.sin(l*1.4+s*0.8)*1.8+Math.cos(s*1.1+l*0.5)*1.5;r.push({point:{x:l,y:s},score:p+c+(Math.random()-0.5)*3.2})}r.sort((s,l)=>s.score-l.score);for(let s of r)yield s.point;break}case"HUMAN_LATE_FIXES":{let r=[],s=[];for(let l=0;l<a;l++)for(let p=0;p<o;p++)if(Math.random()>0.9)s.push({x:p,y:l});else r.push({x:p,y:l});r.sort((l,p)=>l.y-p.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?l.x-p.x:0)),s.sort((l,p)=>Math.hypot(p.x-o/2,p.y-a/2)-Math.hypot(l.x-o/2,l.y-a/2)),yield*r,yield*s;break}case"DIAGONAL_BRUSH":{for(let r=0;r<o+a-1;r++){let s=r%2===0,l=[],p=Math.max(0,r-o+1),c=Math.min(a-1,r);for(let g=p;g<=c;g++){let i=r-g;if(i>=0&&i<o)l.push({x:i,y:g})}if(Math.random()>0.55)l.reverse();if(s)for(let g=l.length-1;g>=0;g--)yield l[g];else yield*l}break}case"BRUSH_STROKES":{let r=Array.from({length:a},()=>Array(o).fill(!1)),s=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(g,i)=>g>=0&&g<o&&i>=0&&i<a,p=0,c=o*a;for(let g=0;g<c*6&&p<c;g++){let i=Math.floor(Math.random()*o),f=Math.floor(Math.random()*a),n=s[Math.floor(Math.random()*s.length)],u=3+Math.floor(Math.random()*16);for(let d=0;d<u;d++){if(!l(i,f))break;if(!r[f][i])r[f][i]=!0,p++,yield{x:i,y:f};if(Math.random()>0.72)n=s[Math.floor(Math.random()*s.length)];i+=n.x,f+=n.y}}for(let g=0;g<a;g++)for(let i=0;i<o;i++)if(!r[g][i])yield{x:i,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let r=new Set,s=o*a,l=Math.floor(o/2),p=Math.floor(a/2),c=[[1,0],[0,1],[-1,0],[0,-1]],g=0,i=1,f=(u,d)=>u>=0&&u<o&&d>=0&&d<a,n=function*(){let u=0;while(u<s){for(let d=0;d<2;d++){for(let b=0;b<i;b++){if(f(l,p)){let e=`${l},${p}`;if(!r.has(e)){if(r.add(e),yield{x:l,y:p},u++,u>=s)return}}l+=c[g][0],p+=c[g][1]}g=(g+1)%4}i++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*n();else{let u=[...n()];for(let d=u.length-1;d>=0;d--)yield u[d]}break}case"SCRIBBLE":{let r=new Set,s=o*a,l=Math.floor(o/2),p=Math.floor(a/2);for(let c=0;r.size<s&&c<s*24;c++){let g=`${l},${p}`;if(!r.has(g))r.add(g),yield{x:l,y:p};if(l+=Math.floor(Math.random()*3)-1,p+=Math.floor(Math.random()*3)-1,l<0||l>=o||p<0||p>=a)l=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a)}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let i=`${g},${c}`;if(r.has(i))continue;r.add(i),yield{x:g,y:c}}break}case"CROSSHATCH":{let r=[];for(let p=0;p<o+a-1;p++)for(let c=Math.max(0,p-o+1);c<=Math.min(a-1,p);c++){let g=p-c;r.push({x:g,y:c})}let s=[];for(let p=-a+1;p<o;p++)for(let c=0;c<a;c++){let g=c+p;if(g>=0&&g<o)s.push({x:g,y:c})}let l=new Set;for(let p of[...r,...s]){let c=`${p.x},${p.y}`;if(l.has(c))continue;l.add(c),yield p}break}case"WAVE_SWEEP":{let r=new Set;for(let s=0;s<o;s++){let p=(Math.sin(s/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(a-1)|0;for(let c=0;c<a;c++){let g=p+c,i=p-c;for(let f of[g,i]){if(f<0||f>=a)continue;let n=`${s},${f}`;if(r.has(n))continue;r.add(n),yield{x:s,y:f}}}}break}case"SCATTERED_LINES":{let r=new Set,s=o*a;for(let l=0;r.size<s&&l<s*14;l++){let p=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=Math.random()*Math.PI*2,i=Math.round(Math.cos(g)),f=Math.round(Math.sin(g)),n=6+Math.floor(Math.random()*28);for(let u=0;u<n;u++){if(p<0||p>=o||c<0||c>=a)break;let d=`${p},${c}`;if(!r.has(d))r.add(d),yield{x:p,y:c};p+=i,c+=f}}for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=`${p},${l}`;if(r.has(c))continue;r.add(c),yield{x:p,y:l}}break}case"CONTOUR_JITTER":{let r=new Set;for(let s=0;s<Math.ceil(Math.min(o,a)/2);s++){let l=[],p=s,c=s,g=o-s-1,i=a-s-1;for(let f=p;f<=g;f++)l.push({x:f,y:c});for(let f=c+1;f<=i;f++)l.push({x:g,y:f});for(let f=g-1;f>=p;f--)l.push({x:f,y:i});for(let f=i-1;f>c;f--)l.push({x:p,y:f});for(let f=l.length-1;f>0;f--){let n=Math.floor(Math.random()*(f+1)),u=l[f];l[f]=l[n],l[n]=u}for(let f of l){let n=`${f.x},${f.y}`;if(r.has(n))continue;r.add(n),yield f}}break}case"SPIRAL_WOBBLE":{let r=new Set,s=o/2,l=a/2,p=Math.hypot(s,l);for(let c=0;r.size<o*a&&c<o*a*9;c++){let g=c/(o*a*9)*p,i=c*0.31+Math.sin(c*0.07)*0.7,f=Math.round(s+Math.cos(i)*g),n=Math.round(l+Math.sin(i)*g);if(f<0||f>=o||n<0||n>=a)continue;let u=`${f},${n}`;if(r.has(u))continue;r.add(u),yield{x:f,y:n}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let i=`${g},${c}`;if(r.has(i))continue;yield{x:g,y:c}}break}case"CLUSTER_BURSTS":{let r=new Set,s=o*a;for(let l=0;r.size<s&&l<s*12;l++){let p=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=2+Math.floor(Math.random()*10);for(let i=c-g;i<=c+g;i++)for(let f=p-g;f<=p+g;f++){if(f<0||f>=o||i<0||i>=a)continue;if(Math.hypot(f-p,i-c)>g)continue;let n=`${f},${i}`;if(r.has(n))continue;r.add(n),yield{x:f,y:i}}}for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=`${p},${l}`;if(r.has(c))continue;r.add(c),yield{x:p,y:l}}break}case"ORBITAL":{let r=new Set,s=(o-1)/2,l=(a-1)/2,p=Math.ceil(Math.max(s,l));for(let c=0;c<=p;c++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let i=0;i<g;i++){let f=i/g*Math.PI*2+(c%2?0.3:-0.3),n=Math.round(s+Math.cos(f)*c),u=Math.round(l+Math.sin(f)*c);if(n<0||n>=o||u<0||u>=a)continue;let d=`${n},${u}`;if(r.has(d))continue;r.add(d),yield{x:n,y:u}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let i=`${g},${c}`;if(r.has(i))continue;yield{x:g,y:c}}break}case"FLOW_FIELD":{let r=new Set,s=o*a;for(let l=0;r.size<s&&l<s*18;l++){let p=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a);for(let g=0;g<120;g++){if(p<0||p>=o||c<0||c>=a)break;let i=`${p},${c}`;if(!r.has(i))r.add(i),yield{x:p,y:c};let f=Math.sin(p*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((p+c)*0.05);p+=Math.round(Math.cos(f)),c+=Math.round(Math.sin(f))}}for(let l=0;l<a;l++)for(let p=0;p<o;p++){let c=`${p},${l}`;if(r.has(c))continue;r.add(c),yield{x:p,y:l}}break}case"EDGE_IN":{let r=new Set,s=Math.ceil(Math.min(o,a)/2);for(let l=0;l<s;l++){let p=l,c=o-1-l,g=l,i=a-1-l;for(let f=p;f<=c;f++)for(let n of[g,i]){let u=`${f},${n}`;if(r.has(u))continue;r.add(u),yield{x:f,y:n}}for(let f=g+1;f<=i-1;f++)for(let n of[p,c]){let u=`${n},${f}`;if(r.has(u))continue;r.add(u),yield{x:n,y:f}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),A(this.bot)}move(o){if(!this.moveInfo)return;let a=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),r=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=a+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-a)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,a+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=r+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-r)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,r+this.moveInfo.height);this.update(),A(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let a=o.target;if(a.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(a.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(a.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(a.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${X}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Do=`/* stylelint-disable declaration-no-important */
/* stylelint-disable plugin/no-low-performance-animation-properties */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable declaration-block-single-line-max-declarations */
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';

:root {
  --hover: #1f2433;
  --text-invert: #fff;
  --error: #ff5c7c;
  --resize: 8px;
  --text: #ecf2ff;
  --background: #0f111a;
  --background-hover: #20263a;
  --background-disabled: #2f3448;
  --main: #6d7bff;
  --main-hover: #7f8bff;
  --border: #2a3044;
  --surface-card: #141c31;
  --surface-card-hover: #1b2743;
  --glow-main: rgb(122 148 255 / 40%);
  --ring: rgb(129 140 248 / 55%);
  --input-bg: #111a2e;
  --input-border: rgb(148 163 255 / 28%);
  --input-hover: #17233d;
  --card-radius: 12px;
  --action-download: #55d977;
  --action-lock: #ffd166;
  --action-delete: #ff6b6b;
  --action-palette: #ff9f43;
}

.text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center:nth-child(
    -n + FAKE_FAVORITE_LOCATIONS
  ) {
  display: none;
}

.wwidget {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(380px, 94vw);
  height: 100dvh;
  border-right: var(--border) 1px solid;
  background: linear-gradient(180deg, #101526, #0b0e18);
  color: var(--text);
  font-family: Poppins, sans-serif;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.wwidget .title {
  display: grid;
  gap: 12px;
  padding: 16px 12px 12px 66px;
  border-bottom: var(--border) 1px solid;
  background-color: #0f1424;
  color: var(--text-invert);
  font-weight: 700;
  font-size: 18px;
  text-align: left;
}

.wwidget .widget-logo {
  object-fit: contain;
  width: 52px;
  height: auto;
  border-radius: 14px;
  filter: drop-shadow(0 8px 14px rgb(0 0 0 / 35%))
    drop-shadow(0 0 14px rgb(125 145 255 / 35%));
  animation: logo-float 3.6s ease-in-out infinite;
}

.wwidget .widget-brand {
  display: flex;
  gap: 10px;
  align-items: center;
}

.wwidget .widget-brand-text {
  position: relative;
  color: #e8ecff;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.4px;
  text-shadow:
    0 0 12px rgb(109 123 255 / 35%),
    0 0 26px rgb(87 189 255 / 22%);
}

.wwidget .widget-brand-text::after {
  content: '';
  position: absolute;
  right: -8px;
  bottom: -2px;
  width: 46px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #6d7bff, #8fd8ff);
  box-shadow: 0 0 10px rgb(143 216 255 / 55%);
}

@keyframes logo-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-2px) scale(1.02);
  }
}

.wwidget .widget-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.wwidget .widget-section-autofarm .widget-actions {
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid rgb(143 162 255 / 20%);
}

.wwidget .widget-actions strong {
  color: #c1cdf3;
  font-size: 11px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.wwidget .widget-actions button {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 34px;
  padding: 7px 10px;
  border: var(--border) 1px solid;
  border-radius: 8px;
  background: #1a2032;
  color: var(--text);
  font-weight: 600;
  font-size: 11px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.wwidget .widget-section-head {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.wwidget .actions-inline {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.wwidget .actions-inline button {
  flex-direction: column;
  gap: 4px;
  min-height: 50px;
  padding: 8px 6px;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
}

.wwidget .actions-inline button i {
  font-size: 14px;
}

.wwidget .open-config-toggle {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  width: auto;
  min-height: 32px;
  border-radius: 999px;
  background: linear-gradient(90deg, #253864, #1b2848);
  color: #dce6ff;
}

.wwidget .open-config-toggle i {
  color: #8fd8ff;
}

.wwidget .widget-actions button:hover {
  background: #24304d;
  box-shadow: 0 6px 14px rgb(0 0 0 / 30%);
  transform: translateY(-1px);
}

.wwidget .capture-template {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.wwidget .widget-section-actions button {
  display: inline-flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.wwidget .widget-section-summary {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  cursor: pointer;
}

.wwidget .widget-section-summary::-webkit-details-marker {
  display: none;
}

.wwidget .widget-section-summary i {
  color: #95abf9;
  transition: transform 0.2s ease;
}

.wwidget details[open] > .widget-section-summary i {
  transform: rotate(180deg);
}

.wwidget .widget-image-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-bottom: 8px;
}

.wwidget.wopen .wopen-button svg {
  transform: rotate(90deg);
}

.wwidget.wopen {
  box-shadow: 0 12px 30px rgb(15 23 42 / 30%);
  transform: translateX(0);
}

.wwidget .wopen-button svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentcolor;
  transition: transform 0.3s ease;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.wwidget .wopen-button {
  position: fixed;
  top: 14px;
  left: 16px;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: var(--border) 1px solid;
  border-color: #3b4360;
  border-radius: 999px;
  background-color: #171d2d;
  color: #e7ecff;
  box-shadow: 0 8px 24px rgb(2 6 23 / 55%);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.wwidget .wopen-button:hover {
  background-color: #202943;
  box-shadow: 0 10px 26px rgb(2 6 23 / 65%);
  transform: scale(1.05);
}

.wwidget .images {
  display: grid;
  gap: 10px;
  overflow-y: auto;
  max-height: 32dvh;
  padding: 4px 8px;
}

.wwidget .images .image {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: stretch;
  width: 100%;
  min-height: 72px;
  padding: 8px;
  border: 1px solid rgb(109 123 255 / 20%);
  border-radius: 12px;
  background: linear-gradient(180deg, #1a2440, #141b2f);
  box-shadow:
    0 10px 24px rgb(0 0 0 / 30%),
    0 0 0 1px rgb(109 123 255 / 10%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.wwidget .images .image:hover {
  border-color: rgb(109 123 255 / 55%);
  box-shadow:
    0 14px 28px rgb(0 0 0 / 38%),
    0 0 0 1px rgb(109 123 255 / 24%);
  transform: translateY(-1px);
}

.wwidget .images .image .preview {
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 60px;
  margin: 0;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 10px;
  background: #0f1321;
}

.wwidget .images .image img {
  max-width: 100%;
  max-height: 56px;
  margin: 0 auto;
  border-radius: 8px;
  cursor: pointer;
}

.wwidget .images .image .image-controls {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
  align-content: center;
}

.wwidget .images .image .image-controls button {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  line-height: 1;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  background: linear-gradient(180deg, #212b45, #1a2238);
  color: #d9e3ff;
  font-size: 14px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.wwidget .images .image .image-controls button:hover {
  border-color: rgb(109 123 255 / 55%);
  box-shadow: 0 8px 16px rgb(0 0 0 / 30%);
  filter: saturate(1.12);
  transform: scale(1.06);
}

.wwidget .images .image .image-controls .colors {
  color: var(--action-palette);
}

.wwidget .images .image .image-controls .preview-strategy {
  color: #d8b4ff;
}

.wwidget .images .image .image-controls .download {
  color: var(--action-download);
}

.wwidget .images .image .image-controls .up,
.wwidget .images .image .image-controls .down {
  color: #b7c4f8;
}

.kgm-modal .shortcuts {
  display: grid;
  gap: 8px;
  overflow: hidden;
  width: calc(100% - 10px);
  margin: 4px 5px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #151d30;
  text-align: left;
  white-space: normal;
}

.kgm-modal .shortcuts .shortcuts-summary {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: #d7e1ff;
  list-style: none;
  font-size: 11px;
  cursor: pointer;
}

.kgm-modal .shortcuts .shortcuts-summary:hover {
  background: rgb(129 151 240 / 10%);
}

.kgm-modal .shortcuts .shortcuts-summary::-webkit-details-marker {
  display: none;
}

.kgm-modal .shortcuts .shortcuts-summary-title {
  display: inline-flex;
  gap: 7px;
  align-items: center;
}

.kgm-modal .shortcuts .shortcuts-summary-title i {
  color: #9db3ff;
  font-size: 12px;
}

.kgm-modal .shortcuts .shortcuts-chevron {
  color: #8ea4ee;
  font-size: 10px;
  transition: transform 0.2s ease;
}

.kgm-modal .shortcuts[open] .shortcuts-chevron {
  transform: rotate(180deg);
}

.kgm-modal .shortcuts .shortcut-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  overflow-y: auto;
  width: 100%;
  max-height: 220px;
  margin: 0;
  padding: 0 10px 10px;
  list-style: none;
  text-align: left;
  scrollbar-width: thin;
  scrollbar-color: rgb(141 160 255 / 60%) rgb(16 24 43 / 75%);
}

.kgm-modal .shortcuts .shortcut-list::-webkit-scrollbar {
  width: 7px;
}

.kgm-modal .shortcuts .shortcut-list::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgb(16 24 43 / 75%);
}

.kgm-modal .shortcuts .shortcut-list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: linear-gradient(180deg, #6d7bff, #8ea4ee);
}

.kgm-modal .shortcuts .shortcut-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  align-items: start;
  padding: 7px;
  border: 1px solid rgb(140 159 255 / 22%);
  border-radius: 10px;
  background: linear-gradient(180deg, rgb(18 27 46 / 92%), rgb(11 19 33 / 92%));
  text-align: left;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.kgm-modal .shortcuts .shortcut-item:hover {
  border-color: rgb(129 151 240 / 55%);
  box-shadow: 0 10px 20px rgb(0 0 0 / 25%);
  transform: translateY(-1px);
}

.kgm-modal .shortcuts .shortcut-label {
  display: inline-flex;
  gap: 6px;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
  color: #cfdbff;
  font-weight: 600;
  font-size: 11px;
  text-align: left;
}

.kgm-modal .shortcuts .shortcut-label span {
  line-height: 1.25;
  white-space: normal;
  overflow-wrap: anywhere;
}

.kgm-modal .shortcuts .shortcut-label i {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(180deg, #2f5287, #22385f);
  color: #eff5ff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 25%);
  font-size: 12px;
}

.kgm-modal .shortcuts .shortcut-item-color-panel .shortcut-label i {
  color: var(--action-palette);
}

.kgm-modal .shortcuts .shortcut-item-lock-image .shortcut-label i {
  color: var(--action-lock);
}

.kgm-modal .shortcuts .shortcut-keys {
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: flex-start;
  align-items: center;
  place-self: end start;
}

.kgm-modal .shortcuts .shortcut-item:nth-child(3n + 1) .shortcut-label i {
  background: linear-gradient(180deg, #3f7cff, #2552d3);
}

.kgm-modal .shortcuts .shortcut-item:nth-child(3n + 2) .shortcut-label i {
  background: linear-gradient(180deg, #17b26a, #14804e);
}

.kgm-modal .shortcuts .shortcut-item:nth-child(3n) .shortcut-label i {
  background: linear-gradient(180deg, #f97316, #d9480f);
}

.kgm-modal .shortcuts kbd {
  min-width: 28px;
  padding: 3px 8px;
  border: 1px solid rgb(173 191 255 / 62%);
  border-bottom-width: 3px;
  border-radius: 6px;
  background: linear-gradient(180deg, #3a4b77 0%, #273a63 45%, #1a2641 100%);
  color: #ebf1ff;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 24%),
    inset 0 -1px 0 rgb(6 10 20 / 55%),
    0 1px 2px rgb(3 7 15 / 45%);
  font-weight: 700;
  font-size: 11px;
  font-family: Poppins, sans-serif;
  letter-spacing: 0.3px;
  text-align: center;
  text-transform: uppercase;
}

.kgm-modal .shortcuts .shortcut-keys kbd + kbd {
  position: relative;
  margin-left: 9px;
}

.kgm-modal .shortcuts .shortcut-keys kbd + kbd::before {
  content: '+';
  position: absolute;
  top: 50%;
  left: -9px;
  color: #9cb2f8;
  font-weight: 700;
  font-size: 11px;
  transform: translateY(-50%);
}

.kgm-modal .shortcuts.shortcut-pulse {
  border-color: rgb(109 123 255 / 75%);
  box-shadow: 0 0 0 1px rgb(109 123 255 / 35%);
}

.wimage {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  container-type: normal;
}

.wimage canvas {
  width: 100%;
  height: 100%;
  box-shadow: inset var(--text) 0 0 0 1px;
  cursor: all-scroll;
  image-rendering: pixelated;
}

.wimage .wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dashed rgb(109 123 255 / 75%);
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgb(9 12 20 / 65%);
}

.wimage .wform {
  position: absolute;
  top: calc(100% + 50px);
  left: 0;
  overflow: auto;
  width: 320px;
  max-height: min(70dvh, 520px);
  border: var(--border) 1px solid;
  border-radius: 10px;
  background-color: #151c2d;
  color: var(--text);
  box-shadow: 0 18px 36px rgb(2 6 23 / 45%);
  transform-origin: top left;
}

.wimage:hover .wrapper .wform,
.wimage:hover .wtopbar {
  opacity: 1;
}

.wform {
  font-weight: 700;
  font-size: 13px;
  font-family: Poppins, sans-serif;
}

.wform > * {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: calc(100% - 10px);
  margin: 5px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wwidget .wform {
  display: grid;
  gap: 8px;
  overflow-y: auto;
  max-height: calc(100dvh - 92px);
  padding: 0 8px 14px;
}

.wwidget .wform > * {
  margin: 4px;
}

.wwidget .wform > .widget-section {
  display: grid;
  gap: 8px;
  width: auto;
  margin: 0;
  padding: 12px;
  border: 1px solid rgb(129 140 248 / 24%);
  border-radius: 12px;
  background: linear-gradient(180deg, rgb(20 30 52 / 86%), rgb(14 22 40 / 88%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 4%),
    0 8px 18px rgb(0 0 0 / 18%);
}

.wwidget .widget-section-title {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  color: #dbe5ff;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.wwidget .widget-section-images .images {
  max-height: 28dvh;
  padding: 4px 0;
}

.wwidget .wform button,
.wwidget .wform input,
.wwidget .wform select,
.wwidget .wform textarea,
.wwidget .wform label:has(input[type='checkbox']) {
  padding: 10px 12px;
}

.wwidget .widget-section-actions > button,
.wwidget .widget-image-actions button {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.wwidget .widget-section-actions > button i,
.wwidget .widget-image-actions button i {
  color: #8fd8ff;
}

.wwidget .widget-actions button i {
  color: #8fd8ff;
}

.wwidget .autooverlay-start i,
.wwidget .autofarm-start i {
  color: #5fe39a;
}

.wwidget .autooverlay-stop i,
.wwidget .autofarm-stop i {
  color: #ff7b8f;
}

.wwidget .autooverlay-config i,
.wwidget .autofarm-config i {
  color: #ffcf66;
}

.wform button,
.wform input,
.wform select,
.wform textarea,
.wform label:has(input[type='checkbox']) {
  padding: 9px 10px;
  border: 1px solid var(--input-border);
  border-radius: var(--card-radius);
  background: linear-gradient(180deg, #17233d 0%, var(--input-bg) 100%);
  color: var(--text);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 4%),
    0 1px 0 rgb(7 11 22 / 35%);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    filter 0.2s ease;
}

.wform input[type='range'] {
  width: 100%;
  height: 32px;
  background: linear-gradient(
    to right,
    var(--main) var(--val),
    var(--background-disabled) var(--val)
  );
  cursor: ew-resize;
  appearance: none;
}

.wform input[type='range']::-moz-range-thumb {
  width: 0;
  height: 0;
  opacity: 0;
}

.wform button:hover,
.wform input:hover,
.wform select:hover {
  border-color: rgb(129 140 248 / 66%);
  background: linear-gradient(180deg, #1a2947 0%, var(--input-hover) 100%);
  box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
  filter: saturate(1.08);
  transform: translateY(-1px);
}

.wform button:focus-visible,
.wform input:focus-visible,
.wform select:focus-visible {
  border-color: rgb(165 180 252 / 85%);
  box-shadow:
    0 0 0 3px var(--ring),
    0 10px 22px rgb(0 0 0 / 26%);
  outline: none;
}

.wform input::placeholder {
  color: #9ba9d8;
}

.wform select {
  padding-right: 34px;
  background-image:
    linear-gradient(45deg, transparent 50%, #c7d2fe 50%),
    linear-gradient(135deg, #c7d2fe 50%, transparent 50%),
    linear-gradient(180deg, #1a2948 0%, #131d34 100%);
  background-position:
    calc(100% - 17px) 50%,
    calc(100% - 12px) 50%,
    0 0;
  background-size:
    5px 5px,
    5px 5px,
    100% 100%;
  background-repeat: no-repeat;
  color: #edf2ff;
  font-weight: 700;
  font-size: 12px;
  appearance: none;
  color-scheme: dark;
}

.wform select option {
  background: #111a2f;
  color: #ecf2ff;
  font-weight: 700;
  font-size: 12px;
}

.wform select option:checked {
  background: #265fc2;
  color: #fff;
}

.wform select option:hover {
  background: #1a315d;
}

.wform button:active,
.wform select:active {
  transform: scale(0.98);
}

.wform button:disabled,
.wform input:disabled {
  background-color: var(--background-disabled);
  cursor: no-drop;
}

.wform label input:not([type='checkbox']) {
  width: inherit;
}

.wform .strategy-row {
  align-items: stretch;
}

.wform .strategy-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 6px;
  align-items: center;
  width: 100%;
}

.wform .strategy-controls .open-preview {
  min-width: 86px;
  padding: 8px 10px;
  font-size: 11px;
  white-space: nowrap;
}

.kgm-capture-overlay {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgb(7 12 24 / 18%);
  cursor: crosshair;
}

.kgm-capture-hint {
  position: fixed;
  top: 16px;
  left: 50%;
  padding: 6px 10px;
  border: 1px solid rgb(129 140 248 / 45%);
  border-radius: 8px;
  background: rgb(12 18 34 / 88%);
  color: #e8eeff;
  font-weight: 700;
  font-size: 12px;
  pointer-events: none;
  transform: translateX(-50%);
}

.kgm-capture-box {
  position: fixed;
  border: 1px solid #7ea4ff;
  background: rgb(126 164 255 / 24%);
  box-shadow:
    0 0 0 1px rgb(5 8 16 / 45%),
    inset 0 0 0 1px rgb(211 224 255 / 28%);
  pointer-events: none;
}

.wform .wprogress {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  width: 100%;
  height: 48px;
  margin: 0;
  border: 1px solid rgb(129 140 248 / 28%);
  border-radius: 14px;
  background: linear-gradient(180deg, #111a2e, #0e1628);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 5%),
    inset 0 -1px 0 rgb(0 0 0 / 35%);
}

.wform .wprogress div {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background:
    linear-gradient(90deg, rgb(99 102 241 / 95%), rgb(56 189 248 / 88%)),
    linear-gradient(180deg, rgb(255 255 255 / 18%), transparent);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 24%),
    0 0 18px rgb(99 102 241 / 35%);
  transition: transform 0.28s ease-out;
  transform-origin: left;
}

.wform .wprogress div::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgb(255 255 255 / 10%) 35%,
    rgb(255 255 255 / 28%) 50%,
    rgb(255 255 255 / 10%) 65%,
    transparent 100%
  );
  animation: progress-shimmer 1.8s linear infinite;
}

.wform .wprogress span {
  position: relative;
  z-index: 1;
  color: #e9eeff;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 6px rgb(3 8 18 / 60%);
  mix-blend-mode: normal;
}

@keyframes progress-shimmer {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

.kgm-modal {
  margin: auto;
  border: 1px solid rgb(130 150 255 / 35%);
  border-radius: 14px;
  background: linear-gradient(180deg, #131c34 0%, #0e1526 100%);
  color: var(--text);
  box-shadow:
    0 24px 46px rgb(2 6 23 / 62%),
    0 0 0 1px rgb(143 162 255 / 22%);
}

.kgm-modal::backdrop {
  background:
    radial-gradient(circle at 50% 20%, rgb(90 122 255 / 20%), transparent 55%),
    rgb(4 8 16 / 72%);
  backdrop-filter: blur(5px) saturate(1.15);
}

.kgm-modal-head {
  position: sticky;
  position: relative;
  top: 0;
  z-index: 2;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px 42px 8px 0;
  background: linear-gradient(180deg, rgb(19 28 52 / 98%), rgb(19 28 52 / 72%));
  backdrop-filter: blur(4px);
}

.colors-dialog {
  overflow: auto;
  width: min(560px, 92vw);
  min-width: min(320px, 92vw);
  min-height: 420px;
  max-height: min(85dvh, 680px);
  padding: 12px;
  resize: both;
}

.colors-dialog-head {
  cursor: move;
  user-select: none;
}

.close-colors {
  min-width: 34px;
}

.kgm-modal .modal-close {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 34px;
  min-width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid #6c79ad;
  border-radius: 999px;
  background: linear-gradient(180deg, #2a3963, #1f2c4d);
  color: #f0f4ff;
  box-shadow: 0 10px 20px rgb(7 12 24 / 30%);
  font-weight: 600;
}

.kgm-modal .modal-close .icon {
  font-size: 14px;
  line-height: 1;
}

.kgm-modal .modal-close:hover {
  border-color: #9fb0ff;
  box-shadow:
    0 10px 22px rgb(7 12 24 / 40%),
    0 0 0 1px rgb(159 176 255 / 35%);
}

.preview-dialog {
  overflow: auto;
  width: min(760px, 94vw);
  min-width: min(330px, 92vw);
  max-height: min(86dvh, 720px);
  padding: 12px;
}

.preview-dialog-help {
  margin: 0 0 10px;
  color: #b4bfdc;
  font-size: 12px;
}

.autofarm-dialog {
  width: min(520px, 94vw);
  max-height: min(88dvh, 760px);
  padding: 14px;
  overflow: auto;
}

.autofarm-form {
  display: grid;
  gap: 12px;
}

.autofarm-help {
  margin: 0;
  color: #b8c4e6;
  font-size: 12px;
}

.autofarm-label {
  display: grid;
  gap: 6px;
}

.kgm-switch-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid rgb(143 162 255 / 24%);
  border-radius: 10px;
  background: linear-gradient(180deg, rgb(22 34 60 / 96%), rgb(17 26 46 / 96%));
}

.kgm-switch-row .with-icon {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.kgm-switch-row .with-icon svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: #93c5fd;
}

.kgm-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 26px;
}

.kgm-switch input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
}

.kgm-switch-slider {
  position: relative;
  width: 44px;
  height: 26px;
  border: 1px solid rgb(141 160 255 / 45%);
  border-radius: 999px;
  background: #233357;
  box-shadow: inset 0 2px 4px rgb(3 8 18 / 38%);
  transition: background 0.22s ease, border-color 0.22s ease;
}

.kgm-switch-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(180deg, #f2f6ff, #d4deff);
  box-shadow: 0 3px 10px rgb(1 6 15 / 35%);
  transition: transform 0.22s ease;
}

.kgm-switch input:checked + .kgm-switch-slider {
  border-color: rgb(80 209 150 / 76%);
  background: linear-gradient(180deg, #1f7c5f, #1b5d4a);
}

.kgm-switch input:checked + .kgm-switch-slider::after {
  transform: translateX(18px);
}

.kgm-switch input:focus-visible + .kgm-switch-slider {
  box-shadow:
    0 0 0 3px rgb(129 140 248 / 35%),
    inset 0 2px 4px rgb(3 8 18 / 38%);
}

.autofarm-fields {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.autofarm-value,
.autofarm-unit {
  min-height: 34px;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text);
}

.autofarm-value {
  padding: 0 10px;
}

.autofarm-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.autofarm-actions button {
  min-height: 34px;
  border: 1px solid rgb(141 160 255 / 34%);
  border-radius: 8px;
  background: linear-gradient(180deg, #273559, #1b2743);
  color: #ebf1ff;
  font-weight: 600;
}

.preview-dialog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  align-items: start;
  overflow: auto;
  max-height: min(70dvh, 600px);
  padding-right: 2px;
}

.preview-card {
  display: grid;
  gap: 8px;
  align-content: start;
  padding: 10px;
  border: 1px solid rgb(143 162 255 / 22%);
  border-radius: 12px;
  background: linear-gradient(180deg, #1a2542, #131d34);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 4%);
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.preview-card:hover {
  border-color: rgb(143 162 255 / 48%);
  box-shadow:
    0 12px 24px rgb(0 0 0 / 24%),
    inset 0 1px 0 rgb(255 255 255 / 5%);
  transform: translateY(-1px);
}

.preview-card strong {
  color: #dce6ff;
  font-size: 13px;
  line-height: 1.25;
}

.preview-canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  background: #0d1324;
  image-rendering: pixelated;
}

.colors-dialog-help {
  margin: 0 0 8px;
  color: #b4bfdc;
  font-size: 12px;
  line-height: 1.35;
}

.colors-dialog-help.order {
  color: #d6defa;
  font-weight: 600;
}

.color-search {
  width: 100%;
  margin-bottom: 10px;
}

.color-tools {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 6px;
  align-items: center;
  margin-bottom: 10px;
}

.colors-dialog .replacement-select {
  min-height: 28px;
  padding: 0 8px;
  border-radius: 7px;
  border: 1px solid rgb(143 162 255 / 34%);
  background: #1d2a49;
  color: #e6ecff;
  font-size: 11px;
}

.colors-dialog .color-chip .replacement {
  color: #b9c8ff;
  font-size: 10px;
}

.colors-dialog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
  overflow: auto;
  max-height: min(62dvh, 520px);
  padding-right: 2px;
}

.access-dialog {
  width: min(440px, 92vw);
  padding: 14px;
}

.access-form {
  display: grid;
  gap: 10px;
}

.access-label {
  display: grid;
  gap: 6px;
  font-size: 12px;
}

.access-input,
.access-locale,
.access-submit {
  min-height: 38px;
}

.access-submit {
  border: 1px solid #5c6bc9;
  border-radius: 8px;
  background: #233155;
  color: #edf2ff;
  font-weight: 600;
}

.access-error {
  min-height: 18px;
  color: #ff9bb0;
}

.colors-dialog .color-chip {
  display: grid !important;
  grid-template-columns: auto 18px 18px minmax(0, 1fr) auto auto;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid rgb(143 162 255 / 20%) !important;
  border-radius: 8px;
  background: linear-gradient(180deg, #1a2540, #151d31) !important;
  color: var(--text) !important;
  font-size: 11px;
  text-align: left;
  white-space: normal;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;
}

.colors-dialog .color-chip:hover {
  border-color: rgb(143 162 255 / 52%);
  box-shadow: 0 10px 18px rgb(0 0 0 / 25%);
  transform: translateY(-1px);
}

.colors-dialog .color-chip .order-index {
  padding: 2px 6px;
  border-radius: 999px;
  background: #202a43;
  color: #b8c8ff;
  font-weight: 700;
  font-size: 10px;
}

.colors-dialog .color-chip.disabled {
  opacity: 0.65;
}

.colors-dialog .color-chip .swatch {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 4px;
  background: var(--swatch-color) !important;
}

.colors-dialog .color-chip .meta {
  display: grid;
  gap: 2px;
  justify-items: start;
  min-width: 0;
}

.colors-dialog .color-chip .meta .hex {
  padding: 1px 6px;
  border: 1px solid rgb(143 162 255 / 30%);
  border-radius: 999px;
  background: rgb(17 25 43 / 75%);
  color: #e6ecff;
  font-size: 10px;
  letter-spacing: 0.2px;
}

.colors-dialog .color-chip .premium.on {
  color: #ffd166;
}

.colors-dialog .color-chip .buy-chip {
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 10px;
}

.replacement-dialog {
  width: min(620px, 92vw);
}

.replacement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  max-height: 58dvh;
  overflow: auto;
  padding-right: 4px;
}

.replacement-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 36px;
  border: 1px solid rgb(143 162 255 / 24%);
  border-radius: 8px;
  background: #17233f;
  color: #ebf1ff;
}

.replacement-option .dot {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1px solid rgb(255 255 255 / 25%);
  background: var(--option-color);
}

.replacement-option.active {
  border-color: rgb(95 227 154 / 70%);
  box-shadow: 0 0 0 1px rgb(95 227 154 / 45%) inset;
}

.wtopbar {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  width: 268px;
  margin-bottom: 4px;
  opacity: 0.92;
}

.wtopbar button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 36px;
  border: 1px solid rgb(125 146 255 / 34%);
  background: linear-gradient(180deg, #202d50, #19223d);
  color: #b9c8ff;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    filter 0.2s ease;
}

.wtopbar button:hover {
  background: linear-gradient(180deg, #2b3960, #1f2c4b);
  box-shadow: 0 8px 18px rgb(0 0 0 / 30%);
  filter: saturate(1.12);
  transform: translateY(-1px);
}

.wtopbar button .icon {
  font-size: 15px;
  line-height: 1;
}

.wtopbar button .fa-solid {
  width: 16px;
  text-align: center;
}

.wtopbar .lock .icon-lock-closed {
  display: none;
}

.wtopbar .lock.locked .icon-lock-open {
  display: none;
}

.wtopbar .lock.locked .icon-lock-closed {
  display: inline;
}

.wtopbar button.delete {
  color: var(--action-delete);
  text-shadow: 0 0 12px rgb(255 107 107 / 35%);
}

.wtopbar button.open-colors {
  color: var(--action-palette);
  text-shadow: 0 0 12px rgb(255 159 67 / 35%);
}

.wtopbar button.
.wtopbar button.lock.locked {
  color: var(--action-lock);
  text-shadow: 0 0 12px rgb(255 209 102 / 40%);
}

.wtopbar button.lock {
  color: var(--action-lock);
  text-shadow: 0 0 10px rgb(255 209 102 / 25%);
}

.wwidget .images .image .image-controls .colors,
.wwidget .images .image .image-controls .download,
.wwidget .images .image .image-controls .delete,
.wwidget .images .image .image-controls .preview-strategy {
  display: grid;
  place-items: center;
}

.wwidget .images .image .image-controls button i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 1;
}

.kgm-modal .shield-config-open i {
  color: #8fd8ff;
}

.shield-control-grid {
  display: grid;
  gap: 6px;
  margin-top: 8px;
}

.shield-controls .wp {
  margin-bottom: 6px;
}

.wwidget .images .image .image-controls .delete {
  color: var(--action-delete);
}

.resize {
  position: absolute;
  background: transparent;
}

.resize.n,
.resize.s {
  left: 0;
  width: 100%;
  height: var(--resize);
  cursor: ns-resize;
}

.resize.n {
  top: calc(var(--resize) / -2);
}

.resize.s {
  bottom: calc(var(--resize) / -2);
}

.resize.e,
.resize.w {
  top: 0;
  width: var(--resize);
  height: 100%;
  cursor: ew-resize;
}

.resize.e {
  right: calc(var(--resize) / -2);
}

.resize.w {
  left: calc(var(--resize) / -2);
}

.hidden {
  display: none !important;
}

.overlay-hidden .wimage {
  display: none !important;
}

.kgm-access-locked .wwidget,
.kgm-access-locked .wimage,
.kgm-access-locked .wopen-button {
  display: none !important;
}

.no-pointer-events {
  pointer-events: none;
}

.colors-dialog .color-chip .drag {
  color: #8da1e5;
  font-size: 12px;
  cursor: grab;
  user-select: none;
}

.colors-dialog .color-chip.dragging {
  border-style: dashed;
  opacity: 0.45;
}

.colors-dialog .color-chip.drag-target {
  border-color: #8fa2ff;
  box-shadow: 0 0 0 1px rgb(143 162 255 / 45%);
}

@media (width <= 700px) {
  .wwidget {
    width: 100vw;
    max-width: 100vw;
  }

  .wwidget .images {
    max-height: 26dvh;
  }

  .wimage .wform {
    width: min(320px, calc(100vw - 20px));
  }

  .colors-dialog-list {
    grid-template-columns: 1fr;
  }

  .preview-dialog-list {
    grid-template-columns: 1fr;
  }

  .wwidget .images .image {
    grid-template-columns: 1fr;
  }

  .wwidget .images .image .image-controls {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (width <= 480px) {
  .wwidget .title {
    padding: 12px 10px 10px 58px;
    font-size: 16px;
  }

  .wwidget .widget-logo {
    width: 42px;
  }

  .wwidget .widget-brand-text {
    font-size: 17px;
  }

  .wwidget .wopen-button {
    top: 10px;
    left: 10px;
    width: 38px;
    height: 38px;
  }

  .wform {
    font-size: 12px;
  }

  .wform > * {
    width: calc(100% - 8px);
    margin: 4px;
    white-space: normal;
  }

  .wwidget .wform button,
  .wwidget .wform input,
  .wwidget .wform select,
  .wwidget .wform textarea,
  .wwidget .wform label:has(input[type='checkbox']) {
    padding: 10px 11px;
  }

  .wwidget .images {
    max-height: 22dvh;
    padding: 4px 6px;
  }

  .kgm-modal .shortcuts .shortcut-item {
    grid-template-columns: minmax(0, 1fr);
    padding: 6px 7px;
  }

  .kgm-modal .shortcuts .shortcut-label,
  .kgm-modal .shortcuts kbd {
    font-size: 10px;
  }

  .kgm-modal .shortcuts .shortcut-keys {
    justify-self: start;
  }

  .kgm-modal .shortcuts .shortcut-list {
    grid-template-columns: 1fr;
  }

  .kgm-switch-row {
    grid-template-columns: 1fr;
    gap: 8px;
    align-items: start;
  }

  .kgm-switch {
    justify-self: end;
  }
}

@media (width <= 360px) {
  .wwidget .title {
    padding-left: 52px;
  }

  .wwidget .widget-brand {
    gap: 8px;
  }

  .wwidget .widget-brand-text {
    font-size: 15px;
  }

  .wwidget .widget-brand-text::after {
    width: 34px;
  }

  .wform .wprogress span {
    font-size: 10px;
  }

  .wwidget .images .image .image-controls {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .wwidget .images .image .image-controls button {
    width: 100%;
    height: 28px;
  }
}

.wwidget .widget-section-progress {
  gap: 10px;
  padding: 14px;
  border-color: rgb(103 205 255 / 30%);
  background:
    radial-gradient(circle at 90% 20%, rgb(56 189 248 / 18%), transparent 52%),
    linear-gradient(180deg, rgb(21 35 61 / 92%), rgb(13 24 43 / 92%));
}

.wwidget .widget-section-progress .widget-section-head {
  justify-content: flex-start;
}

.wwidget .widget-section-progress .widget-section-title i {
  color: #67d0ff;
}

.kgm-switch-row .with-icon svg{stroke:#8fd8ff;fill:none;stroke-width:1.8;}
.kgm-switch-row:nth-of-type(1) .with-icon svg{stroke:#ff7aa2;}
.kgm-switch-row:nth-of-type(2) .with-icon svg{stroke:#7dd3fc;}
.kgm-switch-row:nth-of-type(3) .with-icon svg{stroke:#86efac;}
.shield-profile-row{display:grid;gap:6px;margin:8px 0;}
.shield-profile-select{width:100%;padding:8px;border-radius:8px;background:#111a2e;color:#fff;border:1px solid #334;}.shield-refresh-profile i,.shield-test i{color:#8fd8ff;margin-right:6px;}

.color-tool-btn{display:inline-flex;gap:8px;align-items:center;justify-content:center;padding:8px;border:1px solid var(--border);border-radius:10px;background:#1a2032;color:#dbe6ff;font-weight:600;cursor:pointer;}
.color-tool-btn:hover{background:#24304d;}
.color-tool-btn.enable-all-colors i{color:#86efac;}
.color-tool-btn.disable-all-colors i{color:#fda4af;}
`;class lo extends Error{name="KGlacerMacroError";constructor(o,a){super(o);a.widget.status=o}}class uo extends lo{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var N={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function D(o,a){let r=a.key.toLowerCase(),s=o.key.toLowerCase(),p=r==="/"&&(s==="/"||s==="?"||o.code==="Slash")||s===r,c=a.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,g=a.ctrl===!0?!0:a.meta===!0?o.metaKey:!o.metaKey;return p&&o.shiftKey===Boolean(a.shift)&&c&&g&&o.altKey===Boolean(a.alt)}function Jo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let a=o.tagName.toLowerCase();return a==="input"||a==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var So=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <div class="widget-brand">
    <img class="widget-logo" src="" alt="KGlacer Macro logo" />
    <span class="widget-brand-text">KGlacerMacro</span>
  </div>
</div>
<div class="wform">
  <section class="widget-section widget-section-general">
    <div class="widget-section-head">
      <strong class="widget-section-title" data-i18n="generalSection">General</strong>
      <button class="open-config open-config-toggle" title="Open settings">
        <i class="fa-solid fa-sliders"></i>
        <span data-i18n="openConfig">Config</span>
      </button>
    </div>
    <div class="wp wstatus"></div>
  </section>

  <section class="widget-section widget-section-actions">
    <strong class="widget-section-title" data-i18n="actionsSection">Actions</strong>
    <button class="draw" disabled><i class="fa-solid fa-pen-nib"></i><span data-i18n="draw">Draw</span></button>
    <button class="draw-and-paint" disabled><i class="fa-solid fa-wand-magic-sparkles"></i><span data-i18n="drawAndPaint">Draw + Paint</span></button>
    <button class="capture-template" disabled>
      <i class="fa-solid fa-camera" aria-hidden="true"></i>
      <span data-i18n="captureTemplate">Capture template</span>
    </button>
    <button class="toggle-overlay"><i class="fa-solid fa-layer-group"></i><span data-i18n="toggleOverlay">Hide/show overlays</span></button>
    <button class="autooverlay-config"><i class="fa-solid fa-clock-rotate-left"></i><span data-i18n="configureAutoOverlay">Configure auto draw</span></button>
    <div class="wp autooverlay-status" data-i18n="autoOverlayStopped">Stopped</div>
    <div class="actions-inline">
      <button class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start Auto Drawing</span></button>
      <button class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop Auto Drawing</span></button>
    </div>
  </section>

  <details class="widget-section widget-section-autofarm">
    <summary class="widget-section-summary">
      <strong class="widget-section-title" data-i18n="autoFarmSection">Auto farm</strong>
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </summary>
    <div class="widget-actions">
      <button class="autofarm-config"><i class="fa-solid fa-screwdriver-wrench"></i><span data-i18n="configureAutoFarm">Configure auto farm</span></button>
      <div class="actions-inline">
        <button class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start Auto Farm</span></button>
        <button class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop Auto Farm</span></button>
      </div>
      <div class="wp autofarm-status" data-i18n="autoFarmStopped">Stopped</div>
    </div>
  </details>

  <section class="widget-section widget-section-progress">
    <div class="widget-section-head">
      <strong class="widget-section-title"><i class="fa-solid fa-chart-line"></i><span data-i18n="progressSection">Progress</span></strong>
    </div>
    <div class="wprogress"><div></div><span></span></div>
  </section>

  <details class="widget-section widget-section-strategy">
    <summary class="widget-section-summary">
      <strong class="widget-section-title" data-i18n="strategySection">Draw strategy</strong>
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </summary>
    <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
      <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
      <option value="ALL" data-i18n="all">All</option>
      <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
    </select></label>
  </details>

  <details class="widget-section widget-section-images" open>
    <summary class="widget-section-summary">
      <strong class="widget-section-title" data-i18n="imagesSection">Images</strong>
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </summary>
    <div class="widget-image-actions">
      <button class="add-image" disabled><i class="fa-solid fa-image"></i><span data-i18n="addImage">Add image</span></button>
    </div>
    <div class="images"></div>
  </details>
</div>
`;function to(){let o=localStorage.getItem("kglacer-macro:shield-config");if(!o)return!0;try{return JSON.parse(o).enabled!==!1}catch{return!0}}function Uo(o){localStorage.setItem("kglacer-macro:shield-config",JSON.stringify({enabled:o}))}function ga(o){let a="${proxy?.host ?? ''} ${proxy?.username ?? ''}".toLowerCase(),r=/(mx|mex|mexico)/.test(a)?"MX":"AUTO";localStorage.setItem("__afm_proxy_hint",r)}function jo(o){if(!to())return;if(document.getElementById("kgm-shield-full"))return;ga(o);let a=document.createElement("script");a.id="kgm-shield-full",a.textContent=`// ==UserScript==
// @name         Anti-Fingerprint Merged Shield
// @namespace    https://chatgpt.local/anti-fingerprint-merged-shield
// @version      1.1.0
// @description  Combined anti-fingerprinting userscript with stable realistic profiles, safer API spoofing, Canvas/WebGL/Audio noise, modern UI, and English JSDoc comments.
// @author       Combined from Anti-Fingerprinting Shield Plus + No Fingerprint
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @noframes     false
// @license      MIT OR Unlicense
// ==/UserScript==

/**
 * Injects the anti-fingerprinting shield into the page context so patched Web APIs are visible
 * to page scripts instead of only to the userscript sandbox.
 *
 * @returns {void}
 */
(function injectAntiFingerprintMergedShield() {
    "use strict";

    const pageScript = document.createElement("script");

    pageScript.textContent = "(" + function antiFingerprintMergedShieldPageContext() {
        "use strict";

        /**
         * Describes a realistic browser fingerprint profile used as a consistent spoofing target.
         *
         * @typedef {Object} BrowserProfile
         * @property {string} id Human-readable profile identifier shown in the UI.
         * @property {"chromium"|"firefox"|"safari"} family Browser family this profile belongs to.
         * @property {string} userAgent Spoofed navigator.userAgent value.
         * @property {string} platform Spoofed navigator.platform value.
         * @property {string} language Primary navigator.language value.
         * @property {string[]} languages Ordered navigator.languages values.
         * @property {number} screenWidth Spoofed screen width in CSS pixels.
         * @property {number} screenHeight Spoofed screen height in CSS pixels.
         * @property {number} availOffsetY Vertical space reserved by the operating system UI.
         * @property {number} colorDepth Spoofed screen color depth.
         * @property {number} pixelDepth Spoofed screen pixel depth.
         * @property {number} devicePixelRatio Spoofed device pixel ratio.
         * @property {number} cores Spoofed logical CPU core count.
         * @property {number} memory Spoofed device memory in GB when supported.
         * @property {string} timezone IANA timezone identifier used by Date and Intl patches.
         * @property {string} vendor Spoofed navigator.vendor value.
         * @property {string} productSub Spoofed navigator.productSub value.
         * @property {string} appName Spoofed navigator.appName value.
         * @property {string|null} doNotTrack Spoofed navigator.doNotTrack value.
         * @property {number} maxTouchPoints Spoofed navigator.maxTouchPoints value.
         * @property {string=} oscpu Firefox-specific navigator.oscpu value.
         * @property {string=} buildID Firefox-specific navigator.buildID value.
         * @property {string} webglVendor Spoofed unmasked WebGL vendor value.
         * @property {string} webglRenderer Spoofed unmasked WebGL renderer value.
         * @property {Object=} connection Spoofed navigator.connection-like object.
         * @property {Array<Object>} plugins Plugin descriptors used to create a lightweight PluginArray replacement.
         * @property {Array<Object>} mimeTypes MIME type descriptors used to create a lightweight MimeTypeArray replacement.
         */

        /**
         * Stores user-configurable feature flags for each spoofing group.
         *
         * @typedef {Object} SpoofSettings
         * @property {boolean} navigator Enables navigator identity spoofing.
         * @property {boolean} userAgentData Enables Chromium navigator.userAgentData spoofing.
         * @property {boolean} screen Enables screen and window dimension spoofing.
         * @property {boolean} timezone Enables Intl and Date timezone spoofing.
         * @property {boolean} canvas Enables Canvas fingerprint noise.
         * @property {boolean} webgl Enables WebGL vendor, renderer, limits, and readPixels spoofing.
         * @property {boolean} audio Enables audio fingerprint noise.
         * @property {boolean} plugins Enables plugin and MIME type spoofing.
         * @property {boolean} mediaDevices Enables media device enumeration protection.
         * @property {boolean} storageEstimate Enables storage estimate spoofing.
         * @property {boolean} battery Enables Battery API spoofing.
         * @property {boolean} speechSynthesis Enables speech synthesis voice spoofing.
         * @property {boolean} fonts Enables conservative font probing protection.
         * @property {boolean} matchMedia Enables selected media query spoofing.
         * @property {boolean} sharedArrayBuffer Hides SharedArrayBuffer when possible.
         */

        const DEBUG = false;
        const PREFIX = "__afm_";
        const PROFILE_DURATION_MS = 24 * 60 * 60 * 1000;

        const SETTINGS_KEY = PREFIX + "settings";
        const PROFILE_KEY = PREFIX + "profile";
        const PROFILE_EXPIRY_KEY = PREFIX + "profile_expiry";
        const ENABLED_KEY = PREFIX + "enabled";
        const UI_POSITION_KEY = PREFIX + "ui_position";
        const UI_VISIBLE_KEY = PREFIX + "ui_visible";

        const real = {
            userAgent: String(navigator.userAgent || ""),
            platform: String(navigator.platform || ""),
            language: String(navigator.language || "en-US"),
            languages: Array.isArray(navigator.languages) ? Array.from(navigator.languages) : [],
            matchMedia: typeof window.matchMedia === "function" ? window.matchMedia.bind(window) : null,
            dateResolvedOptions: typeof Intl !== "undefined" && Intl.DateTimeFormat
                ? Intl.DateTimeFormat.prototype.resolvedOptions
                : null,
            dateGetTimezoneOffset: Date.prototype.getTimezoneOffset
        };

        /** @type {BrowserProfile[]} */
        const browserProfiles = [
            {
                id: "Chrome Windows 1080p",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 1920,
                screenHeight: 1080,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 8,
                memory: 16,
                timezone: "America/New_York",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: null,
                maxTouchPoints: 0,
                webglVendor: "NVIDIA Corporation",
                webglRenderer: "NVIDIA GeForce RTX 3060/PCIe/SSE2",
                connection: { downlink: 10, effectiveType: "4g", rtt: 50, saveData: false },
                plugins: [
                    { name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" },
                    { name: "Chrome PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" },
                    { name: "Chromium PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }
                ],
                mimeTypes: [
                    { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }
                ]
            },
            {
                id: "Chrome macOS Retina",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 8,
                memory: 16,
                timezone: "America/Los_Angeles",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple GPU",
                webglRenderer: "Apple M1",
                connection: { downlink: 10, effectiveType: "4g", rtt: 50, saveData: false },
                plugins: [
                    { name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }
                ],
                mimeTypes: [
                    { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }
                ]
            },
            {
                id: "Edge Windows 1440p",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1.25,
                cores: 12,
                memory: 32,
                timezone: "America/Chicago",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "AMD",
                webglRenderer: "AMD Radeon RX 6800 XT",
                connection: { downlink: 10, effectiveType: "4g", rtt: 50, saveData: false },
                plugins: [
                    { name: "Microsoft Edge PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }
                ],
                mimeTypes: [
                    { type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }
                ]
            },
            {
                id: "Firefox Linux 1080p",
                family: "firefox",
                userAgent: "Mozilla/5.0 (X11; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0",
                platform: "Linux x86_64",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 1920,
                screenHeight: 1080,
                availOffsetY: 32,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 6,
                memory: 16,
                timezone: "Europe/London",
                vendor: "",
                productSub: "20100101",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                oscpu: "Linux x86_64",
                buildID: "20240101000000",
                webglVendor: "Intel Inc.",
                webglRenderer: "Intel(R) UHD Graphics 630",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Firefox Linux 1440p NVIDIA",
                family: "firefox",
                userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0",
                platform: "Linux x86_64",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 32,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 8,
                memory: 32,
                timezone: "Europe/Paris",
                vendor: "",
                productSub: "20100101",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                oscpu: "Linux x86_64",
                buildID: "20240101000000",
                webglVendor: "NVIDIA Corporation",
                webglRenderer: "NVIDIA GeForce GTX 1660 Ti/PCIe/SSE2",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Safari macOS Retina",
                family: "safari",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1440,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 8,
                memory: 16,
                timezone: "America/New_York",
                vendor: "",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple GPU",
                webglRenderer: "Apple M1 Pro",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Safari macOS Sonoma",
                family: "safari",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2560,
                screenHeight: 1600,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 8,
                memory: 16,
                timezone: "America/Los_Angeles",
                vendor: "Apple Computer, Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 5,
                webglVendor: "Apple Inc.",
                webglRenderer: "Apple GPU",
                connection: { downlink: 10, effectiveType: "4g", rtt: 45, saveData: false },
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Chrome Windows 11 4K",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 3840,
                screenHeight: 2160,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1.5,
                cores: 16,
                memory: 32,
                timezone: "America/New_York",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "NVIDIA Corporation",
                webglRenderer: "NVIDIA GeForce RTX 4070/PCIe/SSE2",
                connection: { downlink: 10, effectiveType: "4g", rtt: 40, saveData: false },
                plugins: [{ name: "Chrome PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            },
            {
                id: "Edge Windows 11 Workstation",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 3440,
                screenHeight: 1440,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1.25,
                cores: 20,
                memory: 64,
                timezone: "America/Chicago",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "AMD",
                webglRenderer: "AMD Radeon RX 7900 XT",
                connection: { downlink: 10, effectiveType: "4g", rtt: 38, saveData: false },
                plugins: [{ name: "Microsoft Edge PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            },
            {
                id: "Chrome Windows 10 Office",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                platform: "Win32",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 1920,
                screenHeight: 1200,
                availOffsetY: 40,
                colorDepth: 24,
                pixelDepth: 24,
                devicePixelRatio: 1,
                cores: 8,
                memory: 16,
                timezone: "America/Denver",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: null,
                maxTouchPoints: 0,
                webglVendor: "Intel Inc.",
                webglRenderer: "Intel(R) Iris(R) Xe Graphics",
                connection: { downlink: 10, effectiveType: "4g", rtt: 48, saveData: false },
                plugins: [{ name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            },
            {
                id: "Safari macOS ProMotion",
                family: "safari",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 3024,
                screenHeight: 1964,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 10,
                memory: 32,
                timezone: "America/Los_Angeles",
                vendor: "Apple Computer, Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple Inc.",
                webglRenderer: "Apple M2 Pro",
                connection: undefined,
                plugins: [],
                mimeTypes: []
            },
            {
                id: "Chrome macOS Ventura Studio",
                family: "chromium",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                platform: "MacIntel",
                language: "en-US",
                languages: ["en-US", "en"],
                screenWidth: 2880,
                screenHeight: 1800,
                availOffsetY: 25,
                colorDepth: 30,
                pixelDepth: 30,
                devicePixelRatio: 2,
                cores: 12,
                memory: 32,
                timezone: "America/Los_Angeles",
                vendor: "Google Inc.",
                productSub: "20030107",
                appName: "Netscape",
                doNotTrack: "1",
                maxTouchPoints: 0,
                webglVendor: "Apple Inc.",
                webglRenderer: "Apple M2 Max",
                connection: { downlink: 10, effectiveType: "4g", rtt: 42, saveData: false },
                plugins: [{ name: "Chrome PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" }],
                mimeTypes: [{ type: "application/pdf", suffixes: "pdf", description: "Portable Document Format" }]
            }
        ];

        /** @type {SpoofSettings} */
        const defaultSettings = {
            navigator: true,
            userAgentData: true,
            screen: true,
            timezone: true,
            canvas: true,
            webgl: true,
            audio: true,
            plugins: true,
            mediaDevices: true,
            storageEstimate: true,
            battery: true,
            speechSynthesis: true,
            fonts: true,
            matchMedia: true,
            sharedArrayBuffer: true
        };

        /**
         * Writes a debug message when debug mode is enabled.
         *
         * @param {...unknown} args Values to write to the console.
         * @returns {void}
         */
        function log(...args) {
            if (DEBUG) {
                console.log("[AFM]", ...args);
            }
        }

        /**
         * Reads a value from localStorage safely.
         *
         * @param {string} key Storage key.
         * @returns {string|null} Stored value or null.
         */
        function storageGet(key) {
            try {
                return localStorage.getItem(key);
            } catch (_) {
                return null;
            }
        }

        /**
         * Writes a value to localStorage safely.
         *
         * @param {string} key Storage key.
         * @param {string} value Storage value.
         * @returns {void}
         */
        function storageSet(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (_) {
                // Ignore storage errors.
            }
        }

        /**
         * Removes a value from localStorage safely.
         *
         * @param {string} key Storage key.
         * @returns {void}
         */
        function storageRemove(key) {
            try {
                localStorage.removeItem(key);
            } catch (_) {
                // Ignore storage errors.
            }
        }

        /**
         * Parses JSON using a fallback when the input is malformed.
         *
         * @param {string|null} value JSON text to parse.
         * @param {unknown} fallback Fallback value returned on parse failure.
         * @returns {unknown} Parsed value or fallback.
         */
        function safeJson(value, fallback) {
            if (!value) {
                return fallback;
            }

            try {
                return JSON.parse(value);
            } catch (_) {
                return fallback;
            }
        }

        /**
         * Loads persisted spoofing settings and merges them with defaults.
         *
         * @returns {SpoofSettings} Active spoofing settings.
         */
        function loadSettings() {
            const saved = safeJson(storageGet(SETTINGS_KEY), {});
            return Object.assign({}, defaultSettings, saved);
        }

        /**
         * Persists spoofing settings.
         *
         * @param {SpoofSettings} settings Settings to persist.
         * @returns {void}
         */
        function saveSettings(settings) {
            storageSet(SETTINGS_KEY, JSON.stringify(settings));
        }

        /**
         * Detects the real browser family from the original user agent.
         *
         * @returns {"chromium"|"firefox"|"safari"} Detected browser family.
         */
        function detectFamily() {
            const ua = real.userAgent.toLowerCase();

            if (ua.includes("firefox")) {
                return "firefox";
            }

            if (ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("edg")) {
                return "safari";
            }

            return "chromium";
        }

        /**
         * Gets profiles compatible with the real browser family.
         *
         * @returns {BrowserProfile[]} Compatible profiles.
         */
        function getCompatibleProfiles() {
            const family = detectFamily();
            const compatible = browserProfiles.filter(profile => profile.family === family);
            return compatible.length > 0 ? compatible : browserProfiles;
        }

        /**
         * Gets the active profile, rotating it after the configured duration.
         *
         * @returns {BrowserProfile} Active browser profile.
         */
        function getCurrentProfile() {
            const now = Date.now();
            const expiry = Number(storageGet(PROFILE_EXPIRY_KEY) || "0");
            const savedProfile = safeJson(storageGet(PROFILE_KEY), null);

            if (savedProfile && now <= expiry) {
                return savedProfile;
            }

            const profiles = getCompatibleProfiles();
            const profile = profiles[Math.floor(Math.random() * profiles.length)];

            storageSet(PROFILE_KEY, JSON.stringify(profile));
            storageSet(PROFILE_EXPIRY_KEY, String(now + PROFILE_DURATION_MS));

            return profile;
        }

        /**
         * Creates a deterministic numeric seed from a string.
         *
         * @param {string} input Input text.
         * @returns {number} Deterministic 32-bit seed.
         */
        function hashString(input) {
            let hash = 2166136261;

            for (let i = 0; i < input.length; i++) {
                hash ^= input.charCodeAt(i);
                hash = Math.imul(hash, 16777619);
            }

            return hash >>> 0;
        }

        /**
         * Creates a deterministic pseudo-random function.
         *
         * @param {number} seed Initial seed.
         * @returns {() => number} Function returning a number between 0 and 1.
         */
        function seededRandom(seed) {
            let state = seed >>> 0;

            return function nextRandom() {
                state += 0x6D2B79F5;
                let t = state;
                t = Math.imul(t ^ (t >>> 15), t | 1);
                t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        }

        /**
         * Returns a small deterministic noise value.
         *
         * @param {number} seed Numeric seed.
         * @param {number} amplitude Maximum absolute noise amplitude.
         * @returns {number} Noise value.
         */
        function stableNoise(seed, amplitude) {
            const random = seededRandom(seed);
            return (random() - 0.5) * amplitude * 2;
        }

        /**
         * Defines a getter on an object while preserving configurability.
         *
         * @param {object} target Target object.
         * @param {string} property Property name.
         * @param {() => unknown} getter Getter function.
         * @returns {void}
         */
        function defineGetter(target, property, getter) {
            if (!target) {
                return;
            }

            try {
                Object.defineProperty(target, property, {
                    get: getter,
                    configurable: true
                });
            } catch (error) {
                log("defineGetter failed", property, error);
            }
        }

        /**
         * Defines a fixed value on an object while preserving configurability.
         *
         * @param {object} target Target object.
         * @param {string} property Property name.
         * @param {unknown} value Property value.
         * @returns {void}
         */
        function defineValue(target, property, value) {
            if (!target) {
                return;
            }

            try {
                Object.defineProperty(target, property, {
                    value,
                    configurable: true,
                    writable: false
                });
            } catch (error) {
                log("defineValue failed", property, error);
            }
        }

        /**
         * Patches a prototype method safely.
         *
         * @param {object} prototype Prototype object.
         * @param {string} methodName Method name.
         * @param {(original: Function) => Function} factory Function that receives the original method and returns a replacement.
         * @returns {void}
         */
        function patchMethod(prototype, methodName, factory) {
            if (!prototype || typeof prototype[methodName] !== "function") {
                return;
            }

            try {
                const original = prototype[methodName];
                defineValue(prototype, methodName, factory(original));
            } catch (error) {
                log("patchMethod failed", methodName, error);
            }
        }

        /**
         * Creates a lightweight array-like object for plugins or MIME types.
         *
         * @param {Array<Object>} items Source descriptors.
         * @returns {Array<Object>} Array-like object.
         */
        function createArrayLike(items) {
            const array = Array.from(items || []);

            array.item = function item(index) {
                return array[index] || null;
            };

            array.namedItem = function namedItem(name) {
                return array.find(item => item.name === name || item.type === name) || null;
            };

            array.refresh = function refresh() {
                return undefined;
            };

            return array;
        }

        /**
         * Applies navigator identity spoofing.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchNavigator(profile, settings) {
            if (!settings.navigator) {
                return;
            }

            defineGetter(Navigator.prototype, "userAgent", () => profile.userAgent);
            defineGetter(Navigator.prototype, "platform", () => profile.platform);
            defineGetter(Navigator.prototype, "language", () => profile.language);
            defineGetter(Navigator.prototype, "languages", () => profile.languages.slice());
            defineGetter(Navigator.prototype, "hardwareConcurrency", () => profile.cores);
            defineGetter(Navigator.prototype, "vendor", () => profile.vendor);
            defineGetter(Navigator.prototype, "productSub", () => profile.productSub);
            defineGetter(Navigator.prototype, "appName", () => profile.appName);
            defineGetter(Navigator.prototype, "doNotTrack", () => profile.doNotTrack);
            defineGetter(Navigator.prototype, "maxTouchPoints", () => profile.maxTouchPoints);

            if ("deviceMemory" in navigator) {
                defineGetter(Navigator.prototype, "deviceMemory", () => profile.memory);
            }

            if ("oscpu" in navigator && profile.oscpu) {
                defineGetter(Navigator.prototype, "oscpu", () => profile.oscpu);
            }

            if ("buildID" in navigator && profile.buildID) {
                defineGetter(Navigator.prototype, "buildID", () => profile.buildID);
            }

            if ("connection" in navigator && profile.connection) {
                defineGetter(Navigator.prototype, "connection", () => Object.assign({}, profile.connection));
            }
        }

        /**
         * Applies Chromium navigator.userAgentData spoofing when available.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchUserAgentData(profile, settings) {
            if (!settings.userAgentData || !("userAgentData" in navigator)) {
                return;
            }

            const isEdge = profile.userAgent.includes("Edg/");
            const brands = isEdge
                ? [
                    { brand: "Microsoft Edge", version: "120" },
                    { brand: "Chromium", version: "120" },
                    { brand: "Not A(Brand", version: "99" }
                ]
                : [
                    { brand: "Google Chrome", version: "120" },
                    { brand: "Chromium", version: "120" },
                    { brand: "Not A(Brand", version: "99" }
                ];

            const platform = profile.platform.includes("Win")
                ? "Windows"
                : profile.platform.includes("Mac")
                    ? "macOS"
                    : "Linux";

            const userAgentData = {
                brands,
                mobile: false,
                platform,
                getHighEntropyValues: function getHighEntropyValues(hints) {
                    const values = {
                        brands,
                        mobile: false,
                        platform,
                        architecture: "x86",
                        bitness: "64",
                        model: "",
                        platformVersion: platform === "Windows" ? "10.0.0" : "13.0.0",
                        uaFullVersion: "120.0.0.0",
                        fullVersionList: brands.map(brand => ({
                            brand: brand.brand,
                            version: brand.version + ".0.0.0"
                        }))
                    };

                    const result = {};

                    for (const hint of hints || []) {
                        if (Object.prototype.hasOwnProperty.call(values, hint)) {
                            result[hint] = values[hint];
                        }
                    }

                    result.brands = brands;
                    result.mobile = false;
                    result.platform = platform;

                    return Promise.resolve(result);
                },
                toJSON: function toJSON() {
                    return {
                        brands,
                        mobile: false,
                        platform
                    };
                }
            };

            defineGetter(Navigator.prototype, "userAgentData", () => userAgentData);
        }

        /**
         * Applies screen and viewport spoofing.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchScreen(profile, settings) {
            if (!settings.screen || !window.screen) {
                return;
            }

            defineGetter(Screen.prototype, "width", () => profile.screenWidth);
            defineGetter(Screen.prototype, "height", () => profile.screenHeight);
            defineGetter(Screen.prototype, "availWidth", () => profile.screenWidth);
            defineGetter(Screen.prototype, "availHeight", () => Math.max(0, profile.screenHeight - profile.availOffsetY));
            defineGetter(Screen.prototype, "colorDepth", () => profile.colorDepth);
            defineGetter(Screen.prototype, "pixelDepth", () => profile.pixelDepth);

            defineGetter(window, "devicePixelRatio", () => profile.devicePixelRatio);
            defineGetter(window, "outerWidth", () => profile.screenWidth);
            defineGetter(window, "outerHeight", () => profile.screenHeight);
        }

        /**
         * Applies conservative timezone spoofing through Intl and Date.getTimezoneOffset.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchTimezone(profile, settings) {
            if (!settings.timezone) {
                return;
            }

            if (typeof Intl !== "undefined" && Intl.DateTimeFormat && real.dateResolvedOptions) {
                patchMethod(Intl.DateTimeFormat.prototype, "resolvedOptions", original => function resolvedOptions() {
                    const options = original.call(this);
                    options.timeZone = profile.timezone;
                    return options;
                });
            }

            patchMethod(Date.prototype, "getTimezoneOffset", () => function getTimezoneOffset() {
                return timezoneOffsetFor(profile.timezone);
            });
        }

        /**
         * Returns a practical timezone offset approximation in minutes.
         *
         * @param {string} timezone IANA timezone name.
         * @returns {number} Timezone offset in minutes.
         */
        function timezoneOffsetFor(timezone) {
            const offsets = {
                "America/New_York": 300,
                "America/Chicago": 360,
                "America/Denver": 420,
                "America/Los_Angeles": 480,
                "Europe/London": 0,
                "Europe/Paris": -60,
                "Europe/Berlin": -60
            };

            return Object.prototype.hasOwnProperty.call(offsets, timezone)
                ? offsets[timezone]
                : real.dateGetTimezoneOffset.call(new Date());
        }

        /**
         * Applies plugin and MIME type spoofing.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchPlugins(profile, settings) {
            if (!settings.plugins) {
                return;
            }

            defineGetter(Navigator.prototype, "plugins", () => createArrayLike(profile.plugins));
            defineGetter(Navigator.prototype, "mimeTypes", () => createArrayLike(profile.mimeTypes));
        }

        /**
         * Applies Canvas 2D noise using deterministic, low-amplitude changes.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchCanvas(profile, settings) {
            if (!settings.canvas) {
                return;
            }

            const baseSeed = hashString(location.hostname + profile.id + "canvas");

            patchMethod(CanvasRenderingContext2D && CanvasRenderingContext2D.prototype, "getImageData", original => function getImageData(x, y, width, height) {
                const imageData = original.call(this, x, y, width, height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const noise = Math.round(stableNoise(baseSeed + i, 1));
                    data[i] = clampByte(data[i] + noise);
                    data[i + 1] = clampByte(data[i + 1] + noise);
                    data[i + 2] = clampByte(data[i + 2] + noise);
                }

                return imageData;
            });

            patchMethod(HTMLCanvasElement && HTMLCanvasElement.prototype, "toDataURL", original => function toDataURL() {
                applyCanvasPixelNoise(this, baseSeed);
                return original.apply(this, arguments);
            });

            patchMethod(HTMLCanvasElement && HTMLCanvasElement.prototype, "toBlob", original => function toBlob() {
                applyCanvasPixelNoise(this, baseSeed);
                return original.apply(this, arguments);
            });
        }

        /**
         * Applies deterministic pixel noise to a canvas before export.
         *
         * @param {HTMLCanvasElement} canvas Target canvas.
         * @param {number} seed Base noise seed.
         * @returns {void}
         */
        function applyCanvasPixelNoise(canvas, seed) {
            try {
                const context = canvas.getContext("2d");

                if (!context || !canvas.width || !canvas.height) {
                    return;
                }

                const width = Math.min(canvas.width, 16);
                const height = Math.min(canvas.height, 16);
                const imageData = context.getImageData(0, 0, width, height);

                for (let i = 0; i < imageData.data.length; i += 4) {
                    const noise = Math.round(stableNoise(seed + i, 1));
                    imageData.data[i] = clampByte(imageData.data[i] + noise);
                    imageData.data[i + 1] = clampByte(imageData.data[i + 1] + noise);
                    imageData.data[i + 2] = clampByte(imageData.data[i + 2] + noise);
                }

                context.putImageData(imageData, 0, 0);
            } catch (_) {
                // Ignore tainted canvas errors.
            }
        }

        /**
         * Keeps a number inside the unsigned byte range.
         *
         * @param {number} value Input value.
         * @returns {number} Clamped value.
         */
        function clampByte(value) {
            return Math.max(0, Math.min(255, value));
        }

        /**
         * Applies WebGL spoofing for common fingerprint vectors.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchWebGL(profile, settings) {
            if (!settings.webgl) {
                return;
            }

            const contexts = [];

            if (typeof WebGLRenderingContext !== "undefined") {
                contexts.push(WebGLRenderingContext.prototype);
            }

            if (typeof WebGL2RenderingContext !== "undefined") {
                contexts.push(WebGL2RenderingContext.prototype);
            }

            for (const prototype of contexts) {
                patchMethod(prototype, "getParameter", original => function getParameter(parameter) {
                    const values = {
                        37445: profile.webglVendor,
                        37446: profile.webglRenderer,
                        3379: 16384,
                        3386: new Int32Array([16384, 16384]),
                        3410: 8,
                        3411: 8,
                        3412: 8,
                        3413: 8,
                        34047: 16,
                        34921: 16,
                        35660: 16,
                        35661: 16,
                        36347: 4096,
                        36348: 30,
                        36349: 1024
                    };

                    if (Object.prototype.hasOwnProperty.call(values, parameter)) {
                        return values[parameter];
                    }

                    return original.call(this, parameter);
                });

                patchMethod(prototype, "getSupportedExtensions", original => function getSupportedExtensions() {
                    const extensions = original.call(this) || [];
                    const stable = extensions.filter(extension => extension !== "WEBGL_debug_renderer_info");
                    return stable.includes("OES_texture_float") ? stable : stable.concat(["OES_texture_float"]);
                });

                patchMethod(prototype, "readPixels", original => function readPixels(x, y, width, height, format, type, pixels) {
                    const result = original.apply(this, arguments);

                    if (pixels && pixels.length) {
                        const seed = hashString(location.hostname + profile.id + "webgl");

                        for (let i = 0; i < pixels.length; i += 16) {
                            pixels[i] = clampByte(pixels[i] + Math.round(stableNoise(seed + i, 1)));
                        }
                    }

                    return result;
                });
            }
        }

        /**
         * Applies Audio API noise to reduce audio fingerprint stability.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchAudio(profile, settings) {
            if (!settings.audio) {
                return;
            }

            const seed = hashString(location.hostname + profile.id + "audio");

            if (typeof AudioBuffer !== "undefined") {
                patchMethod(AudioBuffer.prototype, "getChannelData", original => function getChannelData(channel) {
                    const data = original.call(this, channel);

                    for (let i = 0; i < data.length; i += 100) {
                        data[i] += stableNoise(seed + i, 0.0000001);
                    }

                    return data;
                });
            }

            if (typeof AnalyserNode !== "undefined") {
                patchMethod(AnalyserNode.prototype, "getFloatFrequencyData", original => function getFloatFrequencyData(array) {
                    original.call(this, array);

                    for (let i = 0; i < array.length; i++) {
                        array[i] += stableNoise(seed + i, 0.01);
                    }
                });
            }
        }

        /**
         * Applies media device enumeration protection.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchMediaDevices(settings) {
            if (!settings.mediaDevices) {
                return;
            }

            if (!navigator.mediaDevices) {
                defineGetter(Navigator.prototype, "mediaDevices", () => ({
                    enumerateDevices: () => Promise.resolve([])
                }));
                return;
            }

            patchMethod(Object.getPrototypeOf(navigator.mediaDevices), "enumerateDevices", () => function enumerateDevices() {
                return Promise.resolve([]);
            });
        }

        /**
         * Applies storage estimate spoofing.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchStorageEstimate(settings) {
            if (!settings.storageEstimate || !navigator.storage || typeof navigator.storage.estimate !== "function") {
                return;
            }

            patchMethod(Object.getPrototypeOf(navigator.storage), "estimate", () => function estimate() {
                return Promise.resolve({
                    usage: 5242880,
                    quota: 1073741824
                });
            });
        }

        /**
         * Applies Battery API spoofing.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchBattery(settings) {
            if (!settings.battery || !("getBattery" in navigator)) {
                return;
            }

            defineValue(navigator, "getBattery", function getBattery() {
                return Promise.resolve({
                    charging: true,
                    chargingTime: 0,
                    dischargingTime: Infinity,
                    level: 1,
                    onchargingchange: null,
                    onchargingtimechange: null,
                    ondischargingtimechange: null,
                    onlevelchange: null,
                    addEventListener: function addEventListener() {},
                    removeEventListener: function removeEventListener() {},
                    dispatchEvent: function dispatchEvent() {
                        return true;
                    }
                });
            });
        }

        /**
         * Applies SpeechSynthesis voice list normalization.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchSpeechSynthesis(profile, settings) {
            if (!settings.speechSynthesis || !("speechSynthesis" in window)) {
                return;
            }

            const voices = [
                {
                    voiceURI: profile.family === "safari" ? "com.apple.speech.synthesis.voice.Alex" : "Google US English",
                    name: profile.family === "safari" ? "Alex" : "Google US English",
                    lang: profile.language,
                    localService: true,
                    default: true
                }
            ];

            defineValue(window.speechSynthesis, "getVoices", function getVoices() {
                return voices.slice();
            });
        }

        /**
         * Applies conservative font probing protection.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchFonts(settings) {
            if (!settings.fonts || !document.fonts) {
                return;
            }

            try {
                defineValue(document.fonts, "check", function check() {
                    return true;
                });
            } catch (_) {
                // Ignore font patching errors.
            }
        }

        /**
         * Applies selected media query spoofing without breaking color-scheme UI detection.
         *
         * @param {BrowserProfile} profile Active profile.
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchMatchMedia(profile, settings) {
            if (!settings.matchMedia || !real.matchMedia) {
                return;
            }

            defineValue(window, "matchMedia", function matchMedia(query) {
                const normalized = String(query || "").toLowerCase();

                if (normalized.includes("prefers-reduced-motion")) {
                    return createMediaQueryList(query, false);
                }

                if (normalized.includes("forced-colors")) {
                    return createMediaQueryList(query, false);
                }

                if (normalized.includes("dynamic-range")) {
                    return createMediaQueryList(query, profile.family === "safari");
                }

                return real.matchMedia(query);
            });
        }

        /**
         * Creates a minimal MediaQueryList-compatible object.
         *
         * @param {string} query Original media query.
         * @param {boolean} matches Whether the query matches.
         * @returns {MediaQueryList} Media query list object.
         */
        function createMediaQueryList(query, matches) {
            return {
                matches,
                media: query,
                onchange: null,
                addListener: function addListener() {},
                removeListener: function removeListener() {},
                addEventListener: function addEventListener() {},
                removeEventListener: function removeEventListener() {},
                dispatchEvent: function dispatchEvent() {
                    return true;
                }
            };
        }

        /**
         * Hides SharedArrayBuffer where possible.
         *
         * @param {SpoofSettings} settings Active settings.
         * @returns {void}
         */
        function patchSharedArrayBuffer(settings) {
            if (!settings.sharedArrayBuffer || !("SharedArrayBuffer" in window)) {
                return;
            }

            defineGetter(window, "SharedArrayBuffer", () => undefined);
        }

        /**
         * Applies all active protection modules.
         *
         * @returns {void}
         */
        function applyProtections() {
            const enabled = storageGet(ENABLED_KEY) !== "false";
            const settings = loadSettings();
            const profile = getCurrentProfile();

            if (!enabled) {
                return;
            }

            patchNavigator(profile, settings);
            patchUserAgentData(profile, settings);
            patchScreen(profile, settings);
            patchTimezone(profile, settings);
            patchPlugins(profile, settings);
            patchCanvas(profile, settings);
            patchWebGL(profile, settings);
            patchAudio(profile, settings);
            patchMediaDevices(settings);
            patchStorageEstimate(settings);
            patchBattery(settings);
            patchSpeechSynthesis(profile, settings);
            patchFonts(settings);
            patchMatchMedia(profile, settings);
            patchSharedArrayBuffer(settings);
        }

        /**
         * Creates the floating configuration UI.
         *
         * @returns {void}
         */
        function createUI() {
            if (storageGet(UI_VISIBLE_KEY) === "false") {
                return;
            }

            const add = function addWhenReady() {
                if (!document.body) {
                    setTimeout(addWhenReady, 50);
                    return;
                }

                const existing = document.getElementById(PREFIX + "ui");

                if (existing) {
                    existing.remove();
                }

                document.body.appendChild(buildUI());
            };

            add();
        }

        /**
         * Builds the floating UI container.
         *
         * @returns {HTMLDivElement} UI container.
         */
        function buildUI() {
            const enabled = storageGet(ENABLED_KEY) !== "false";
            const settings = loadSettings();
            const profile = getCurrentProfile();
            const isDark = real.matchMedia ? real.matchMedia("(prefers-color-scheme: dark)").matches : false;
            const colors = getUiColors(isDark);
            const savedPosition = safeJson(storageGet(UI_POSITION_KEY), { top: 10, left: 10 });

            const container = document.createElement("div");
            container.id = PREFIX + "ui";
            container.style.cssText = [
                "position:fixed",
                "top:" + Number(savedPosition.top || 10) + "px",
                "left:" + Number(savedPosition.left || 10) + "px",
                "z-index:2147483647",
                "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
                "font-size:13px",
                "color:" + colors.text
            ].join(";");

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "\uD83D\uDEE1";
            button.title = "Anti-Fingerprint Merged Shield";
            button.style.cssText = [
                "width:42px",
                "height:42px",
                "border-radius:50%",
                "border:1px solid " + colors.border,
                "background:" + colors.panel,
                "color:" + colors.text,
                "box-shadow:0 4px 14px rgba(0,0,0,.22)",
                "cursor:move",
                "font-size:20px",
                "line-height:1"
            ].join(";");

            const panel = document.createElement("div");
            panel.style.cssText = [
                "display:none",
                "position:absolute",
                "top:50px",
                "left:0",
                "width:315px",
                "background:" + colors.panel,
                "border:1px solid " + colors.border,
                "border-radius:14px",
                "box-shadow:0 10px 30px rgba(0,0,0,.28)",
                "padding:14px",
                "box-sizing:border-box",
                "color:" + colors.text
            ].join(";");

            panel.appendChild(titleRow("Anti-Fingerprint Shield", enabled ? "Active" : "Disabled", enabled ? colors.ok : colors.danger));
            panel.appendChild(textBlock("Current profile", profile.id));
            panel.appendChild(textBlock("Expires", formatDate(Number(storageGet(PROFILE_EXPIRY_KEY) || "0"))));
            panel.appendChild(textBlock("Detected browser", detectFamily()));

            const profileSelect = document.createElement("select");
            profileSelect.style.cssText = inputCss(colors);

            for (const item of getCompatibleProfiles()) {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.id;
                option.selected = item.id === profile.id;
                profileSelect.appendChild(option);
            }

            profileSelect.addEventListener("change", () => {
                const selected = browserProfiles.find(item => item.id === profileSelect.value);

                if (!selected) {
                    return;
                }

                storageSet(PROFILE_KEY, JSON.stringify(selected));
                storageSet(PROFILE_EXPIRY_KEY, String(Date.now() + PROFILE_DURATION_MS));
                location.reload();
            });

            panel.appendChild(profileSelect);

            panel.appendChild(createButton(enabled ? "Disable protection" : "Enable protection", enabled ? colors.danger : colors.ok, () => {
                storageSet(ENABLED_KEY, enabled ? "false" : "true");
                location.reload();
            }));

            panel.appendChild(createButton("Refresh profile", colors.primary, () => {
                storageRemove(PROFILE_EXPIRY_KEY);
                location.reload();
            }));

            const details = document.createElement("details");
            details.open = true;
            details.style.cssText = "margin-top:10px";

            const summary = document.createElement("summary");
            summary.textContent = "Modules";
            summary.style.cssText = "cursor:pointer;color:" + colors.muted;
            details.appendChild(summary);

            for (const key of Object.keys(defaultSettings)) {
                details.appendChild(createCheckbox(key, !!settings[key], colors, checked => {
                    const next = Object.assign({}, settings, { [key]: checked });
                    saveSettings(next);
                    location.reload();
                }));
            }

            panel.appendChild(details);

            panel.appendChild(createButton("Hide icon", colors.muted, () => {
                storageSet(UI_VISIBLE_KEY, "false");
                container.remove();
                console.info("[AFM] Icon hidden. Run localStorage.setItem('" + UI_VISIBLE_KEY + "','true') and reload to show it again.");
            }));

            const dragState = {
                dragging: false,
                moved: false,
                offsetX: 0,
                offsetY: 0
            };

            button.addEventListener("click", event => {
                if (dragState.moved) {
                    return;
                }

                event.stopPropagation();
                panel.style.display = panel.style.display === "none" ? "block" : "none";
            });

            button.addEventListener("mousedown", event => {
                dragState.dragging = true;
                dragState.moved = false;
                dragState.offsetX = event.clientX - container.offsetLeft;
                dragState.offsetY = event.clientY - container.offsetTop;
                event.preventDefault();
            });

            document.addEventListener("mousemove", event => {
                if (!dragState.dragging) {
                    return;
                }

                dragState.moved = true;
                container.style.left = Math.max(0, event.clientX - dragState.offsetX) + "px";
                container.style.top = Math.max(0, event.clientY - dragState.offsetY) + "px";
            });

            document.addEventListener("mouseup", () => {
                if (!dragState.dragging) {
                    return;
                }

                dragState.dragging = false;

                storageSet(UI_POSITION_KEY, JSON.stringify({
                    top: container.offsetTop,
                    left: container.offsetLeft
                }));

                setTimeout(() => {
                    dragState.moved = false;
                }, 0);
            });

            document.addEventListener("click", event => {
                if (!container.contains(event.target)) {
                    panel.style.display = "none";
                }
            });

            document.addEventListener("keydown", event => {
                if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "f") {
                    event.preventDefault();
                    panel.style.display = panel.style.display === "none" ? "block" : "none";
                }
            });

            container.appendChild(button);
            container.appendChild(panel);

            return container;
        }

        /**
         * Returns the active UI color palette.
         *
         * @param {boolean} isDark Whether dark mode is active.
         * @returns {{panel: string, bg: string, text: string, muted: string, border: string, ok: string, danger: string, primary: string}} UI color palette.
         */
        function getUiColors(isDark) {
            return isDark
                ? {
                    panel: "#23272f",
                    bg: "#181b20",
                    text: "#f3f3f3",
                    muted: "#bfc4cc",
                    border: "#444",
                    ok: "#34c759",
                    danger: "#ff453a",
                    primary: "#0a84ff"
                }
                : {
                    panel: "#ffffff",
                    bg: "#f8f9fa",
                    text: "#222222",
                    muted: "#666666",
                    border: "#dddddd",
                    ok: "#28a745",
                    danger: "#dc3545",
                    primary: "#007aff"
                };
        }

        /**
         * Creates a title row used by the floating settings panel.
         *
         * @param {string} title Section title.
         * @param {string} status Status text.
         * @param {string} statusColor CSS color used for the status text.
         * @returns {HTMLDivElement} Rendered title row.
         */
        function titleRow(title, status, statusColor) {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;font-weight:700;font-size:15px";

            const left = document.createElement("span");
            left.textContent = title;

            const right = document.createElement("span");
            right.textContent = status;
            right.style.color = statusColor;

            row.appendChild(left);
            row.appendChild(right);

            return row;
        }

        /**
         * Creates a compact label/value text block.
         *
         * @param {string} label Label shown above the value.
         * @param {string} value Value text.
         * @returns {HTMLDivElement} Rendered text block.
         */
        function textBlock(label, value) {
            const block = document.createElement("div");
            block.style.cssText = "margin:8px 0;white-space:pre-line";

            const labelElement = document.createElement("div");
            labelElement.textContent = label;
            labelElement.style.cssText = "font-size:11px;text-transform:uppercase;letter-spacing:.04em;opacity:.7;margin-bottom:2px";

            const valueElement = document.createElement("div");
            valueElement.textContent = value;

            block.appendChild(labelElement);
            block.appendChild(valueElement);

            return block;
        }

        /**
         * Builds shared CSS for inputs and select elements in the floating UI.
         *
         * @param {{bg: string, text: string, border: string}} colors Active UI color palette.
         * @returns {string} CSS text.
         */
        function inputCss(colors) {
            return [
                "width:100%",
                "margin:8px 0",
                "padding:8px",
                "border-radius:8px",
                "border:1px solid " + colors.border,
                "background:" + colors.bg,
                "color:" + colors.text,
                "box-sizing:border-box"
            ].join(";");
        }

        /**
         * Creates a styled button for the floating UI.
         *
         * @param {string} text Button label.
         * @param {string} color Button background color.
         * @param {Function} onClick Click handler.
         * @returns {HTMLButtonElement} Rendered button.
         */
        function createButton(text, color, onClick) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = text;
            button.style.cssText = [
                "width:100%",
                "margin:6px 0",
                "padding:8px 10px",
                "border:0",
                "border-radius:8px",
                "background:" + color,
                "color:#fff",
                "cursor:pointer",
                "font-weight:600"
            ].join(";");

            button.addEventListener("click", event => {
                event.stopPropagation();
                onClick();
            });

            return button;
        }

        /**
         * Creates a labeled checkbox row for a spoofing setting.
         *
         * @param {string} label Checkbox label.
         * @param {boolean} checked Initial checked state.
         * @param {{text: string}} colors Active UI color palette.
         * @param {(checked: boolean) => void} onChange Handler invoked after the checkbox changes.
         * @returns {HTMLLabelElement} Rendered checkbox row.
         */
        function createCheckbox(label, checked, colors, onChange) {
            const row = document.createElement("label");
            row.style.cssText = "display:flex;align-items:center;gap:8px;margin:8px 0;cursor:pointer;color:" + colors.text;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = checked;
            checkbox.addEventListener("change", () => onChange(checkbox.checked));

            const text = document.createElement("span");
            text.textContent = label;

            row.appendChild(checkbox);
            row.appendChild(text);

            return row;
        }

        /**
         * Formats a timestamp for display in the current page locale.
         *
         * @param {number|string} timestamp Timestamp in milliseconds.
         * @returns {string} Formatted date or fallback text.
         */
        function formatDate(timestamp) {
            if (!timestamp) {
                return "unknown";
            }

            try {
                return new Date(Number(timestamp)).toLocaleString();
            } catch (_) {
                return String(timestamp);
            }
        }

        try {
            applyProtections();
        } catch (error) {
            console.warn("[AFM] failed to initialize", error);
        }
    } + ")();";

    (document.documentElement || document.head || document).prepend(pageScript);
    pageScript.remove();
})();`,(document.documentElement||document.head||document.body).append(a),a.remove()}var Qo="kglacer-macro:overlay-hidden",Ko="kglacer-macro:auto-farm-config",qo="kglacer-macro:auto-overlay-config",Go="kglacer-macro:proxy-config",ia="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class wo extends Y{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$openConfig;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;challengeWatcherObserver;challengeWatcherRunning=!1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=So,P(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=ia,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$openConfig.addEventListener("click",()=>{this.openSettingsModal()}),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}startChallengeWatcher(){let o=()=>{if(!this.isChallengeBlockingPaint())return;if(this.challengeWatcherRunning)return;this.challengeWatcherRunning=!0,this.status=`⌛ ${t("taskWaitingChallengeResolve")}`,this.waitForChallengeToResolve().finally(()=>{this.challengeWatcherRunning=!1})};this.challengeWatcherObserver=new MutationObserver(()=>{o()}),this.challengeWatcherObserver.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["open","style","class","value","aria-hidden"]});let a=window.setInterval(o,750);this.runOnDestroy.push(()=>{this.challengeWatcherObserver?.disconnect(),clearInterval(a)}),o()}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(t("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${X},.wplace`,o.click(),await K(o,["change"],["cancel","error"]);let a=o.files?.[0];if(!a)throw new uo(this.bot);console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let r;if(a.name.endsWith(`.${X}`))r=await j.fromJSON(this.bot,JSON.parse(await a.text()));else if(a.name.endsWith(".wplace")){let s=JSON.parse(await a.text());if(!s.image?.dataUrl)throw new Error("Invalid .wplace file: image.dataUrl missing");let l=new Image;if(l.src=s.image.dataUrl,await K(l,["load"],["error"]),await this.waitForStableViewportProjection(),r=new j(this.bot,k.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new q(this.bot,l)),typeof s.opacity==="number")r.opacity=Math.max(0,Math.min(1,s.opacity))}else{let s=new FileReader;s.readAsDataURL(a),await K(s,["load"],["error"]);let l=await this.compressImageBeforeLoad(s.result),p=new Image;p.src=l,await K(p,["load"],["error"]),await this.waitForStableViewportProjection(),r=new j(this.bot,k.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new q(this.bot,p))}this.bot.images.push(r),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),r.updateTasks(),A(this.bot,!0),this.bot.updateTasks(),this.update(),window.setTimeout(()=>{globalThis.location.reload()},120)},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(t("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:a,minGlobalY:r,maxGlobalX:s,maxGlobalY:l}=o,p=document.createElement("canvas");p.width=Math.max(1,s-a+1),p.height=Math.max(1,l-r+1);let c=p.getContext("2d");if(!c)throw new Error("Capture context unavailable");c.imageSmoothingEnabled=!1;let g=Math.floor(a/M),i=Math.floor(r/M),f=Math.floor(s/M),n=Math.floor(l/M),u=(f-g+1)*(n-i+1),d=0;for(let e=g;e<=f;e++)for(let w=i;w<=n;w++){this.status=`⌛ ${t("taskReadingTiles")} [${++d}/${u}]`;let m=await this.loadTileImage(e,w),h=e*M,z=w*M,H=Math.max(a,h),F=Math.min(s,h+M-1),U=Math.max(r,z),W=Math.min(l,z+M-1),C=H-h,I=U-z,O=F-H+1,Q=W-U+1,x=H-a,$=U-r;c.drawImage(m,C,I,O,Q,x,$,O,Q)}let b=Date.now();await this.downloadCapture(p,"png",b)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,a,r){let s=a==="webp"?"image/webp":"image/png",l=await new Promise((g,i)=>{o.toBlob((f)=>{if(!f){i(new Error(`Failed to create ${a.toUpperCase()} capture file`));return}g(f)},s)}),p=URL.createObjectURL(l),c=document.createElement("a");c.href=p,c.download=`wplace-capture-${r}.${a}`,c.click(),URL.revokeObjectURL(p)}async loadTileImage(o,a){let r;for(let s=1;s<=3;s++)try{let l=new Image;return l.crossOrigin="anonymous",l.referrerPolicy="no-referrer",l.src=`https://backend.wplace.live/files/s0/tiles/${o}/${a}.png?ts=${Date.now()}-${s}`,await K(l,["load"],["error"]),l}catch(l){if(r=l,s<3)await new Promise((p)=>setTimeout(p,s*200))}throw r instanceof Error?r:new Error(`Tile fetch failed (${o}/${a})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,a)=>{let r=document.createElement("div");r.className="kgm-capture-overlay",r.innerHTML=`<div class="kgm-capture-hint">${t("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let s=r.querySelector(".kgm-capture-box");document.body.append(r);let l,p,c=()=>{window.removeEventListener("keydown",u,!0),r.removeEventListener("pointermove",f),r.removeEventListener("pointerdown",n),r.remove()},g=(d)=>{let b=Math.min(l.x,d.x),e=Math.min(l.y,d.y),w=Math.abs(l.x-d.x)+1,m=Math.abs(l.y-d.y)+1;return{left:b,top:e,width:w,height:m}},i=(d)=>{let{left:b,top:e,width:w,height:m}=g(d);s.style.left=`${b}px`,s.style.top=`${e}px`,s.style.width=`${w}px`,s.style.height=`${m}px`},f=(d)=>{if(!l)return;i({x:d.clientX,y:d.clientY})},n=(d)=>{if(d.preventDefault(),!l){l={x:d.clientX,y:d.clientY};let H=k.fromScreenPosition(this.bot,l);p={x:H.globalX,y:H.globalY},i(l);return}let b={x:d.clientX,y:d.clientY},e=k.fromScreenPosition(this.bot,b);if(c(),!p){a(new Error("Capture anchor point unavailable"));return}let w=Math.min(p.x,e.globalX),m=Math.min(p.y,e.globalY),h=Math.max(p.x,e.globalX),z=Math.max(p.y,e.globalY);if(h-w<1||z-m<1){a(new Error("Capture area too small"));return}o({minGlobalX:w,minGlobalY:m,maxGlobalX:h,maxGlobalY:z})},u=(d)=>{if(d.key!=="Escape")return;c(),a(new Error("Capture cancelled"))};window.addEventListener("keydown",u,!0),r.addEventListener("pointermove",f),r.addEventListener("pointerdown",n)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let a=new Image;if(a.src=o,await K(a,["load"],["error"]),!(a.naturalWidth*a.naturalHeight>3000000||o.length>3000000))return o;let s=document.createElement("canvas");s.width=a.naturalWidth,s.height=a.naturalHeight;let l=s.getContext("2d");if(!l)return o;return l.drawImage(a,0,0),s.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),a=0,r;for(let s=0;s<45;s++){await new Promise((f)=>requestAnimationFrame(()=>{f()}));let{anchorScreenPosition:{x:l,y:p},pixelSize:c}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(c)||c<=0){a=0;continue}let g={anchorX:l,anchorY:p,pixelSize:c};if(!r){r=g,a=1;continue}if(Math.abs(g.anchorX-r.anchorX)+Math.abs(g.anchorY-r.anchorY)+Math.abs(g.pixelSize-r.pixelSize)<0.0012)a++;else a=0;if(r=g,a>=3)return}}update(){this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.$images.innerHTML="";let o=document.createDocumentFragment();for(let a=0;a<this.bot.images.length;a++){let r=this.bot.images[a],s=document.createElement("div");o.append(s),s.className="image",s.innerHTML=`<button class="preview" title="View preview">
  <img src="${r.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${a===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${a===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,s.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=a,r.openPreviewPanel()}),s.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=a,r.openColorPanel()}),s.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=a,r.openPreviewPanel()}),s.querySelector(".download").addEventListener("click",()=>{r.exportImage()}),s.querySelector(".delete").addEventListener("click",()=>{r.destroy()}),s.querySelector(".up").addEventListener("click",()=>{co(this.bot.images,a,a-1),this.update(),A(this.bot)}),s.querySelector(".down").addEventListener("click",()=>{co(this.bot.images,a,a+1),this.update(),A(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,a=0;for(let l=0;l<this.bot.images.length;l++){let p=this.bot.images[l];o+=p.pixels.pixels.length*p.pixels.pixels[0].length,a+=p.tasks.length}let r=Math.max(0,o-a),s=o>0?r/o*100|0:0;this.$progressText.textContent=`${r}/${o} ${s}% ETA: ${a/120|0}h`,this.$progressLine.style.transform=`scaleX(${s/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Qo)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let a=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",a),localStorage.setItem(Qo,String(a)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden")?t("disabled"):t("enabled");this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${t("toggleOverlay")} (${o})</span>`}applyLocaleToUI(o){ro(o),P(this.element);for(let a=0;a<this.bot.images.length;a++)this.bot.images[a].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button>
  </div>
  <label class="autofarm-label">
    <span data-i18n="language">Language</span>
    <div class="autofarm-fields">
      <select class="settings-locale autofarm-unit">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  </label>
  <label class="kgm-switch-row">
    <span data-i18n="proxyEnabled">Enable proxy for web requests (beta)</span>
    <span class="kgm-switch">
      <input class="proxy-enabled" type="checkbox" />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <label class="kgm-switch-row">
    <span data-i18n="shieldEnabled">Enable Script Shield (recommended)</span>
    <span class="kgm-switch">
      <input class="shield-enabled" type="checkbox" />
      <span class="kgm-switch-slider" aria-hidden="true"></span>
    </span>
  </label>
  <details class="shortcuts proxy-settings">
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-network-wired"></i> <span data-i18n="proxyTitle">Proxy (Beta)</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <label class="autofarm-label"><span>Host</span><input class="proxy-host" type="text" placeholder="127.0.0.1" /></label>
    <label class="autofarm-label"><span>Port</span><input class="proxy-port" type="number" min="1" max="65535" placeholder="8080" /></label>
    <label class="autofarm-label"><span>User</span><input class="proxy-user" type="text" placeholder="optional" /></label>
    <label class="autofarm-label"><span>Pass</span><input class="proxy-pass" type="password" placeholder="optional" /></label>
  </details>
  <details class="shortcuts shield-settings">
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-shield-halved"></i> <span data-i18n="shieldTitle">Shield</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <div class="shield-controls"></div>
    
  </details>
  <details class="shortcuts" open>
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-keyboard"></i> <span data-i18n="keyboardShortcuts">Shortcuts</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <ul class="shortcut-list">
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-table-cells-large"></i><span data-i18n="shortcutToggleWidget">Toggle widget</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>B</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-layer-group"></i><span data-i18n="shortcutToggleOverlay">Toggle overlays</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>V</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-pen-nib"></i><span data-i18n="shortcutDraw">Draw</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>Enter</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-image"></i><span data-i18n="shortcutAddImage">Add image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>I</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-sliders"></i><span data-i18n="shortcutOpenSettings">Open settings</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>/</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-forward"></i><span data-i18n="shortcutNextImage">Next image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>N</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-backward"></i><span data-i18n="shortcutPreviousImage">Previous image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>P</kbd></span></li>
      <li class="shortcut-item shortcut-item-color-panel"><span class="shortcut-label"><i class="fa-solid fa-palette"></i><span data-i18n="shortcutColorPanel">Color panel</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>O</kbd></span></li>
      <li class="shortcut-item shortcut-item-lock-image"><span class="shortcut-label"><i class="fa-solid fa-lock"></i><span data-i18n="shortcutLockImage">Lock image</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>L</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-hourglass-half"></i><span data-i18n="shortcutClickPaintWhenReady">Wait + click Paint</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>R</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-play"></i><span data-i18n="shortcutStartAutoFarm">Start auto farm</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>F</kbd></span></li>
      <li class="shortcut-item"><span class="shortcut-label"><i class="fa-solid fa-stop"></i><span data-i18n="shortcutStopAutoFarm">Stop auto farm</span></span><span class="shortcut-keys"><kbd>Shift</kbd><kbd>G</kbd></span></li>
    </ul>
  </details>
</form>`,document.body.append(o),P(o);let a=o.querySelector(".settings-locale");a.value=_(),a.addEventListener("change",()=>{this.applyLocaleToUI(a.value),P(o)});let r=JSON.parse(localStorage.getItem(Go)??"{}"),s=o.querySelector(".proxy-enabled"),l=o.querySelector(".proxy-host"),p=o.querySelector(".proxy-port"),c=o.querySelector(".proxy-user"),g=o.querySelector(".proxy-pass"),i=o.querySelector(".shield-enabled"),f=o.querySelector(".proxy-settings"),n=o.querySelector(".shield-settings"),u=o.querySelector(".shield-controls");s.checked=Boolean(r.enabled),i.checked=to(),f.open=s.checked,n.open=i.checked,this.renderShieldControls(u),l.value=r.host??"",p.value=r.port??"",c.value=r.username??"",g.value=r.password??"";let d=()=>{localStorage.setItem(Go,JSON.stringify({enabled:s.checked,host:l.value.trim(),port:p.value.trim(),username:c.value.trim(),password:g.value}))};for(let b of[s,l,p,c,g])b.addEventListener("change",d);s.addEventListener("change",()=>{f.open=s.checked}),i.addEventListener("change",()=>{n.open=i.checked,this.renderShieldControls(u),Uo(i.checked),window.setTimeout(()=>location.reload(),120)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}renderShieldControls(o){let l={navigator:t("shieldFeatureNavigator"),userAgentData:t("shieldFeatureUaData"),screen:t("shieldFeatureScreen"),timezone:t("shieldFeatureTimezone"),canvas:t("shieldFeatureCanvas"),webgl:t("shieldFeatureWebgl"),audio:t("shieldFeatureAudio"),plugins:t("shieldFeaturePlugins"),mediaDevices:t("shieldFeatureMediaDevices"),storageEstimate:t("shieldFeatureStorage"),battery:t("shieldFeatureBattery"),speechSynthesis:t("shieldFeatureSpeech"),fonts:t("shieldFeatureFonts"),matchMedia:t("shieldFeatureMatchMedia"),sharedArrayBuffer:t("shieldFeatureSharedArrayBuffer")},p=JSON.parse(localStorage.getItem("__afm_profile")??"null"),c="__afm_profile_choices",g=Number(localStorage.getItem("__afm_profile_expiry")??"0"),i=JSON.parse(localStorage.getItem("__afm_settings")??"{}"),f=JSON.parse(localStorage.getItem("__afm_profile_choices")??"[]"),u={...Object.fromEntries(Object.keys(l).map((m)=>[m,!0])),...i},d=g>0?new Date(g).toLocaleString():"—",b=p?.id??"Auto",e=f.map((m)=>`<option value="${m.id}" ${m.id===b?"selected":""}>${m.id}</option>`).join(""),w=Object.entries(l).map(([m,h])=>`<label class="kgm-switch-row"><span>${h}</span><span class="kgm-switch"><input type="checkbox" data-shield-key="${m}" ${u[m]?"checked":""}/><span class="kgm-switch-slider" aria-hidden="true"></span></span></label>`).join("");o.innerHTML=`<div class="shield-profile-row"><label>${t("shieldProfile")}</label><select class="shield-profile-select"><option value="">${t("shieldProfileAuto")}</option>${e}</select></div><div class="wp">${t("shieldExpires")}: <strong>${d}</strong></div><div class="widget-actions"><button type="button" class="challenge-button shield-refresh-profile"><i class="fa-solid fa-rotate"></i><span>${t("shieldRefreshProfile")}</span></button><button type="button" class="challenge-button shield-test"><i class="fa-solid fa-vial-circle-check"></i><span>${t("shieldTest")}</span></button></div><div class="shield-control-grid">${w}</div>`,o.querySelectorAll("input[data-shield-key]").forEach((m)=>{m.addEventListener("change",()=>{let h=m.dataset.shieldKey;u[h]=m.checked,localStorage.setItem("__afm_settings",JSON.stringify(u)),window.setTimeout(()=>location.reload(),120)})}),o.querySelector(".shield-profile-select")?.addEventListener("change",(m)=>{let h=m.currentTarget.value;if(!h)localStorage.removeItem("__afm_profile");else localStorage.setItem("__afm_profile",JSON.stringify({id:h}));location.reload()}),o.querySelector(".shield-test")?.addEventListener("click",()=>{alert(`${t("shieldTest")} OK`)}),o.querySelector(".shield-refresh-profile")?.addEventListener("click",()=>{localStorage.removeItem("__afm_profile"),localStorage.removeItem("__afm_profile_expiry"),location.reload()})}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=t("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${t("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:t("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=t("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${t("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:t("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let a=Math.max(0,o-Date.now()),r=Math.ceil(a/1000),s=Math.floor(r/60),l=r%60;return`next in ${String(s).padStart(2,"0")}:${String(l).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText()}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${t("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${t("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText();return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{if(!await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels,0)){this.status=`⚠️ ${t("autoFarmStopped")}: ${t("autoFarmTransparentUnavailable")}`,this.stopAutoFarm();return}await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;try{if(!await this.bot.drawOverlayPixelsBatch(this.autoOverlayConfig.pixels)){this.status=`⚠️ ${t("autoOverlayStopped")}: ${t("autoOverlayNoTasks")}`,this.stopAutoOverlay();return}await this.waitAndClickPaintButton()}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Ko,JSON.stringify(o))}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(qo,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(Ko);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,s=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",l=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:s==="hours"?a.value*3600000:s==="minutes"?a.value*60000:a.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,unit:s,timerMs:l}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=localStorage.getItem(qo);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,s=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",l=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:s==="hours"?a.value*3600000:s==="minutes"?a.value*60000:a.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,unit:s,timerMs:l}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoFarmConfig?.unit??"minutes",r=this.autoFarmConfig?.value??1,s=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${r}" />
      <select class="autofarm-unit">
        <option value="seconds" data-i18n="seconds">Seconds</option>
        <option value="minutes" selected data-i18n="minutes">Minutes</option>
        <option value="hours" data-i18n="hours">Hours</option>
      </select>
    </div>
  </label>
  <label class="autofarm-label">
    <span data-i18n="autoFarmPixelsPerCycle">Pixels per cycle</span>
    <div class="autofarm-fields">
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${s}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),P(o);let l=o.querySelector(".autofarm-unit");l.value=a;let p=o.querySelector(".autofarm-value"),c=o.querySelector(".autofarm-pixels"),g=()=>{let i=Math.max(1,Number.parseInt(p.value||"1",10));if(l.value==="hours")return i*3600000;if(l.value==="minutes")return i*60000;return i*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(p.value||"1",10)),pixels:Math.max(1,Number.parseInt(c.value||"60",10)),unit:l.value,timerMs:g()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoOverlayConfig?.unit??"minutes",r=this.autoOverlayConfig?.value??1,s=this.autoOverlayConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${t("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoOverlayHelp">Paint overlay image pixels, click Paint, then repeat by timer.</p>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${r}" />
      <select class="autofarm-unit">
        <option value="seconds" data-i18n="seconds">Seconds</option>
        <option value="minutes" selected data-i18n="minutes">Minutes</option>
        <option value="hours" data-i18n="hours">Hours</option>
      </select>
    </div>
  </label>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayPixelsPerCycle">Pixels per cycle</span>
    <div class="autofarm-fields">
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${s}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),P(o);let l=o.querySelector(".autofarm-unit");l.value=a;let p=o.querySelector(".autofarm-value"),c=o.querySelector(".autofarm-pixels"),g=()=>{let i=Math.max(1,Number.parseInt(p.value||"1",10));if(l.value==="hours")return i*3600000;if(l.value==="minutes")return i*60000;return i*1000};o.querySelector(".autooverlay-start").onclick=()=>{this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(p.value||"1",10)),pixels:Math.max(1,Number.parseInt(c.value||"60",10)),unit:l.value,timerMs:g()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,a){this.element.querySelector("."+o).disabled=a}async run(o,a,r,s="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${s} ${o}`;try{let p=await a();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),p}catch(p){if(!(p instanceof lo))console.error(p),this.status=`${t("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:p}),p}finally{await r?.()}}handleKeyboard(o){if(Jo(o.target))return;if(D(o,N.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(D(o,N.showShortcuts)){o.preventDefault(),this.open=!0,this.openSettingsModal();return}if(D(o,N.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(D(o,N.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(D(o,N.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(D(o,N.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(D(o,N.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(D(o,N.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(D(o,N.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(D(o,N.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(D(o,N.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(D(o,N.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),A(this.bot)}async waitAndClickPaintButton(){await this.run(t("taskWaitingPaintButton"),async()=>{for(;;){if(this.isChallengeBlockingPaint()){await this.waitForChallengeToResolve(),await new Promise((a)=>setTimeout(a,250));continue}let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(o);return}await new Promise((a)=>setTimeout(a,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((r)=>Array.from(document.querySelectorAll(r))).find((r)=>/pintar|paint/i.test(r.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}async triggerNativePaintClickWithChallengeRecovery(o){for(let r=0;r<3;r++){let s=r===0?o:this.findNativePaintButton();if(!s)return;if(s.disabled||s.ariaDisabled==="true")return;this.triggerNativePaintClick(s);let l=await this.waitForPaintAttemptOutcome(6000);if(l==="painted")return;if(l==="challenge"){await this.waitForChallengeToResolve(),await new Promise((p)=>setTimeout(p,350));continue}await new Promise((p)=>setTimeout(p,350))}console.log("[KGM][Widget] Paint click finished without a clear success signal after retries")}async waitForPaintAttemptOutcome(o){let a=Date.now();while(Date.now()-a<=o){if(this.isChallengeBlockingPaint())return"challenge";let r=this.findNativePaintButton();if(r&&(r.disabled||r.ariaDisabled==="true"))return await this.waitForDelayedChallenge(1200)?"challenge":"painted";await new Promise((s)=>setTimeout(s,200))}return"unknown"}async waitForDelayedChallenge(o){let a=Date.now();while(Date.now()-a<=o){if(this.isChallengeBlockingPaint())return!0;await new Promise((r)=>setTimeout(r,150))}return!1}async waitForChallengeToResolve(){await this.run(t("taskWaitingChallengeResolve"),async()=>{let o=Date.now(),a=90000;while(this.isChallengeBlockingPaint()&&Date.now()-o<=90000)await new Promise((r)=>setTimeout(r,500))})}isChallengeBlockingPaint(){let r=Array.from(document.querySelectorAll('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')).filter((p)=>{if(p.closest("dialog")?.matches("dialog:not([open])"))return!1;let c=globalThis.getComputedStyle(p);if(c.display==="none"||c.visibility==="hidden")return!1;let g=p.getBoundingClientRect();return g.width>0&&g.height>0});if(!r.length)return!1;let s=document.querySelector("dialog.modal[open], dialog[open]");if(s?.querySelector('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')){if(!Array.from(s.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]')).some((c)=>c.value.trim().length>0))return!0}return r.some((p)=>{let c=p.closest("h-captcha")??p.parentElement??document.documentElement,g=Array.from(c.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]'));if(!g.length)return!0;return g.every((i)=>i.value.trim().length===0)})}}var fa=2;function na(){let o=globalThis;if(typeof o.fp_assemble_injection!=="function")o.fp_assemble_injection=()=>({});if(!o.__kgmUnhandledRejectionPatched)o.__kgmUnhandledRejectionPatched=!0,o.addEventListener("unhandledrejection",(a)=>{let r=a.reason,s=r instanceof Error?r.message:String(r??"");if(r?.name==="NotAllowedError"&&s.includes("play() failed"))a.preventDefault()});if(!o.__kgmMediaPlayPatched&&"HTMLMediaElement"in o){o.__kgmMediaPlayPatched=!0;let a=o.HTMLMediaElement.prototype.play;o.HTMLMediaElement.prototype.play=function r(){let s=a.call(this);if(s&&typeof s.catch==="function")return s.catch((l)=>{let p=l instanceof Error?l.message:String(l??"");if(l?.name==="NotAllowedError"&&p.includes("play() failed"))return;throw l});return s}}}var Wo="[KGM]",Zo="kglacer-macro:access-ok",mo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Lo="kgm-access-locked";class Ro{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,a){if(a===void 0)console.log(`${Wo} ${o}`);else console.log(`${Wo} ${o}`,a)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Lo);let o=No();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let s=0;s<o.images.length;s++){let l=o.images[s];v({x:l.position[0]-1000,y:l.position[1]-1000}),v({x:l.position[0]+1000,y:l.position[1]+1000})}this.strategy=o.strategy}let a=JSON.parse(localStorage.getItem("kglacer-macro:proxy-config")??"{}");jo(a),this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let r=document.createElement("style");r.textContent=Do.replace("FAKE_FAVORITE_LOCATIONS",E.length.toString()),document.head.append(r),this.log("Styles injected",{fakeFavoriteLocations:E.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Lo),this._widget=new wo(this),await this.widget.run(t("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let s=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((l)=>{for(let p=0;p<l.length;p++)if(l[p].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(s,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await J(500),await this.updateColors(),o)for(let l=0;l<o.images.length;l++){let p=await j.fromJSON(this,o.images[l]);this.images.push(p),p.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Zo)===mo)return;await new Promise((o)=>{let a=document.createElement("dialog");a.className="kgm-modal access-dialog",a.innerHTML=`<form method="dialog" class="access-form">
  <div class="kgm-modal-head">
    <strong data-i18n="accessTitle">Access key</strong>
  </div>
  <p data-i18n="accessHelp">Enter your serial key to continue.</p>
  <label class="access-label">
    <span data-i18n="accessInputLabel">Serial key</span>
    <input class="access-input" type="password" required data-i18n-placeholder="accessInputPlaceholder" placeholder="KGM-********" />
  </label>
  <label class="access-label">
    <span data-i18n="language">Language</span>
    <select class="access-locale"></select>
  </label>
  <button type="submit" class="access-submit" data-i18n="accessContinue">Continue</button>
  <small class="access-error" role="alert" aria-live="assertive"></small>
</form>`,document.body.append(a),P(a);let r=a.querySelector(".access-input"),s=a.querySelector(".access-error"),l=a.querySelector(".access-locale");l.innerHTML=Ao().map((p)=>`<option value="${p}" ${p===_()?"selected":""}>${p.toUpperCase()}</option>`).join(""),l.addEventListener("change",()=>{ro(l.value),P(a)}),a.addEventListener("cancel",(p)=>{p.preventDefault()}),a.querySelector("form").addEventListener("submit",(p)=>{p.preventDefault();let c=atob(mo);if(r.value.trim()!==c){s.textContent=t("invalidAccessKey");return}localStorage.setItem(Zo,mo),a.close(),a.remove(),o()}),a.showModal(),r.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),a=(r)=>{if(!r.shiftKey)r.stopPropagation()};return this.widget.run(t("taskDrawing"),async()=>{await this.widget.run(t("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",a,!0),o.addEventListener("wheel",a,!0),this.updateTasks();let r=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((p)=>p.json()),s=Math.floor(r.charges.count);this.log("Charges fetched",{charges:s});let l=0;for(let p=0;p<this.images.length;p++)l+=this.images[p].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(s>0){let p=!0;for(let c=0;c<this.images.length;c++){let g=this.images[c].tasks.shift();if(!g)continue;this.drawTask(g),s--,await J(1),p=!1}if(p)break}break}case"PERCENTAGE":{for(let p=0;p<l&&s>0;p++){let c=1,g;for(let i=0;i<this.images.length;i++){let f=this.images[i],n=1-f.tasks.length/(f.pixels.pixels.length*f.pixels.pixels[0].length);if(n<c)c=n,g=f}this.drawTask(g.tasks.shift()),s--,await J(1)}break}case"SEQUENTIAL":for(let p=0;p<this.images.length;p++){let c=this.images[p];for(let g=c.tasks.shift();g&&s>0;g=c.tasks.shift())this.drawTask(g),s--,await J(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:s})},()=>{globalThis.removeEventListener("mousemove",a,!0),o.removeEventListener("wheel",a,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:fa,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let a=document.querySelector(".maplibregl-canvas"),r=window.innerWidth/2,s=window.innerHeight/2,l=r-o.x,p=s-o.y;function c(g,i,f){a.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:i,clientY:f,buttons:1}))}c("mousedown",r,s),c("mousemove",l,p),c("mouseup",l,p)}readMap(){this.mapsCache.clear();let o=new Set;for(let r=0;r<this.images.length;r++){let s=this.images[r],{tileX:l,tileY:p}=new k(this,s.position.globalX+s.pixels.pixels[0].length,s.position.globalY+s.pixels.pixels.length);for(let c=s.position.tileX;c<=l;c++)for(let g=s.position.tileY;g<=p;g++)o.add(`${c}/${g}`)}let a=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${t("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(r)=>{this.mapsCache.set(r,await q.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${r}.png`,exactColor:!0})),this.widget.status=`⌛ ${t("taskReadingMap")} [${++a}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let a=0,r=1,s=1/0,l=1/0;for(let g=0;g<this.$stars.length;g++){let{x:i,y:f}=L(this.$stars[g]);if(i<o.x&&f<o.y){let n=o.x-i+(o.y-f);if(n<s)s=n,a=g}else if(i>o.x&&f>o.y){let n=i-o.x+(f-o.y);if(n<l)l=n,r=g}}let p=L(this.$stars[a]),c=G[a];return{anchorScreenPosition:p,anchorWorldPosition:c,pixelSize:(L(this.$stars[r]).x-p.x)/(G[r].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await J(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await J(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await J(1)}drawTask(o){if(this.lastColor!==o.color){let s=document.getElementById("color-"+o.color);if(!s){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}s.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let a=o.position.pixelSize/2,r=o.position.toScreenPosition();if(!Number.isFinite(r.x)||!Number.isFinite(r.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:r.x+a,clientY:r.y+a,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((d)=>!d.disabled&&d.getAttribute("aria-disabled")!=="true"&&d.offsetParent!==null);if(!o.length)return;let a=o[Math.floor(Math.random()*o.length)],r=Number.parseInt(a.id.slice(6),10);if(!Number.isFinite(r))return;let s=document.querySelector(".maplibregl-canvas");if(!s)return;let l=s.getBoundingClientRect(),p=24,c=l.left+p,g=l.right-p,i=l.top+p,f=l.bottom-p;if(g<=c||f<=i)return;let n=c+Math.random()*(g-c),u=i+Math.random()*(f-i);this.drawTask({color:r,position:k.fromScreenPosition(this,{x:n,y:u})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o,a){let r=Math.max(1,Math.floor(o)),s=0;return await this.widget.run(t("taskDrawingRandomPixels"),async()=>{await this.widget.run(t("taskInitializingDraw"),()=>this.updateColors());let l=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((b)=>!b.disabled&&b.getAttribute("aria-disabled")!=="true"&&b.offsetParent!==null),p=document.querySelector(".maplibregl-canvas");if(!l.length||!p)return;let c=a===void 0?void 0:l.find((b)=>Number.parseInt(b.id.slice(6),10)===a);if(a!==void 0&&!c)return;let g=p.getBoundingClientRect(),i=24,f=g.left+i,n=g.right-i,u=g.top+i,d=g.bottom-i;if(n<=f||d<=u)return;for(let b=0;b<r;b++){let e=c??l[Math.floor(Math.random()*l.length)],w=Number.parseInt(e.id.slice(6),10);if(!Number.isFinite(w))continue;let m=f+Math.random()*(n-f),h=u+Math.random()*(d-u);this.drawTask({color:w,position:k.fromScreenPosition(this,{x:m,y:h})}),s++,await J(1)}}),s}async drawOverlayPixelsBatch(o){let a=Math.max(1,Math.floor(o)),r=0;return await this.widget.run(t("taskDrawingOverlayPixels"),async()=>{await this.widget.run(t("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let s=0;s<a;s++){let l=this.takeNextTaskFromStrategy();if(!l)break;this.drawTask(l),r++,await J(1)}this.widget.update()}),r}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let a=this.images[o].tasks.shift();if(a)return a}return}case"PERCENTAGE":{let o,a=Number.POSITIVE_INFINITY;for(let r=0;r<this.images.length;r++){let s=this.images[r];if(!s.tasks.length)continue;let l=s.pixels.pixels.length*s.pixels.pixels[0].length,p=1-s.tasks.length/l;if(p<a)a=p,o=s}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=globalThis.fetch,a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(r,s)=>{let l=await o(r,s),p=l.clone(),c="";if(typeof r=="string")c=r;else if(r instanceof Request)c=r.url;else if(r instanceof URL)c=r.href;if(l.url==="https://backend.wplace.live/me")this.me=await p.json(),this.me.favoriteLocations.unshift(...E),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let g=a.exec(c);if(g){for(let i=0;i<this.markerPixelPositionResolvers.length;i++)this.markerPixelPositionResolvers[i](new k(this,+g[1],+g[2],+g[3],+g[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await J(1)}waitForElement(o,a){return this.log("Waiting for element",{name:o,selector:a}),this.widget.run(`${t("taskWaitingFor")} ${o}`,()=>{return new Promise((r)=>{let s=document.querySelector(a);if(s){r(s);return}let l=new MutationObserver(()=>{let p=document.querySelector(a);if(p)l.disconnect(),r(p)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,E.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}na();if(location.hostname.includes("hcaptcha.com"))ho();else globalThis.kglacerMacro=new Ro,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;
