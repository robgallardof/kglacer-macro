// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      3.0.4
// @description  Paint automation macro for https://wplace.live / Macro para automatizar pintado en https://wplace.live
// @author       robergallardof + contributors
// @license      MPL-2.0
// @homepageURL  https://github.com/robgallardof/kglacer-macro
// @updateURL    https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @downloadURL  https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/dist.user.js
// @run-at       document-start
// @match        *://*.wplace.live/*
// @grant        none
// ==/UserScript==

// Wplace  --> https://wplace.live
// License --> https://www.mozilla.org/en-US/MPL/2.0/
function lo(o,l,p){let r=o[p];return o[p]=o[l],o[l]=r,o}function ro(o,l){let p=o.indexOf(l);if(p!==-1)o.splice(p,1);return p}var la=Math.floor(Math.random()*65536),ra=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function j(o){return new Promise((l)=>setTimeout(l,o))}function Z(o,l,p=["error"],r="addEventListener"){return new Promise((a,g)=>{for(let f=0;f<l.length;f++)o[r]?.(l[f],a);for(let f=0;f<p.length;f++)o[r]?.(p[f],g)})}class Co{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,l=15000){this.size=o,this.historyTime=l}push(o){if(o<0)throw new Error("Negative chunk size");let{time:l,historyTime:p}=this.getTime();if(this.history.push({time:l,chunk:o}),this.history[0]&&this.history[0].time+p<l)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((l,p)=>l+p.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),l=o-this.startTime,p=Math.min(l,this.historyTime);return{time:o,historyTime:p}}}var io=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto farm",shortcutStopAutoFarm:"Stop auto farm",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start",autoFarmStop:"Stop",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start",autoOverlayStop:"Stop",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto farm",shortcutStopAutoFarm:"Detener auto farm",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar",autoFarmStop:"Detener",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar",autoOverlayStop:"Detener",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área"}};function Vo(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function Y(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let l=0;l<io.length;l++){let p=localStorage.getItem(io[l]);if(!p||!(p in y))continue;return localStorage.setItem("kglacer-macro:locale",p),p}return Vo()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function bo(){return Object.keys(y)}function d(o){let l=Y();return y[l][o]}function U(o){for(let l of o.querySelectorAll("[data-i18n]"))l.textContent=d(l.dataset.i18n);for(let l of o.querySelectorAll("[data-i18n-title]"))l.setAttribute("title",d(l.dataset.i18nTitle));for(let l of o.querySelectorAll("[data-i18n-aria-label]"))l.setAttribute("aria-label",d(l.dataset.i18nAriaLabel));for(let l of o.querySelectorAll("[data-i18n-placeholder]"))l.setAttribute("placeholder",d(l.dataset.i18nPlaceholder))}class _{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,l){for(let p in l)this[p]=o.querySelector(l[p])}registerEvent(o,l,p,r={}){r.passive??=!0,o.addEventListener(l,p,r),this.runOnDestroy.push(()=>{o.removeEventListener(l,p)})}}function go(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function mo(o,l,p){let r=go(o/255),a=go(l/255),g=go(p/255),f=Math.cbrt(0.4122214708*r+0.5363325363*a+0.0514459929*g),c=Math.cbrt(0.2119034982*r+0.6806995451*a+0.1073969566*g),s=Math.cbrt(0.0883024619*r+0.2817188376*a+0.6299787005*g),w=0.2104542553*f+0.793617785*c-0.0040720468*s,u=1.9779984951*f-2.428592205*c+0.4505937099*s,n=0.0259040371*f+0.7827717662*c-0.808675766*s;return[w,u,n]}function zo(o,l,p){let[r,a,g]=o,[f,c,s]=l,w=(po)=>po*180/Math.PI,u=(po)=>po*Math.PI/180,n=1,i=1,b=1,m=Math.sqrt(a**2+g**2),z=Math.sqrt(c**2+s**2),A=(m+z)/2,M=0.5*(1-Math.sqrt(A**7/(A**7+6103515625))),H=a*(1+M),N=c*(1+M),D=Math.sqrt(H**2+g**2),G=Math.sqrt(N**2+s**2),C=g===0&&H===0?0:w(Math.atan2(g,H))%360,E=s===0&&N===0?0:w(Math.atan2(s,N))%360,v=f-r,O=G-D,q=0;if(D*G!==0){if(q=E-C,q>180)q-=360;else if(q<-180)q+=360}let $=2*Math.sqrt(D*G)*Math.sin(u(q)/2),x=(r+f)/2,e=(D+G)/2,L=(C+E)/2;if(Math.abs(C-E)>180)L+=180;let So=1-0.17*Math.cos(u(L-30))+0.24*Math.cos(u(2*L))+0.32*Math.cos(u(3*L+6))-0.2*Math.cos(u(4*L-63)),to=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),uo=1+0.045*e,no=1+0.015*e*So,Zo=30*Math.exp((-((L-275)/25))**2),Wo=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(u(2*Zo));return Math.sqrt((v/(1*to))**2+(O/(1*uo))**2+($/(1*no))**2+Wo*(O/(1*uo))*($/(1*no)))-v*p}var V=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],W=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function fo(o){if(o===0)return"transparent";let l=V[o],p=`oklab(${l[0]*100}% ${l[1]} ${l[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",p))return p;let[r=0,a=0,g=0]=(W[o]??"0,0,0").split(",").map((f)=>Number.parseInt(f,10));return`rgb(${r} ${a} ${g})`}var Ao=`<div class="wtopbar">
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
`;class R{bot;image;width;exactColor;static async fromJSON(o,l){let p=new Image;return p.src=l.url.startsWith("http")?await fetch(l.url,{cache:"no-store"}).then((r)=>r.blob()).then((r)=>URL.createObjectURL(r)):l.url,await Z(p,["load"],["error"]),new R(o,p,l.width,l.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,l,p=l.naturalWidth,r=!1){this.bot=o;this.image=l;this.width=p;this.exactColor=r;if(r)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let p=1;p<64;p++)if(this.exactColor||!this.bot.unavailableColors.has(p))o.set(W[p],[p,p]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let l=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let p=0;p<this.canvas.height;p++)for(let r=0;r<this.canvas.width;r++){let a=(p*this.canvas.width+r)*4,g=l[a],f=l[a+1],c=l[a+2],s=l[a+3],w=g,u=f,n=c,i=`${w},${u},${n}`;if(this.exactColor){this.pixels[p][r]=s<100?0:W.indexOf(i);continue}let b,m;if(s<100)b=m=0;else if(o.has(i))[b,m]=o.get(i);else{let A=1/0,M=1/0;for(let H=0;H<V.length;H++){let N=V[H],D=zo(mo(w,u,n),N,0);if(!this.bot.unavailableColors.has(H)&&D<A)A=D,b=H;if(D<M)M=D,m=H}o.set(i,[b,m])}if(b!==0)this.context.fillStyle=`oklab(${V[b][0]*100}% ${V[b][1]} ${V[b][2]})`,this.context.fillRect(r,p,1,1);this.pixels[p][r]=b;let z=this.colors.get(m);if(z)z.amount++;else this.colors.set(m,{color:b,amount:1,realColor:m})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var B="kglacer-macro-settings",Ho=["kglacermacro","wbot"],X="kgm";function Lo(){let o=[B,...Ho];for(let l=0;l<o.length;l++){let p=o[l],r=localStorage.getItem(p);if(!r)continue;return{json:r,key:p}}return}function Po(){let o=Lo();if(!o)return;let l;try{if(l=JSON.parse(o.json),typeof l!=="object")throw new Error("NOT VALID SAVE");if(l.version===1){let p=l;l.images=p.widget.images,l.strategy=p.widget.strategy,delete p.widget}if(o.key!==B)localStorage.setItem(B,o.json)}catch{localStorage.removeItem(o.key),l=void 0}return l}var Mo;function F(o,l=!1){if(clearTimeout(Mo),l)localStorage.setItem(B,JSON.stringify(o));else Mo=setTimeout(()=>{localStorage.setItem(B,JSON.stringify(o))},600)}var P=1000,Bo=2048,h=P*Bo,S=[],T=[],ho=Date.now();function I(o){S.push(o),T.push({id:ho++,latitude:(2*Math.atan(Math.exp(-(o.y/h*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/h*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:h/3|0,y:h/3|0});I({x:h/3*2|0,y:h/3*2|0});function k(o){let[l,p]=o.style.transform.slice(32,-31).split(", ").map((r)=>Number.parseFloat(r));return{x:l,y:p}}class J{bot;static fromJSON(o,l){return new J(o,...l)}static fromScreenPosition(o,l){let{anchorScreenPosition:p,pixelSize:r,anchorWorldPosition:a}=o.findAnchorsForScreen(l);return new J(o,a.x+(l.x-p.x)/r|0,a.y+(l.y-p.y)/r|0)}globalX=0;globalY=0;get tileX(){return this.globalX/P|0}set tileX(o){this.globalX=o*P+this.x}get tileY(){return this.globalY/P|0}set tileY(o){this.globalY=o*P+this.y}get x(){return this.globalX%P}set x(o){this.globalX=this.tileX*P+o}get y(){return this.globalY%P}set y(o){this.globalY=this.tileY*P+o}anchor1Index;anchor2Index;get pixelSize(){return(k(this.bot.$stars[this.anchor2Index]).x-k(this.bot.$stars[this.anchor1Index]).x)/(S[this.anchor2Index].x-S[this.anchor1Index].x)}constructor(o,l,p,r,a){this.bot=o;if(r===void 0||a===void 0)this.globalX=l,this.globalY=p;else this.globalX=l*P+r,this.globalY=p*P+a;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,l=1/0;for(let p=0;p<S.length;p++){let{x:r,y:a}=S[p];if(r<this.globalX&&a<this.globalY){let g=this.globalX-r+(this.globalY-a);if(g<o)o=g,this.anchor1Index=p}else if(r>this.globalX&&a>this.globalY){let g=r-this.globalX+(a-this.globalY);if(g<l)l=g,this.anchor2Index=p}}}toScreenPosition(){let o=S[this.anchor1Index],l=k(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+l.x,y:(this.globalY-o.y)*this.pixelSize+l.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:l}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:l-window.innerHeight/3})}clone(){return new J(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class t extends _{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,l){return new t(o,J.fromJSON(o,l.position),await R.fromJSON(o,l.pixels),l.strategy,l.opacity,l.drawTransparentPixels,l.drawColorsInOrder,l.colors,l.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,l,p,r="SPIRAL_FROM_CENTER",a=50,g=!1,f=!1,c=[],s=!1){super();this.bot=o;this.position=l;this.pixels=p;this.strategy=r;this.opacity=a;this.drawTransparentPixels=g;this.drawColorsInOrder=f;this.colors=c;this.lock=s;this.element.innerHTML=Ao,this.element.classList.add("wimage"),U(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();F(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),F(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),F(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,F(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,F(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),F(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(w)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(w.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(w)=>{if(w.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let w of this.element.querySelectorAll(".resize"))this.registerEvent(w,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),l=new Set,p=new Map;for(let r=0;r<this.colors.length;r++){let a=this.colors[r];if(a.disabled)l.add(a.realColor);p.set(a.realColor,r)}for(let{x:r,y:a}of this.strategyPositionIterator()){let g=this.pixels.pixels[a][r];if(l.has(g))continue;o.globalX=this.position.globalX+r,o.globalY=this.position.globalY+a;let f=o.getMapColor();if(g!==f&&(this.drawTransparentPixels||g!==0))this.tasks.push({position:o.clone(),color:g})}if(this.drawColorsInOrder)this.tasks.sort((r,a)=>(p.get(r.color)??0)-(p.get(a.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:l}=this.position.toScreenPosition(),p=this.position.pixelSize*this.pixels.width,r=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${l.toFixed(3)}px, 0)`,this.element.style.width=`${p}px`,this.element.style.height=`${r}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let a=this.pixels.pixels.length*this.pixels.pixels[0].length,g=Math.max(0,a-this.tasks.length),f=a>0?g/a*100|0:0;this.$progressText.textContent=`${g}/${a} ${f}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${f/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let c of this.element.querySelectorAll(".resize"))c.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),ro(this.bot.images,this),this.bot.widget.update(),F(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let p=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-p.left,offsetY:o.clientY-p.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let l=this.$colorsDialog.getBoundingClientRect(),p=Math.max(8,window.innerWidth-l.width-8),r=Math.max(8,window.innerHeight-l.height-8),a=Math.min(p,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),g=Math.min(r,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(a)}px`,this.$colorsDialog.style.top=`${Math.round(g)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let l=document.createDocumentFragment(),p=document.createElement("article");p.className="preview-card";let r=document.createElement("strong");r.textContent=this.getStrategyLabel(o);let a=document.createElement("canvas");a.className="preview-canvas",a.width=156,a.height=156,this.paintStrategyPreview(a,o),p.append(r,a),l.append(p),this.$previewDialogList.append(l)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((p,r)=>`${r}:${p.realColor}:${p.disabled?1:0}`).join("|"),l=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===l)return;this.previewCacheSignature=l,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return d("random");case"HUMANIZED":return d("humanized");case"HUMAN_SOFT_DITHER":return d("humanSoftDither");case"HUMAN_PATCHY":return d("humanPatchy");case"HUMAN_SWEEP_ARCS":return d("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return d("humanMicroCorrections");case"HUMAN_JITTER_FILL":return d("humanJitterFill");case"HUMAN_CORNER_BIAS":return d("humanCornerBias");case"HUMAN_LONG_STROKES":return d("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return d("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return d("humanMessySpiral");case"HUMAN_DRUNK_WALK":return d("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return d("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return d("humanPatchJump");case"HUMAN_HESITANT_LINES":return d("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return d("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return d("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return d("humanGapRecovery");case"HUMAN_STAIRCASE":return d("humanStaircase");case"HUMAN_EDGE_HUGGER":return d("humanEdgeHugger");case"HUMAN_BLOBS":return d("humanBlobs");case"HUMAN_BACKTRACK":return d("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return d("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return d("humanLateFixes");case"ZIGZAG":return d("zigzag");case"BRUSH_STROKES":return d("brushStrokes");case"DIAGONAL_BRUSH":return d("diagonalBrush");case"DOWN":return d("down");case"UP":return d("up");case"LEFT":return d("left");case"RIGHT":return d("right");case"SPIRAL_FROM_CENTER":return d("spiralOut");case"SPIRAL_TO_CENTER":return d("spiralIn");case"SCRIBBLE":return d("scribble");case"CROSSHATCH":return d("crosshatch");case"WAVE_SWEEP":return d("waveSweep");case"SCATTERED_LINES":return d("scatteredLines");case"CONTOUR_JITTER":return d("contourJitter");case"SPIRAL_WOBBLE":return d("spiralWobble");case"CLUSTER_BURSTS":return d("clusterBursts");case"ORBITAL":return d("orbital");case"FLOW_FIELD":return d("flowField");case"EDGE_IN":return d("edgeIn");default:return o}}paintStrategyPreview(o,l){let p=o.getContext("2d");if(!p)return;p.fillStyle="#0f1526",p.fillRect(0,0,o.width,o.height);let r=this.getSampledImagePreviewData(),a=this.getCachedPreviewSequence(l,r.mask,r.width,r.height),g=Math.min(o.width/r.width,o.height/r.height),f=(o.width-r.width*g)/2,c=(o.height-r.height*g)/2,s=this.previewAnimations.get(o);if(s)cancelAnimationFrame(s),this.previewAnimationHandles.delete(s);let w=(A)=>{let M=requestAnimationFrame((H)=>{this.previewAnimationHandles.delete(M),A(H)});return this.previewAnimationHandles.add(M),M},u=(A)=>{p.fillStyle="#0f1526",p.fillRect(0,0,o.width,o.height);for(let M=0;M<Math.min(A,a.length);M++){let H=a[M],N=r.colors.get(`${H.x}:${H.y}`)??0;if(!N)continue;p.fillStyle=fo(N),p.fillRect(f+H.x*g,c+H.y*g,Math.max(1,g),Math.max(1,g))}},n=Math.min(3400,Math.max(900,a.length*8)),b=n+220,m=(A,M)=>{if(!this.$previewDialog.open)return;let H=(M-A)%b,N=Math.min(1,H/n),D=N*N*(3-2*N);u(Math.floor(a.length*D));let G=w((C)=>{m(A,C)});this.previewAnimations.set(o,G)},z=performance.now();m(z,z)}getCachedPreviewSequence(o,l,p=this.pixels.width,r=this.pixels.height){let a=this.colors.map((s,w)=>`${w}:${s.realColor}:${s.disabled?1:0}`).join("|"),g=`${o}:${p}x${r}:${l.length}:${this.drawColorsInOrder?1:0}:${a}`,f=this.previewSequenceCache.get(g);if(f)return f;let c=p===this.pixels.width&&r===this.pixels.height?this.getExactPreviewSequence(o,l):this.getApproxPreviewSequence(o,l,p);if(this.drawColorsInOrder){let s=new Map;for(let w=0;w<this.colors.length;w++)s.set(this.colors[w].realColor,w);c.sort((w,u)=>(s.get(this.pixels.pixels[w.y]?.[w.x]??0)??0)-(s.get(this.pixels.pixels[u.y]?.[u.x]??0)??0))}return this.previewSequenceCache.set(g,c),c}getExactPreviewSequence(o,l){let p=this.strategy;this.strategy=o;let r=[...this.strategyPositionIterator()];this.strategy=p;let a=new Set(l.map(({x:g,y:f})=>`${g}:${f}`));return r.filter(({x:g,y:f})=>a.has(`${g}:${f}`))}getApproxPreviewSequence(o,l,p){let r=[...l],a=(c,s,w)=>{return(c*73856093+s*19349663+w*83492791>>>0)/4294967296},g=(c,s)=>r.sort((w,u)=>w.x*c+w.y*s-(u.x*c+u.y*s)||w.y-u.y||w.x-u.x),f=r.sort((c,s)=>{if(c.y!==s.y)return c.y-s.y;let w=c.y%2===0?c.x:p-c.x,u=s.y%2===0?s.x:p-s.x;return w-u});switch(o){case"UP":return g(0,-1);case"LEFT":return g(-1,0);case"RIGHT":return g(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let c=p/2,s=Math.max(1,Math.round(r.reduce((w,u)=>w+u.y,0)/Math.max(1,r.length)));return r.sort((w,u)=>{let n=(w.x-c)**2+(w.y-s)**2,i=(u.x-c)**2+(u.y-s)**2;return o==="SPIRAL_FROM_CENTER"?n-i:i-n}),r}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return r.sort((c,s)=>a(c.x,c.y,o.length)-a(s.x,s.y,o.length));default:return f}}getSampledImagePreviewData(){let o=this.pixels.width,l=this.pixels.height,p=t.PREVIEW_MASK_BASE_WIDTH,r=t.PREVIEW_MASK_BASE_HEIGHT,a=Math.min(1,p/Math.max(1,o),r/Math.max(1,l)),g=Math.max(1,Math.round(o*a)),f=Math.max(1,Math.round(l*a)),c=new Set;for(let n=0;n<this.colors.length;n++){let i=this.colors[n];if(i.disabled)c.add(i.realColor)}let s=new Map,w=new Map;for(let n=0;n<l;n++)for(let i=0;i<o;i++){let b=this.pixels.pixels[n]?.[i]??0;if(!b||c.has(b))continue;let m=Math.min(g-1,Math.floor(i/o*g)),z=Math.min(f-1,Math.floor(n/l*f)),A=`${m}:${z}`;if(!s.has(A))s.set(A,{x:m,y:z});if(!w.has(A))w.set(A,b)}let u=[...s.values()];if(!u.length){let n=this.fallbackPreviewMask();return{width:o,height:l,mask:n,colors:new Map(n.map((i)=>[`${i.x}:${i.y}`,this.pixels.pixels[i.y]?.[i.x]??0]))}}return{width:g,height:f,mask:u,colors:w}}getImagePreviewMask(){let o=this.pixels.width,l=this.pixels.height,p=new Set;for(let a=0;a<this.colors.length;a++){let g=this.colors[a];if(g.disabled)p.add(g.realColor)}let r=[];for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=this.pixels.pixels[a]?.[g]??0;if(f!==0&&!p.has(f))r.push({x:g,y:a})}return r.length?r:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],l=this.pixels.width/2,p=this.pixels.height/2,r=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let a=0;a<this.pixels.height;a++)for(let g=0;g<this.pixels.width;g++)if((g-l)**2+(a-p)**2<=r**2)o.push({x:g,y:a});return o}applyLocale(){if(U(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let l=W[o]??"0,0,0",[p=0,r=0,a=0]=l.split(",").map((g)=>Number.parseInt(g,10));return`#${[p,r,a].map((g)=>g.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let l=W[o]??"0,0,0",[p=0,r=0,a=0]=l.split(",").map((s)=>Number.parseInt(s,10)),g=Math.max(p,r,a),f=Math.min(p,r,a);if(g-f<15)return["gray","grey","gris","neutral","neutro"];if(p>r+30&&p>a+30)return["red","rojo"];if(r>p+30&&r>a+30)return["green","verde"];if(a>p+30&&a>r+30)return["blue","azul"];if(p>170&&r>120&&a<130)return["orange","naranja"];if(p>170&&r>110&&a>140)return["pink","rosa"];if(p>120&&r<100&&a>120)return["purple","violet","morado"];if(p>130&&r>130&&a<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",d("colorPanelResults"));let l=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((p)=>!this.pixels.colors.has(p.realColor)))this.colors=this.pixels.colors.values().toArray().sort((p,r)=>r.amount-p.amount).map((p)=>({realColor:p.realColor,disabled:!1})),F(this.bot);for(let p=0;p<this.colors.length;p++){let r=this.colors[p],a=this.pixels.colors.get(r.realColor),g=!1,f=a.realColor!==a.color,c=a.amount/o*100,s=this.colorHex(a.realColor),w=this.colorKeywords(a.realColor),u=()=>{r.disabled=r.disabled?void 0:!0,n.classList.toggle("disabled",Boolean(r.disabled));let b=n.querySelector(".state");if(b)b.textContent=r.disabled?d("disabled"):d("enabled");F(this.bot)},n=document.createElement("button");if(n.className=`color-chip ${r.disabled?"disabled":""}`,n.draggable=!0,n.setAttribute("aria-label",`${d("overlayColors")} #${p+1}: ${s.toUpperCase()}`),n.innerHTML=`<span class="order-index">#${p+1}</span>
<span class="drag" title="${d("up")} / ${d("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${c.toFixed(1)}%</span>
  <span class="hex">${s.toUpperCase()}</span>
  <span class="state">${r.disabled?d("disabled"):d("enabled")}</span>
</span>
<span class="premium ${f?"on":""}">${f?d("premium"):""}</span>`,n.querySelector(".swatch").style.setProperty("--swatch-color",fo(a.realColor)),n.addEventListener("click",()=>{if(g){g=!1;return}u()}),n.addEventListener("dragstart",(b)=>{g=!0,n.classList.add("dragging"),b.dataTransfer?.setData("text/plain",String(p)),b.dataTransfer.effectAllowed="move"}),n.addEventListener("dragend",()=>{n.classList.remove("dragging")}),n.addEventListener("dragover",(b)=>{b.preventDefault(),n.classList.add("drag-target")}),n.addEventListener("dragleave",()=>{n.classList.remove("drag-target")}),n.addEventListener("drop",(b)=>{b.preventDefault(),n.classList.remove("drag-target");let m=Number.parseInt(b.dataTransfer?.getData("text/plain")??"-1",10);if(m<0||m===p||m>=this.colors.length)return;this.colors.splice(p,0,...this.colors.splice(m,1)),F(this.bot),this.updateColors()}),f){let b=document.createElement("button");b.textContent=d("buy"),b.className="buy-chip",b.addEventListener("click",(m)=>{m.stopPropagation(),document.getElementById("color-"+a.realColor)?.click()}),n.append(b)}let i=`${s} ${w.join(" ")} ${a.realColor} ${W[a.realColor]}`;if(!l||i.toLowerCase().includes(l))this.$colorsDialogList.append(n)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,l=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let p=0;p<l;p++)for(let r=0;r<o;r++)yield{x:r,y:p};break}case"UP":{for(let p=l-1;p>=0;p--)for(let r=0;r<o;r++)yield{x:r,y:p};break}case"LEFT":{for(let p=0;p<o;p++)for(let r=0;r<l;r++)yield{x:p,y:r};break}case"RIGHT":{for(let p=o-1;p>=0;p--)for(let r=0;r<l;r++)yield{x:p,y:r};break}case"RANDOM":{let p=[];for(let r=0;r<l;r++)for(let a=0;a<o;a++)p.push({x:a,y:r});for(let r=p.length-1;r>=0;r--){let a=Math.floor(Math.random()*(r+1)),g=p[r];p[r]=p[a],p[a]=g}yield*p;break}case"ZIGZAG":{for(let p=0;p<l;p++)if(p%2===0)for(let r=0;r<o;r++)yield{x:r,y:p};else for(let r=o-1;r>=0;r--)yield{x:r,y:p};break}case"HUMANIZED":{let p=Math.max(4,Math.floor(Math.min(o,l)/10)),r=[];for(let a=0;a<l;a+=p)for(let g=0;g<o;g+=p)r.push({x:g,y:a});for(let a=r.length-1;a>=0;a--){let g=Math.floor(Math.random()*(a+1)),f=r[a];r[a]=r[g],r[g]=f}for(let a=0;a<r.length;a++){let g=r[a],f=Math.min(l,g.y+p),c=Math.min(o,g.x+p);for(let s=g.y;s<f;s++)if(Math.random()>0.35)for(let u=g.x;u<c;u++)yield{x:u,y:s};else for(let u=c-1;u>=g.x;u--)yield{x:u,y:s}}break}case"HUMAN_SOFT_DITHER":{let p=new Set;for(let r=0;r<l;r++){let a=Math.floor(Math.random()*3)-1;if((r+a)%2===0)for(let f=0;f<o;f+=2)p.add(`${f},${r}`),yield{x:f,y:r};else for(let f=1;f<o;f+=2)p.add(`${f},${r}`),yield{x:f,y:r}}for(let r=0;r<l;r++)for(let a=0;a<o;a++){let g=`${a},${r}`;if(p.has(g))continue;yield{x:a,y:r}}break}case"HUMAN_PATCHY":{let p=new Set,r=o*l;while(p.size<r){let a=Math.floor(Math.random()*o),g=Math.floor(Math.random()*l),f=1+Math.floor(Math.random()*5);for(let c=g-f;c<=g+f;c++)for(let s=a-f;s<=a+f;s++){if(s<0||s>=o||c<0||c>=l)continue;if(Math.hypot(s-a,c-g)>f+Math.random()*1.2)continue;let w=`${s},${c}`;if(p.has(w))continue;p.add(w),yield{x:s,y:c}}}break}case"HUMAN_SWEEP_ARCS":{let p=new Set,r=(o-1)/2,a=(l-1)/2,g=Math.hypot(r,a);for(let f=0;f<4;f++){let c=Math.random()*Math.PI*2;for(let s=0;s<=g;s+=0.35){let w=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(s*8));for(let n=0;n<u;n++){let i=c+w*n/u+Math.sin(s)*0.08,b=Math.round(r+Math.cos(i)*s),m=Math.round(a+Math.sin(i)*s);if(b<0||b>=o||m<0||m>=l)continue;let z=`${b},${m}`;if(p.has(z))continue;p.add(z),yield{x:b,y:m}}}}for(let f=0;f<l;f++)for(let c=0;c<o;c++){let s=`${c},${f}`;if(p.has(s))continue;yield{x:c,y:f}}break}case"HUMAN_MICRO_CORRECTIONS":{let p=new Set;for(let r=0;r<l;r++){let a=r%2===0?1:-1,g=a>0?0:o-1;for(let f=0;f<o;f++){let c=g+(Math.random()>0.82?a:0),s=r+(Math.random()>0.9?1:0);for(let w of[{x:g,y:r},{x:c,y:r},{x:g,y:s}]){if(w.x<0||w.x>=o||w.y<0||w.y>=l)continue;let u=`${w.x},${w.y}`;if(p.has(u))continue;p.add(u),yield w}g+=a}}for(let r=0;r<l;r++)for(let a=0;a<o;a++){let g=`${a},${r}`;if(p.has(g))continue;yield{x:a,y:r}}break}case"HUMAN_JITTER_FILL":{let p=[];for(let r=0;r<l;r++)for(let a=0;a<o;a++)p.push({x:a,y:r});p.sort((r,a)=>{let g=r.y+(Math.random()-0.5)*1.8,f=a.y+(Math.random()-0.5)*1.8;if(g!==f)return g-f;return r.x+(Math.random()-0.5)*2-(a.x+(Math.random()-0.5)*2)}),yield*p;break}case"HUMAN_CORNER_BIAS":{let p=[{x:0,y:0},{x:o-1,y:0},{x:0,y:l-1},{x:o-1,y:l-1}],r=p[Math.floor(Math.random()*p.length)],a=[];for(let g=0;g<l;g++)for(let f=0;f<o;f++){let s=Math.hypot(f-r.x,g-r.y)+Math.random()*3.5;a.push({point:{x:f,y:g},score:s})}a.sort((g,f)=>g.score-f.score);for(let g of a)yield g.point;break}case"HUMAN_LONG_STROKES":{let p=new Set,r=o*l;while(p.size<r){let a=Math.floor(Math.random()*o),g=Math.floor(Math.random()*l),f=Math.random()*Math.PI*2,c=Math.sign(Math.cos(f)),s=Math.sign(Math.sin(f)),w=10+Math.floor(Math.random()*40);for(let u=0;u<w;u++){if(a<0||a>=o||g<0||g>=l)break;let n=`${a},${g}`;if(!p.has(n))p.add(n),yield{x:a,y:g};if(Math.random()>0.78)a+=s,g+=c;else a+=c,g+=s}}break}case"HUMAN_TAP_CLUSTERS":{let p=new Set,r=o*l;while(p.size<r){let a=Math.floor(Math.random()*o),g=Math.floor(Math.random()*l),f=3+Math.floor(Math.random()*10);for(let c=0;c<f;c++){let s=Math.round(a+(Math.random()-0.5)*6),w=Math.round(g+(Math.random()-0.5)*6);if(s<0||s>=o||w<0||w>=l)continue;let u=`${s},${w}`;if(p.has(u))continue;p.add(u),yield{x:s,y:w}}}break}case"HUMAN_MESSY_SPIRAL":{let p=new Set,r=(o-1)/2,a=(l-1)/2,g=Math.hypot(r,a)+2;for(let f=0;p.size<o*l;f++){let c=f/3,s=Math.min(g,c*0.18),w=c*0.29+Math.sin(c*0.13)*0.8,u=Math.round(r+Math.cos(w)*s+Math.sin(c)*0.7),n=Math.round(a+Math.sin(w)*s+Math.cos(c)*0.7);if(u<0||u>=o||n<0||n>=l){if(f>o*l*18)break;continue}let i=`${u},${n}`;if(p.has(i)){if(Math.random()>0.9)continue}else p.add(i),yield{x:u,y:n};if(f>o*l*18)break}for(let f=0;f<l;f++)for(let c=0;c<o;c++){let s=`${c},${f}`;if(p.has(s))continue;yield{x:c,y:f}}break}case"HUMAN_DRUNK_WALK":{let p=new Set,r=Math.floor(Math.random()*o),a=Math.floor(Math.random()*l),g=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(p.size<o*l){let f=`${r},${a}`;if(!p.has(f))p.add(f),yield{x:r,y:a};let c=[];for(let u of g){let n=r+u.x,i=a+u.y;if(n<0||n>=o||i<0||i>=l)continue;c.push({x:n,y:i})}if(!c.length)break;let s=c.filter((u)=>{return!p.has(`${u.x},${u.y}`)});if(s.length&&Math.random()>0.2){let u=s[Math.floor(Math.random()*s.length)];r=u.x,a=u.y;continue}let w=c[Math.floor(Math.random()*c.length)];r=w.x,a=w.y}for(let f=0;f<l;f++)for(let c=0;c<o;c++){let s=`${c},${f}`;if(p.has(s))continue;yield{x:c,y:f}}break}case"HUMAN_NOISE_CLOUD":{let p=[];for(let r=0;r<l;r++)for(let a=0;a<o;a++){let g=Math.sin((a+1)*0.93+Math.random()*0.8)+Math.cos((r+1)*1.17+Math.random()*0.8),f=(Math.random()-0.5)*2.6,c=Math.hypot(a-o/2,r-l/2)*0.08;p.push({point:{x:a,y:r},score:g+f+c})}p.sort((r,a)=>r.score-a.score);for(let r of p)yield r.point;break}case"HUMAN_PATCH_JUMP":{let p=new Set,r=[];for(let a=0;a<Math.max(6,o*l/18);a++)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*l)});while(p.size<o*l){let a=r[Math.floor(Math.random()*r.length)],g=1+Math.floor(Math.random()*3),f=1+Math.floor(Math.random()*3);for(let c=a.y-f;c<=a.y+f;c++)for(let s=a.x-g;s<=a.x+g;s++){if(s<0||s>=o||c<0||c>=l)continue;if(Math.random()>0.86)continue;let w=`${s},${c}`;if(p.has(w))continue;p.add(w),yield{x:s,y:c}}if(Math.random()>0.72&&r.length<o*l/2)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*l)});if(p.size>o*l*0.92)break}for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=`${g},${a}`;if(p.has(f))continue;yield{x:g,y:a}}break}case"HUMAN_HESITANT_LINES":{let p=new Set;for(let r=0;r<l;r++){let a=r%2===0;for(let g=0;g<o;g++){let f=a?g:o-1-g,c=`${f},${r}`;if(!p.has(c))p.add(c),yield{x:f,y:r};if(Math.random()>0.7){let s=Math.max(0,Math.min(o-1,f+(Math.random()>0.5?1:-1))),w=Math.max(0,Math.min(l-1,r+(Math.random()>0.65?1:0))),u=`${s},${w}`;if(!p.has(u))p.add(u),yield{x:s,y:w}}}}for(let r=0;r<l;r++)for(let a=0;a<o;a++){let g=`${a},${r}`;if(p.has(g))continue;yield{x:a,y:r}}break}case"HUMAN_OVERLAP_SWEEPS":{let p=[],r=Math.random()*Math.PI*2;for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=Math.sin((g+a)*0.42+r)*2.2,c=Math.cos((g-a)*0.3+r)*1.4;p.push({point:{x:g,y:a},score:a+f+c+(Math.random()-0.5)*3.4})}p.sort((a,g)=>a.score-g.score);for(let a of p)yield a.point;break}case"HUMAN_WOBBLE_DRIFT":{let p=[],r=o/2,a=l/2;for(let g=0;g<l;g++)for(let f=0;f<o;f++){let c=Math.hypot(f-r,g-a)*0.25,s=Math.sin((f+1)*0.9)*1.8+Math.cos((g+1)*1.1)*1.8+Math.sin((f+g)*0.35)*1.4;p.push({point:{x:f,y:g},score:c+s+(Math.random()-0.5)*2.8})}p.sort((g,f)=>g.score-f.score);for(let g of p)yield g.point;break}case"HUMAN_GAP_RECOVERY":{let p=new Set,r=[];for(let a=0;a<l;a++)for(let g=0;g<o;g++){if(Math.random()>0.87){r.push({x:g,y:a});continue}p.add(`${g},${a}`),yield{x:g,y:a}}r.sort((a,g)=>Math.hypot(a.x-o/2,a.y-l/2)-Math.hypot(g.x-o/2,g.y-l/2));for(let a of r){let g=`${a.x},${a.y}`;if(p.has(g))continue;p.add(g),yield a}break}case"HUMAN_STAIRCASE":{let p=new Set,r=o+l-1;for(let a=0;a<r;a++){let g=Math.max(0,a-o+1),f=Math.min(l-1,a);for(let c=g;c<=f;c++){let s=a-c,w=[{x:s,y:c},{x:s+(Math.random()>0.5?1:-1),y:c},{x:s,y:c+(Math.random()>0.5?1:-1)}];for(let u of w){if(u.x<0||u.x>=o||u.y<0||u.y>=l)continue;let n=`${u.x},${u.y}`;if(p.has(n))continue;p.add(n),yield u}}}for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=`${g},${a}`;if(p.has(f))continue;yield{x:g,y:a}}break}case"HUMAN_EDGE_HUGGER":{let p=[];for(let r=0;r<l;r++)for(let a=0;a<o;a++){let g=Math.min(a,r,o-1-a,l-1-r);p.push({point:{x:a,y:r},score:g*3.5+(Math.random()-0.5)*5.5})}p.sort((r,a)=>r.score-a.score);for(let r of p)yield r.point;break}case"HUMAN_BLOBS":{let p=new Set,r=o*l;while(p.size<r){let a=Math.floor(Math.random()*o),g=Math.floor(Math.random()*l),f=1+Math.floor(Math.random()*4);for(let c=g-f;c<=g+f;c++)for(let s=a-f;s<=a+f;s++){if(s<0||s>=o||c<0||c>=l)continue;let w=Math.atan2(c-g,s-a),u=f+Math.sin(w*3+Math.random())*0.8;if(Math.hypot(s-a,c-g)>u)continue;let n=`${s},${c}`;if(p.has(n))continue;p.add(n),yield{x:s,y:c}}}break}case"HUMAN_BACKTRACK":{let p=new Set,r=[];for(let a=0;a<l;a++)for(let g=0;g<o;g++)r.push({x:g,y:a});r.sort((a,g)=>a.y-g.y+(Math.random()-0.5)*2.2+(a.x-g.x)*0.04);for(let a=0;a<r.length;a++){let g=r[a],f=`${g.x},${g.y}`;if(p.has(f))continue;if(p.add(f),yield g,a>1&&Math.random()>0.74){let c=r[a-1],s=`${c.x},${c.y}`;if(!p.has(s))p.add(s),yield c}}for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=`${g},${a}`;if(p.has(f))continue;yield{x:g,y:a}}break}case"HUMAN_SHAKY_DIAGONAL":{let p=[];for(let r=0;r<l;r++)for(let a=0;a<o;a++){let g=Math.abs(a-r)*0.6,f=Math.sin(a*1.4+r*0.8)*1.8+Math.cos(r*1.1+a*0.5)*1.5;p.push({point:{x:a,y:r},score:g+f+(Math.random()-0.5)*3.2})}p.sort((r,a)=>r.score-a.score);for(let r of p)yield r.point;break}case"HUMAN_LATE_FIXES":{let p=[],r=[];for(let a=0;a<l;a++)for(let g=0;g<o;g++)if(Math.random()>0.9)r.push({x:g,y:a});else p.push({x:g,y:a});p.sort((a,g)=>a.y-g.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?a.x-g.x:0)),r.sort((a,g)=>Math.hypot(g.x-o/2,g.y-l/2)-Math.hypot(a.x-o/2,a.y-l/2)),yield*p,yield*r;break}case"DIAGONAL_BRUSH":{for(let p=0;p<o+l-1;p++){let r=p%2===0,a=[],g=Math.max(0,p-o+1),f=Math.min(l-1,p);for(let c=g;c<=f;c++){let s=p-c;if(s>=0&&s<o)a.push({x:s,y:c})}if(Math.random()>0.55)a.reverse();if(r)for(let c=a.length-1;c>=0;c--)yield a[c];else yield*a}break}case"BRUSH_STROKES":{let p=Array.from({length:l},()=>Array(o).fill(!1)),r=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],a=(c,s)=>c>=0&&c<o&&s>=0&&s<l,g=0,f=o*l;for(let c=0;c<f*6&&g<f;c++){let s=Math.floor(Math.random()*o),w=Math.floor(Math.random()*l),u=r[Math.floor(Math.random()*r.length)],n=3+Math.floor(Math.random()*16);for(let i=0;i<n;i++){if(!a(s,w))break;if(!p[w][s])p[w][s]=!0,g++,yield{x:s,y:w};if(Math.random()>0.72)u=r[Math.floor(Math.random()*r.length)];s+=u.x,w+=u.y}}for(let c=0;c<l;c++)for(let s=0;s<o;s++)if(!p[c][s])yield{x:s,y:c};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let p=new Set,r=o*l,a=Math.floor(o/2),g=Math.floor(l/2),f=[[1,0],[0,1],[-1,0],[0,-1]],c=0,s=1,w=(n,i)=>n>=0&&n<o&&i>=0&&i<l,u=function*(){let n=0;while(n<r){for(let i=0;i<2;i++){for(let b=0;b<s;b++){if(w(a,g)){let m=`${a},${g}`;if(!p.has(m)){if(p.add(m),yield{x:a,y:g},n++,n>=r)return}}a+=f[c][0],g+=f[c][1]}c=(c+1)%4}s++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let n=[...u()];for(let i=n.length-1;i>=0;i--)yield n[i]}break}case"SCRIBBLE":{let p=new Set,r=o*l,a=Math.floor(o/2),g=Math.floor(l/2);for(let f=0;p.size<r&&f<r*24;f++){let c=`${a},${g}`;if(!p.has(c))p.add(c),yield{x:a,y:g};if(a+=Math.floor(Math.random()*3)-1,g+=Math.floor(Math.random()*3)-1,a<0||a>=o||g<0||g>=l)a=Math.floor(Math.random()*o),g=Math.floor(Math.random()*l)}for(let f=0;f<l;f++)for(let c=0;c<o;c++){let s=`${c},${f}`;if(p.has(s))continue;p.add(s),yield{x:c,y:f}}break}case"CROSSHATCH":{let p=[];for(let g=0;g<o+l-1;g++)for(let f=Math.max(0,g-o+1);f<=Math.min(l-1,g);f++){let c=g-f;p.push({x:c,y:f})}let r=[];for(let g=-l+1;g<o;g++)for(let f=0;f<l;f++){let c=f+g;if(c>=0&&c<o)r.push({x:c,y:f})}let a=new Set;for(let g of[...p,...r]){let f=`${g.x},${g.y}`;if(a.has(f))continue;a.add(f),yield g}break}case"WAVE_SWEEP":{let p=new Set;for(let r=0;r<o;r++){let g=(Math.sin(r/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(l-1)|0;for(let f=0;f<l;f++){let c=g+f,s=g-f;for(let w of[c,s]){if(w<0||w>=l)continue;let u=`${r},${w}`;if(p.has(u))continue;p.add(u),yield{x:r,y:w}}}}break}case"SCATTERED_LINES":{let p=new Set,r=o*l;for(let a=0;p.size<r&&a<r*14;a++){let g=Math.floor(Math.random()*o),f=Math.floor(Math.random()*l),c=Math.random()*Math.PI*2,s=Math.round(Math.cos(c)),w=Math.round(Math.sin(c)),u=6+Math.floor(Math.random()*28);for(let n=0;n<u;n++){if(g<0||g>=o||f<0||f>=l)break;let i=`${g},${f}`;if(!p.has(i))p.add(i),yield{x:g,y:f};g+=s,f+=w}}for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=`${g},${a}`;if(p.has(f))continue;p.add(f),yield{x:g,y:a}}break}case"CONTOUR_JITTER":{let p=new Set;for(let r=0;r<Math.ceil(Math.min(o,l)/2);r++){let a=[],g=r,f=r,c=o-r-1,s=l-r-1;for(let w=g;w<=c;w++)a.push({x:w,y:f});for(let w=f+1;w<=s;w++)a.push({x:c,y:w});for(let w=c-1;w>=g;w--)a.push({x:w,y:s});for(let w=s-1;w>f;w--)a.push({x:g,y:w});for(let w=a.length-1;w>0;w--){let u=Math.floor(Math.random()*(w+1)),n=a[w];a[w]=a[u],a[u]=n}for(let w of a){let u=`${w.x},${w.y}`;if(p.has(u))continue;p.add(u),yield w}}break}case"SPIRAL_WOBBLE":{let p=new Set,r=o/2,a=l/2,g=Math.hypot(r,a);for(let f=0;p.size<o*l&&f<o*l*9;f++){let c=f/(o*l*9)*g,s=f*0.31+Math.sin(f*0.07)*0.7,w=Math.round(r+Math.cos(s)*c),u=Math.round(a+Math.sin(s)*c);if(w<0||w>=o||u<0||u>=l)continue;let n=`${w},${u}`;if(p.has(n))continue;p.add(n),yield{x:w,y:u}}for(let f=0;f<l;f++)for(let c=0;c<o;c++){let s=`${c},${f}`;if(p.has(s))continue;yield{x:c,y:f}}break}case"CLUSTER_BURSTS":{let p=new Set,r=o*l;for(let a=0;p.size<r&&a<r*12;a++){let g=Math.floor(Math.random()*o),f=Math.floor(Math.random()*l),c=2+Math.floor(Math.random()*10);for(let s=f-c;s<=f+c;s++)for(let w=g-c;w<=g+c;w++){if(w<0||w>=o||s<0||s>=l)continue;if(Math.hypot(w-g,s-f)>c)continue;let u=`${w},${s}`;if(p.has(u))continue;p.add(u),yield{x:w,y:s}}}for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=`${g},${a}`;if(p.has(f))continue;p.add(f),yield{x:g,y:a}}break}case"ORBITAL":{let p=new Set,r=(o-1)/2,a=(l-1)/2,g=Math.ceil(Math.max(r,a));for(let f=0;f<=g;f++){let c=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,f)*2));for(let s=0;s<c;s++){let w=s/c*Math.PI*2+(f%2?0.3:-0.3),u=Math.round(r+Math.cos(w)*f),n=Math.round(a+Math.sin(w)*f);if(u<0||u>=o||n<0||n>=l)continue;let i=`${u},${n}`;if(p.has(i))continue;p.add(i),yield{x:u,y:n}}}for(let f=0;f<l;f++)for(let c=0;c<o;c++){let s=`${c},${f}`;if(p.has(s))continue;yield{x:c,y:f}}break}case"FLOW_FIELD":{let p=new Set,r=o*l;for(let a=0;p.size<r&&a<r*18;a++){let g=Math.floor(Math.random()*o),f=Math.floor(Math.random()*l);for(let c=0;c<120;c++){if(g<0||g>=o||f<0||f>=l)break;let s=`${g},${f}`;if(!p.has(s))p.add(s),yield{x:g,y:f};let w=Math.sin(g*0.09)*1.8+Math.cos(f*0.08)*1.6+Math.sin((g+f)*0.05);g+=Math.round(Math.cos(w)),f+=Math.round(Math.sin(w))}}for(let a=0;a<l;a++)for(let g=0;g<o;g++){let f=`${g},${a}`;if(p.has(f))continue;p.add(f),yield{x:g,y:a}}break}case"EDGE_IN":{let p=new Set,r=Math.ceil(Math.min(o,l)/2);for(let a=0;a<r;a++){let g=a,f=o-1-a,c=a,s=l-1-a;for(let w=g;w<=f;w++)for(let u of[c,s]){let n=`${w},${u}`;if(p.has(n))continue;p.add(n),yield{x:w,y:u}}for(let w=c+1;w<=s-1;w++)for(let u of[g,f]){let n=`${u},${w}`;if(p.has(n))continue;p.add(n),yield{x:u,y:w}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),F(this.bot)}move(o){if(!this.moveInfo)return;let l=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),p=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=l+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-l)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,l+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=p+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-p)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,p+this.moveInfo.height);this.update(),F(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let l=o.target;if(l.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(l.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(l.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(l.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${X}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var No=`/* stylelint-disable declaration-no-important */
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
  width: min(340px, 92vw);
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
  margin-top: 4px;
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

.wwidget .widget-section-summary {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  list-style: none;
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

.wwidget .shortcuts {
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

.wwidget .shortcuts .shortcuts-summary {
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

.wwidget .shortcuts .shortcuts-summary:hover {
  background: rgb(129 151 240 / 10%);
}

.wwidget .shortcuts .shortcuts-summary::-webkit-details-marker {
  display: none;
}

.wwidget .shortcuts .shortcuts-summary-title {
  display: inline-flex;
  gap: 7px;
  align-items: center;
}

.wwidget .shortcuts .shortcuts-summary-title i {
  color: #9db3ff;
  font-size: 12px;
}

.wwidget .shortcuts .shortcuts-chevron {
  color: #8ea4ee;
  font-size: 10px;
  transition: transform 0.2s ease;
}

.wwidget .shortcuts[open] .shortcuts-chevron {
  transform: rotate(180deg);
}

.wwidget .shortcuts .shortcut-list {
  display: grid;
  gap: 6px;
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

.wwidget .shortcuts .shortcut-list::-webkit-scrollbar {
  width: 7px;
}

.wwidget .shortcuts .shortcut-list::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgb(16 24 43 / 75%);
}

.wwidget .shortcuts .shortcut-list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: linear-gradient(180deg, #6d7bff, #8ea4ee);
}

.wwidget .shortcuts .shortcut-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  padding: 5px 6px;
  border: 1px solid rgb(140 159 255 / 16%);
  border-radius: 8px;
  background: rgb(13 20 35 / 70%);
  text-align: left;
}

.wwidget .shortcuts .shortcut-label {
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

.wwidget .shortcuts .shortcut-label span {
  line-height: 1.25;
  white-space: normal;
  overflow-wrap: anywhere;
}

.wwidget .shortcuts .shortcut-label i {
  color: #8fd8ff;
  font-size: 12px;
}

.wwidget .shortcuts .shortcut-item-color-panel .shortcut-label i {
  color: var(--action-palette);
}

.wwidget .shortcuts .shortcut-item-lock-image .shortcut-label i {
  color: var(--action-lock);
}

.wwidget .shortcuts .shortcut-keys {
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
  justify-content: flex-start;
  align-items: center;
  place-self: center end;
}

.wwidget .shortcuts kbd {
  min-width: 22px;
  padding: 2px 6px;
  border: 1px solid rgb(141 160 255 / 34%);
  border-radius: 6px;
  background: linear-gradient(180deg, #273559, #1b2743);
  color: #ebf1ff;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
  font-weight: 700;
  font-size: 11px;
  font-family: Poppins, sans-serif;
  text-align: center;
}

.wwidget .shortcuts.shortcut-pulse {
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
  overflow: hidden;
  width: 100%;
  height: 34px;
  margin: 0;
  border: 1px solid rgb(129 140 248 / 28%);
  border-radius: 12px;
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
  border-radius: 10px;
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
  font-size: 11px;
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

  .wwidget .shortcuts .shortcut-item {
    grid-template-columns: minmax(0, 1fr);
    padding: 6px 7px;
  }

  .wwidget .shortcuts .shortcut-label,
  .wwidget .shortcuts kbd {
    font-size: 10px;
  }

  .wwidget .shortcuts .shortcut-keys {
    justify-self: start;
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,l){super(o);l.widget.status=o}}class co extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var Q={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function K(o,l){let p=l.key.toLowerCase(),r=o.key.toLowerCase(),g=p==="/"&&(r==="/"||r==="?"||o.code==="Slash")||r===p,f=l.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,c=l.ctrl===!0?!0:l.meta===!0?o.metaKey:!o.metaKey;return g&&o.shiftKey===Boolean(l.shift)&&f&&c&&o.altKey===Boolean(l.alt)}function Fo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let l=o.tagName.toLowerCase();return l==="input"||l==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Jo=`<button class="wopen-button" aria-label="Toggle widget">
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
    <div class="wprogress"><div></div><span></span></div>
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
    <button class="autooverlay-config"><i class="fa-solid fa-clock-rotate-left"></i><span data-i18n="configureAutoOverlay">Configure auto draw</span></button>
    <div class="wp autooverlay-status" data-i18n="autoOverlayStopped">Stopped</div>
    <div class="actions-inline">
      <button class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
      <button class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
    </div>
  </section>

  <details class="widget-section widget-section-strategy" open>
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

  <section class="widget-section widget-section-overlay">
    <div class="widget-actions">
      <strong data-i18n="overlaySection">Overlay</strong>
      <button class="toggle-overlay" data-i18n="toggleOverlay">Hide/show overlays</button>
    </div>
  </section>

  <section class="widget-section widget-section-autofarm">
    <div class="widget-actions">
      <strong data-i18n="autoFarmSection">Auto farm</strong>
      <button class="autofarm-config" data-i18n="configureAutoFarm">Configure auto farm</button>
      <div class="actions-inline">
        <button class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
        <button class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
      </div>
      <div class="wp autofarm-status" data-i18n="autoFarmStopped">Stopped</div>
    </div>
  </section>

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
`;var Do="kglacer-macro:overlay-hidden",Uo="kglacer-macro:auto-farm-config",Qo="kglacer-macro:auto-overlay-config",Oo="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class so extends _{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$openConfig;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Jo,U(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=Oo,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$openConfig.addEventListener("click",()=>{this.openSettingsModal()}),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()},1000),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(d("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${X}`,o.click(),await Z(o,["change"],["cancel","error"]);let l=o.files?.[0];if(!l)throw new co(this.bot);console.log("[KGM][Widget] File selected",{name:l.name,size:l.size,type:l.type});let p;if(l.name.endsWith(`.${X}`))p=await t.fromJSON(this.bot,JSON.parse(await l.text()));else{let r=new FileReader;r.readAsDataURL(l),await Z(r,["load"],["error"]);let a=await this.compressImageBeforeLoad(r.result),g=new Image;g.src=a,await Z(g,["load"],["error"]),await this.waitForStableViewportProjection(),p=new t(this.bot,J.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new R(this.bot,g))}this.bot.images.push(p),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),p.updateTasks(),F(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(d("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:l,minGlobalY:p,maxGlobalX:r,maxGlobalY:a}=o,g=document.createElement("canvas");g.width=Math.max(1,r-l+1),g.height=Math.max(1,a-p+1);let f=g.getContext("2d");if(!f)throw new Error("Capture context unavailable");f.imageSmoothingEnabled=!1;let c=Math.floor(l/P),s=Math.floor(p/P),w=Math.floor(r/P),u=Math.floor(a/P),n=(w-c+1)*(u-s+1),i=0;for(let m=c;m<=w;m++)for(let z=s;z<=u;z++){this.status=`⌛ ${d("taskReadingTiles")} [${++i}/${n}]`;let A=await this.loadTileImage(m,z),M=m*P,H=z*P,N=Math.max(l,M),D=Math.min(r,M+P-1),G=Math.max(p,H),C=Math.min(a,H+P-1),E=N-M,v=G-H,O=D-N+1,q=C-G+1,$=N-l,x=G-p;f.drawImage(A,E,v,O,q,$,x,O,q)}let b=Date.now();await this.downloadCapture(g,"png",b)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,l,p){let r=l==="webp"?"image/webp":"image/png",a=await new Promise((c,s)=>{o.toBlob((w)=>{if(!w){s(new Error(`Failed to create ${l.toUpperCase()} capture file`));return}c(w)},r)}),g=URL.createObjectURL(a),f=document.createElement("a");f.href=g,f.download=`wplace-capture-${p}.${l}`,f.click(),URL.revokeObjectURL(g)}async loadTileImage(o,l){let p;for(let r=1;r<=3;r++)try{let a=new Image;return a.crossOrigin="anonymous",a.referrerPolicy="no-referrer",a.src=`https://backend.wplace.live/files/s0/tiles/${o}/${l}.png?ts=${Date.now()}-${r}`,await Z(a,["load"],["error"]),a}catch(a){if(p=a,r<3)await new Promise((g)=>setTimeout(g,r*200))}throw p instanceof Error?p:new Error(`Tile fetch failed (${o}/${l})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,l)=>{let p=document.createElement("div");p.className="kgm-capture-overlay",p.innerHTML=`<div class="kgm-capture-hint">${d("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let r=p.querySelector(".kgm-capture-box");document.body.append(p);let a,g,f=()=>{window.removeEventListener("keydown",n,!0),p.removeEventListener("pointermove",w),p.removeEventListener("pointerdown",u),p.remove()},c=(i)=>{let b=Math.min(a.x,i.x),m=Math.min(a.y,i.y),z=Math.abs(a.x-i.x)+1,A=Math.abs(a.y-i.y)+1;return{left:b,top:m,width:z,height:A}},s=(i)=>{let{left:b,top:m,width:z,height:A}=c(i);r.style.left=`${b}px`,r.style.top=`${m}px`,r.style.width=`${z}px`,r.style.height=`${A}px`},w=(i)=>{if(!a)return;s({x:i.clientX,y:i.clientY})},u=(i)=>{if(i.preventDefault(),!a){a={x:i.clientX,y:i.clientY};let N=J.fromScreenPosition(this.bot,a);g={x:N.globalX,y:N.globalY},s(a);return}let b={x:i.clientX,y:i.clientY},m=J.fromScreenPosition(this.bot,b);if(f(),!g){l(new Error("Capture anchor point unavailable"));return}let z=Math.min(g.x,m.globalX),A=Math.min(g.y,m.globalY),M=Math.max(g.x,m.globalX),H=Math.max(g.y,m.globalY);if(M-z<1||H-A<1){l(new Error("Capture area too small"));return}o({minGlobalX:z,minGlobalY:A,maxGlobalX:M,maxGlobalY:H})},n=(i)=>{if(i.key!=="Escape")return;f(),l(new Error("Capture cancelled"))};window.addEventListener("keydown",n,!0),p.addEventListener("pointermove",w),p.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let l=new Image;if(l.src=o,await Z(l,["load"],["error"]),!(l.naturalWidth*l.naturalHeight>3000000||o.length>3000000))return o;let r=document.createElement("canvas");r.width=l.naturalWidth,r.height=l.naturalHeight;let a=r.getContext("2d");if(!a)return o;return a.drawImage(l,0,0),r.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),l=0,p;for(let r=0;r<45;r++){await new Promise((w)=>requestAnimationFrame(()=>{w()}));let{anchorScreenPosition:{x:a,y:g},pixelSize:f}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(f)||f<=0){l=0;continue}let c={anchorX:a,anchorY:g,pixelSize:f};if(!p){p=c,l=1;continue}if(Math.abs(c.anchorX-p.anchorX)+Math.abs(c.anchorY-p.anchorY)+Math.abs(c.pixelSize-p.pixelSize)<0.0012)l++;else l=0;if(p=c,l>=3)return}}update(){this.$strategy.value=this.bot.strategy;let o=0,l=0;for(let g=0;g<this.bot.images.length;g++){let f=this.bot.images[g];o+=f.pixels.pixels.length*f.pixels.pixels[0].length,l+=f.tasks.length}let p=Math.max(0,o-l),r=o>0?p/o*100|0:0;this.$progressText.textContent=`${p}/${o} ${r}% ETA: ${l/120|0}h`,this.$progressLine.style.transform=`scaleX(${r/100})`,this.$images.innerHTML="";let a=document.createDocumentFragment();for(let g=0;g<this.bot.images.length;g++){let f=this.bot.images[g],c=document.createElement("div");a.append(c),c.className="image",c.innerHTML=`<button class="preview" title="View preview">
  <img src="${f.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${g===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${g===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,c.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=g,f.openPreviewPanel()}),c.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=g,f.openColorPanel()}),c.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=g,f.openPreviewPanel()}),c.querySelector(".download").addEventListener("click",()=>{f.exportImage()}),c.querySelector(".delete").addEventListener("click",()=>{f.destroy()}),c.querySelector(".up").addEventListener("click",()=>{lo(this.bot.images,g,g-1),this.update(),F(this.bot)}),c.querySelector(".down").addEventListener("click",()=>{lo(this.bot.images,g,g+1),this.update(),F(this.bot)})}this.$images.append(a)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Do)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let l=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",l),localStorage.setItem(Do,String(l)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${d("toggleOverlay")} (${d("disabled")})`:`${d("toggleOverlay")} (${d("enabled")})`}applyLocaleToUI(o){oo(o),U(this.element);for(let l=0;l<this.bot.images.length;l++)this.bot.images[l].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button>
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
  <div class="autofarm-help">
    <strong><i class="fa-solid fa-keyboard"></i> <span data-i18n="keyboardShortcuts">Shortcuts</span></strong>
    <div data-i18n="shortcutsHelp">Shift+B toggle widget...</div>
  </div>
</form>`,document.body.append(o),U(o);let l=o.querySelector(".settings-locale");l.value=Y(),l.addEventListener("change",()=>{this.applyLocaleToUI(l.value),U(o)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=d("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${d("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:d("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=d("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${d("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:d("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let l=Math.max(0,o-Date.now()),p=Math.ceil(l/1000),r=Math.floor(p/60),a=p%60;return`next in ${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText()}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${d("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${d("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText();return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{if(!await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels,0)){this.status=`⚠️ ${d("autoFarmStopped")}: ${d("autoFarmTransparentUnavailable")}`,this.stopAutoFarm();return}await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;try{if(!await this.bot.drawOverlayPixelsBatch(this.autoOverlayConfig.pixels)){this.status=`⚠️ ${d("autoOverlayStopped")}: ${d("autoOverlayNoTasks")}`,this.stopAutoOverlay();return}await this.waitAndClickPaintButton()}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Uo,JSON.stringify(o))}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(Qo,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(Uo);if(!o)return;try{let l=JSON.parse(o);if(typeof l.value!=="number"||!Number.isFinite(l.value)||l.value<1)return;let p=typeof l.pixels==="number"&&Number.isFinite(l.pixels)&&l.pixels>=1?Math.floor(l.pixels):60,r=l.unit==="hours"||l.unit==="minutes"||l.unit==="seconds"?l.unit:"minutes",a=typeof l.timerMs==="number"&&l.timerMs>0?l.timerMs:r==="hours"?l.value*3600000:r==="minutes"?l.value*60000:l.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(l.value)),pixels:p,unit:r,timerMs:a}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=localStorage.getItem(Qo);if(!o)return;try{let l=JSON.parse(o);if(typeof l.value!=="number"||!Number.isFinite(l.value)||l.value<1)return;let p=typeof l.pixels==="number"&&Number.isFinite(l.pixels)&&l.pixels>=1?Math.floor(l.pixels):60,r=l.unit==="hours"||l.unit==="minutes"||l.unit==="seconds"?l.unit:"minutes",a=typeof l.timerMs==="number"&&l.timerMs>0?l.timerMs:r==="hours"?l.value*3600000:r==="minutes"?l.value*60000:l.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(l.value)),pixels:p,unit:r,timerMs:a}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let l=this.autoFarmConfig?.unit??"minutes",p=this.autoFarmConfig?.value??1,r=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${p}" />
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${r}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),U(o);let a=o.querySelector(".autofarm-unit");a.value=l;let g=o.querySelector(".autofarm-value"),f=o.querySelector(".autofarm-pixels"),c=()=>{let s=Math.max(1,Number.parseInt(g.value||"1",10));if(a.value==="hours")return s*3600000;if(a.value==="minutes")return s*60000;return s*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(f.value||"60",10)),unit:a.value,timerMs:c()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let l=this.autoOverlayConfig?.unit??"minutes",p=this.autoOverlayConfig?.value??1,r=this.autoOverlayConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${d("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoOverlayHelp">Paint overlay image pixels, click Paint, then repeat by timer.</p>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${p}" />
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${r}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),U(o);let a=o.querySelector(".autofarm-unit");a.value=l;let g=o.querySelector(".autofarm-value"),f=o.querySelector(".autofarm-pixels"),c=()=>{let s=Math.max(1,Number.parseInt(g.value||"1",10));if(a.value==="hours")return s*3600000;if(a.value==="minutes")return s*60000;return s*1000};o.querySelector(".autooverlay-start").onclick=()=>{this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(f.value||"60",10)),unit:a.value,timerMs:c()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,l){this.element.querySelector("."+o).disabled=l}async run(o,l,p,r="..."){console.log("[KGM][Widget] Task started",{status:o});let a=this.status;this.status=`${r} ${o}`;try{let g=await l();return this.status=a,console.log("[KGM][Widget] Task completed",{status:o}),g}catch(g){if(!(g instanceof ao))console.error(g),this.status=`${d("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:g}),g}finally{await p?.()}}handleKeyboard(o){if(Fo(o.target))return;if(K(o,Q.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(K(o,Q.showShortcuts)){o.preventDefault(),this.open=!0,this.openSettingsModal();return}if(K(o,Q.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(K(o,Q.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(K(o,Q.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(K(o,Q.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(K(o,Q.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(K(o,Q.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(K(o,Q.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(K(o,Q.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(K(o,Q.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(K(o,Q.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),F(this.bot)}async waitAndClickPaintButton(){await this.run(d("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){this.triggerNativePaintClick(o);return}await new Promise((l)=>setTimeout(l,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((p)=>Array.from(document.querySelectorAll(p))).find((p)=>/pintar|paint/i.test(p.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}}var Yo=2,Ko="[KGM]",jo="kglacer-macro:access-ok",wo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Go="kgm-access-locked";class qo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,l){if(l===void 0)console.log(`${Ko} ${o}`);else console.log(`${Ko} ${o}`,l)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Go);let o=Po();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let p=0;p<o.images.length;p++){let r=o.images[p];I({x:r.position[0]-1000,y:r.position[1]-1000}),I({x:r.position[0]+1000,y:r.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let l=document.createElement("style");l.textContent=No.replace("FAKE_FAVORITE_LOCATIONS",T.length.toString()),document.head.append(l),this.log("Styles injected",{fakeFavoriteLocations:T.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Go),this._widget=new so(this),await this.widget.run(d("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let p=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((r)=>{for(let a=0;a<r.length;a++)if(r[a].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(p,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await j(500),await this.updateColors(),o)for(let r=0;r<o.images.length;r++){let a=await t.fromJSON(this,o.images[r]);this.images.push(a),a.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(jo)===wo)return;await new Promise((o)=>{let l=document.createElement("dialog");l.className="kgm-modal access-dialog",l.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(l),U(l);let p=l.querySelector(".access-input"),r=l.querySelector(".access-error"),a=l.querySelector(".access-locale");a.innerHTML=bo().map((g)=>`<option value="${g}" ${g===Y()?"selected":""}>${g.toUpperCase()}</option>`).join(""),a.addEventListener("change",()=>{oo(a.value),U(l)}),l.addEventListener("cancel",(g)=>{g.preventDefault()}),l.querySelector("form").addEventListener("submit",(g)=>{g.preventDefault();let f=atob(wo);if(p.value.trim()!==f){r.textContent=d("invalidAccessKey");return}localStorage.setItem(jo,wo),l.close(),l.remove(),o()}),l.showModal(),p.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),l=(p)=>{if(!p.shiftKey)p.stopPropagation()};return this.widget.run(d("taskDrawing"),async()=>{await this.widget.run(d("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",l,!0),o.addEventListener("wheel",l,!0),this.updateTasks();let p=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((g)=>g.json()),r=Math.floor(p.charges.count);this.log("Charges fetched",{charges:r});let a=0;for(let g=0;g<this.images.length;g++)a+=this.images[g].tasks.length;switch(this.log("Tasks prepared",{tasks:a}),this.strategy){case"ALL":{while(r>0){let g=!0;for(let f=0;f<this.images.length;f++){let c=this.images[f].tasks.shift();if(!c)continue;this.drawTask(c),r--,await j(1),g=!1}if(g)break}break}case"PERCENTAGE":{for(let g=0;g<a&&r>0;g++){let f=1,c;for(let s=0;s<this.images.length;s++){let w=this.images[s],u=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(u<f)f=u,c=w}this.drawTask(c.tasks.shift()),r--,await j(1)}break}case"SEQUENTIAL":for(let g=0;g<this.images.length;g++){let f=this.images[g];for(let c=f.tasks.shift();c&&r>0;c=f.tasks.shift())this.drawTask(c),r--,await j(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:r})},()=>{globalThis.removeEventListener("mousemove",l,!0),o.removeEventListener("wheel",l,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:Yo,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let l=document.querySelector(".maplibregl-canvas"),p=window.innerWidth/2,r=window.innerHeight/2,a=p-o.x,g=r-o.y;function f(c,s,w){l.dispatchEvent(new MouseEvent(c,{bubbles:!0,cancelable:!0,clientX:s,clientY:w,buttons:1}))}f("mousedown",p,r),f("mousemove",a,g),f("mouseup",a,g)}readMap(){this.mapsCache.clear();let o=new Set;for(let p=0;p<this.images.length;p++){let r=this.images[p],{tileX:a,tileY:g}=new J(this,r.position.globalX+r.pixels.pixels[0].length,r.position.globalY+r.pixels.pixels.length);for(let f=r.position.tileX;f<=a;f++)for(let c=r.position.tileY;c<=g;c++)o.add(`${f}/${c}`)}let l=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${d("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(p)=>{this.mapsCache.set(p,await R.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${p}.png`,exactColor:!0})),this.widget.status=`⌛ ${d("taskReadingMap")} [${++l}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let l=0,p=1,r=1/0,a=1/0;for(let c=0;c<this.$stars.length;c++){let{x:s,y:w}=k(this.$stars[c]);if(s<o.x&&w<o.y){let u=o.x-s+(o.y-w);if(u<r)r=u,l=c}else if(s>o.x&&w>o.y){let u=s-o.x+(w-o.y);if(u<a)a=u,p=c}}let g=k(this.$stars[l]),f=S[l];return{anchorScreenPosition:g,anchorWorldPosition:f,pixelSize:(k(this.$stars[p]).x-g.x)/(S[p].x-f.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await j(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await j(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await j(1)}drawTask(o){if(this.lastColor!==o.color){let r=document.getElementById("color-"+o.color);if(!r){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}r.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let l=o.position.pixelSize/2,p=o.position.toScreenPosition();if(!Number.isFinite(p.x)||!Number.isFinite(p.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:p.x+l,clientY:p.y+l,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((i)=>!i.disabled&&i.getAttribute("aria-disabled")!=="true"&&i.offsetParent!==null);if(!o.length)return;let l=o[Math.floor(Math.random()*o.length)],p=Number.parseInt(l.id.slice(6),10);if(!Number.isFinite(p))return;let r=document.querySelector(".maplibregl-canvas");if(!r)return;let a=r.getBoundingClientRect(),g=24,f=a.left+g,c=a.right-g,s=a.top+g,w=a.bottom-g;if(c<=f||w<=s)return;let u=f+Math.random()*(c-f),n=s+Math.random()*(w-s);this.drawTask({color:p,position:J.fromScreenPosition(this,{x:u,y:n})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o,l){let p=Math.max(1,Math.floor(o)),r=0;return await this.widget.run(d("taskDrawingRandomPixels"),async()=>{await this.widget.run(d("taskInitializingDraw"),()=>this.updateColors());let a=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((b)=>!b.disabled&&b.getAttribute("aria-disabled")!=="true"&&b.offsetParent!==null),g=document.querySelector(".maplibregl-canvas");if(!a.length||!g)return;let f=l===void 0?void 0:a.find((b)=>Number.parseInt(b.id.slice(6),10)===l);if(l!==void 0&&!f)return;let c=g.getBoundingClientRect(),s=24,w=c.left+s,u=c.right-s,n=c.top+s,i=c.bottom-s;if(u<=w||i<=n)return;for(let b=0;b<p;b++){let m=f??a[Math.floor(Math.random()*a.length)],z=Number.parseInt(m.id.slice(6),10);if(!Number.isFinite(z))continue;let A=w+Math.random()*(u-w),M=n+Math.random()*(i-n);this.drawTask({color:z,position:J.fromScreenPosition(this,{x:A,y:M})}),r++,await j(1)}}),r}async drawOverlayPixelsBatch(o){let l=Math.max(1,Math.floor(o)),p=0;return await this.widget.run(d("taskDrawingOverlayPixels"),async()=>{await this.widget.run(d("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let r=0;r<l;r++){let a=this.takeNextTaskFromStrategy();if(!a)break;this.drawTask(a),p++,await j(1)}this.widget.update()}),p}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let l=this.images[o].tasks.shift();if(l)return l}return}case"PERCENTAGE":{let o,l=Number.POSITIVE_INFINITY;for(let p=0;p<this.images.length;p++){let r=this.images[p];if(!r.tasks.length)continue;let a=r.pixels.pixels.length*r.pixels.pixels[0].length,g=1-r.tasks.length/a;if(g<l)l=g,o=r}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=globalThis.fetch,l=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(p,r)=>{let a=await o(p,r),g=a.clone(),f="";if(typeof p=="string")f=p;else if(p instanceof Request)f=p.url;else if(p instanceof URL)f=p.href;if(a.url==="https://backend.wplace.live/me")this.me=await g.json(),this.me.favoriteLocations.unshift(...T),this.me.maxFavoriteLocations=1/0,a.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let c=l.exec(f);if(c){for(let s=0;s<this.markerPixelPositionResolvers.length;s++)this.markerPixelPositionResolvers[s](new J(this,+c[1],+c[2],+c[3],+c[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return a}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await j(1)}waitForElement(o,l){return this.log("Waiting for element",{name:o,selector:l}),this.widget.run(`${d("taskWaitingFor")} ${o}`,()=>{return new Promise((p)=>{let r=document.querySelector(l);if(r){p(r);return}let a=new MutationObserver(()=>{let g=document.querySelector(l);if(g)a.disconnect(),p(g)});a.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,T.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new qo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
