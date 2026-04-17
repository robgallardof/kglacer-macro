// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      3.0.9
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
function so(o,a,r){let p=o[r];return o[r]=o[a],o[a]=p,o}function co(o,a){let r=o.indexOf(a);if(r!==-1)o.splice(r,1);return r}var ba=Math.floor(Math.random()*65536),za=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function k(o){return new Promise((a)=>setTimeout(a,o))}function K(o,a,r=["error"],p="addEventListener"){return new Promise((l,s)=>{for(let c=0;c<a.length;c++)o[p]?.(a[c],l);for(let c=0;c<r.length;c++)o[p]?.(r[c],s)})}class Eo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,a=15000){this.size=o,this.historyTime=a}push(o){if(o<0)throw new Error("Negative chunk size");let{time:a,historyTime:r}=this.getTime();if(this.history.push({time:a,chunk:o}),this.history[0]&&this.history[0].time+r<a)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((a,r)=>a+r.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),a=o-this.startTime,r=Math.min(a,this.historyTime);return{time:o,historyTime:r}}}function go(o,a){if(a===void 0)console.log(`[KGM][Challenge] ${o}`);else console.log(`[KGM][Challenge] ${o}`,a)}function W(o){return new Promise((a)=>setTimeout(a,o))}function oo(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim()}function Vo(o){return[...o.matchAll(/-?\d+/g)].map((a)=>Number.parseInt(a[0],10))}function To(o){let a=oo(o).replace(/,/g,"."),r=/(-?\d+(?:\.\d+)?)\s*([+\-*/x×])\s*(-?\d+(?:\.\d+)?)/.exec(a);if(!r)return;let p=Number.parseFloat(r[1]),l=r[2],s=Number.parseFloat(r[3]);if(!Number.isFinite(p)||!Number.isFinite(s))return;if(l==="+")return String(p+s);if(l==="-")return String(p-s);if(l==="/"&&s!==0)return String(p/s);if((l==="x"||l==="×"||l==="*")&&s!==0)return String(p*s)}function Bo(o){let a=oo(o),r=Vo(a);if(/es .* par|is .* even|numero par|número par/.test(a)&&r.length>0)return r[0]%2===0?"sí":"no";if(/es .* impar|is .* odd|numero impar|número impar/.test(a)&&r.length>0)return r[0]%2!==0?"sí":"no";let p=/(-?\d+)\s*(>|<|>=|<=|=|==)\s*(-?\d+)/.exec(a);if(p){let l=Number.parseInt(p[1],10),s=Number.parseInt(p[3],10),c=p[2];return(c===">"?l>s:c==="<"?l<s:c===">="?l>=s:c==="<="?l<=s:l===s)?"sí":"no"}if(/verdadero|true/.test(a))return"sí";if(/falso|false/.test(a))return"no"}function Oo(o,a){let r=`${o} ${a}`.trim(),p=oo(r),l=To(r);if(l!==void 0)return l;let s=Bo(r);if(s)return s;if(/responde (si|sí) o no|answer yes or no/.test(p))return Math.random()<0.5?"sí":"no";return"sí"}async function _o(o,a){o.focus(),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0}));for(let r=0;r<a.length;r++)o.value+=a[r],o.dispatchEvent(new Event("input",{bubbles:!0})),await W(35+Math.floor(Math.random()*55));o.dispatchEvent(new Event("change",{bubbles:!0}))}function fo(o){if(!o)return;o.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0})),o.click()}async function Yo(){fo(document.querySelector("#menu-info")),await W(150),fo(document.querySelector("#text_challenge"))}function Xo(){let o=document.querySelector('[aria-live="polite"]'),a=document.querySelector("div.error-text"),r=/intentalo de nuevo|try again|incorrect/i.test(oo(a?.textContent??""));return Boolean(o&&!r)}async function vo(){await W(1000),await Yo();for(;;){if(Xo()){go("Challenge solved");return}let o=document.querySelector("h2.prompt-text#prompt")?.innerText??"",a=document.querySelector("div.text-text#prompt-text")?.innerText??"",r=document.querySelector('input[type="text"]'),p=document.querySelector(".button-submit");if(!o||!a||!r||!p){await W(300);continue}let l=Oo(o,a);go("Answering text challenge",{prompt:o,promptDetails:a,answer:l}),await _o(r,l),await W(180),fo(p),await W(2200)}}function zo(){if(!location.hostname.includes("hcaptcha.com"))return;go("Solver booted"),vo().catch((o)=>{console.error("[KGM][Challenge] Solver crashed",o)})}var Ao=["kglacermacro:locale"],ao={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskWaitingChallengeResolve:"Challenge detected. Auto-solver running before continuing…",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskWaitingChallengeResolve:"Se detectó un challenge. Ejecutando auto-solver antes de continuar…",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área"}};function Io(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in ao)return o;for(let a=0;a<Ao.length;a++){let r=localStorage.getItem(Ao[a]);if(!r||!(r in ao))continue;return localStorage.setItem("kglacer-macro:locale",r),r}return Io()}function ro(o){localStorage.setItem("kglacer-macro:locale",o)}function eo(){return Object.keys(ao)}function w(o){let a=_();return ao[a][o]}function F(o){for(let a of o.querySelectorAll("[data-i18n]"))a.textContent=w(a.dataset.i18n);for(let a of o.querySelectorAll("[data-i18n-title]"))a.setAttribute("title",w(a.dataset.i18nTitle));for(let a of o.querySelectorAll("[data-i18n-aria-label]"))a.setAttribute("aria-label",w(a.dataset.i18nAriaLabel));for(let a of o.querySelectorAll("[data-i18n-placeholder]"))a.setAttribute("placeholder",w(a.dataset.i18nPlaceholder))}class Y{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,a){for(let r in a)this[r]=o.querySelector(a[r])}registerEvent(o,a,r,p={}){p.passive??=!0,o.addEventListener(a,r,p),this.runOnDestroy.push(()=>{o.removeEventListener(a,r)})}}function no(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function Ho(o,a,r){let p=no(o/255),l=no(a/255),s=no(r/255),c=Math.cbrt(0.4122214708*p+0.5363325363*l+0.0514459929*s),g=Math.cbrt(0.2119034982*p+0.6806995451*l+0.1073969566*s),f=Math.cbrt(0.0883024619*p+0.2817188376*l+0.6299787005*s),n=0.2104542553*c+0.793617785*g-0.0040720468*f,u=1.9779984951*c-2.428592205*g+0.4505937099*f,i=0.0259040371*c+0.7827717662*g-0.808675766*f;return[n,u,i]}function Mo(o,a,r){let[p,l,s]=o,[c,g,f]=a,n=(po)=>po*180/Math.PI,u=(po)=>po*Math.PI/180,i=1,t=1,d=1,m=Math.sqrt(l**2+s**2),b=Math.sqrt(g**2+f**2),z=(m+b)/2,e=0.5*(1-Math.sqrt(z**7/(z**7+6103515625))),A=l*(1+e),M=g*(1+e),N=Math.sqrt(A**2+s**2),U=Math.sqrt(M**2+f**2),C=s===0&&A===0?0:n(Math.atan2(s,A))%360,B=f===0&&M===0?0:n(Math.atan2(f,M))%360,I=c-p,O=U-N,S=0;if(N*U!==0){if(S=B-C,S>180)S-=360;else if(S<-180)S+=360}let $=2*Math.sqrt(N*U)*Math.sin(u(S)/2),x=(p+c)/2,y=(N+U)/2,Z=(C+B)/2;if(Math.abs(C-B)>180)Z+=180;let Co=1-0.17*Math.cos(u(Z-30))+0.24*Math.cos(u(2*Z))+0.32*Math.cos(u(3*Z+6))-0.2*Math.cos(u(4*Z-63)),Lo=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),mo=1+0.045*y,bo=1+0.015*y*Co,Ro=30*Math.exp((-((Z-275)/25))**2),Zo=-(2*Math.sqrt(y**7/(y**7+6103515625)))*Math.sin(u(2*Ro));return Math.sqrt((I/(1*Lo))**2+(O/(1*mo))**2+($/(1*bo))**2+Zo*(O/(1*mo))*($/(1*bo)))-I*r}var L=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],G=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function uo(o){if(o===0)return"transparent";let a=L[o],r=`oklab(${a[0]*100}% ${a[1]} ${a[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",r))return r;let[p=0,l=0,s=0]=(G[o]??"0,0,0").split(",").map((c)=>Number.parseInt(c,10));return`rgb(${p} ${l} ${s})`}var Po=`<div class="wtopbar">
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
`;class q{bot;image;width;exactColor;static async fromJSON(o,a){let r=new Image;return r.src=a.url.startsWith("http")?await fetch(a.url,{cache:"no-store"}).then((p)=>p.blob()).then((p)=>URL.createObjectURL(p)):a.url,await K(r,["load"],["error"]),new q(o,r,a.width,a.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,a,r=a.naturalWidth,p=!1){this.bot=o;this.image=a;this.width=r;this.exactColor=p;if(p)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let r=1;r<64;r++)if(this.exactColor||!this.bot.unavailableColors.has(r))o.set(G[r],[r,r]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let a=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let r=0;r<this.canvas.height;r++)for(let p=0;p<this.canvas.width;p++){let l=(r*this.canvas.width+p)*4,s=a[l],c=a[l+1],g=a[l+2],f=a[l+3],n=s,u=c,i=g,t=`${n},${u},${i}`;if(this.exactColor){this.pixels[r][p]=f<100?0:G.indexOf(t);continue}let d,m;if(f<100)d=m=0;else if(o.has(t))[d,m]=o.get(t);else{let z=1/0,e=1/0;for(let A=0;A<L.length;A++){let M=L[A],N=Mo(Ho(n,u,i),M,0);if(!this.bot.unavailableColors.has(A)&&N<z)z=N,d=A;if(N<e)e=N,m=A}o.set(t,[d,m])}if(d!==0)this.context.fillStyle=`oklab(${L[d][0]*100}% ${L[d][1]} ${L[d][2]})`,this.context.fillRect(p,r,1,1);this.pixels[r][p]=d;let b=this.colors.get(m);if(b)b.amount++;else this.colors.set(m,{color:d,amount:1,realColor:m})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var E="kglacer-macro-settings",ho=["kglacermacro","wbot"],X="kgm";function xo(){let o=[E,...ho];for(let a=0;a<o.length;a++){let r=o[a],p=localStorage.getItem(r);if(!p)continue;return{json:p,key:r}}return}function Fo(){let o=xo();if(!o)return;let a;try{if(a=JSON.parse(o.json),typeof a!=="object")throw new Error("NOT VALID SAVE");if(a.version===1){let r=a;a.images=r.widget.images,a.strategy=r.widget.strategy,delete r.widget}if(o.key!==E)localStorage.setItem(E,o.json)}catch{localStorage.removeItem(o.key),a=void 0}return a}var No;function P(o,a=!1){if(clearTimeout(No),a)localStorage.setItem(E,JSON.stringify(o));else No=setTimeout(()=>{localStorage.setItem(E,JSON.stringify(o))},600)}var H=1000,yo=2048,V=H*yo,Q=[],T=[],oa=Date.now();function v(o){Q.push(o),T.push({id:oa++,latitude:(2*Math.atan(Math.exp(-(o.y/V*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/V*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}v({x:V/3|0,y:V/3|0});v({x:V/3*2|0,y:V/3*2|0});function R(o){let[a,r]=o.style.transform.slice(32,-31).split(", ").map((p)=>Number.parseFloat(p));return{x:a,y:r}}class h{bot;static fromJSON(o,a){return new h(o,...a)}static fromScreenPosition(o,a){let{anchorScreenPosition:r,pixelSize:p,anchorWorldPosition:l}=o.findAnchorsForScreen(a);return new h(o,l.x+(a.x-r.x)/p|0,l.y+(a.y-r.y)/p|0)}globalX=0;globalY=0;get tileX(){return this.globalX/H|0}set tileX(o){this.globalX=o*H+this.x}get tileY(){return this.globalY/H|0}set tileY(o){this.globalY=o*H+this.y}get x(){return this.globalX%H}set x(o){this.globalX=this.tileX*H+o}get y(){return this.globalY%H}set y(o){this.globalY=this.tileY*H+o}anchor1Index;anchor2Index;get pixelSize(){return(R(this.bot.$stars[this.anchor2Index]).x-R(this.bot.$stars[this.anchor1Index]).x)/(Q[this.anchor2Index].x-Q[this.anchor1Index].x)}constructor(o,a,r,p,l){this.bot=o;if(p===void 0||l===void 0)this.globalX=a,this.globalY=r;else this.globalX=a*H+p,this.globalY=r*H+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,a=1/0;for(let r=0;r<Q.length;r++){let{x:p,y:l}=Q[r];if(p<this.globalX&&l<this.globalY){let s=this.globalX-p+(this.globalY-l);if(s<o)o=s,this.anchor1Index=r}else if(p>this.globalX&&l>this.globalY){let s=p-this.globalX+(l-this.globalY);if(s<a)a=s,this.anchor2Index=r}}}toScreenPosition(){let o=Q[this.anchor1Index],a=R(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+a.x,y:(this.globalY-o.y)*this.pixelSize+a.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:a}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:a-window.innerHeight/3})}clone(){return new h(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class j extends Y{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,a){return new j(o,h.fromJSON(o,a.position),await q.fromJSON(o,a.pixels),a.strategy,a.opacity,a.drawTransparentPixels,a.drawColorsInOrder,a.colors,a.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,a,r,p="SPIRAL_FROM_CENTER",l=50,s=!1,c=!1,g=[],f=!1){super();this.bot=o;this.position=a;this.pixels=r;this.strategy=p;this.opacity=l;this.drawTransparentPixels=s;this.drawColorsInOrder=c;this.colors=g;this.lock=f;this.element.innerHTML=Po,this.element.classList.add("wimage"),F(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();P(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),P(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),P(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,P(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,P(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),P(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(n)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(n.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(n)=>{if(n.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let n of this.element.querySelectorAll(".resize"))this.registerEvent(n,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),a=new Set,r=new Map;for(let p=0;p<this.colors.length;p++){let l=this.colors[p];if(l.disabled)a.add(l.realColor);r.set(l.realColor,p)}for(let{x:p,y:l}of this.strategyPositionIterator()){let s=this.pixels.pixels[l][p];if(a.has(s))continue;o.globalX=this.position.globalX+p,o.globalY=this.position.globalY+l;let c=o.getMapColor();if(s!==c&&(this.drawTransparentPixels||s!==0))this.tasks.push({position:o.clone(),color:s})}if(this.drawColorsInOrder)this.tasks.sort((p,l)=>(r.get(p.color)??0)-(r.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:a}=this.position.toScreenPosition(),r=this.position.pixelSize*this.pixels.width,p=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${a.toFixed(3)}px, 0)`,this.element.style.width=`${r}px`,this.element.style.height=`${p}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,s=Math.max(0,l-this.tasks.length),c=l>0?s/l*100|0:0;this.$progressText.textContent=`${s}/${l} ${c}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${c/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),co(this.bot.images,this),this.bot.widget.update(),P(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let r=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-r.left,offsetY:o.clientY-r.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let a=this.$colorsDialog.getBoundingClientRect(),r=Math.max(8,window.innerWidth-a.width-8),p=Math.max(8,window.innerHeight-a.height-8),l=Math.min(r,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),s=Math.min(p,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(s)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let a=document.createDocumentFragment(),r=document.createElement("article");r.className="preview-card";let p=document.createElement("strong");p.textContent=this.getStrategyLabel(o);let l=document.createElement("canvas");l.className="preview-canvas",l.width=156,l.height=156,this.paintStrategyPreview(l,o),r.append(p,l),a.append(r),this.$previewDialogList.append(a)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((r,p)=>`${p}:${r.realColor}:${r.disabled?1:0}`).join("|"),a=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===a)return;this.previewCacheSignature=a,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return w("random");case"HUMANIZED":return w("humanized");case"HUMAN_SOFT_DITHER":return w("humanSoftDither");case"HUMAN_PATCHY":return w("humanPatchy");case"HUMAN_SWEEP_ARCS":return w("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return w("humanMicroCorrections");case"HUMAN_JITTER_FILL":return w("humanJitterFill");case"HUMAN_CORNER_BIAS":return w("humanCornerBias");case"HUMAN_LONG_STROKES":return w("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return w("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return w("humanMessySpiral");case"HUMAN_DRUNK_WALK":return w("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return w("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return w("humanPatchJump");case"HUMAN_HESITANT_LINES":return w("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return w("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return w("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return w("humanGapRecovery");case"HUMAN_STAIRCASE":return w("humanStaircase");case"HUMAN_EDGE_HUGGER":return w("humanEdgeHugger");case"HUMAN_BLOBS":return w("humanBlobs");case"HUMAN_BACKTRACK":return w("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return w("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return w("humanLateFixes");case"ZIGZAG":return w("zigzag");case"BRUSH_STROKES":return w("brushStrokes");case"DIAGONAL_BRUSH":return w("diagonalBrush");case"DOWN":return w("down");case"UP":return w("up");case"LEFT":return w("left");case"RIGHT":return w("right");case"SPIRAL_FROM_CENTER":return w("spiralOut");case"SPIRAL_TO_CENTER":return w("spiralIn");case"SCRIBBLE":return w("scribble");case"CROSSHATCH":return w("crosshatch");case"WAVE_SWEEP":return w("waveSweep");case"SCATTERED_LINES":return w("scatteredLines");case"CONTOUR_JITTER":return w("contourJitter");case"SPIRAL_WOBBLE":return w("spiralWobble");case"CLUSTER_BURSTS":return w("clusterBursts");case"ORBITAL":return w("orbital");case"FLOW_FIELD":return w("flowField");case"EDGE_IN":return w("edgeIn");default:return o}}paintStrategyPreview(o,a){let r=o.getContext("2d");if(!r)return;r.fillStyle="#0f1526",r.fillRect(0,0,o.width,o.height);let p=this.getSampledImagePreviewData(),l=this.getCachedPreviewSequence(a,p.mask,p.width,p.height),s=Math.min(o.width/p.width,o.height/p.height),c=(o.width-p.width*s)/2,g=(o.height-p.height*s)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let n=(z)=>{let e=requestAnimationFrame((A)=>{this.previewAnimationHandles.delete(e),z(A)});return this.previewAnimationHandles.add(e),e},u=(z)=>{r.fillStyle="#0f1526",r.fillRect(0,0,o.width,o.height);for(let e=0;e<Math.min(z,l.length);e++){let A=l[e],M=p.colors.get(`${A.x}:${A.y}`)??0;if(!M)continue;r.fillStyle=uo(M),r.fillRect(c+A.x*s,g+A.y*s,Math.max(1,s),Math.max(1,s))}},i=Math.min(3400,Math.max(900,l.length*8)),d=i+220,m=(z,e)=>{if(!this.$previewDialog.open)return;let A=(e-z)%d,M=Math.min(1,A/i),N=M*M*(3-2*M);u(Math.floor(l.length*N));let U=n((C)=>{m(z,C)});this.previewAnimations.set(o,U)},b=performance.now();m(b,b)}getCachedPreviewSequence(o,a,r=this.pixels.width,p=this.pixels.height){let l=this.colors.map((f,n)=>`${n}:${f.realColor}:${f.disabled?1:0}`).join("|"),s=`${o}:${r}x${p}:${a.length}:${this.drawColorsInOrder?1:0}:${l}`,c=this.previewSequenceCache.get(s);if(c)return c;let g=r===this.pixels.width&&p===this.pixels.height?this.getExactPreviewSequence(o,a):this.getApproxPreviewSequence(o,a,r);if(this.drawColorsInOrder){let f=new Map;for(let n=0;n<this.colors.length;n++)f.set(this.colors[n].realColor,n);g.sort((n,u)=>(f.get(this.pixels.pixels[n.y]?.[n.x]??0)??0)-(f.get(this.pixels.pixels[u.y]?.[u.x]??0)??0))}return this.previewSequenceCache.set(s,g),g}getExactPreviewSequence(o,a){let r=this.strategy;this.strategy=o;let p=[...this.strategyPositionIterator()];this.strategy=r;let l=new Set(a.map(({x:s,y:c})=>`${s}:${c}`));return p.filter(({x:s,y:c})=>l.has(`${s}:${c}`))}getApproxPreviewSequence(o,a,r){let p=[...a],l=(g,f,n)=>{return(g*73856093+f*19349663+n*83492791>>>0)/4294967296},s=(g,f)=>p.sort((n,u)=>n.x*g+n.y*f-(u.x*g+u.y*f)||n.y-u.y||n.x-u.x),c=p.sort((g,f)=>{if(g.y!==f.y)return g.y-f.y;let n=g.y%2===0?g.x:r-g.x,u=f.y%2===0?f.x:r-f.x;return n-u});switch(o){case"UP":return s(0,-1);case"LEFT":return s(-1,0);case"RIGHT":return s(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=r/2,f=Math.max(1,Math.round(p.reduce((n,u)=>n+u.y,0)/Math.max(1,p.length)));return p.sort((n,u)=>{let i=(n.x-g)**2+(n.y-f)**2,t=(u.x-g)**2+(u.y-f)**2;return o==="SPIRAL_FROM_CENTER"?i-t:t-i}),p}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return p.sort((g,f)=>l(g.x,g.y,o.length)-l(f.x,f.y,o.length));default:return c}}getSampledImagePreviewData(){let o=this.pixels.width,a=this.pixels.height,r=j.PREVIEW_MASK_BASE_WIDTH,p=j.PREVIEW_MASK_BASE_HEIGHT,l=Math.min(1,r/Math.max(1,o),p/Math.max(1,a)),s=Math.max(1,Math.round(o*l)),c=Math.max(1,Math.round(a*l)),g=new Set;for(let i=0;i<this.colors.length;i++){let t=this.colors[i];if(t.disabled)g.add(t.realColor)}let f=new Map,n=new Map;for(let i=0;i<a;i++)for(let t=0;t<o;t++){let d=this.pixels.pixels[i]?.[t]??0;if(!d||g.has(d))continue;let m=Math.min(s-1,Math.floor(t/o*s)),b=Math.min(c-1,Math.floor(i/a*c)),z=`${m}:${b}`;if(!f.has(z))f.set(z,{x:m,y:b});if(!n.has(z))n.set(z,d)}let u=[...f.values()];if(!u.length){let i=this.fallbackPreviewMask();return{width:o,height:a,mask:i,colors:new Map(i.map((t)=>[`${t.x}:${t.y}`,this.pixels.pixels[t.y]?.[t.x]??0]))}}return{width:s,height:c,mask:u,colors:n}}getImagePreviewMask(){let o=this.pixels.width,a=this.pixels.height,r=new Set;for(let l=0;l<this.colors.length;l++){let s=this.colors[l];if(s.disabled)r.add(s.realColor)}let p=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=this.pixels.pixels[l]?.[s]??0;if(c!==0&&!r.has(c))p.push({x:s,y:l})}return p.length?p:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],a=this.pixels.width/2,r=this.pixels.height/2,p=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let l=0;l<this.pixels.height;l++)for(let s=0;s<this.pixels.width;s++)if((s-a)**2+(l-r)**2<=p**2)o.push({x:s,y:l});return o}applyLocale(){if(F(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let a=G[o]??"0,0,0",[r=0,p=0,l=0]=a.split(",").map((s)=>Number.parseInt(s,10));return`#${[r,p,l].map((s)=>s.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let a=G[o]??"0,0,0",[r=0,p=0,l=0]=a.split(",").map((f)=>Number.parseInt(f,10)),s=Math.max(r,p,l),c=Math.min(r,p,l);if(s-c<15)return["gray","grey","gris","neutral","neutro"];if(r>p+30&&r>l+30)return["red","rojo"];if(p>r+30&&p>l+30)return["green","verde"];if(l>r+30&&l>p+30)return["blue","azul"];if(r>170&&p>120&&l<130)return["orange","naranja"];if(r>170&&p>110&&l>140)return["pink","rosa"];if(r>120&&p<100&&l>120)return["purple","violet","morado"];if(r>130&&p>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",w("colorPanelResults"));let a=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((r)=>!this.pixels.colors.has(r.realColor)))this.colors=this.pixels.colors.values().toArray().sort((r,p)=>p.amount-r.amount).map((r)=>({realColor:r.realColor,disabled:!1})),P(this.bot);for(let r=0;r<this.colors.length;r++){let p=this.colors[r],l=this.pixels.colors.get(p.realColor),s=!1,c=l.realColor!==l.color,g=l.amount/o*100,f=this.colorHex(l.realColor),n=this.colorKeywords(l.realColor),u=()=>{p.disabled=p.disabled?void 0:!0,i.classList.toggle("disabled",Boolean(p.disabled));let d=i.querySelector(".state");if(d)d.textContent=p.disabled?w("disabled"):w("enabled");P(this.bot)},i=document.createElement("button");if(i.className=`color-chip ${p.disabled?"disabled":""}`,i.draggable=!0,i.setAttribute("aria-label",`${w("overlayColors")} #${r+1}: ${f.toUpperCase()}`),i.innerHTML=`<span class="order-index">#${r+1}</span>
<span class="drag" title="${w("up")} / ${w("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${g.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${p.disabled?w("disabled"):w("enabled")}</span>
</span>
<span class="premium ${c?"on":""}">${c?w("premium"):""}</span>`,i.querySelector(".swatch").style.setProperty("--swatch-color",uo(l.realColor)),i.addEventListener("click",()=>{if(s){s=!1;return}u()}),i.addEventListener("dragstart",(d)=>{s=!0,i.classList.add("dragging"),d.dataTransfer?.setData("text/plain",String(r)),d.dataTransfer.effectAllowed="move"}),i.addEventListener("dragend",()=>{i.classList.remove("dragging")}),i.addEventListener("dragover",(d)=>{d.preventDefault(),i.classList.add("drag-target")}),i.addEventListener("dragleave",()=>{i.classList.remove("drag-target")}),i.addEventListener("drop",(d)=>{d.preventDefault(),i.classList.remove("drag-target");let m=Number.parseInt(d.dataTransfer?.getData("text/plain")??"-1",10);if(m<0||m===r||m>=this.colors.length)return;this.colors.splice(r,0,...this.colors.splice(m,1)),P(this.bot),this.updateColors()}),c){let d=document.createElement("button");d.textContent=w("buy"),d.className="buy-chip",d.addEventListener("click",(m)=>{m.stopPropagation(),document.getElementById("color-"+l.realColor)?.click()}),i.append(d)}let t=`${f} ${n.join(" ")} ${l.realColor} ${G[l.realColor]}`;if(!a||t.toLowerCase().includes(a))this.$colorsDialogList.append(i)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,a=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let r=0;r<a;r++)for(let p=0;p<o;p++)yield{x:p,y:r};break}case"UP":{for(let r=a-1;r>=0;r--)for(let p=0;p<o;p++)yield{x:p,y:r};break}case"LEFT":{for(let r=0;r<o;r++)for(let p=0;p<a;p++)yield{x:r,y:p};break}case"RIGHT":{for(let r=o-1;r>=0;r--)for(let p=0;p<a;p++)yield{x:r,y:p};break}case"RANDOM":{let r=[];for(let p=0;p<a;p++)for(let l=0;l<o;l++)r.push({x:l,y:p});for(let p=r.length-1;p>=0;p--){let l=Math.floor(Math.random()*(p+1)),s=r[p];r[p]=r[l],r[l]=s}yield*r;break}case"ZIGZAG":{for(let r=0;r<a;r++)if(r%2===0)for(let p=0;p<o;p++)yield{x:p,y:r};else for(let p=o-1;p>=0;p--)yield{x:p,y:r};break}case"HUMANIZED":{let r=Math.max(4,Math.floor(Math.min(o,a)/10)),p=[];for(let l=0;l<a;l+=r)for(let s=0;s<o;s+=r)p.push({x:s,y:l});for(let l=p.length-1;l>=0;l--){let s=Math.floor(Math.random()*(l+1)),c=p[l];p[l]=p[s],p[s]=c}for(let l=0;l<p.length;l++){let s=p[l],c=Math.min(a,s.y+r),g=Math.min(o,s.x+r);for(let f=s.y;f<c;f++)if(Math.random()>0.35)for(let u=s.x;u<g;u++)yield{x:u,y:f};else for(let u=g-1;u>=s.x;u--)yield{x:u,y:f}}break}case"HUMAN_SOFT_DITHER":{let r=new Set;for(let p=0;p<a;p++){let l=Math.floor(Math.random()*3)-1;if((p+l)%2===0)for(let c=0;c<o;c+=2)r.add(`${c},${p}`),yield{x:c,y:p};else for(let c=1;c<o;c+=2)r.add(`${c},${p}`),yield{x:c,y:p}}for(let p=0;p<a;p++)for(let l=0;l<o;l++){let s=`${l},${p}`;if(r.has(s))continue;yield{x:l,y:p}}break}case"HUMAN_PATCHY":{let r=new Set,p=o*a;while(r.size<p){let l=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*5);for(let g=s-c;g<=s+c;g++)for(let f=l-c;f<=l+c;f++){if(f<0||f>=o||g<0||g>=a)continue;if(Math.hypot(f-l,g-s)>c+Math.random()*1.2)continue;let n=`${f},${g}`;if(r.has(n))continue;r.add(n),yield{x:f,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let r=new Set,p=(o-1)/2,l=(a-1)/2,s=Math.hypot(p,l);for(let c=0;c<4;c++){let g=Math.random()*Math.PI*2;for(let f=0;f<=s;f+=0.35){let n=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(f*8));for(let i=0;i<u;i++){let t=g+n*i/u+Math.sin(f)*0.08,d=Math.round(p+Math.cos(t)*f),m=Math.round(l+Math.sin(t)*f);if(d<0||d>=o||m<0||m>=a)continue;let b=`${d},${m}`;if(r.has(b))continue;r.add(b),yield{x:d,y:m}}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"HUMAN_MICRO_CORRECTIONS":{let r=new Set;for(let p=0;p<a;p++){let l=p%2===0?1:-1,s=l>0?0:o-1;for(let c=0;c<o;c++){let g=s+(Math.random()>0.82?l:0),f=p+(Math.random()>0.9?1:0);for(let n of[{x:s,y:p},{x:g,y:p},{x:s,y:f}]){if(n.x<0||n.x>=o||n.y<0||n.y>=a)continue;let u=`${n.x},${n.y}`;if(r.has(u))continue;r.add(u),yield n}s+=l}}for(let p=0;p<a;p++)for(let l=0;l<o;l++){let s=`${l},${p}`;if(r.has(s))continue;yield{x:l,y:p}}break}case"HUMAN_JITTER_FILL":{let r=[];for(let p=0;p<a;p++)for(let l=0;l<o;l++)r.push({x:l,y:p});r.sort((p,l)=>{let s=p.y+(Math.random()-0.5)*1.8,c=l.y+(Math.random()-0.5)*1.8;if(s!==c)return s-c;return p.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*r;break}case"HUMAN_CORNER_BIAS":{let r=[{x:0,y:0},{x:o-1,y:0},{x:0,y:a-1},{x:o-1,y:a-1}],p=r[Math.floor(Math.random()*r.length)],l=[];for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=Math.hypot(c-p.x,s-p.y)+Math.random()*3.5;l.push({point:{x:c,y:s},score:f})}l.sort((s,c)=>s.score-c.score);for(let s of l)yield s.point;break}case"HUMAN_LONG_STROKES":{let r=new Set,p=o*a;while(r.size<p){let l=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=Math.random()*Math.PI*2,g=Math.sign(Math.cos(c)),f=Math.sign(Math.sin(c)),n=10+Math.floor(Math.random()*40);for(let u=0;u<n;u++){if(l<0||l>=o||s<0||s>=a)break;let i=`${l},${s}`;if(!r.has(i))r.add(i),yield{x:l,y:s};if(Math.random()>0.78)l+=f,s+=g;else l+=g,s+=f}}break}case"HUMAN_TAP_CLUSTERS":{let r=new Set,p=o*a;while(r.size<p){let l=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=3+Math.floor(Math.random()*10);for(let g=0;g<c;g++){let f=Math.round(l+(Math.random()-0.5)*6),n=Math.round(s+(Math.random()-0.5)*6);if(f<0||f>=o||n<0||n>=a)continue;let u=`${f},${n}`;if(r.has(u))continue;r.add(u),yield{x:f,y:n}}}break}case"HUMAN_MESSY_SPIRAL":{let r=new Set,p=(o-1)/2,l=(a-1)/2,s=Math.hypot(p,l)+2;for(let c=0;r.size<o*a;c++){let g=c/3,f=Math.min(s,g*0.18),n=g*0.29+Math.sin(g*0.13)*0.8,u=Math.round(p+Math.cos(n)*f+Math.sin(g)*0.7),i=Math.round(l+Math.sin(n)*f+Math.cos(g)*0.7);if(u<0||u>=o||i<0||i>=a){if(c>o*a*18)break;continue}let t=`${u},${i}`;if(r.has(t)){if(Math.random()>0.9)continue}else r.add(t),yield{x:u,y:i};if(c>o*a*18)break}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"HUMAN_DRUNK_WALK":{let r=new Set,p=Math.floor(Math.random()*o),l=Math.floor(Math.random()*a),s=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(r.size<o*a){let c=`${p},${l}`;if(!r.has(c))r.add(c),yield{x:p,y:l};let g=[];for(let u of s){let i=p+u.x,t=l+u.y;if(i<0||i>=o||t<0||t>=a)continue;g.push({x:i,y:t})}if(!g.length)break;let f=g.filter((u)=>{return!r.has(`${u.x},${u.y}`)});if(f.length&&Math.random()>0.2){let u=f[Math.floor(Math.random()*f.length)];p=u.x,l=u.y;continue}let n=g[Math.floor(Math.random()*g.length)];p=n.x,l=n.y}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"HUMAN_NOISE_CLOUD":{let r=[];for(let p=0;p<a;p++)for(let l=0;l<o;l++){let s=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((p+1)*1.17+Math.random()*0.8),c=(Math.random()-0.5)*2.6,g=Math.hypot(l-o/2,p-a/2)*0.08;r.push({point:{x:l,y:p},score:s+c+g})}r.sort((p,l)=>p.score-l.score);for(let p of r)yield p.point;break}case"HUMAN_PATCH_JUMP":{let r=new Set,p=[];for(let l=0;l<Math.max(6,o*a/18);l++)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});while(r.size<o*a){let l=p[Math.floor(Math.random()*p.length)],s=1+Math.floor(Math.random()*3),c=1+Math.floor(Math.random()*3);for(let g=l.y-c;g<=l.y+c;g++)for(let f=l.x-s;f<=l.x+s;f++){if(f<0||f>=o||g<0||g>=a)continue;if(Math.random()>0.86)continue;let n=`${f},${g}`;if(r.has(n))continue;r.add(n),yield{x:f,y:g}}if(Math.random()>0.72&&p.length<o*a/2)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});if(r.size>o*a*0.92)break}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=`${s},${l}`;if(r.has(c))continue;yield{x:s,y:l}}break}case"HUMAN_HESITANT_LINES":{let r=new Set;for(let p=0;p<a;p++){let l=p%2===0;for(let s=0;s<o;s++){let c=l?s:o-1-s,g=`${c},${p}`;if(!r.has(g))r.add(g),yield{x:c,y:p};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,c+(Math.random()>0.5?1:-1))),n=Math.max(0,Math.min(a-1,p+(Math.random()>0.65?1:0))),u=`${f},${n}`;if(!r.has(u))r.add(u),yield{x:f,y:n}}}}for(let p=0;p<a;p++)for(let l=0;l<o;l++){let s=`${l},${p}`;if(r.has(s))continue;yield{x:l,y:p}}break}case"HUMAN_OVERLAP_SWEEPS":{let r=[],p=Math.random()*Math.PI*2;for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=Math.sin((s+l)*0.42+p)*2.2,g=Math.cos((s-l)*0.3+p)*1.4;r.push({point:{x:s,y:l},score:l+c+g+(Math.random()-0.5)*3.4})}r.sort((l,s)=>l.score-s.score);for(let l of r)yield l.point;break}case"HUMAN_WOBBLE_DRIFT":{let r=[],p=o/2,l=a/2;for(let s=0;s<a;s++)for(let c=0;c<o;c++){let g=Math.hypot(c-p,s-l)*0.25,f=Math.sin((c+1)*0.9)*1.8+Math.cos((s+1)*1.1)*1.8+Math.sin((c+s)*0.35)*1.4;r.push({point:{x:c,y:s},score:g+f+(Math.random()-0.5)*2.8})}r.sort((s,c)=>s.score-c.score);for(let s of r)yield s.point;break}case"HUMAN_GAP_RECOVERY":{let r=new Set,p=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++){if(Math.random()>0.87){p.push({x:s,y:l});continue}r.add(`${s},${l}`),yield{x:s,y:l}}p.sort((l,s)=>Math.hypot(l.x-o/2,l.y-a/2)-Math.hypot(s.x-o/2,s.y-a/2));for(let l of p){let s=`${l.x},${l.y}`;if(r.has(s))continue;r.add(s),yield l}break}case"HUMAN_STAIRCASE":{let r=new Set,p=o+a-1;for(let l=0;l<p;l++){let s=Math.max(0,l-o+1),c=Math.min(a-1,l);for(let g=s;g<=c;g++){let f=l-g,n=[{x:f,y:g},{x:f+(Math.random()>0.5?1:-1),y:g},{x:f,y:g+(Math.random()>0.5?1:-1)}];for(let u of n){if(u.x<0||u.x>=o||u.y<0||u.y>=a)continue;let i=`${u.x},${u.y}`;if(r.has(i))continue;r.add(i),yield u}}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=`${s},${l}`;if(r.has(c))continue;yield{x:s,y:l}}break}case"HUMAN_EDGE_HUGGER":{let r=[];for(let p=0;p<a;p++)for(let l=0;l<o;l++){let s=Math.min(l,p,o-1-l,a-1-p);r.push({point:{x:l,y:p},score:s*3.5+(Math.random()-0.5)*5.5})}r.sort((p,l)=>p.score-l.score);for(let p of r)yield p.point;break}case"HUMAN_BLOBS":{let r=new Set,p=o*a;while(r.size<p){let l=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=1+Math.floor(Math.random()*4);for(let g=s-c;g<=s+c;g++)for(let f=l-c;f<=l+c;f++){if(f<0||f>=o||g<0||g>=a)continue;let n=Math.atan2(g-s,f-l),u=c+Math.sin(n*3+Math.random())*0.8;if(Math.hypot(f-l,g-s)>u)continue;let i=`${f},${g}`;if(r.has(i))continue;r.add(i),yield{x:f,y:g}}}break}case"HUMAN_BACKTRACK":{let r=new Set,p=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++)p.push({x:s,y:l});p.sort((l,s)=>l.y-s.y+(Math.random()-0.5)*2.2+(l.x-s.x)*0.04);for(let l=0;l<p.length;l++){let s=p[l],c=`${s.x},${s.y}`;if(r.has(c))continue;if(r.add(c),yield s,l>1&&Math.random()>0.74){let g=p[l-1],f=`${g.x},${g.y}`;if(!r.has(f))r.add(f),yield g}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=`${s},${l}`;if(r.has(c))continue;yield{x:s,y:l}}break}case"HUMAN_SHAKY_DIAGONAL":{let r=[];for(let p=0;p<a;p++)for(let l=0;l<o;l++){let s=Math.abs(l-p)*0.6,c=Math.sin(l*1.4+p*0.8)*1.8+Math.cos(p*1.1+l*0.5)*1.5;r.push({point:{x:l,y:p},score:s+c+(Math.random()-0.5)*3.2})}r.sort((p,l)=>p.score-l.score);for(let p of r)yield p.point;break}case"HUMAN_LATE_FIXES":{let r=[],p=[];for(let l=0;l<a;l++)for(let s=0;s<o;s++)if(Math.random()>0.9)p.push({x:s,y:l});else r.push({x:s,y:l});r.sort((l,s)=>l.y-s.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?l.x-s.x:0)),p.sort((l,s)=>Math.hypot(s.x-o/2,s.y-a/2)-Math.hypot(l.x-o/2,l.y-a/2)),yield*r,yield*p;break}case"DIAGONAL_BRUSH":{for(let r=0;r<o+a-1;r++){let p=r%2===0,l=[],s=Math.max(0,r-o+1),c=Math.min(a-1,r);for(let g=s;g<=c;g++){let f=r-g;if(f>=0&&f<o)l.push({x:f,y:g})}if(Math.random()>0.55)l.reverse();if(p)for(let g=l.length-1;g>=0;g--)yield l[g];else yield*l}break}case"BRUSH_STROKES":{let r=Array.from({length:a},()=>Array(o).fill(!1)),p=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(g,f)=>g>=0&&g<o&&f>=0&&f<a,s=0,c=o*a;for(let g=0;g<c*6&&s<c;g++){let f=Math.floor(Math.random()*o),n=Math.floor(Math.random()*a),u=p[Math.floor(Math.random()*p.length)],i=3+Math.floor(Math.random()*16);for(let t=0;t<i;t++){if(!l(f,n))break;if(!r[n][f])r[n][f]=!0,s++,yield{x:f,y:n};if(Math.random()>0.72)u=p[Math.floor(Math.random()*p.length)];f+=u.x,n+=u.y}}for(let g=0;g<a;g++)for(let f=0;f<o;f++)if(!r[g][f])yield{x:f,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let r=new Set,p=o*a,l=Math.floor(o/2),s=Math.floor(a/2),c=[[1,0],[0,1],[-1,0],[0,-1]],g=0,f=1,n=(i,t)=>i>=0&&i<o&&t>=0&&t<a,u=function*(){let i=0;while(i<p){for(let t=0;t<2;t++){for(let d=0;d<f;d++){if(n(l,s)){let m=`${l},${s}`;if(!r.has(m)){if(r.add(m),yield{x:l,y:s},i++,i>=p)return}}l+=c[g][0],s+=c[g][1]}g=(g+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let i=[...u()];for(let t=i.length-1;t>=0;t--)yield i[t]}break}case"SCRIBBLE":{let r=new Set,p=o*a,l=Math.floor(o/2),s=Math.floor(a/2);for(let c=0;r.size<p&&c<p*24;c++){let g=`${l},${s}`;if(!r.has(g))r.add(g),yield{x:l,y:s};if(l+=Math.floor(Math.random()*3)-1,s+=Math.floor(Math.random()*3)-1,l<0||l>=o||s<0||s>=a)l=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a)}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;r.add(f),yield{x:g,y:c}}break}case"CROSSHATCH":{let r=[];for(let s=0;s<o+a-1;s++)for(let c=Math.max(0,s-o+1);c<=Math.min(a-1,s);c++){let g=s-c;r.push({x:g,y:c})}let p=[];for(let s=-a+1;s<o;s++)for(let c=0;c<a;c++){let g=c+s;if(g>=0&&g<o)p.push({x:g,y:c})}let l=new Set;for(let s of[...r,...p]){let c=`${s.x},${s.y}`;if(l.has(c))continue;l.add(c),yield s}break}case"WAVE_SWEEP":{let r=new Set;for(let p=0;p<o;p++){let s=(Math.sin(p/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(a-1)|0;for(let c=0;c<a;c++){let g=s+c,f=s-c;for(let n of[g,f]){if(n<0||n>=a)continue;let u=`${p},${n}`;if(r.has(u))continue;r.add(u),yield{x:p,y:n}}}}break}case"SCATTERED_LINES":{let r=new Set,p=o*a;for(let l=0;r.size<p&&l<p*14;l++){let s=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=Math.random()*Math.PI*2,f=Math.round(Math.cos(g)),n=Math.round(Math.sin(g)),u=6+Math.floor(Math.random()*28);for(let i=0;i<u;i++){if(s<0||s>=o||c<0||c>=a)break;let t=`${s},${c}`;if(!r.has(t))r.add(t),yield{x:s,y:c};s+=f,c+=n}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=`${s},${l}`;if(r.has(c))continue;r.add(c),yield{x:s,y:l}}break}case"CONTOUR_JITTER":{let r=new Set;for(let p=0;p<Math.ceil(Math.min(o,a)/2);p++){let l=[],s=p,c=p,g=o-p-1,f=a-p-1;for(let n=s;n<=g;n++)l.push({x:n,y:c});for(let n=c+1;n<=f;n++)l.push({x:g,y:n});for(let n=g-1;n>=s;n--)l.push({x:n,y:f});for(let n=f-1;n>c;n--)l.push({x:s,y:n});for(let n=l.length-1;n>0;n--){let u=Math.floor(Math.random()*(n+1)),i=l[n];l[n]=l[u],l[u]=i}for(let n of l){let u=`${n.x},${n.y}`;if(r.has(u))continue;r.add(u),yield n}}break}case"SPIRAL_WOBBLE":{let r=new Set,p=o/2,l=a/2,s=Math.hypot(p,l);for(let c=0;r.size<o*a&&c<o*a*9;c++){let g=c/(o*a*9)*s,f=c*0.31+Math.sin(c*0.07)*0.7,n=Math.round(p+Math.cos(f)*g),u=Math.round(l+Math.sin(f)*g);if(n<0||n>=o||u<0||u>=a)continue;let i=`${n},${u}`;if(r.has(i))continue;r.add(i),yield{x:n,y:u}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"CLUSTER_BURSTS":{let r=new Set,p=o*a;for(let l=0;r.size<p&&l<p*12;l++){let s=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a),g=2+Math.floor(Math.random()*10);for(let f=c-g;f<=c+g;f++)for(let n=s-g;n<=s+g;n++){if(n<0||n>=o||f<0||f>=a)continue;if(Math.hypot(n-s,f-c)>g)continue;let u=`${n},${f}`;if(r.has(u))continue;r.add(u),yield{x:n,y:f}}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=`${s},${l}`;if(r.has(c))continue;r.add(c),yield{x:s,y:l}}break}case"ORBITAL":{let r=new Set,p=(o-1)/2,l=(a-1)/2,s=Math.ceil(Math.max(p,l));for(let c=0;c<=s;c++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,c)*2));for(let f=0;f<g;f++){let n=f/g*Math.PI*2+(c%2?0.3:-0.3),u=Math.round(p+Math.cos(n)*c),i=Math.round(l+Math.sin(n)*c);if(u<0||u>=o||i<0||i>=a)continue;let t=`${u},${i}`;if(r.has(t))continue;r.add(t),yield{x:u,y:i}}}for(let c=0;c<a;c++)for(let g=0;g<o;g++){let f=`${g},${c}`;if(r.has(f))continue;yield{x:g,y:c}}break}case"FLOW_FIELD":{let r=new Set,p=o*a;for(let l=0;r.size<p&&l<p*18;l++){let s=Math.floor(Math.random()*o),c=Math.floor(Math.random()*a);for(let g=0;g<120;g++){if(s<0||s>=o||c<0||c>=a)break;let f=`${s},${c}`;if(!r.has(f))r.add(f),yield{x:s,y:c};let n=Math.sin(s*0.09)*1.8+Math.cos(c*0.08)*1.6+Math.sin((s+c)*0.05);s+=Math.round(Math.cos(n)),c+=Math.round(Math.sin(n))}}for(let l=0;l<a;l++)for(let s=0;s<o;s++){let c=`${s},${l}`;if(r.has(c))continue;r.add(c),yield{x:s,y:l}}break}case"EDGE_IN":{let r=new Set,p=Math.ceil(Math.min(o,a)/2);for(let l=0;l<p;l++){let s=l,c=o-1-l,g=l,f=a-1-l;for(let n=s;n<=c;n++)for(let u of[g,f]){let i=`${n},${u}`;if(r.has(i))continue;r.add(i),yield{x:n,y:u}}for(let n=g+1;n<=f-1;n++)for(let u of[s,c]){let i=`${u},${n}`;if(r.has(i))continue;r.add(i),yield{x:u,y:n}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),P(this.bot)}move(o){if(!this.moveInfo)return;let a=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),r=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=a+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-a)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,a+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=r+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-r)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,r+this.moveInfo.height);this.update(),P(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let a=o.target;if(a.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(a.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(a.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(a.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${X}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Do=`/* stylelint-disable declaration-no-important */
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
`;class lo extends Error{name="KGlacerMacroError";constructor(o,a){super(o);a.widget.status=o}}class io extends lo{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var D={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function J(o,a){let r=a.key.toLowerCase(),p=o.key.toLowerCase(),s=r==="/"&&(p==="/"||p==="?"||o.code==="Slash")||p===r,c=a.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,g=a.ctrl===!0?!0:a.meta===!0?o.metaKey:!o.metaKey;return s&&o.shiftKey===Boolean(a.shift)&&c&&g&&o.altKey===Boolean(a.alt)}function Jo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let a=o.tagName.toLowerCase();return a==="input"||a==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var ko=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Uo="kglacer-macro:overlay-hidden",So="kglacer-macro:auto-farm-config",Qo="kglacer-macro:auto-overlay-config",la="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class wo extends Y{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$openConfig;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=ko,F(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=la,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$openConfig.addEventListener("click",()=>{this.openSettingsModal()}),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(w("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${X}`,o.click(),await K(o,["change"],["cancel","error"]);let a=o.files?.[0];if(!a)throw new io(this.bot);console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let r;if(a.name.endsWith(`.${X}`))r=await j.fromJSON(this.bot,JSON.parse(await a.text()));else{let p=new FileReader;p.readAsDataURL(a),await K(p,["load"],["error"]);let l=await this.compressImageBeforeLoad(p.result),s=new Image;s.src=l,await K(s,["load"],["error"]),await this.waitForStableViewportProjection(),r=new j(this.bot,h.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new q(this.bot,s))}this.bot.images.push(r),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),r.updateTasks(),P(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(w("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:a,minGlobalY:r,maxGlobalX:p,maxGlobalY:l}=o,s=document.createElement("canvas");s.width=Math.max(1,p-a+1),s.height=Math.max(1,l-r+1);let c=s.getContext("2d");if(!c)throw new Error("Capture context unavailable");c.imageSmoothingEnabled=!1;let g=Math.floor(a/H),f=Math.floor(r/H),n=Math.floor(p/H),u=Math.floor(l/H),i=(n-g+1)*(u-f+1),t=0;for(let m=g;m<=n;m++)for(let b=f;b<=u;b++){this.status=`⌛ ${w("taskReadingTiles")} [${++t}/${i}]`;let z=await this.loadTileImage(m,b),e=m*H,A=b*H,M=Math.max(a,e),N=Math.min(p,e+H-1),U=Math.max(r,A),C=Math.min(l,A+H-1),B=M-e,I=U-A,O=N-M+1,S=C-U+1,$=M-a,x=U-r;c.drawImage(z,B,I,O,S,$,x,O,S)}let d=Date.now();await this.downloadCapture(s,"png",d)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,a,r){let p=a==="webp"?"image/webp":"image/png",l=await new Promise((g,f)=>{o.toBlob((n)=>{if(!n){f(new Error(`Failed to create ${a.toUpperCase()} capture file`));return}g(n)},p)}),s=URL.createObjectURL(l),c=document.createElement("a");c.href=s,c.download=`wplace-capture-${r}.${a}`,c.click(),URL.revokeObjectURL(s)}async loadTileImage(o,a){let r;for(let p=1;p<=3;p++)try{let l=new Image;return l.crossOrigin="anonymous",l.referrerPolicy="no-referrer",l.src=`https://backend.wplace.live/files/s0/tiles/${o}/${a}.png?ts=${Date.now()}-${p}`,await K(l,["load"],["error"]),l}catch(l){if(r=l,p<3)await new Promise((s)=>setTimeout(s,p*200))}throw r instanceof Error?r:new Error(`Tile fetch failed (${o}/${a})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,a)=>{let r=document.createElement("div");r.className="kgm-capture-overlay",r.innerHTML=`<div class="kgm-capture-hint">${w("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let p=r.querySelector(".kgm-capture-box");document.body.append(r);let l,s,c=()=>{window.removeEventListener("keydown",i,!0),r.removeEventListener("pointermove",n),r.removeEventListener("pointerdown",u),r.remove()},g=(t)=>{let d=Math.min(l.x,t.x),m=Math.min(l.y,t.y),b=Math.abs(l.x-t.x)+1,z=Math.abs(l.y-t.y)+1;return{left:d,top:m,width:b,height:z}},f=(t)=>{let{left:d,top:m,width:b,height:z}=g(t);p.style.left=`${d}px`,p.style.top=`${m}px`,p.style.width=`${b}px`,p.style.height=`${z}px`},n=(t)=>{if(!l)return;f({x:t.clientX,y:t.clientY})},u=(t)=>{if(t.preventDefault(),!l){l={x:t.clientX,y:t.clientY};let M=h.fromScreenPosition(this.bot,l);s={x:M.globalX,y:M.globalY},f(l);return}let d={x:t.clientX,y:t.clientY},m=h.fromScreenPosition(this.bot,d);if(c(),!s){a(new Error("Capture anchor point unavailable"));return}let b=Math.min(s.x,m.globalX),z=Math.min(s.y,m.globalY),e=Math.max(s.x,m.globalX),A=Math.max(s.y,m.globalY);if(e-b<1||A-z<1){a(new Error("Capture area too small"));return}o({minGlobalX:b,minGlobalY:z,maxGlobalX:e,maxGlobalY:A})},i=(t)=>{if(t.key!=="Escape")return;c(),a(new Error("Capture cancelled"))};window.addEventListener("keydown",i,!0),r.addEventListener("pointermove",n),r.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let a=new Image;if(a.src=o,await K(a,["load"],["error"]),!(a.naturalWidth*a.naturalHeight>3000000||o.length>3000000))return o;let p=document.createElement("canvas");p.width=a.naturalWidth,p.height=a.naturalHeight;let l=p.getContext("2d");if(!l)return o;return l.drawImage(a,0,0),p.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),a=0,r;for(let p=0;p<45;p++){await new Promise((n)=>requestAnimationFrame(()=>{n()}));let{anchorScreenPosition:{x:l,y:s},pixelSize:c}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(c)||c<=0){a=0;continue}let g={anchorX:l,anchorY:s,pixelSize:c};if(!r){r=g,a=1;continue}if(Math.abs(g.anchorX-r.anchorX)+Math.abs(g.anchorY-r.anchorY)+Math.abs(g.pixelSize-r.pixelSize)<0.0012)a++;else a=0;if(r=g,a>=3)return}}update(){this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.$images.innerHTML="";let o=document.createDocumentFragment();for(let a=0;a<this.bot.images.length;a++){let r=this.bot.images[a],p=document.createElement("div");o.append(p),p.className="image",p.innerHTML=`<button class="preview" title="View preview">
  <img src="${r.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${a===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${a===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,p.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=a,r.openPreviewPanel()}),p.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=a,r.openColorPanel()}),p.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=a,r.openPreviewPanel()}),p.querySelector(".download").addEventListener("click",()=>{r.exportImage()}),p.querySelector(".delete").addEventListener("click",()=>{r.destroy()}),p.querySelector(".up").addEventListener("click",()=>{so(this.bot.images,a,a-1),this.update(),P(this.bot)}),p.querySelector(".down").addEventListener("click",()=>{so(this.bot.images,a,a+1),this.update(),P(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,a=0;for(let l=0;l<this.bot.images.length;l++){let s=this.bot.images[l];o+=s.pixels.pixels.length*s.pixels.pixels[0].length,a+=s.tasks.length}let r=Math.max(0,o-a),p=o>0?r/o*100|0:0;this.$progressText.textContent=`${r}/${o} ${p}% ETA: ${a/120|0}h`,this.$progressLine.style.transform=`scaleX(${p/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Uo)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let a=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",a),localStorage.setItem(Uo,String(a)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden")?w("disabled"):w("enabled");this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${w("toggleOverlay")} (${o})</span>`}applyLocaleToUI(o){ro(o),F(this.element);for(let a=0;a<this.bot.images.length;a++)this.bot.images[a].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${w("close")}"><span class="icon">×</span></button>
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
</form>`,document.body.append(o),F(o);let a=o.querySelector(".settings-locale");a.value=_(),a.addEventListener("change",()=>{this.applyLocaleToUI(a.value),F(o)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=w("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${w("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:w("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=w("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${w("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:w("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let a=Math.max(0,o-Date.now()),r=Math.ceil(a/1000),p=Math.floor(r/60),l=r%60;return`next in ${String(p).padStart(2,"0")}:${String(l).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText()}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${w("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${w("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText();return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{if(!await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels,0)){this.status=`⚠️ ${w("autoFarmStopped")}: ${w("autoFarmTransparentUnavailable")}`,this.stopAutoFarm();return}await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;try{if(!await this.bot.drawOverlayPixelsBatch(this.autoOverlayConfig.pixels)){this.status=`⚠️ ${w("autoOverlayStopped")}: ${w("autoOverlayNoTasks")}`,this.stopAutoOverlay();return}await this.waitAndClickPaintButton()}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(So,JSON.stringify(o))}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(Qo,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(So);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,p=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",l=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:p==="hours"?a.value*3600000:p==="minutes"?a.value*60000:a.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,unit:p,timerMs:l}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=localStorage.getItem(Qo);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let r=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,p=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",l=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:p==="hours"?a.value*3600000:p==="minutes"?a.value*60000:a.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(a.value)),pixels:r,unit:p,timerMs:l}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoFarmConfig?.unit??"minutes",r=this.autoFarmConfig?.value??1,p=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${w("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${p}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),F(o);let l=o.querySelector(".autofarm-unit");l.value=a;let s=o.querySelector(".autofarm-value"),c=o.querySelector(".autofarm-pixels"),g=()=>{let f=Math.max(1,Number.parseInt(s.value||"1",10));if(l.value==="hours")return f*3600000;if(l.value==="minutes")return f*60000;return f*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(s.value||"1",10)),pixels:Math.max(1,Number.parseInt(c.value||"60",10)),unit:l.value,timerMs:g()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoOverlayConfig?.unit??"minutes",r=this.autoOverlayConfig?.value??1,p=this.autoOverlayConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${w("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${p}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),F(o);let l=o.querySelector(".autofarm-unit");l.value=a;let s=o.querySelector(".autofarm-value"),c=o.querySelector(".autofarm-pixels"),g=()=>{let f=Math.max(1,Number.parseInt(s.value||"1",10));if(l.value==="hours")return f*3600000;if(l.value==="minutes")return f*60000;return f*1000};o.querySelector(".autooverlay-start").onclick=()=>{this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(s.value||"1",10)),pixels:Math.max(1,Number.parseInt(c.value||"60",10)),unit:l.value,timerMs:g()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,a){this.element.querySelector("."+o).disabled=a}async run(o,a,r,p="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${p} ${o}`;try{let s=await a();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),s}catch(s){if(!(s instanceof lo))console.error(s),this.status=`${w("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:s}),s}finally{await r?.()}}handleKeyboard(o){if(Jo(o.target))return;if(J(o,D.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(J(o,D.showShortcuts)){o.preventDefault(),this.open=!0,this.openSettingsModal();return}if(J(o,D.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(J(o,D.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(J(o,D.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(J(o,D.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(J(o,D.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(J(o,D.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(J(o,D.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(J(o,D.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(J(o,D.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(J(o,D.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),P(this.bot)}async waitAndClickPaintButton(){await this.run(w("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){await this.triggerNativePaintClickWithChallengeRecovery(o);return}await new Promise((a)=>setTimeout(a,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((r)=>Array.from(document.querySelectorAll(r))).find((r)=>/pintar|paint/i.test(r.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}async triggerNativePaintClickWithChallengeRecovery(o){if(this.triggerNativePaintClick(o),!await this.waitForChallengeAppearance(4000))return;await this.waitForChallengeToResolve();let r=this.findNativePaintButton();if(r&&!r.disabled&&r.ariaDisabled!=="true")this.triggerNativePaintClick(r)}async waitForChallengeAppearance(o){let a=Date.now();while(Date.now()-a<=o){if(this.isChallengeVisible())return!0;await new Promise((r)=>setTimeout(r,250))}return!1}async waitForChallengeToResolve(){await this.run(w("taskWaitingChallengeResolve"),async()=>{while(this.isChallengeVisible())await new Promise((o)=>setTimeout(o,500))})}isChallengeVisible(){return Boolean(document.querySelector('iframe[src*="hcaptcha.com"], iframe[src*="newassets.hcaptcha.com"], iframe[src*="captcha"], .h-captcha, [data-hcaptcha-widget-id]'))}}var pa=2,jo="[KGM]",Ko="kglacer-macro:access-ok",to="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Go="kgm-access-locked";class qo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,a){if(a===void 0)console.log(`${jo} ${o}`);else console.log(`${jo} ${o}`,a)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Go);let o=Fo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let r=0;r<o.images.length;r++){let p=o.images[r];v({x:p.position[0]-1000,y:p.position[1]-1000}),v({x:p.position[0]+1000,y:p.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let a=document.createElement("style");a.textContent=Do.replace("FAKE_FAVORITE_LOCATIONS",T.length.toString()),document.head.append(a),this.log("Styles injected",{fakeFavoriteLocations:T.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Go),this._widget=new wo(this),await this.widget.run(w("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let r=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((p)=>{for(let l=0;l<p.length;l++)if(p[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(r,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await k(500),await this.updateColors(),o)for(let p=0;p<o.images.length;p++){let l=await j.fromJSON(this,o.images[p]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Ko)===to)return;await new Promise((o)=>{let a=document.createElement("dialog");a.className="kgm-modal access-dialog",a.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(a),F(a);let r=a.querySelector(".access-input"),p=a.querySelector(".access-error"),l=a.querySelector(".access-locale");l.innerHTML=eo().map((s)=>`<option value="${s}" ${s===_()?"selected":""}>${s.toUpperCase()}</option>`).join(""),l.addEventListener("change",()=>{ro(l.value),F(a)}),a.addEventListener("cancel",(s)=>{s.preventDefault()}),a.querySelector("form").addEventListener("submit",(s)=>{s.preventDefault();let c=atob(to);if(r.value.trim()!==c){p.textContent=w("invalidAccessKey");return}localStorage.setItem(Ko,to),a.close(),a.remove(),o()}),a.showModal(),r.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),a=(r)=>{if(!r.shiftKey)r.stopPropagation()};return this.widget.run(w("taskDrawing"),async()=>{await this.widget.run(w("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",a,!0),o.addEventListener("wheel",a,!0),this.updateTasks();let r=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((s)=>s.json()),p=Math.floor(r.charges.count);this.log("Charges fetched",{charges:p});let l=0;for(let s=0;s<this.images.length;s++)l+=this.images[s].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(p>0){let s=!0;for(let c=0;c<this.images.length;c++){let g=this.images[c].tasks.shift();if(!g)continue;this.drawTask(g),p--,await k(1),s=!1}if(s)break}break}case"PERCENTAGE":{for(let s=0;s<l&&p>0;s++){let c=1,g;for(let f=0;f<this.images.length;f++){let n=this.images[f],u=1-n.tasks.length/(n.pixels.pixels.length*n.pixels.pixels[0].length);if(u<c)c=u,g=n}this.drawTask(g.tasks.shift()),p--,await k(1)}break}case"SEQUENTIAL":for(let s=0;s<this.images.length;s++){let c=this.images[s];for(let g=c.tasks.shift();g&&p>0;g=c.tasks.shift())this.drawTask(g),p--,await k(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:p})},()=>{globalThis.removeEventListener("mousemove",a,!0),o.removeEventListener("wheel",a,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:pa,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let a=document.querySelector(".maplibregl-canvas"),r=window.innerWidth/2,p=window.innerHeight/2,l=r-o.x,s=p-o.y;function c(g,f,n){a.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:f,clientY:n,buttons:1}))}c("mousedown",r,p),c("mousemove",l,s),c("mouseup",l,s)}readMap(){this.mapsCache.clear();let o=new Set;for(let r=0;r<this.images.length;r++){let p=this.images[r],{tileX:l,tileY:s}=new h(this,p.position.globalX+p.pixels.pixels[0].length,p.position.globalY+p.pixels.pixels.length);for(let c=p.position.tileX;c<=l;c++)for(let g=p.position.tileY;g<=s;g++)o.add(`${c}/${g}`)}let a=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${w("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(r)=>{this.mapsCache.set(r,await q.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${r}.png`,exactColor:!0})),this.widget.status=`⌛ ${w("taskReadingMap")} [${++a}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let a=0,r=1,p=1/0,l=1/0;for(let g=0;g<this.$stars.length;g++){let{x:f,y:n}=R(this.$stars[g]);if(f<o.x&&n<o.y){let u=o.x-f+(o.y-n);if(u<p)p=u,a=g}else if(f>o.x&&n>o.y){let u=f-o.x+(n-o.y);if(u<l)l=u,r=g}}let s=R(this.$stars[a]),c=Q[a];return{anchorScreenPosition:s,anchorWorldPosition:c,pixelSize:(R(this.$stars[r]).x-s.x)/(Q[r].x-c.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await k(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await k(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await k(1)}drawTask(o){if(this.lastColor!==o.color){let p=document.getElementById("color-"+o.color);if(!p){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}p.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let a=o.position.pixelSize/2,r=o.position.toScreenPosition();if(!Number.isFinite(r.x)||!Number.isFinite(r.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:r.x+a,clientY:r.y+a,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((t)=>!t.disabled&&t.getAttribute("aria-disabled")!=="true"&&t.offsetParent!==null);if(!o.length)return;let a=o[Math.floor(Math.random()*o.length)],r=Number.parseInt(a.id.slice(6),10);if(!Number.isFinite(r))return;let p=document.querySelector(".maplibregl-canvas");if(!p)return;let l=p.getBoundingClientRect(),s=24,c=l.left+s,g=l.right-s,f=l.top+s,n=l.bottom-s;if(g<=c||n<=f)return;let u=c+Math.random()*(g-c),i=f+Math.random()*(n-f);this.drawTask({color:r,position:h.fromScreenPosition(this,{x:u,y:i})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o,a){let r=Math.max(1,Math.floor(o)),p=0;return await this.widget.run(w("taskDrawingRandomPixels"),async()=>{await this.widget.run(w("taskInitializingDraw"),()=>this.updateColors());let l=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((d)=>!d.disabled&&d.getAttribute("aria-disabled")!=="true"&&d.offsetParent!==null),s=document.querySelector(".maplibregl-canvas");if(!l.length||!s)return;let c=a===void 0?void 0:l.find((d)=>Number.parseInt(d.id.slice(6),10)===a);if(a!==void 0&&!c)return;let g=s.getBoundingClientRect(),f=24,n=g.left+f,u=g.right-f,i=g.top+f,t=g.bottom-f;if(u<=n||t<=i)return;for(let d=0;d<r;d++){let m=c??l[Math.floor(Math.random()*l.length)],b=Number.parseInt(m.id.slice(6),10);if(!Number.isFinite(b))continue;let z=n+Math.random()*(u-n),e=i+Math.random()*(t-i);this.drawTask({color:b,position:h.fromScreenPosition(this,{x:z,y:e})}),p++,await k(1)}}),p}async drawOverlayPixelsBatch(o){let a=Math.max(1,Math.floor(o)),r=0;return await this.widget.run(w("taskDrawingOverlayPixels"),async()=>{await this.widget.run(w("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let p=0;p<a;p++){let l=this.takeNextTaskFromStrategy();if(!l)break;this.drawTask(l),r++,await k(1)}this.widget.update()}),r}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let a=this.images[o].tasks.shift();if(a)return a}return}case"PERCENTAGE":{let o,a=Number.POSITIVE_INFINITY;for(let r=0;r<this.images.length;r++){let p=this.images[r];if(!p.tasks.length)continue;let l=p.pixels.pixels.length*p.pixels.pixels[0].length,s=1-p.tasks.length/l;if(s<a)a=s,o=p}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=globalThis.fetch,a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(r,p)=>{let l=await o(r,p),s=l.clone(),c="";if(typeof r=="string")c=r;else if(r instanceof Request)c=r.url;else if(r instanceof URL)c=r.href;if(l.url==="https://backend.wplace.live/me")this.me=await s.json(),this.me.favoriteLocations.unshift(...T),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let g=a.exec(c);if(g){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new h(this,+g[1],+g[2],+g[3],+g[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await k(1)}waitForElement(o,a){return this.log("Waiting for element",{name:o,selector:a}),this.widget.run(`${w("taskWaitingFor")} ${o}`,()=>{return new Promise((r)=>{let p=document.querySelector(a);if(p){r(p);return}let l=new MutationObserver(()=>{let s=document.querySelector(a);if(s)l.disconnect(),r(s)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,T.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}if(location.hostname.includes("hcaptcha.com"))zo();else globalThis.kglacerMacro=new qo,globalThis.kgm=globalThis.kglacerMacro,globalThis.wbot=globalThis.kglacerMacro;
