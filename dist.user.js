// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      3.0.7
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
function po(o,a,p){let l=o[p];return o[p]=o[a],o[a]=l,o}function lo(o,a){let p=o.indexOf(a);if(p!==-1)o.splice(p,1);return p}var pa=Math.floor(Math.random()*65536),la=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function Q(o){return new Promise((a)=>setTimeout(a,o))}function S(o,a,p=["error"],l="addEventListener"){return new Promise((r,g)=>{for(let s=0;s<a.length;s++)o[l]?.(a[s],r);for(let s=0;s<p.length;s++)o[l]?.(p[s],g)})}class Wo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,a=15000){this.size=o,this.historyTime=a}push(o){if(o<0)throw new Error("Negative chunk size");let{time:a,historyTime:p}=this.getTime();if(this.history.push({time:a,chunk:o}),this.history[0]&&this.history[0].time+p<a)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((a,p)=>a+p.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),a=o-this.startTime,p=Math.min(a,this.historyTime);return{time:o,historyTime:p}}}var io=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",progressSection:"Progress",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutOpenSettings:"Open settings",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto drawing",shortcutStopAutoFarm:"Stop auto drawing",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start auto farm",autoFarmStop:"Stop auto farm",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start auto drawing",autoOverlayStop:"Stop auto drawing",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",progressSection:"Progreso",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutOpenSettings:"Abrir configuración",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto dibujo",shortcutStopAutoFarm:"Detener auto dibujo",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar auto farm",autoFarmStop:"Detener auto farm",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar auto dibujo",autoOverlayStop:"Detener auto dibujo",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área"}};function Ro(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function Y(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let a=0;a<io.length;a++){let p=localStorage.getItem(io[a]);if(!p||!(p in y))continue;return localStorage.setItem("kglacer-macro:locale",p),p}return Ro()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function mo(){return Object.keys(y)}function i(o){let a=Y();return y[a][o]}function D(o){for(let a of o.querySelectorAll("[data-i18n]"))a.textContent=i(a.dataset.i18n);for(let a of o.querySelectorAll("[data-i18n-title]"))a.setAttribute("title",i(a.dataset.i18nTitle));for(let a of o.querySelectorAll("[data-i18n-aria-label]"))a.setAttribute("aria-label",i(a.dataset.i18nAriaLabel));for(let a of o.querySelectorAll("[data-i18n-placeholder]"))a.setAttribute("placeholder",i(a.dataset.i18nPlaceholder))}class _{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,a){for(let p in a)this[p]=o.querySelector(a[p])}registerEvent(o,a,p,l={}){l.passive??=!0,o.addEventListener(a,p,l),this.runOnDestroy.push(()=>{o.removeEventListener(a,p)})}}function go(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function bo(o,a,p){let l=go(o/255),r=go(a/255),g=go(p/255),s=Math.cbrt(0.4122214708*l+0.5363325363*r+0.0514459929*g),c=Math.cbrt(0.2119034982*l+0.6806995451*r+0.1073969566*g),f=Math.cbrt(0.0883024619*l+0.2817188376*r+0.6299787005*g),w=0.2104542553*s+0.793617785*c-0.0040720468*f,u=1.9779984951*s-2.428592205*c+0.4505937099*f,n=0.0259040371*s+0.7827717662*c-0.808675766*f;return[w,u,n]}function to(o,a,p){let[l,r,g]=o,[s,c,f]=a,w=(ro)=>ro*180/Math.PI,u=(ro)=>ro*Math.PI/180,n=1,d=1,m=1,b=Math.sqrt(r**2+g**2),t=Math.sqrt(c**2+f**2),z=(b+t)/2,H=0.5*(1-Math.sqrt(z**7/(z**7+6103515625))),A=r*(1+H),P=c*(1+H),J=Math.sqrt(A**2+g**2),h=Math.sqrt(P**2+f**2),W=g===0&&A===0?0:w(Math.atan2(g,A))%360,O=f===0&&P===0?0:w(Math.atan2(f,P))%360,v=s-l,E=h-J,j=0;if(J*h!==0){if(j=O-W,j>180)j-=360;else if(j<-180)j+=360}let $=2*Math.sqrt(J*h)*Math.sin(u(j)/2),e=(l+s)/2,x=(J+h)/2,V=(W+O)/2;if(Math.abs(W-O)>180)V+=180;let Ko=1-0.17*Math.cos(u(V-30))+0.24*Math.cos(u(2*V))+0.32*Math.cos(u(3*V+6))-0.2*Math.cos(u(4*V-63)),Go=1+0.015*(e-50)**2/Math.sqrt(20+(e-50)**2),uo=1+0.045*x,no=1+0.015*x*Ko,So=30*Math.exp((-((V-275)/25))**2),qo=-(2*Math.sqrt(x**7/(x**7+6103515625)))*Math.sin(u(2*So));return Math.sqrt((v/(1*Go))**2+(E/(1*uo))**2+($/(1*no))**2+qo*(E/(1*uo))*($/(1*no)))-v*p}var R=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],q=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function so(o){if(o===0)return"transparent";let a=R[o],p=`oklab(${a[0]*100}% ${a[1]} ${a[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",p))return p;let[l=0,r=0,g=0]=(q[o]??"0,0,0").split(",").map((s)=>Number.parseInt(s,10));return`rgb(${l} ${r} ${g})`}var zo=`<div class="wtopbar">
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
`;class Z{bot;image;width;exactColor;static async fromJSON(o,a){let p=new Image;return p.src=a.url.startsWith("http")?await fetch(a.url,{cache:"no-store"}).then((l)=>l.blob()).then((l)=>URL.createObjectURL(l)):a.url,await S(p,["load"],["error"]),new Z(o,p,a.width,a.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,a,p=a.naturalWidth,l=!1){this.bot=o;this.image=a;this.width=p;this.exactColor=l;if(l)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let p=1;p<64;p++)if(this.exactColor||!this.bot.unavailableColors.has(p))o.set(q[p],[p,p]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let a=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let p=0;p<this.canvas.height;p++)for(let l=0;l<this.canvas.width;l++){let r=(p*this.canvas.width+l)*4,g=a[r],s=a[r+1],c=a[r+2],f=a[r+3],w=g,u=s,n=c,d=`${w},${u},${n}`;if(this.exactColor){this.pixels[p][l]=f<100?0:q.indexOf(d);continue}let m,b;if(f<100)m=b=0;else if(o.has(d))[m,b]=o.get(d);else{let z=1/0,H=1/0;for(let A=0;A<R.length;A++){let P=R[A],J=to(bo(w,u,n),P,0);if(!this.bot.unavailableColors.has(A)&&J<z)z=J,m=A;if(J<H)H=J,b=A}o.set(d,[m,b])}if(m!==0)this.context.fillStyle=`oklab(${R[m][0]*100}% ${R[m][1]} ${R[m][2]})`,this.context.fillRect(l,p,1,1);this.pixels[p][l]=m;let t=this.colors.get(b);if(t)t.amount++;else this.colors.set(b,{color:m,amount:1,realColor:b})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var B="kglacer-macro-settings",Ao=["kglacermacro","wbot"],X="kgm";function Vo(){let o=[B,...Ao];for(let a=0;a<o.length;a++){let p=o[a],l=localStorage.getItem(p);if(!l)continue;return{json:l,key:p}}return}function Mo(){let o=Vo();if(!o)return;let a;try{if(a=JSON.parse(o.json),typeof a!=="object")throw new Error("NOT VALID SAVE");if(a.version===1){let p=a;a.images=p.widget.images,a.strategy=p.widget.strategy,delete p.widget}if(o.key!==B)localStorage.setItem(B,o.json)}catch{localStorage.removeItem(o.key),a=void 0}return a}var Ho;function N(o,a=!1){if(clearTimeout(Ho),a)localStorage.setItem(B,JSON.stringify(o));else Ho=setTimeout(()=>{localStorage.setItem(B,JSON.stringify(o))},600)}var M=1000,Bo=2048,L=M*Bo,K=[],T=[],Lo=Date.now();function I(o){K.push(o),T.push({id:Lo++,latitude:(2*Math.atan(Math.exp(-(o.y/L*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/L*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:L/3|0,y:L/3|0});I({x:L/3*2|0,y:L/3*2|0});function C(o){let[a,p]=o.style.transform.slice(32,-31).split(", ").map((l)=>Number.parseFloat(l));return{x:a,y:p}}class F{bot;static fromJSON(o,a){return new F(o,...a)}static fromScreenPosition(o,a){let{anchorScreenPosition:p,pixelSize:l,anchorWorldPosition:r}=o.findAnchorsForScreen(a);return new F(o,r.x+(a.x-p.x)/l|0,r.y+(a.y-p.y)/l|0)}globalX=0;globalY=0;get tileX(){return this.globalX/M|0}set tileX(o){this.globalX=o*M+this.x}get tileY(){return this.globalY/M|0}set tileY(o){this.globalY=o*M+this.y}get x(){return this.globalX%M}set x(o){this.globalX=this.tileX*M+o}get y(){return this.globalY%M}set y(o){this.globalY=this.tileY*M+o}anchor1Index;anchor2Index;get pixelSize(){return(C(this.bot.$stars[this.anchor2Index]).x-C(this.bot.$stars[this.anchor1Index]).x)/(K[this.anchor2Index].x-K[this.anchor1Index].x)}constructor(o,a,p,l,r){this.bot=o;if(l===void 0||r===void 0)this.globalX=a,this.globalY=p;else this.globalX=a*M+l,this.globalY=p*M+r;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,a=1/0;for(let p=0;p<K.length;p++){let{x:l,y:r}=K[p];if(l<this.globalX&&r<this.globalY){let g=this.globalX-l+(this.globalY-r);if(g<o)o=g,this.anchor1Index=p}else if(l>this.globalX&&r>this.globalY){let g=l-this.globalX+(r-this.globalY);if(g<a)a=g,this.anchor2Index=p}}}toScreenPosition(){let o=K[this.anchor1Index],a=C(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+a.x,y:(this.globalY-o.y)*this.pixelSize+a.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:a}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:a-window.innerHeight/3})}clone(){return new F(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class G extends _{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,a){return new G(o,F.fromJSON(o,a.position),await Z.fromJSON(o,a.pixels),a.strategy,a.opacity,a.drawTransparentPixels,a.drawColorsInOrder,a.colors,a.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,a,p,l="SPIRAL_FROM_CENTER",r=50,g=!1,s=!1,c=[],f=!1){super();this.bot=o;this.position=a;this.pixels=p;this.strategy=l;this.opacity=r;this.drawTransparentPixels=g;this.drawColorsInOrder=s;this.colors=c;this.lock=f;this.element.innerHTML=zo,this.element.classList.add("wimage"),D(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();N(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),N(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),N(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,N(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,N(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),N(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(w)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(w.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(w)=>{if(w.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let w of this.element.querySelectorAll(".resize"))this.registerEvent(w,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),a=new Set,p=new Map;for(let l=0;l<this.colors.length;l++){let r=this.colors[l];if(r.disabled)a.add(r.realColor);p.set(r.realColor,l)}for(let{x:l,y:r}of this.strategyPositionIterator()){let g=this.pixels.pixels[r][l];if(a.has(g))continue;o.globalX=this.position.globalX+l,o.globalY=this.position.globalY+r;let s=o.getMapColor();if(g!==s&&(this.drawTransparentPixels||g!==0))this.tasks.push({position:o.clone(),color:g})}if(this.drawColorsInOrder)this.tasks.sort((l,r)=>(p.get(l.color)??0)-(p.get(r.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:a}=this.position.toScreenPosition(),p=this.position.pixelSize*this.pixels.width,l=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${a.toFixed(3)}px, 0)`,this.element.style.width=`${p}px`,this.element.style.height=`${l}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let r=this.pixels.pixels.length*this.pixels.pixels[0].length,g=Math.max(0,r-this.tasks.length),s=r>0?g/r*100|0:0;this.$progressText.textContent=`${g}/${r} ${s}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${s/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let c of this.element.querySelectorAll(".resize"))c.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),lo(this.bot.images,this),this.bot.widget.update(),N(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let p=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-p.left,offsetY:o.clientY-p.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let a=this.$colorsDialog.getBoundingClientRect(),p=Math.max(8,window.innerWidth-a.width-8),l=Math.max(8,window.innerHeight-a.height-8),r=Math.min(p,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),g=Math.min(l,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(r)}px`,this.$colorsDialog.style.top=`${Math.round(g)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let a=document.createDocumentFragment(),p=document.createElement("article");p.className="preview-card";let l=document.createElement("strong");l.textContent=this.getStrategyLabel(o);let r=document.createElement("canvas");r.className="preview-canvas",r.width=156,r.height=156,this.paintStrategyPreview(r,o),p.append(l,r),a.append(p),this.$previewDialogList.append(a)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((p,l)=>`${l}:${p.realColor}:${p.disabled?1:0}`).join("|"),a=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===a)return;this.previewCacheSignature=a,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return i("random");case"HUMANIZED":return i("humanized");case"HUMAN_SOFT_DITHER":return i("humanSoftDither");case"HUMAN_PATCHY":return i("humanPatchy");case"HUMAN_SWEEP_ARCS":return i("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return i("humanMicroCorrections");case"HUMAN_JITTER_FILL":return i("humanJitterFill");case"HUMAN_CORNER_BIAS":return i("humanCornerBias");case"HUMAN_LONG_STROKES":return i("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return i("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return i("humanMessySpiral");case"HUMAN_DRUNK_WALK":return i("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return i("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return i("humanPatchJump");case"HUMAN_HESITANT_LINES":return i("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return i("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return i("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return i("humanGapRecovery");case"HUMAN_STAIRCASE":return i("humanStaircase");case"HUMAN_EDGE_HUGGER":return i("humanEdgeHugger");case"HUMAN_BLOBS":return i("humanBlobs");case"HUMAN_BACKTRACK":return i("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return i("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return i("humanLateFixes");case"ZIGZAG":return i("zigzag");case"BRUSH_STROKES":return i("brushStrokes");case"DIAGONAL_BRUSH":return i("diagonalBrush");case"DOWN":return i("down");case"UP":return i("up");case"LEFT":return i("left");case"RIGHT":return i("right");case"SPIRAL_FROM_CENTER":return i("spiralOut");case"SPIRAL_TO_CENTER":return i("spiralIn");case"SCRIBBLE":return i("scribble");case"CROSSHATCH":return i("crosshatch");case"WAVE_SWEEP":return i("waveSweep");case"SCATTERED_LINES":return i("scatteredLines");case"CONTOUR_JITTER":return i("contourJitter");case"SPIRAL_WOBBLE":return i("spiralWobble");case"CLUSTER_BURSTS":return i("clusterBursts");case"ORBITAL":return i("orbital");case"FLOW_FIELD":return i("flowField");case"EDGE_IN":return i("edgeIn");default:return o}}paintStrategyPreview(o,a){let p=o.getContext("2d");if(!p)return;p.fillStyle="#0f1526",p.fillRect(0,0,o.width,o.height);let l=this.getSampledImagePreviewData(),r=this.getCachedPreviewSequence(a,l.mask,l.width,l.height),g=Math.min(o.width/l.width,o.height/l.height),s=(o.width-l.width*g)/2,c=(o.height-l.height*g)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let w=(z)=>{let H=requestAnimationFrame((A)=>{this.previewAnimationHandles.delete(H),z(A)});return this.previewAnimationHandles.add(H),H},u=(z)=>{p.fillStyle="#0f1526",p.fillRect(0,0,o.width,o.height);for(let H=0;H<Math.min(z,r.length);H++){let A=r[H],P=l.colors.get(`${A.x}:${A.y}`)??0;if(!P)continue;p.fillStyle=so(P),p.fillRect(s+A.x*g,c+A.y*g,Math.max(1,g),Math.max(1,g))}},n=Math.min(3400,Math.max(900,r.length*8)),m=n+220,b=(z,H)=>{if(!this.$previewDialog.open)return;let A=(H-z)%m,P=Math.min(1,A/n),J=P*P*(3-2*P);u(Math.floor(r.length*J));let h=w((W)=>{b(z,W)});this.previewAnimations.set(o,h)},t=performance.now();b(t,t)}getCachedPreviewSequence(o,a,p=this.pixels.width,l=this.pixels.height){let r=this.colors.map((f,w)=>`${w}:${f.realColor}:${f.disabled?1:0}`).join("|"),g=`${o}:${p}x${l}:${a.length}:${this.drawColorsInOrder?1:0}:${r}`,s=this.previewSequenceCache.get(g);if(s)return s;let c=p===this.pixels.width&&l===this.pixels.height?this.getExactPreviewSequence(o,a):this.getApproxPreviewSequence(o,a,p);if(this.drawColorsInOrder){let f=new Map;for(let w=0;w<this.colors.length;w++)f.set(this.colors[w].realColor,w);c.sort((w,u)=>(f.get(this.pixels.pixels[w.y]?.[w.x]??0)??0)-(f.get(this.pixels.pixels[u.y]?.[u.x]??0)??0))}return this.previewSequenceCache.set(g,c),c}getExactPreviewSequence(o,a){let p=this.strategy;this.strategy=o;let l=[...this.strategyPositionIterator()];this.strategy=p;let r=new Set(a.map(({x:g,y:s})=>`${g}:${s}`));return l.filter(({x:g,y:s})=>r.has(`${g}:${s}`))}getApproxPreviewSequence(o,a,p){let l=[...a],r=(c,f,w)=>{return(c*73856093+f*19349663+w*83492791>>>0)/4294967296},g=(c,f)=>l.sort((w,u)=>w.x*c+w.y*f-(u.x*c+u.y*f)||w.y-u.y||w.x-u.x),s=l.sort((c,f)=>{if(c.y!==f.y)return c.y-f.y;let w=c.y%2===0?c.x:p-c.x,u=f.y%2===0?f.x:p-f.x;return w-u});switch(o){case"UP":return g(0,-1);case"LEFT":return g(-1,0);case"RIGHT":return g(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let c=p/2,f=Math.max(1,Math.round(l.reduce((w,u)=>w+u.y,0)/Math.max(1,l.length)));return l.sort((w,u)=>{let n=(w.x-c)**2+(w.y-f)**2,d=(u.x-c)**2+(u.y-f)**2;return o==="SPIRAL_FROM_CENTER"?n-d:d-n}),l}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return l.sort((c,f)=>r(c.x,c.y,o.length)-r(f.x,f.y,o.length));default:return s}}getSampledImagePreviewData(){let o=this.pixels.width,a=this.pixels.height,p=G.PREVIEW_MASK_BASE_WIDTH,l=G.PREVIEW_MASK_BASE_HEIGHT,r=Math.min(1,p/Math.max(1,o),l/Math.max(1,a)),g=Math.max(1,Math.round(o*r)),s=Math.max(1,Math.round(a*r)),c=new Set;for(let n=0;n<this.colors.length;n++){let d=this.colors[n];if(d.disabled)c.add(d.realColor)}let f=new Map,w=new Map;for(let n=0;n<a;n++)for(let d=0;d<o;d++){let m=this.pixels.pixels[n]?.[d]??0;if(!m||c.has(m))continue;let b=Math.min(g-1,Math.floor(d/o*g)),t=Math.min(s-1,Math.floor(n/a*s)),z=`${b}:${t}`;if(!f.has(z))f.set(z,{x:b,y:t});if(!w.has(z))w.set(z,m)}let u=[...f.values()];if(!u.length){let n=this.fallbackPreviewMask();return{width:o,height:a,mask:n,colors:new Map(n.map((d)=>[`${d.x}:${d.y}`,this.pixels.pixels[d.y]?.[d.x]??0]))}}return{width:g,height:s,mask:u,colors:w}}getImagePreviewMask(){let o=this.pixels.width,a=this.pixels.height,p=new Set;for(let r=0;r<this.colors.length;r++){let g=this.colors[r];if(g.disabled)p.add(g.realColor)}let l=[];for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=this.pixels.pixels[r]?.[g]??0;if(s!==0&&!p.has(s))l.push({x:g,y:r})}return l.length?l:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],a=this.pixels.width/2,p=this.pixels.height/2,l=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let r=0;r<this.pixels.height;r++)for(let g=0;g<this.pixels.width;g++)if((g-a)**2+(r-p)**2<=l**2)o.push({x:g,y:r});return o}applyLocale(){if(D(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let a=q[o]??"0,0,0",[p=0,l=0,r=0]=a.split(",").map((g)=>Number.parseInt(g,10));return`#${[p,l,r].map((g)=>g.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let a=q[o]??"0,0,0",[p=0,l=0,r=0]=a.split(",").map((f)=>Number.parseInt(f,10)),g=Math.max(p,l,r),s=Math.min(p,l,r);if(g-s<15)return["gray","grey","gris","neutral","neutro"];if(p>l+30&&p>r+30)return["red","rojo"];if(l>p+30&&l>r+30)return["green","verde"];if(r>p+30&&r>l+30)return["blue","azul"];if(p>170&&l>120&&r<130)return["orange","naranja"];if(p>170&&l>110&&r>140)return["pink","rosa"];if(p>120&&l<100&&r>120)return["purple","violet","morado"];if(p>130&&l>130&&r<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",i("colorPanelResults"));let a=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((p)=>!this.pixels.colors.has(p.realColor)))this.colors=this.pixels.colors.values().toArray().sort((p,l)=>l.amount-p.amount).map((p)=>({realColor:p.realColor,disabled:!1})),N(this.bot);for(let p=0;p<this.colors.length;p++){let l=this.colors[p],r=this.pixels.colors.get(l.realColor),g=!1,s=r.realColor!==r.color,c=r.amount/o*100,f=this.colorHex(r.realColor),w=this.colorKeywords(r.realColor),u=()=>{l.disabled=l.disabled?void 0:!0,n.classList.toggle("disabled",Boolean(l.disabled));let m=n.querySelector(".state");if(m)m.textContent=l.disabled?i("disabled"):i("enabled");N(this.bot)},n=document.createElement("button");if(n.className=`color-chip ${l.disabled?"disabled":""}`,n.draggable=!0,n.setAttribute("aria-label",`${i("overlayColors")} #${p+1}: ${f.toUpperCase()}`),n.innerHTML=`<span class="order-index">#${p+1}</span>
<span class="drag" title="${i("up")} / ${i("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${c.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${l.disabled?i("disabled"):i("enabled")}</span>
</span>
<span class="premium ${s?"on":""}">${s?i("premium"):""}</span>`,n.querySelector(".swatch").style.setProperty("--swatch-color",so(r.realColor)),n.addEventListener("click",()=>{if(g){g=!1;return}u()}),n.addEventListener("dragstart",(m)=>{g=!0,n.classList.add("dragging"),m.dataTransfer?.setData("text/plain",String(p)),m.dataTransfer.effectAllowed="move"}),n.addEventListener("dragend",()=>{n.classList.remove("dragging")}),n.addEventListener("dragover",(m)=>{m.preventDefault(),n.classList.add("drag-target")}),n.addEventListener("dragleave",()=>{n.classList.remove("drag-target")}),n.addEventListener("drop",(m)=>{m.preventDefault(),n.classList.remove("drag-target");let b=Number.parseInt(m.dataTransfer?.getData("text/plain")??"-1",10);if(b<0||b===p||b>=this.colors.length)return;this.colors.splice(p,0,...this.colors.splice(b,1)),N(this.bot),this.updateColors()}),s){let m=document.createElement("button");m.textContent=i("buy"),m.className="buy-chip",m.addEventListener("click",(b)=>{b.stopPropagation(),document.getElementById("color-"+r.realColor)?.click()}),n.append(m)}let d=`${f} ${w.join(" ")} ${r.realColor} ${q[r.realColor]}`;if(!a||d.toLowerCase().includes(a))this.$colorsDialogList.append(n)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,a=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let p=0;p<a;p++)for(let l=0;l<o;l++)yield{x:l,y:p};break}case"UP":{for(let p=a-1;p>=0;p--)for(let l=0;l<o;l++)yield{x:l,y:p};break}case"LEFT":{for(let p=0;p<o;p++)for(let l=0;l<a;l++)yield{x:p,y:l};break}case"RIGHT":{for(let p=o-1;p>=0;p--)for(let l=0;l<a;l++)yield{x:p,y:l};break}case"RANDOM":{let p=[];for(let l=0;l<a;l++)for(let r=0;r<o;r++)p.push({x:r,y:l});for(let l=p.length-1;l>=0;l--){let r=Math.floor(Math.random()*(l+1)),g=p[l];p[l]=p[r],p[r]=g}yield*p;break}case"ZIGZAG":{for(let p=0;p<a;p++)if(p%2===0)for(let l=0;l<o;l++)yield{x:l,y:p};else for(let l=o-1;l>=0;l--)yield{x:l,y:p};break}case"HUMANIZED":{let p=Math.max(4,Math.floor(Math.min(o,a)/10)),l=[];for(let r=0;r<a;r+=p)for(let g=0;g<o;g+=p)l.push({x:g,y:r});for(let r=l.length-1;r>=0;r--){let g=Math.floor(Math.random()*(r+1)),s=l[r];l[r]=l[g],l[g]=s}for(let r=0;r<l.length;r++){let g=l[r],s=Math.min(a,g.y+p),c=Math.min(o,g.x+p);for(let f=g.y;f<s;f++)if(Math.random()>0.35)for(let u=g.x;u<c;u++)yield{x:u,y:f};else for(let u=c-1;u>=g.x;u--)yield{x:u,y:f}}break}case"HUMAN_SOFT_DITHER":{let p=new Set;for(let l=0;l<a;l++){let r=Math.floor(Math.random()*3)-1;if((l+r)%2===0)for(let s=0;s<o;s+=2)p.add(`${s},${l}`),yield{x:s,y:l};else for(let s=1;s<o;s+=2)p.add(`${s},${l}`),yield{x:s,y:l}}for(let l=0;l<a;l++)for(let r=0;r<o;r++){let g=`${r},${l}`;if(p.has(g))continue;yield{x:r,y:l}}break}case"HUMAN_PATCHY":{let p=new Set,l=o*a;while(p.size<l){let r=Math.floor(Math.random()*o),g=Math.floor(Math.random()*a),s=1+Math.floor(Math.random()*5);for(let c=g-s;c<=g+s;c++)for(let f=r-s;f<=r+s;f++){if(f<0||f>=o||c<0||c>=a)continue;if(Math.hypot(f-r,c-g)>s+Math.random()*1.2)continue;let w=`${f},${c}`;if(p.has(w))continue;p.add(w),yield{x:f,y:c}}}break}case"HUMAN_SWEEP_ARCS":{let p=new Set,l=(o-1)/2,r=(a-1)/2,g=Math.hypot(l,r);for(let s=0;s<4;s++){let c=Math.random()*Math.PI*2;for(let f=0;f<=g;f+=0.35){let w=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(f*8));for(let n=0;n<u;n++){let d=c+w*n/u+Math.sin(f)*0.08,m=Math.round(l+Math.cos(d)*f),b=Math.round(r+Math.sin(d)*f);if(m<0||m>=o||b<0||b>=a)continue;let t=`${m},${b}`;if(p.has(t))continue;p.add(t),yield{x:m,y:b}}}}for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=`${c},${s}`;if(p.has(f))continue;yield{x:c,y:s}}break}case"HUMAN_MICRO_CORRECTIONS":{let p=new Set;for(let l=0;l<a;l++){let r=l%2===0?1:-1,g=r>0?0:o-1;for(let s=0;s<o;s++){let c=g+(Math.random()>0.82?r:0),f=l+(Math.random()>0.9?1:0);for(let w of[{x:g,y:l},{x:c,y:l},{x:g,y:f}]){if(w.x<0||w.x>=o||w.y<0||w.y>=a)continue;let u=`${w.x},${w.y}`;if(p.has(u))continue;p.add(u),yield w}g+=r}}for(let l=0;l<a;l++)for(let r=0;r<o;r++){let g=`${r},${l}`;if(p.has(g))continue;yield{x:r,y:l}}break}case"HUMAN_JITTER_FILL":{let p=[];for(let l=0;l<a;l++)for(let r=0;r<o;r++)p.push({x:r,y:l});p.sort((l,r)=>{let g=l.y+(Math.random()-0.5)*1.8,s=r.y+(Math.random()-0.5)*1.8;if(g!==s)return g-s;return l.x+(Math.random()-0.5)*2-(r.x+(Math.random()-0.5)*2)}),yield*p;break}case"HUMAN_CORNER_BIAS":{let p=[{x:0,y:0},{x:o-1,y:0},{x:0,y:a-1},{x:o-1,y:a-1}],l=p[Math.floor(Math.random()*p.length)],r=[];for(let g=0;g<a;g++)for(let s=0;s<o;s++){let f=Math.hypot(s-l.x,g-l.y)+Math.random()*3.5;r.push({point:{x:s,y:g},score:f})}r.sort((g,s)=>g.score-s.score);for(let g of r)yield g.point;break}case"HUMAN_LONG_STROKES":{let p=new Set,l=o*a;while(p.size<l){let r=Math.floor(Math.random()*o),g=Math.floor(Math.random()*a),s=Math.random()*Math.PI*2,c=Math.sign(Math.cos(s)),f=Math.sign(Math.sin(s)),w=10+Math.floor(Math.random()*40);for(let u=0;u<w;u++){if(r<0||r>=o||g<0||g>=a)break;let n=`${r},${g}`;if(!p.has(n))p.add(n),yield{x:r,y:g};if(Math.random()>0.78)r+=f,g+=c;else r+=c,g+=f}}break}case"HUMAN_TAP_CLUSTERS":{let p=new Set,l=o*a;while(p.size<l){let r=Math.floor(Math.random()*o),g=Math.floor(Math.random()*a),s=3+Math.floor(Math.random()*10);for(let c=0;c<s;c++){let f=Math.round(r+(Math.random()-0.5)*6),w=Math.round(g+(Math.random()-0.5)*6);if(f<0||f>=o||w<0||w>=a)continue;let u=`${f},${w}`;if(p.has(u))continue;p.add(u),yield{x:f,y:w}}}break}case"HUMAN_MESSY_SPIRAL":{let p=new Set,l=(o-1)/2,r=(a-1)/2,g=Math.hypot(l,r)+2;for(let s=0;p.size<o*a;s++){let c=s/3,f=Math.min(g,c*0.18),w=c*0.29+Math.sin(c*0.13)*0.8,u=Math.round(l+Math.cos(w)*f+Math.sin(c)*0.7),n=Math.round(r+Math.sin(w)*f+Math.cos(c)*0.7);if(u<0||u>=o||n<0||n>=a){if(s>o*a*18)break;continue}let d=`${u},${n}`;if(p.has(d)){if(Math.random()>0.9)continue}else p.add(d),yield{x:u,y:n};if(s>o*a*18)break}for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=`${c},${s}`;if(p.has(f))continue;yield{x:c,y:s}}break}case"HUMAN_DRUNK_WALK":{let p=new Set,l=Math.floor(Math.random()*o),r=Math.floor(Math.random()*a),g=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(p.size<o*a){let s=`${l},${r}`;if(!p.has(s))p.add(s),yield{x:l,y:r};let c=[];for(let u of g){let n=l+u.x,d=r+u.y;if(n<0||n>=o||d<0||d>=a)continue;c.push({x:n,y:d})}if(!c.length)break;let f=c.filter((u)=>{return!p.has(`${u.x},${u.y}`)});if(f.length&&Math.random()>0.2){let u=f[Math.floor(Math.random()*f.length)];l=u.x,r=u.y;continue}let w=c[Math.floor(Math.random()*c.length)];l=w.x,r=w.y}for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=`${c},${s}`;if(p.has(f))continue;yield{x:c,y:s}}break}case"HUMAN_NOISE_CLOUD":{let p=[];for(let l=0;l<a;l++)for(let r=0;r<o;r++){let g=Math.sin((r+1)*0.93+Math.random()*0.8)+Math.cos((l+1)*1.17+Math.random()*0.8),s=(Math.random()-0.5)*2.6,c=Math.hypot(r-o/2,l-a/2)*0.08;p.push({point:{x:r,y:l},score:g+s+c})}p.sort((l,r)=>l.score-r.score);for(let l of p)yield l.point;break}case"HUMAN_PATCH_JUMP":{let p=new Set,l=[];for(let r=0;r<Math.max(6,o*a/18);r++)l.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});while(p.size<o*a){let r=l[Math.floor(Math.random()*l.length)],g=1+Math.floor(Math.random()*3),s=1+Math.floor(Math.random()*3);for(let c=r.y-s;c<=r.y+s;c++)for(let f=r.x-g;f<=r.x+g;f++){if(f<0||f>=o||c<0||c>=a)continue;if(Math.random()>0.86)continue;let w=`${f},${c}`;if(p.has(w))continue;p.add(w),yield{x:f,y:c}}if(Math.random()>0.72&&l.length<o*a/2)l.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*a)});if(p.size>o*a*0.92)break}for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=`${g},${r}`;if(p.has(s))continue;yield{x:g,y:r}}break}case"HUMAN_HESITANT_LINES":{let p=new Set;for(let l=0;l<a;l++){let r=l%2===0;for(let g=0;g<o;g++){let s=r?g:o-1-g,c=`${s},${l}`;if(!p.has(c))p.add(c),yield{x:s,y:l};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,s+(Math.random()>0.5?1:-1))),w=Math.max(0,Math.min(a-1,l+(Math.random()>0.65?1:0))),u=`${f},${w}`;if(!p.has(u))p.add(u),yield{x:f,y:w}}}}for(let l=0;l<a;l++)for(let r=0;r<o;r++){let g=`${r},${l}`;if(p.has(g))continue;yield{x:r,y:l}}break}case"HUMAN_OVERLAP_SWEEPS":{let p=[],l=Math.random()*Math.PI*2;for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=Math.sin((g+r)*0.42+l)*2.2,c=Math.cos((g-r)*0.3+l)*1.4;p.push({point:{x:g,y:r},score:r+s+c+(Math.random()-0.5)*3.4})}p.sort((r,g)=>r.score-g.score);for(let r of p)yield r.point;break}case"HUMAN_WOBBLE_DRIFT":{let p=[],l=o/2,r=a/2;for(let g=0;g<a;g++)for(let s=0;s<o;s++){let c=Math.hypot(s-l,g-r)*0.25,f=Math.sin((s+1)*0.9)*1.8+Math.cos((g+1)*1.1)*1.8+Math.sin((s+g)*0.35)*1.4;p.push({point:{x:s,y:g},score:c+f+(Math.random()-0.5)*2.8})}p.sort((g,s)=>g.score-s.score);for(let g of p)yield g.point;break}case"HUMAN_GAP_RECOVERY":{let p=new Set,l=[];for(let r=0;r<a;r++)for(let g=0;g<o;g++){if(Math.random()>0.87){l.push({x:g,y:r});continue}p.add(`${g},${r}`),yield{x:g,y:r}}l.sort((r,g)=>Math.hypot(r.x-o/2,r.y-a/2)-Math.hypot(g.x-o/2,g.y-a/2));for(let r of l){let g=`${r.x},${r.y}`;if(p.has(g))continue;p.add(g),yield r}break}case"HUMAN_STAIRCASE":{let p=new Set,l=o+a-1;for(let r=0;r<l;r++){let g=Math.max(0,r-o+1),s=Math.min(a-1,r);for(let c=g;c<=s;c++){let f=r-c,w=[{x:f,y:c},{x:f+(Math.random()>0.5?1:-1),y:c},{x:f,y:c+(Math.random()>0.5?1:-1)}];for(let u of w){if(u.x<0||u.x>=o||u.y<0||u.y>=a)continue;let n=`${u.x},${u.y}`;if(p.has(n))continue;p.add(n),yield u}}}for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=`${g},${r}`;if(p.has(s))continue;yield{x:g,y:r}}break}case"HUMAN_EDGE_HUGGER":{let p=[];for(let l=0;l<a;l++)for(let r=0;r<o;r++){let g=Math.min(r,l,o-1-r,a-1-l);p.push({point:{x:r,y:l},score:g*3.5+(Math.random()-0.5)*5.5})}p.sort((l,r)=>l.score-r.score);for(let l of p)yield l.point;break}case"HUMAN_BLOBS":{let p=new Set,l=o*a;while(p.size<l){let r=Math.floor(Math.random()*o),g=Math.floor(Math.random()*a),s=1+Math.floor(Math.random()*4);for(let c=g-s;c<=g+s;c++)for(let f=r-s;f<=r+s;f++){if(f<0||f>=o||c<0||c>=a)continue;let w=Math.atan2(c-g,f-r),u=s+Math.sin(w*3+Math.random())*0.8;if(Math.hypot(f-r,c-g)>u)continue;let n=`${f},${c}`;if(p.has(n))continue;p.add(n),yield{x:f,y:c}}}break}case"HUMAN_BACKTRACK":{let p=new Set,l=[];for(let r=0;r<a;r++)for(let g=0;g<o;g++)l.push({x:g,y:r});l.sort((r,g)=>r.y-g.y+(Math.random()-0.5)*2.2+(r.x-g.x)*0.04);for(let r=0;r<l.length;r++){let g=l[r],s=`${g.x},${g.y}`;if(p.has(s))continue;if(p.add(s),yield g,r>1&&Math.random()>0.74){let c=l[r-1],f=`${c.x},${c.y}`;if(!p.has(f))p.add(f),yield c}}for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=`${g},${r}`;if(p.has(s))continue;yield{x:g,y:r}}break}case"HUMAN_SHAKY_DIAGONAL":{let p=[];for(let l=0;l<a;l++)for(let r=0;r<o;r++){let g=Math.abs(r-l)*0.6,s=Math.sin(r*1.4+l*0.8)*1.8+Math.cos(l*1.1+r*0.5)*1.5;p.push({point:{x:r,y:l},score:g+s+(Math.random()-0.5)*3.2})}p.sort((l,r)=>l.score-r.score);for(let l of p)yield l.point;break}case"HUMAN_LATE_FIXES":{let p=[],l=[];for(let r=0;r<a;r++)for(let g=0;g<o;g++)if(Math.random()>0.9)l.push({x:g,y:r});else p.push({x:g,y:r});p.sort((r,g)=>r.y-g.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?r.x-g.x:0)),l.sort((r,g)=>Math.hypot(g.x-o/2,g.y-a/2)-Math.hypot(r.x-o/2,r.y-a/2)),yield*p,yield*l;break}case"DIAGONAL_BRUSH":{for(let p=0;p<o+a-1;p++){let l=p%2===0,r=[],g=Math.max(0,p-o+1),s=Math.min(a-1,p);for(let c=g;c<=s;c++){let f=p-c;if(f>=0&&f<o)r.push({x:f,y:c})}if(Math.random()>0.55)r.reverse();if(l)for(let c=r.length-1;c>=0;c--)yield r[c];else yield*r}break}case"BRUSH_STROKES":{let p=Array.from({length:a},()=>Array(o).fill(!1)),l=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],r=(c,f)=>c>=0&&c<o&&f>=0&&f<a,g=0,s=o*a;for(let c=0;c<s*6&&g<s;c++){let f=Math.floor(Math.random()*o),w=Math.floor(Math.random()*a),u=l[Math.floor(Math.random()*l.length)],n=3+Math.floor(Math.random()*16);for(let d=0;d<n;d++){if(!r(f,w))break;if(!p[w][f])p[w][f]=!0,g++,yield{x:f,y:w};if(Math.random()>0.72)u=l[Math.floor(Math.random()*l.length)];f+=u.x,w+=u.y}}for(let c=0;c<a;c++)for(let f=0;f<o;f++)if(!p[c][f])yield{x:f,y:c};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let p=new Set,l=o*a,r=Math.floor(o/2),g=Math.floor(a/2),s=[[1,0],[0,1],[-1,0],[0,-1]],c=0,f=1,w=(n,d)=>n>=0&&n<o&&d>=0&&d<a,u=function*(){let n=0;while(n<l){for(let d=0;d<2;d++){for(let m=0;m<f;m++){if(w(r,g)){let b=`${r},${g}`;if(!p.has(b)){if(p.add(b),yield{x:r,y:g},n++,n>=l)return}}r+=s[c][0],g+=s[c][1]}c=(c+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let n=[...u()];for(let d=n.length-1;d>=0;d--)yield n[d]}break}case"SCRIBBLE":{let p=new Set,l=o*a,r=Math.floor(o/2),g=Math.floor(a/2);for(let s=0;p.size<l&&s<l*24;s++){let c=`${r},${g}`;if(!p.has(c))p.add(c),yield{x:r,y:g};if(r+=Math.floor(Math.random()*3)-1,g+=Math.floor(Math.random()*3)-1,r<0||r>=o||g<0||g>=a)r=Math.floor(Math.random()*o),g=Math.floor(Math.random()*a)}for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=`${c},${s}`;if(p.has(f))continue;p.add(f),yield{x:c,y:s}}break}case"CROSSHATCH":{let p=[];for(let g=0;g<o+a-1;g++)for(let s=Math.max(0,g-o+1);s<=Math.min(a-1,g);s++){let c=g-s;p.push({x:c,y:s})}let l=[];for(let g=-a+1;g<o;g++)for(let s=0;s<a;s++){let c=s+g;if(c>=0&&c<o)l.push({x:c,y:s})}let r=new Set;for(let g of[...p,...l]){let s=`${g.x},${g.y}`;if(r.has(s))continue;r.add(s),yield g}break}case"WAVE_SWEEP":{let p=new Set;for(let l=0;l<o;l++){let g=(Math.sin(l/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(a-1)|0;for(let s=0;s<a;s++){let c=g+s,f=g-s;for(let w of[c,f]){if(w<0||w>=a)continue;let u=`${l},${w}`;if(p.has(u))continue;p.add(u),yield{x:l,y:w}}}}break}case"SCATTERED_LINES":{let p=new Set,l=o*a;for(let r=0;p.size<l&&r<l*14;r++){let g=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=Math.random()*Math.PI*2,f=Math.round(Math.cos(c)),w=Math.round(Math.sin(c)),u=6+Math.floor(Math.random()*28);for(let n=0;n<u;n++){if(g<0||g>=o||s<0||s>=a)break;let d=`${g},${s}`;if(!p.has(d))p.add(d),yield{x:g,y:s};g+=f,s+=w}}for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=`${g},${r}`;if(p.has(s))continue;p.add(s),yield{x:g,y:r}}break}case"CONTOUR_JITTER":{let p=new Set;for(let l=0;l<Math.ceil(Math.min(o,a)/2);l++){let r=[],g=l,s=l,c=o-l-1,f=a-l-1;for(let w=g;w<=c;w++)r.push({x:w,y:s});for(let w=s+1;w<=f;w++)r.push({x:c,y:w});for(let w=c-1;w>=g;w--)r.push({x:w,y:f});for(let w=f-1;w>s;w--)r.push({x:g,y:w});for(let w=r.length-1;w>0;w--){let u=Math.floor(Math.random()*(w+1)),n=r[w];r[w]=r[u],r[u]=n}for(let w of r){let u=`${w.x},${w.y}`;if(p.has(u))continue;p.add(u),yield w}}break}case"SPIRAL_WOBBLE":{let p=new Set,l=o/2,r=a/2,g=Math.hypot(l,r);for(let s=0;p.size<o*a&&s<o*a*9;s++){let c=s/(o*a*9)*g,f=s*0.31+Math.sin(s*0.07)*0.7,w=Math.round(l+Math.cos(f)*c),u=Math.round(r+Math.sin(f)*c);if(w<0||w>=o||u<0||u>=a)continue;let n=`${w},${u}`;if(p.has(n))continue;p.add(n),yield{x:w,y:u}}for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=`${c},${s}`;if(p.has(f))continue;yield{x:c,y:s}}break}case"CLUSTER_BURSTS":{let p=new Set,l=o*a;for(let r=0;p.size<l&&r<l*12;r++){let g=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a),c=2+Math.floor(Math.random()*10);for(let f=s-c;f<=s+c;f++)for(let w=g-c;w<=g+c;w++){if(w<0||w>=o||f<0||f>=a)continue;if(Math.hypot(w-g,f-s)>c)continue;let u=`${w},${f}`;if(p.has(u))continue;p.add(u),yield{x:w,y:f}}}for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=`${g},${r}`;if(p.has(s))continue;p.add(s),yield{x:g,y:r}}break}case"ORBITAL":{let p=new Set,l=(o-1)/2,r=(a-1)/2,g=Math.ceil(Math.max(l,r));for(let s=0;s<=g;s++){let c=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,s)*2));for(let f=0;f<c;f++){let w=f/c*Math.PI*2+(s%2?0.3:-0.3),u=Math.round(l+Math.cos(w)*s),n=Math.round(r+Math.sin(w)*s);if(u<0||u>=o||n<0||n>=a)continue;let d=`${u},${n}`;if(p.has(d))continue;p.add(d),yield{x:u,y:n}}}for(let s=0;s<a;s++)for(let c=0;c<o;c++){let f=`${c},${s}`;if(p.has(f))continue;yield{x:c,y:s}}break}case"FLOW_FIELD":{let p=new Set,l=o*a;for(let r=0;p.size<l&&r<l*18;r++){let g=Math.floor(Math.random()*o),s=Math.floor(Math.random()*a);for(let c=0;c<120;c++){if(g<0||g>=o||s<0||s>=a)break;let f=`${g},${s}`;if(!p.has(f))p.add(f),yield{x:g,y:s};let w=Math.sin(g*0.09)*1.8+Math.cos(s*0.08)*1.6+Math.sin((g+s)*0.05);g+=Math.round(Math.cos(w)),s+=Math.round(Math.sin(w))}}for(let r=0;r<a;r++)for(let g=0;g<o;g++){let s=`${g},${r}`;if(p.has(s))continue;p.add(s),yield{x:g,y:r}}break}case"EDGE_IN":{let p=new Set,l=Math.ceil(Math.min(o,a)/2);for(let r=0;r<l;r++){let g=r,s=o-1-r,c=r,f=a-1-r;for(let w=g;w<=s;w++)for(let u of[c,f]){let n=`${w},${u}`;if(p.has(n))continue;p.add(n),yield{x:w,y:u}}for(let w=c+1;w<=f-1;w++)for(let u of[g,s]){let n=`${u},${w}`;if(p.has(n))continue;p.add(n),yield{x:u,y:w}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),N(this.bot)}move(o){if(!this.moveInfo)return;let a=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),p=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=a+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-a)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,a+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=p+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-p)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,p+this.moveInfo.height);this.update(),N(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let a=o.target;if(a.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(a.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(a.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(a.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${X}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Po=`/* stylelint-disable declaration-no-important */
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
  place-items: center;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(180deg, #2f5287, #22385f);
  color: #eff5ff;
  font-size: 12px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 25%);
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,a){super(o);a.widget.status=o}}class co extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var k={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function U(o,a){let p=a.key.toLowerCase(),l=o.key.toLowerCase(),g=p==="/"&&(l==="/"||l==="?"||o.code==="Slash")||l===p,s=a.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,c=a.ctrl===!0?!0:a.meta===!0?o.metaKey:!o.metaKey;return g&&o.shiftKey===Boolean(a.shift)&&s&&c&&o.altKey===Boolean(a.alt)}function No(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let a=o.tagName.toLowerCase();return a==="input"||a==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Fo=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Jo="kglacer-macro:overlay-hidden",Do="kglacer-macro:auto-farm-config",ko="kglacer-macro:auto-overlay-config",Eo="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class fo extends _{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$openConfig;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoFarmNextTickAt;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;autoOverlayNextTickAt;statusRefreshIntervalId;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Fo,D(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".autofarm-start",$autofarmStop:".autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".autooverlay-start",$autoOverlayStop:".autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=Eo,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$openConfig.addEventListener("click",()=>{this.openSettingsModal()}),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.statusRefreshIntervalId=window.setInterval(()=>{this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.refreshProgress()},1000),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(i("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${X}`,o.click(),await S(o,["change"],["cancel","error"]);let a=o.files?.[0];if(!a)throw new co(this.bot);console.log("[KGM][Widget] File selected",{name:a.name,size:a.size,type:a.type});let p;if(a.name.endsWith(`.${X}`))p=await G.fromJSON(this.bot,JSON.parse(await a.text()));else{let l=new FileReader;l.readAsDataURL(a),await S(l,["load"],["error"]);let r=await this.compressImageBeforeLoad(l.result),g=new Image;g.src=r,await S(g,["load"],["error"]),await this.waitForStableViewportProjection(),p=new G(this.bot,F.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new Z(this.bot,g))}this.bot.images.push(p),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),p.updateTasks(),N(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(i("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:a,minGlobalY:p,maxGlobalX:l,maxGlobalY:r}=o,g=document.createElement("canvas");g.width=Math.max(1,l-a+1),g.height=Math.max(1,r-p+1);let s=g.getContext("2d");if(!s)throw new Error("Capture context unavailable");s.imageSmoothingEnabled=!1;let c=Math.floor(a/M),f=Math.floor(p/M),w=Math.floor(l/M),u=Math.floor(r/M),n=(w-c+1)*(u-f+1),d=0;for(let b=c;b<=w;b++)for(let t=f;t<=u;t++){this.status=`⌛ ${i("taskReadingTiles")} [${++d}/${n}]`;let z=await this.loadTileImage(b,t),H=b*M,A=t*M,P=Math.max(a,H),J=Math.min(l,H+M-1),h=Math.max(p,A),W=Math.min(r,A+M-1),O=P-H,v=h-A,E=J-P+1,j=W-h+1,$=P-a,e=h-p;s.drawImage(z,O,v,E,j,$,e,E,j)}let m=Date.now();await this.downloadCapture(g,"png",m)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,a,p){let l=a==="webp"?"image/webp":"image/png",r=await new Promise((c,f)=>{o.toBlob((w)=>{if(!w){f(new Error(`Failed to create ${a.toUpperCase()} capture file`));return}c(w)},l)}),g=URL.createObjectURL(r),s=document.createElement("a");s.href=g,s.download=`wplace-capture-${p}.${a}`,s.click(),URL.revokeObjectURL(g)}async loadTileImage(o,a){let p;for(let l=1;l<=3;l++)try{let r=new Image;return r.crossOrigin="anonymous",r.referrerPolicy="no-referrer",r.src=`https://backend.wplace.live/files/s0/tiles/${o}/${a}.png?ts=${Date.now()}-${l}`,await S(r,["load"],["error"]),r}catch(r){if(p=r,l<3)await new Promise((g)=>setTimeout(g,l*200))}throw p instanceof Error?p:new Error(`Tile fetch failed (${o}/${a})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,a)=>{let p=document.createElement("div");p.className="kgm-capture-overlay",p.innerHTML=`<div class="kgm-capture-hint">${i("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let l=p.querySelector(".kgm-capture-box");document.body.append(p);let r,g,s=()=>{window.removeEventListener("keydown",n,!0),p.removeEventListener("pointermove",w),p.removeEventListener("pointerdown",u),p.remove()},c=(d)=>{let m=Math.min(r.x,d.x),b=Math.min(r.y,d.y),t=Math.abs(r.x-d.x)+1,z=Math.abs(r.y-d.y)+1;return{left:m,top:b,width:t,height:z}},f=(d)=>{let{left:m,top:b,width:t,height:z}=c(d);l.style.left=`${m}px`,l.style.top=`${b}px`,l.style.width=`${t}px`,l.style.height=`${z}px`},w=(d)=>{if(!r)return;f({x:d.clientX,y:d.clientY})},u=(d)=>{if(d.preventDefault(),!r){r={x:d.clientX,y:d.clientY};let P=F.fromScreenPosition(this.bot,r);g={x:P.globalX,y:P.globalY},f(r);return}let m={x:d.clientX,y:d.clientY},b=F.fromScreenPosition(this.bot,m);if(s(),!g){a(new Error("Capture anchor point unavailable"));return}let t=Math.min(g.x,b.globalX),z=Math.min(g.y,b.globalY),H=Math.max(g.x,b.globalX),A=Math.max(g.y,b.globalY);if(H-t<1||A-z<1){a(new Error("Capture area too small"));return}o({minGlobalX:t,minGlobalY:z,maxGlobalX:H,maxGlobalY:A})},n=(d)=>{if(d.key!=="Escape")return;s(),a(new Error("Capture cancelled"))};window.addEventListener("keydown",n,!0),p.addEventListener("pointermove",w),p.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let a=new Image;if(a.src=o,await S(a,["load"],["error"]),!(a.naturalWidth*a.naturalHeight>3000000||o.length>3000000))return o;let l=document.createElement("canvas");l.width=a.naturalWidth,l.height=a.naturalHeight;let r=l.getContext("2d");if(!r)return o;return r.drawImage(a,0,0),l.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),a=0,p;for(let l=0;l<45;l++){await new Promise((w)=>requestAnimationFrame(()=>{w()}));let{anchorScreenPosition:{x:r,y:g},pixelSize:s}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(s)||s<=0){a=0;continue}let c={anchorX:r,anchorY:g,pixelSize:s};if(!p){p=c,a=1;continue}if(Math.abs(c.anchorX-p.anchorX)+Math.abs(c.anchorY-p.anchorY)+Math.abs(c.pixelSize-p.pixelSize)<0.0012)a++;else a=0;if(p=c,a>=3)return}}update(){this.$strategy.value=this.bot.strategy,this.refreshProgress(),this.$images.innerHTML="";let o=document.createDocumentFragment();for(let a=0;a<this.bot.images.length;a++){let p=this.bot.images[a],l=document.createElement("div");o.append(l),l.className="image",l.innerHTML=`<button class="preview" title="View preview">
  <img src="${p.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${a===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${a===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,l.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=a,p.openPreviewPanel()}),l.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=a,p.openColorPanel()}),l.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=a,p.openPreviewPanel()}),l.querySelector(".download").addEventListener("click",()=>{p.exportImage()}),l.querySelector(".delete").addEventListener("click",()=>{p.destroy()}),l.querySelector(".up").addEventListener("click",()=>{po(this.bot.images,a,a-1),this.update(),N(this.bot)}),l.querySelector(".down").addEventListener("click",()=>{po(this.bot.images,a,a+1),this.update(),N(this.bot)})}this.$images.append(o)}refreshProgress(){let o=0,a=0;for(let r=0;r<this.bot.images.length;r++){let g=this.bot.images[r];o+=g.pixels.pixels.length*g.pixels.pixels[0].length,a+=g.tasks.length}let p=Math.max(0,o-a),l=o>0?p/o*100|0:0;this.$progressText.textContent=`${p}/${o} ${l}% ETA: ${a/120|0}h`,this.$progressLine.style.transform=`scaleX(${l/100})`}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Jo)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let a=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",a),localStorage.setItem(Jo,String(a)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){let o=document.body.classList.contains("overlay-hidden")?i("disabled"):i("enabled");this.$toggleOverlay.innerHTML=`<i class="fa-solid fa-layer-group"></i><span>${i("toggleOverlay")} (${o})</span>`}applyLocaleToUI(o){oo(o),D(this.element);for(let a=0;a<this.bot.images.length;a++)this.bot.images[a].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
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
</form>`,document.body.append(o),D(o);let a=o.querySelector(".settings-locale");a.value=Y(),a.addEventListener("change",()=>{this.applyLocaleToUI(a.value),D(o)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=i("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${i("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)}) · ${this.formatCountdown(this.autoFarmNextTickAt)}`:i("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=i("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${i("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)}) · ${this.formatCountdown(this.autoOverlayNextTickAt)}`:i("autoOverlayStopped")}formatCountdown(o){if(!o)return"00:00";let a=Math.max(0,o-Date.now()),p=Math.ceil(a/1000),l=Math.floor(p/60),r=p%60;return`next in ${String(l).padStart(2,"0")}:${String(r).padStart(2,"0")}`}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.autoFarmNextTickAt=void 0,this.refreshAutoFarmStatusText()}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.autoOverlayNextTickAt=void 0,this.refreshAutoOverlayStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${i("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.autoFarmIntervalId=window.setInterval(()=>{this.autoFarmNextTickAt=Date.now()+this.autoFarmConfig.timerMs,this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${i("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText();return}this.stopAutoOverlay(),this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.autoOverlayIntervalId=window.setInterval(()=>{this.autoOverlayNextTickAt=Date.now()+this.autoOverlayConfig.timerMs,this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{if(!await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels,0)){this.status=`⚠️ ${i("autoFarmStopped")}: ${i("autoFarmTransparentUnavailable")}`,this.stopAutoFarm();return}await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;try{if(!await this.bot.drawOverlayPixelsBatch(this.autoOverlayConfig.pixels)){this.status=`⚠️ ${i("autoOverlayStopped")}: ${i("autoOverlayNoTasks")}`,this.stopAutoOverlay();return}await this.waitAndClickPaintButton()}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Do,JSON.stringify(o))}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(ko,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(Do);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let p=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,l=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",r=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:l==="hours"?a.value*3600000:l==="minutes"?a.value*60000:a.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(a.value)),pixels:p,unit:l,timerMs:r}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=localStorage.getItem(ko);if(!o)return;try{let a=JSON.parse(o);if(typeof a.value!=="number"||!Number.isFinite(a.value)||a.value<1)return;let p=typeof a.pixels==="number"&&Number.isFinite(a.pixels)&&a.pixels>=1?Math.floor(a.pixels):60,l=a.unit==="hours"||a.unit==="minutes"||a.unit==="seconds"?a.unit:"minutes",r=typeof a.timerMs==="number"&&a.timerMs>0?a.timerMs:l==="hours"?a.value*3600000:l==="minutes"?a.value*60000:a.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(a.value)),pixels:p,unit:l,timerMs:r}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoFarmConfig?.unit??"minutes",p=this.autoFarmConfig?.value??1,l=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${i("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${l}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
    <button type="button" class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),D(o);let r=o.querySelector(".autofarm-unit");r.value=a;let g=o.querySelector(".autofarm-value"),s=o.querySelector(".autofarm-pixels"),c=()=>{let f=Math.max(1,Number.parseInt(g.value||"1",10));if(r.value==="hours")return f*3600000;if(r.value==="minutes")return f*60000;return f*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(s.value||"60",10)),unit:r.value,timerMs:c()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let a=this.autoOverlayConfig?.unit??"minutes",p=this.autoOverlayConfig?.value??1,l=this.autoOverlayConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${i("close")}"><span class="icon">×</span></button>
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
      <input class="autofarm-pixels" type="number" min="1" step="1" value="${l}" />
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
    <button type="button" class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
  </div>
</form>`,document.body.append(o),D(o);let r=o.querySelector(".autofarm-unit");r.value=a;let g=o.querySelector(".autofarm-value"),s=o.querySelector(".autofarm-pixels"),c=()=>{let f=Math.max(1,Number.parseInt(g.value||"1",10));if(r.value==="hours")return f*3600000;if(r.value==="minutes")return f*60000;return f*1000};o.querySelector(".autooverlay-start").onclick=()=>{this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(g.value||"1",10)),pixels:Math.max(1,Number.parseInt(s.value||"60",10)),unit:r.value,timerMs:c()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,a){this.element.querySelector("."+o).disabled=a}async run(o,a,p,l="..."){console.log("[KGM][Widget] Task started",{status:o});let r=this.status;this.status=`${l} ${o}`;try{let g=await a();return this.status=r,console.log("[KGM][Widget] Task completed",{status:o}),g}catch(g){if(!(g instanceof ao))console.error(g),this.status=`${i("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:g}),g}finally{await p?.()}}handleKeyboard(o){if(No(o.target))return;if(U(o,k.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(U(o,k.showShortcuts)){o.preventDefault(),this.open=!0,this.openSettingsModal();return}if(U(o,k.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(U(o,k.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(U(o,k.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(U(o,k.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(U(o,k.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(U(o,k.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(U(o,k.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(U(o,k.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(U(o,k.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(U(o,k.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),N(this.bot)}async waitAndClickPaintButton(){await this.run(i("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){this.triggerNativePaintClick(o);return}await new Promise((a)=>setTimeout(a,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((p)=>Array.from(document.querySelectorAll(p))).find((p)=>/pintar|paint/i.test(p.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}}var Yo=2,Uo="[KGM]",Qo="kglacer-macro:access-ok",wo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",ho="kgm-access-locked";class jo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,a){if(a===void 0)console.log(`${Uo} ${o}`);else console.log(`${Uo} ${o}`,a)}constructor(){this.log("Boot sequence started"),document.body.classList.add(ho);let o=Mo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let p=0;p<o.images.length;p++){let l=o.images[p];I({x:l.position[0]-1000,y:l.position[1]-1000}),I({x:l.position[0]+1000,y:l.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let a=document.createElement("style");a.textContent=Po.replace("FAKE_FAVORITE_LOCATIONS",T.length.toString()),document.head.append(a),this.log("Styles injected",{fakeFavoriteLocations:T.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(ho),this._widget=new fo(this),await this.widget.run(i("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let p=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((l)=>{for(let r=0;r<l.length;r++)if(l[r].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(p,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await Q(500),await this.updateColors(),o)for(let l=0;l<o.images.length;l++){let r=await G.fromJSON(this,o.images[l]);this.images.push(r),r.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Qo)===wo)return;await new Promise((o)=>{let a=document.createElement("dialog");a.className="kgm-modal access-dialog",a.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(a),D(a);let p=a.querySelector(".access-input"),l=a.querySelector(".access-error"),r=a.querySelector(".access-locale");r.innerHTML=mo().map((g)=>`<option value="${g}" ${g===Y()?"selected":""}>${g.toUpperCase()}</option>`).join(""),r.addEventListener("change",()=>{oo(r.value),D(a)}),a.addEventListener("cancel",(g)=>{g.preventDefault()}),a.querySelector("form").addEventListener("submit",(g)=>{g.preventDefault();let s=atob(wo);if(p.value.trim()!==s){l.textContent=i("invalidAccessKey");return}localStorage.setItem(Qo,wo),a.close(),a.remove(),o()}),a.showModal(),p.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),a=(p)=>{if(!p.shiftKey)p.stopPropagation()};return this.widget.run(i("taskDrawing"),async()=>{await this.widget.run(i("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",a,!0),o.addEventListener("wheel",a,!0),this.updateTasks();let p=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((g)=>g.json()),l=Math.floor(p.charges.count);this.log("Charges fetched",{charges:l});let r=0;for(let g=0;g<this.images.length;g++)r+=this.images[g].tasks.length;switch(this.log("Tasks prepared",{tasks:r}),this.strategy){case"ALL":{while(l>0){let g=!0;for(let s=0;s<this.images.length;s++){let c=this.images[s].tasks.shift();if(!c)continue;this.drawTask(c),l--,await Q(1),g=!1}if(g)break}break}case"PERCENTAGE":{for(let g=0;g<r&&l>0;g++){let s=1,c;for(let f=0;f<this.images.length;f++){let w=this.images[f],u=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(u<s)s=u,c=w}this.drawTask(c.tasks.shift()),l--,await Q(1)}break}case"SEQUENTIAL":for(let g=0;g<this.images.length;g++){let s=this.images[g];for(let c=s.tasks.shift();c&&l>0;c=s.tasks.shift())this.drawTask(c),l--,await Q(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:l})},()=>{globalThis.removeEventListener("mousemove",a,!0),o.removeEventListener("wheel",a,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:Yo,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let a=document.querySelector(".maplibregl-canvas"),p=window.innerWidth/2,l=window.innerHeight/2,r=p-o.x,g=l-o.y;function s(c,f,w){a.dispatchEvent(new MouseEvent(c,{bubbles:!0,cancelable:!0,clientX:f,clientY:w,buttons:1}))}s("mousedown",p,l),s("mousemove",r,g),s("mouseup",r,g)}readMap(){this.mapsCache.clear();let o=new Set;for(let p=0;p<this.images.length;p++){let l=this.images[p],{tileX:r,tileY:g}=new F(this,l.position.globalX+l.pixels.pixels[0].length,l.position.globalY+l.pixels.pixels.length);for(let s=l.position.tileX;s<=r;s++)for(let c=l.position.tileY;c<=g;c++)o.add(`${s}/${c}`)}let a=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${i("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(p)=>{this.mapsCache.set(p,await Z.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${p}.png`,exactColor:!0})),this.widget.status=`⌛ ${i("taskReadingMap")} [${++a}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let a=0,p=1,l=1/0,r=1/0;for(let c=0;c<this.$stars.length;c++){let{x:f,y:w}=C(this.$stars[c]);if(f<o.x&&w<o.y){let u=o.x-f+(o.y-w);if(u<l)l=u,a=c}else if(f>o.x&&w>o.y){let u=f-o.x+(w-o.y);if(u<r)r=u,p=c}}let g=C(this.$stars[a]),s=K[a];return{anchorScreenPosition:g,anchorWorldPosition:s,pixelSize:(C(this.$stars[p]).x-g.x)/(K[p].x-s.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await Q(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await Q(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await Q(1)}drawTask(o){if(this.lastColor!==o.color){let l=document.getElementById("color-"+o.color);if(!l){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}l.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let a=o.position.pixelSize/2,p=o.position.toScreenPosition();if(!Number.isFinite(p.x)||!Number.isFinite(p.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:p.x+a,clientY:p.y+a,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((d)=>!d.disabled&&d.getAttribute("aria-disabled")!=="true"&&d.offsetParent!==null);if(!o.length)return;let a=o[Math.floor(Math.random()*o.length)],p=Number.parseInt(a.id.slice(6),10);if(!Number.isFinite(p))return;let l=document.querySelector(".maplibregl-canvas");if(!l)return;let r=l.getBoundingClientRect(),g=24,s=r.left+g,c=r.right-g,f=r.top+g,w=r.bottom-g;if(c<=s||w<=f)return;let u=s+Math.random()*(c-s),n=f+Math.random()*(w-f);this.drawTask({color:p,position:F.fromScreenPosition(this,{x:u,y:n})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o,a){let p=Math.max(1,Math.floor(o)),l=0;return await this.widget.run(i("taskDrawingRandomPixels"),async()=>{await this.widget.run(i("taskInitializingDraw"),()=>this.updateColors());let r=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((m)=>!m.disabled&&m.getAttribute("aria-disabled")!=="true"&&m.offsetParent!==null),g=document.querySelector(".maplibregl-canvas");if(!r.length||!g)return;let s=a===void 0?void 0:r.find((m)=>Number.parseInt(m.id.slice(6),10)===a);if(a!==void 0&&!s)return;let c=g.getBoundingClientRect(),f=24,w=c.left+f,u=c.right-f,n=c.top+f,d=c.bottom-f;if(u<=w||d<=n)return;for(let m=0;m<p;m++){let b=s??r[Math.floor(Math.random()*r.length)],t=Number.parseInt(b.id.slice(6),10);if(!Number.isFinite(t))continue;let z=w+Math.random()*(u-w),H=n+Math.random()*(d-n);this.drawTask({color:t,position:F.fromScreenPosition(this,{x:z,y:H})}),l++,await Q(1)}}),l}async drawOverlayPixelsBatch(o){let a=Math.max(1,Math.floor(o)),p=0;return await this.widget.run(i("taskDrawingOverlayPixels"),async()=>{await this.widget.run(i("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let l=0;l<a;l++){let r=this.takeNextTaskFromStrategy();if(!r)break;this.drawTask(r),p++,await Q(1)}this.widget.update()}),p}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let a=this.images[o].tasks.shift();if(a)return a}return}case"PERCENTAGE":{let o,a=Number.POSITIVE_INFINITY;for(let p=0;p<this.images.length;p++){let l=this.images[p];if(!l.tasks.length)continue;let r=l.pixels.pixels.length*l.pixels.pixels[0].length,g=1-l.tasks.length/r;if(g<a)a=g,o=l}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=globalThis.fetch,a=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(p,l)=>{let r=await o(p,l),g=r.clone(),s="";if(typeof p=="string")s=p;else if(p instanceof Request)s=p.url;else if(p instanceof URL)s=p.href;if(r.url==="https://backend.wplace.live/me")this.me=await g.json(),this.me.favoriteLocations.unshift(...T),this.me.maxFavoriteLocations=1/0,r.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let c=a.exec(s);if(c){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new F(this,+c[1],+c[2],+c[3],+c[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return r}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await Q(1)}waitForElement(o,a){return this.log("Waiting for element",{name:o,selector:a}),this.widget.run(`${i("taskWaitingFor")} ${o}`,()=>{return new Promise((p)=>{let l=document.querySelector(a);if(l){p(l);return}let r=new MutationObserver(()=>{let g=document.querySelector(a);if(g)r.disconnect(),p(g)});r.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,T.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new jo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
