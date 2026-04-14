// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.19
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
function po(o,s,a){let p=o[a];return o[a]=o[s],o[s]=p,o}function so(o,s){let a=o.indexOf(s);if(a!==-1)o.splice(a,1);return a}var aa=Math.floor(Math.random()*65536),la=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function G(o){return new Promise((s)=>setTimeout(s,o))}function W(o,s,a=["error"],p="addEventListener"){return new Promise((l,c)=>{for(let g=0;g<s.length;g++)o[p]?.(s[g],l);for(let g=0;g<a.length;g++)o[p]?.(a[g],c)})}class Zo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,s=15000){this.size=o,this.historyTime=s}push(o){if(o<0)throw new Error("Negative chunk size");let{time:s,historyTime:a}=this.getTime();if(this.history.push({time:s,chunk:o}),this.history[0]&&this.history[0].time+a<s)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((s,a)=>s+a.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),s=o-this.startTime,a=Math.min(s,this.historyTime);return{time:o,historyTime:a}}}var no=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",drawAndPaint:"Draw + Paint",generalSection:"General",actionsSection:"Actions",strategySection:"Draw strategy",imagesSection:"Images",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",drawAndPaint:"Dibujar + Pintar",generalSection:"General",actionsSection:"Acciones",strategySection:"Estrategia de pintado",imagesSection:"Imágenes",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",captureHintSelectArea:"Selecciona área"}};function Ro(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function X(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let s=0;s<no.length;s++){let a=localStorage.getItem(no[s]);if(!a||!(a in y))continue;return localStorage.setItem("kglacer-macro:locale",a),a}return Ro()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function mo(){return Object.keys(y)}function b(o){let s=X();return y[s][o]}function F(o){for(let s of o.querySelectorAll("[data-i18n]"))s.textContent=b(s.dataset.i18n);for(let s of o.querySelectorAll("[data-i18n-title]"))s.setAttribute("title",b(s.dataset.i18nTitle));for(let s of o.querySelectorAll("[data-i18n-aria-label]"))s.setAttribute("aria-label",b(s.dataset.i18nAriaLabel));for(let s of o.querySelectorAll("[data-i18n-placeholder]"))s.setAttribute("placeholder",b(s.dataset.i18nPlaceholder))}class O{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,s){for(let a in s)this[a]=o.querySelector(s[a])}registerEvent(o,s,a,p={}){p.passive??=!0,o.addEventListener(s,a,p),this.runOnDestroy.push(()=>{o.removeEventListener(s,a)})}}function co(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function io(o,s,a){let p=co(o/255),l=co(s/255),c=co(a/255),g=Math.cbrt(0.4122214708*p+0.5363325363*l+0.0514459929*c),f=Math.cbrt(0.2119034982*p+0.6806995451*l+0.1073969566*c),r=Math.cbrt(0.0883024619*p+0.2817188376*l+0.6299787005*c),w=0.2104542553*g+0.793617785*f-0.0040720468*r,u=1.9779984951*g-2.428592205*f+0.4505937099*r,d=0.0259040371*g+0.7827717662*f-0.808675766*r;return[w,u,d]}function zo(o,s,a){let[p,l,c]=o,[g,f,r]=s,w=(lo)=>lo*180/Math.PI,u=(lo)=>lo*Math.PI/180,d=1,n=1,m=1,i=Math.sqrt(l**2+c**2),H=Math.sqrt(f**2+r**2),z=(i+H)/2,M=0.5*(1-Math.sqrt(z**7/(z**7+6103515625))),A=l*(1+M),J=f*(1+M),U=Math.sqrt(A**2+c**2),D=Math.sqrt(J**2+r**2),B=c===0&&A===0?0:w(Math.atan2(c,A))%360,T=r===0&&J===0?0:w(Math.atan2(r,J))%360,I=g-p,_=D-U,h=0;if(U*D!==0){if(h=T-B,h>180)h-=360;else if(h<-180)h+=360}let v=2*Math.sqrt(U*D)*Math.sin(u(h)/2),x=(p+g)/2,e=(U+D)/2,C=(B+T)/2;if(Math.abs(B-T)>180)C+=180;let Go=1-0.17*Math.cos(u(C-30))+0.24*Math.cos(u(2*C))+0.32*Math.cos(u(3*C+6))-0.2*Math.cos(u(4*C-63)),Fo=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),uo=1+0.045*e,bo=1+0.015*e*Go,jo=30*Math.exp((-((C-275)/25))**2),qo=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(u(2*jo));return Math.sqrt((I/(1*Fo))**2+(_/(1*uo))**2+(v/(1*bo))**2+qo*(_/(1*uo))*(v/(1*bo)))-I*a}var L=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],Z=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function go(o){if(o===0)return"transparent";let s=L[o],a=`oklab(${s[0]*100}% ${s[1]} ${s[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",a))return a;let[p=0,l=0,c=0]=(Z[o]??"0,0,0").split(",").map((g)=>Number.parseInt(g,10));return`rgb(${p} ${l} ${c})`}var Ao=`<div class="wtopbar">
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
`;class R{bot;image;width;exactColor;static async fromJSON(o,s){let a=new Image;return a.src=s.url.startsWith("http")?await fetch(s.url,{cache:"no-store"}).then((p)=>p.blob()).then((p)=>URL.createObjectURL(p)):s.url,await W(a,["load"],["error"]),new R(o,a,s.width,s.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,s,a=s.naturalWidth,p=!1){this.bot=o;this.image=s;this.width=a;this.exactColor=p;if(p)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let a=1;a<64;a++)if(this.exactColor||!this.bot.unavailableColors.has(a))o.set(Z[a],[a,a]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let s=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let a=0;a<this.canvas.height;a++)for(let p=0;p<this.canvas.width;p++){let l=(a*this.canvas.width+p)*4,c=s[l],g=s[l+1],f=s[l+2],r=s[l+3],w=c,u=g,d=f,n=`${w},${u},${d}`;if(this.exactColor){this.pixels[a][p]=r<100?0:Z.indexOf(n);continue}let m,i;if(r<100)m=i=0;else if(o.has(n))[m,i]=o.get(n);else{let z=1/0,M=1/0;for(let A=0;A<L.length;A++){let J=L[A],U=zo(io(w,u,d),J,0);if(!this.bot.unavailableColors.has(A)&&U<z)z=U,m=A;if(U<M)M=U,i=A}o.set(n,[m,i])}if(m!==0)this.context.fillStyle=`oklab(${L[m][0]*100}% ${L[m][1]} ${L[m][2]})`,this.context.fillRect(p,a,1,1);this.pixels[a][p]=m;let H=this.colors.get(i);if(H)H.amount++;else this.colors.set(i,{color:m,amount:1,realColor:i})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,exactColor:this.exactColor}}}var S="kglacer-macro-settings",Ho=["kglacermacro","wbot"],$="kgm";function Lo(){let o=[S,...Ho];for(let s=0;s<o.length;s++){let a=o[s],p=localStorage.getItem(a);if(!p)continue;return{json:p,key:a}}return}function Po(){let o=Lo();if(!o)return;let s;try{if(s=JSON.parse(o.json),typeof s!=="object")throw new Error("NOT VALID SAVE");if(s.version===1){let a=s;s.images=a.widget.images,s.strategy=a.widget.strategy,delete a.widget}if(o.key!==S)localStorage.setItem(S,o.json)}catch{localStorage.removeItem(o.key),s=void 0}return s}var Mo;function N(o,s=!1){if(clearTimeout(Mo),s)localStorage.setItem(S,JSON.stringify(o));else Mo=setTimeout(()=>{localStorage.setItem(S,JSON.stringify(o))},600)}var P=1000,Vo=2048,E=P*Vo,j=[],Y=[],Co=Date.now();function t(o){j.push(o),Y.push({id:Co++,latitude:(2*Math.atan(Math.exp(-(o.y/E*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/E*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}t({x:E/3|0,y:E/3|0});t({x:E/3*2|0,y:E/3*2|0});function V(o){let[s,a]=o.style.transform.slice(32,-31).split(", ").map((p)=>Number.parseFloat(p));return{x:s,y:a}}class k{bot;static fromJSON(o,s){return new k(o,...s)}static fromScreenPosition(o,s){let{anchorScreenPosition:a,pixelSize:p,anchorWorldPosition:l}=o.findAnchorsForScreen(s);return new k(o,l.x+(s.x-a.x)/p|0,l.y+(s.y-a.y)/p|0)}globalX=0;globalY=0;get tileX(){return this.globalX/P|0}set tileX(o){this.globalX=o*P+this.x}get tileY(){return this.globalY/P|0}set tileY(o){this.globalY=o*P+this.y}get x(){return this.globalX%P}set x(o){this.globalX=this.tileX*P+o}get y(){return this.globalY%P}set y(o){this.globalY=this.tileY*P+o}anchor1Index;anchor2Index;get pixelSize(){return(V(this.bot.$stars[this.anchor2Index]).x-V(this.bot.$stars[this.anchor1Index]).x)/(j[this.anchor2Index].x-j[this.anchor1Index].x)}constructor(o,s,a,p,l){this.bot=o;if(p===void 0||l===void 0)this.globalX=s,this.globalY=a;else this.globalX=s*P+p,this.globalY=a*P+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,s=1/0;for(let a=0;a<j.length;a++){let{x:p,y:l}=j[a];if(p<this.globalX&&l<this.globalY){let c=this.globalX-p+(this.globalY-l);if(c<o)o=c,this.anchor1Index=a}else if(p>this.globalX&&l>this.globalY){let c=p-this.globalX+(l-this.globalY);if(c<s)s=c,this.anchor2Index=a}}}toScreenPosition(){let o=j[this.anchor1Index],s=V(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+s.x,y:(this.globalY-o.y)*this.pixelSize+s.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:s}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:s-window.innerHeight/3})}clone(){return new k(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class q extends O{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static PREVIEW_MASK_BASE_WIDTH=96;static PREVIEW_MASK_BASE_HEIGHT=96;static async fromJSON(o,s){return new q(o,k.fromJSON(o,s.position),await R.fromJSON(o,s.pixels),s.strategy,s.opacity,s.drawTransparentPixels,s.drawColorsInOrder,s.colors,s.lock)}element=document.createElement("div");tasks=[];moveInfo;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,s,a,p="SPIRAL_FROM_CENTER",l=50,c=!1,g=!1,f=[],r=!1){super();this.bot=o;this.position=s;this.pixels=a;this.strategy=p;this.opacity=l;this.drawTransparentPixels=c;this.drawColorsInOrder=g;this.colors=f;this.lock=r;this.element.innerHTML=Ao,this.element.classList.add("wimage"),F(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();N(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),N(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%"),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),N(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,N(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,N(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),N(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(w)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(w.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(w)=>{if(w.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let w of this.element.querySelectorAll(".resize"))this.registerEvent(w,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),s=new Set,a=new Map;for(let p=0;p<this.colors.length;p++){let l=this.colors[p];if(l.disabled)s.add(l.realColor);a.set(l.realColor,p)}for(let{x:p,y:l}of this.strategyPositionIterator()){let c=this.pixels.pixels[l][p];if(s.has(c))continue;o.globalX=this.position.globalX+p,o.globalY=this.position.globalY+l;let g=o.getMapColor();if(c!==g&&(this.drawTransparentPixels||c!==0))this.tasks.push({position:o.clone(),color:c})}if(this.drawColorsInOrder)this.tasks.sort((p,l)=>(a.get(p.color)??0)-(a.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:s}=this.position.toScreenPosition(),a=this.position.pixelSize*this.pixels.width,p=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${s.toFixed(3)}px, 0)`,this.element.style.width=`${a}px`,this.element.style.height=`${p}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,c=Math.max(0,l-this.tasks.length),g=l>0?c/l*100|0:0;this.$progressText.textContent=`${c}/${l} ${g}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${g/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let f of this.element.querySelectorAll(".resize"))f.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),so(this.bot.images,this),this.bot.widget.update(),N(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let a=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-a.left,offsetY:o.clientY-a.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let s=this.$colorsDialog.getBoundingClientRect(),a=Math.max(8,window.innerWidth-s.width-8),p=Math.max(8,window.innerHeight-s.height-8),l=Math.min(a,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),c=Math.min(p,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(c)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let s=document.createDocumentFragment(),a=document.createElement("article");a.className="preview-card";let p=document.createElement("strong");p.textContent=this.getStrategyLabel(o);let l=document.createElement("canvas");l.className="preview-canvas",l.width=156,l.height=156,this.paintStrategyPreview(l,o),a.append(p,l),s.append(a),this.$previewDialogList.append(s)}invalidatePreviewCacheIfNeeded(){let o=this.colors.map((a,p)=>`${p}:${a.realColor}:${a.disabled?1:0}`).join("|"),s=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}:${this.drawColorsInOrder?1:0}:${o}`;if(this.previewCacheSignature===s)return;this.previewCacheSignature=s,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return b("random");case"HUMANIZED":return b("humanized");case"HUMAN_SOFT_DITHER":return b("humanSoftDither");case"HUMAN_PATCHY":return b("humanPatchy");case"HUMAN_SWEEP_ARCS":return b("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return b("humanMicroCorrections");case"HUMAN_JITTER_FILL":return b("humanJitterFill");case"HUMAN_CORNER_BIAS":return b("humanCornerBias");case"HUMAN_LONG_STROKES":return b("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return b("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return b("humanMessySpiral");case"HUMAN_DRUNK_WALK":return b("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return b("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return b("humanPatchJump");case"HUMAN_HESITANT_LINES":return b("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return b("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return b("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return b("humanGapRecovery");case"HUMAN_STAIRCASE":return b("humanStaircase");case"HUMAN_EDGE_HUGGER":return b("humanEdgeHugger");case"HUMAN_BLOBS":return b("humanBlobs");case"HUMAN_BACKTRACK":return b("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return b("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return b("humanLateFixes");case"ZIGZAG":return b("zigzag");case"BRUSH_STROKES":return b("brushStrokes");case"DIAGONAL_BRUSH":return b("diagonalBrush");case"DOWN":return b("down");case"UP":return b("up");case"LEFT":return b("left");case"RIGHT":return b("right");case"SPIRAL_FROM_CENTER":return b("spiralOut");case"SPIRAL_TO_CENTER":return b("spiralIn");case"SCRIBBLE":return b("scribble");case"CROSSHATCH":return b("crosshatch");case"WAVE_SWEEP":return b("waveSweep");case"SCATTERED_LINES":return b("scatteredLines");case"CONTOUR_JITTER":return b("contourJitter");case"SPIRAL_WOBBLE":return b("spiralWobble");case"CLUSTER_BURSTS":return b("clusterBursts");case"ORBITAL":return b("orbital");case"FLOW_FIELD":return b("flowField");case"EDGE_IN":return b("edgeIn");default:return o}}paintStrategyPreview(o,s){let a=o.getContext("2d");if(!a)return;a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);let p=this.getSampledImagePreviewData(),l=this.getCachedPreviewSequence(s,p.mask,p.width,p.height),c=Math.min(o.width/p.width,o.height/p.height),g=(o.width-p.width*c)/2,f=(o.height-p.height*c)/2,r=this.previewAnimations.get(o);if(r)cancelAnimationFrame(r),this.previewAnimationHandles.delete(r);let w=(z)=>{let M=requestAnimationFrame((A)=>{this.previewAnimationHandles.delete(M),z(A)});return this.previewAnimationHandles.add(M),M},u=(z)=>{a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);for(let M=0;M<Math.min(z,l.length);M++){let A=l[M],J=p.colors.get(`${A.x}:${A.y}`)??0;if(!J)continue;a.fillStyle=go(J),a.fillRect(g+A.x*c,f+A.y*c,Math.max(1,c),Math.max(1,c))}},d=Math.min(3400,Math.max(900,l.length*8)),m=d+220,i=(z,M)=>{if(!this.$previewDialog.open)return;let A=(M-z)%m,J=Math.min(1,A/d),U=J*J*(3-2*J);u(Math.floor(l.length*U));let D=w((B)=>{i(z,B)});this.previewAnimations.set(o,D)},H=performance.now();i(H,H)}getCachedPreviewSequence(o,s,a=this.pixels.width,p=this.pixels.height){let l=this.colors.map((r,w)=>`${w}:${r.realColor}:${r.disabled?1:0}`).join("|"),c=`${o}:${a}x${p}:${s.length}:${this.drawColorsInOrder?1:0}:${l}`,g=this.previewSequenceCache.get(c);if(g)return g;let f=a===this.pixels.width&&p===this.pixels.height?this.getExactPreviewSequence(o,s):this.getApproxPreviewSequence(o,s,a);if(this.drawColorsInOrder){let r=new Map;for(let w=0;w<this.colors.length;w++)r.set(this.colors[w].realColor,w);f.sort((w,u)=>(r.get(this.pixels.pixels[w.y]?.[w.x]??0)??0)-(r.get(this.pixels.pixels[u.y]?.[u.x]??0)??0))}return this.previewSequenceCache.set(c,f),f}getExactPreviewSequence(o,s){let a=this.strategy;this.strategy=o;let p=[...this.strategyPositionIterator()];this.strategy=a;let l=new Set(s.map(({x:c,y:g})=>`${c}:${g}`));return p.filter(({x:c,y:g})=>l.has(`${c}:${g}`))}getApproxPreviewSequence(o,s,a){let p=[...s],l=(f,r,w)=>{return(f*73856093+r*19349663+w*83492791>>>0)/4294967296},c=(f,r)=>p.sort((w,u)=>w.x*f+w.y*r-(u.x*f+u.y*r)||w.y-u.y||w.x-u.x),g=p.sort((f,r)=>{if(f.y!==r.y)return f.y-r.y;let w=f.y%2===0?f.x:a-f.x,u=r.y%2===0?r.x:a-r.x;return w-u});switch(o){case"UP":return c(0,-1);case"LEFT":return c(-1,0);case"RIGHT":return c(1,0);case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let f=a/2,r=Math.max(1,Math.round(p.reduce((w,u)=>w+u.y,0)/Math.max(1,p.length)));return p.sort((w,u)=>{let d=(w.x-f)**2+(w.y-r)**2,n=(u.x-f)**2+(u.y-r)**2;return o==="SPIRAL_FROM_CENTER"?d-n:n-d}),p}case"RANDOM":case"HUMANIZED":case"HUMAN_SOFT_DITHER":case"HUMAN_PATCHY":case"HUMAN_SWEEP_ARCS":case"HUMAN_MICRO_CORRECTIONS":case"HUMAN_JITTER_FILL":case"HUMAN_CORNER_BIAS":case"HUMAN_LONG_STROKES":case"HUMAN_TAP_CLUSTERS":case"HUMAN_MESSY_SPIRAL":case"HUMAN_DRUNK_WALK":case"HUMAN_NOISE_CLOUD":case"HUMAN_PATCH_JUMP":case"HUMAN_HESITANT_LINES":case"HUMAN_OVERLAP_SWEEPS":case"HUMAN_WOBBLE_DRIFT":case"HUMAN_GAP_RECOVERY":case"HUMAN_STAIRCASE":case"HUMAN_EDGE_HUGGER":case"HUMAN_BLOBS":case"HUMAN_BACKTRACK":case"HUMAN_SHAKY_DIAGONAL":case"HUMAN_LATE_FIXES":return p.sort((f,r)=>l(f.x,f.y,o.length)-l(r.x,r.y,o.length));default:return g}}getSampledImagePreviewData(){let o=this.pixels.width,s=this.pixels.height,a=q.PREVIEW_MASK_BASE_WIDTH,p=q.PREVIEW_MASK_BASE_HEIGHT,l=Math.min(1,a/Math.max(1,o),p/Math.max(1,s)),c=Math.max(1,Math.round(o*l)),g=Math.max(1,Math.round(s*l)),f=new Set;for(let d=0;d<this.colors.length;d++){let n=this.colors[d];if(n.disabled)f.add(n.realColor)}let r=new Map,w=new Map;for(let d=0;d<s;d++)for(let n=0;n<o;n++){let m=this.pixels.pixels[d]?.[n]??0;if(!m||f.has(m))continue;let i=Math.min(c-1,Math.floor(n/o*c)),H=Math.min(g-1,Math.floor(d/s*g)),z=`${i}:${H}`;if(!r.has(z))r.set(z,{x:i,y:H});if(!w.has(z))w.set(z,m)}let u=[...r.values()];if(!u.length){let d=this.fallbackPreviewMask();return{width:o,height:s,mask:d,colors:new Map(d.map((n)=>[`${n.x}:${n.y}`,this.pixels.pixels[n.y]?.[n.x]??0]))}}return{width:c,height:g,mask:u,colors:w}}getImagePreviewMask(){let o=this.pixels.width,s=this.pixels.height,a=new Set;for(let l=0;l<this.colors.length;l++){let c=this.colors[l];if(c.disabled)a.add(c.realColor)}let p=[];for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=this.pixels.pixels[l]?.[c]??0;if(g!==0&&!a.has(g))p.push({x:c,y:l})}return p.length?p:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],s=this.pixels.width/2,a=this.pixels.height/2,p=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let l=0;l<this.pixels.height;l++)for(let c=0;c<this.pixels.width;c++)if((c-s)**2+(l-a)**2<=p**2)o.push({x:c,y:l});return o}applyLocale(){if(F(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let s=Z[o]??"0,0,0",[a=0,p=0,l=0]=s.split(",").map((c)=>Number.parseInt(c,10));return`#${[a,p,l].map((c)=>c.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let s=Z[o]??"0,0,0",[a=0,p=0,l=0]=s.split(",").map((r)=>Number.parseInt(r,10)),c=Math.max(a,p,l),g=Math.min(a,p,l);if(c-g<15)return["gray","grey","gris","neutral","neutro"];if(a>p+30&&a>l+30)return["red","rojo"];if(p>a+30&&p>l+30)return["green","verde"];if(l>a+30&&l>p+30)return["blue","azul"];if(a>170&&p>120&&l<130)return["orange","naranja"];if(a>170&&p>110&&l>140)return["pink","rosa"];if(a>120&&p<100&&l>120)return["purple","violet","morado"];if(a>130&&p>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",b("colorPanelResults"));let s=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((a)=>!this.pixels.colors.has(a.realColor)))this.colors=this.pixels.colors.values().toArray().sort((a,p)=>p.amount-a.amount).map((a)=>({realColor:a.realColor,disabled:!1})),N(this.bot);for(let a=0;a<this.colors.length;a++){let p=this.colors[a],l=this.pixels.colors.get(p.realColor),c=!1,g=l.realColor!==l.color,f=l.amount/o*100,r=this.colorHex(l.realColor),w=this.colorKeywords(l.realColor),u=()=>{p.disabled=p.disabled?void 0:!0,d.classList.toggle("disabled",Boolean(p.disabled));let m=d.querySelector(".state");if(m)m.textContent=p.disabled?b("disabled"):b("enabled");N(this.bot)},d=document.createElement("button");if(d.className=`color-chip ${p.disabled?"disabled":""}`,d.draggable=!0,d.setAttribute("aria-label",`${b("overlayColors")} #${a+1}: ${r.toUpperCase()}`),d.innerHTML=`<span class="order-index">#${a+1}</span>
<span class="drag" title="${b("up")} / ${b("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${f.toFixed(1)}%</span>
  <span class="hex">${r.toUpperCase()}</span>
  <span class="state">${p.disabled?b("disabled"):b("enabled")}</span>
</span>
<span class="premium ${g?"on":""}">${g?b("premium"):""}</span>`,d.querySelector(".swatch").style.setProperty("--swatch-color",go(l.realColor)),d.addEventListener("click",()=>{if(c){c=!1;return}u()}),d.addEventListener("dragstart",(m)=>{c=!0,d.classList.add("dragging"),m.dataTransfer?.setData("text/plain",String(a)),m.dataTransfer.effectAllowed="move"}),d.addEventListener("dragend",()=>{d.classList.remove("dragging")}),d.addEventListener("dragover",(m)=>{m.preventDefault(),d.classList.add("drag-target")}),d.addEventListener("dragleave",()=>{d.classList.remove("drag-target")}),d.addEventListener("drop",(m)=>{m.preventDefault(),d.classList.remove("drag-target");let i=Number.parseInt(m.dataTransfer?.getData("text/plain")??"-1",10);if(i<0||i===a||i>=this.colors.length)return;this.colors.splice(a,0,...this.colors.splice(i,1)),N(this.bot),this.updateColors()}),g){let m=document.createElement("button");m.textContent=b("buy"),m.className="buy-chip",m.addEventListener("click",(i)=>{i.stopPropagation(),document.getElementById("color-"+l.realColor)?.click()}),d.append(m)}let n=`${r} ${w.join(" ")} ${l.realColor} ${Z[l.realColor]}`;if(!s||n.toLowerCase().includes(s))this.$colorsDialogList.append(d)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,s=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let a=0;a<s;a++)for(let p=0;p<o;p++)yield{x:p,y:a};break}case"UP":{for(let a=s-1;a>=0;a--)for(let p=0;p<o;p++)yield{x:p,y:a};break}case"LEFT":{for(let a=0;a<o;a++)for(let p=0;p<s;p++)yield{x:a,y:p};break}case"RIGHT":{for(let a=o-1;a>=0;a--)for(let p=0;p<s;p++)yield{x:a,y:p};break}case"RANDOM":{let a=[];for(let p=0;p<s;p++)for(let l=0;l<o;l++)a.push({x:l,y:p});for(let p=a.length-1;p>=0;p--){let l=Math.floor(Math.random()*(p+1)),c=a[p];a[p]=a[l],a[l]=c}yield*a;break}case"ZIGZAG":{for(let a=0;a<s;a++)if(a%2===0)for(let p=0;p<o;p++)yield{x:p,y:a};else for(let p=o-1;p>=0;p--)yield{x:p,y:a};break}case"HUMANIZED":{let a=Math.max(4,Math.floor(Math.min(o,s)/10)),p=[];for(let l=0;l<s;l+=a)for(let c=0;c<o;c+=a)p.push({x:c,y:l});for(let l=p.length-1;l>=0;l--){let c=Math.floor(Math.random()*(l+1)),g=p[l];p[l]=p[c],p[c]=g}for(let l=0;l<p.length;l++){let c=p[l],g=Math.min(s,c.y+a),f=Math.min(o,c.x+a);for(let r=c.y;r<g;r++)if(Math.random()>0.35)for(let u=c.x;u<f;u++)yield{x:u,y:r};else for(let u=f-1;u>=c.x;u--)yield{x:u,y:r}}break}case"HUMAN_SOFT_DITHER":{let a=new Set;for(let p=0;p<s;p++){let l=Math.floor(Math.random()*3)-1;if((p+l)%2===0)for(let g=0;g<o;g+=2)a.add(`${g},${p}`),yield{x:g,y:p};else for(let g=1;g<o;g+=2)a.add(`${g},${p}`),yield{x:g,y:p}}for(let p=0;p<s;p++)for(let l=0;l<o;l++){let c=`${l},${p}`;if(a.has(c))continue;yield{x:l,y:p}}break}case"HUMAN_PATCHY":{let a=new Set,p=o*s;while(a.size<p){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=1+Math.floor(Math.random()*5);for(let f=c-g;f<=c+g;f++)for(let r=l-g;r<=l+g;r++){if(r<0||r>=o||f<0||f>=s)continue;if(Math.hypot(r-l,f-c)>g+Math.random()*1.2)continue;let w=`${r},${f}`;if(a.has(w))continue;a.add(w),yield{x:r,y:f}}}break}case"HUMAN_SWEEP_ARCS":{let a=new Set,p=(o-1)/2,l=(s-1)/2,c=Math.hypot(p,l);for(let g=0;g<4;g++){let f=Math.random()*Math.PI*2;for(let r=0;r<=c;r+=0.35){let w=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(r*8));for(let d=0;d<u;d++){let n=f+w*d/u+Math.sin(r)*0.08,m=Math.round(p+Math.cos(n)*r),i=Math.round(l+Math.sin(n)*r);if(m<0||m>=o||i<0||i>=s)continue;let H=`${m},${i}`;if(a.has(H))continue;a.add(H),yield{x:m,y:i}}}}for(let g=0;g<s;g++)for(let f=0;f<o;f++){let r=`${f},${g}`;if(a.has(r))continue;yield{x:f,y:g}}break}case"HUMAN_MICRO_CORRECTIONS":{let a=new Set;for(let p=0;p<s;p++){let l=p%2===0?1:-1,c=l>0?0:o-1;for(let g=0;g<o;g++){let f=c+(Math.random()>0.82?l:0),r=p+(Math.random()>0.9?1:0);for(let w of[{x:c,y:p},{x:f,y:p},{x:c,y:r}]){if(w.x<0||w.x>=o||w.y<0||w.y>=s)continue;let u=`${w.x},${w.y}`;if(a.has(u))continue;a.add(u),yield w}c+=l}}for(let p=0;p<s;p++)for(let l=0;l<o;l++){let c=`${l},${p}`;if(a.has(c))continue;yield{x:l,y:p}}break}case"HUMAN_JITTER_FILL":{let a=[];for(let p=0;p<s;p++)for(let l=0;l<o;l++)a.push({x:l,y:p});a.sort((p,l)=>{let c=p.y+(Math.random()-0.5)*1.8,g=l.y+(Math.random()-0.5)*1.8;if(c!==g)return c-g;return p.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*a;break}case"HUMAN_CORNER_BIAS":{let a=[{x:0,y:0},{x:o-1,y:0},{x:0,y:s-1},{x:o-1,y:s-1}],p=a[Math.floor(Math.random()*a.length)],l=[];for(let c=0;c<s;c++)for(let g=0;g<o;g++){let r=Math.hypot(g-p.x,c-p.y)+Math.random()*3.5;l.push({point:{x:g,y:c},score:r})}l.sort((c,g)=>c.score-g.score);for(let c of l)yield c.point;break}case"HUMAN_LONG_STROKES":{let a=new Set,p=o*s;while(a.size<p){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=Math.random()*Math.PI*2,f=Math.sign(Math.cos(g)),r=Math.sign(Math.sin(g)),w=10+Math.floor(Math.random()*40);for(let u=0;u<w;u++){if(l<0||l>=o||c<0||c>=s)break;let d=`${l},${c}`;if(!a.has(d))a.add(d),yield{x:l,y:c};if(Math.random()>0.78)l+=r,c+=f;else l+=f,c+=r}}break}case"HUMAN_TAP_CLUSTERS":{let a=new Set,p=o*s;while(a.size<p){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=3+Math.floor(Math.random()*10);for(let f=0;f<g;f++){let r=Math.round(l+(Math.random()-0.5)*6),w=Math.round(c+(Math.random()-0.5)*6);if(r<0||r>=o||w<0||w>=s)continue;let u=`${r},${w}`;if(a.has(u))continue;a.add(u),yield{x:r,y:w}}}break}case"HUMAN_MESSY_SPIRAL":{let a=new Set,p=(o-1)/2,l=(s-1)/2,c=Math.hypot(p,l)+2;for(let g=0;a.size<o*s;g++){let f=g/3,r=Math.min(c,f*0.18),w=f*0.29+Math.sin(f*0.13)*0.8,u=Math.round(p+Math.cos(w)*r+Math.sin(f)*0.7),d=Math.round(l+Math.sin(w)*r+Math.cos(f)*0.7);if(u<0||u>=o||d<0||d>=s){if(g>o*s*18)break;continue}let n=`${u},${d}`;if(a.has(n)){if(Math.random()>0.9)continue}else a.add(n),yield{x:u,y:d};if(g>o*s*18)break}for(let g=0;g<s;g++)for(let f=0;f<o;f++){let r=`${f},${g}`;if(a.has(r))continue;yield{x:f,y:g}}break}case"HUMAN_DRUNK_WALK":{let a=new Set,p=Math.floor(Math.random()*o),l=Math.floor(Math.random()*s),c=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(a.size<o*s){let g=`${p},${l}`;if(!a.has(g))a.add(g),yield{x:p,y:l};let f=[];for(let u of c){let d=p+u.x,n=l+u.y;if(d<0||d>=o||n<0||n>=s)continue;f.push({x:d,y:n})}if(!f.length)break;let r=f.filter((u)=>{return!a.has(`${u.x},${u.y}`)});if(r.length&&Math.random()>0.2){let u=r[Math.floor(Math.random()*r.length)];p=u.x,l=u.y;continue}let w=f[Math.floor(Math.random()*f.length)];p=w.x,l=w.y}for(let g=0;g<s;g++)for(let f=0;f<o;f++){let r=`${f},${g}`;if(a.has(r))continue;yield{x:f,y:g}}break}case"HUMAN_NOISE_CLOUD":{let a=[];for(let p=0;p<s;p++)for(let l=0;l<o;l++){let c=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((p+1)*1.17+Math.random()*0.8),g=(Math.random()-0.5)*2.6,f=Math.hypot(l-o/2,p-s/2)*0.08;a.push({point:{x:l,y:p},score:c+g+f})}a.sort((p,l)=>p.score-l.score);for(let p of a)yield p.point;break}case"HUMAN_PATCH_JUMP":{let a=new Set,p=[];for(let l=0;l<Math.max(6,o*s/18);l++)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*s)});while(a.size<o*s){let l=p[Math.floor(Math.random()*p.length)],c=1+Math.floor(Math.random()*3),g=1+Math.floor(Math.random()*3);for(let f=l.y-g;f<=l.y+g;f++)for(let r=l.x-c;r<=l.x+c;r++){if(r<0||r>=o||f<0||f>=s)continue;if(Math.random()>0.86)continue;let w=`${r},${f}`;if(a.has(w))continue;a.add(w),yield{x:r,y:f}}if(Math.random()>0.72&&p.length<o*s/2)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*s)});if(a.size>o*s*0.92)break}for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;yield{x:c,y:l}}break}case"HUMAN_HESITANT_LINES":{let a=new Set;for(let p=0;p<s;p++){let l=p%2===0;for(let c=0;c<o;c++){let g=l?c:o-1-c,f=`${g},${p}`;if(!a.has(f))a.add(f),yield{x:g,y:p};if(Math.random()>0.7){let r=Math.max(0,Math.min(o-1,g+(Math.random()>0.5?1:-1))),w=Math.max(0,Math.min(s-1,p+(Math.random()>0.65?1:0))),u=`${r},${w}`;if(!a.has(u))a.add(u),yield{x:r,y:w}}}}for(let p=0;p<s;p++)for(let l=0;l<o;l++){let c=`${l},${p}`;if(a.has(c))continue;yield{x:l,y:p}}break}case"HUMAN_OVERLAP_SWEEPS":{let a=[],p=Math.random()*Math.PI*2;for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=Math.sin((c+l)*0.42+p)*2.2,f=Math.cos((c-l)*0.3+p)*1.4;a.push({point:{x:c,y:l},score:l+g+f+(Math.random()-0.5)*3.4})}a.sort((l,c)=>l.score-c.score);for(let l of a)yield l.point;break}case"HUMAN_WOBBLE_DRIFT":{let a=[],p=o/2,l=s/2;for(let c=0;c<s;c++)for(let g=0;g<o;g++){let f=Math.hypot(g-p,c-l)*0.25,r=Math.sin((g+1)*0.9)*1.8+Math.cos((c+1)*1.1)*1.8+Math.sin((g+c)*0.35)*1.4;a.push({point:{x:g,y:c},score:f+r+(Math.random()-0.5)*2.8})}a.sort((c,g)=>c.score-g.score);for(let c of a)yield c.point;break}case"HUMAN_GAP_RECOVERY":{let a=new Set,p=[];for(let l=0;l<s;l++)for(let c=0;c<o;c++){if(Math.random()>0.87){p.push({x:c,y:l});continue}a.add(`${c},${l}`),yield{x:c,y:l}}p.sort((l,c)=>Math.hypot(l.x-o/2,l.y-s/2)-Math.hypot(c.x-o/2,c.y-s/2));for(let l of p){let c=`${l.x},${l.y}`;if(a.has(c))continue;a.add(c),yield l}break}case"HUMAN_STAIRCASE":{let a=new Set,p=o+s-1;for(let l=0;l<p;l++){let c=Math.max(0,l-o+1),g=Math.min(s-1,l);for(let f=c;f<=g;f++){let r=l-f,w=[{x:r,y:f},{x:r+(Math.random()>0.5?1:-1),y:f},{x:r,y:f+(Math.random()>0.5?1:-1)}];for(let u of w){if(u.x<0||u.x>=o||u.y<0||u.y>=s)continue;let d=`${u.x},${u.y}`;if(a.has(d))continue;a.add(d),yield u}}}for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;yield{x:c,y:l}}break}case"HUMAN_EDGE_HUGGER":{let a=[];for(let p=0;p<s;p++)for(let l=0;l<o;l++){let c=Math.min(l,p,o-1-l,s-1-p);a.push({point:{x:l,y:p},score:c*3.5+(Math.random()-0.5)*5.5})}a.sort((p,l)=>p.score-l.score);for(let p of a)yield p.point;break}case"HUMAN_BLOBS":{let a=new Set,p=o*s;while(a.size<p){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=1+Math.floor(Math.random()*4);for(let f=c-g;f<=c+g;f++)for(let r=l-g;r<=l+g;r++){if(r<0||r>=o||f<0||f>=s)continue;let w=Math.atan2(f-c,r-l),u=g+Math.sin(w*3+Math.random())*0.8;if(Math.hypot(r-l,f-c)>u)continue;let d=`${r},${f}`;if(a.has(d))continue;a.add(d),yield{x:r,y:f}}}break}case"HUMAN_BACKTRACK":{let a=new Set,p=[];for(let l=0;l<s;l++)for(let c=0;c<o;c++)p.push({x:c,y:l});p.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*2.2+(l.x-c.x)*0.04);for(let l=0;l<p.length;l++){let c=p[l],g=`${c.x},${c.y}`;if(a.has(g))continue;if(a.add(g),yield c,l>1&&Math.random()>0.74){let f=p[l-1],r=`${f.x},${f.y}`;if(!a.has(r))a.add(r),yield f}}for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;yield{x:c,y:l}}break}case"HUMAN_SHAKY_DIAGONAL":{let a=[];for(let p=0;p<s;p++)for(let l=0;l<o;l++){let c=Math.abs(l-p)*0.6,g=Math.sin(l*1.4+p*0.8)*1.8+Math.cos(p*1.1+l*0.5)*1.5;a.push({point:{x:l,y:p},score:c+g+(Math.random()-0.5)*3.2})}a.sort((p,l)=>p.score-l.score);for(let p of a)yield p.point;break}case"HUMAN_LATE_FIXES":{let a=[],p=[];for(let l=0;l<s;l++)for(let c=0;c<o;c++)if(Math.random()>0.9)p.push({x:c,y:l});else a.push({x:c,y:l});a.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?l.x-c.x:0)),p.sort((l,c)=>Math.hypot(c.x-o/2,c.y-s/2)-Math.hypot(l.x-o/2,l.y-s/2)),yield*a,yield*p;break}case"DIAGONAL_BRUSH":{for(let a=0;a<o+s-1;a++){let p=a%2===0,l=[],c=Math.max(0,a-o+1),g=Math.min(s-1,a);for(let f=c;f<=g;f++){let r=a-f;if(r>=0&&r<o)l.push({x:r,y:f})}if(Math.random()>0.55)l.reverse();if(p)for(let f=l.length-1;f>=0;f--)yield l[f];else yield*l}break}case"BRUSH_STROKES":{let a=Array.from({length:s},()=>Array(o).fill(!1)),p=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(f,r)=>f>=0&&f<o&&r>=0&&r<s,c=0,g=o*s;for(let f=0;f<g*6&&c<g;f++){let r=Math.floor(Math.random()*o),w=Math.floor(Math.random()*s),u=p[Math.floor(Math.random()*p.length)],d=3+Math.floor(Math.random()*16);for(let n=0;n<d;n++){if(!l(r,w))break;if(!a[w][r])a[w][r]=!0,c++,yield{x:r,y:w};if(Math.random()>0.72)u=p[Math.floor(Math.random()*p.length)];r+=u.x,w+=u.y}}for(let f=0;f<s;f++)for(let r=0;r<o;r++)if(!a[f][r])yield{x:r,y:f};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let a=new Set,p=o*s,l=Math.floor(o/2),c=Math.floor(s/2),g=[[1,0],[0,1],[-1,0],[0,-1]],f=0,r=1,w=(d,n)=>d>=0&&d<o&&n>=0&&n<s,u=function*(){let d=0;while(d<p){for(let n=0;n<2;n++){for(let m=0;m<r;m++){if(w(l,c)){let i=`${l},${c}`;if(!a.has(i)){if(a.add(i),yield{x:l,y:c},d++,d>=p)return}}l+=g[f][0],c+=g[f][1]}f=(f+1)%4}r++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let d=[...u()];for(let n=d.length-1;n>=0;n--)yield d[n]}break}case"SCRIBBLE":{let a=new Set,p=o*s,l=Math.floor(o/2),c=Math.floor(s/2);for(let g=0;a.size<p&&g<p*24;g++){let f=`${l},${c}`;if(!a.has(f))a.add(f),yield{x:l,y:c};if(l+=Math.floor(Math.random()*3)-1,c+=Math.floor(Math.random()*3)-1,l<0||l>=o||c<0||c>=s)l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s)}for(let g=0;g<s;g++)for(let f=0;f<o;f++){let r=`${f},${g}`;if(a.has(r))continue;a.add(r),yield{x:f,y:g}}break}case"CROSSHATCH":{let a=[];for(let c=0;c<o+s-1;c++)for(let g=Math.max(0,c-o+1);g<=Math.min(s-1,c);g++){let f=c-g;a.push({x:f,y:g})}let p=[];for(let c=-s+1;c<o;c++)for(let g=0;g<s;g++){let f=g+c;if(f>=0&&f<o)p.push({x:f,y:g})}let l=new Set;for(let c of[...a,...p]){let g=`${c.x},${c.y}`;if(l.has(g))continue;l.add(g),yield c}break}case"WAVE_SWEEP":{let a=new Set;for(let p=0;p<o;p++){let c=(Math.sin(p/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(s-1)|0;for(let g=0;g<s;g++){let f=c+g,r=c-g;for(let w of[f,r]){if(w<0||w>=s)continue;let u=`${p},${w}`;if(a.has(u))continue;a.add(u),yield{x:p,y:w}}}}break}case"SCATTERED_LINES":{let a=new Set,p=o*s;for(let l=0;a.size<p&&l<p*14;l++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*s),f=Math.random()*Math.PI*2,r=Math.round(Math.cos(f)),w=Math.round(Math.sin(f)),u=6+Math.floor(Math.random()*28);for(let d=0;d<u;d++){if(c<0||c>=o||g<0||g>=s)break;let n=`${c},${g}`;if(!a.has(n))a.add(n),yield{x:c,y:g};c+=r,g+=w}}for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;a.add(g),yield{x:c,y:l}}break}case"CONTOUR_JITTER":{let a=new Set;for(let p=0;p<Math.ceil(Math.min(o,s)/2);p++){let l=[],c=p,g=p,f=o-p-1,r=s-p-1;for(let w=c;w<=f;w++)l.push({x:w,y:g});for(let w=g+1;w<=r;w++)l.push({x:f,y:w});for(let w=f-1;w>=c;w--)l.push({x:w,y:r});for(let w=r-1;w>g;w--)l.push({x:c,y:w});for(let w=l.length-1;w>0;w--){let u=Math.floor(Math.random()*(w+1)),d=l[w];l[w]=l[u],l[u]=d}for(let w of l){let u=`${w.x},${w.y}`;if(a.has(u))continue;a.add(u),yield w}}break}case"SPIRAL_WOBBLE":{let a=new Set,p=o/2,l=s/2,c=Math.hypot(p,l);for(let g=0;a.size<o*s&&g<o*s*9;g++){let f=g/(o*s*9)*c,r=g*0.31+Math.sin(g*0.07)*0.7,w=Math.round(p+Math.cos(r)*f),u=Math.round(l+Math.sin(r)*f);if(w<0||w>=o||u<0||u>=s)continue;let d=`${w},${u}`;if(a.has(d))continue;a.add(d),yield{x:w,y:u}}for(let g=0;g<s;g++)for(let f=0;f<o;f++){let r=`${f},${g}`;if(a.has(r))continue;yield{x:f,y:g}}break}case"CLUSTER_BURSTS":{let a=new Set,p=o*s;for(let l=0;a.size<p&&l<p*12;l++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*s),f=2+Math.floor(Math.random()*10);for(let r=g-f;r<=g+f;r++)for(let w=c-f;w<=c+f;w++){if(w<0||w>=o||r<0||r>=s)continue;if(Math.hypot(w-c,r-g)>f)continue;let u=`${w},${r}`;if(a.has(u))continue;a.add(u),yield{x:w,y:r}}}for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;a.add(g),yield{x:c,y:l}}break}case"ORBITAL":{let a=new Set,p=(o-1)/2,l=(s-1)/2,c=Math.ceil(Math.max(p,l));for(let g=0;g<=c;g++){let f=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,g)*2));for(let r=0;r<f;r++){let w=r/f*Math.PI*2+(g%2?0.3:-0.3),u=Math.round(p+Math.cos(w)*g),d=Math.round(l+Math.sin(w)*g);if(u<0||u>=o||d<0||d>=s)continue;let n=`${u},${d}`;if(a.has(n))continue;a.add(n),yield{x:u,y:d}}}for(let g=0;g<s;g++)for(let f=0;f<o;f++){let r=`${f},${g}`;if(a.has(r))continue;yield{x:f,y:g}}break}case"FLOW_FIELD":{let a=new Set,p=o*s;for(let l=0;a.size<p&&l<p*18;l++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*s);for(let f=0;f<120;f++){if(c<0||c>=o||g<0||g>=s)break;let r=`${c},${g}`;if(!a.has(r))a.add(r),yield{x:c,y:g};let w=Math.sin(c*0.09)*1.8+Math.cos(g*0.08)*1.6+Math.sin((c+g)*0.05);c+=Math.round(Math.cos(w)),g+=Math.round(Math.sin(w))}}for(let l=0;l<s;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;a.add(g),yield{x:c,y:l}}break}case"EDGE_IN":{let a=new Set,p=Math.ceil(Math.min(o,s)/2);for(let l=0;l<p;l++){let c=l,g=o-1-l,f=l,r=s-1-l;for(let w=c;w<=g;w++)for(let u of[f,r]){let d=`${w},${u}`;if(a.has(d))continue;a.add(d),yield{x:w,y:u}}for(let w=f+1;w<=r-1;w++)for(let u of[c,g]){let d=`${u},${w}`;if(a.has(d))continue;a.add(d),yield{x:u,y:w}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),N(this.bot)}move(o){if(!this.moveInfo)return;let s=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),a=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=s+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-s)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,s+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=a+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-a)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,a+this.moveInfo.height);this.update(),N(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let s=o.target;if(s.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(s.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(s.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(s.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${$}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Jo=`/* stylelint-disable declaration-no-important */
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
  width: 100%;
  margin: 0;
  padding: 0 10px 10px;
  list-style: none;
  text-align: left;
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,s){super(o);s.widget.status=o}}class fo extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var K={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0}};function Q(o,s){let a=s.key.toLowerCase(),p=o.key.toLowerCase(),c=a==="/"&&(p==="/"||p==="?"||o.code==="Slash")||p===a,g=s.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,f=s.ctrl===!0?!0:s.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(s.shift)&&g&&f&&o.altKey===Boolean(s.alt)}function No(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let s=o.tagName.toLowerCase();return s==="input"||s==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Uo=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var ko="kglacer-macro:overlay-hidden",Yo="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class ro extends O{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$drawAndPaint;$addImage;$captureTemplate;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Uo,F(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$drawAndPaint:".draw-and-paint",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=Yo,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$drawAndPaint.addEventListener("click",()=>{this.drawAndClickPaintWhenReady()}),this.$addImage.addEventListener("click",()=>this.addImage()),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=X(),this.$locale.addEventListener("change",()=>{oo(this.$locale.value),F(this.element);for(let s=0;s<this.bot.images.length;s++)this.bot.images[s].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(b("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${$}`,o.click(),await W(o,["change"],["cancel","error"]);let s=o.files?.[0];if(!s)throw new fo(this.bot);console.log("[KGM][Widget] File selected",{name:s.name,size:s.size,type:s.type});let a;if(s.name.endsWith(`.${$}`))a=await q.fromJSON(this.bot,JSON.parse(await s.text()));else{let p=new FileReader;p.readAsDataURL(s),await W(p,["load"],["error"]);let l=await this.compressImageBeforeLoad(p.result),c=new Image;c.src=l,await W(c,["load"],["error"]),await this.waitForStableViewportProjection(),a=new q(this.bot,k.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new R(this.bot,c))}this.bot.images.push(a),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),a.updateTasks(),N(this.bot,!0),this.bot.updateTasks(),this.update(),globalThis.location.reload()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(b("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:s,minGlobalY:a,maxGlobalX:p,maxGlobalY:l}=o,c=document.createElement("canvas");c.width=Math.max(1,p-s+1),c.height=Math.max(1,l-a+1);let g=c.getContext("2d");if(!g)throw new Error("Capture context unavailable");g.imageSmoothingEnabled=!1;let f=Math.floor(s/P),r=Math.floor(a/P),w=Math.floor(p/P),u=Math.floor(l/P),d=(w-f+1)*(u-r+1),n=0;for(let i=f;i<=w;i++)for(let H=r;H<=u;H++){this.status=`⌛ ${b("taskReadingTiles")} [${++n}/${d}]`;let z=await this.loadTileImage(i,H),M=i*P,A=H*P,J=Math.max(s,M),U=Math.min(p,M+P-1),D=Math.max(a,A),B=Math.min(l,A+P-1),T=J-M,I=D-A,_=U-J+1,h=B-D+1,v=J-s,x=D-a;g.drawImage(z,T,I,_,h,v,x,_,h)}let m=Date.now();await this.downloadCapture(c,"png",m)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,s,a){let p=s==="webp"?"image/webp":"image/png",l=await new Promise((f,r)=>{o.toBlob((w)=>{if(!w){r(new Error(`Failed to create ${s.toUpperCase()} capture file`));return}f(w)},p)}),c=URL.createObjectURL(l),g=document.createElement("a");g.href=c,g.download=`wplace-capture-${a}.${s}`,g.click(),URL.revokeObjectURL(c)}async loadTileImage(o,s){let a;for(let p=1;p<=3;p++)try{let l=new Image;return l.crossOrigin="anonymous",l.referrerPolicy="no-referrer",l.src=`https://backend.wplace.live/files/s0/tiles/${o}/${s}.png?ts=${Date.now()}-${p}`,await W(l,["load"],["error"]),l}catch(l){if(a=l,p<3)await new Promise((c)=>setTimeout(c,p*200))}throw a instanceof Error?a:new Error(`Tile fetch failed (${o}/${s})`)}async resolveCaptureBounds(){return this.selectCaptureBounds()}selectCaptureBounds(){return new Promise((o,s)=>{let a=document.createElement("div");a.className="kgm-capture-overlay",a.innerHTML=`<div class="kgm-capture-hint">${b("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let p=a.querySelector(".kgm-capture-box");document.body.append(a);let l,c,g=()=>{window.removeEventListener("keydown",d,!0),a.removeEventListener("pointermove",w),a.removeEventListener("pointerdown",u),a.remove()},f=(n)=>{let m=Math.min(l.x,n.x),i=Math.min(l.y,n.y),H=Math.abs(l.x-n.x)+1,z=Math.abs(l.y-n.y)+1;return{left:m,top:i,width:H,height:z}},r=(n)=>{let{left:m,top:i,width:H,height:z}=f(n);p.style.left=`${m}px`,p.style.top=`${i}px`,p.style.width=`${H}px`,p.style.height=`${z}px`},w=(n)=>{if(!l)return;r({x:n.clientX,y:n.clientY})},u=(n)=>{if(n.preventDefault(),!l){l={x:n.clientX,y:n.clientY};let J=k.fromScreenPosition(this.bot,l);c={x:J.globalX,y:J.globalY},r(l);return}let m={x:n.clientX,y:n.clientY},i=k.fromScreenPosition(this.bot,m);if(g(),!c){s(new Error("Capture anchor point unavailable"));return}let H=Math.min(c.x,i.globalX),z=Math.min(c.y,i.globalY),M=Math.max(c.x,i.globalX),A=Math.max(c.y,i.globalY);if(M-H<1||A-z<1){s(new Error("Capture area too small"));return}o({minGlobalX:H,minGlobalY:z,maxGlobalX:M,maxGlobalY:A})},d=(n)=>{if(n.key!=="Escape")return;g(),s(new Error("Capture cancelled"))};window.addEventListener("keydown",d,!0),a.addEventListener("pointermove",w),a.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let s=new Image;if(s.src=o,await W(s,["load"],["error"]),!(s.naturalWidth*s.naturalHeight>3000000||o.length>3000000))return o;let p=document.createElement("canvas");p.width=s.naturalWidth,p.height=s.naturalHeight;let l=p.getContext("2d");if(!l)return o;return l.drawImage(s,0,0),p.toDataURL("image/png")}async waitForStableViewportProjection(){let o=this.defaultImageScreenPosition(),s=0,a;for(let p=0;p<45;p++){await new Promise((w)=>requestAnimationFrame(()=>{w()}));let{anchorScreenPosition:{x:l,y:c},pixelSize:g}=this.bot.findAnchorsForScreen(o);if(!Number.isFinite(g)||g<=0){s=0;continue}let f={anchorX:l,anchorY:c,pixelSize:g};if(!a){a=f,s=1;continue}if(Math.abs(f.anchorX-a.anchorX)+Math.abs(f.anchorY-a.anchorY)+Math.abs(f.pixelSize-a.pixelSize)<0.0012)s++;else s=0;if(a=f,s>=3)return}}update(){this.$strategy.value=this.bot.strategy;let o=0,s=0;for(let c=0;c<this.bot.images.length;c++){let g=this.bot.images[c];o+=g.pixels.pixels.length*g.pixels.pixels[0].length,s+=g.tasks.length}let a=Math.max(0,o-s),p=o>0?a/o*100|0:0;this.$progressText.textContent=`${a}/${o} ${p}% ETA: ${s/120|0}h`,this.$progressLine.style.transform=`scaleX(${p/100})`,this.$images.innerHTML="";let l=document.createDocumentFragment();for(let c=0;c<this.bot.images.length;c++){let g=this.bot.images[c],f=document.createElement("div");l.append(f),f.className="image",f.innerHTML=`<button class="preview" title="View preview">
  <img src="${g.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${c===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${c===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,f.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=c,g.openPreviewPanel()}),f.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=c,g.openColorPanel()}),f.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=c,g.openPreviewPanel()}),f.querySelector(".download").addEventListener("click",()=>{g.exportImage()}),f.querySelector(".delete").addEventListener("click",()=>{g.destroy()}),f.querySelector(".up").addEventListener("click",()=>{po(this.bot.images,c,c-1),this.update(),N(this.bot)}),f.querySelector(".down").addEventListener("click",()=>{po(this.bot.images,c,c+1),this.update(),N(this.bot)})}this.$images.append(l)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(ko)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let s=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",s),localStorage.setItem(ko,String(s)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${b("toggleOverlay")} (${b("disabled")})`:`${b("toggleOverlay")} (${b("enabled")})`}setDisabled(o,s){this.element.querySelector("."+o).disabled=s}async run(o,s,a,p="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${p} ${o}`;try{let c=await s();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),c}catch(c){if(!(c instanceof ao))console.error(c),this.status=`${b("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:c}),c}finally{await a?.()}}handleKeyboard(o){if(No(o.target))return;if(Q(o,K.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(Q(o,K.showShortcuts)){o.preventDefault(),this.open=!0,this.$shortcuts.open=!0,this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(Q(o,K.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(Q(o,K.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(Q(o,K.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(Q(o,K.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(Q(o,K.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(Q(o,K.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(Q(o,K.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(Q(o,K.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),N(this.bot)}async waitAndClickPaintButton(){await this.run(b("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){this.triggerNativePaintClick(o);return}await new Promise((s)=>setTimeout(s,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative","button.btn.btn-primary.btn-lg.relative","button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30","div.absolute.bottom-0.left-1\\/2.-translate-x-1\\/2 button.btn.btn-primary"].flatMap((a)=>Array.from(document.querySelectorAll(a))).find((a)=>/pintar|paint/i.test(a.textContent??""))}triggerNativePaintClick(o){o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0,button:0})),o.dispatchEvent(new PointerEvent("pointerup",{bubbles:!0,cancelable:!0,pointerType:"mouse",button:0})),o.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,cancelable:!0,button:0})),o.click()}}var To=2,Ko="[KGM]",Qo="kglacer-macro:access-ok",wo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Do="kgm-access-locked";class ho{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,s){if(s===void 0)console.log(`${Ko} ${o}`);else console.log(`${Ko} ${o}`,s)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Do);let o=Po();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let a=0;a<o.images.length;a++){let p=o.images[a];t({x:p.position[0]-1000,y:p.position[1]-1000}),t({x:p.position[0]+1000,y:p.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let s=document.createElement("style");s.textContent=Jo.replace("FAKE_FAVORITE_LOCATIONS",Y.length.toString()),document.head.append(s),this.log("Styles injected",{fakeFavoriteLocations:Y.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Do),this._widget=new ro(this),await this.widget.run(b("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let a=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((p)=>{for(let l=0;l<p.length;l++)if(p[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(a,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await G(500),await this.updateColors(),o)for(let p=0;p<o.images.length;p++){let l=await q.fromJSON(this,o.images[p]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Qo)===wo)return;await new Promise((o)=>{let s=document.createElement("dialog");s.className="kgm-modal access-dialog",s.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(s),F(s);let a=s.querySelector(".access-input"),p=s.querySelector(".access-error"),l=s.querySelector(".access-locale");l.innerHTML=mo().map((c)=>`<option value="${c}" ${c===X()?"selected":""}>${c.toUpperCase()}</option>`).join(""),l.addEventListener("change",()=>{oo(l.value),F(s)}),s.addEventListener("cancel",(c)=>{c.preventDefault()}),s.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault();let g=atob(wo);if(a.value.trim()!==g){p.textContent=b("invalidAccessKey");return}localStorage.setItem(Qo,wo),s.close(),s.remove(),o()}),s.showModal(),a.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.setDisabled("draw-and-paint",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),s=(a)=>{if(!a.shiftKey)a.stopPropagation()};return this.widget.run(b("taskDrawing"),async()=>{await this.widget.run(b("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",s,!0),o.addEventListener("wheel",s,!0),this.updateTasks();let a=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),p=Math.floor(a.charges.count);this.log("Charges fetched",{charges:p});let l=0;for(let c=0;c<this.images.length;c++)l+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(p>0){let c=!0;for(let g=0;g<this.images.length;g++){let f=this.images[g].tasks.shift();if(!f)continue;this.drawTask(f),p--,await G(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<l&&p>0;c++){let g=1,f;for(let r=0;r<this.images.length;r++){let w=this.images[r],u=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(u<g)g=u,f=w}this.drawTask(f.tasks.shift()),p--,await G(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let g=this.images[c];for(let f=g.tasks.shift();f&&p>0;f=g.tasks.shift())this.drawTask(f),p--,await G(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:p})},()=>{globalThis.removeEventListener("mousemove",s,!0),o.removeEventListener("wheel",s,!0),this.widget.setDisabled("draw",!1),this.widget.setDisabled("draw-and-paint",!1)})}toJSON(){return{version:To,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let s=document.querySelector(".maplibregl-canvas"),a=window.innerWidth/2,p=window.innerHeight/2,l=a-o.x,c=p-o.y;function g(f,r,w){s.dispatchEvent(new MouseEvent(f,{bubbles:!0,cancelable:!0,clientX:r,clientY:w,buttons:1}))}g("mousedown",a,p),g("mousemove",l,c),g("mouseup",l,c)}readMap(){this.mapsCache.clear();let o=new Set;for(let a=0;a<this.images.length;a++){let p=this.images[a],{tileX:l,tileY:c}=new k(this,p.position.globalX+p.pixels.pixels[0].length,p.position.globalY+p.pixels.pixels.length);for(let g=p.position.tileX;g<=l;g++)for(let f=p.position.tileY;f<=c;f++)o.add(`${g}/${f}`)}let s=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${b("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(a)=>{this.mapsCache.set(a,await R.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${a}.png`,exactColor:!0})),this.widget.status=`⌛ ${b("taskReadingMap")} [${++s}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let s=0,a=1,p=1/0,l=1/0;for(let f=0;f<this.$stars.length;f++){let{x:r,y:w}=V(this.$stars[f]);if(r<o.x&&w<o.y){let u=o.x-r+(o.y-w);if(u<p)p=u,s=f}else if(r>o.x&&w>o.y){let u=r-o.x+(w-o.y);if(u<l)l=u,a=f}}let c=V(this.$stars[s]),g=j[s];return{anchorScreenPosition:c,anchorWorldPosition:g,pixelSize:(V(this.$stars[a]).x-c.x)/(j[a].x-g.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await G(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await G(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await G(1)}drawTask(o){if(this.lastColor!==o.color){let p=document.getElementById("color-"+o.color);if(!p){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}p.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let s=o.position.pixelSize/2,a=o.position.toScreenPosition();if(!Number.isFinite(a.x)||!Number.isFinite(a.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:a.x+s,clientY:a.y+s,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,s=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(a,p)=>{let l=await o(a,p),c=l.clone(),g="";if(typeof a=="string")g=a;else if(a instanceof Request)g=a.url;else if(a instanceof URL)g=a.href;if(l.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...Y),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let f=s.exec(g);if(f){for(let r=0;r<this.markerPixelPositionResolvers.length;r++)this.markerPixelPositionResolvers[r](new k(this,+f[1],+f[2],+f[3],+f[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await G(1)}waitForElement(o,s){return this.log("Waiting for element",{name:o,selector:s}),this.widget.run(`${b("taskWaitingFor")} ${o}`,()=>{return new Promise((a)=>{let p=document.querySelector(s);if(p){a(p);return}let l=new MutationObserver(()=>{let c=document.querySelector(s);if(c)l.disconnect(),a(c)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,Y.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new ho;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
