// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      3.1.6
// @description  Paint automation macro for https://wplace.live / Macro para automatizar pintado en https://wplace.live
// @author       robergallardof + contributors
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
function co(o,a,r){let l=o[r];return o[r]=o[a],o[a]=l,o}function go(o,a){let r=o.indexOf(a);if(r!==-1)o.splice(r,1);return r}var za=Math.floor(Math.random()*65536),Aa=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function Q(o){return new Promise((a)=>setTimeout(a,o))}function G(o,a,r=["error"],l="addEventListener"){return new Promise((s,p)=>{for(let c=0;c<a.length;c++)o[l]?.(a[c],s);for(let c=0;c<r.length;c++)o[l]?.(r[c],p)})}class To{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,a=15000){this.size=o,this.historyTime=a}push(o){if(o<0)throw new Error("Negative chunk size");let{time:a,historyTime:r}=this.getTime();if(this.history.push({time:a,chunk:o}),this.history[0]&&this.history[0].time+r<a)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((a,r)=>a+r.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),a=o-this.startTime,r=Math.min(a,this.historyTime);return{time:o,historyTime:r}}}function fo(o,a){if(a===void 0)console.log(`[KGM][Challenge] ${o}`);else console.log(`[KGM][Challenge] ${o}`,a)}function V(o){return new Promise((a)=>setTimeout(a,o))}function ao(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function Co(o){return[...o.matchAll(/-?\d+/g)].map((a)=>Number.parseInt(a[0],10))}function Eo(o){let a=ao(o).replace(/,/g,"."),r=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(a);if(!r)return;let l=Number.parseFloat(r[1]),s=r[2],p=Number.parseFloat(r[3]);if(!Number.isFinite(l)||!Number.isFinite(p))return;if(s==="+")return String(l+p);if(s==="-")return String(l-p);if(s==="/"&&p!==0)return String(l/p);if((s==="x"||s==="×"||s==="*")&&p!==0)return String(l*p)}function Oo(o){let a=ao(o),r=Co(a);if(/es .* par|is .* even|numero par|número par/.test(a)&&r.length>0)return r[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(a)&&r.length>0)return r[0]%2!==0?"sí":"no";let l=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(a);if(l){let s=Number.parseInt(l[1],10),p=Number.parseInt(l[3],10),c=l[2];return(c===">"?s>p:c==="<"?s<p:c===">="?s>=p:c==="<="?s<=p:s===p)?"sí":"no"}if(/verdadero|true/.test(a))return"sí";if(/falso|false/.test(a))return"no"}function Yo(o,a){let r=`${o} ${a}`.trim(),l=ao(r),s=Eo(r);if(s!==void 0)return s;let p=Oo(r);if(p)return p;if(/responde (si|sí) o no|answer yes or no/.test(l))return Math.random()<0.5?"sí":"no";return"sí"}async function _o(o,a){o.focus(),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0}));for(let r=0;r<a.length;r++)o.value+=a[r],o.dispatchEvent(new Event("input",{bubbles:!0})),await V(35+Math.floor(Math.random()*55));o.dispatchEvent(new Event("change",{bubbles:!0}))}function uo(o){if(!o)return;o.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),o.click()}async function Xo(){uo(document.querySelector("#menu-info")),await V(150),uo(document.querySelector("#text_challenge"))}function vo(){let o=document.querySelector('[aria-live="polite"]'),a=document.querySelector("div.error-text"),r=/intentalo de nuevo|try again|incorrect/i.test(ao(a?.textContent??""));return Boolean(o&&!r)}async function Io(){await V(1000),await Xo();for(;;){if(vo()){fo("Challenge solved");return}let o=document.querySelector("h2.prompt-text#prompt")?.innerText??"",a=document.querySelector("div.text-text#prompt-text")?.innerText??"",r=document.querySelector('input[type="text"]'),l=document.querySelector(".button-submit");if(!o||!a||!r||!l){await V(300);continue}let s=Yo(o,a);fo("Answering text challenge",{prompt:o,promptDetails:a,answer:s}),await _o(r,s),await V(180),uo(l),await V(2200)}}function Ao(){if(!location.hostname.includes("hcaptcha.com"))return;fo("Solver booted"),Io().catch((o)=>{console.error("[KGM][Challenge] Solver crashed",o)})}var Mo=["kglacermacro:locale"],ro={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",proxyTitle:"Proxy (Beta)",proxyEnabled:"Enable proxy for web requests (beta)",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",skipUnavailableColors:"Skip unavailable premium colors",enableAllColors:"Enable all",disableAllColors:"Disable all",replaceWith:"Replace with",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",proxyTitle:"Proxy (Beta)",proxyEnabled:"Habilitar proxy para solicitudes web (beta)",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",skipUnavailableColors:"Omitir colores premium no disponibles",enableAllColors:"Activar todos",disableAllColors:"Desactivar todos",replaceWith:"Reemplazar por",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área"}};function $o(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in ro)return o;for(let a=0;a<Mo.length;a++){let r=localStorage.getItem(Mo[a]);if(!r||!(r in ro))continue;return localStorage.setItem("kglacer-macro:locale",r),r}return $o()}function lo(o){localStorage.setItem("kglacer-macro:locale",o)}function Ho(){return Object.keys(ro)}function i(o){let a=_();return ro[a][o]}function J(o){for(let a of o.querySelectorAll("[data-i18n]"))a.textContent=i(a.dataset.i18n);for(let a of o.querySelectorAll("[data-i18n-title]"))a.setAttribute("title",i(a.dataset.i18nTitle));for(let a of o.querySelectorAll("[data-i18n-aria-label]"))a.setAttribute("aria-label",i(a.dataset.i18nAriaLabel));for(let a of o.querySelectorAll("[data-i18n-placeholder]"))a.setAttribute("placeholder",i(a.dataset.i18nPlaceholder))}class X{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,a){for(let r in a)this[r]=o.querySelector(a[r])}registerEvent(o,a,r,l={}){l.passive??=!0,o.addEventListener(a,r,l),this.runOnDestroy.push(()=>{o.removeEventListener(a,r)})}}function no(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function ho(o,a,r){let l=no(o/255),s=no(a/255),p=no(r/255),c=Math.cbrt(0.4122214708*l+0.5363325363*s+0.0514459929*p),g=Math.cbrt(0.2119034982*l+0.6806995451*s+0.1073969566*p),f=Math.cbrt(0.0883024619*l+0.2817188376*s+0.6299787005*p),u=0.2104542553*c+0.793617785*g-0.0040720468*f,n=1.9779984951*c-2.428592205*g+0.4505937099*f,w=0.0259040371*c+0.7827717662*g-0.808675766*f;return[u,n,w]}function No(o,a,r){let[l,s,p]=o,[c,g,f]=a,u=(po)=>po*180/Math.PI,n=(po)=>po*Math.PI/180,w=1,t=1,m=1,b=Math.sqrt(s**2+p**2),d=Math.sqrt(g**2+f**2),z=(b+d)/2,A=0.5*(1-Math.sqrt(z**7/(z**7+6103515625))),M=s*(1+A),N=g*(1+A),F=Math.sqrt(M**2+p**2),j=Math.sqrt(N**2+f**2),W=p===0&&M===0?0:u(Math.atan2(p,M))%360,O=f===0&&N===0?0:u(Math.atan2(f,N))%360,$=c-l,Y=j-F,U=0;if(F*j!==0){if(U=O-W,U>180)U-=360;else if(U<-180)U+=360}let x=2*Math.sqrt(F*j)*Math.sin(n(U)/2),y=(l+c)/2,oo=(F+j)/2,R=(W+O)/2;if(Math.abs(W-O)>180)R+=180;let Zo=1-0.17*Math.cos(n(R-30))+0.24*Math.cos(n(2*R))+0.32*Math.cos(n(3*R+6))-0.2*Math.cos(n(4*R-63)),eo=1+0.015*(y-50)**2/Math.sqrt(20+(y-50)**2),bo=1+0.045*oo,zo=1+0.015*oo*Zo,Ro=30*Math.exp((-((R-275)/25))**2),Vo=-(2*Math.sqrt(oo**7/(oo**7+6103515625)))*Math.sin(n(2*Ro));return Math.sqrt(($/(1*eo))**2+(Y/(1*bo))**2+(x/(1*zo))**2+Vo*(Y/(1*bo))*(x/(1*zo)))-$*r}var Z=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],S=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function wo(o){if(o===0)return"transparent";let a=Z[o],r=`oklab(${a[0]*100}% ${a[1]} ${a[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",r))return r;let[l=0,s=0,p=0]=(S[o]??"0,0,0").split(",").map((c)=>Number.parseInt(c,10));return`rgb(${l} ${s} ${p})`}var Do=`<div class="wtopbar">
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
    <label>
      <input type="checkbox" class="draw-transparent" />&nbsp;<span data-i18n="eraseTransparent">Erase transparent pixels</span>
    </label>
    <label>
      <input type="checkbox" class="draw-colors-in-order" />&nbsp;<span data-i18n="drawColorsInOrder">Draw colors in order</span>
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
      <label><input type="checkbox" class="skip-unavailable" /> <span data-i18n="skipUnavailableColors">Skip unavailable premium colors</span></label>
      <button class="enable-all-colors" type="button" data-i18n="enableAllColors">Enable all</button>
      <button class="disable-all-colors" type="button" data-i18n="disableAllColors">Disable all</button>
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
`;class L{bot;image;width;exactColor;static async fromJSON(o,a){let r=new Image;return r.src=a.url.startsWith("http")?await fetch(a.url,{cache:"no-store"}).then((l)=>l.blob()).then((l)=>URL.createObjectURL(l)):a.url,await G(r,["load"],["error"]),new L(o,r,a.width,a.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,a,r=a.naturalWidth,l=!1){this.bot=o;this.image=a;this.width=r;this.exactColor=l;if(l)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let r=1;r<64;r++)if(this.exactColor||!this.bot.unavailableColors.has(r))o.set(S[r],[r,r]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let a=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let r=0;r<this.canvas.height;r++)for(let l=0;l<this.canvas.width;l++){let s=(r*this.canvas.width+l)*4,p=a[s],c=a[s+1],g=a[s+2],f=a[s+3],u=p,n=c,w=g,t=`${u},${n},${w}`;if(this.exactColor){this.pixels[r][l]=f<100?0:S.indexOf(t);continue}let m,b;if(f<100)m=b=0;else if(o.has(t))[m,b]=o.get(t);else{let z=1/0,A=1/0;for(let M=0;M<Z.length;M++){let N=Z[M],F=No(ho(u,n,w),N,0);if(!this.bot.unavailableColors.has(M)&&F<z)z=F,m=M;if(F<A)A=F,b=M}o.set(t,[m,b])}if(m!==0)this.context.fillStyle=`oklab(${Z[m][0]*100}% ${Z[m][1]} ${Z[m][2]})`,this.context.fillRect(l,r,1,1);this.pixels[r][l]=m;let d=this.colors.get(b);if(d)d.amount++;else this.colors.set(b,{color:m,amount:1,realColor:b})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var B="kglacer-macro-settings",Fo=["kglacermacro","wbot"],v="kgm";function yo(){let o=[B,...Fo];for(let a=0;a<o.length;a++){let r=o[a],l=localStorage.getItem(r);if(!l)continue;return{json:l,key:r}}return}function Po(){let o=yo();if(!o)return;let a;try{if(a=JSON.parse(o.json),typeof a!=="object")throw new Error("NOT VALID SAVE");if(a.version===1){let r=a;a.images=r.widget.images,a.strategy=r.widget.strategy,delete r.widget}if(o.key!==B)localStorage.setItem(B,o.json)}catch{localStorage.removeItem(o.key),a=void 0}return a}var Jo;function H(o,a=!1){if(clearTimeout(Jo),a)localStorage.setItem(B,JSON.stringify(o));else Jo=setTimeout(()=>{localStorage.setItem(B,JSON.stringify(o))},600)}var h=1000,oa=2048,T=h*oa,q=[],C=[],aa=Date.now();function I(o){q.push(o),C.push({id:aa++,latitude:(2*Math.atan(Math.exp(-(o.y/T*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/T*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:T/3|0,y:T/3|0});I({x:T/3*2|0,y:T/3*2|0});function e(o){let[a,r]=o.style.transform.slice(32,-31).split(", ").map((l)=>Number.parseFloat(l));return{x:a,y:r}}class D{bot;static fromJSON(o,a){return new D(o,...a)}static fromScreenPosition(o,a){let{anchorScreenPosition:r,pixelSize:l,anchorWorldPosition:s}=o.findAnchorsForScreen(a);return new D(o,s.x+(a.x-r.x)/l|0,s.y+(a.y-r.y)/l|0)}globalX=0;globalY=0;get tileX(){return this.globalX/h|0}set tileX(o){this.globalX=o*h+this.x}get tileY(){return this.globalY/h|0}set tileY(o){this.globalY=o*h+this.y}get x(){return this.globalX%h}set x(o){this.globalX=this.tileX*h+o}get y(){return this.globalY%h}set y(o){this.globalY=this.tileY*h+o}anchor1Index;anchor2Index;get pixelSize(){return(e(this.bot.$stars[this.anchor2Index]).x-e(this.bot.$stars[this.anchor1Index]).x)/(q[this.anchor2Index].x-q[this.anchor1Index].x)}constructor(o,a,r,l,s){this.bot=o;if(l===void 0||s===void 0)this.globalX=a,this.globalY=r;else this.globalX=a*h+l,this.globalY=r*h+s;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,a=1/0;for(let r=0;r<q.length;r++){let{x:l,y:s}=q[r];if(l<this.globalX&&s<this.globalY){let p=this.globalX-l+(this.globalY-s);if(p<o)o=p,this.anchor1Index=r}else if(l>this.globalX&&s>this.globalY){let p=l-this.globalX+(s-this.globalY);if(p<a)a=p,this.anchor2Index=r}}}toScreenPosition(){let o=q[this.anchor1Index],a=e(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+a.x,y:(this.globalY-o.y)*this.pixelSize+a.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:a}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:a-window.innerHeight/3})}clone(){return new D(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class K extends X{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;skipUnavailableColors;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,a){return new K(o,D.fromJSON(o,a.position),await L.fromJSON(o,a.pixels),a.strategy,a.opacity,a.drawTransparentPixels,a.drawColorsInOrder,a.skipUnavailableColors,a.colors,a.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$enableAllColors;$disableAllColors;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$skipUnavailable;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,a,r,l="SPIRAL_FROM_CENTER",s=50,p=!1,c=!1,g=!1,f=[],u=!1){super();this.bot=o;this.position=a;this.pixels=r;this.strategy=l;this.opacity=s;this.drawTransparentPixels=p;this.drawColorsInOrder=c;this.skipUnavailableColors=g;this.colors=f;this.lock=u;this.element.innerHTML=Do,this.element.classList.add("wimage"),J(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$enableAllColors:".enable-all-colors",$disableAllColors:".disable-all-colors",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$skipUnavailable:".skip-unavailable",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();H(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),H(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),H(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,H(this.bot)}),this.registerEvent(this.$skipUnavailable,"click",()=>{this.skipUnavailableColors=this.$skipUnavailable.checked,this.updateTasks(),H(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,H(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),H(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(n)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(n.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(n)=>{if(n.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$enableAllColors,"click",()=>{for(let n of this.colors)n.disabled=void 0;this.updateTasks(),this.updateColors(),H(this.bot)}),this.registerEvent(this.$disableAllColors,"click",()=>{for(let n of this.colors)n.disabled=!0;this.updateTasks(),this.updateColors(),H(this.bot)}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let n of this.element.querySelectorAll(".resize"))this.registerEvent(n,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,skipUnavailableColors:this.skipUnavailableColors,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),a=new Set,r=new Map;for(let l=0;l<this.colors.length;l++){let s=this.colors[l];if(s.disabled)a.add(s.realColor);r.set(s.replacementColor??s.realColor,l)}for(let{x:l,y:s}of this.strategyPositionIterator()){let p=this.pixels.pixels[s][l],g=this.colors.find((u)=>u.realColor===p)?.replacementColor??p;if(a.has(p))continue;o.globalX=this.position.globalX+l,o.globalY=this.position.globalY+s;let f=o.getMapColor();if(g!==f&&(this.drawTransparentPixels||g!==0))this.tasks.push({position:o.clone(),color:g})}if(this.drawColorsInOrder)this.tasks.sort((l,s)=>(r.get(l.color)??0)-(r.get(s.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:a}=this.position.toScreenPosition(),r=this.position.pixelSize*this.pixels.width,l=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${a.toFixed(3)}px, 0)`,this.element.style.width=`${r}px`,this.element.style.height=`${l}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder,this.$skipUnavailable.checked=this.skipUnavailableColors;let s=this.pixels.pixels.length*this.pixels.pixels[0].length,p=Math.max(0,s-this.tasks.length),c=s>0?p/s*100|0:0;this.$progressText.textContent=`${p}/${s} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),go(this.bot.images,this),this.bot.widget.update(),H(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let r=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-r.left,offsetY:o.clientY-r.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let a=this.$colorsDialog.getBoundingClientRect(),r=Math.max(8,window.innerWidth-a.width-8),l=Math.max(8,window.innerHeight-a.height-8),s=Math.min(r,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),p=Math.min(l,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(s)}px`,this.$colorsDialog.style.top=`${Math.round(p)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let a=document.createDocumentFragment(),r=document.createElement("article");r.className="preview-card";let l=document.createElement("strong");l.textContent=this.getStrategyLabel(o);let s=document.createElement("canvas");s.className="preview-canvas",s.width=156,s.height=156,this.paintStrategyPreview(s,o),r.append(l,s),a.append(r),this.$previewDialogList.append(a)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((r,l)=>`${l}:${r.realColor}:${r.disabled?1:0}`).join("|"),a=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===a)return;this.previewCacheSignature=a,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return i("random");case"HUMANIZED":return i("humanized");case"HUMAN_SOFT_DITHER":return i("humanSoftDither");case"HUMAN_PATCHY":return i("humanPatchy");case"HUMAN_SWEEP_ARCS":return i("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return i("humanMicroCorrections");case"HUMAN_JITTER_FILL":return i("humanJitterFill");case"HUMAN_CORNER_BIAS":return i("humanCornerBias");case"HUMAN_LONG_STROKES":return i("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return i("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return i("humanMessySpiral");case"HUMAN_DRUNK_WALK":return i("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return i("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return i("humanPatchJump");case"HUMAN_HESITANT_LINES":return i("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return i("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return i("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return i("humanGapRecovery");case"HUMAN_STAIRCASE":return i("humanStaircase");case"HUMAN_EDGE_HUGGER":return i("humanEdgeHugger");case"HUMAN_BLOBS":return i("humanBlobs");case"HUMAN_BACKTRACK":return i("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return i("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return i("humanLateFixes");case"ZIGZAG":return i("zigzag");case"BRUSH_STROKES":return i("brushStrokes");case"DIAGONAL_BRUSH":return i("diagonalBrush");case"DOWN":return i("down");case"UP":return i("up");case"LEFT":return i("left");case"RIGHT":return i("right");case"SPIRAL_FROM_CENTER":return i("spiralOut");case"SPIRAL_TO_CENTER":return i("spiralIn");case"SCRIBBLE":return i("scribble");case"CROSSHATCH":return i("crosshatch");case"WAVE_SWEEP":return i("waveSweep");case"SCATTERED_LINES":return i("scatteredLines");case"CONTOUR_JITTER":return i("contourJitter");case"SPIRAL_WOBBLE":return i("spiralWobble");case"CLUSTER_BURSTS":return i("clusterBursts");case"ORBITAL":return i("orbital");case"FLOW_FIELD":return i("flowField");case"EDGE_IN":return i("edgeIn");default:return o}}paintStrategyPreview(o,a){let r=o.getContext("2d");if(!r)return;r.fillStyle="#0f1526",r.fillRect(0,0,o.width,o.height);let l=this.getSampledImagePreviewData(),s=this.getCachedPreviewSequence(a,l.mask,l.width,l.height),p=Math.min(o.width/l.width,o.height/l.height),c=(o.width-l.width*p)/2,g=(o.height-l.height*p)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let u=(z)=>{let A=requestAnimationFrame((M)=>{this.previewAnimationHandles.delete(A),z(M)});return this.previewAnimationHandles.add(A),A},n=(z)=>{r.fillStyle="#0f1526",r.fillRect(0,0,o.width,o.height);for(let A=0;A<Math.min(z,s.length);A++){let M=s[A],N=l.colors.get(`${M.x}:${M.y}`)??0;if(!N)continue;r.fillStyle=wo(N),r.fillRect(c+M.x*p,g+M.y*p,Math.max(1,p),Math.max(1,p))}},w=Math.min(3400,Math.max(900,s.length*8)),m=w+220,b=(z,A)=>{if(!this.$previewDialog.open)return;let M=(A-z)%m,N=Math.min(1,M/w),F=N*N*(3-2*N);n(Math.floor(s.length*F));let j=u((W)=>{b(z,W)});this.previewAnimations.set(o,j)},d=performance.now();b(d,d)}getCachedPreviewSequence(o,a,r=this.pixels.width,l=this.pixels.height){let s=this.colors.map((f,u)=>`${u}:${f.realColor}:${f.disabled?1:0}`).join("|"),p=`${o}:${r}x${l}:${a.length}:${this.drawColorsInOrder?1:0}:${s}`,c=this.previewSequenceCache.get(p);if(c)return c;let g=r===this.pixels.width&&l===this.pixels.height?this.getExactPreviewSequence(o,a):this.getApproxPreviewSequence(o,a,r);if(this.drawColorsInOrder){let f=new Map;for(let u=0;u<this.colors.length;u++)f.set(this.colors[u].realColor,u);g.sort((u,n)=>(f.get(this.pixels.pixels[u.y]?.[u.x]??0)??0)-(f.get(this.pixels.pixels[n.y]?.[n.x]??0)??0))}return this.previewSequenceCache.set(p,g),g}getExactPreviewSequence(o,a){let r=this.strategy;this.strategy=o;let l=[...this.strategyPositionIterator()];this.strategy=r;let s=new Set(a.map(({x:p,y:c})=>`${p}:${c}`));return l.filter(({x:p,y:c})=>s.has(`${p}:${c}`))}getApproxPreviewSequence(o,a,r){let l=[...a],s=(g,f,u)=>{return(g*73856093+f*19349663+u*83492791>>>0)/4294967296},p=(g,f)=>l.sort((u,n)=>u.x*g+u.y*f-(n.x*g+n.y*f)||u.y-n.y||u.x-n.x),c=l.sort((g,f)=>{if(g.y!==f.y)return g.y-f.y;let u=g.y%2===0?g.x:r-g.x,n=f.y%2===0?f.x:r-f.x;return u-n});switch(o){case"UP":return p(0,-1);case"LEFT":return p(-1,0);case"RIGHT":return p(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=r/2,f=Math.max(1,Math.round(l.reduce((u,n)=>u+n.y,0)/Math.max(1,l.length)));return l.sort((u,n)=>{let w=(u.x-g)**2+(u.y-f)**2,t=(n.x-g)**2+(n.y-f)**2;return o==="SPIRAL_FROM_CENTER"?w-t:t-w}),l}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return l.sort((g,f)=>s(g.x,g.y,o.length)-s(f.x,f.y,o.length));default:return c}}getSampledImagePreviewData(){let o=this.pixels.width,a=this.pixels.height,r=K.PREVIEW_MASK_BASE_WIDTH,l=K.PREVIEW_MASK_BASE_HEIGHT,s=Math.min(1,r/Math.max(1,o),l/Math.max(1,a)),p=Math.max(1,Math.round(o*s)),c=Math.max(1,Math.round(a*s)),g=new Set;for(let w=0;w<this.colors.length;w++){let t=this.colors[w];if(t.disabled)g.add(t.realColor)}let f=new Map,u=new Map;for(let w=0;w<a;w++)for(let t=0;t<o;t++){let m=this.pixels.pixels[w]?.[t]??0;if(!m||g.has(m))continue;let b=Math.min(p-1,Math.floor(t/o*p)),d=Math.min(c-1,Math.floor(w/a*c)),z=`${b}:${d}`;if(!f.has(z))f.set(z,{x:b,y:d});if(!u.has(z))u.set(z,m)}let n=[...f.values()];if(!n.length){let w=this.fallbackPreviewMask();return{width:o,height:a,mask:w,colors:new Map(w.map((t)=>[`${t.x}:${t.y}`,this.pixels.pixels[t.y]?.[t.x]??0]))}}return{width:p,height:c,mask:n,colors:u}}getImagePreviewMask(){let o=this.pixels.width,a=this.pixels.height,r=new Set;for(let s=0;s<this.colors.length;s++){let p=this.colors[s];if(p.disabled)r.add(p.realColor)}let l=[];for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=this.pixels.pixels[s]?.[p]??0;if(c!==0&&!r.has(c))l.push({x:p,y:s})}return l.length?l:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],a=this.pixels.width/2,r=this.pixels.height/2,l=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let s=0;s<this.pixels.height;s++)for(let p=0;p<this.pixels.width;p++)if((p-a)**2+(s-r)**2<=l**2)o.push({x:p,y:s});return o}applyLocale(){if(J(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let a=S[o]??"0,0,0",[r=0,l=0,s=0]=a.split(",").map((p)=>Number.parseInt(p,10));return`#${[r,l,s].map((p)=>p.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let a=S[o]??"0,0,0",[r=0,l=0,s=0]=a.split(",").map((f)=>Number.parseInt(f,10)),p=Math.max(r,l,s),c=Math.min(r,l,s);if(p-c<15)return["gray","grey","gris","neutral","neutro"];if(r>l+30&&r>s+30)return["red","rojo"];if(l>r+30&&l>s+30)return["green","verde"];if(s>r+30&&s>l+30)return["blue","azul"];if(r>170&&l>120&&s<130)return["orange","naranja"];if(r>170&&l>110&&s>140)return["pink","rosa"];if(r>120&&l<100&&s>120)return["purple","violet","morado"];if(r>130&&l>130&&s<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",i("colorPanelResults"));let a=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((r)=>!this.pixels.colors.has(r.realColor))){let r=new Map(this.colors.map((l)=>[l.realColor,l]));this.colors=this.pixels.colors.values().toArray().sort((l,s)=>s.amount-l.amount).map((l)=>({realColor:l.realColor,disabled:r.get(l.realColor)?.disabled,replacementColor:r.get(l.realColor)?.replacementColor})),H(this.bot)}for(let r=0;r<this.colors.length;r++){let l=this.colors[r],s=this.pixels.colors.get(l.realColor),p=!1,c=s.realColor!==s.color;if(this.skipUnavailableColors&&c)l.disabled=!0;let g=s.amount/o*100,f=this.colorHex(s.realColor),u=this.colorKeywords(s.realColor),n=()=>{l.disabled=l.disabled?void 0:!0,w.classList.toggle("disabled",Boolean(l.disabled));let d=w.querySelector(".state");if(d)d.textContent=l.disabled?i("disabled"):i("enabled");H(this.bot)},w=document.createElement("button");w.className=`color-chip ${l.disabled?"disabled":""}`,w.draggable=!0,w.setAttribute("aria-label",`${i("overlayColors")} #${r+1}: ${f.toUpperCase()}`);let t=l.replacementColor??s.color,m=`#${t} ${this.colorHex(t).toUpperCase()}`;if(w.innerHTML=`<span class="order-index">#${r+1}</span>
<span class="drag" title="${i("up")} / ${i("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${g.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${l.disabled?i("disabled"):i("enabled")}</span>
  <span class="replacement">${i("replaceWith")}: ${m}</span>
</span>
<span class="premium ${c?"on":""}">${c?i("premium"):""}</span>`,w.querySelector(".swatch").style.setProperty("--swatch-color",wo(s.realColor)),w.addEventListener("click",()=>{if(p){p=!1;return}n(),this.updateTasks()}),w.addEventListener("dragstart",(d)=>{p=!0,w.classList.add("dragging"),d.dataTransfer?.setData("text/plain",String(r)),d.dataTransfer.effectAllowed="move"}),w.addEventListener("dragend",()=>{w.classList.remove("dragging")}),w.addEventListener("dragover",(d)=>{d.preventDefault(),w.classList.add("drag-target")}),w.addEventListener("dragleave",()=>{w.classList.remove("drag-target")}),w.addEventListener("drop",(d)=>{d.preventDefault(),w.classList.remove("drag-target");let z=Number.parseInt(d.dataTransfer?.getData("text/plain")??"-1",10);if(z<0||z===r||z>=this.colors.length)return;this.colors.splice(r,0,...this.colors.splice(z,1)),H(this.bot),this.updateColors()}),c){let d=document.createElement("select");d.className="replacement-select";for(let z=1;z<S.length;z++){if(this.bot.unavailableColors.has(z))continue;let A=document.createElement("option");if(A.value=String(z),A.textContent=`#${z} ${this.colorHex(z).toUpperCase()}`,z===t)A.selected=!0;d.append(A)}d.addEventListener("click",(z)=>{z.stopPropagation()}),d.addEventListener("change",()=>{l.replacementColor=d.valueAsNumber||Number.parseInt(d.value,10),this.updateTasks(),this.updateColors(),H(this.bot)}),w.append(d)}if(c){let d=document.createElement("button");d.textContent=i("buy"),d.className="buy-chip",d.addEventListener("click",(z)=>{z.stopPropagation(),document.getElementById("color-"+s.realColor)?.click()}),w.append(d)}let b=`${f} ${u.join(" ")} ${s.realColor} ${S[s.realColor]}`;if(!a||b.toLowerCase().includes(a))this.$colorsDialogList.append(w)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,a=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let r=0;r<a;r++)for(let l=0;l<o;l++)yield{x:l,y:r};break}case"UP":{for(let r=a-1;r>=0;r--)for(let l=0;l<o;l++)yield{x:l,y:r};break}case"LEFT":{for(let r=0;r<o;r++)for(let l=0;l<a;l++)yield{x:r,y:l};break}case"RIGHT":{for(let r=o-1;r>=0;r--)for(let l=0;l<a;l++)yield{x:r,y:l};break}case"RANDOM":{let r=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++)r.push({x:s,y:l});for(let l=r.length-1;l>=0;l--){let s=Math.floor(Math.random()*(l+1)),p=r[l];r[l]=r[s],r[s]=p}yield*r;break}case"ZIGZAG":{for(let r=0;r<a;r++)if(r%2===0)for(let l=0;l<o;l++)yield{x:l,y:r};else for(let l=o-1;l>=0;l--)yield{x:l,y:r};break}case"HUMANIZED":{let r=Math.max(4,Math.floor(Math.min(o,a)/10)),l=[];for(let s=0;s<a;s+=r)for(let p=0;p<o;p+=r)l.push({x:p,y:s});for(let s=l.length-1;s>=0;s--){let p=Math.floor(Math.random()*(s+1)),c=l[s];l[s]=l[p],l[p]=c}for(let s=0;s<l.length;s++){let p=l[s],c=Math.min(a,p.y+r),g=Math.min(o,p.x+r);for(let f=p.y;f<c;f++)if(Math.random()>0.35)for(let n=p.x;n<g;n++)yield{x:n,y:f};else for(let n=g-1;n>=p.x;n--)yield{x:n,y:f}}break}case"HUMAN_SOFT_DITHER":{let r=new Set;for(let l=0;l<a;l++){let s=Math.floor(Math.random()*3)-1;if((l+s)%2===0)for(let c=0;c<o;c+=2)r.add(`${c},${l}`),yield{x:c,y:l};else for(let c=1;c<o;c+=2)r.add(`${c},${l}`),yield{x:c,y:l}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let p=`${s},${l}`;if(r.has(p))continue;yield{x:s,y:l}}break}case"HUMAN_PATCHY":{let r=new Set,l=o*a;while(r.size<l){let s=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*5);for(let g=p-c;g<=p+c;g++)for(let f=s-c;f<=s+c;f++){if(f<0||f>=o||g<0||g>=a)continue;if(Math.hypot(f-s,g-p)>c+Math.random()*1.2)continue;let u=`${f},${g}`;if(r.has(u))continue;r.add(u),yield{x:f,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let r=new Set,l=(o-1)/2,s=(a-1)/2,p=Math.hypot(l,s);for(let c=0;c<4;c++){let g=Math.random()*Math.PI*2;for(let f=0;f<=p;f+=0.35){let u=Math.PI/2+Math.random()*(Math.PI/1.5),n=Math.max(10,Math.floor(f*8));for(let w=0;w<n;w++){let t=g+u*w/n+Math.sin(f)*0.08,m=Math.round(l+Math.cos(t)*f),b=Math.round(s+Math.sin(t)*f);if(m<0||m>=o||b<0||b>=a)continue;let d=`${m},${b}`;if(r.has(d))continue;r.add(d),yield{x:m,y:b}}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let r=new Set;for(let l=0;l<a;l++){let s=l%2===0?1:-1,p=s>0?0:o-1;for(let c=0;c<o;c++){let g=p+(Math.random()>0.82?s:0),f=l+(Math.random()>0.9?1:0);for(let u of[{x:p,y:l},{x:g,y:l},{x:p,y:f}]){if(u.x<0||u.x>=o||u.y<0||u.y>=a)continue;let n=`${u.x},${u.y}`;if(r.has(n))continue;r.add(n),yield u}p+=s}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let p=`${s},${l}`;if(r.has(p))continue;yield{x:s,y:l}}break}case"HUMAN_JITTER_FILL":{let r=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++)r.push({x:s,y:l});r.sort((l,s)=>{let p=l.y+(Math.random()-0.5)*1.8,c=s.y+(Math.random()-0.5)*1.8;if(p!==c)return p-c;return l.x+(Math.random()-0.5)*2-(s.x+(Math.random()-0.5)*2)}),yield*r;break}case"HUMAN_CORNER_BIAS":{let r=[{x:0,y:0},{x:o-1,y:0},{x:0,y:a-1},{x:o-1,y:a-1}],l=r[Math.floor(Math.random()*r.length)],s=[];for(let p=0;p<a;p++)for(let c=0;c<o;c++){let f=Math.hypot(c-l.x,p-l.y)+Math.random()*3.5;s.push({point:{x:c,y:p},score:f})}s.sort((p,c)=>p.score-c.score);for(let p of s)yield p.point;break}case"HUMAN_LONG_STROKES":{let r=new Set,l=o*a;while(r.size<l){let s=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=Math.random()*Math.PI*2,g=Math.sign(Math.cos(c)),f=Math.sign(Math.sin(c)),u=10+Math.floor(Math.random()*40);for(let n=0;n<u;n++){if(s<0||s>=o||p<0||p>=a)break;let w=`${s},${p}`;if(!r.has(w))r.add(w),yield{x:s,y:p};if(Math.random()>0.78)s+=f,p+=g;else s+=g,p+=f}}break}case"HUMAN_TAP_CLUSTERS":{let r=new Set,l=o*a;while(r.size<l){let s=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=3+Math.floor(Math.random()*10);for(let g=0;g<c;g++){let f=Math.round(s+(Math.random()-0.5)*6),u=Math.round(p+(Math.random()-0.5)*6);if(f<0||f>=o||u<0||u>=a)continue;let n=`${f},${u}`;if(r.has(n))continue;r.add(n),yield{x:f,y:u}}}break}case"HUMAN_MESSY_SPIRAL":{let r=new Set,l=(o-1)/2,s=(a-1)/2,p=Math.hypot(l,s)+2;for(let c=0;r.size<o*a;c++){let g=c/3,f=Math.min(p,g*0.18),u=g*0.29+Math.sin(g*0.13)*0.8,n=Math.round(l+Math.cos(u)*f+Math.sin(g)*0.7),w=Math.round(s+Math.sin(u)*f+Math.cos(g)*0.7);if(n<0||n>=o||w<0||w>=a){if(c>o*a*18)break;continue}let t=`${n},${w}`;if(r.has(t)){if(Math.random()>0.9)continue}else r.add(t),yield{x:n,y:w};if(c>o*a*18)break}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"HUMAN_DRUNK_WALK":{let r=new Set,l=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),p=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(r.size<o*a){let c=`${l},${s}`;if(!r.has(c))r.add(c),yield{x:l,y:s};let g=[];for(let n of p){let w=l+n.x,t=s+n.y;if(w<0||w>=o||t<0||t>=a)continue;g.push({x:w,y:t})}if(!g.length)break;let f=g.filter((n)=>{return!r.has(`${n.x},${n.y}`)});if(f.length&&Math.random()>0.2){let n=f[Math.floor(Math.random()*f.length)];l=n.x,s=n.y;continue}let u=g[Math.floor(Math.random()*g.length)];l=u.x,s=u.y}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"HUMAN_NOISE_CLOUD":{let r=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++){let p=Math.sin((s+1)*0.93+Math.random()*0.8)+Math.cos((l+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,g=Math.hypot(s-o/2,l-a/2)*0.08;r.push({point:{x:s,y:l},score:p+c+g})}r.sort((l,s)=>l.score-s.score);for(let l of r)yield l.point;break}case"HUMAN_PATCH_JUMP":{let r=new Set,l=[];for(let s=0;s<Math.max(6,o*a/18);s++)l.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});while(r.size<o*a){let s=l[Math.floor(Math.random()*l.length)],p=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let g=s.y-c;g<=s.y+c;g++)for(let f=s.x-p;f<=s.x+p;f++){if(f<0||f>=o||g<0||g>=a)continue;if(Math.random()>0.86)continue;let u=`${f},${g}`;if(r.has(u))continue;r.add(u),yield{x:f,y:g}}if(Math.random()>0.72&&l.length<o*a/2)l.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});if(r.size>o*a*0.92)break}for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=`${p},${s}`;if(r.has(c))continue;yield{x:p,y:s}}break}case"HUMAN_HESITANT_LINES":{let r=new Set;for(let l=0;l<a;l++){let s=l%2===0;for(let p=0;p<o;p++){let c=s?p:o-1-p,g=`${c},${l}`;if(!r.has(g))r.add(g),yield{x:c,y:l};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,c+(Math.random()>0.5?1:-1))),u=Math.max(0,Math.min(a-1,l+(Math.random()>0.65?1:0))),n=`${f},${u}`;if(!r.has(n))r.add(n),yield{x:f,y:u}}}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let p=`${s},${l}`;if(r.has(p))continue;yield{x:s,y:l}}break}case"HUMAN_OVERLAP_SWEEPS":{let r=[],l=Math.random()*Math.PI*2;for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=Math.sin((p+s)*0.42+l)*2.2,g=Math.cos((p-s)*0.3+l)*1.4;r.push({point:{x:p,y:s},score:s+c+g+(Math.random()-0.5)*3.4})}r.sort((s,p)=>s.score-p.score);for(let s of r)yield s.point;break}case"HUMAN_WOBBLE_DRIFT":{let r=[],l=o/2,s=a/2;for(let p=0;p<a;p++)for(let c=0;c<o;c++){let g=Math.hypot(c-l,p-s)*0.25,f=Math.sin((c+1)*0.9)*1.8+Math.cos((p+1)*1.1)*1.8+Math.sin((c+p)*0.35)*1.4;r.push({point:{x:c,y:p},score:g+f+(Math.random()-0.5)*2.8})}r.sort((p,c)=>p.score-c.score);for(let p of r)yield p.point;break}case"HUMAN_GAP_RECOVERY":{let r=new Set,l=[];for(let s=0;s<a;s++)for(let p=0;p<o;p++){if(Math.random()>0.87){l.push({x:p,y:s});continue}r.add(`${p},${s}`),yield{x:p,y:s}}l.sort((s,p)=>Math.hypot(s.x-o/2,s.y-a/2)-Math.hypot(p.x-o/2,p.y-a/2));for(let s of l){let p=`${s.x},${s.y}`;if(r.has(p))continue;r.add(p),yield s}break}case"HUMAN_STAIRCASE":{let r=new Set,l=o+a-1;for(let s=0;s<l;s++){let p=Math.max(0,s-o+1),c=Math.min(a-1,s);for(let g=p;g<=c;g++){let f=s-g,u=[{x:f,y:g},{x:f+(Math.random()>0.5?1:-1),y:g},{x:f,y:g+(Math.random()>0.5?1:-1)}];for(let n of u){if(n.x<0||n.x>=o||n.y<0||n.y>=a)continue;let w=`${n.x},${n.y}`;if(r.has(w))continue;r.add(w),yield n}}}for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=`${p},${s}`;if(r.has(c))continue;yield{x:p,y:s}}break}case"HUMAN_EDGE_HUGGER":{let r=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++){let p=Math.min(s,l,o-1-s,a-1-l);r.push({point:{x:s,y:l},score:p*3.5+(Math.random()-0.5)*5.5})}r.sort((l,s)=>l.score-s.score);for(let l of r)yield l.point;break}case"HUMAN_BLOBS":{let r=new Set,l=o*a;while(r.size<l){let s=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*4);for(let g=p-c;g<=p+c;g++)for(let f=s-c;f<=s+c;f++){if(f<0||f>=o||g<0||g>=a)continue;let u=Math.atan2(g-p,f-s),n=c+Math.sin(u*3+Math.random())*0.8;if(Math.hypot(f-s,g-p)>n)continue;let w=`${f},${g}`;if(r.has(w))continue;r.add(w),yield{x:f,y:g}}}break}case"HUMAN_BACKTRACK":{let r=new Set,l=[];for(let s=0;s<a;s++)for(let p=0;p<o;p++)l.push({x:p,y:s});l.sort((s,p)=>s.y-p.y+(Math.random()-0.5)*2.2+(s.x-p.x)*0.04);for(let s=0;s<l.length;s++){let p=l[s],c=`${p.x},${p.y}`;if(r.has(c))continue;if(r.add(c),yield p,s>1&&Math.random()>0.74){let g=l[s-1],f=`${g.x},${g.y}`;if(!r.has(f))r.add(f),yield g}}for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=`${p},${s}`;if(r.has(c))continue;yield{x:p,y:s}}break}case"HUMAN_SHAKY_DIAGONAL":{let r=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++){let p=Math.abs(s-l)*0.6,c=Math.sin(s*1.4+l*0.8)*1.8+Math.cos(l*1.1+s*0.5)*1.5;r.push({point:{x:s,y:l},score:p+c+(Math.random()-0.5)*3.2})}r.sort((l,s)=>l.score-s.score);for(let l of r)yield l.point;break}case"HUMAN_LATE_FIXES":{let r=[],l=[];for(let s=0;s<a;s++)for(let p=0;p<o;p++)if(Math.random()>0.9)l.push({x:p,y:s});else r.push({x:p,y:s});r.sort((s,p)=>s.y-p.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?s.x-p.x:0)),l.sort((s,p)=>Math.hypot(p.x-o/2,p.y-a/2)-Math.hypot(s.x-o/2,s.y-a/2)),yield*r,yield*l;break}case"DIAGONAL_BRUSH":{for(let r=0;r<o+a-1;r++){let l=r%2===0,s=[],p=Math.max(0,r-o+1),c=Math.min(a-1,r);for(let g=p;g<=c;g++){let f=r-g;if(f>=0&&f<o)s.push({x:f,y:g})}if(Math.random()>0.55)s.reverse();if(l)for(let g=s.length-1;g>=0;g--)yield s[g];else yield*s}break}case"BRUSH_STROKES":{let r=Array.from({length:a},()=>Array(o).fill(!1)),l=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],s=(g,f)=>g>=0&&g<o&&f>=0&&f<a,p=0,c=o*a;for(let g=0;g<c*6&&p<c;g++){let f=Math.floor(Math.random()*o),u=Math.floor(Math.random()*a),n=l[Math.floor(Math.random()*l.length)],w=3+Math.floor(Math.random()*16);for(let t=0;t<w;t++){if(!s(f,u))break;if(!r[u][f])r[u][f]=!0,p++,yield{x:f,y:u};if(Math.random()>0.72)n=l[Math.floor(Math.random()*l.length)];f+=n.x,u+=n.y}}for(let g=0;g<a;g++)for(let f=0;f<o;f++)if(!r[g][f])yield{x:f,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let r=new Set,l=o*a,s=Math.floor(o/2),p=Math.floor(a/2),c=[[1,0],[0,1],[-1,0],[0,-1]],g=0,f=1,u=(w,t)=>w>=0&&w<o&&t>=0&&t<a,n=function*(){let w=0;while(w<l){for(let t=0;t<2;t++){for(let m=0;m<f;m++){if(u(s,p)){let b=`${s},${p}`;if(!r.has(b)){if(r.add(b),yield{x:s,y:p},w++,w>=l)return}}s+=c[g][0],p+=c[g][1]}g=(g+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*n();else{let w=[...n()];for(let t=w.length-1;t>=0;t--)yield w[t]}break}case"SCRIBBLE":{let r=new Set,l=o*a,s=Math.floor(o/2),p=Math.floor(a/2);for(let c=0;r.size<l&&c<l*24;c++){let g=`${s},${p}`;if(!r.has(g))r.add(g),yield{x:s,y:p};if(s+=Math.floor(Math.random()*3)-1,p+=Math.floor(Math.random()*3)-1,s<0||s>=o||p<0||p>=a)s=Math.floor(Math.random()*o),p=Math.floor(Math.random()*a)}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;r.add(f),yield{x:g,y:c}}break}case"CROSSHATCH":{let r=[];for(let p=0;p<o+a-1;p++)for(let c=Math.max(0,p-o+1);c<=Math.min(a-1,p);c++){let g=p-c;r.push({x:g,y:c})}let l=[];for(let p=-a+1;p<o;p++)for(let c=0;c<a;c++){let g=c+p;if(g>=0&&g<o)l.push({x:g,y:c})}let s=new Set;for(let p of[...r,...l]){let c=`${p.x},${p.y}`;if(s.has(c))continue;s.add(c),yield p}break}case"WAVE_SWEEP":{let r=new Set;for(let l=0;l<o;l++){let p=(Math.sin(l/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(a-1)|0;for(let c=0;c<a;c++){let g=p+c,f=p-c;for(let u of[g,f]){if(u<0||u>=a)continue;let n=`${l},${u}`;if(r.has(n))continue;r.add(n),yield{x:l,y:u}}}}break}case"SCATTERED_LINES":{let r=new Set,l=o*a;for(let s=0;r.size<l&&s<l*14;s++){let p=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=Math.random()*Math.PI*2,f=Math.round(Math.cos(g)),u=Math.round(Math.sin(g)),n=6+Math.floor(Math.random()*28);for(let w=0;w<n;w++){if(p<0||p>=o||c<0||c>=a)break;let t=`${p},${c}`;if(!r.has(t))r.add(t),yield{x:p,y:c};p+=f,c+=u}}for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=`${p},${s}`;if(r.has(c))continue;r.add(c),yield{x:p,y:s}}break}case"CONTOUR_JITTER":{let r=new Set;for(let l=0;l<Math.ceil(Math.min(o,a)/2);l++){let s=[],p=l,c=l,g=o-l-1,f=a-l-1;for(let u=p;u<=g;u++)s.push({x:u,y:c});for(let u=c+1;u<=f;u++)s.push({x:g,y:u});for(let u=g-1;u>=p;u--)s.push({x:u,y:f});for(let u=f-1;u>c;u--)s.push({x:p,y:u});for(let u=s.length-1;u>0;u--){let n=Math.floor(Math.random()*(u+1)),w=s[u];s[u]=s[n],s[n]=w}for(let u of s){let n=`${u.x},${u.y}`;if(r.has(n))continue;r.add(n),yield u}}break}case"SPIRAL_WOBBLE":{let r=new Set,l=o/2,s=a/2,p=Math.hypot(l,s);for(let c=0;r.size<o*a&&c<o*a*9;c++){let g=c/(o*a*9)*p,f=c*0.31+Math.sin(c*0.07)*0.7,u=Math.round(l+Math.cos(f)*g),n=Math.round(s+Math.sin(f)*g);if(u<0||u>=o||n<0||n>=a)continue;let w=`${u},${n}`;if(r.has(w))continue;r.add(w),yield{x:u,y:n}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"CLUSTER_BURSTS":{let r=new Set,l=o*a;for(let s=0;r.size<l&&s<l*12;s++){let p=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=2+Math.floor(Math.random()*10);for(let f=c-g;f<=c+g;f++)for(let u=p-g;u<=p+g;u++){if(u<0||u>=o||f<0||f>=a)continue;if(Math.hypot(u-p,f-c)>g)continue;let n=`${u},${f}`;if(r.has(n))continue;r.add(n),yield{x:u,y:f}}}for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=`${p},${s}`;if(r.has(c))continue;r.add(c),yield{x:p,y:s}}break}case"ORBITAL":{let r=new Set,l=(o-1)/2,s=(a-1)/2,p=Math.ceil(Math.max(l,s));for(let c=0;c<=p;c++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let f=0;f<g;f++){let u=f/g*Math.PI*2+(c%2?0.3:-0.3),n=Math.round(l+Math.cos(u)*c),w=Math.round(s+Math.sin(u)*c);if(n<0||n>=o||w<0||w>=a)continue;let t=`${n},${w}`;if(r.has(t))continue;r.add(t),yield{x:n,y:w}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"FLOW_FIELD":{let r=new Set,l=o*a;for(let s=0;r.size<l&&s<l*18;s++){let p=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a);for(let g=0;g<120;g++){if(p<0||p>=o||c<0||c>=a)break;let f=`${p},${c}`;if(!r.has(f))r.add(f),yield{x:p,y:c};let u=Math.sin(p*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((p+c)*0.05);p+=Math.round(Math.cos(u)),c+=Math.round(Math.sin(u))}}for(let s=0;s<a;s++)for(let p=0;p<o;p++){let c=`${p},${s}`;if(r.has(c))continue;r.add(c),yield{x:p,y:s}}break}case"EDGE_IN":{let r=new Set,l=Math.ceil(Math.min(o,a)/2);for(let s=0;s<l;s++){let p=s,c=o-1-s,g=s,f=a-1-s;for(let u=p;u<=c;u++)for(let n of[g,f]){let w=`${u},${n}`;if(r.has(w))continue;r.add(w),yield{x:u,y:n}}for(let u=g+1;u<=f-1;u++)for(let n of[p,c]){let w=`${n},${u}`;if(r.has(w))continue;r.add(w),yield{x:n,y:u}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),H(this.bot)}move(o){if(!this.moveInfo)return;let a=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),r=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=a+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-a)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,a+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=r+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-r)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,r+this.moveInfo.height);this.update(),H(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let a=o.target;if(a.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(a.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(a.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(a.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${v}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var ko=`/* stylelint-disable declaration-no-important */
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
  width: min(420px, 92vw);
  padding: 12px;
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
  max-width: 130px;
  font-size: 10px;
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
  font-size: 14px;
  line-height: 1;
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
`;class so extends Error{name="KGlacerMacroError";constructor(o,a){super(o);a.widget.status=o}}class io extends so{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var P={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function k(o,a){let r=a.key.toLowerCase(),l=o.key.toLowerCase(),p=r==="/"&&(l==="/"||l==="?"||o.code==="Slash")||l===r,c=a.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,g=a.ctrl===!0?!0:a.meta===!0?o.metaKey:!o.metaKey;return p&&o.shiftKey===Boolean(a.shift)&&c&&g&&o.altKey===Boolean(a.alt)}function Qo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let a=o.tagName.toLowerCase();return a==="input"||a==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var jo=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Uo="kglacer-macro:overlay-hidden",So="kglacer-macro:auto-farm-config",qo="kglacer-macro:auto-overlay-config",E="kglacer-macro:proxy-config",sa="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class to extends X{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$openConfig;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;challengeWatcherObserver;challengeWatcherRunning=!1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=jo,J(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=sa,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$openConfig.addEventListener("click",()=>{this.openSettingsModal()}),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}startChallengeWatcher(){let o=()=>{if(!this.isChallengeBlockingPaint())return;if(this.challengeWatcherRunning)return;this.challengeWatcherRunning=!0,this.status=`⌛ ${i("taskWaitingChallengeResolve")}`,this.waitForChallengeToResolve().finally(()=>{this.challengeWatcherRunning=!1})};this.challengeWatcherObserver=new MutationObserver(()=>{o()}),this.challengeWatcherObserver.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["open","style","class","value","aria-hidden"]});let a=window.setInterval(o,750);this.runOnDestroy.push(()=>{this.challengeWatcherObserver?.disconnect(),clearInterval(a)}),o()}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(i("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${v}`,o.click(),await G(o,["change"],["cancel","error"]);let a=o.files?.[0];if(!a)throw new io(this.bot);console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let r;if(a.name.endsWith(`.${v}`))r=await K.fromJSON(this.bot,JSON.parse(await a.text()));else{let l=new FileReader;l.readAsDataURL(a),await G(l,["load"],["error"]);let s=await this.compressImageBeforeLoad(l.result),p=new Image;p.src=s,await G(p,["load"],["error"]),await this.waitForStableViewportProjection(),r=new K(this.bot,D.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new L(this.bot,p))}this.bot.images.push(r),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),r.updateTasks(),H(this.bot,!0),this.bot.updateTasks(),this.update()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(i("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:a,minGlobalY:r,maxGlobalX:l,maxGlobalY:s}=o,p=document.createElement("canvas");p.width=Math.max(1,l-a+1),p.height=Math.max(1,s-r+1);let c=p.getContext("2d");if(!c)throw new Error("Capture context unavailable");c.imageSmoothingEnabled=!1;let g=Math.floor(a/h),f=Math.floor(r/h),u=Math.floor(l/h),n=Math.floor(s/h),w=(u-g+1)*(n-f+1),t=0;for(let b=g;b<=u;b++)for(let d=f;d<=n;d++){this.status=`⌛ ${i("taskReadingTiles")} [${++t}/${w}]`;let z=await this.loadTileImage(b,d),A=b*h,M=d*h,N=Math.max(a,A),F=Math.min(l,A+h-1),j=Math.max(r,M),W=Math.min(s,M+h-1),O=N-A,$=j-M,Y=F-N+1,U=W-j+1,x=N-a,y=j-r;c.drawImage(z,O,$,Y,U,x,y,Y,U)}let m=Date.now();await this.downloadCapture(p,"png",m)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,a,r){let l=a==="webp"?"image/webp":"image/png",s=await new Promise((g,f)=>{o.toBlob((u)=>{if(!u){f(new Error(`Failed to create ${a.toUpperCase()} capture file`));return}g(u)},l)}),p=URL.createObjectURL(s),c=document.createElement("a");c.href=p,c.download=`wplace-capture-${r}.${a}`,c.click(),URL.revokeObjectURL(p)}async loadTileImage(o,a){let r;for(let l=1;l<=3;l++)try{let s=new Image;return s.crossOrigin="anonymous",s.referrerPolicy="no-referrer",s.src=`https://backend.wplace.live/files/s0/tiles/${o}/${a}.png?ts=${Date.now()}-${l}`,await G(s,["load"],["error"]),s}catch(s){if(r=s,l<3)await new Promise((p)=>setTimeout(p,l*200))}throw r instanceof Error?r:new Error(`Tile fetch failed (${o}/${a})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,a)=>{let r=document.createElement("div");r.className="kgm-capture-overlay",r.innerHTML=`<div class="kgm-capture-hint">${i("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let l=r.querySelector(".kgm-capture-box");document.body.append(r);let s,p,c=()=>{window.removeEventListener("keydown",w,!0),r.removeEventListener("pointermove",u),r.removeEventListener("pointerdown",n),r.remove()},g=(t)=>{let m=Math.min(s.x,t.x),b=Math.min(s.y,t.y),d=Math.abs(s.x-t.x)+1,z=Math.abs(s.y-t.y)+1;return{left:m,top:b,width:d,height:z}},f=(t)=>{let{left:m,top:b,width:d,height:z}=g(t);l.style.left=`${m}px`,l.style.top=`${b}px`,l.style.width=`${d}px`,l.style.height=`${z}px`},u=(t)=>{if(!s)return;f({x:t.clientX,y:t.clientY})},n=(t)=>{if(t.preventDefault(),!s){s={x:t.clientX,y:t.clientY};let N=D.fromScreenPosition(this.bot,s);p={x:N.globalX,y:N.globalY},f(s);return}let m={x:t.clientX,y:t.clientY},b=D.fromScreenPosition(this.bot,m);if(c(),!p){a(new Error("Capture anchor point unavailable"));return}let d=Math.min(p.x,b.globalX),z=Math.min(p.y,b.globalY),A=Math.max(p.x,b.globalX),M=Math.max(p.y,b.globalY);if(A-d<1||M-z<1){a(new Error("Capture area too small"));return}o({minGlobalX:d,minGlobalY:z,maxGlobalX:A,maxGlobalY:M})},w=(t)=>{if(t.key!=="Escape")return;c(),a(new Error("Capture cancelled"))};window.addEventListener("keydown",w,!0),r.addEventListener("pointermove",u),r.addEventListener("pointerdown",n)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let a=new Image;if(a.src=o,await G(a,["load"],["error"]),!(a.naturalWidth*a.naturalHeight>3000000||o.length>3000000))return o;let l=document.createElement("canvas");l.width=a.naturalWidth,l.height=a.naturalHeight;let s=l.getContext("2d");if(!s)return o;return s.drawImage(a,0,0),l.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),a=0,r;for(let l=0;l<45;l++){await new Promise((u)=>requestAnimationFrame(()=>{u()}));let{anchorScreenPosition:{x:s,y:p},pixelSize:c}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(c)||c<=0){a=0;continue}let g={anchorX:s,anchorY:p,pixelSize:c};if(!r){r=g,a=1;continue}if(Math.abs(g.anchorX-r.anchorX)+Math.abs(g.anchorY-r.anchorY)+Math.abs(g.pixelSize-r.pixelSize)<0.0012)a++;else a=0;if(r=g,a>=3)return}}update(){this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.$images.innerHTML="";let o=document.createDocumentFragment();for(let a=0;a<this.bot.images.length;a++){let r=this.bot.images[a],l=document.createElement("div");o.append(l),l.className="image",l.innerHTML=`<button class="preview" title="View preview">
  <img src="${r.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${a===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${a===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,l.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=a,r.openPreviewPanel()}),l.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=a,r.openColorPanel()}),l.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=a,r.openPreviewPanel()}),l.querySelector(".download").addEventListener("click",()=>{r.exportImage()}),l.querySelector(".delete").addEventListener("click",()=>{r.destroy()}),l.querySelector(".up").addEventListener("click",()=>{co(this.bot.images,a,a-1),this.update(),H(this.bot)}),l.querySelector(".down").addEventListener("click",()=>{co(this.bot.images,a,a+1),this.update(),H(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,a=0;for(let s=0;s<this.bot.images.length;s++){let p=this.bot.images[s];o+=p.pixels.pixels.length*p.pixels.pixels[0].length,a+=p.tasks.length}let r=Math.max(0,o-a),l=o>0?r/o*100|0:0;this.$progressText.textContent=`${r}/${o} ${l}% ETA: ${a/120|0}h`,this.$progressLine.style.transform=`scaleX(${l/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Uo)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let a=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",a),localStorage.setItem(Uo,String(a)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden")?i("disabled"):i("enabled");this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${i("toggleOverlay")} (${o})</span>`}applyLocaleToUI(o){lo(o),J(this.element);for(let a=0;a<this.bot.images.length;a++)this.bot.images[a].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${i("close")}"><span class="icon">×</span></button>
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
  <details class="shortcuts" open>
    <summary class="shortcuts-summary">
      <strong class="shortcuts-summary-title"><i class="fa-solid fa-network-wired"></i> <span data-i18n="proxyTitle">Proxy (Beta)</span></strong>
      <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
    </summary>
    <label class="autofarm-label"><span>Host</span><input class="proxy-host" type="text" placeholder="127.0.0.1" /></label>
    <label class="autofarm-label"><span>Port</span><input class="proxy-port" type="number" min="1" max="65535" placeholder="8080" /></label>
    <label class="autofarm-label"><span>User</span><input class="proxy-user" type="text" placeholder="optional" /></label>
    <label class="autofarm-label"><span>Pass</span><input class="proxy-pass" type="password" placeholder="optional" /></label>
    <label><input class="proxy-enabled" type="checkbox" /> <span data-i18n="proxyEnabled">Enable proxy for web requests (beta)</span></label>
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
</form>`,document.body.append(o),J(o);let a=o.querySelector(".settings-locale");a.value=_(),a.addEventListener("change",()=>{this.applyLocaleToUI(a.value),J(o)});let r=JSON.parse(localStorage.getItem(E)??"{}"),l=o.querySelector(".proxy-enabled"),s=o.querySelector(".proxy-host"),p=o.querySelector(".proxy-port"),c=o.querySelector(".proxy-user"),g=o.querySelector(".proxy-pass");l.checked=Boolean(r.enabled),s.value=r.host??"",p.value=r.port??"",c.value=r.username??"",g.value=r.password??"";let f=()=>{localStorage.setItem(E,JSON.stringify({enabled:l.checked,host:s.value.trim(),port:p.value.trim(),username:c.value.trim(),password:g.value}))};for(let u of[l,s,p,c,g])u.addEventListener("change",f);o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=i("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${i("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:i("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=i("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${i("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:i("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let a=Math.max(0,o-Date.now()),r=Math.ceil(a/1000),l=Math.floor(r/60),s=r%60;return`next in ${String(l).padStart(2,"0")}:${String(s).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText()}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${i("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${i("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText();return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{if(!await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels,0)){this.status=`⚠️ ${i("autoFarmStopped")}: ${i("autoFarmTransparentUnavailable")}`,this.stopAutoFarm();return}await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;try{if(!await this.bot.drawOverlayPixelsBatch(this.autoOverlayConfig.pixels)){this.status=`⚠️ ${i("autoOverlayStopped")}: ${i("autoOverlayNoTasks")}`,this.stopAutoOverlay();return}await this.waitAndClickPaintButton()}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(So,JSON.stringify(o))}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(qo,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(So);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,l=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",s=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:l==="hours"?a.value*3600000:l==="minutes"?a.value*60000:a.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,unit:l,timerMs:s}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=localStorage.getItem(qo);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,l=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",s=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:l==="hours"?a.value*3600000:l==="minutes"?a.value*60000:a.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,unit:l,timerMs:s}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoFarmConfig?.unit??"minutes",r=this.autoFarmConfig?.value??1,l=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${i("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${l}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),J(o);let s=o.querySelector(".autofarm-unit");s.value=a;let p=o.querySelector(".autofarm-value"),c=o.querySelector(".autofarm-pixels"),g=()=>{let d=Math.max(1,Number.parseInt(p.value||"1",10));if(s.value==="hours")return d*3600000;if(s.value==="minutes")return d*60000;return d*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(p.value||"1",10)),pixels:Math.max(1,Number.parseInt(c.value||"60",10)),unit:s.value,timerMs:g()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()};let f=JSON.parse(localStorage.getItem(E)??"{}"),u=o.querySelector(".proxy-enabled"),n=o.querySelector(".proxy-host"),w=o.querySelector(".proxy-port"),t=o.querySelector(".proxy-user"),m=o.querySelector(".proxy-pass");u.checked=Boolean(f.enabled),n.value=f.host??"",w.value=f.port??"",t.value=f.username??"",m.value=f.password??"";let b=()=>{localStorage.setItem(E,JSON.stringify({enabled:u.checked,host:n.value.trim(),port:w.value.trim(),username:t.value.trim(),password:m.value}))};for(let d of[u,n,w,t,m])d.addEventListener("change",b);o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoOverlayConfig?.unit??"minutes",r=this.autoOverlayConfig?.value??1,l=this.autoOverlayConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${i("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${l}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),J(o);let s=o.querySelector(".autofarm-unit");s.value=a;let p=o.querySelector(".autofarm-value"),c=o.querySelector(".autofarm-pixels"),g=()=>{let d=Math.max(1,Number.parseInt(p.value||"1",10));if(s.value==="hours")return d*3600000;if(s.value==="minutes")return d*60000;return d*1000};o.querySelector(".autooverlay-start").onclick=()=>{this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(p.value||"1",10)),pixels:Math.max(1,Number.parseInt(c.value||"60",10)),unit:s.value,timerMs:g()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()};let f=JSON.parse(localStorage.getItem(E)??"{}"),u=o.querySelector(".proxy-enabled"),n=o.querySelector(".proxy-host"),w=o.querySelector(".proxy-port"),t=o.querySelector(".proxy-user"),m=o.querySelector(".proxy-pass");u.checked=Boolean(f.enabled),n.value=f.host??"",w.value=f.port??"",t.value=f.username??"",m.value=f.password??"";let b=()=>{localStorage.setItem(E,JSON.stringify({enabled:u.checked,host:n.value.trim(),port:w.value.trim(),username:t.value.trim(),password:m.value}))};for(let d of[u,n,w,t,m])d.addEventListener("change",b);o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,a){this.element.querySelector("."+o).disabled=a}async run(o,a,r,l="..."){console.log("[KGM][Widget] Task started",{status:o});let s=this.status;this.status=`${l} ${o}`;try{let p=await a();return this.status=s,console.log("[KGM][Widget] Task completed",{status:o}),p}catch(p){if(!(p instanceof so))console.error(p),this.status=`${i("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:p}),p}finally{await r?.()}}handleKeyboard(o){if(Qo(o.target))return;if(k(o,P.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(k(o,P.showShortcuts)){o.preventDefault(),this.open=!0,this.openSettingsModal();return}if(k(o,P.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(k(o,P.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(k(o,P.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(k(o,P.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(k(o,P.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(k(o,P.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(k(o,P.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(k(o,P.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(k(o,P.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(k(o,P.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),H(this.bot)}async waitAndClickPaintButton(){await this.run(i("taskWaitingPaintButton"),async()=>{for(;;){if(this.isChallengeBlockingPaint()){await this.waitForChallengeToResolve(),await new Promise((a)=>setTimeout(a,250));continue}let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(o);return}await new Promise((a)=>setTimeout(a,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((r)=>Array.from(document.querySelectorAll(r))).find((r)=>/pintar|paint/i.test(r.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}async triggerNativePaintClickWithChallengeRecovery(o){for(let r=0;r<3;r++){let l=r===0?o:this.findNativePaintButton();if(!l)return;if(l.disabled||l.ariaDisabled==="true")return;this.triggerNativePaintClick(l);let s=await this.waitForPaintAttemptOutcome(6000);if(s==="painted")return;if(s==="challenge"){await this.waitForChallengeToResolve(),await new Promise((p)=>setTimeout(p,350));continue}await new Promise((p)=>setTimeout(p,350))}console.log("[KGM][Widget] Paint click finished without a clear success signal after retries")}async waitForPaintAttemptOutcome(o){let a=Date.now();while(Date.now()-a<=o){if(this.isChallengeBlockingPaint())return"challenge";let r=this.findNativePaintButton();if(r&&(r.disabled||r.ariaDisabled==="true"))return await this.waitForDelayedChallenge(1200)?"challenge":"painted";await new Promise((l)=>setTimeout(l,200))}return"unknown"}async waitForDelayedChallenge(o){let a=Date.now();while(Date.now()-a<=o){if(this.isChallengeBlockingPaint())return!0;await new Promise((r)=>setTimeout(r,150))}return!1}async waitForChallengeToResolve(){await this.run(i("taskWaitingChallengeResolve"),async()=>{let o=Date.now(),a=90000;while(this.isChallengeBlockingPaint()&&Date.now()-o<=90000)await new Promise((r)=>setTimeout(r,500))})}isChallengeBlockingPaint(){let r=Array.from(document.querySelectorAll('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')).filter((p)=>{if(p.closest("dialog")?.matches("dialog:not([open])"))return!1;let c=globalThis.getComputedStyle(p);if(c.display==="none"||c.visibility==="hidden")return!1;let g=p.getBoundingClientRect();return g.width>0&&g.height>0});if(!r.length)return!1;let l=document.querySelector("dialog.modal[open], dialog[open]");if(l?.querySelector('h-captcha, .h-captcha, iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], [data-hcaptcha-widget-id]')){if(!Array.from(l.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]')).some((c)=>c.value.trim().length>0))return!0}return r.some((p)=>{let c=p.closest("h-captcha")??p.parentElement??document.documentElement,g=Array.from(c.querySelectorAll('textarea[name="h-captcha-response"], textarea[name^="h-captcha-response-"]'));if(!g.length)return!0;return g.every((f)=>f.value.trim().length===0)})}}var pa=2,Ko="[KGM]",Go="kglacer-macro:access-ok",mo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Lo="kgm-access-locked";class Wo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,a){if(a===void 0)console.log(`${Ko} ${o}`);else console.log(`${Ko} ${o}`,a)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Lo);let o=Po();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let r=0;r<o.images.length;r++){let l=o.images[r];I({x:l.position[0]-1000,y:l.position[1]-1000}),I({x:l.position[0]+1000,y:l.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let a=document.createElement("style");a.textContent=ko.replace("FAKE_FAVORITE_LOCATIONS",C.length.toString()),document.head.append(a),this.log("Styles injected",{fakeFavoriteLocations:C.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Lo),this._widget=new to(this),await this.widget.run(i("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let r=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((l)=>{for(let s=0;s<l.length;s++)if(l[s].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(r,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await Q(500),await this.updateColors(),o)for(let l=0;l<o.images.length;l++){let s=await K.fromJSON(this,o.images[l]);this.images.push(s),s.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Go)===mo)return;await new Promise((o)=>{let a=document.createElement("dialog");a.className="kgm-modal access-dialog",a.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(a),J(a);let r=a.querySelector(".access-input"),l=a.querySelector(".access-error"),s=a.querySelector(".access-locale");s.innerHTML=Ho().map((p)=>`<option value="${p}" ${p===_()?"selected":""}>${p.toUpperCase()}</option>`).join(""),s.addEventListener("change",()=>{lo(s.value),J(a)}),a.addEventListener("cancel",(p)=>{p.preventDefault()}),a.querySelector("form").addEventListener("submit",(p)=>{p.preventDefault();let c=atob(mo);if(r.value.trim()!==c){l.textContent=i("invalidAccessKey");return}localStorage.setItem(Go,mo),a.close(),a.remove(),o()}),a.showModal(),r.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),a=(r)=>{if(!r.shiftKey)r.stopPropagation()};return this.widget.run(i("taskDrawing"),async()=>{await this.widget.run(i("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",a,!0),o.addEventListener("wheel",a,!0),this.updateTasks();let r=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((p)=>p.json()),l=Math.floor(r.charges.count);this.log("Charges fetched",{charges:l});let s=0;for(let p=0;p<this.images.length;p++)s+=this.images[p].tasks.length;switch(this.log("Tasks prepared",{tasks:s}),this.strategy){case"ALL":{while(l>0){let p=!0;for(let c=0;c<this.images.length;c++){let g=this.images[c].tasks.shift();if(!g)continue;this.drawTask(g),l--,await Q(1),p=!1}if(p)break}break}case"PERCENTAGE":{for(let p=0;p<s&&l>0;p++){let c=1,g;for(let f=0;f<this.images.length;f++){let u=this.images[f],n=1-u.tasks.length/(u.pixels.pixels.length*u.pixels.pixels[0].length);if(n<c)c=n,g=u}this.drawTask(g.tasks.shift()),l--,await Q(1)}break}case"SEQUENTIAL":for(let p=0;p<this.images.length;p++){let c=this.images[p];for(let g=c.tasks.shift();g&&l>0;g=c.tasks.shift())this.drawTask(g),l--,await Q(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:l})},()=>{globalThis.removeEventListener("mousemove",a,!0),o.removeEventListener("wheel",a,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:pa,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let a=document.querySelector(".maplibregl-canvas"),r=window.innerWidth/2,l=window.innerHeight/2,s=r-o.x,p=l-o.y;function c(g,f,u){a.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:f,clientY:u,buttons:1}))}c("mousedown",r,l),c("mousemove",s,p),c("mouseup",s,p)}readMap(){this.mapsCache.clear();let o=new Set;for(let r=0;r<this.images.length;r++){let l=this.images[r],{tileX:s,tileY:p}=new D(this,l.position.globalX+l.pixels.pixels[0].length,l.position.globalY+l.pixels.pixels.length);for(let c=l.position.tileX;c<=s;c++)for(let g=l.position.tileY;g<=p;g++)o.add(`${c}/${g}`)}let a=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${i("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(r)=>{this.mapsCache.set(r,await L.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${r}.png`,exactColor:!0})),this.widget.status=`⌛ ${i("taskReadingMap")} [${++a}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let a=0,r=1,l=1/0,s=1/0;for(let g=0;g<this.$stars.length;g++){let{x:f,y:u}=e(this.$stars[g]);if(f<o.x&&u<o.y){let n=o.x-f+(o.y-u);if(n<l)l=n,a=g}else if(f>o.x&&u>o.y){let n=f-o.x+(u-o.y);if(n<s)s=n,r=g}}let p=e(this.$stars[a]),c=q[a];return{anchorScreenPosition:p,anchorWorldPosition:c,pixelSize:(e(this.$stars[r]).x-p.x)/(q[r].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await Q(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await Q(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await Q(1)}drawTask(o){if(this.lastColor!==o.color){let l=document.getElementById("color-"+o.color);if(!l){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}l.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let a=o.position.pixelSize/2,r=o.position.toScreenPosition();if(!Number.isFinite(r.x)||!Number.isFinite(r.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:r.x+a,clientY:r.y+a,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((t)=>!t.disabled&&t.getAttribute("aria-disabled")!=="true"&&t.offsetParent!==null);if(!o.length)return;let a=o[Math.floor(Math.random()*o.length)],r=Number.parseInt(a.id.slice(6),10);if(!Number.isFinite(r))return;let l=document.querySelector(".maplibregl-canvas");if(!l)return;let s=l.getBoundingClientRect(),p=24,c=s.left+p,g=s.right-p,f=s.top+p,u=s.bottom-p;if(g<=c||u<=f)return;let n=c+Math.random()*(g-c),w=f+Math.random()*(u-f);this.drawTask({color:r,position:D.fromScreenPosition(this,{x:n,y:w})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o,a){let r=Math.max(1,Math.floor(o)),l=0;return await this.widget.run(i("taskDrawingRandomPixels"),async()=>{await this.widget.run(i("taskInitializingDraw"),()=>this.updateColors());let s=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((m)=>!m.disabled&&m.getAttribute("aria-disabled")!=="true"&&m.offsetParent!==null),p=document.querySelector(".maplibregl-canvas");if(!s.length||!p)return;let c=a===void 0?void 0:s.find((m)=>Number.parseInt(m.id.slice(6),10)===a);if(a!==void 0&&!c)return;let g=p.getBoundingClientRect(),f=24,u=g.left+f,n=g.right-f,w=g.top+f,t=g.bottom-f;if(n<=u||t<=w)return;for(let m=0;m<r;m++){let b=c??s[Math.floor(Math.random()*s.length)],d=Number.parseInt(b.id.slice(6),10);if(!Number.isFinite(d))continue;let z=u+Math.random()*(n-u),A=w+Math.random()*(t-w);this.drawTask({color:d,position:D.fromScreenPosition(this,{x:z,y:A})}),l++,await Q(1)}}),l}async drawOverlayPixelsBatch(o){let a=Math.max(1,Math.floor(o)),r=0;return await this.widget.run(i("taskDrawingOverlayPixels"),async()=>{await this.widget.run(i("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let l=0;l<a;l++){let s=this.takeNextTaskFromStrategy();if(!s)break;this.drawTask(s),r++,await Q(1)}this.widget.update()}),r}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let a=this.images[o].tasks.shift();if(a)return a}return}case"PERCENTAGE":{let o,a=Number.POSITIVE_INFINITY;for(let r=0;r<this.images.length;r++){let l=this.images[r];if(!l.tasks.length)continue;let s=l.pixels.pixels.length*l.pixels.pixels[0].length,p=1-l.tasks.length/s;if(p<a)a=p,o=l}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=globalThis.fetch,a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(r,l)=>{let s=await o(r,l),p=s.clone(),c="";if(typeof r=="string")c=r;else if(r instanceof Request)c=r.url;else if(r instanceof URL)c=r.href;if(s.url==="https://backend.wplace.live/me")this.me=await p.json(),this.me.favoriteLocations.unshift(...C),this.me.maxFavoriteLocations=1/0,s.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let g=a.exec(c);if(g){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new D(this,+g[1],+g[2],+g[3],+g[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return s}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await Q(1)}waitForElement(o,a){return this.log("Waiting for element",{name:o,selector:a}),this.widget.run(`${i("taskWaitingFor")} ${o}`,()=>{return new Promise((r)=>{let l=document.querySelector(a);if(l){r(l);return}let s=new MutationObserver(()=>{let p=document.querySelector(a);if(p)s.disconnect(),r(p)});s.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,C.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}if(location.hostname.includes("hcaptcha.com"))Ao();else globalThis.kglacerMacro=new Wo,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;
