// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.21
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
function so(o,p,a){let s=o[a];return o[a]=o[p],o[p]=s,o}function po(o,p){let a=o.indexOf(p);if(a!==-1)o.splice(a,1);return a}var la=Math.floor(Math.random()*65536),sa=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function K(o){return new Promise((p)=>setTimeout(p,o))}function q(o,p,a=["error"],s="addEventListener"){return new Promise((l,c)=>{for(let r=0;r<p.length;r++)o[s]?.(p[r],l);for(let r=0;r<a.length;r++)o[s]?.(a[r],c)})}class Wo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:a}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+a<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,a)=>p+a.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,a=Math.min(p,this.historyTime);return{time:o,historyTime:a}}}var no=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutStartAutoFarm:"Start auto farm",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint · Shift+F start auto farm",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",autoFarmSection:"Auto farm",configureAutoFarm:"Configure auto farm",autoFarmStopped:"Stopped",autoFarmRunning:"Running",autoFarmModalTitle:"Auto farm timer",autoFarmHelp:"Paint random sparse pixels over time, similar to transparent PNG farming.",autoFarmTimer:"Timer",autoFarmStart:"Start",autoFarmStop:"Stop",autoFarmNeedsConfig:"Configure auto farm first",seconds:"Seconds",minutes:"Minutes",hours:"Hours",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutStartAutoFarm:"Iniciar auto farm",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar · Shift+F iniciar auto farm",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",autoFarmSection:"Auto farm",configureAutoFarm:"Configurar auto farm",autoFarmStopped:"Detenido",autoFarmRunning:"Activo",autoFarmModalTitle:"Temporizador auto farm",autoFarmHelp:"Pinta píxeles aleatorios y dispersos en el tiempo, como un farm de PNG transparente.",autoFarmTimer:"Temporizador",autoFarmStart:"Iniciar",autoFarmStop:"Detener",autoFarmNeedsConfig:"Primero configura el auto farm",seconds:"Segundos",minutes:"Minutos",hours:"Horas",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",captureHintSelectArea:"Selecciona área"}};function Zo(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let p=0;p<no.length;p++){let a=localStorage.getItem(no[p]);if(!a||!(a in y))continue;return localStorage.setItem("kglacer-macro:locale",a),a}return Zo()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function io(){return Object.keys(y)}function b(o){let p=_();return y[p][o]}function D(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=b(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",b(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",b(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",b(p.dataset.i18nPlaceholder))}class X{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let a in p)this[a]=o.querySelector(p[a])}registerEvent(o,p,a,s={}){s.passive??=!0,o.addEventListener(p,a,s),this.runOnDestroy.push(()=>{o.removeEventListener(p,a)})}}function co(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function mo(o,p,a){let s=co(o/255),l=co(p/255),c=co(a/255),r=Math.cbrt(0.4122214708*s+0.5363325363*l+0.0514459929*c),g=Math.cbrt(0.2119034982*s+0.6806995451*l+0.1073969566*c),f=Math.cbrt(0.0883024619*s+0.2817188376*l+0.6299787005*c),u=0.2104542553*r+0.793617785*g-0.0040720468*f,w=1.9779984951*r-2.428592205*g+0.4505937099*f,d=0.0259040371*r+0.7827717662*g-0.808675766*f;return[u,w,d]}function zo(o,p,a){let[s,l,c]=o,[r,g,f]=p,u=(lo)=>lo*180/Math.PI,w=(lo)=>lo*Math.PI/180,d=1,n=1,i=1,m=Math.sqrt(l**2+c**2),H=Math.sqrt(g**2+f**2),z=(m+H)/2,M=0.5*(1-Math.sqrt(z**7/(z**7+6103515625))),A=l*(1+M),P=g*(1+M),N=Math.sqrt(A**2+c**2),U=Math.sqrt(P**2+f**2),Z=c===0&&A===0?0:u(Math.atan2(c,A))%360,T=f===0&&P===0?0:u(Math.atan2(f,P))%360,I=r-s,Y=U-N,Q=0;if(N*U!==0){if(Q=T-Z,Q>180)Q-=360;else if(Q<-180)Q+=360}let v=2*Math.sqrt(N*U)*Math.sin(w(Q)/2),x=(s+r)/2,e=(N+U)/2,L=(Z+T)/2;if(Math.abs(Z-T)>180)L+=180;let Ko=1-0.17*Math.cos(w(L-30))+0.24*Math.cos(w(2*L))+0.32*Math.cos(w(3*L+6))-0.2*Math.cos(w(4*L-63)),Go=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),wo=1+0.045*e,bo=1+0.015*e*Ko,jo=30*Math.exp((-((L-275)/25))**2),qo=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(w(2*jo));return Math.sqrt((I/(1*Go))**2+(Y/(1*wo))**2+(v/(1*bo))**2+qo*(Y/(1*wo))*(v/(1*bo)))-I*a}var R=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],S=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function ro(o){if(o===0)return"transparent";let p=R[o],a=`oklab(${p[0]*100}% ${p[1]} ${p[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",a))return a;let[s=0,l=0,c=0]=(S[o]??"0,0,0").split(",").map((r)=>Number.parseInt(r,10));return`rgb(${s} ${l} ${c})`}var Ao=`<div class="wtopbar">
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
`;class W{bot;image;width;exactColor;static async fromJSON(o,p){let a=new Image;return a.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((s)=>s.blob()).then((s)=>URL.createObjectURL(s)):p.url,await q(a,["load"],["error"]),new W(o,a,p.width,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,a=p.naturalWidth,s=!1){this.bot=o;this.image=p;this.width=a;this.exactColor=s;if(s)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let a=1;a<64;a++)if(this.exactColor||!this.bot.unavailableColors.has(a))o.set(S[a],[a,a]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let a=0;a<this.canvas.height;a++)for(let s=0;s<this.canvas.width;s++){let l=(a*this.canvas.width+s)*4,c=p[l],r=p[l+1],g=p[l+2],f=p[l+3],u=c,w=r,d=g,n=`${u},${w},${d}`;if(this.exactColor){this.pixels[a][s]=f<100?0:S.indexOf(n);continue}let i,m;if(f<100)i=m=0;else if(o.has(n))[i,m]=o.get(n);else{let z=1/0,M=1/0;for(let A=0;A<R.length;A++){let P=R[A],N=zo(mo(u,w,d),P,0);if(!this.bot.unavailableColors.has(A)&&N<z)z=N,i=A;if(N<M)M=N,m=A}o.set(n,[i,m])}if(i!==0)this.context.fillStyle=`oklab(${R[i][0]*100}% ${R[i][1]} ${R[i][2]})`,this.context.fillRect(s,a,1,1);this.pixels[a][s]=i;let H=this.colors.get(m);if(H)H.amount++;else this.colors.set(m,{color:i,amount:1,realColor:m})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var V="kglacer-macro-settings",Ho=["kglacermacro","wbot"],O="kgm";function Bo(){let o=[V,...Ho];for(let p=0;p<o.length;p++){let a=o[p],s=localStorage.getItem(a);if(!s)continue;return{json:s,key:a}}return}function to(){let o=Bo();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let a=p;p.images=a.widget.images,p.strategy=a.widget.strategy,delete a.widget}if(o.key!==V)localStorage.setItem(V,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Mo;function h(o,p=!1){if(clearTimeout(Mo),p)localStorage.setItem(V,JSON.stringify(o));else Mo=setTimeout(()=>{localStorage.setItem(V,JSON.stringify(o))},600)}var t=1000,Lo=2048,C=t*Lo,G=[],E=[],Vo=Date.now();function $(o){G.push(o),E.push({id:Vo++,latitude:(2*Math.atan(Math.exp(-(o.y/C*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/C*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}$({x:C/3|0,y:C/3|0});$({x:C/3*2|0,y:C/3*2|0});function B(o){let[p,a]=o.style.transform.slice(32,-31).split(", ").map((s)=>Number.parseFloat(s));return{x:p,y:a}}class k{bot;static fromJSON(o,p){return new k(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:a,pixelSize:s,anchorWorldPosition:l}=o.findAnchorsForScreen(p);return new k(o,l.x+(p.x-a.x)/s|0,l.y+(p.y-a.y)/s|0)}globalX=0;globalY=0;get tileX(){return this.globalX/t|0}set tileX(o){this.globalX=o*t+this.x}get tileY(){return this.globalY/t|0}set tileY(o){this.globalY=o*t+this.y}get x(){return this.globalX%t}set x(o){this.globalX=this.tileX*t+o}get y(){return this.globalY%t}set y(o){this.globalY=this.tileY*t+o}anchor1Index;anchor2Index;get pixelSize(){return(B(this.bot.$stars[this.anchor2Index]).x-B(this.bot.$stars[this.anchor1Index]).x)/(G[this.anchor2Index].x-G[this.anchor1Index].x)}constructor(o,p,a,s,l){this.bot=o;if(s===void 0||l===void 0)this.globalX=p,this.globalY=a;else this.globalX=p*t+s,this.globalY=a*t+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let a=0;a<G.length;a++){let{x:s,y:l}=G[a];if(s<this.globalX&&l<this.globalY){let c=this.globalX-s+(this.globalY-l);if(c<o)o=c,this.anchor1Index=a}else if(s>this.globalX&&l>this.globalY){let c=s-this.globalX+(l-this.globalY);if(c<p)p=c,this.anchor2Index=a}}}toScreenPosition(){let o=G[this.anchor1Index],p=B(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new k(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class j extends X{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,p){return new j(o,k.fromJSON(o,p.position),await W.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,p,a,s="SPIRAL_FROM_CENTER",l=50,c=!1,r=!1,g=[],f=!1){super();this.bot=o;this.position=p;this.pixels=a;this.strategy=s;this.opacity=l;this.drawTransparentPixels=c;this.drawColorsInOrder=r;this.colors=g;this.lock=f;this.element.innerHTML=Ao,this.element.classList.add("wimage"),D(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();h(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),h(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),h(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,h(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,h(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),h(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,a=new Map;for(let s=0;s<this.colors.length;s++){let l=this.colors[s];if(l.disabled)p.add(l.realColor);a.set(l.realColor,s)}for(let{x:s,y:l}of this.strategyPositionIterator()){let c=this.pixels.pixels[l][s];if(p.has(c))continue;o.globalX=this.position.globalX+s,o.globalY=this.position.globalY+l;let r=o.getMapColor();if(c!==r&&(this.drawTransparentPixels||c!==0))this.tasks.push({position:o.clone(),color:c})}if(this.drawColorsInOrder)this.tasks.sort((s,l)=>(a.get(s.color)??0)-(a.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),a=this.position.pixelSize*this.pixels.width,s=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${p.toFixed(3)}px, 0)`,this.element.style.width=`${a}px`,this.element.style.height=`${s}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,c=Math.max(0,l-this.tasks.length),r=l>0?c/l*100|0:0;this.$progressText.textContent=`${c}/${l} ${r}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${r/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let g of this.element.querySelectorAll(".resize"))g.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),po(this.bot.images,this),this.bot.widget.update(),h(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let a=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-a.left,offsetY:o.clientY-a.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),a=Math.max(8,window.innerWidth-p.width-8),s=Math.max(8,window.innerHeight-p.height-8),l=Math.min(a,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),c=Math.min(s,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(c)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let p=document.createDocumentFragment(),a=document.createElement("article");a.className="preview-card";let s=document.createElement("strong");s.textContent=this.getStrategyLabel(o);let l=document.createElement("canvas");l.className="preview-canvas",l.width=156,l.height=156,this.paintStrategyPreview(l,o),a.append(s,l),p.append(a),this.$previewDialogList.append(p)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((a,s)=>`${s}:${a.realColor}:${a.disabled?1:0}`).join("|"),p=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===p)return;this.previewCacheSignature=p,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return b("random");case"HUMANIZED":return b("humanized");case"HUMAN_SOFT_DITHER":return b("humanSoftDither");case"HUMAN_PATCHY":return b("humanPatchy");case"HUMAN_SWEEP_ARCS":return b("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return b("humanMicroCorrections");case"HUMAN_JITTER_FILL":return b("humanJitterFill");case"HUMAN_CORNER_BIAS":return b("humanCornerBias");case"HUMAN_LONG_STROKES":return b("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return b("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return b("humanMessySpiral");case"HUMAN_DRUNK_WALK":return b("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return b("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return b("humanPatchJump");case"HUMAN_HESITANT_LINES":return b("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return b("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return b("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return b("humanGapRecovery");case"HUMAN_STAIRCASE":return b("humanStaircase");case"HUMAN_EDGE_HUGGER":return b("humanEdgeHugger");case"HUMAN_BLOBS":return b("humanBlobs");case"HUMAN_BACKTRACK":return b("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return b("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return b("humanLateFixes");case"ZIGZAG":return b("zigzag");case"BRUSH_STROKES":return b("brushStrokes");case"DIAGONAL_BRUSH":return b("diagonalBrush");case"DOWN":return b("down");case"UP":return b("up");case"LEFT":return b("left");case"RIGHT":return b("right");case"SPIRAL_FROM_CENTER":return b("spiralOut");case"SPIRAL_TO_CENTER":return b("spiralIn");case"SCRIBBLE":return b("scribble");case"CROSSHATCH":return b("crosshatch");case"WAVE_SWEEP":return b("waveSweep");case"SCATTERED_LINES":return b("scatteredLines");case"CONTOUR_JITTER":return b("contourJitter");case"SPIRAL_WOBBLE":return b("spiralWobble");case"CLUSTER_BURSTS":return b("clusterBursts");case"ORBITAL":return b("orbital");case"FLOW_FIELD":return b("flowField");case"EDGE_IN":return b("edgeIn");default:return o}}paintStrategyPreview(o,p){let a=o.getContext("2d");if(!a)return;a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);let s=this.getSampledImagePreviewData(),l=this.getCachedPreviewSequence(p,s.mask,s.width,s.height),c=Math.min(o.width/s.width,o.height/s.height),r=(o.width-s.width*c)/2,g=(o.height-s.height*c)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let u=(z)=>{let M=requestAnimationFrame((A)=>{this.previewAnimationHandles.delete(M),z(A)});return this.previewAnimationHandles.add(M),M},w=(z)=>{a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);for(let M=0;M<Math.min(z,l.length);M++){let A=l[M],P=s.colors.get(`${A.x}:${A.y}`)??0;if(!P)continue;a.fillStyle=ro(P),a.fillRect(r+A.x*c,g+A.y*c,Math.max(1,c),Math.max(1,c))}},d=Math.min(3400,Math.max(900,l.length*8)),i=d+220,m=(z,M)=>{if(!this.$previewDialog.open)return;let A=(M-z)%i,P=Math.min(1,A/d),N=P*P*(3-2*P);w(Math.floor(l.length*N));let U=u((Z)=>{m(z,Z)});this.previewAnimations.set(o,U)},H=performance.now();m(H,H)}getCachedPreviewSequence(o,p,a=this.pixels.width,s=this.pixels.height){let l=this.colors.map((f,u)=>`${u}:${f.realColor}:${f.disabled?1:0}`).join("|"),c=`${o}:${a}x${s}:${p.length}:${this.drawColorsInOrder?1:0}:${l}`,r=this.previewSequenceCache.get(c);if(r)return r;let g=a===this.pixels.width&&s===this.pixels.height?this.getExactPreviewSequence(o,p):this.getApproxPreviewSequence(o,p,a);if(this.drawColorsInOrder){let f=new Map;for(let u=0;u<this.colors.length;u++)f.set(this.colors[u].realColor,u);g.sort((u,w)=>(f.get(this.pixels.pixels[u.y]?.[u.x]??0)??0)-(f.get(this.pixels.pixels[w.y]?.[w.x]??0)??0))}return this.previewSequenceCache.set(c,g),g}getExactPreviewSequence(o,p){let a=this.strategy;this.strategy=o;let s=[...this.strategyPositionIterator()];this.strategy=a;let l=new Set(p.map(({x:c,y:r})=>`${c}:${r}`));return s.filter(({x:c,y:r})=>l.has(`${c}:${r}`))}getApproxPreviewSequence(o,p,a){let s=[...p],l=(g,f,u)=>{return(g*73856093+f*19349663+u*83492791>>>0)/4294967296},c=(g,f)=>s.sort((u,w)=>u.x*g+u.y*f-(w.x*g+w.y*f)||u.y-w.y||u.x-w.x),r=s.sort((g,f)=>{if(g.y!==f.y)return g.y-f.y;let u=g.y%2===0?g.x:a-g.x,w=f.y%2===0?f.x:a-f.x;return u-w});switch(o){case"UP":return c(0,-1);case"LEFT":return c(-1,0);case"RIGHT":return c(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let g=a/2,f=Math.max(1,Math.round(s.reduce((u,w)=>u+w.y,0)/Math.max(1,s.length)));return s.sort((u,w)=>{let d=(u.x-g)**2+(u.y-f)**2,n=(w.x-g)**2+(w.y-f)**2;return o==="SPIRAL_FROM_CENTER"?d-n:n-d}),s}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return s.sort((g,f)=>l(g.x,g.y,o.length)-l(f.x,f.y,o.length));default:return r}}getSampledImagePreviewData(){let o=this.pixels.width,p=this.pixels.height,a=j.PREVIEW_MASK_BASE_WIDTH,s=j.PREVIEW_MASK_BASE_HEIGHT,l=Math.min(1,a/Math.max(1,o),s/Math.max(1,p)),c=Math.max(1,Math.round(o*l)),r=Math.max(1,Math.round(p*l)),g=new Set;for(let d=0;d<this.colors.length;d++){let n=this.colors[d];if(n.disabled)g.add(n.realColor)}let f=new Map,u=new Map;for(let d=0;d<p;d++)for(let n=0;n<o;n++){let i=this.pixels.pixels[d]?.[n]??0;if(!i||g.has(i))continue;let m=Math.min(c-1,Math.floor(n/o*c)),H=Math.min(r-1,Math.floor(d/p*r)),z=`${m}:${H}`;if(!f.has(z))f.set(z,{x:m,y:H});if(!u.has(z))u.set(z,i)}let w=[...f.values()];if(!w.length){let d=this.fallbackPreviewMask();return{width:o,height:p,mask:d,colors:new Map(d.map((n)=>[`${n.x}:${n.y}`,this.pixels.pixels[n.y]?.[n.x]??0]))}}return{width:c,height:r,mask:w,colors:u}}getImagePreviewMask(){let o=this.pixels.width,p=this.pixels.height,a=new Set;for(let l=0;l<this.colors.length;l++){let c=this.colors[l];if(c.disabled)a.add(c.realColor)}let s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=this.pixels.pixels[l]?.[c]??0;if(r!==0&&!a.has(r))s.push({x:c,y:l})}return s.length?s:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,a=this.pixels.height/2,s=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let l=0;l<this.pixels.height;l++)for(let c=0;c<this.pixels.width;c++)if((c-p)**2+(l-a)**2<=s**2)o.push({x:c,y:l});return o}applyLocale(){if(D(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=S[o]??"0,0,0",[a=0,s=0,l=0]=p.split(",").map((c)=>Number.parseInt(c,10));return`#${[a,s,l].map((c)=>c.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=S[o]??"0,0,0",[a=0,s=0,l=0]=p.split(",").map((f)=>Number.parseInt(f,10)),c=Math.max(a,s,l),r=Math.min(a,s,l);if(c-r<15)return["gray","grey","gris","neutral","neutro"];if(a>s+30&&a>l+30)return["red","rojo"];if(s>a+30&&s>l+30)return["green","verde"];if(l>a+30&&l>s+30)return["blue","azul"];if(a>170&&s>120&&l<130)return["orange","naranja"];if(a>170&&s>110&&l>140)return["pink","rosa"];if(a>120&&s<100&&l>120)return["purple","violet","morado"];if(a>130&&s>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",b("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((a)=>!this.pixels.colors.has(a.realColor)))this.colors=this.pixels.colors.values().toArray().sort((a,s)=>s.amount-a.amount).map((a)=>({realColor:a.realColor,disabled:!1})),h(this.bot);for(let a=0;a<this.colors.length;a++){let s=this.colors[a],l=this.pixels.colors.get(s.realColor),c=!1,r=l.realColor!==l.color,g=l.amount/o*100,f=this.colorHex(l.realColor),u=this.colorKeywords(l.realColor),w=()=>{s.disabled=s.disabled?void 0:!0,d.classList.toggle("disabled",Boolean(s.disabled));let i=d.querySelector(".state");if(i)i.textContent=s.disabled?b("disabled"):b("enabled");h(this.bot)},d=document.createElement("button");if(d.className=`color-chip ${s.disabled?"disabled":""}`,d.draggable=!0,d.setAttribute("aria-label",`${b("overlayColors")} #${a+1}: ${f.toUpperCase()}`),d.innerHTML=`<span class="order-index">#${a+1}</span>
<span class="drag" title="${b("up")} / ${b("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${g.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${s.disabled?b("disabled"):b("enabled")}</span>
</span>
<span class="premium ${r?"on":""}">${r?b("premium"):""}</span>`,d.querySelector(".swatch").style.setProperty("--swatch-color",ro(l.realColor)),d.addEventListener("click",()=>{if(c){c=!1;return}w()}),d.addEventListener("dragstart",(i)=>{c=!0,d.classList.add("dragging"),i.dataTransfer?.setData("text/plain",String(a)),i.dataTransfer.effectAllowed="move"}),d.addEventListener("dragend",()=>{d.classList.remove("dragging")}),d.addEventListener("dragover",(i)=>{i.preventDefault(),d.classList.add("drag-target")}),d.addEventListener("dragleave",()=>{d.classList.remove("drag-target")}),d.addEventListener("drop",(i)=>{i.preventDefault(),d.classList.remove("drag-target");let m=Number.parseInt(i.dataTransfer?.getData("text/plain")??"-1",10);if(m<0||m===a||m>=this.colors.length)return;this.colors.splice(a,0,...this.colors.splice(m,1)),h(this.bot),this.updateColors()}),r){let i=document.createElement("button");i.textContent=b("buy"),i.className="buy-chip",i.addEventListener("click",(m)=>{m.stopPropagation(),document.getElementById("color-"+l.realColor)?.click()}),d.append(i)}let n=`${f} ${u.join(" ")} ${l.realColor} ${S[l.realColor]}`;if(!p||n.toLowerCase().includes(p))this.$colorsDialogList.append(d)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let a=0;a<p;a++)for(let s=0;s<o;s++)yield{x:s,y:a};break}case"UP":{for(let a=p-1;a>=0;a--)for(let s=0;s<o;s++)yield{x:s,y:a};break}case"LEFT":{for(let a=0;a<o;a++)for(let s=0;s<p;s++)yield{x:a,y:s};break}case"RIGHT":{for(let a=o-1;a>=0;a--)for(let s=0;s<p;s++)yield{x:a,y:s};break}case"RANDOM":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)a.push({x:l,y:s});for(let s=a.length-1;s>=0;s--){let l=Math.floor(Math.random()*(s+1)),c=a[s];a[s]=a[l],a[l]=c}yield*a;break}case"ZIGZAG":{for(let a=0;a<p;a++)if(a%2===0)for(let s=0;s<o;s++)yield{x:s,y:a};else for(let s=o-1;s>=0;s--)yield{x:s,y:a};break}case"HUMANIZED":{let a=Math.max(4,Math.floor(Math.min(o,p)/10)),s=[];for(let l=0;l<p;l+=a)for(let c=0;c<o;c+=a)s.push({x:c,y:l});for(let l=s.length-1;l>=0;l--){let c=Math.floor(Math.random()*(l+1)),r=s[l];s[l]=s[c],s[c]=r}for(let l=0;l<s.length;l++){let c=s[l],r=Math.min(p,c.y+a),g=Math.min(o,c.x+a);for(let f=c.y;f<r;f++)if(Math.random()>0.35)for(let w=c.x;w<g;w++)yield{x:w,y:f};else for(let w=g-1;w>=c.x;w--)yield{x:w,y:f}}break}case"HUMAN_SOFT_DITHER":{let a=new Set;for(let s=0;s<p;s++){let l=Math.floor(Math.random()*3)-1;if((s+l)%2===0)for(let r=0;r<o;r+=2)a.add(`${r},${s}`),yield{x:r,y:s};else for(let r=1;r<o;r+=2)a.add(`${r},${s}`),yield{x:r,y:s}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_PATCHY":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=1+Math.floor(Math.random()*5);for(let g=c-r;g<=c+r;g++)for(let f=l-r;f<=l+r;f++){if(f<0||f>=o||g<0||g>=p)continue;if(Math.hypot(f-l,g-c)>r+Math.random()*1.2)continue;let u=`${f},${g}`;if(a.has(u))continue;a.add(u),yield{x:f,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.hypot(s,l);for(let r=0;r<4;r++){let g=Math.random()*Math.PI*2;for(let f=0;f<=c;f+=0.35){let u=Math.PI/2+Math.random()*(Math.PI/1.5),w=Math.max(10,Math.floor(f*8));for(let d=0;d<w;d++){let n=g+u*d/w+Math.sin(f)*0.08,i=Math.round(s+Math.cos(n)*f),m=Math.round(l+Math.sin(n)*f);if(i<0||i>=o||m<0||m>=p)continue;let H=`${i},${m}`;if(a.has(H))continue;a.add(H),yield{x:i,y:m}}}}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(a.has(f))continue;yield{x:g,y:r}}break}case"HUMAN_MICRO_CORRECTIONS":{let a=new Set;for(let s=0;s<p;s++){let l=s%2===0?1:-1,c=l>0?0:o-1;for(let r=0;r<o;r++){let g=c+(Math.random()>0.82?l:0),f=s+(Math.random()>0.9?1:0);for(let u of[{x:c,y:s},{x:g,y:s},{x:c,y:f}]){if(u.x<0||u.x>=o||u.y<0||u.y>=p)continue;let w=`${u.x},${u.y}`;if(a.has(w))continue;a.add(w),yield u}c+=l}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_JITTER_FILL":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)a.push({x:l,y:s});a.sort((s,l)=>{let c=s.y+(Math.random()-0.5)*1.8,r=l.y+(Math.random()-0.5)*1.8;if(c!==r)return c-r;return s.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*a;break}case"HUMAN_CORNER_BIAS":{let a=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],s=a[Math.floor(Math.random()*a.length)],l=[];for(let c=0;c<p;c++)for(let r=0;r<o;r++){let f=Math.hypot(r-s.x,c-s.y)+Math.random()*3.5;l.push({point:{x:r,y:c},score:f})}l.sort((c,r)=>c.score-r.score);for(let c of l)yield c.point;break}case"HUMAN_LONG_STROKES":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=Math.random()*Math.PI*2,g=Math.sign(Math.cos(r)),f=Math.sign(Math.sin(r)),u=10+Math.floor(Math.random()*40);for(let w=0;w<u;w++){if(l<0||l>=o||c<0||c>=p)break;let d=`${l},${c}`;if(!a.has(d))a.add(d),yield{x:l,y:c};if(Math.random()>0.78)l+=f,c+=g;else l+=g,c+=f}}break}case"HUMAN_TAP_CLUSTERS":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=3+Math.floor(Math.random()*10);for(let g=0;g<r;g++){let f=Math.round(l+(Math.random()-0.5)*6),u=Math.round(c+(Math.random()-0.5)*6);if(f<0||f>=o||u<0||u>=p)continue;let w=`${f},${u}`;if(a.has(w))continue;a.add(w),yield{x:f,y:u}}}break}case"HUMAN_MESSY_SPIRAL":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.hypot(s,l)+2;for(let r=0;a.size<o*p;r++){let g=r/3,f=Math.min(c,g*0.18),u=g*0.29+Math.sin(g*0.13)*0.8,w=Math.round(s+Math.cos(u)*f+Math.sin(g)*0.7),d=Math.round(l+Math.sin(u)*f+Math.cos(g)*0.7);if(w<0||w>=o||d<0||d>=p){if(r>o*p*18)break;continue}let n=`${w},${d}`;if(a.has(n)){if(Math.random()>0.9)continue}else a.add(n),yield{x:w,y:d};if(r>o*p*18)break}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(a.has(f))continue;yield{x:g,y:r}}break}case"HUMAN_DRUNK_WALK":{let a=new Set,s=Math.floor(Math.random()*o),l=Math.floor(Math.random()*p),c=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(a.size<o*p){let r=`${s},${l}`;if(!a.has(r))a.add(r),yield{x:s,y:l};let g=[];for(let w of c){let d=s+w.x,n=l+w.y;if(d<0||d>=o||n<0||n>=p)continue;g.push({x:d,y:n})}if(!g.length)break;let f=g.filter((w)=>{return!a.has(`${w.x},${w.y}`)});if(f.length&&Math.random()>0.2){let w=f[Math.floor(Math.random()*f.length)];s=w.x,l=w.y;continue}let u=g[Math.floor(Math.random()*g.length)];s=u.x,l=u.y}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(a.has(f))continue;yield{x:g,y:r}}break}case"HUMAN_NOISE_CLOUD":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((s+1)*1.17+Math.random()*0.8),r=(Math.random()-0.5)*2.6,g=Math.hypot(l-o/2,s-p/2)*0.08;a.push({point:{x:l,y:s},score:c+r+g})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_PATCH_JUMP":{let a=new Set,s=[];for(let l=0;l<Math.max(6,o*p/18);l++)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(a.size<o*p){let l=s[Math.floor(Math.random()*s.length)],c=1+Math.floor(Math.random()*3),r=1+Math.floor(Math.random()*3);for(let g=l.y-r;g<=l.y+r;g++)for(let f=l.x-c;f<=l.x+c;f++){if(f<0||f>=o||g<0||g>=p)continue;if(Math.random()>0.86)continue;let u=`${f},${g}`;if(a.has(u))continue;a.add(u),yield{x:f,y:g}}if(Math.random()>0.72&&s.length<o*p/2)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(a.size>o*p*0.92)break}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=`${c},${l}`;if(a.has(r))continue;yield{x:c,y:l}}break}case"HUMAN_HESITANT_LINES":{let a=new Set;for(let s=0;s<p;s++){let l=s%2===0;for(let c=0;c<o;c++){let r=l?c:o-1-c,g=`${r},${s}`;if(!a.has(g))a.add(g),yield{x:r,y:s};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,r+(Math.random()>0.5?1:-1))),u=Math.max(0,Math.min(p-1,s+(Math.random()>0.65?1:0))),w=`${f},${u}`;if(!a.has(w))a.add(w),yield{x:f,y:u}}}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_OVERLAP_SWEEPS":{let a=[],s=Math.random()*Math.PI*2;for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=Math.sin((c+l)*0.42+s)*2.2,g=Math.cos((c-l)*0.3+s)*1.4;a.push({point:{x:c,y:l},score:l+r+g+(Math.random()-0.5)*3.4})}a.sort((l,c)=>l.score-c.score);for(let l of a)yield l.point;break}case"HUMAN_WOBBLE_DRIFT":{let a=[],s=o/2,l=p/2;for(let c=0;c<p;c++)for(let r=0;r<o;r++){let g=Math.hypot(r-s,c-l)*0.25,f=Math.sin((r+1)*0.9)*1.8+Math.cos((c+1)*1.1)*1.8+Math.sin((r+c)*0.35)*1.4;a.push({point:{x:r,y:c},score:g+f+(Math.random()-0.5)*2.8})}a.sort((c,r)=>c.score-r.score);for(let c of a)yield c.point;break}case"HUMAN_GAP_RECOVERY":{let a=new Set,s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++){if(Math.random()>0.87){s.push({x:c,y:l});continue}a.add(`${c},${l}`),yield{x:c,y:l}}s.sort((l,c)=>Math.hypot(l.x-o/2,l.y-p/2)-Math.hypot(c.x-o/2,c.y-p/2));for(let l of s){let c=`${l.x},${l.y}`;if(a.has(c))continue;a.add(c),yield l}break}case"HUMAN_STAIRCASE":{let a=new Set,s=o+p-1;for(let l=0;l<s;l++){let c=Math.max(0,l-o+1),r=Math.min(p-1,l);for(let g=c;g<=r;g++){let f=l-g,u=[{x:f,y:g},{x:f+(Math.random()>0.5?1:-1),y:g},{x:f,y:g+(Math.random()>0.5?1:-1)}];for(let w of u){if(w.x<0||w.x>=o||w.y<0||w.y>=p)continue;let d=`${w.x},${w.y}`;if(a.has(d))continue;a.add(d),yield w}}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=`${c},${l}`;if(a.has(r))continue;yield{x:c,y:l}}break}case"HUMAN_EDGE_HUGGER":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.min(l,s,o-1-l,p-1-s);a.push({point:{x:l,y:s},score:c*3.5+(Math.random()-0.5)*5.5})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_BLOBS":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),r=1+Math.floor(Math.random()*4);for(let g=c-r;g<=c+r;g++)for(let f=l-r;f<=l+r;f++){if(f<0||f>=o||g<0||g>=p)continue;let u=Math.atan2(g-c,f-l),w=r+Math.sin(u*3+Math.random())*0.8;if(Math.hypot(f-l,g-c)>w)continue;let d=`${f},${g}`;if(a.has(d))continue;a.add(d),yield{x:f,y:g}}}break}case"HUMAN_BACKTRACK":{let a=new Set,s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++)s.push({x:c,y:l});s.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*2.2+(l.x-c.x)*0.04);for(let l=0;l<s.length;l++){let c=s[l],r=`${c.x},${c.y}`;if(a.has(r))continue;if(a.add(r),yield c,l>1&&Math.random()>0.74){let g=s[l-1],f=`${g.x},${g.y}`;if(!a.has(f))a.add(f),yield g}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=`${c},${l}`;if(a.has(r))continue;yield{x:c,y:l}}break}case"HUMAN_SHAKY_DIAGONAL":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.abs(l-s)*0.6,r=Math.sin(l*1.4+s*0.8)*1.8+Math.cos(s*1.1+l*0.5)*1.5;a.push({point:{x:l,y:s},score:c+r+(Math.random()-0.5)*3.2})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_LATE_FIXES":{let a=[],s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++)if(Math.random()>0.9)s.push({x:c,y:l});else a.push({x:c,y:l});a.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?l.x-c.x:0)),s.sort((l,c)=>Math.hypot(c.x-o/2,c.y-p/2)-Math.hypot(l.x-o/2,l.y-p/2)),yield*a,yield*s;break}case"DIAGONAL_BRUSH":{for(let a=0;a<o+p-1;a++){let s=a%2===0,l=[],c=Math.max(0,a-o+1),r=Math.min(p-1,a);for(let g=c;g<=r;g++){let f=a-g;if(f>=0&&f<o)l.push({x:f,y:g})}if(Math.random()>0.55)l.reverse();if(s)for(let g=l.length-1;g>=0;g--)yield l[g];else yield*l}break}case"BRUSH_STROKES":{let a=Array.from({length:p},()=>Array(o).fill(!1)),s=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(g,f)=>g>=0&&g<o&&f>=0&&f<p,c=0,r=o*p;for(let g=0;g<r*6&&c<r;g++){let f=Math.floor(Math.random()*o),u=Math.floor(Math.random()*p),w=s[Math.floor(Math.random()*s.length)],d=3+Math.floor(Math.random()*16);for(let n=0;n<d;n++){if(!l(f,u))break;if(!a[u][f])a[u][f]=!0,c++,yield{x:f,y:u};if(Math.random()>0.72)w=s[Math.floor(Math.random()*s.length)];f+=w.x,u+=w.y}}for(let g=0;g<p;g++)for(let f=0;f<o;f++)if(!a[g][f])yield{x:f,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let a=new Set,s=o*p,l=Math.floor(o/2),c=Math.floor(p/2),r=[[1,0],[0,1],[-1,0],[0,-1]],g=0,f=1,u=(d,n)=>d>=0&&d<o&&n>=0&&n<p,w=function*(){let d=0;while(d<s){for(let n=0;n<2;n++){for(let i=0;i<f;i++){if(u(l,c)){let m=`${l},${c}`;if(!a.has(m)){if(a.add(m),yield{x:l,y:c},d++,d>=s)return}}l+=r[g][0],c+=r[g][1]}g=(g+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*w();else{let d=[...w()];for(let n=d.length-1;n>=0;n--)yield d[n]}break}case"SCRIBBLE":{let a=new Set,s=o*p,l=Math.floor(o/2),c=Math.floor(p/2);for(let r=0;a.size<s&&r<s*24;r++){let g=`${l},${c}`;if(!a.has(g))a.add(g),yield{x:l,y:c};if(l+=Math.floor(Math.random()*3)-1,c+=Math.floor(Math.random()*3)-1,l<0||l>=o||c<0||c>=p)l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p)}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(a.has(f))continue;a.add(f),yield{x:g,y:r}}break}case"CROSSHATCH":{let a=[];for(let c=0;c<o+p-1;c++)for(let r=Math.max(0,c-o+1);r<=Math.min(p-1,c);r++){let g=c-r;a.push({x:g,y:r})}let s=[];for(let c=-p+1;c<o;c++)for(let r=0;r<p;r++){let g=r+c;if(g>=0&&g<o)s.push({x:g,y:r})}let l=new Set;for(let c of[...a,...s]){let r=`${c.x},${c.y}`;if(l.has(r))continue;l.add(r),yield c}break}case"WAVE_SWEEP":{let a=new Set;for(let s=0;s<o;s++){let c=(Math.sin(s/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let r=0;r<p;r++){let g=c+r,f=c-r;for(let u of[g,f]){if(u<0||u>=p)continue;let w=`${s},${u}`;if(a.has(w))continue;a.add(w),yield{x:s,y:u}}}}break}case"SCATTERED_LINES":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*14;l++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p),g=Math.random()*Math.PI*2,f=Math.round(Math.cos(g)),u=Math.round(Math.sin(g)),w=6+Math.floor(Math.random()*28);for(let d=0;d<w;d++){if(c<0||c>=o||r<0||r>=p)break;let n=`${c},${r}`;if(!a.has(n))a.add(n),yield{x:c,y:r};c+=f,r+=u}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=`${c},${l}`;if(a.has(r))continue;a.add(r),yield{x:c,y:l}}break}case"CONTOUR_JITTER":{let a=new Set;for(let s=0;s<Math.ceil(Math.min(o,p)/2);s++){let l=[],c=s,r=s,g=o-s-1,f=p-s-1;for(let u=c;u<=g;u++)l.push({x:u,y:r});for(let u=r+1;u<=f;u++)l.push({x:g,y:u});for(let u=g-1;u>=c;u--)l.push({x:u,y:f});for(let u=f-1;u>r;u--)l.push({x:c,y:u});for(let u=l.length-1;u>0;u--){let w=Math.floor(Math.random()*(u+1)),d=l[u];l[u]=l[w],l[w]=d}for(let u of l){let w=`${u.x},${u.y}`;if(a.has(w))continue;a.add(w),yield u}}break}case"SPIRAL_WOBBLE":{let a=new Set,s=o/2,l=p/2,c=Math.hypot(s,l);for(let r=0;a.size<o*p&&r<o*p*9;r++){let g=r/(o*p*9)*c,f=r*0.31+Math.sin(r*0.07)*0.7,u=Math.round(s+Math.cos(f)*g),w=Math.round(l+Math.sin(f)*g);if(u<0||u>=o||w<0||w>=p)continue;let d=`${u},${w}`;if(a.has(d))continue;a.add(d),yield{x:u,y:w}}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(a.has(f))continue;yield{x:g,y:r}}break}case"CLUSTER_BURSTS":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*12;l++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p),g=2+Math.floor(Math.random()*10);for(let f=r-g;f<=r+g;f++)for(let u=c-g;u<=c+g;u++){if(u<0||u>=o||f<0||f>=p)continue;if(Math.hypot(u-c,f-r)>g)continue;let w=`${u},${f}`;if(a.has(w))continue;a.add(w),yield{x:u,y:f}}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=`${c},${l}`;if(a.has(r))continue;a.add(r),yield{x:c,y:l}}break}case"ORBITAL":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.ceil(Math.max(s,l));for(let r=0;r<=c;r++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,r)*2));for(let f=0;f<g;f++){let u=f/g*Math.PI*2+(r%2?0.3:-0.3),w=Math.round(s+Math.cos(u)*r),d=Math.round(l+Math.sin(u)*r);if(w<0||w>=o||d<0||d>=p)continue;let n=`${w},${d}`;if(a.has(n))continue;a.add(n),yield{x:w,y:d}}}for(let r=0;r<p;r++)for(let g=0;g<o;g++){let f=`${g},${r}`;if(a.has(f))continue;yield{x:g,y:r}}break}case"FLOW_FIELD":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*18;l++){let c=Math.floor(Math.random()*o),r=Math.floor(Math.random()*p);for(let g=0;g<120;g++){if(c<0||c>=o||r<0||r>=p)break;let f=`${c},${r}`;if(!a.has(f))a.add(f),yield{x:c,y:r};let u=Math.sin(c*0.09)*1.8+Math.cos(r*0.08)*1.6+Math.sin((c+r)*0.05);c+=Math.round(Math.cos(u)),r+=Math.round(Math.sin(u))}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let r=`${c},${l}`;if(a.has(r))continue;a.add(r),yield{x:c,y:l}}break}case"EDGE_IN":{let a=new Set,s=Math.ceil(Math.min(o,p)/2);for(let l=0;l<s;l++){let c=l,r=o-1-l,g=l,f=p-1-l;for(let u=c;u<=r;u++)for(let w of[g,f]){let d=`${u},${w}`;if(a.has(d))continue;a.add(d),yield{x:u,y:w}}for(let u=g+1;u<=f-1;u++)for(let w of[c,r]){let d=`${w},${u}`;if(a.has(d))continue;a.add(d),yield{x:w,y:u}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),h(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),a=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=a+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-a)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,a+this.moveInfo.height);this.update(),h(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${O}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Po=`/* stylelint-disable declaration-no-important */
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class go extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var J={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0},startAutoFarm:{key:"f",shift:!0}};function F(o,p){let a=p.key.toLowerCase(),s=o.key.toLowerCase(),c=a==="/"&&(s==="/"||s==="?"||o.code==="Slash")||s===a,r=p.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,g=p.ctrl===!0?!0:p.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(p.shift)&&r&&g&&o.altKey===Boolean(p.alt)}function ho(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var ko=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var No="kglacer-macro:overlay-hidden",Jo="kglacer-macro:auto-farm-config",To="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class fo extends X{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$autofarmConfig;$autofarmStatus;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;autoFarmIntervalId;autoFarmConfig;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=ko,D(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$autofarmConfig:".autofarm-config",$autofarmStatus:".autofarm-status",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=To,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$autofarmConfig.addEventListener("click",()=>{this.openAutoFarmModal()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=_(),this.$locale.addEventListener("change",()=>{oo(this.$locale.value),D(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText(),this.refreshAutoFarmStatusText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.loadAutoFarmConfigFromStorage(),this.refreshAutoFarmStatusText(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(b("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${O}`,o.click(),await q(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new go(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let a;if(p.name.endsWith(`.${O}`))a=await j.fromJSON(this.bot,JSON.parse(await p.text()));else{let s=new FileReader;s.readAsDataURL(p),await q(s,["load"],["error"]);let l=await this.compressImageBeforeLoad(s.result),c=new Image;c.src=l,await q(c,["load"],["error"]),await this.waitForStableViewportProjection(),a=new j(this.bot,k.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new W(this.bot,c))}this.bot.images.push(a),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),a.updateTasks(),h(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(b("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:p,minGlobalY:a,maxGlobalX:s,maxGlobalY:l}=o,c=document.createElement("canvas");c.width=Math.max(1,s-p+1),c.height=Math.max(1,l-a+1);let r=c.getContext("2d");if(!r)throw new Error("Capture context unavailable");r.imageSmoothingEnabled=!1;let g=Math.floor(p/t),f=Math.floor(a/t),u=Math.floor(s/t),w=Math.floor(l/t),d=(u-g+1)*(w-f+1),n=0;for(let m=g;m<=u;m++)for(let H=f;H<=w;H++){this.status=`⌛ ${b("taskReadingTiles")} [${++n}/${d}]`;let z=await this.loadTileImage(m,H),M=m*t,A=H*t,P=Math.max(p,M),N=Math.min(s,M+t-1),U=Math.max(a,A),Z=Math.min(l,A+t-1),T=P-M,I=U-A,Y=N-P+1,Q=Z-U+1,v=P-p,x=U-a;r.drawImage(z,T,I,Y,Q,v,x,Y,Q)}let i=Date.now();await this.downloadCapture(c,"png",i)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,p,a){let s=p==="webp"?"image/webp":"image/png",l=await new Promise((g,f)=>{o.toBlob((u)=>{if(!u){f(new Error(`Failed to create ${p.toUpperCase()} capture file`));return}g(u)},s)}),c=URL.createObjectURL(l),r=document.createElement("a");r.href=c,r.download=`wplace-capture-${a}.${p}`,r.click(),URL.revokeObjectURL(c)}async loadTileImage(o,p){let a;for(let s=1;s<=3;s++)try{let l=new Image;return l.crossOrigin="anonymous",l.referrerPolicy="no-referrer",l.src=`https://backend.wplace.live/files/s0/tiles/${o}/${p}.png?ts=${Date.now()}-${s}`,await q(l,["load"],["error"]),l}catch(l){if(a=l,s<3)await new Promise((c)=>setTimeout(c,s*200))}throw a instanceof Error?a:new Error(`Tile fetch failed (${o}/${p})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,p)=>{let a=document.createElement("div");a.className="kgm-capture-overlay",a.innerHTML=`<div class="kgm-capture-hint">${b("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let s=a.querySelector(".kgm-capture-box");document.body.append(a);let l,c,r=()=>{window.removeEventListener("keydown",d,!0),a.removeEventListener("pointermove",u),a.removeEventListener("pointerdown",w),a.remove()},g=(n)=>{let i=Math.min(l.x,n.x),m=Math.min(l.y,n.y),H=Math.abs(l.x-n.x)+1,z=Math.abs(l.y-n.y)+1;return{left:i,top:m,width:H,height:z}},f=(n)=>{let{left:i,top:m,width:H,height:z}=g(n);s.style.left=`${i}px`,s.style.top=`${m}px`,s.style.width=`${H}px`,s.style.height=`${z}px`},u=(n)=>{if(!l)return;f({x:n.clientX,y:n.clientY})},w=(n)=>{if(n.preventDefault(),!l){l={x:n.clientX,y:n.clientY};let P=k.fromScreenPosition(this.bot,l);c={x:P.globalX,y:P.globalY},f(l);return}let i={x:n.clientX,y:n.clientY},m=k.fromScreenPosition(this.bot,i);if(r(),!c){p(new Error("Capture anchor point unavailable"));return}let H=Math.min(c.x,m.globalX),z=Math.min(c.y,m.globalY),M=Math.max(c.x,m.globalX),A=Math.max(c.y,m.globalY);if(M-H<1||A-z<1){p(new Error("Capture area too small"));return}o({minGlobalX:H,minGlobalY:z,maxGlobalX:M,maxGlobalY:A})},d=(n)=>{if(n.key!=="Escape")return;r(),p(new Error("Capture cancelled"))};window.addEventListener("keydown",d,!0),a.addEventListener("pointermove",u),a.addEventListener("pointerdown",w)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await q(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let s=document.createElement("canvas");s.width=p.naturalWidth,s.height=p.naturalHeight;let l=s.getContext("2d");if(!l)return o;return l.drawImage(p,0,0),s.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),p=0,a;for(let s=0;s<45;s++){await new Promise((u)=>requestAnimationFrame(()=>{u()}));let{anchorScreenPosition:{x:l,y:c},pixelSize:r}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(r)||r<=0){p=0;continue}let g={anchorX:l,anchorY:c,pixelSize:r};if(!a){a=g,p=1;continue}if(Math.abs(g.anchorX-a.anchorX)+Math.abs(g.anchorY-a.anchorY)+Math.abs(g.pixelSize-a.pixelSize)<0.0012)p++;else p=0;if(a=g,p>=3)return}}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let c=0;c<this.bot.images.length;c++){let r=this.bot.images[c];o+=r.pixels.pixels.length*r.pixels.pixels[0].length,p+=r.tasks.length}let a=Math.max(0,o-p),s=o>0?a/o*100|0:0;this.$progressText.textContent=`${a}/${o} ${s}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${s/100})`,this.$images.innerHTML="";let l=document.createDocumentFragment();for(let c=0;c<this.bot.images.length;c++){let r=this.bot.images[c],g=document.createElement("div");l.append(g),g.className="image",g.innerHTML=`<button class="preview" title="View preview">
  <img src="${r.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${c===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${c===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,g.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=c,r.openPreviewPanel()}),g.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=c,r.openColorPanel()}),g.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=c,r.openPreviewPanel()}),g.querySelector(".download").addEventListener("click",()=>{r.exportImage()}),g.querySelector(".delete").addEventListener("click",()=>{r.destroy()}),g.querySelector(".up").addEventListener("click",()=>{so(this.bot.images,c,c-1),this.update(),h(this.bot)}),g.querySelector(".down").addEventListener("click",()=>{so(this.bot.images,c,c+1),this.update(),h(this.bot)})}this.$images.append(l)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(No)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(No,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${b("toggleOverlay")} (${b("disabled")})`:`${b("toggleOverlay")} (${b("enabled")})`}refreshAutoFarmStatusText(){if(!this.autoFarmConfig){this.$autofarmStatus.textContent=b("autoFarmNeedsConfig");return}this.$autofarmStatus.textContent=this.autoFarmIntervalId?`${b("autoFarmRunning")} (${this.formatAutoFarmDelay(this.autoFarmConfig.timerMs)})`:b("autoFarmStopped")}formatAutoFarmDelay(o){if(o%3600000===0)return`${o/3600000}h`;if(o%60000===0)return`${o/60000}m`;return`${o/1000}s`}stopAutoFarm(){if(!this.autoFarmIntervalId)return;clearInterval(this.autoFarmIntervalId),this.autoFarmIntervalId=void 0,this.refreshAutoFarmStatusText()}startAutoFarm(){if(!this.autoFarmConfig){this.status=`⚠️ ${b("autoFarmNeedsConfig")}`,this.refreshAutoFarmStatusText();return}this.stopAutoFarm(),this.autoFarmIntervalId=window.setInterval(()=>{this.bot.paintRandomPixelInViewport()},this.autoFarmConfig.timerMs),this.refreshAutoFarmStatusText()}saveAutoFarmConfig(o){this.autoFarmConfig=o,localStorage.setItem(Jo,JSON.stringify(o))}loadAutoFarmConfigFromStorage(){let o=localStorage.getItem(Jo);if(!o)return;try{let p=JSON.parse(o);if(typeof p.value!=="number"||!Number.isFinite(p.value)||p.value<1)return;let a=p.unit==="hours"||p.unit==="minutes"||p.unit==="seconds"?p.unit:"minutes",s=typeof p.timerMs==="number"&&p.timerMs>0?p.timerMs:a==="hours"?p.value*3600000:a==="minutes"?p.value*60000:p.value*1000;this.autoFarmConfig={value:Math.max(1,Math.floor(p.value)),unit:a,timerMs:s}}catch{return}}openAutoFarmModal(){let o=document.createElement("dialog");o.className="kgm-modal autofarm-dialog";let p=this.autoFarmConfig?.unit??"minutes",a=this.autoFarmConfig?.value??1;o.innerHTML=`<form method="dialog" class="autofarm-form">
  <div class="kgm-modal-head">
    <strong data-i18n="autoFarmModalTitle">Auto farm</strong>
    <button type="button" class="modal-close" aria-label="${b("close")}"><span class="icon">×</span></button>
  </div>
  <p class="autofarm-help" data-i18n="autoFarmHelp">Paint a random pixel each timer cycle.</p>
  <label class="autofarm-label">
    <span data-i18n="autoFarmTimer">Timer</span>
    <div class="autofarm-fields">
      <input class="autofarm-value" type="number" min="1" step="1" value="${a}" />
      <select class="autofarm-unit">
        <option value="seconds" data-i18n="seconds">Seconds</option>
        <option value="minutes" selected data-i18n="minutes">Minutes</option>
        <option value="hours" data-i18n="hours">Hours</option>
      </select>
    </div>
  </label>
  <div class="autofarm-actions">
    <button type="button" class="autofarm-start" data-i18n="autoFarmStart">Start</button>
    <button type="button" class="autofarm-stop" data-i18n="autoFarmStop">Stop</button>
  </div>
</form>`,document.body.append(o),D(o);let s=o.querySelector(".autofarm-unit");s.value=p;let l=o.querySelector(".autofarm-value"),c=()=>{let r=Math.max(1,Number.parseInt(l.value||"1",10));if(s.value==="hours")return r*3600000;if(s.value==="minutes")return r*60000;return r*1000};o.querySelector(".autofarm-start").onclick=()=>{this.saveAutoFarmConfig({value:Math.max(1,Number.parseInt(l.value||"1",10)),unit:s.value,timerMs:c()}),this.startAutoFarm(),o.close(),o.remove()},o.querySelector(".autofarm-stop").onclick=()=>{this.stopAutoFarm(),o.close(),o.remove()},o.querySelector(".modal-close").onclick=()=>{o.close(),o.remove()},o.addEventListener("close",()=>{o.remove()}),o.showModal()}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,a,s="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${s} ${o}`;try{let c=await p();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),c}catch(c){if(!(c instanceof ao))console.error(c),this.status=`${b("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:c}),c}finally{await a?.()}}handleKeyboard(o){if(ho(o.target))return;if(F(o,J.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(F(o,J.showShortcuts)){o.preventDefault(),this.open=!0,this.$shortcuts.open=!0,this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(F(o,J.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(F(o,J.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(F(o,J.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(F(o,J.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(F(o,J.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(F(o,J.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(F(o,J.startAutoFarm)){o.preventDefault(),this.startAutoFarm();return}if(F(o,J.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(F(o,J.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),h(this.bot)}async waitAndClickPaintButton(){await this.run(b("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){this.triggerNativePaintClick(o);return}await new Promise((p)=>setTimeout(p,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((a)=>Array.from(document.querySelectorAll(a))).find((a)=>/pintar|paint/i.test(a.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}}var Yo=2,Fo="[KGM]",Uo="kglacer-macro:access-ok",uo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Do="kgm-access-locked";class Qo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${Fo} ${o}`);else console.log(`${Fo} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Do);let o=to();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let a=0;a<o.images.length;a++){let s=o.images[a];$({x:s.position[0]-1000,y:s.position[1]-1000}),$({x:s.position[0]+1000,y:s.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=Po.replace("FAKE_FAVORITE_LOCATIONS",E.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:E.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Do),this._widget=new fo(this),await this.widget.run(b("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let a=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((s)=>{for(let l=0;l<s.length;l++)if(s[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(a,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await K(500),await this.updateColors(),o)for(let s=0;s<o.images.length;s++){let l=await j.fromJSON(this,o.images[s]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Uo)===uo)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),D(p);let a=p.querySelector(".access-input"),s=p.querySelector(".access-error"),l=p.querySelector(".access-locale");l.innerHTML=io().map((c)=>`<option value="${c}" ${c===_()?"selected":""}>${c.toUpperCase()}</option>`).join(""),l.addEventListener("change",()=>{oo(l.value),D(p)}),p.addEventListener("cancel",(c)=>{c.preventDefault()}),p.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault();let r=atob(uo);if(a.value.trim()!==r){s.textContent=b("invalidAccessKey");return}localStorage.setItem(Uo,uo),p.close(),p.remove(),o()}),p.showModal(),a.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(a)=>{if(!a.shiftKey)a.stopPropagation()};return this.widget.run(b("taskDrawing"),async()=>{await this.widget.run(b("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let a=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),s=Math.floor(a.charges.count);this.log("Charges fetched",{charges:s});let l=0;for(let c=0;c<this.images.length;c++)l+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(s>0){let c=!0;for(let r=0;r<this.images.length;r++){let g=this.images[r].tasks.shift();if(!g)continue;this.drawTask(g),s--,await K(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<l&&s>0;c++){let r=1,g;for(let f=0;f<this.images.length;f++){let u=this.images[f],w=1-u.tasks.length/(u.pixels.pixels.length*u.pixels.pixels[0].length);if(w<r)r=w,g=u}this.drawTask(g.tasks.shift()),s--,await K(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let r=this.images[c];for(let g=r.tasks.shift();g&&s>0;g=r.tasks.shift())this.drawTask(g),s--,await K(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:s})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:Yo,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),a=window.innerWidth/2,s=window.innerHeight/2,l=a-o.x,c=s-o.y;function r(g,f,u){p.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:f,clientY:u,buttons:1}))}r("mousedown",a,s),r("mousemove",l,c),r("mouseup",l,c)}readMap(){this.mapsCache.clear();let o=new Set;for(let a=0;a<this.images.length;a++){let s=this.images[a],{tileX:l,tileY:c}=new k(this,s.position.globalX+s.pixels.pixels[0].length,s.position.globalY+s.pixels.pixels.length);for(let r=s.position.tileX;r<=l;r++)for(let g=s.position.tileY;g<=c;g++)o.add(`${r}/${g}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${b("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(a)=>{this.mapsCache.set(a,await W.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${a}.png`,exactColor:!0})),this.widget.status=`⌛ ${b("taskReadingMap")} [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,a=1,s=1/0,l=1/0;for(let g=0;g<this.$stars.length;g++){let{x:f,y:u}=B(this.$stars[g]);if(f<o.x&&u<o.y){let w=o.x-f+(o.y-u);if(w<s)s=w,p=g}else if(f>o.x&&u>o.y){let w=f-o.x+(u-o.y);if(w<l)l=w,a=g}}let c=B(this.$stars[p]),r=G[p];return{anchorScreenPosition:c,anchorWorldPosition:r,pixelSize:(B(this.$stars[a]).x-c.x)/(G[a].x-r.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await K(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await K(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await K(1)}drawTask(o){if(this.lastColor!==o.color){let s=document.getElementById("color-"+o.color);if(!s){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}s.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let p=o.position.pixelSize/2,a=o.position.toScreenPosition();if(!Number.isFinite(a.x)||!Number.isFinite(a.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:a.x+p,clientY:a.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}async paintRandomPixelInViewport(){try{await this.updateColors();let o=Array.from(document.querySelectorAll('button[id^="color-"]')).filter((n)=>!n.disabled&&n.getAttribute("aria-disabled")!=="true"&&n.offsetParent!==null);if(!o.length)return;let p=o[Math.floor(Math.random()*o.length)],a=Number.parseInt(p.id.slice(6),10);if(!Number.isFinite(a))return;let s=document.querySelector(".maplibregl-canvas");if(!s)return;let l=s.getBoundingClientRect(),c=24,r=l.left+c,g=l.right-c,f=l.top+c,u=l.bottom-c;if(g<=r||u<=f)return;let w=r+Math.random()*(g-r),d=f+Math.random()*(u-f);this.drawTask({color:a,position:k.fromScreenPosition(this,{x:w,y:d})})}catch(o){this.log("Auto farm tick failed",o)}}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(a,s)=>{let l=await o(a,s),c=l.clone(),r="";if(typeof a=="string")r=a;else if(a instanceof Request)r=a.url;else if(a instanceof URL)r=a.href;if(l.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...E),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let g=p.exec(r);if(g){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new k(this,+g[1],+g[2],+g[3],+g[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await K(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`${b("taskWaitingFor")} ${o}`,()=>{return new Promise((a)=>{let s=document.querySelector(p);if(s){a(s);return}let l=new MutationObserver(()=>{let c=document.querySelector(p);if(c)l.disconnect(),a(c)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,E.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new Qo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
