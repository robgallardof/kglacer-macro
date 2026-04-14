// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      3.0.3
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
function lo(o,p,l){let r=o[l];return o[l]=o[p],o[p]=r,o}function ro(o,p){let l=o.indexOf(p);if(l!==-1)o.splice(l,1);return l}var la=Math.floor(Math.random()*65536),ra=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function j(o){return new Promise((p)=>setTimeout(p,o))}function W(o,p,l=["error"],r="addEventListener"){return new Promise((a,f)=>{for(let g=0;g<p.length;g++)o[r]?.(p[g],a);for(let g=0;g<l.length;g++)o[r]?.(l[g],f)})}class Vo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:l}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+l<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,l)=>p+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,l=Math.min(p,this.historyTime);return{time:o,historyTime:l}}}var no=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto farm",shortcutStopAutoFarm:"Stop auto farm",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ open settings · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",openConfig:"Config",settingsModalTitle:"Settings",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start",autoFarmStop:"Stop",autoFarmNeedsConfig:"Configure auto farm first",autoFarmTransparentUnavailable:"Transparent color unavailable",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configure auto draw",autoOverlayStopped:"Stopped",autoOverlayRunning:"Running",autoOverlayModalTitle:"Auto draw timer",autoOverlayHelp:"Draw overlay image pixels, click Paint, then repeat by timer.",autoOverlayTimer:"Timer",autoOverlayPixelsPerCycle:"Pixels per cycle",autoOverlayStart:"Start",autoOverlayStop:"Stop",autoOverlayNeedsConfig:"Configure auto draw first",autoOverlayNoTasks:"No pending overlay pixels found in images",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskDrawingRandomPixels:"Drawing random pixels",taskDrawingOverlayPixels:"Drawing overlay pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto farm",shortcutStopAutoFarm:"Detener auto farm",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ abrir configuración · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",openConfig:"Config",settingsModalTitle:"Configuración",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar",autoFarmStop:"Detener",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmTransparentUnavailable:"Color transparente no disponible",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",autoOverlaySection:"Auto draw",configureAutoOverlay:"Configurar auto draw",autoOverlayStopped:"Detenido",autoOverlayRunning:"Activo",autoOverlayModalTitle:"Temporizador auto draw",autoOverlayHelp:"Dibuja píxeles de la imagen overlay, pulsa Pintar y repite por temporizador.",autoOverlayTimer:"Temporizador",autoOverlayPixelsPerCycle:"Píxeles por ciclo",autoOverlayStart:"Iniciar",autoOverlayStop:"Detener",autoOverlayNeedsConfig:"Primero configura el auto draw",autoOverlayNoTasks:"No hay píxeles pendientes en las imágenes overlay",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",taskDrawingOverlayPixels:"Dibujando píxeles del overlay",captureHintSelectArea:"Selecciona área"}};function ko(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let p=0;p<no.length;p++){let l=localStorage.getItem(no[p]);if(!l||!(l in y))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return ko()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function mo(){return Object.keys(y)}function n(o){let p=_();return y[p][o]}function U(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=n(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",n(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",n(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",n(p.dataset.i18nPlaceholder))}class X{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let l in p)this[l]=o.querySelector(p[l])}registerEvent(o,p,l,r={}){r.passive??=!0,o.addEventListener(p,l,r),this.runOnDestroy.push(()=>{o.removeEventListener(p,l)})}}function fo(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function zo(o,p,l){let r=fo(o/255),a=fo(p/255),f=fo(l/255),g=Math.cbrt(0.4122214708*r+0.5363325363*a+0.0514459929*f),c=Math.cbrt(0.2119034982*r+0.6806995451*a+0.1073969566*f),w=Math.cbrt(0.0883024619*r+0.2817188376*a+0.6299787005*f),s=0.2104542553*g+0.793617785*c-0.0040720468*w,u=1.9779984951*g-2.428592205*c+0.4505937099*w,b=0.0259040371*g+0.7827717662*c-0.808675766*w;return[s,u,b]}function io(o,p,l){let[r,a,f]=o,[g,c,w]=p,s=(po)=>po*180/Math.PI,u=(po)=>po*Math.PI/180,b=1,d=1,m=1,z=Math.sqrt(a**2+f**2),i=Math.sqrt(c**2+w**2),A=(z+i)/2,M=0.5*(1-Math.sqrt(A**7/(A**7+6103515625))),H=a*(1+M),N=c*(1+M),D=Math.sqrt(H**2+f**2),G=Math.sqrt(N**2+w**2),V=f===0&&H===0?0:s(Math.atan2(f,H))%360,O=w===0&&N===0?0:s(Math.atan2(w,N))%360,v=g-r,Y=G-D,S=0;if(D*G!==0){if(S=O-V,S>180)S-=360;else if(S<-180)S+=360}let $=2*Math.sqrt(D*G)*Math.sin(u(S)/2),x=(r+g)/2,e=(D+G)/2,B=(V+O)/2;if(Math.abs(V-O)>180)B+=180;let qo=1-0.17*Math.cos(u(B-30))+0.24*Math.cos(u(2*B))+0.32*Math.cos(u(3*B+6))-0.2*Math.cos(u(4*B-63)),Zo=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),uo=1+0.045*e,bo=1+0.015*e*qo,Wo=30*Math.exp((-((B-275)/25))**2),Ro=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(u(2*Wo));return Math.sqrt((v/(1*Zo))**2+(Y/(1*uo))**2+($/(1*bo))**2+Ro*(Y/(1*uo))*($/(1*bo)))-v*l}var k=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],R=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function go(o){if(o===0)return"transparent";let p=k[o],l=`oklab(${p[0]*100}% ${p[1]} ${p[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",l))return l;let[r=0,a=0,f=0]=(R[o]??"0,0,0").split(",").map((g)=>Number.parseInt(g,10));return`rgb(${r} ${a} ${f})`}var Ao=`<div class="wtopbar">
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
`;class C{bot;image;width;exactColor;static async fromJSON(o,p){let l=new Image;return l.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((r)=>r.blob()).then((r)=>URL.createObjectURL(r)):p.url,await W(l,["load"],["error"]),new C(o,l,p.width,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,l=p.naturalWidth,r=!1){this.bot=o;this.image=p;this.width=l;this.exactColor=r;if(r)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))o.set(R[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let r=0;r<this.canvas.width;r++){let a=(l*this.canvas.width+r)*4,f=p[a],g=p[a+1],c=p[a+2],w=p[a+3],s=f,u=g,b=c,d=`${s},${u},${b}`;if(this.exactColor){this.pixels[l][r]=w<100?0:R.indexOf(d);continue}let m,z;if(w<100)m=z=0;else if(o.has(d))[m,z]=o.get(d);else{let A=1/0,M=1/0;for(let H=0;H<k.length;H++){let N=k[H],D=io(zo(s,u,b),N,0);if(!this.bot.unavailableColors.has(H)&&D<A)A=D,m=H;if(D<M)M=D,z=H}o.set(d,[m,z])}if(m!==0)this.context.fillStyle=`oklab(${k[m][0]*100}% ${k[m][1]} ${k[m][2]})`,this.context.fillRect(r,l,1,1);this.pixels[l][r]=m;let i=this.colors.get(z);if(i)i.amount++;else this.colors.set(z,{color:m,amount:1,realColor:z})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var T="kglacer-macro-settings",Ho=["kglacermacro","wbot"],t="kgm";function Bo(){let o=[T,...Ho];for(let p=0;p<o.length;p++){let l=o[p],r=localStorage.getItem(l);if(!r)continue;return{json:r,key:l}}return}function Po(){let o=Bo();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let l=p;p.images=l.widget.images,p.strategy=l.widget.strategy,delete l.widget}if(o.key!==T)localStorage.setItem(T,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Mo;function F(o,p=!1){if(clearTimeout(Mo),p)localStorage.setItem(T,JSON.stringify(o));else Mo=setTimeout(()=>{localStorage.setItem(T,JSON.stringify(o))},600)}var P=1000,To=2048,h=P*To,q=[],E=[],ho=Date.now();function I(o){q.push(o),E.push({id:ho++,latitude:(2*Math.atan(Math.exp(-(o.y/h*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/h*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:h/3|0,y:h/3|0});I({x:h/3*2|0,y:h/3*2|0});function L(o){let[p,l]=o.style.transform.slice(32,-31).split(", ").map((r)=>Number.parseFloat(r));return{x:p,y:l}}class J{bot;static fromJSON(o,p){return new J(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:l,pixelSize:r,anchorWorldPosition:a}=o.findAnchorsForScreen(p);return new J(o,a.x+(p.x-l.x)/r|0,a.y+(p.y-l.y)/r|0)}globalX=0;globalY=0;get tileX(){return this.globalX/P|0}set tileX(o){this.globalX=o*P+this.x}get tileY(){return this.globalY/P|0}set tileY(o){this.globalY=o*P+this.y}get x(){return this.globalX%P}set x(o){this.globalX=this.tileX*P+o}get y(){return this.globalY%P}set y(o){this.globalY=this.tileY*P+o}anchor1Index;anchor2Index;get pixelSize(){return(L(this.bot.$stars[this.anchor2Index]).x-L(this.bot.$stars[this.anchor1Index]).x)/(q[this.anchor2Index].x-q[this.anchor1Index].x)}constructor(o,p,l,r,a){this.bot=o;if(r===void 0||a===void 0)this.globalX=p,this.globalY=l;else this.globalX=p*P+r,this.globalY=l*P+a;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let l=0;l<q.length;l++){let{x:r,y:a}=q[l];if(r<this.globalX&&a<this.globalY){let f=this.globalX-r+(this.globalY-a);if(f<o)o=f,this.anchor1Index=l}else if(r>this.globalX&&a>this.globalY){let f=r-this.globalX+(a-this.globalY);if(f<p)p=f,this.anchor2Index=l}}}toScreenPosition(){let o=q[this.anchor1Index],p=L(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new J(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class Z extends X{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,p){return new Z(o,J.fromJSON(o,p.position),await C.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,p,l,r="SPIRAL_FROM_CENTER",a=50,f=!1,g=!1,c=[],w=!1){super();this.bot=o;this.position=p;this.pixels=l;this.strategy=r;this.opacity=a;this.drawTransparentPixels=f;this.drawColorsInOrder=g;this.colors=c;this.lock=w;this.element.innerHTML=Ao,this.element.classList.add("wimage"),U(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();F(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),F(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),F(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,F(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,F(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),F(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(s)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(s.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(s)=>{if(s.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let s of this.element.querySelectorAll(".resize"))this.registerEvent(s,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,l=new Map;for(let r=0;r<this.colors.length;r++){let a=this.colors[r];if(a.disabled)p.add(a.realColor);l.set(a.realColor,r)}for(let{x:r,y:a}of this.strategyPositionIterator()){let f=this.pixels.pixels[a][r];if(p.has(f))continue;o.globalX=this.position.globalX+r,o.globalY=this.position.globalY+a;let g=o.getMapColor();if(f!==g&&(this.drawTransparentPixels||f!==0))this.tasks.push({position:o.clone(),color:f})}if(this.drawColorsInOrder)this.tasks.sort((r,a)=>(l.get(r.color)??0)-(l.get(a.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),l=this.position.pixelSize*this.pixels.width,r=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${p.toFixed(3)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${r}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let a=this.pixels.pixels.length*this.pixels.pixels[0].length,f=Math.max(0,a-this.tasks.length),g=a>0?f/a*100|0:0;this.$progressText.textContent=`${f}/${a} ${g}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${g/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let c of this.element.querySelectorAll(".resize"))c.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),ro(this.bot.images,this),this.bot.widget.update(),F(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-l.left,offsetY:o.clientY-l.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-p.width-8),r=Math.max(8,window.innerHeight-p.height-8),a=Math.min(l,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),f=Math.min(r,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(a)}px`,this.$colorsDialog.style.top=`${Math.round(f)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let p=document.createDocumentFragment(),l=document.createElement("article");l.className="preview-card";let r=document.createElement("strong");r.textContent=this.getStrategyLabel(o);let a=document.createElement("canvas");a.className="preview-canvas",a.width=156,a.height=156,this.paintStrategyPreview(a,o),l.append(r,a),p.append(l),this.$previewDialogList.append(p)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((l,r)=>`${r}:${l.realColor}:${l.disabled?1:0}`).join("|"),p=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===p)return;this.previewCacheSignature=p,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return n("random");case"HUMANIZED":return n("humanized");case"HUMAN_SOFT_DITHER":return n("humanSoftDither");case"HUMAN_PATCHY":return n("humanPatchy");case"HUMAN_SWEEP_ARCS":return n("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return n("humanMicroCorrections");case"HUMAN_JITTER_FILL":return n("humanJitterFill");case"HUMAN_CORNER_BIAS":return n("humanCornerBias");case"HUMAN_LONG_STROKES":return n("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return n("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return n("humanMessySpiral");case"HUMAN_DRUNK_WALK":return n("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return n("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return n("humanPatchJump");case"HUMAN_HESITANT_LINES":return n("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return n("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return n("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return n("humanGapRecovery");case"HUMAN_STAIRCASE":return n("humanStaircase");case"HUMAN_EDGE_HUGGER":return n("humanEdgeHugger");case"HUMAN_BLOBS":return n("humanBlobs");case"HUMAN_BACKTRACK":return n("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return n("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return n("humanLateFixes");case"ZIGZAG":return n("zigzag");case"BRUSH_STROKES":return n("brushStrokes");case"DIAGONAL_BRUSH":return n("diagonalBrush");case"DOWN":return n("down");case"UP":return n("up");case"LEFT":return n("left");case"RIGHT":return n("right");case"SPIRAL_FROM_CENTER":return n("spiralOut");case"SPIRAL_TO_CENTER":return n("spiralIn");case"SCRIBBLE":return n("scribble");case"CROSSHATCH":return n("crosshatch");case"WAVE_SWEEP":return n("waveSweep");case"SCATTERED_LINES":return n("scatteredLines");case"CONTOUR_JITTER":return n("contourJitter");case"SPIRAL_WOBBLE":return n("spiralWobble");case"CLUSTER_BURSTS":return n("clusterBursts");case"ORBITAL":return n("orbital");case"FLOW_FIELD":return n("flowField");case"EDGE_IN":return n("edgeIn");default:return o}}paintStrategyPreview(o,p){let l=o.getContext("2d");if(!l)return;l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);let r=this.getSampledImagePreviewData(),a=this.getCachedPreviewSequence(p,r.mask,r.width,r.height),f=Math.min(o.width/r.width,o.height/r.height),g=(o.width-r.width*f)/2,c=(o.height-r.height*f)/2,w=this.previewAnimations.get(o);if(w)cancelAnimationFrame(w),this.previewAnimationHandles.delete(w);let s=(A)=>{let M=requestAnimationFrame((H)=>{this.previewAnimationHandles.delete(M),A(H)});return this.previewAnimationHandles.add(M),M},u=(A)=>{l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);for(let M=0;M<Math.min(A,a.length);M++){let H=a[M],N=r.colors.get(`${H.x}:${H.y}`)??0;if(!N)continue;l.fillStyle=go(N),l.fillRect(g+H.x*f,c+H.y*f,Math.max(1,f),Math.max(1,f))}},b=Math.min(3400,Math.max(900,a.length*8)),m=b+220,z=(A,M)=>{if(!this.$previewDialog.open)return;let H=(M-A)%m,N=Math.min(1,H/b),D=N*N*(3-2*N);u(Math.floor(a.length*D));let G=s((V)=>{z(A,V)});this.previewAnimations.set(o,G)},i=performance.now();z(i,i)}getCachedPreviewSequence(o,p,l=this.pixels.width,r=this.pixels.height){let a=this.colors.map((w,s)=>`${s}:${w.realColor}:${w.disabled?1:0}`).join("|"),f=`${o}:${l}x${r}:${p.length}:${this.drawColorsInOrder?1:0}:${a}`,g=this.previewSequenceCache.get(f);if(g)return g;let c=l===this.pixels.width&&r===this.pixels.height?this.getExactPreviewSequence(o,p):this.getApproxPreviewSequence(o,p,l);if(this.drawColorsInOrder){let w=new Map;for(let s=0;s<this.colors.length;s++)w.set(this.colors[s].realColor,s);c.sort((s,u)=>(w.get(this.pixels.pixels[s.y]?.[s.x]??0)??0)-(w.get(this.pixels.pixels[u.y]?.[u.x]??0)??0))}return this.previewSequenceCache.set(f,c),c}getExactPreviewSequence(o,p){let l=this.strategy;this.strategy=o;let r=[...this.strategyPositionIterator()];this.strategy=l;let a=new Set(p.map(({x:f,y:g})=>`${f}:${g}`));return r.filter(({x:f,y:g})=>a.has(`${f}:${g}`))}getApproxPreviewSequence(o,p,l){let r=[...p],a=(c,w,s)=>{return(c*73856093+w*19349663+s*83492791>>>0)/4294967296},f=(c,w)=>r.sort((s,u)=>s.x*c+s.y*w-(u.x*c+u.y*w)||s.y-u.y||s.x-u.x),g=r.sort((c,w)=>{if(c.y!==w.y)return c.y-w.y;let s=c.y%2===0?c.x:l-c.x,u=w.y%2===0?w.x:l-w.x;return s-u});switch(o){case"UP":return f(0,-1);case"LEFT":return f(-1,0);case"RIGHT":return f(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let c=l/2,w=Math.max(1,Math.round(r.reduce((s,u)=>s+u.y,0)/Math.max(1,r.length)));return r.sort((s,u)=>{let b=(s.x-c)**2+(s.y-w)**2,d=(u.x-c)**2+(u.y-w)**2;return o==="SPIRAL_FROM_CENTER"?b-d:d-b}),r}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return r.sort((c,w)=>a(c.x,c.y,o.length)-a(w.x,w.y,o.length));default:return g}}getSampledImagePreviewData(){let o=this.pixels.width,p=this.pixels.height,l=Z.PREVIEW_MASK_BASE_WIDTH,r=Z.PREVIEW_MASK_BASE_HEIGHT,a=Math.min(1,l/Math.max(1,o),r/Math.max(1,p)),f=Math.max(1,Math.round(o*a)),g=Math.max(1,Math.round(p*a)),c=new Set;for(let b=0;b<this.colors.length;b++){let d=this.colors[b];if(d.disabled)c.add(d.realColor)}let w=new Map,s=new Map;for(let b=0;b<p;b++)for(let d=0;d<o;d++){let m=this.pixels.pixels[b]?.[d]??0;if(!m||c.has(m))continue;let z=Math.min(f-1,Math.floor(d/o*f)),i=Math.min(g-1,Math.floor(b/p*g)),A=`${z}:${i}`;if(!w.has(A))w.set(A,{x:z,y:i});if(!s.has(A))s.set(A,m)}let u=[...w.values()];if(!u.length){let b=this.fallbackPreviewMask();return{width:o,height:p,mask:b,colors:new Map(b.map((d)=>[`${d.x}:${d.y}`,this.pixels.pixels[d.y]?.[d.x]??0]))}}return{width:f,height:g,mask:u,colors:s}}getImagePreviewMask(){let o=this.pixels.width,p=this.pixels.height,l=new Set;for(let a=0;a<this.colors.length;a++){let f=this.colors[a];if(f.disabled)l.add(f.realColor)}let r=[];for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=this.pixels.pixels[a]?.[f]??0;if(g!==0&&!l.has(g))r.push({x:f,y:a})}return r.length?r:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,l=this.pixels.height/2,r=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let a=0;a<this.pixels.height;a++)for(let f=0;f<this.pixels.width;f++)if((f-p)**2+(a-l)**2<=r**2)o.push({x:f,y:a});return o}applyLocale(){if(U(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=R[o]??"0,0,0",[l=0,r=0,a=0]=p.split(",").map((f)=>Number.parseInt(f,10));return`#${[l,r,a].map((f)=>f.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=R[o]??"0,0,0",[l=0,r=0,a=0]=p.split(",").map((w)=>Number.parseInt(w,10)),f=Math.max(l,r,a),g=Math.min(l,r,a);if(f-g<15)return["gray","grey","gris","neutral","neutro"];if(l>r+30&&l>a+30)return["red","rojo"];if(r>l+30&&r>a+30)return["green","verde"];if(a>l+30&&a>r+30)return["blue","azul"];if(l>170&&r>120&&a<130)return["orange","naranja"];if(l>170&&r>110&&a>140)return["pink","rosa"];if(l>120&&r<100&&a>120)return["purple","violet","morado"];if(l>130&&r>130&&a<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",n("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((l)=>!this.pixels.colors.has(l.realColor)))this.colors=this.pixels.colors.values().toArray().sort((l,r)=>r.amount-l.amount).map((l)=>({realColor:l.realColor,disabled:!1})),F(this.bot);for(let l=0;l<this.colors.length;l++){let r=this.colors[l],a=this.pixels.colors.get(r.realColor),f=!1,g=a.realColor!==a.color,c=a.amount/o*100,w=this.colorHex(a.realColor),s=this.colorKeywords(a.realColor),u=()=>{r.disabled=r.disabled?void 0:!0,b.classList.toggle("disabled",Boolean(r.disabled));let m=b.querySelector(".state");if(m)m.textContent=r.disabled?n("disabled"):n("enabled");F(this.bot)},b=document.createElement("button");if(b.className=`color-chip ${r.disabled?"disabled":""}`,b.draggable=!0,b.setAttribute("aria-label",`${n("overlayColors")} #${l+1}: ${w.toUpperCase()}`),b.innerHTML=`<span class="order-index">#${l+1}</span>
<span class="drag" title="${n("up")} / ${n("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${c.toFixed(1)}%</span>
  <span class="hex">${w.toUpperCase()}</span>
  <span class="state">${r.disabled?n("disabled"):n("enabled")}</span>
</span>
<span class="premium ${g?"on":""}">${g?n("premium"):""}</span>`,b.querySelector(".swatch").style.setProperty("--swatch-color",go(a.realColor)),b.addEventListener("click",()=>{if(f){f=!1;return}u()}),b.addEventListener("dragstart",(m)=>{f=!0,b.classList.add("dragging"),m.dataTransfer?.setData("text/plain",String(l)),m.dataTransfer.effectAllowed="move"}),b.addEventListener("dragend",()=>{b.classList.remove("dragging")}),b.addEventListener("dragover",(m)=>{m.preventDefault(),b.classList.add("drag-target")}),b.addEventListener("dragleave",()=>{b.classList.remove("drag-target")}),b.addEventListener("drop",(m)=>{m.preventDefault(),b.classList.remove("drag-target");let z=Number.parseInt(m.dataTransfer?.getData("text/plain")??"-1",10);if(z<0||z===l||z>=this.colors.length)return;this.colors.splice(l,0,...this.colors.splice(z,1)),F(this.bot),this.updateColors()}),g){let m=document.createElement("button");m.textContent=n("buy"),m.className="buy-chip",m.addEventListener("click",(z)=>{z.stopPropagation(),document.getElementById("color-"+a.realColor)?.click()}),b.append(m)}let d=`${w} ${s.join(" ")} ${a.realColor} ${R[a.realColor]}`;if(!p||d.toLowerCase().includes(p))this.$colorsDialogList.append(b)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<p;l++)for(let r=0;r<o;r++)yield{x:r,y:l};break}case"UP":{for(let l=p-1;l>=0;l--)for(let r=0;r<o;r++)yield{x:r,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let r=0;r<p;r++)yield{x:l,y:r};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let r=0;r<p;r++)yield{x:l,y:r};break}case"RANDOM":{let l=[];for(let r=0;r<p;r++)for(let a=0;a<o;a++)l.push({x:a,y:r});for(let r=l.length-1;r>=0;r--){let a=Math.floor(Math.random()*(r+1)),f=l[r];l[r]=l[a],l[a]=f}yield*l;break}case"ZIGZAG":{for(let l=0;l<p;l++)if(l%2===0)for(let r=0;r<o;r++)yield{x:r,y:l};else for(let r=o-1;r>=0;r--)yield{x:r,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,p)/10)),r=[];for(let a=0;a<p;a+=l)for(let f=0;f<o;f+=l)r.push({x:f,y:a});for(let a=r.length-1;a>=0;a--){let f=Math.floor(Math.random()*(a+1)),g=r[a];r[a]=r[f],r[f]=g}for(let a=0;a<r.length;a++){let f=r[a],g=Math.min(p,f.y+l),c=Math.min(o,f.x+l);for(let w=f.y;w<g;w++)if(Math.random()>0.35)for(let u=f.x;u<c;u++)yield{x:u,y:w};else for(let u=c-1;u>=f.x;u--)yield{x:u,y:w}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let r=0;r<p;r++){let a=Math.floor(Math.random()*3)-1;if((r+a)%2===0)for(let g=0;g<o;g+=2)l.add(`${g},${r}`),yield{x:g,y:r};else for(let g=1;g<o;g+=2)l.add(`${g},${r}`),yield{x:g,y:r}}for(let r=0;r<p;r++)for(let a=0;a<o;a++){let f=`${a},${r}`;if(l.has(f))continue;yield{x:a,y:r}}break}case"HUMAN_PATCHY":{let l=new Set,r=o*p;while(l.size<r){let a=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p),g=1+Math.floor(Math.random()*5);for(let c=f-g;c<=f+g;c++)for(let w=a-g;w<=a+g;w++){if(w<0||w>=o||c<0||c>=p)continue;if(Math.hypot(w-a,c-f)>g+Math.random()*1.2)continue;let s=`${w},${c}`;if(l.has(s))continue;l.add(s),yield{x:w,y:c}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,r=(o-1)/2,a=(p-1)/2,f=Math.hypot(r,a);for(let g=0;g<4;g++){let c=Math.random()*Math.PI*2;for(let w=0;w<=f;w+=0.35){let s=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(w*8));for(let b=0;b<u;b++){let d=c+s*b/u+Math.sin(w)*0.08,m=Math.round(r+Math.cos(d)*w),z=Math.round(a+Math.sin(d)*w);if(m<0||m>=o||z<0||z>=p)continue;let i=`${m},${z}`;if(l.has(i))continue;l.add(i),yield{x:m,y:z}}}}for(let g=0;g<p;g++)for(let c=0;c<o;c++){let w=`${c},${g}`;if(l.has(w))continue;yield{x:c,y:g}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let r=0;r<p;r++){let a=r%2===0?1:-1,f=a>0?0:o-1;for(let g=0;g<o;g++){let c=f+(Math.random()>0.82?a:0),w=r+(Math.random()>0.9?1:0);for(let s of[{x:f,y:r},{x:c,y:r},{x:f,y:w}]){if(s.x<0||s.x>=o||s.y<0||s.y>=p)continue;let u=`${s.x},${s.y}`;if(l.has(u))continue;l.add(u),yield s}f+=a}}for(let r=0;r<p;r++)for(let a=0;a<o;a++){let f=`${a},${r}`;if(l.has(f))continue;yield{x:a,y:r}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let r=0;r<p;r++)for(let a=0;a<o;a++)l.push({x:a,y:r});l.sort((r,a)=>{let f=r.y+(Math.random()-0.5)*1.8,g=a.y+(Math.random()-0.5)*1.8;if(f!==g)return f-g;return r.x+(Math.random()-0.5)*2-(a.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],r=l[Math.floor(Math.random()*l.length)],a=[];for(let f=0;f<p;f++)for(let g=0;g<o;g++){let w=Math.hypot(g-r.x,f-r.y)+Math.random()*3.5;a.push({point:{x:g,y:f},score:w})}a.sort((f,g)=>f.score-g.score);for(let f of a)yield f.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,r=o*p;while(l.size<r){let a=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p),g=Math.random()*Math.PI*2,c=Math.sign(Math.cos(g)),w=Math.sign(Math.sin(g)),s=10+Math.floor(Math.random()*40);for(let u=0;u<s;u++){if(a<0||a>=o||f<0||f>=p)break;let b=`${a},${f}`;if(!l.has(b))l.add(b),yield{x:a,y:f};if(Math.random()>0.78)a+=w,f+=c;else a+=c,f+=w}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,r=o*p;while(l.size<r){let a=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p),g=3+Math.floor(Math.random()*10);for(let c=0;c<g;c++){let w=Math.round(a+(Math.random()-0.5)*6),s=Math.round(f+(Math.random()-0.5)*6);if(w<0||w>=o||s<0||s>=p)continue;let u=`${w},${s}`;if(l.has(u))continue;l.add(u),yield{x:w,y:s}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,r=(o-1)/2,a=(p-1)/2,f=Math.hypot(r,a)+2;for(let g=0;l.size<o*p;g++){let c=g/3,w=Math.min(f,c*0.18),s=c*0.29+Math.sin(c*0.13)*0.8,u=Math.round(r+Math.cos(s)*w+Math.sin(c)*0.7),b=Math.round(a+Math.sin(s)*w+Math.cos(c)*0.7);if(u<0||u>=o||b<0||b>=p){if(g>o*p*18)break;continue}let d=`${u},${b}`;if(l.has(d)){if(Math.random()>0.9)continue}else l.add(d),yield{x:u,y:b};if(g>o*p*18)break}for(let g=0;g<p;g++)for(let c=0;c<o;c++){let w=`${c},${g}`;if(l.has(w))continue;yield{x:c,y:g}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,r=Math.floor(Math.random()*o),a=Math.floor(Math.random()*p),f=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*p){let g=`${r},${a}`;if(!l.has(g))l.add(g),yield{x:r,y:a};let c=[];for(let u of f){let b=r+u.x,d=a+u.y;if(b<0||b>=o||d<0||d>=p)continue;c.push({x:b,y:d})}if(!c.length)break;let w=c.filter((u)=>{return!l.has(`${u.x},${u.y}`)});if(w.length&&Math.random()>0.2){let u=w[Math.floor(Math.random()*w.length)];r=u.x,a=u.y;continue}let s=c[Math.floor(Math.random()*c.length)];r=s.x,a=s.y}for(let g=0;g<p;g++)for(let c=0;c<o;c++){let w=`${c},${g}`;if(l.has(w))continue;yield{x:c,y:g}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let r=0;r<p;r++)for(let a=0;a<o;a++){let f=Math.sin((a+1)*0.93+Math.random()*0.8)+Math.cos((r+1)*1.17+Math.random()*0.8),g=(Math.random()-0.5)*2.6,c=Math.hypot(a-o/2,r-p/2)*0.08;l.push({point:{x:a,y:r},score:f+g+c})}l.sort((r,a)=>r.score-a.score);for(let r of l)yield r.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,r=[];for(let a=0;a<Math.max(6,o*p/18);a++)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(l.size<o*p){let a=r[Math.floor(Math.random()*r.length)],f=1+Math.floor(Math.random()*3),g=1+Math.floor(Math.random()*3);for(let c=a.y-g;c<=a.y+g;c++)for(let w=a.x-f;w<=a.x+f;w++){if(w<0||w>=o||c<0||c>=p)continue;if(Math.random()>0.86)continue;let s=`${w},${c}`;if(l.has(s))continue;l.add(s),yield{x:w,y:c}}if(Math.random()>0.72&&r.length<o*p/2)r.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(l.size>o*p*0.92)break}for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=`${f},${a}`;if(l.has(g))continue;yield{x:f,y:a}}break}case"HUMAN_HESITANT_LINES":{let l=new Set;for(let r=0;r<p;r++){let a=r%2===0;for(let f=0;f<o;f++){let g=a?f:o-1-f,c=`${g},${r}`;if(!l.has(c))l.add(c),yield{x:g,y:r};if(Math.random()>0.7){let w=Math.max(0,Math.min(o-1,g+(Math.random()>0.5?1:-1))),s=Math.max(0,Math.min(p-1,r+(Math.random()>0.65?1:0))),u=`${w},${s}`;if(!l.has(u))l.add(u),yield{x:w,y:s}}}}for(let r=0;r<p;r++)for(let a=0;a<o;a++){let f=`${a},${r}`;if(l.has(f))continue;yield{x:a,y:r}}break}case"HUMAN_OVERLAP_SWEEPS":{let l=[],r=Math.random()*Math.PI*2;for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=Math.sin((f+a)*0.42+r)*2.2,c=Math.cos((f-a)*0.3+r)*1.4;l.push({point:{x:f,y:a},score:a+g+c+(Math.random()-0.5)*3.4})}l.sort((a,f)=>a.score-f.score);for(let a of l)yield a.point;break}case"HUMAN_WOBBLE_DRIFT":{let l=[],r=o/2,a=p/2;for(let f=0;f<p;f++)for(let g=0;g<o;g++){let c=Math.hypot(g-r,f-a)*0.25,w=Math.sin((g+1)*0.9)*1.8+Math.cos((f+1)*1.1)*1.8+Math.sin((g+f)*0.35)*1.4;l.push({point:{x:g,y:f},score:c+w+(Math.random()-0.5)*2.8})}l.sort((f,g)=>f.score-g.score);for(let f of l)yield f.point;break}case"HUMAN_GAP_RECOVERY":{let l=new Set,r=[];for(let a=0;a<p;a++)for(let f=0;f<o;f++){if(Math.random()>0.87){r.push({x:f,y:a});continue}l.add(`${f},${a}`),yield{x:f,y:a}}r.sort((a,f)=>Math.hypot(a.x-o/2,a.y-p/2)-Math.hypot(f.x-o/2,f.y-p/2));for(let a of r){let f=`${a.x},${a.y}`;if(l.has(f))continue;l.add(f),yield a}break}case"HUMAN_STAIRCASE":{let l=new Set,r=o+p-1;for(let a=0;a<r;a++){let f=Math.max(0,a-o+1),g=Math.min(p-1,a);for(let c=f;c<=g;c++){let w=a-c,s=[{x:w,y:c},{x:w+(Math.random()>0.5?1:-1),y:c},{x:w,y:c+(Math.random()>0.5?1:-1)}];for(let u of s){if(u.x<0||u.x>=o||u.y<0||u.y>=p)continue;let b=`${u.x},${u.y}`;if(l.has(b))continue;l.add(b),yield u}}}for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=`${f},${a}`;if(l.has(g))continue;yield{x:f,y:a}}break}case"HUMAN_EDGE_HUGGER":{let l=[];for(let r=0;r<p;r++)for(let a=0;a<o;a++){let f=Math.min(a,r,o-1-a,p-1-r);l.push({point:{x:a,y:r},score:f*3.5+(Math.random()-0.5)*5.5})}l.sort((r,a)=>r.score-a.score);for(let r of l)yield r.point;break}case"HUMAN_BLOBS":{let l=new Set,r=o*p;while(l.size<r){let a=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p),g=1+Math.floor(Math.random()*4);for(let c=f-g;c<=f+g;c++)for(let w=a-g;w<=a+g;w++){if(w<0||w>=o||c<0||c>=p)continue;let s=Math.atan2(c-f,w-a),u=g+Math.sin(s*3+Math.random())*0.8;if(Math.hypot(w-a,c-f)>u)continue;let b=`${w},${c}`;if(l.has(b))continue;l.add(b),yield{x:w,y:c}}}break}case"HUMAN_BACKTRACK":{let l=new Set,r=[];for(let a=0;a<p;a++)for(let f=0;f<o;f++)r.push({x:f,y:a});r.sort((a,f)=>a.y-f.y+(Math.random()-0.5)*2.2+(a.x-f.x)*0.04);for(let a=0;a<r.length;a++){let f=r[a],g=`${f.x},${f.y}`;if(l.has(g))continue;if(l.add(g),yield f,a>1&&Math.random()>0.74){let c=r[a-1],w=`${c.x},${c.y}`;if(!l.has(w))l.add(w),yield c}}for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=`${f},${a}`;if(l.has(g))continue;yield{x:f,y:a}}break}case"HUMAN_SHAKY_DIAGONAL":{let l=[];for(let r=0;r<p;r++)for(let a=0;a<o;a++){let f=Math.abs(a-r)*0.6,g=Math.sin(a*1.4+r*0.8)*1.8+Math.cos(r*1.1+a*0.5)*1.5;l.push({point:{x:a,y:r},score:f+g+(Math.random()-0.5)*3.2})}l.sort((r,a)=>r.score-a.score);for(let r of l)yield r.point;break}case"HUMAN_LATE_FIXES":{let l=[],r=[];for(let a=0;a<p;a++)for(let f=0;f<o;f++)if(Math.random()>0.9)r.push({x:f,y:a});else l.push({x:f,y:a});l.sort((a,f)=>a.y-f.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?a.x-f.x:0)),r.sort((a,f)=>Math.hypot(f.x-o/2,f.y-p/2)-Math.hypot(a.x-o/2,a.y-p/2)),yield*l,yield*r;break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+p-1;l++){let r=l%2===0,a=[],f=Math.max(0,l-o+1),g=Math.min(p-1,l);for(let c=f;c<=g;c++){let w=l-c;if(w>=0&&w<o)a.push({x:w,y:c})}if(Math.random()>0.55)a.reverse();if(r)for(let c=a.length-1;c>=0;c--)yield a[c];else yield*a}break}case"BRUSH_STROKES":{let l=Array.from({length:p},()=>Array(o).fill(!1)),r=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],a=(c,w)=>c>=0&&c<o&&w>=0&&w<p,f=0,g=o*p;for(let c=0;c<g*6&&f<g;c++){let w=Math.floor(Math.random()*o),s=Math.floor(Math.random()*p),u=r[Math.floor(Math.random()*r.length)],b=3+Math.floor(Math.random()*16);for(let d=0;d<b;d++){if(!a(w,s))break;if(!l[s][w])l[s][w]=!0,f++,yield{x:w,y:s};if(Math.random()>0.72)u=r[Math.floor(Math.random()*r.length)];w+=u.x,s+=u.y}}for(let c=0;c<p;c++)for(let w=0;w<o;w++)if(!l[c][w])yield{x:w,y:c};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,r=o*p,a=Math.floor(o/2),f=Math.floor(p/2),g=[[1,0],[0,1],[-1,0],[0,-1]],c=0,w=1,s=(b,d)=>b>=0&&b<o&&d>=0&&d<p,u=function*(){let b=0;while(b<r){for(let d=0;d<2;d++){for(let m=0;m<w;m++){if(s(a,f)){let z=`${a},${f}`;if(!l.has(z)){if(l.add(z),yield{x:a,y:f},b++,b>=r)return}}a+=g[c][0],f+=g[c][1]}c=(c+1)%4}w++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let b=[...u()];for(let d=b.length-1;d>=0;d--)yield b[d]}break}case"SCRIBBLE":{let l=new Set,r=o*p,a=Math.floor(o/2),f=Math.floor(p/2);for(let g=0;l.size<r&&g<r*24;g++){let c=`${a},${f}`;if(!l.has(c))l.add(c),yield{x:a,y:f};if(a+=Math.floor(Math.random()*3)-1,f+=Math.floor(Math.random()*3)-1,a<0||a>=o||f<0||f>=p)a=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p)}for(let g=0;g<p;g++)for(let c=0;c<o;c++){let w=`${c},${g}`;if(l.has(w))continue;l.add(w),yield{x:c,y:g}}break}case"CROSSHATCH":{let l=[];for(let f=0;f<o+p-1;f++)for(let g=Math.max(0,f-o+1);g<=Math.min(p-1,f);g++){let c=f-g;l.push({x:c,y:g})}let r=[];for(let f=-p+1;f<o;f++)for(let g=0;g<p;g++){let c=g+f;if(c>=0&&c<o)r.push({x:c,y:g})}let a=new Set;for(let f of[...l,...r]){let g=`${f.x},${f.y}`;if(a.has(g))continue;a.add(g),yield f}break}case"WAVE_SWEEP":{let l=new Set;for(let r=0;r<o;r++){let f=(Math.sin(r/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let g=0;g<p;g++){let c=f+g,w=f-g;for(let s of[c,w]){if(s<0||s>=p)continue;let u=`${r},${s}`;if(l.has(u))continue;l.add(u),yield{x:r,y:s}}}}break}case"SCATTERED_LINES":{let l=new Set,r=o*p;for(let a=0;l.size<r&&a<r*14;a++){let f=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),c=Math.random()*Math.PI*2,w=Math.round(Math.cos(c)),s=Math.round(Math.sin(c)),u=6+Math.floor(Math.random()*28);for(let b=0;b<u;b++){if(f<0||f>=o||g<0||g>=p)break;let d=`${f},${g}`;if(!l.has(d))l.add(d),yield{x:f,y:g};f+=w,g+=s}}for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=`${f},${a}`;if(l.has(g))continue;l.add(g),yield{x:f,y:a}}break}case"CONTOUR_JITTER":{let l=new Set;for(let r=0;r<Math.ceil(Math.min(o,p)/2);r++){let a=[],f=r,g=r,c=o-r-1,w=p-r-1;for(let s=f;s<=c;s++)a.push({x:s,y:g});for(let s=g+1;s<=w;s++)a.push({x:c,y:s});for(let s=c-1;s>=f;s--)a.push({x:s,y:w});for(let s=w-1;s>g;s--)a.push({x:f,y:s});for(let s=a.length-1;s>0;s--){let u=Math.floor(Math.random()*(s+1)),b=a[s];a[s]=a[u],a[u]=b}for(let s of a){let u=`${s.x},${s.y}`;if(l.has(u))continue;l.add(u),yield s}}break}case"SPIRAL_WOBBLE":{let l=new Set,r=o/2,a=p/2,f=Math.hypot(r,a);for(let g=0;l.size<o*p&&g<o*p*9;g++){let c=g/(o*p*9)*f,w=g*0.31+Math.sin(g*0.07)*0.7,s=Math.round(r+Math.cos(w)*c),u=Math.round(a+Math.sin(w)*c);if(s<0||s>=o||u<0||u>=p)continue;let b=`${s},${u}`;if(l.has(b))continue;l.add(b),yield{x:s,y:u}}for(let g=0;g<p;g++)for(let c=0;c<o;c++){let w=`${c},${g}`;if(l.has(w))continue;yield{x:c,y:g}}break}case"CLUSTER_BURSTS":{let l=new Set,r=o*p;for(let a=0;l.size<r&&a<r*12;a++){let f=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),c=2+Math.floor(Math.random()*10);for(let w=g-c;w<=g+c;w++)for(let s=f-c;s<=f+c;s++){if(s<0||s>=o||w<0||w>=p)continue;if(Math.hypot(s-f,w-g)>c)continue;let u=`${s},${w}`;if(l.has(u))continue;l.add(u),yield{x:s,y:w}}}for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=`${f},${a}`;if(l.has(g))continue;l.add(g),yield{x:f,y:a}}break}case"ORBITAL":{let l=new Set,r=(o-1)/2,a=(p-1)/2,f=Math.ceil(Math.max(r,a));for(let g=0;g<=f;g++){let c=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,g)*2));for(let w=0;w<c;w++){let s=w/c*Math.PI*2+(g%2?0.3:-0.3),u=Math.round(r+Math.cos(s)*g),b=Math.round(a+Math.sin(s)*g);if(u<0||u>=o||b<0||b>=p)continue;let d=`${u},${b}`;if(l.has(d))continue;l.add(d),yield{x:u,y:b}}}for(let g=0;g<p;g++)for(let c=0;c<o;c++){let w=`${c},${g}`;if(l.has(w))continue;yield{x:c,y:g}}break}case"FLOW_FIELD":{let l=new Set,r=o*p;for(let a=0;l.size<r&&a<r*18;a++){let f=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p);for(let c=0;c<120;c++){if(f<0||f>=o||g<0||g>=p)break;let w=`${f},${g}`;if(!l.has(w))l.add(w),yield{x:f,y:g};let s=Math.sin(f*0.09)*1.8+Math.cos(g*0.08)*1.6+Math.sin((f+g)*0.05);f+=Math.round(Math.cos(s)),g+=Math.round(Math.sin(s))}}for(let a=0;a<p;a++)for(let f=0;f<o;f++){let g=`${f},${a}`;if(l.has(g))continue;l.add(g),yield{x:f,y:a}}break}case"EDGE_IN":{let l=new Set,r=Math.ceil(Math.min(o,p)/2);for(let a=0;a<r;a++){let f=a,g=o-1-a,c=a,w=p-1-a;for(let s=f;s<=g;s++)for(let u of[c,w]){let b=`${s},${u}`;if(l.has(b))continue;l.add(b),yield{x:s,y:u}}for(let s=c+1;s<=w-1;s++)for(let u of[f,g]){let b=`${u},${s}`;if(l.has(b))continue;l.add(b),yield{x:u,y:s}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),F(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),F(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${t}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var No=`/* stylelint-disable declaration-no-important */
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
  font-size: 10px;
  text-align: left;
}

.wwidget .shortcuts .shortcut-label span {
  line-height: 1.25;
  white-space: normal;
  overflow-wrap: anywhere;
}

.wwidget .shortcuts .shortcut-label i {
  color: #9db3ff;
  font-size: 11px;
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
  font-size: 10px;
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
  padding: 0 4px 12px;
}

.wwidget .wform > * {
  margin: 4px;
}

.wwidget .wform > .widget-section {
  display: grid;
  gap: 8px;
  width: auto;
  margin: 0;
  padding: 10px;
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
  padding: 8px 10px;
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

  .wform button,
  .wform input,
  .wform select,
  .wform textarea,
  .wform label:has(input[type='checkbox']) {
    padding: 8px 9px;
  }

  .wwidget .images {
    max-height: 22dvh;
    padding: 4px 6px;
  }

  .wwidget .shortcuts .shortcut-item {
    grid-template-columns: minmax(0, 1fr);
    padding: 4px 5px;
  }

  .wwidget .shortcuts .shortcut-label,
  .wwidget .shortcuts kbd {
    font-size: 9px;
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class co extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var Q={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function K(o,p){let l=p.key.toLowerCase(),r=o.key.toLowerCase(),f=l==="/"&&(r==="/"||r==="?"||o.code==="Slash")||r===l,g=p.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,c=p.ctrl===!0?!0:p.meta===!0?o.metaKey:!o.metaKey;return f&&o.shiftKey===Boolean(p.shift)&&g&&c&&o.altKey===Boolean(p.alt)}function Fo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Jo=`<button class="wopen-button" aria-label="Toggle widget">
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
    <strong class="widget-section-title" data-i18n="generalSection">General</strong>
    <button class="open-config"><i class="fa-solid fa-gear"></i> <span data-i18n="openConfig">Config</span></button>
    <div class="wprogress"><div></div><span></span></div>
    <div class="wp wstatus"></div>
  </section>

  <section class="widget-section widget-section-actions">
    <strong class="widget-section-title" data-i18n="actionsSection">Actions</strong>
    <button class="draw" disabled data-i18n="draw">Draw</button>
    <button class="draw-and-paint" disabled data-i18n="drawAndPaint">Draw + Paint</button>
  </section>

  <section class="widget-section widget-section-strategy">
    <strong class="widget-section-title" data-i18n="strategySection">Draw strategy</strong>
    <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
      <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
      <option value="ALL" data-i18n="all">All</option>
      <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
    </select></label>
  </section>

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
      <button class="autofarm-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoFarmStart">Start</span></button>
      <button class="autofarm-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoFarmStop">Stop</span></button>
      <div class="wp autofarm-status" data-i18n="autoFarmStopped">Stopped</div>
    </div>
  </section>

  <section class="widget-section widget-section-autooverlay">
    <div class="widget-actions">
      <strong data-i18n="autoOverlaySection">Auto draw</strong>
      <button class="autooverlay-config" data-i18n="configureAutoOverlay">Configure auto draw</button>
      <button class="autooverlay-start"><i class="fa-solid fa-play"></i> <span data-i18n="autoOverlayStart">Start</span></button>
      <button class="autooverlay-stop"><i class="fa-solid fa-stop"></i> <span data-i18n="autoOverlayStop">Stop</span></button>
      <div class="wp autooverlay-status" data-i18n="autoOverlayStopped">Stopped</div>
    </div>
  </section>

  <section class="widget-section widget-section-images">
    <strong class="widget-section-title" data-i18n="imagesSection">Images</strong>
    <div class="widget-image-actions">
      <button class="add-image" disabled data-i18n="addImage">Add image</button>
    </div>
    <div class="images"></div>
    <button class="capture-template" disabled>
      <i class="fa-solid fa-camera" aria-hidden="true"></i>
      <span data-i18n="captureTemplate">Capture template</span>
    </button>
  </section>
</div>
`;var Do="kglacer-macro:overlay-hidden",Uo="kglacer-macro:auto-farm-config",Qo="kglacer-macro:auto-overlay-config",Yo="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class wo extends X{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$openConfig;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$autoOverlayConfig;$autoOverlayStart;$autoOverlayStop;$autoOverlayStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;autoOverlayIntervalId;autoOverlayConfig;autoOverlayTickRunning=!1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Jo,U(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$openConfig:".open-config",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".widget-section-autofarm > .widget-actions > .autofarm-start",$autofarmStop:".widget-section-autofarm > .widget-actions > .autofarm-stop",$autofarmStatus:".autofarm-status",$autoOverlayConfig:".autooverlay-config",$autoOverlayStart:".widget-section-autooverlay > .widget-actions > .autooverlay-start",$autoOverlayStop:".widget-section-autooverlay > .widget-actions > .autooverlay-stop",$autoOverlayStatus:".autooverlay-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=Yo,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$openConfig.addEventListener("click",()=>{this.openSettingsModal()}),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$autoOverlayConfig.addEventListener("click",()=>{this.openAutoOverlayModal()}),this.$autoOverlayStart.addEventListener("click",()=>{this.startAutoOverlay()}),this.$autoOverlayStop.addEventListener("click",()=>{this.stopAutoOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.loadAutoOverlayConfigFromStorage(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(n("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${t}`,o.click(),await W(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new co(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let l;if(p.name.endsWith(`.${t}`))l=await Z.fromJSON(this.bot,JSON.parse(await p.text()));else{let r=new FileReader;r.readAsDataURL(p),await W(r,["load"],["error"]);let a=await this.compressImageBeforeLoad(r.result),f=new Image;f.src=a,await W(f,["load"],["error"]),await this.waitForStableViewportProjection(),l=new Z(this.bot,J.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new C(this.bot,f))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),F(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(n("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:p,minGlobalY:l,maxGlobalX:r,maxGlobalY:a}=o,f=document.createElement("canvas");f.width=Math.max(1,r-p+1),f.height=Math.max(1,a-l+1);let g=f.getContext("2d");if(!g)throw new Error("Capture context unavailable");g.imageSmoothingEnabled=!1;let c=Math.floor(p/P),w=Math.floor(l/P),s=Math.floor(r/P),u=Math.floor(a/P),b=(s-c+1)*(u-w+1),d=0;for(let z=c;z<=s;z++)for(let i=w;i<=u;i++){this.status=`⌛ ${n("taskReadingTiles")} [${++d}/${b}]`;let A=await this.loadTileImage(z,i),M=z*P,H=i*P,N=Math.max(p,M),D=Math.min(r,M+P-1),G=Math.max(l,H),V=Math.min(a,H+P-1),O=N-M,v=G-H,Y=D-N+1,S=V-G+1,$=N-p,x=G-l;g.drawImage(A,O,v,Y,S,$,x,Y,S)}let m=Date.now();await this.downloadCapture(f,"png",m)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,p,l){let r=p==="webp"?"image/webp":"image/png",a=await new Promise((c,w)=>{o.toBlob((s)=>{if(!s){w(new Error(`Failed to create ${p.toUpperCase()} capture file`));return}c(s)},r)}),f=URL.createObjectURL(a),g=document.createElement("a");g.href=f,g.download=`wplace-capture-${l}.${p}`,g.click(),URL.revokeObjectURL(f)}async loadTileImage(o,p){let l;for(let r=1;r<=3;r++)try{let a=new Image;return a.crossOrigin="anonymous",a.referrerPolicy="no-referrer",a.src=`https://backend.wplace.live/files/s0/tiles/${o}/${p}.png?ts=${Date.now()}-${r}`,await W(a,["load"],["error"]),a}catch(a){if(l=a,r<3)await new Promise((f)=>setTimeout(f,r*200))}throw l instanceof Error?l:new Error(`Tile fetch failed (${o}/${p})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,p)=>{let l=document.createElement("div");l.className="kgm-capture-overlay",l.innerHTML=`<div class="kgm-capture-hint">${n("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let r=l.querySelector(".kgm-capture-box");document.body.append(l);let a,f,g=()=>{window.removeEventListener("keydown",b,!0),l.removeEventListener("pointermove",s),l.removeEventListener("pointerdown",u),l.remove()},c=(d)=>{let m=Math.min(a.x,d.x),z=Math.min(a.y,d.y),i=Math.abs(a.x-d.x)+1,A=Math.abs(a.y-d.y)+1;return{left:m,top:z,width:i,height:A}},w=(d)=>{let{left:m,top:z,width:i,height:A}=c(d);r.style.left=`${m}px`,r.style.top=`${z}px`,r.style.width=`${i}px`,r.style.height=`${A}px`},s=(d)=>{if(!a)return;w({x:d.clientX,y:d.clientY})},u=(d)=>{if(d.preventDefault(),!a){a={x:d.clientX,y:d.clientY};let N=J.fromScreenPosition(this.bot,a);f={x:N.globalX,y:N.globalY},w(a);return}let m={x:d.clientX,y:d.clientY},z=J.fromScreenPosition(this.bot,m);if(g(),!f){p(new Error("Capture anchor point unavailable"));return}let i=Math.min(f.x,z.globalX),A=Math.min(f.y,z.globalY),M=Math.max(f.x,z.globalX),H=Math.max(f.y,z.globalY);if(M-i<1||H-A<1){p(new Error("Capture area too small"));return}o({minGlobalX:i,minGlobalY:A,maxGlobalX:M,maxGlobalY:H})},b=(d)=>{if(d.key!=="Escape")return;g(),p(new Error("Capture cancelled"))};window.addEventListener("keydown",b,!0),l.addEventListener("pointermove",s),l.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await W(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let r=document.createElement("canvas");r.width=p.naturalWidth,r.height=p.naturalHeight;let a=r.getContext("2d");if(!a)return o;return a.drawImage(p,0,0),r.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),p=0,l;for(let r=0;r<45;r++){await new Promise((s)=>requestAnimationFrame(()=>{s()}));let{anchorScreenPosition:{x:a,y:f},pixelSize:g}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(g)||g<=0){p=0;continue}let c={anchorX:a,anchorY:f,pixelSize:g};if(!l){l=c,p=1;continue}if(Math.abs(c.anchorX-l.anchorX)+Math.abs(c.anchorY-l.anchorY)+Math.abs(c.pixelSize-l.pixelSize)<0.0012)p++;else p=0;if(l=c,p>=3)return}}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let f=0;f<this.bot.images.length;f++){let g=this.bot.images[f];o+=g.pixels.pixels.length*g.pixels.pixels[0].length,p+=g.tasks.length}let l=Math.max(0,o-p),r=o>0?l/o*100|0:0;this.$progressText.textContent=`${l}/${o} ${r}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${r/100})`,this.$images.innerHTML="";let a=document.createDocumentFragment();for(let f=0;f<this.bot.images.length;f++){let g=this.bot.images[f],c=document.createElement("div");a.append(c),c.className="image",c.innerHTML=`<button class="preview" title="View preview">
  <img src="${g.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${f===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${f===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,c.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=f,g.openPreviewPanel()}),c.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=f,g.openColorPanel()}),c.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=f,g.openPreviewPanel()}),c.querySelector(".download").addEventListener("click",()=>{g.exportImage()}),c.querySelector(".delete").addEventListener("click",()=>{g.destroy()}),c.querySelector(".up").addEventListener("click",()=>{lo(this.bot.images,f,f-1),this.update(),F(this.bot)}),c.querySelector(".down").addEventListener("click",()=>{lo(this.bot.images,f,f+1),this.update(),F(this.bot)})}this.$images.append(a)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Do)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Do,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${n("toggleOverlay")} (${n("disabled")})`:`${n("toggleOverlay")} (${n("enabled")})`}applyLocaleToUI(o){oo(o),U(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText(),this.refreshAutoOverlayStatusText()}openSettingsModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog",o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="settingsModalTitle">Settings</strong>
    <button type="button" class="modal-close" aria-label="${n("close")}"><span class="icon">×</span></button>
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
</form>`,document.body.append(o),U(o);let p=o.querySelector(".settings-locale");p.value=_(),p.addEventListener("change",()=>{this.applyLocaleToUI(p.value),U(o)}),o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=n("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${n("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)})`:n("autoFarmStopped")}refreshAutoOverlayStatusText(){if(!this.autoOverlayConfig){this.$autoOverlayStatus.textContent=n("autoOverlayNeedsConfig");return}this.$autoOverlayStatus.textContent=this.autoOverlayIntervalId?`${n("autoOverlayRunning")} (${this.formatAutoFarmDelay(this.autoOverlayConfig.timerMs)})`:n("autoOverlayStopped")}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.refreshAutoFarmStatusText()}stopAutoOverlay(){if(!this.autoOverlayIntervalId)return;clearInterval(this.autoOverlayIntervalId),this.autoOverlayIntervalId=void 0,this.refreshAutoOverlayStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${n("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmIntervalId=window.setInterval(()=>{this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}startAutoOverlay(){if(!this.autoOverlayConfig){this.status=`⚠️ ${n("autoOverlayNeedsConfig")}`,this.refreshAutoOverlayStatusText();return}this.stopAutoOverlay(),this.autoOverlayIntervalId=window.setInterval(()=>{this.runAutoOverlayCycle()},this.autoOverlayConfig.timerMs),this.runAutoOverlayCycle(),this.refreshAutoOverlayStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{if(!await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels,0)){this.status=`⚠️ ${n("autoFarmStopped")}: ${n("autoFarmTransparentUnavailable")}`,this.stopAutoFarm();return}await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}async runAutoOverlayCycle(){if(!this.autoOverlayConfig||this.autoOverlayTickRunning)return;this.autoOverlayTickRunning=!0;try{if(!await this.bot.drawOverlayPixelsBatch(this.autoOverlayConfig.pixels)){this.status=`⚠️ ${n("autoOverlayStopped")}: ${n("autoOverlayNoTasks")}`,this.stopAutoOverlay();return}await this.waitAndClickPaintButton()}finally{this.autoOverlayTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Uo,JSON.stringify(o))}saveAutoOverlayConfig(o){this.autoOverlayConfig=o,localStorage.setItem(Qo,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(Uo);if(!o)return;try{let p=JSON.parse(o);if(typeof p.value!=="number"||!Number.isFinite(p.value)||p.value<1)return;let l=typeof p.pixels==="number"&&Number.isFinite(p.pixels)&&p.pixels>=1?Math.floor(p.pixels):60,r=p.unit==="hours"||p.unit==="minutes"||p.unit==="seconds"?p.unit:"minutes",a=typeof p.timerMs==="number"&&p.timerMs>0?p.timerMs:r==="hours"?p.value*3600000:r==="minutes"?p.value*60000:p.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(p.value)),pixels:l,unit:r,timerMs:a}}catch{return}}loadAutoOverlayConfigFromStorage(){let o=localStorage.getItem(Qo);if(!o)return;try{let p=JSON.parse(o);if(typeof p.value!=="number"||!Number.isFinite(p.value)||p.value<1)return;let l=typeof p.pixels==="number"&&Number.isFinite(p.pixels)&&p.pixels>=1?Math.floor(p.pixels):60,r=p.unit==="hours"||p.unit==="minutes"||p.unit==="seconds"?p.unit:"minutes",a=typeof p.timerMs==="number"&&p.timerMs>0?p.timerMs:r==="hours"?p.value*3600000:r==="minutes"?p.value*60000:p.value*1000;this.autoOverlayConfig={value:Math.max(1,Math.floor(p.value)),pixels:l,unit:r,timerMs:a}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let p=this.autoFarmConfig?.unit??"minutes",l=this.autoFarmConfig?.value??1,r=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${n("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${l}" />
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
</form>`,document.body.append(o),U(o);let a=o.querySelector(".autofarm-unit");a.value=p;let f=o.querySelector(".autofarm-value"),g=o.querySelector(".autofarm-pixels"),c=()=>{let w=Math.max(1,Number.parseInt(f.value||"1",10));if(a.value==="hours")return w*3600000;if(a.value==="minutes")return w*60000;return w*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(f.value||"1",10)),pixels:Math.max(1,Number.parseInt(g.value||"60",10)),unit:a.value,timerMs:c()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}openAutoOverlayModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let p=this.autoOverlayConfig?.unit??"minutes",l=this.autoOverlayConfig?.value??1,r=this.autoOverlayConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoOverlayModalTitle">Auto overlay timer</strong>
    <button type="button" class="modal-close" aria-label="${n("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoOverlayHelp">Paint overlay image pixels, click Paint, then repeat by timer.</p>
  <label class="autofarm-label">
    <span data-i18n="autoOverlayTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${l}" />
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
</form>`,document.body.append(o),U(o);let a=o.querySelector(".autofarm-unit");a.value=p;let f=o.querySelector(".autofarm-value"),g=o.querySelector(".autofarm-pixels"),c=()=>{let w=Math.max(1,Number.parseInt(f.value||"1",10));if(a.value==="hours")return w*3600000;if(a.value==="minutes")return w*60000;return w*1000};o.querySelector(".autooverlay-start").onclick=()=>{this.saveAutoOverlayConfig({value:Math.max(1,Number.parseInt(f.value||"1",10)),pixels:Math.max(1,Number.parseInt(g.value||"60",10)),unit:a.value,timerMs:c()}),this.startAutoOverlay(),o.close(),o.remove()},o.querySelector(".autooverlay-stop").onclick=()=>{this.stopAutoOverlay(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,l,r="..."){console.log("[KGM][Widget] Task started",{status:o});let a=this.status;this.status=`${r} ${o}`;try{let f=await p();return this.status=a,console.log("[KGM][Widget] Task completed",{status:o}),f}catch(f){if(!(f instanceof ao))console.error(f),this.status=`${n("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:f}),f}finally{await l?.()}}handleKeyboard(o){if(Fo(o.target))return;if(K(o,Q.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(K(o,Q.showShortcuts)){o.preventDefault(),this.open=!0,this.openSettingsModal();return}if(K(o,Q.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(K(o,Q.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(K(o,Q.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(K(o,Q.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(K(o,Q.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(K(o,Q.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(K(o,Q.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(K(o,Q.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(K(o,Q.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(K(o,Q.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),F(this.bot)}async waitAndClickPaintButton(){await this.run(n("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){this.triggerNativePaintClick(o);return}await new Promise((p)=>setTimeout(p,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((l)=>Array.from(document.querySelectorAll(l))).find((l)=>/pintar|paint/i.test(l.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}}var _o=2,Ko="[KGM]",jo="kglacer-macro:access-ok",so="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Go="kgm-access-locked";class So{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${Ko} ${o}`);else console.log(`${Ko} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Go);let o=Po();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let l=0;l<o.images.length;l++){let r=o.images[l];I({x:r.position[0]-1000,y:r.position[1]-1000}),I({x:r.position[0]+1000,y:r.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=No.replace("FAKE_FAVORITE_LOCATIONS",E.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:E.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Go),this._widget=new wo(this),await this.widget.run(n("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((r)=>{for(let a=0;a<r.length;a++)if(r[a].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await j(500),await this.updateColors(),o)for(let r=0;r<o.images.length;r++){let a=await Z.fromJSON(this,o.images[r]);this.images.push(a),a.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(jo)===so)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),U(p);let l=p.querySelector(".access-input"),r=p.querySelector(".access-error"),a=p.querySelector(".access-locale");a.innerHTML=mo().map((f)=>`<option value="${f}" ${f===_()?"selected":""}>${f.toUpperCase()}</option>`).join(""),a.addEventListener("change",()=>{oo(a.value),U(p)}),p.addEventListener("cancel",(f)=>{f.preventDefault()}),p.querySelector("form").addEventListener("submit",(f)=>{f.preventDefault();let g=atob(so);if(l.value.trim()!==g){r.textContent=n("invalidAccessKey");return}localStorage.setItem(jo,so),p.close(),p.remove(),o()}),p.showModal(),l.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run(n("taskDrawing"),async()=>{await this.widget.run(n("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((f)=>f.json()),r=Math.floor(l.charges.count);this.log("Charges fetched",{charges:r});let a=0;for(let f=0;f<this.images.length;f++)a+=this.images[f].tasks.length;switch(this.log("Tasks prepared",{tasks:a}),this.strategy){case"ALL":{while(r>0){let f=!0;for(let g=0;g<this.images.length;g++){let c=this.images[g].tasks.shift();if(!c)continue;this.drawTask(c),r--,await j(1),f=!1}if(f)break}break}case"PERCENTAGE":{for(let f=0;f<a&&r>0;f++){let g=1,c;for(let w=0;w<this.images.length;w++){let s=this.images[w],u=1-s.tasks.length/(s.pixels.pixels.length*s.pixels.pixels[0].length);if(u<g)g=u,c=s}this.drawTask(c.tasks.shift()),r--,await j(1)}break}case"SEQUENTIAL":for(let f=0;f<this.images.length;f++){let g=this.images[f];for(let c=g.tasks.shift();c&&r>0;c=g.tasks.shift())this.drawTask(c),r--,await j(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:r})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:_o,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,r=window.innerHeight/2,a=l-o.x,f=r-o.y;function g(c,w,s){p.dispatchEvent(new MouseEvent(c,{bubbles:!0,cancelable:!0,clientX:w,clientY:s,buttons:1}))}g("mousedown",l,r),g("mousemove",a,f),g("mouseup",a,f)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let r=this.images[l],{tileX:a,tileY:f}=new J(this,r.position.globalX+r.pixels.pixels[0].length,r.position.globalY+r.pixels.pixels.length);for(let g=r.position.tileX;g<=a;g++)for(let c=r.position.tileY;c<=f;c++)o.add(`${g}/${c}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${n("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await C.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ ${n("taskReadingMap")} [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,l=1,r=1/0,a=1/0;for(let c=0;c<this.$stars.length;c++){let{x:w,y:s}=L(this.$stars[c]);if(w<o.x&&s<o.y){let u=o.x-w+(o.y-s);if(u<r)r=u,p=c}else if(w>o.x&&s>o.y){let u=w-o.x+(s-o.y);if(u<a)a=u,l=c}}let f=L(this.$stars[p]),g=q[p];return{anchorScreenPosition:f,anchorWorldPosition:g,pixelSize:(L(this.$stars[l]).x-f.x)/(q[l].x-g.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await j(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await j(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await j(1)}drawTask(o){if(this.lastColor!==o.color){let r=document.getElementById("color-"+o.color);if(!r){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}r.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let p=o.position.pixelSize/2,l=o.position.toScreenPosition();if(!Number.isFinite(l.x)||!Number.isFinite(l.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+p,clientY:l.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((d)=>!d.disabled&&d.getAttribute("aria-disabled")!=="true"&&d.offsetParent!==null);if(!o.length)return;let p=o[Math.floor(Math.random()*o.length)],l=Number.parseInt(p.id.slice(6),10);if(!Number.isFinite(l))return;let r=document.querySelector(".maplibregl-canvas");if(!r)return;let a=r.getBoundingClientRect(),f=24,g=a.left+f,c=a.right-f,w=a.top+f,s=a.bottom-f;if(c<=g||s<=w)return;let u=g+Math.random()*(c-g),b=w+Math.random()*(s-w);this.drawTask({color:l,position:J.fromScreenPosition(this,{x:u,y:b})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o,p){let l=Math.max(1,Math.floor(o)),r=0;return await this.widget.run(n("taskDrawingRandomPixels"),async()=>{await this.widget.run(n("taskInitializingDraw"),()=>this.updateColors());let a=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((m)=>!m.disabled&&m.getAttribute("aria-disabled")!=="true"&&m.offsetParent!==null),f=document.querySelector(".maplibregl-canvas");if(!a.length||!f)return;let g=p===void 0?void 0:a.find((m)=>Number.parseInt(m.id.slice(6),10)===p);if(p!==void 0&&!g)return;let c=f.getBoundingClientRect(),w=24,s=c.left+w,u=c.right-w,b=c.top+w,d=c.bottom-w;if(u<=s||d<=b)return;for(let m=0;m<l;m++){let z=g??a[Math.floor(Math.random()*a.length)],i=Number.parseInt(z.id.slice(6),10);if(!Number.isFinite(i))continue;let A=s+Math.random()*(u-s),M=b+Math.random()*(d-b);this.drawTask({color:i,position:J.fromScreenPosition(this,{x:A,y:M})}),r++,await j(1)}}),r}async drawOverlayPixelsBatch(o){let p=Math.max(1,Math.floor(o)),l=0;return await this.widget.run(n("taskDrawingOverlayPixels"),async()=>{await this.widget.run(n("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),this.updateTasks();for(let r=0;r<p;r++){let a=this.takeNextTaskFromStrategy();if(!a)break;this.drawTask(a),l++,await j(1)}this.widget.update()}),l}takeNextTaskFromStrategy(){switch(this.strategy){case"ALL":case"SEQUENTIAL":{for(let o=0;o<this.images.length;o++){let p=this.images[o].tasks.shift();if(p)return p}return}case"PERCENTAGE":{let o,p=Number.POSITIVE_INFINITY;for(let l=0;l<this.images.length;l++){let r=this.images[l];if(!r.tasks.length)continue;let a=r.pixels.pixels.length*r.pixels.pixels[0].length,f=1-r.tasks.length/a;if(f<p)p=f,o=r}return o?.tasks.shift()}}}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,r)=>{let a=await o(l,r),f=a.clone(),g="";if(typeof l=="string")g=l;else if(l instanceof Request)g=l.url;else if(l instanceof URL)g=l.href;if(a.url==="https://backend.wplace.live/me")this.me=await f.json(),this.me.favoriteLocations.unshift(...E),this.me.maxFavoriteLocations=1/0,a.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let c=p.exec(g);if(c){for(let w=0;w<this.markerPixelPositionResolvers.length;w++)this.markerPixelPositionResolvers[w](new J(this,+c[1],+c[2],+c[3],+c[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return a}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await j(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`${n("taskWaitingFor")} ${o}`,()=>{return new Promise((l)=>{let r=document.querySelector(p);if(r){l(r);return}let a=new MutationObserver(()=>{let f=document.querySelector(p);if(f)a.disconnect(),l(f)});a.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,E.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new So;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
