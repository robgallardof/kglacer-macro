// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      3.0.2
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
function lo(o,p,s){let l=o[s];return o[s]=o[p],o[p]=l,o}function po(o,p){let s=o.indexOf(p);if(s!==-1)o.splice(s,1);return s}var sa=Math.floor(Math.random()*65536),la=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function U(o){return new Promise((p)=>setTimeout(p,o))}function j(o,p,s=["error"],l="addEventListener"){return new Promise((a,c)=>{for(let r=0;r<p.length;r++)o[l]?.(p[r],a);for(let r=0;r<s.length;r++)o[l]?.(s[r],c)})}class Zo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:s}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+s<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,s)=>p+s.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,s=Math.min(p,this.historyTime);return{time:o,historyTime:s}}}var no=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto farm",shortcutStopAutoFarm:"Stop auto farm",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm · Shift+G stop auto farm",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Draw random pixels, click Paint, then repeat by timer.",autoFarmTimer:"Timer",autoFarmPixelsPerCycle:"Pixels per cycle",autoFarmStart:"Start",autoFarmStop:"Stop",autoFarmNeedsConfig:"Configure auto farm first",autoFarmNoTransparentTasks:"No drawable pixels were found in viewport",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",taskDrawingRandomPixels:"Drawing random pixels",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto farm",shortcutStopAutoFarm:"Detener auto farm",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm · Shift+G detener auto farm",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Dibuja píxeles aleatorios, pulsa Pintar y repite por temporizador.",autoFarmTimer:"Temporizador",autoFarmPixelsPerCycle:"Píxeles por ciclo",autoFarmStart:"Iniciar",autoFarmStop:"Detener",autoFarmNeedsConfig:"Primero configura el auto farm",autoFarmNoTransparentTasks:"No se encontraron píxeles dibujables en vista",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",taskDrawingRandomPixels:"Dibujando píxeles aleatorios",captureHintSelectArea:"Selecciona área"}};function Wo(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function Y(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let p=0;p<no.length;p++){let s=localStorage.getItem(no[p]);if(!s||!(s in y))continue;return localStorage.setItem("kglacer-macro:locale",s),s}return Wo()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function io(){return Object.keys(y)}function b(o){let p=Y();return y[p][o]}function Q(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=b(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",b(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",b(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",b(p.dataset.i18nPlaceholder))}class X{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let s in p)this[s]=o.querySelector(p[s])}registerEvent(o,p,s,l={}){l.passive??=!0,o.addEventListener(p,s,l),this.runOnDestroy.push(()=>{o.removeEventListener(p,s)})}}function co(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function mo(o,p,s){let l=co(o/255),a=co(p/255),c=co(s/255),r=Math.cbrt(0.4122214708*l+0.5363325363*a+0.0514459929*c),g=Math.cbrt(0.2119034982*l+0.6806995451*a+0.1073969566*c),f=Math.cbrt(0.0883024619*l+0.2817188376*a+0.6299787005*c),u=0.2104542553*r+0.793617785*g-0.0040720468*f,w=1.9779984951*r-2.428592205*g+0.4505937099*f,d=0.0259040371*r+0.7827717662*g-0.808675766*f;return[u,w,d]}function zo(o,p,s){let[l,a,c]=o,[r,g,f]=p,u=(so)=>so*180/Math.PI,w=(so)=>so*Math.PI/180,d=1,n=1,i=1,m=Math.sqrt(a**2+c**2),z=Math.sqrt(g**2+f**2),t=(m+z)/2,H=0.5*(1-Math.sqrt(t**7/(t**7+6103515625))),A=a*(1+H),h=g*(1+H),F=Math.sqrt(A**2+c**2),D=Math.sqrt(h**2+f**2),W=c===0&&A===0?0:u(Math.atan2(c,A))%360,E=f===0&&h===0?0:u(Math.atan2(f,h))%360,I=r-l,_=D-F,K=0;if(F*D!==0){if(K=E-W,K>180)K-=360;else if(K<-180)K+=360}let v=2*Math.sqrt(F*D)*Math.sin(w(K)/2),x=(l+r)/2,e=(F+D)/2,V=(W+E)/2;if(Math.abs(W-E)>180)V+=180;let Ko=1-0.17*Math.cos(w(V-30))+0.24*Math.cos(w(2*V))+0.32*Math.cos(w(3*V+6))-0.2*Math.cos(w(4*V-63)),Go=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),wo=1+0.045*e,bo=1+0.015*e*Ko,So=30*Math.exp((-((V-275)/25))**2),jo=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(w(2*So));return Math.sqrt((I/(1*Go))**2+(_/(1*wo))**2+(v/(1*bo))**2+jo*(_/(1*wo))*(v/(1*bo)))-I*s}var R=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],q=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function ro(o){if(o===0)return"transparent";let p=R[o],s=`oklab(${p[0]*100}% ${p[1]} ${p[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",s))return s;let[l=0,a=0,c=0]=(q[o]??"0,0,0").split(",").map((r)=>Number.parseInt(r,10));return`rgb(${l} ${a} ${c})`}var to=`<div class="wtopbar">
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
`;class Z{bot;image;width;exactColor;static async fromJSON(o,p){let s=new Image;return s.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((l)=>l.blob()).then((l)=>URL.createObjectURL(l)):p.url,await j(s,["load"],["error"]),new Z(o,s,p.width,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,s=p.naturalWidth,l=!1){this.bot=o;this.image=p;this.width=s;this.exactColor=l;if(l)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let s=1;s<64;s++)if(this.exactColor||!this.bot.unavailableColors.has(s))o.set(q[s],[s,s]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let s=0;s<this.canvas.height;s++)for(let l=0;l<this.canvas.width;l++){let a=(s*this.canvas.width+l)*4,c=p[a],r=p[a+1],g=p[a+2],f=p[a+3],u=c,w=r,d=g,n=`${u},${w},${d}`;if(this.exactColor){this.pixels[s][l]=f<100?0:q.indexOf(n);continue}let i,m;if(f<100)i=m=0;else if(o.has(n))[i,m]=o.get(n);else{let t=1/0,H=1/0;for(let A=0;A<R.length;A++){let h=R[A],F=zo(mo(u,w,d),h,0);if(!this.bot.unavailableColors.has(A)&&F<t)t=F,i=A;if(F<H)H=F,m=A}o.set(n,[i,m])}if(i!==0)this.context.fillStyle=`oklab(${R[i][0]*100}% ${R[i][1]} ${R[i][2]})`,this.context.fillRect(l,s,1,1);this.pixels[s][l]=i;let z=this.colors.get(m);if(z)z.amount++;else this.colors.set(m,{color:i,amount:1,realColor:m})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var B="kglacer-macro-settings",Ao=["kglacermacro","wbot"],O="kgm";function Lo(){let o=[B,...Ao];for(let p=0;p<o.length;p++){let s=o[p],l=localStorage.getItem(s);if(!l)continue;return{json:l,key:s}}return}function Mo(){let o=Lo();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let s=p;p.images=s.widget.images,p.strategy=s.widget.strategy,delete s.widget}if(o.key!==B)localStorage.setItem(B,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Ho;function k(o,p=!1){if(clearTimeout(Ho),p)localStorage.setItem(B,JSON.stringify(o));else Ho=setTimeout(()=>{localStorage.setItem(B,JSON.stringify(o))},600)}var M=1000,Vo=2048,C=M*Vo,G=[],T=[],Bo=Date.now();function $(o){G.push(o),T.push({id:Bo++,latitude:(2*Math.atan(Math.exp(-(o.y/C*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/C*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}$({x:C/3|0,y:C/3|0});$({x:C/3*2|0,y:C/3*2|0});function L(o){let[p,s]=o.style.transform.slice(32,-31).split(", ").map((l)=>Number.parseFloat(l));return{x:p,y:s}}class P{bot;static fromJSON(o,p){return new P(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:s,pixelSize:l,anchorWorldPosition:a}=o.findAnchorsForScreen(p);return new P(o,a.x+(p.x-s.x)/l|0,a.y+(p.y-s.y)/l|0)}globalX=0;globalY=0;get tileX(){return this.globalX/M|0}set tileX(o){this.globalX=o*M+this.x}get tileY(){return this.globalY/M|0}set tileY(o){this.globalY=o*M+this.y}get x(){return this.globalX%M}set x(o){this.globalX=this.tileX*M+o}get y(){return this.globalY%M}set y(o){this.globalY=this.tileY*M+o}anchor1Index;anchor2Index;get pixelSize(){return(L(this.bot.$stars[this.anchor2Index]).x-L(this.bot.$stars[this.anchor1Index]).x)/(G[this.anchor2Index].x-G[this.anchor1Index].x)}constructor(o,p,s,l,a){this.bot=o;if(l===void 0||a===void 0)this.globalX=p,this.globalY=s;else this.globalX=p*M+l,this.globalY=s*M+a;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let s=0;s<G.length;s++){let{x:l,y:a}=G[s];if(l<this.globalX&&a<this.globalY){let c=this.globalX-l+(this.globalY-a);if(c<o)o=c,this.anchor1Index=s}else if(l>this.globalX&&a>this.globalY){let c=l-this.globalX+(a-this.globalY);if(c<p)p=c,this.anchor2Index=s}}}toScreenPosition(){let o=G[this.anchor1Index],p=L(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new P(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class S extends X{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,p){return new S(o,P.fromJSON(o,p.position),await Z.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,p,s,l="SPIRAL_FROM_CENTER",a=50,c=!1,r=!1,g=[],f=!1){super();this.bot=o;this.position=p;this.pixels=s;this.strategy=l;this.opacity=a;this.drawTransparentPixels=c;this.drawColorsInOrder=r;this.colors=g;this.lock=f;this.element.innerHTML=to,this.element.classList.add("wimage"),Q(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();k(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),k(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),k(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,k(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,k(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),k(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,s=new Map;for(let l=0;l<this.colors.length;l++){let a=this.colors[l];if(a.disabled)p.add(a.realColor);s.set(a.realColor,l)}for(let{x:l,y:a}of this.strategyPositionIterator()){let c=this.pixels.pixels[a][l];if(p.has(c))continue;o.globalX=this.position.globalX+l,o.globalY=this.position.globalY+a;let r=o.getMapColor();if(c!==r&&(this.drawTransparentPixels||c!==0))this.tasks.push({position:o.clone(),color:c})}if(this.drawColorsInOrder)this.tasks.sort((l,a)=>(s.get(l.color)??0)-(s.get(a.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),s=this.position.pixelSize*this.pixels.width,l=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${p.toFixed(3)}px, 0)`,this.element.style.width=`${s}px`,this.element.style.height=`${l}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let a=this.pixels.pixels.length*this.pixels.pixels[0].length,c=Math.max(0,a-this.tasks.length),r=a>0?c/a*100|0:0;this.$progressText.textContent=`${c}/${a} ${r}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${r/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),po(this.bot.images,this),this.bot.widget.update(),k(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let s=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-s.left,offsetY:o.clientY-s.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),s=Math.max(8,window.innerWidth-p.width-8),l=Math.max(8,window.innerHeight-p.height-8),a=Math.min(s,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),c=Math.min(l,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(a)}px`,this.$colorsDialog.style.top=`${Math.round(c)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let p=document.createDocumentFragment(),s=document.createElement("article");s.className="preview-card";let l=document.createElement("strong");l.textContent=this.getStrategyLabel(o);let a=document.createElement("canvas");a.className="preview-canvas",a.width=156,a.height=156,this.paintStrategyPreview(a,o),s.append(l,a),p.append(s),this.$previewDialogList.append(p)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((s,l)=>`${l}:${s.realColor}:${s.disabled?1:0}`).join("|"),p=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===p)return;this.previewCacheSignature=p,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return b("random");case"HUMANIZED":return b("humanized");case"HUMAN_SOFT_DITHER":return b("humanSoftDither");case"HUMAN_PATCHY":return b("humanPatchy");case"HUMAN_SWEEP_ARCS":return b("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return b("humanMicroCorrections");case"HUMAN_JITTER_FILL":return b("humanJitterFill");case"HUMAN_CORNER_BIAS":return b("humanCornerBias");case"HUMAN_LONG_STROKES":return b("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return b("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return b("humanMessySpiral");case"HUMAN_DRUNK_WALK":return b("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return b("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return b("humanPatchJump");case"HUMAN_HESITANT_LINES":return b("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return b("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return b("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return b("humanGapRecovery");case"HUMAN_STAIRCASE":return b("humanStaircase");case"HUMAN_EDGE_HUGGER":return b("humanEdgeHugger");case"HUMAN_BLOBS":return b("humanBlobs");case"HUMAN_BACKTRACK":return b("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return b("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return b("humanLateFixes");case"ZIGZAG":return b("zigzag");case"BRUSH_STROKES":return b("brushStrokes");case"DIAGONAL_BRUSH":return b("diagonalBrush");case"DOWN":return b("down");case"UP":return b("up");case"LEFT":return b("left");case"RIGHT":return b("right");case"SPIRAL_FROM_CENTER":return b("spiralOut");case"SPIRAL_TO_CENTER":return b("spiralIn");case"SCRIBBLE":return b("scribble");case"CROSSHATCH":return b("crosshatch");case"WAVE_SWEEP":return b("waveSweep");case"SCATTERED_LINES":return b("scatteredLines");case"CONTOUR_JITTER":return b("contourJitter");case"SPIRAL_WOBBLE":return b("spiralWobble");case"CLUSTER_BURSTS":return b("clusterBursts");case"ORBITAL":return b("orbital");case"FLOW_FIELD":return b("flowField");case"EDGE_IN":return b("edgeIn");default:return o}}paintStrategyPreview(o,p){let s=o.getContext("2d");if(!s)return;s.fillStyle="#0f1526",s.fillRect(0,0,o.width,o.height);let l=this.getSampledImagePreviewData(),a=this.getCachedPreviewSequence(p,l.mask,l.width,l.height),c=Math.min(o.width/l.width,o.height/l.height),r=(o.width-l.width*c)/2,g=(o.height-l.height*c)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let u=(t)=>{let H=requestAnimationFrame((A)=>{this.previewAnimationHandles.delete(H),t(A)});return this.previewAnimationHandles.add(H),H},w=(t)=>{s.fillStyle="#0f1526",s.fillRect(0,0,o.width,o.height);for(let H=0;H<Math.min(t,a.length);H++){let A=a[H],h=l.colors.get(`${A.x}:${A.y}`)??0;if(!h)continue;s.fillStyle=ro(h),s.fillRect(r+A.x*c,g+A.y*c,Math.max(1,c),Math.max(1,c))}},d=Math.min(3400,Math.max(900,a.length*8)),i=d+220,m=(t,H)=>{if(!this.$previewDialog.open)return;let A=(H-t)%i,h=Math.min(1,A/d),F=h*h*(3-2*h);w(Math.floor(a.length*F));let D=u((W)=>{m(t,W)});this.previewAnimations.set(o,D)},z=performance.now();m(z,z)}getCachedPreviewSequence(o,p,s=this.pixels.width,l=this.pixels.height){let a=this.colors.map((f,u)=>`${u}:${f.realColor}:${f.disabled?1:0}`).join("|"),c=`${o}:${s}x${l}:${p.length}:${this.drawColorsInOrder?1:0}:${a}`,r=this.previewSequenceCache.get(c);if(r)return r;let g=s===this.pixels.width&&l===this.pixels.height?this.getExactPreviewSequence(o,p):this.getApproxPreviewSequence(o,p,s);if(this.drawColorsInOrder){let f=new Map;for(let u=0;u<this.colors.length;u++)f.set(this.colors[u].realColor,u);g.sort((u,w)=>(f.get(this.pixels.pixels[u.y]?.[u.x]??0)??0)-(f.get(this.pixels.pixels[w.y]?.[w.x]??0)??0))}return this.previewSequenceCache.set(c,g),g}getExactPreviewSequence(o,p){let s=this.strategy;this.strategy=o;let l=[...this.strategyPositionIterator()];this.strategy=s;let a=new Set(p.map(({x:c,y:r})=>`${c}:${r}`));return l.filter(({x:c,y:r})=>a.has(`${c}:${r}`))}getApproxPreviewSequence(o,p,s){let l=[...p],a=(g,f,u)=>{return(g*73856093+f*19349663+u*83492791>>>0)/4294967296},c=(g,f)=>l.sort((u,w)=>u.x*g+u.y*f-(w.x*g+w.y*f)||u.y-w.y||u.x-w.x),r=l.sort((g,f)=>{if(g.y!==f.y)return g.y-f.y;let u=g.y%2===0?g.x:s-g.x,w=f.y%2===0?f.x:s-f.x;return u-w});switch(o){case"UP":return c(0,-1);case"LEFT":return c(-1,0);case"RIGHT":return c(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=s/2,f=Math.max(1,Math.round(l.reduce((u,w)=>u+w.y,0)/Math.max(1,l.length)));return l.sort((u,w)=>{let d=(u.x-g)**2+(u.y-f)**2,n=(w.x-g)**2+(w.y-f)**2;return o==="SPIRAL_FROM_CENTER"?d-n:n-d}),l}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return l.sort((g,f)=>a(g.x,g.y,o.length)-a(f.x,f.y,o.length));default:return r}}getSampledImagePreviewData(){let o=this.pixels.width,p=this.pixels.height,s=S.PREVIEW_MASK_BASE_WIDTH,l=S.PREVIEW_MASK_BASE_HEIGHT,a=Math.min(1,s/Math.max(1,o),l/Math.max(1,p)),c=Math.max(1,Math.round(o*a)),r=Math.max(1,Math.round(p*a)),g=new Set;for(let d=0;d<this.colors.length;d++){let n=this.colors[d];if(n.disabled)g.add(n.realColor)}let f=new Map,u=new Map;for(let d=0;d<p;d++)for(let n=0;n<o;n++){let i=this.pixels.pixels[d]?.[n]??0;if(!i||g.has(i))continue;let m=Math.min(c-1,Math.floor(n/o*c)),z=Math.min(r-1,Math.floor(d/p*r)),t=`${m}:${z}`;if(!f.has(t))f.set(t,{x:m,y:z});if(!u.has(t))u.set(t,i)}let w=[...f.values()];if(!w.length){let d=this.fallbackPreviewMask();return{width:o,height:p,mask:d,colors:new Map(d.map((n)=>[`${n.x}:${n.y}`,this.pixels.pixels[n.y]?.[n.x]??0]))}}return{width:c,height:r,mask:w,colors:u}}getImagePreviewMask(){let o=this.pixels.width,p=this.pixels.height,s=new Set;for(let a=0;a<this.colors.length;a++){let c=this.colors[a];if(c.disabled)s.add(c.realColor)}let l=[];for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=this.pixels.pixels[a]?.[c]??0;if(r!==0&&!s.has(r))l.push({x:c,y:a})}return l.length?l:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,s=this.pixels.height/2,l=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let a=0;a<this.pixels.height;a++)for(let c=0;c<this.pixels.width;c++)if((c-p)**2+(a-s)**2<=l**2)o.push({x:c,y:a});return o}applyLocale(){if(Q(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=q[o]??"0,0,0",[s=0,l=0,a=0]=p.split(",").map((c)=>Number.parseInt(c,10));return`#${[s,l,a].map((c)=>c.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=q[o]??"0,0,0",[s=0,l=0,a=0]=p.split(",").map((f)=>Number.parseInt(f,10)),c=Math.max(s,l,a),r=Math.min(s,l,a);if(c-r<15)return["gray","grey","gris","neutral","neutro"];if(s>l+30&&s>a+30)return["red","rojo"];if(l>s+30&&l>a+30)return["green","verde"];if(a>s+30&&a>l+30)return["blue","azul"];if(s>170&&l>120&&a<130)return["orange","naranja"];if(s>170&&l>110&&a>140)return["pink","rosa"];if(s>120&&l<100&&a>120)return["purple","violet","morado"];if(s>130&&l>130&&a<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",b("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((s)=>!this.pixels.colors.has(s.realColor)))this.colors=this.pixels.colors.values().toArray().sort((s,l)=>l.amount-s.amount).map((s)=>({realColor:s.realColor,disabled:!1})),k(this.bot);for(let s=0;s<this.colors.length;s++){let l=this.colors[s],a=this.pixels.colors.get(l.realColor),c=!1,r=a.realColor!==a.color,g=a.amount/o*100,f=this.colorHex(a.realColor),u=this.colorKeywords(a.realColor),w=()=>{l.disabled=l.disabled?void 0:!0,d.classList.toggle("disabled",Boolean(l.disabled));let i=d.querySelector(".state");if(i)i.textContent=l.disabled?b("disabled"):b("enabled");k(this.bot)},d=document.createElement("button");if(d.className=`color-chip ${l.disabled?"disabled":""}`,d.draggable=!0,d.setAttribute("aria-label",`${b("overlayColors")} #${s+1}: ${f.toUpperCase()}`),d.innerHTML=`<span class="order-index">#${s+1}</span>
<span class="drag" title="${b("up")} / ${b("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${g.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${l.disabled?b("disabled"):b("enabled")}</span>
</span>
<span class="premium ${r?"on":""}">${r?b("premium"):""}</span>`,d.querySelector(".swatch").style.setProperty("--swatch-color",ro(a.realColor)),d.addEventListener("click",()=>{if(c){c=!1;return}w()}),d.addEventListener("dragstart",(i)=>{c=!0,d.classList.add("dragging"),i.dataTransfer?.setData("text/plain",String(s)),i.dataTransfer.effectAllowed="move"}),d.addEventListener("dragend",()=>{d.classList.remove("dragging")}),d.addEventListener("dragover",(i)=>{i.preventDefault(),d.classList.add("drag-target")}),d.addEventListener("dragleave",()=>{d.classList.remove("drag-target")}),d.addEventListener("drop",(i)=>{i.preventDefault(),d.classList.remove("drag-target");let m=Number.parseInt(i.dataTransfer?.getData("text/plain")??"-1",10);if(m<0||m===s||m>=this.colors.length)return;this.colors.splice(s,0,...this.colors.splice(m,1)),k(this.bot),this.updateColors()}),r){let i=document.createElement("button");i.textContent=b("buy"),i.className="buy-chip",i.addEventListener("click",(m)=>{m.stopPropagation(),document.getElementById("color-"+a.realColor)?.click()}),d.append(i)}let n=`${f} ${u.join(" ")} ${a.realColor} ${q[a.realColor]}`;if(!p||n.toLowerCase().includes(p))this.$colorsDialogList.append(d)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let s=0;s<p;s++)for(let l=0;l<o;l++)yield{x:l,y:s};break}case"UP":{for(let s=p-1;s>=0;s--)for(let l=0;l<o;l++)yield{x:l,y:s};break}case"LEFT":{for(let s=0;s<o;s++)for(let l=0;l<p;l++)yield{x:s,y:l};break}case"RIGHT":{for(let s=o-1;s>=0;s--)for(let l=0;l<p;l++)yield{x:s,y:l};break}case"RANDOM":{let s=[];for(let l=0;l<p;l++)for(let a=0;a<o;a++)s.push({x:a,y:l});for(let l=s.length-1;l>=0;l--){let a=Math.floor(Math.random()*(l+1)),c=s[l];s[l]=s[a],s[a]=c}yield*s;break}case"ZIGZAG":{for(let s=0;s<p;s++)if(s%2===0)for(let l=0;l<o;l++)yield{x:l,y:s};else for(let l=o-1;l>=0;l--)yield{x:l,y:s};break}case"HUMANIZED":{let s=Math.max(4,Math.floor(Math.min(o,p)/10)),l=[];for(let a=0;a<p;a+=s)for(let c=0;c<o;c+=s)l.push({x:c,y:a});for(let a=l.length-1;a>=0;a--){let c=Math.floor(Math.random()*(a+1)),r=l[a];l[a]=l[c],l[c]=r}for(let a=0;a<l.length;a++){let c=l[a],r=Math.min(p,c.y+s),g=Math.min(o,c.x+s);for(let f=c.y;f<r;f++)if(Math.random()>0.35)for(let w=c.x;w<g;w++)yield{x:w,y:f};else for(let w=g-1;w>=c.x;w--)yield{x:w,y:f}}break}case"HUMAN_SOFT_DITHER":{let s=new Set;for(let l=0;l<p;l++){let a=Math.floor(Math.random()*3)-1;if((l+a)%2===0)for(let r=0;r<o;r+=2)s.add(`${r},${l}`),yield{x:r,y:l};else for(let r=1;r<o;r+=2)s.add(`${r},${l}`),yield{x:r,y:l}}for(let l=0;l<p;l++)for(let a=0;a<o;a++){let c=`${a},${l}`;if(s.has(c))continue;yield{x:a,y:l}}break}case"HUMAN_PATCHY":{let s=new Set,l=o*p;while(s.size<l){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=1+Math.floor(Math.random()*5);for(let g=c-r;g<=c+r;g++)for(let f=a-r;f<=a+r;f++){if(f<0||f>=o||g<0||g>=p)continue;if(Math.hypot(f-a,g-c)>r+Math.random()*1.2)continue;let u=`${f},${g}`;if(s.has(u))continue;s.add(u),yield{x:f,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let s=new Set,l=(o-1)/2,a=(p-1)/2,c=Math.hypot(l,a);for(let r=0;r<4;r++){let g=Math.random()*Math.PI*2;for(let f=0;f<=c;f+=0.35){let u=Math.PI/2+Math.random()*(Math.PI/1.5),w=Math.max(10,Math.floor(f*8));for(let d=0;d<w;d++){let n=g+u*d/w+Math.sin(f)*0.08,i=Math.round(l+Math.cos(n)*f),m=Math.round(a+Math.sin(n)*f);if(i<0||i>=o||m<0||m>=p)continue;let z=`${i},${m}`;if(s.has(z))continue;s.add(z),yield{x:i,y:m}}}}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(s.has(f))continue;yield{x:g,y:r}}break}case"HUMAN_MICRO_CORRECTIONS":{let s=new Set;for(let l=0;l<p;l++){let a=l%2===0?1:-1,c=a>0?0:o-1;for(let r=0;r<o;r++){let g=c+(Math.random()>0.82?a:0),f=l+(Math.random()>0.9?1:0);for(let u of[{x:c,y:l},{x:g,y:l},{x:c,y:f}]){if(u.x<0||u.x>=o||u.y<0||u.y>=p)continue;let w=`${u.x},${u.y}`;if(s.has(w))continue;s.add(w),yield u}c+=a}}for(let l=0;l<p;l++)for(let a=0;a<o;a++){let c=`${a},${l}`;if(s.has(c))continue;yield{x:a,y:l}}break}case"HUMAN_JITTER_FILL":{let s=[];for(let l=0;l<p;l++)for(let a=0;a<o;a++)s.push({x:a,y:l});s.sort((l,a)=>{let c=l.y+(Math.random()-0.5)*1.8,r=a.y+(Math.random()-0.5)*1.8;if(c!==r)return c-r;return l.x+(Math.random()-0.5)*2-(a.x+(Math.random()-0.5)*2)}),yield*s;break}case"HUMAN_CORNER_BIAS":{let s=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],l=s[Math.floor(Math.random()*s.length)],a=[];for(let c=0;c<p;c++)for(let r=0;r<o;r++){let f=Math.hypot(r-l.x,c-l.y)+Math.random()*3.5;a.push({point:{x:r,y:c},score:f})}a.sort((c,r)=>c.score-r.score);for(let c of a)yield c.point;break}case"HUMAN_LONG_STROKES":{let s=new Set,l=o*p;while(s.size<l){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=Math.random()*Math.PI*2,g=Math.sign(Math.cos(r)),f=Math.sign(Math.sin(r)),u=10+Math.floor(Math.random()*40);for(let w=0;w<u;w++){if(a<0||a>=o||c<0||c>=p)break;let d=`${a},${c}`;if(!s.has(d))s.add(d),yield{x:a,y:c};if(Math.random()>0.78)a+=f,c+=g;else a+=g,c+=f}}break}case"HUMAN_TAP_CLUSTERS":{let s=new Set,l=o*p;while(s.size<l){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=3+Math.floor(Math.random()*10);for(let g=0;g<r;g++){let f=Math.round(a+(Math.random()-0.5)*6),u=Math.round(c+(Math.random()-0.5)*6);if(f<0||f>=o||u<0||u>=p)continue;let w=`${f},${u}`;if(s.has(w))continue;s.add(w),yield{x:f,y:u}}}break}case"HUMAN_MESSY_SPIRAL":{let s=new Set,l=(o-1)/2,a=(p-1)/2,c=Math.hypot(l,a)+2;for(let r=0;s.size<o*p;r++){let g=r/3,f=Math.min(c,g*0.18),u=g*0.29+Math.sin(g*0.13)*0.8,w=Math.round(l+Math.cos(u)*f+Math.sin(g)*0.7),d=Math.round(a+Math.sin(u)*f+Math.cos(g)*0.7);if(w<0||w>=o||d<0||d>=p){if(r>o*p*18)break;continue}let n=`${w},${d}`;if(s.has(n)){if(Math.random()>0.9)continue}else s.add(n),yield{x:w,y:d};if(r>o*p*18)break}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(s.has(f))continue;yield{x:g,y:r}}break}case"HUMAN_DRUNK_WALK":{let s=new Set,l=Math.floor(Math.random()*o),a=Math.floor(Math.random()*p),c=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(s.size<o*p){let r=`${l},${a}`;if(!s.has(r))s.add(r),yield{x:l,y:a};let g=[];for(let w of c){let d=l+w.x,n=a+w.y;if(d<0||d>=o||n<0||n>=p)continue;g.push({x:d,y:n})}if(!g.length)break;let f=g.filter((w)=>{return!s.has(`${w.x},${w.y}`)});if(f.length&&Math.random()>0.2){let w=f[Math.floor(Math.random()*f.length)];l=w.x,a=w.y;continue}let u=g[Math.floor(Math.random()*g.length)];l=u.x,a=u.y}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(s.has(f))continue;yield{x:g,y:r}}break}case"HUMAN_NOISE_CLOUD":{let s=[];for(let l=0;l<p;l++)for(let a=0;a<o;a++){let c=Math.sin((a+1)*0.93+Math.random()*0.8)+Math.cos((l+1)*1.17+Math.random()*0.8),r=(Math.random()-0.5)*2.6,g=Math.hypot(a-o/2,l-p/2)*0.08;s.push({point:{x:a,y:l},score:c+r+g})}s.sort((l,a)=>l.score-a.score);for(let l of s)yield l.point;break}case"HUMAN_PATCH_JUMP":{let s=new Set,l=[];for(let a=0;a<Math.max(6,o*p/18);a++)l.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(s.size<o*p){let a=l[Math.floor(Math.random()*l.length)],c=1+Math.floor(Math.random()*3),r=1+Math.floor(Math.random()*3);for(let g=a.y-r;g<=a.y+r;g++)for(let f=a.x-c;f<=a.x+c;f++){if(f<0||f>=o||g<0||g>=p)continue;if(Math.random()>0.86)continue;let u=`${f},${g}`;if(s.has(u))continue;s.add(u),yield{x:f,y:g}}if(Math.random()>0.72&&l.length<o*p/2)l.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(s.size>o*p*0.92)break}for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=`${c},${a}`;if(s.has(r))continue;yield{x:c,y:a}}break}case"HUMAN_HESITANT_LINES":{let s=new Set;for(let l=0;l<p;l++){let a=l%2===0;for(let c=0;c<o;c++){let r=a?c:o-1-c,g=`${r},${l}`;if(!s.has(g))s.add(g),yield{x:r,y:l};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,r+(Math.random()>0.5?1:-1))),u=Math.max(0,Math.min(p-1,l+(Math.random()>0.65?1:0))),w=`${f},${u}`;if(!s.has(w))s.add(w),yield{x:f,y:u}}}}for(let l=0;l<p;l++)for(let a=0;a<o;a++){let c=`${a},${l}`;if(s.has(c))continue;yield{x:a,y:l}}break}case"HUMAN_OVERLAP_SWEEPS":{let s=[],l=Math.random()*Math.PI*2;for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=Math.sin((c+a)*0.42+l)*2.2,g=Math.cos((c-a)*0.3+l)*1.4;s.push({point:{x:c,y:a},score:a+r+g+(Math.random()-0.5)*3.4})}s.sort((a,c)=>a.score-c.score);for(let a of s)yield a.point;break}case"HUMAN_WOBBLE_DRIFT":{let s=[],l=o/2,a=p/2;for(let c=0;c<p;c++)for(let r=0;r<o;r++){let g=Math.hypot(r-l,c-a)*0.25,f=Math.sin((r+1)*0.9)*1.8+Math.cos((c+1)*1.1)*1.8+Math.sin((r+c)*0.35)*1.4;s.push({point:{x:r,y:c},score:g+f+(Math.random()-0.5)*2.8})}s.sort((c,r)=>c.score-r.score);for(let c of s)yield c.point;break}case"HUMAN_GAP_RECOVERY":{let s=new Set,l=[];for(let a=0;a<p;a++)for(let c=0;c<o;c++){if(Math.random()>0.87){l.push({x:c,y:a});continue}s.add(`${c},${a}`),yield{x:c,y:a}}l.sort((a,c)=>Math.hypot(a.x-o/2,a.y-p/2)-Math.hypot(c.x-o/2,c.y-p/2));for(let a of l){let c=`${a.x},${a.y}`;if(s.has(c))continue;s.add(c),yield a}break}case"HUMAN_STAIRCASE":{let s=new Set,l=o+p-1;for(let a=0;a<l;a++){let c=Math.max(0,a-o+1),r=Math.min(p-1,a);for(let g=c;g<=r;g++){let f=a-g,u=[{x:f,y:g},{x:f+(Math.random()>0.5?1:-1),y:g},{x:f,y:g+(Math.random()>0.5?1:-1)}];for(let w of u){if(w.x<0||w.x>=o||w.y<0||w.y>=p)continue;let d=`${w.x},${w.y}`;if(s.has(d))continue;s.add(d),yield w}}}for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=`${c},${a}`;if(s.has(r))continue;yield{x:c,y:a}}break}case"HUMAN_EDGE_HUGGER":{let s=[];for(let l=0;l<p;l++)for(let a=0;a<o;a++){let c=Math.min(a,l,o-1-a,p-1-l);s.push({point:{x:a,y:l},score:c*3.5+(Math.random()-0.5)*5.5})}s.sort((l,a)=>l.score-a.score);for(let l of s)yield l.point;break}case"HUMAN_BLOBS":{let s=new Set,l=o*p;while(s.size<l){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=1+Math.floor(Math.random()*4);for(let g=c-r;g<=c+r;g++)for(let f=a-r;f<=a+r;f++){if(f<0||f>=o||g<0||g>=p)continue;let u=Math.atan2(g-c,f-a),w=r+Math.sin(u*3+Math.random())*0.8;if(Math.hypot(f-a,g-c)>w)continue;let d=`${f},${g}`;if(s.has(d))continue;s.add(d),yield{x:f,y:g}}}break}case"HUMAN_BACKTRACK":{let s=new Set,l=[];for(let a=0;a<p;a++)for(let c=0;c<o;c++)l.push({x:c,y:a});l.sort((a,c)=>a.y-c.y+(Math.random()-0.5)*2.2+(a.x-c.x)*0.04);for(let a=0;a<l.length;a++){let c=l[a],r=`${c.x},${c.y}`;if(s.has(r))continue;if(s.add(r),yield c,a>1&&Math.random()>0.74){let g=l[a-1],f=`${g.x},${g.y}`;if(!s.has(f))s.add(f),yield g}}for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=`${c},${a}`;if(s.has(r))continue;yield{x:c,y:a}}break}case"HUMAN_SHAKY_DIAGONAL":{let s=[];for(let l=0;l<p;l++)for(let a=0;a<o;a++){let c=Math.abs(a-l)*0.6,r=Math.sin(a*1.4+l*0.8)*1.8+Math.cos(l*1.1+a*0.5)*1.5;s.push({point:{x:a,y:l},score:c+r+(Math.random()-0.5)*3.2})}s.sort((l,a)=>l.score-a.score);for(let l of s)yield l.point;break}case"HUMAN_LATE_FIXES":{let s=[],l=[];for(let a=0;a<p;a++)for(let c=0;c<o;c++)if(Math.random()>0.9)l.push({x:c,y:a});else s.push({x:c,y:a});s.sort((a,c)=>a.y-c.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?a.x-c.x:0)),l.sort((a,c)=>Math.hypot(c.x-o/2,c.y-p/2)-Math.hypot(a.x-o/2,a.y-p/2)),yield*s,yield*l;break}case"DIAGONAL_BRUSH":{for(let s=0;s<o+p-1;s++){let l=s%2===0,a=[],c=Math.max(0,s-o+1),r=Math.min(p-1,s);for(let g=c;g<=r;g++){let f=s-g;if(f>=0&&f<o)a.push({x:f,y:g})}if(Math.random()>0.55)a.reverse();if(l)for(let g=a.length-1;g>=0;g--)yield a[g];else yield*a}break}case"BRUSH_STROKES":{let s=Array.from({length:p},()=>Array(o).fill(!1)),l=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],a=(g,f)=>g>=0&&g<o&&f>=0&&f<p,c=0,r=o*p;for(let g=0;g<r*6&&c<r;g++){let f=Math.floor(Math.random()*o),u=Math.floor(Math.random()*p),w=l[Math.floor(Math.random()*l.length)],d=3+Math.floor(Math.random()*16);for(let n=0;n<d;n++){if(!a(f,u))break;if(!s[u][f])s[u][f]=!0,c++,yield{x:f,y:u};if(Math.random()>0.72)w=l[Math.floor(Math.random()*l.length)];f+=w.x,u+=w.y}}for(let g=0;g<p;g++)for(let f=0;f<o;f++)if(!s[g][f])yield{x:f,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let s=new Set,l=o*p,a=Math.floor(o/2),c=Math.floor(p/2),r=[[1,0],[0,1],[-1,0],[0,-1]],g=0,f=1,u=(d,n)=>d>=0&&d<o&&n>=0&&n<p,w=function*(){let d=0;while(d<l){for(let n=0;n<2;n++){for(let i=0;i<f;i++){if(u(a,c)){let m=`${a},${c}`;if(!s.has(m)){if(s.add(m),yield{x:a,y:c},d++,d>=l)return}}a+=r[g][0],c+=r[g][1]}g=(g+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*w();else{let d=[...w()];for(let n=d.length-1;n>=0;n--)yield d[n]}break}case"SCRIBBLE":{let s=new Set,l=o*p,a=Math.floor(o/2),c=Math.floor(p/2);for(let r=0;s.size<l&&r<l*24;r++){let g=`${a},${c}`;if(!s.has(g))s.add(g),yield{x:a,y:c};if(a+=Math.floor(Math.random()*3)-1,c+=Math.floor(Math.random()*3)-1,a<0||a>=o||c<0||c>=p)a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p)}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(s.has(f))continue;s.add(f),yield{x:g,y:r}}break}case"CROSSHATCH":{let s=[];for(let c=0;c<o+p-1;c++)for(let r=Math.max(0,c-o+1);r<=Math.min(p-1,c);r++){let g=c-r;s.push({x:g,y:r})}let l=[];for(let c=-p+1;c<o;c++)for(let r=0;r<p;r++){let g=r+c;if(g>=0&&g<o)l.push({x:g,y:r})}let a=new Set;for(let c of[...s,...l]){let r=`${c.x},${c.y}`;if(a.has(r))continue;a.add(r),yield c}break}case"WAVE_SWEEP":{let s=new Set;for(let l=0;l<o;l++){let c=(Math.sin(l/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let r=0;r<p;r++){let g=c+r,f=c-r;for(let u of[g,f]){if(u<0||u>=p)continue;let w=`${l},${u}`;if(s.has(w))continue;s.add(w),yield{x:l,y:u}}}}break}case"SCATTERED_LINES":{let s=new Set,l=o*p;for(let a=0;s.size<l&&a<l*14;a++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p),g=Math.random()*Math.PI*2,f=Math.round(Math.cos(g)),u=Math.round(Math.sin(g)),w=6+Math.floor(Math.random()*28);for(let d=0;d<w;d++){if(c<0||c>=o||r<0||r>=p)break;let n=`${c},${r}`;if(!s.has(n))s.add(n),yield{x:c,y:r};c+=f,r+=u}}for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=`${c},${a}`;if(s.has(r))continue;s.add(r),yield{x:c,y:a}}break}case"CONTOUR_JITTER":{let s=new Set;for(let l=0;l<Math.ceil(Math.min(o,p)/2);l++){let a=[],c=l,r=l,g=o-l-1,f=p-l-1;for(let u=c;u<=g;u++)a.push({x:u,y:r});for(let u=r+1;u<=f;u++)a.push({x:g,y:u});for(let u=g-1;u>=c;u--)a.push({x:u,y:f});for(let u=f-1;u>r;u--)a.push({x:c,y:u});for(let u=a.length-1;u>0;u--){let w=Math.floor(Math.random()*(u+1)),d=a[u];a[u]=a[w],a[w]=d}for(let u of a){let w=`${u.x},${u.y}`;if(s.has(w))continue;s.add(w),yield u}}break}case"SPIRAL_WOBBLE":{let s=new Set,l=o/2,a=p/2,c=Math.hypot(l,a);for(let r=0;s.size<o*p&&r<o*p*9;r++){let g=r/(o*p*9)*c,f=r*0.31+Math.sin(r*0.07)*0.7,u=Math.round(l+Math.cos(f)*g),w=Math.round(a+Math.sin(f)*g);if(u<0||u>=o||w<0||w>=p)continue;let d=`${u},${w}`;if(s.has(d))continue;s.add(d),yield{x:u,y:w}}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(s.has(f))continue;yield{x:g,y:r}}break}case"CLUSTER_BURSTS":{let s=new Set,l=o*p;for(let a=0;s.size<l&&a<l*12;a++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p),g=2+Math.floor(Math.random()*10);for(let f=r-g;f<=r+g;f++)for(let u=c-g;u<=c+g;u++){if(u<0||u>=o||f<0||f>=p)continue;if(Math.hypot(u-c,f-r)>g)continue;let w=`${u},${f}`;if(s.has(w))continue;s.add(w),yield{x:u,y:f}}}for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=`${c},${a}`;if(s.has(r))continue;s.add(r),yield{x:c,y:a}}break}case"ORBITAL":{let s=new Set,l=(o-1)/2,a=(p-1)/2,c=Math.ceil(Math.max(l,a));for(let r=0;r<=c;r++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,r)*2));for(let f=0;f<g;f++){let u=f/g*Math.PI*2+(r%2?0.3:-0.3),w=Math.round(l+Math.cos(u)*r),d=Math.round(a+Math.sin(u)*r);if(w<0||w>=o||d<0||d>=p)continue;let n=`${w},${d}`;if(s.has(n))continue;s.add(n),yield{x:w,y:d}}}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(s.has(f))continue;yield{x:g,y:r}}break}case"FLOW_FIELD":{let s=new Set,l=o*p;for(let a=0;s.size<l&&a<l*18;a++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p);for(let g=0;g<120;g++){if(c<0||c>=o||r<0||r>=p)break;let f=`${c},${r}`;if(!s.has(f))s.add(f),yield{x:c,y:r};let u=Math.sin(c*0.09)*1.8+Math.cos(r*0.08)*1.6+Math.sin((c+r)*0.05);c+=Math.round(Math.cos(u)),r+=Math.round(Math.sin(u))}}for(let a=0;a<p;a++)for(let c=0;c<o;c++){let r=`${c},${a}`;if(s.has(r))continue;s.add(r),yield{x:c,y:a}}break}case"EDGE_IN":{let s=new Set,l=Math.ceil(Math.min(o,p)/2);for(let a=0;a<l;a++){let c=a,r=o-1-a,g=a,f=p-1-a;for(let u=c;u<=r;u++)for(let w of[g,f]){let d=`${u},${w}`;if(s.has(d))continue;s.add(d),yield{x:u,y:w}}for(let u=g+1;u<=f-1;u++)for(let w of[c,r]){let d=`${w},${u}`;if(s.has(d))continue;s.add(d),yield{x:w,y:u}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),k(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),s=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=s+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-s)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,s+this.moveInfo.height);this.update(),k(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${O}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var ho=`/* stylelint-disable declaration-no-important */
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class go extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var N={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0},stopAutoFarm:{key:"g",shift:!0}};function J(o,p){let s=p.key.toLowerCase(),l=o.key.toLowerCase(),c=s==="/"&&(l==="/"||l==="?"||o.code==="Slash")||l===s,r=p.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,g=p.ctrl===!0?!0:p.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(p.shift)&&r&&g&&o.altKey===Boolean(p.alt)}function ko(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Po=`<button class="wopen-button" aria-label="Toggle widget">
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
    <label><span data-i18n="language">Language</span>:&nbsp;<select class="locale">
      <option value="en">English</option>
      <option value="es">Español</option>
    </select></label>
    <div class="wprogress"><div></div><span></span></div>
    <div class="wp wstatus"></div>
  </section>

  <section class="widget-section widget-section-actions">
    <strong class="widget-section-title" data-i18n="actionsSection">Actions</strong>
    <button class="draw" disabled data-i18n="draw">Draw</button>
    <button class="draw-and-paint" disabled data-i18n="drawAndPaint">Draw + Paint</button>
  </section>

  <section class="widget-section widget-section-shortcuts">
    <details class="shortcuts">
      <summary class="shortcuts-summary">
        <span class="shortcuts-summary-title">
          <i class="fa-solid fa-keyboard" aria-hidden="true"></i>
          <strong data-i18n="keyboardShortcuts">Shortcuts</strong>
        </span>
        <i class="fa-solid fa-chevron-down shortcuts-chevron" aria-hidden="true"></i>
      </summary>
      <ul class="shortcut-list">
        <li class="shortcut-item shortcut-item-toggle-widget">
          <span class="shortcut-label"><i class="fa-solid fa-keyboard"></i><span data-i18n="shortcutToggleWidget">Toggle widget</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>B</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-toggle-overlay">
          <span class="shortcut-label"><i class="fa-solid fa-layer-group"></i><span data-i18n="shortcutToggleOverlay">Toggle overlays</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>V</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-draw">
          <span class="shortcut-label"><i class="fa-solid fa-pencil"></i><span data-i18n="shortcutDraw">Draw</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>Enter</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-add-image">
          <span class="shortcut-label"><i class="fa-solid fa-image"></i><span data-i18n="shortcutAddImage">Add image</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>I</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-focus-shortcuts">
          <span class="shortcut-label"><i class="fa-solid fa-list"></i><span data-i18n="shortcutFocusList">Focus shortcuts</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>/</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-next-image">
          <span class="shortcut-label"><i class="fa-solid fa-arrow-right"></i><span data-i18n="shortcutNextImage">Next image</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>N</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-previous-image">
          <span class="shortcut-label"><i class="fa-solid fa-arrow-left"></i><span data-i18n="shortcutPreviousImage">Previous image</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>P</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-color-panel">
          <span class="shortcut-label"><i class="fa-solid fa-palette"></i><span data-i18n="shortcutColorPanel">Color panel</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>O</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-lock-image">
          <span class="shortcut-label"><i class="fa-solid fa-lock"></i><span data-i18n="shortcutLockImage">Lock image</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>L</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-paint-ready">
          <span class="shortcut-label"><i class="fa-solid fa-hourglass-half"></i><span data-i18n="shortcutClickPaintWhenReady">Wait + click Paint</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>R</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-auto-farm">
          <span class="shortcut-label"><i class="fa-solid fa-seedling"></i><span data-i18n="shortcutStartAutoFarm">Start auto farm</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>F</kbd></span>
        </li>
        <li class="shortcut-item shortcut-item-auto-farm-stop">
          <span class="shortcut-label"><i class="fa-solid fa-stop"></i><span data-i18n="shortcutStopAutoFarm">Stop auto farm</span></span>
          <span class="shortcut-keys"><kbd>Shift</kbd><kbd>G</kbd></span>
        </li>
      </ul>
    </details>
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
      <button class="autofarm-start" data-i18n="autoFarmStart">Start</button>
      <button class="autofarm-stop" data-i18n="autoFarmStop">Stop</button>
      <div class="wp autofarm-status" data-i18n="autoFarmStopped">Stopped</div>
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
`;var Fo="kglacer-macro:overlay-hidden",No="kglacer-macro:auto-farm-config",Eo="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class fo extends X{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStart;$autofarmStop;$autofarmStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;autoFarmTickRunning=!1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Po,Q(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStart:".widget-section-autofarm > .widget-actions > .autofarm-start",$autofarmStop:".widget-section-autofarm > .widget-actions > .autofarm-stop",$autofarmStatus:".autofarm-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=Eo,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$autofarmStart.addEventListener("click",()=>{this.startAutoFarm()}),this.$autofarmStop.addEventListener("click",()=>{this.stopAutoFarm()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=Y(),this.$locale.addEventListener("change",()=>{oo(this.$locale.value),Q(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.refreshAutoFarmStatusText(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(b("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${O}`,o.click(),await j(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new go(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let s;if(p.name.endsWith(`.${O}`))s=await S.fromJSON(this.bot,JSON.parse(await p.text()));else{let l=new FileReader;l.readAsDataURL(p),await j(l,["load"],["error"]);let a=await this.compressImageBeforeLoad(l.result),c=new Image;c.src=a,await j(c,["load"],["error"]),await this.waitForStableViewportProjection(),s=new S(this.bot,P.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new Z(this.bot,c))}this.bot.images.push(s),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),s.updateTasks(),k(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(b("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:p,minGlobalY:s,maxGlobalX:l,maxGlobalY:a}=o,c=document.createElement("canvas");c.width=Math.max(1,l-p+1),c.height=Math.max(1,a-s+1);let r=c.getContext("2d");if(!r)throw new Error("Capture context unavailable");r.imageSmoothingEnabled=!1;let g=Math.floor(p/M),f=Math.floor(s/M),u=Math.floor(l/M),w=Math.floor(a/M),d=(u-g+1)*(w-f+1),n=0;for(let m=g;m<=u;m++)for(let z=f;z<=w;z++){this.status=`⌛ ${b("taskReadingTiles")} [${++n}/${d}]`;let t=await this.loadTileImage(m,z),H=m*M,A=z*M,h=Math.max(p,H),F=Math.min(l,H+M-1),D=Math.max(s,A),W=Math.min(a,A+M-1),E=h-H,I=D-A,_=F-h+1,K=W-D+1,v=h-p,x=D-s;r.drawImage(t,E,I,_,K,v,x,_,K)}let i=Date.now();await this.downloadCapture(c,"png",i)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,p,s){let l=p==="webp"?"image/webp":"image/png",a=await new Promise((g,f)=>{o.toBlob((u)=>{if(!u){f(new Error(`Failed to create ${p.toUpperCase()} capture file`));return}g(u)},l)}),c=URL.createObjectURL(a),r=document.createElement("a");r.href=c,r.download=`wplace-capture-${s}.${p}`,r.click(),URL.revokeObjectURL(c)}async loadTileImage(o,p){let s;for(let l=1;l<=3;l++)try{let a=new Image;return a.crossOrigin="anonymous",a.referrerPolicy="no-referrer",a.src=`https://backend.wplace.live/files/s0/tiles/${o}/${p}.png?ts=${Date.now()}-${l}`,await j(a,["load"],["error"]),a}catch(a){if(s=a,l<3)await new Promise((c)=>setTimeout(c,l*200))}throw s instanceof Error?s:new Error(`Tile fetch failed (${o}/${p})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,p)=>{let s=document.createElement("div");s.className="kgm-capture-overlay",s.innerHTML=`<div class="kgm-capture-hint">${b("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let l=s.querySelector(".kgm-capture-box");document.body.append(s);let a,c,r=()=>{window.removeEventListener("keydown",d,!0),s.removeEventListener("pointermove",u),s.removeEventListener("pointerdown",w),s.remove()},g=(n)=>{let i=Math.min(a.x,n.x),m=Math.min(a.y,n.y),z=Math.abs(a.x-n.x)+1,t=Math.abs(a.y-n.y)+1;return{left:i,top:m,width:z,height:t}},f=(n)=>{let{left:i,top:m,width:z,height:t}=g(n);l.style.left=`${i}px`,l.style.top=`${m}px`,l.style.width=`${z}px`,l.style.height=`${t}px`},u=(n)=>{if(!a)return;f({x:n.clientX,y:n.clientY})},w=(n)=>{if(n.preventDefault(),!a){a={x:n.clientX,y:n.clientY};let h=P.fromScreenPosition(this.bot,a);c={x:h.globalX,y:h.globalY},f(a);return}let i={x:n.clientX,y:n.clientY},m=P.fromScreenPosition(this.bot,i);if(r(),!c){p(new Error("Capture anchor point unavailable"));return}let z=Math.min(c.x,m.globalX),t=Math.min(c.y,m.globalY),H=Math.max(c.x,m.globalX),A=Math.max(c.y,m.globalY);if(H-z<1||A-t<1){p(new Error("Capture area too small"));return}o({minGlobalX:z,minGlobalY:t,maxGlobalX:H,maxGlobalY:A})},d=(n)=>{if(n.key!=="Escape")return;r(),p(new Error("Capture cancelled"))};window.addEventListener("keydown",d,!0),s.addEventListener("pointermove",u),s.addEventListener("pointerdown",w)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await j(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let l=document.createElement("canvas");l.width=p.naturalWidth,l.height=p.naturalHeight;let a=l.getContext("2d");if(!a)return o;return a.drawImage(p,0,0),l.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),p=0,s;for(let l=0;l<45;l++){await new Promise((u)=>requestAnimationFrame(()=>{u()}));let{anchorScreenPosition:{x:a,y:c},pixelSize:r}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(r)||r<=0){p=0;continue}let g={anchorX:a,anchorY:c,pixelSize:r};if(!s){s=g,p=1;continue}if(Math.abs(g.anchorX-s.anchorX)+Math.abs(g.anchorY-s.anchorY)+Math.abs(g.pixelSize-s.pixelSize)<0.0012)p++;else p=0;if(s=g,p>=3)return}}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let c=0;c<this.bot.images.length;c++){let r=this.bot.images[c];o+=r.pixels.pixels.length*r.pixels.pixels[0].length,p+=r.tasks.length}let s=Math.max(0,o-p),l=o>0?s/o*100|0:0;this.$progressText.textContent=`${s}/${o} ${l}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${l/100})`,this.$images.innerHTML="";let a=document.createDocumentFragment();for(let c=0;c<this.bot.images.length;c++){let r=this.bot.images[c],g=document.createElement("div");a.append(g),g.className="image",g.innerHTML=`<button class="preview" title="View preview">
  <img src="${r.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${c===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${c===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,g.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=c,r.openPreviewPanel()}),g.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=c,r.openColorPanel()}),g.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=c,r.openPreviewPanel()}),g.querySelector(".download").addEventListener("click",()=>{r.exportImage()}),g.querySelector(".delete").addEventListener("click",()=>{r.destroy()}),g.querySelector(".up").addEventListener("click",()=>{lo(this.bot.images,c,c-1),this.update(),k(this.bot)}),g.querySelector(".down").addEventListener("click",()=>{lo(this.bot.images,c,c+1),this.update(),k(this.bot)})}this.$images.append(a)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Fo)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Fo,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${b("toggleOverlay")} (${b("disabled")})`:`${b("toggleOverlay")} (${b("enabled")})`}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=b("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${b("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)})`:b("autoFarmStopped")}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.refreshAutoFarmStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${b("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmIntervalId=window.setInterval(()=>{this.runAutoFarmCycle()},this.autoFarmConfig.timerMs),this.runAutoFarmCycle(),this.refreshAutoFarmStatusText()}async runAutoFarmCycle(){if(!this.autoFarmConfig||this.autoFarmTickRunning)return;this.autoFarmTickRunning=!0;try{await this.bot.drawRandomPixelsBatch(this.autoFarmConfig.pixels),await this.waitAndClickPaintButton()}finally{this.autoFarmTickRunning=!1}}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(No,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(No);if(!o)return;try{let p=JSON.parse(o);if(typeof p.value!=="number"||!Number.isFinite(p.value)||p.value<1)return;let s=typeof p.pixels==="number"&&Number.isFinite(p.pixels)&&p.pixels>=1?Math.floor(p.pixels):60,l=p.unit==="hours"||p.unit==="minutes"||p.unit==="seconds"?p.unit:"minutes",a=typeof p.timerMs==="number"&&p.timerMs>0?p.timerMs:l==="hours"?p.value*3600000:l==="minutes"?p.value*60000:p.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(p.value)),pixels:s,unit:l,timerMs:a}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let p=this.autoFarmConfig?.unit??"minutes",s=this.autoFarmConfig?.value??1,l=this.autoFarmConfig?.pixels??60;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${b("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${s}" />
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
    <button type="button" class="autofarm-start" data-i18n="autoFarmStart">Start</button>
    <button type="button" class="autofarm-stop" data-i18n="autoFarmStop">Stop</button>
  </div>
</form>`,document.body.append(o),Q(o);let a=o.querySelector(".autofarm-unit");a.value=p;let c=o.querySelector(".autofarm-value"),r=o.querySelector(".autofarm-pixels"),g=()=>{let f=Math.max(1,Number.parseInt(c.value||"1",10));if(a.value==="hours")return f*3600000;if(a.value==="minutes")return f*60000;return f*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(c.value||"1",10)),pixels:Math.max(1,Number.parseInt(r.value||"60",10)),unit:a.value,timerMs:g()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,s,l="..."){console.log("[KGM][Widget] Task started",{status:o});let a=this.status;this.status=`${l} ${o}`;try{let c=await p();return this.status=a,console.log("[KGM][Widget] Task completed",{status:o}),c}catch(c){if(!(c instanceof ao))console.error(c),this.status=`${b("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:c}),c}finally{await s?.()}}handleKeyboard(o){if(ko(o.target))return;if(J(o,N.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(J(o,N.showShortcuts)){o.preventDefault(),this.open=!0,this.$shortcuts.open=!0,this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(J(o,N.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(J(o,N.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(J(o,N.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(J(o,N.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(J(o,N.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(J(o,N.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(J(o,N.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(J(o,N.stopAutoFarm)){o.preventDefault(),this.stopAutoFarm();return}if(J(o,N.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(J(o,N.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),k(this.bot)}async waitAndClickPaintButton(){await this.run(b("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){this.triggerNativePaintClick(o);return}await new Promise((p)=>setTimeout(p,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((s)=>Array.from(document.querySelectorAll(s))).find((s)=>/pintar|paint/i.test(s.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}}var _o=2,Jo="[KGM]",Do="kglacer-macro:access-ok",uo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Uo="kgm-access-locked";class Qo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${Jo} ${o}`);else console.log(`${Jo} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Uo);let o=Mo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let s=0;s<o.images.length;s++){let l=o.images[s];$({x:l.position[0]-1000,y:l.position[1]-1000}),$({x:l.position[0]+1000,y:l.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=ho.replace("FAKE_FAVORITE_LOCATIONS",T.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:T.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Uo),this._widget=new fo(this),await this.widget.run(b("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let s=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((l)=>{for(let a=0;a<l.length;a++)if(l[a].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(s,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await U(500),await this.updateColors(),o)for(let l=0;l<o.images.length;l++){let a=await S.fromJSON(this,o.images[l]);this.images.push(a),a.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Do)===uo)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),Q(p);let s=p.querySelector(".access-input"),l=p.querySelector(".access-error"),a=p.querySelector(".access-locale");a.innerHTML=io().map((c)=>`<option value="${c}" ${c===Y()?"selected":""}>${c.toUpperCase()}</option>`).join(""),a.addEventListener("change",()=>{oo(a.value),Q(p)}),p.addEventListener("cancel",(c)=>{c.preventDefault()}),p.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault();let r=atob(uo);if(s.value.trim()!==r){l.textContent=b("invalidAccessKey");return}localStorage.setItem(Do,uo),p.close(),p.remove(),o()}),p.showModal(),s.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(s)=>{if(!s.shiftKey)s.stopPropagation()};return this.widget.run(b("taskDrawing"),async()=>{await this.widget.run(b("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let s=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),l=Math.floor(s.charges.count);this.log("Charges fetched",{charges:l});let a=0;for(let c=0;c<this.images.length;c++)a+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:a}),this.strategy){case"ALL":{while(l>0){let c=!0;for(let r=0;r<this.images.length;r++){let g=this.images[r].tasks.shift();if(!g)continue;this.drawTask(g),l--,await U(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<a&&l>0;c++){let r=1,g;for(let f=0;f<this.images.length;f++){let u=this.images[f],w=1-u.tasks.length/(u.pixels.pixels.length*u.pixels.pixels[0].length);if(w<r)r=w,g=u}this.drawTask(g.tasks.shift()),l--,await U(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let r=this.images[c];for(let g=r.tasks.shift();g&&l>0;g=r.tasks.shift())this.drawTask(g),l--,await U(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:l})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:_o,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),s=window.innerWidth/2,l=window.innerHeight/2,a=s-o.x,c=l-o.y;function r(g,f,u){p.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:f,clientY:u,buttons:1}))}r("mousedown",s,l),r("mousemove",a,c),r("mouseup",a,c)}readMap(){this.mapsCache.clear();let o=new Set;for(let s=0;s<this.images.length;s++){let l=this.images[s],{tileX:a,tileY:c}=new P(this,l.position.globalX+l.pixels.pixels[0].length,l.position.globalY+l.pixels.pixels.length);for(let r=l.position.tileX;r<=a;r++)for(let g=l.position.tileY;g<=c;g++)o.add(`${r}/${g}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${b("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(s)=>{this.mapsCache.set(s,await Z.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${s}.png`,exactColor:!0})),this.widget.status=`⌛ ${b("taskReadingMap")} [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,s=1,l=1/0,a=1/0;for(let g=0;g<this.$stars.length;g++){let{x:f,y:u}=L(this.$stars[g]);if(f<o.x&&u<o.y){let w=o.x-f+(o.y-u);if(w<l)l=w,p=g}else if(f>o.x&&u>o.y){let w=f-o.x+(u-o.y);if(w<a)a=w,s=g}}let c=L(this.$stars[p]),r=G[p];return{anchorScreenPosition:c,anchorWorldPosition:r,pixelSize:(L(this.$stars[s]).x-c.x)/(G[s].x-r.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await U(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await U(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await U(1)}drawTask(o){if(this.lastColor!==o.color){let l=document.getElementById("color-"+o.color);if(!l){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}l.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let p=o.position.pixelSize/2,s=o.position.toScreenPosition();if(!Number.isFinite(s.x)||!Number.isFinite(s.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:s.x+p,clientY:s.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((n)=>!n.disabled&&n.getAttribute("aria-disabled")!=="true"&&n.offsetParent!==null);if(!o.length)return;let p=o[Math.floor(Math.random()*o.length)],s=Number.parseInt(p.id.slice(6),10);if(!Number.isFinite(s))return;let l=document.querySelector(".maplibregl-canvas");if(!l)return;let a=l.getBoundingClientRect(),c=24,r=a.left+c,g=a.right-c,f=a.top+c,u=a.bottom-c;if(g<=r||u<=f)return;let w=r+Math.random()*(g-r),d=f+Math.random()*(u-f);this.drawTask({color:s,position:P.fromScreenPosition(this,{x:w,y:d})})}catch(o){this.log("Auto farm tick failed",o)}}async drawRandomPixelsBatch(o){let p=Math.max(1,Math.floor(o)),s=0;return await this.widget.run(b("taskDrawingRandomPixels"),async()=>{await this.widget.run(b("taskInitializingDraw"),()=>this.updateColors());let l=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((d)=>!d.disabled&&d.getAttribute("aria-disabled")!=="true"&&d.offsetParent!==null),a=document.querySelector(".maplibregl-canvas");if(!l.length||!a)return;let c=a.getBoundingClientRect(),r=24,g=c.left+r,f=c.right-r,u=c.top+r,w=c.bottom-r;if(f<=g||w<=u)return;for(let d=0;d<p;d++){let n=l[Math.floor(Math.random()*l.length)],i=Number.parseInt(n.id.slice(6),10);if(!Number.isFinite(i))continue;let m=g+Math.random()*(f-g),z=u+Math.random()*(w-u);this.drawTask({color:i,position:P.fromScreenPosition(this,{x:m,y:z})}),s++,await U(1)}}),s}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(s,l)=>{let a=await o(s,l),c=a.clone(),r="";if(typeof s=="string")r=s;else if(s instanceof Request)r=s.url;else if(s instanceof URL)r=s.href;if(a.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...T),this.me.maxFavoriteLocations=1/0,a.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let g=p.exec(r);if(g){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new P(this,+g[1],+g[2],+g[3],+g[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return a}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await U(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`${b("taskWaitingFor")} ${o}`,()=>{return new Promise((s)=>{let l=document.querySelector(p);if(l){s(l);return}let a=new MutationObserver(()=>{let c=document.querySelector(p);if(c)a.disconnect(),s(c)});a.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,T.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new Qo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
