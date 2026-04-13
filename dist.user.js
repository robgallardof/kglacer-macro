// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.12
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
function so(o,p,a){let s=o[a];return o[a]=o[p],o[p]=s,o}function po(o,p){let a=o.indexOf(p);if(a!==-1)o.splice(a,1);return a}var aa=Math.floor(Math.random()*65536),la=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function F(o){return new Promise((p)=>setTimeout(p,o))}function W(o,p,a=["error"],s="addEventListener"){return new Promise((l,c)=>{for(let g=0;g<p.length;g++)o[s]?.(p[g],l);for(let g=0;g<a.length;g++)o[s]?.(a[g],c)})}class Go{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:a}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+a<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,a)=>p+a.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,a=Math.min(p,this.historyTime);return{time:o,historyTime:a}}}var no=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",dithering:"Dithering",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutClickPaintWhenReady:"Wait + click Paint",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image · Shift+R wait cooldown and click Paint",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",editImage:"Edit image settings",imageEditTitle:"Image settings",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png or webp)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again.",taskInitializing:"Initializing",taskAddingImage:"Adding image",taskCapturingMapImage:"Capturing map image",taskReadingTiles:"Reading tiles",taskDrawing:"Drawing",taskInitializingDraw:"Initializing draw",taskReadingMap:"Reading map",taskWaitingFor:"Waiting for",taskErrorPrefix:"Error",taskWaitingPaintButton:"Waiting for paint cooldown",captureHintSelectArea:"Select area"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",dithering:"Dithering",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutClickPaintWhenReady:"Esperar + click en Pintar",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa · Shift+R esperar cooldown y click en Pintar",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",editImage:"Editar configuración de imagen",imageEditTitle:"Configuración de imagen",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png o webp)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Superposición",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo.",taskInitializing:"Inicializando",taskAddingImage:"Agregando imagen",taskCapturingMapImage:"Capturando imagen del mapa",taskReadingTiles:"Leyendo teselas",taskDrawing:"Dibujando",taskInitializingDraw:"Inicializando dibujo",taskReadingMap:"Leyendo mapa",taskWaitingFor:"Esperando",taskErrorPrefix:"Error",taskWaitingPaintButton:"Esperando cooldown de pintado",captureHintSelectArea:"Selecciona área"}};function Zo(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function X(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let p=0;p<no.length;p++){let a=localStorage.getItem(no[p]);if(!a||!(a in y))continue;return localStorage.setItem("kglacer-macro:locale",a),a}return Zo()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function io(){return Object.keys(y)}function b(o){let p=X();return y[p][o]}function q(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=b(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",b(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",b(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",b(p.dataset.i18nPlaceholder))}class O{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let a in p)this[a]=o.querySelector(p[a])}registerEvent(o,p,a,s={}){s.passive??=!0,o.addEventListener(p,a,s),this.runOnDestroy.push(()=>{o.removeEventListener(p,a)})}}function co(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function mo(o,p,a){let s=co(o/255),l=co(p/255),c=co(a/255),g=Math.cbrt(0.4122214708*s+0.5363325363*l+0.0514459929*c),r=Math.cbrt(0.2119034982*s+0.6806995451*l+0.1073969566*c),f=Math.cbrt(0.0883024619*s+0.2817188376*l+0.6299787005*c),w=0.2104542553*g+0.793617785*r-0.0040720468*f,u=1.9779984951*g-2.428592205*r+0.4505937099*f,d=0.0259040371*g+0.7827717662*r-0.808675766*f;return[w,u,d]}function zo(o,p,a){let[s,l,c]=o,[g,r,f]=p,w=(lo)=>lo*180/Math.PI,u=(lo)=>lo*Math.PI/180,d=1,n=1,m=1,i=Math.sqrt(l**2+c**2),z=Math.sqrt(r**2+f**2),k=(i+z)/2,A=0.5*(1-Math.sqrt(k**7/(k**7+6103515625))),h=l*(1+A),H=r*(1+A),Q=Math.sqrt(h**2+c**2),N=Math.sqrt(H**2+f**2),Z=c===0&&h===0?0:w(Math.atan2(c,h))%360,Y=f===0&&H===0?0:w(Math.atan2(f,H))%360,t=g-s,_=N-Q,D=0;if(Q*N!==0){if(D=Y-Z,D>180)D-=360;else if(D<-180)D+=360}let v=2*Math.sqrt(Q*N)*Math.sin(u(D)/2),x=(s+g)/2,e=(Q+N)/2,L=(Z+Y)/2;if(Math.abs(Z-Y)>180)L+=180;let Fo=1-0.17*Math.cos(u(L-30))+0.24*Math.cos(u(2*L))+0.32*Math.cos(u(3*L+6))-0.2*Math.cos(u(4*L-63)),qo=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),uo=1+0.045*e,bo=1+0.015*e*Fo,Bo=30*Math.exp((-((L-275)/25))**2),Wo=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(u(2*Bo));return Math.sqrt((t/(1*qo))**2+(_/(1*uo))**2+(v/(1*bo))**2+Wo*(_/(1*uo))*(v/(1*bo)))-t*a}var V=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],j=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function go(o){if(o===0)return"transparent";let p=V[o],a=`oklab(${p[0]*100}% ${p[1]} ${p[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",a))return a;let[s=0,l=0,c=0]=(j[o]??"0,0,0").split(",").map((g)=>Number.parseInt(g,10));return`rgb(${s} ${l} ${c})`}var Ho=`<div class="wtopbar">
  <button
    class="open-edit"
    type="button"
    data-i18n-title="editImage"
    data-i18n-aria-label="editImage"
  >
    <i class="icon fa-solid fa-sliders" aria-hidden="true"></i>
  </button>
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
  <dialog class="kgm-modal image-edit-dialog">
    <div class="kgm-modal-head image-edit-dialog-head">
      <strong data-i18n="imageEditTitle">Image settings</strong>
      <button
        class="modal-close close-edit"
        type="button"
        aria-label="Close"
        data-i18n-aria-label="close"
      >
        <i class="icon fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
    <label><span data-i18n="brightness">Brightness</span>:&nbsp;<input class="brightness" type="number" step="0.1"/></label>
    <label>
      <input type="checkbox" class="dithering" />&nbsp;<span data-i18n="dithering">Dithering</span>
    </label>
  </dialog>
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
`;class G{bot;image;width;brightness;exactColor;dithering;static async fromJSON(o,p){let a=new Image;return a.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((s)=>s.blob()).then((s)=>URL.createObjectURL(s)):p.url,await W(a,["load"],["error"]),new G(o,a,p.width,p.brightness,p.exactColor,p.dithering)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,a=p.naturalWidth,s=0,l=!1,c=!1){this.bot=o;this.image=p;this.width=a;this.brightness=s;this.exactColor=l;this.dithering=c;if(l)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let a=1;a<64;a++)if(this.exactColor||!this.bot.unavailableColors.has(a))o.set(j[a],[a,a]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let a=0;a<this.canvas.height;a++)for(let s=0;s<this.canvas.width;s++){let l=(a*this.canvas.width+s)*4,c=p[l],g=p[l+1],r=p[l+2],f=p[l+3],w=this.dithering?this.ditherOffset(s,a):0,u=this.clampByte(c+w),d=this.clampByte(g+w),n=this.clampByte(r+w),m=`${u},${d},${n}`;if(this.exactColor){this.pixels[a][s]=f<100?0:j.indexOf(m);continue}let i,z;if(f<100)i=z=0;else if(o.has(m))[i,z]=o.get(m);else{let A=1/0,h=1/0;for(let H=0;H<V.length;H++){let Q=V[H],N=zo(mo(u,d,n),Q,this.brightness);if(!this.bot.unavailableColors.has(H)&&N<A)A=N,i=H;if(N<h)h=N,z=H}o.set(m,[i,z])}if(i!==0)this.context.fillStyle=`oklab(${V[i][0]*100}% ${V[i][1]} ${V[i][2]})`,this.context.fillRect(s,a,1,1);this.pixels[a][s]=i;let k=this.colors.get(z);if(k)k.amount++;else this.colors.set(z,{color:i,amount:1,realColor:z})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor,dithering:this.dithering}}ditherOffset(o,p){return[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]][p%4][o%4]-8}clampByte(o){return Math.max(0,Math.min(255,o|0))}}var T="kglacer-macro-settings",Mo=["kglacermacro","wbot"],$="kgm";function Co(){let o=[T,...Mo];for(let p=0;p<o.length;p++){let a=o[p],s=localStorage.getItem(a);if(!s)continue;return{json:s,key:a}}return}function ho(){let o=Co();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let a=p;p.images=a.widget.images,p.strategy=a.widget.strategy,delete a.widget}if(o.key!==T)localStorage.setItem(T,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Ao;function J(o,p=!1){if(clearTimeout(Ao),p)localStorage.setItem(T,JSON.stringify(o));else Ao=setTimeout(()=>{localStorage.setItem(T,JSON.stringify(o))},600)}var M=1000,Ro=2048,E=M*Ro,B=[],S=[],Lo=Date.now();function I(o){B.push(o),S.push({id:Lo++,latitude:(2*Math.atan(Math.exp(-(o.y/E*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/E*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:E/3|0,y:E/3|0});I({x:E/3*2|0,y:E/3*2|0});function C(o){let[p,a]=o.style.transform.slice(32,-31).split(", ").map((s)=>Number.parseFloat(s));return{x:p,y:a}}class P{bot;static fromJSON(o,p){return new P(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:a,pixelSize:s,anchorWorldPosition:l}=o.findAnchorsForScreen(p);return new P(o,l.x+(p.x-a.x)/s|0,l.y+(p.y-a.y)/s|0)}globalX=0;globalY=0;get tileX(){return this.globalX/M|0}set tileX(o){this.globalX=o*M+this.x}get tileY(){return this.globalY/M|0}set tileY(o){this.globalY=o*M+this.y}get x(){return this.globalX%M}set x(o){this.globalX=this.tileX*M+o}get y(){return this.globalY%M}set y(o){this.globalY=this.tileY*M+o}anchor1Index;anchor2Index;get pixelSize(){return(C(this.bot.$stars[this.anchor2Index]).x-C(this.bot.$stars[this.anchor1Index]).x)/(B[this.anchor2Index].x-B[this.anchor1Index].x)}constructor(o,p,a,s,l){this.bot=o;if(s===void 0||l===void 0)this.globalX=p,this.globalY=a;else this.globalX=p*M+s,this.globalY=a*M+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let a=0;a<B.length;a++){let{x:s,y:l}=B[a];if(s<this.globalX&&l<this.globalY){let c=this.globalX-s+(this.globalY-l);if(c<o)o=c,this.anchor1Index=a}else if(s>this.globalX&&l>this.globalY){let c=s-this.globalX+(l-this.globalY);if(c<p)p=c,this.anchor2Index=a}}}toScreenPosition(){let o=B[this.anchor1Index],p=C(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new P(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class R extends O{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new R(o,P.fromJSON(o,p.position),await G.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openEdit;$openPreview;$closeColors;$closePreview;$closeEdit;$delete;$dithering;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$editDialog;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,p,a,s="SPIRAL_FROM_CENTER",l=50,c=!1,g=!1,r=[],f=!1){super();this.bot=o;this.position=p;this.pixels=a;this.strategy=s;this.opacity=l;this.drawTransparentPixels=c;this.drawColorsInOrder=g;this.colors=r;this.lock=f;this.element.innerHTML=Ho,this.element.classList.add("wimage"),q(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openEdit:".open-edit",$openPreview:".open-preview",$closeColors:".close-colors",$closeEdit:".close-edit",$closePreview:".close-preview",$delete:".delete",$dithering:".dithering",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$editDialog:".image-edit-dialog",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$editDialog,this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();J(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),J(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let w;this.registerEvent(this.$brightness,"input",()=>{clearTimeout(w),w=setTimeout(()=>{this.refreshImageAdjustments()},150)}),this.registerEvent(this.$dithering,"change",()=>{this.pixels.dithering=this.$dithering.checked,this.refreshImageAdjustments()}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),J(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,J(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,J(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),J(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openEdit,"click",()=>{this.openEditPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$closeEdit,"click",()=>{this.closeDialog(this.$editDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$editDialog,"click",(u)=>{if(u.target===this.$editDialog)this.closeDialog(this.$editDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}refreshImageAdjustments(){this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),J(this.bot)}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,a=new Map;for(let s=0;s<this.colors.length;s++){let l=this.colors[s];if(l.disabled)p.add(l.realColor);a.set(l.realColor,s)}for(let{x:s,y:l}of this.strategyPositionIterator()){let c=this.pixels.pixels[l][s];if(p.has(c))continue;o.globalX=this.position.globalX+s,o.globalY=this.position.globalY+l;let g=o.getMapColor();if(c!==g&&(this.drawTransparentPixels||c!==0))this.tasks.push({position:o.clone(),color:c})}if(this.drawColorsInOrder)this.tasks.sort((s,l)=>(a.get(s.color)??0)-(a.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),a=this.position.pixelSize*this.pixels.width,s=this.position.pixelSize*this.pixels.height;this.element.style.transform=`translate3d(${o.toFixed(3)}px, ${p.toFixed(3)}px, 0)`,this.element.style.width=`${a}px`,this.element.style.height=`${s}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$dithering.checked=this.pixels.dithering,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,c=Math.max(0,l-this.tasks.length),g=l>0?c/l*100|0:0;this.$progressText.textContent=`${c}/${l} ${g}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${g/100})`,this.$canvas.classList[this.lock?"add":"remove"]("no-pointer-events");for(let r of this.element.querySelectorAll(".resize"))r.classList[this.lock?"add":"remove"]("no-pointer-events");this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$editDialog.remove(),this.$previewDialog.remove(),po(this.bot.images,this),this.bot.widget.update(),J(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}openEditPanel(){if(this.$editDialog.open){this.$brightness.focus();return}this.$editDialog.style.position="fixed",this.$editDialog.style.left="",this.$editDialog.style.top="",this.$editDialog.style.margin="auto",this.$editDialog.showModal(),this.$brightness.focus()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let a=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-a.left,offsetY:o.clientY-a.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),a=Math.max(8,window.innerWidth-p.width-8),s=Math.max(8,window.innerHeight-p.height-8),l=Math.min(a,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),c=Math.min(s,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(c)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let p=document.createDocumentFragment(),a=document.createElement("article");a.className="preview-card";let s=document.createElement("strong");s.textContent=this.getStrategyLabel(o);let l=document.createElement("canvas");l.className="preview-canvas",l.width=156,l.height=156,this.paintStrategyPreview(l,o),a.append(s,l),p.append(a),this.$previewDialogList.append(p)}invalidatePreviewCacheIfNeeded(){let o=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}`;if(this.previewCacheSignature===o)return;this.previewCacheSignature=o,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return b("random");case"HUMANIZED":return b("humanized");case"HUMAN_SOFT_DITHER":return b("humanSoftDither");case"HUMAN_PATCHY":return b("humanPatchy");case"HUMAN_SWEEP_ARCS":return b("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return b("humanMicroCorrections");case"HUMAN_JITTER_FILL":return b("humanJitterFill");case"HUMAN_CORNER_BIAS":return b("humanCornerBias");case"HUMAN_LONG_STROKES":return b("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return b("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return b("humanMessySpiral");case"HUMAN_DRUNK_WALK":return b("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return b("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return b("humanPatchJump");case"HUMAN_HESITANT_LINES":return b("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return b("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return b("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return b("humanGapRecovery");case"HUMAN_STAIRCASE":return b("humanStaircase");case"HUMAN_EDGE_HUGGER":return b("humanEdgeHugger");case"HUMAN_BLOBS":return b("humanBlobs");case"HUMAN_BACKTRACK":return b("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return b("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return b("humanLateFixes");case"ZIGZAG":return b("zigzag");case"BRUSH_STROKES":return b("brushStrokes");case"DIAGONAL_BRUSH":return b("diagonalBrush");case"DOWN":return b("down");case"UP":return b("up");case"LEFT":return b("left");case"RIGHT":return b("right");case"SPIRAL_FROM_CENTER":return b("spiralOut");case"SPIRAL_TO_CENTER":return b("spiralIn");case"SCRIBBLE":return b("scribble");case"CROSSHATCH":return b("crosshatch");case"WAVE_SWEEP":return b("waveSweep");case"SCATTERED_LINES":return b("scatteredLines");case"CONTOUR_JITTER":return b("contourJitter");case"SPIRAL_WOBBLE":return b("spiralWobble");case"CLUSTER_BURSTS":return b("clusterBursts");case"ORBITAL":return b("orbital");case"FLOW_FIELD":return b("flowField");case"EDGE_IN":return b("edgeIn");default:return o}}paintStrategyPreview(o,p){let a=o.getContext("2d");if(!a)return;a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);let s=this.getImagePreviewMask(),l=this.getCachedPreviewSequence(p,s),c=Math.min(o.width/this.pixels.width,o.height/this.pixels.height),g=(o.width-this.pixels.width*c)/2,r=(o.height-this.pixels.height*c)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let w=(k)=>{let A=requestAnimationFrame((h)=>{this.previewAnimationHandles.delete(A),k(h)});return this.previewAnimationHandles.add(A),A},u=(k)=>{a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);for(let A=0;A<Math.min(k,l.length);A++){let h=l[A],H=this.pixels.pixels[h.y]?.[h.x]??0;if(!H)continue;a.fillStyle=go(H),a.fillRect(g+h.x*c,r+h.y*c,Math.max(1,c),Math.max(1,c))}},d=Math.min(3400,Math.max(900,l.length*8)),m=d+220,i=(k,A)=>{if(!this.$previewDialog.open)return;let h=(A-k)%m,H=Math.min(1,h/d),Q=H*H*(3-2*H);u(Math.floor(l.length*Q));let N=w((Z)=>{i(k,Z)});this.previewAnimations.set(o,N)},z=performance.now();i(z,z)}getCachedPreviewSequence(o,p){let a=`${o}:${this.pixels.width}x${this.pixels.height}:${p.length}`,s=this.previewSequenceCache.get(a);if(s)return s;let l=this.strategy;this.strategy=o;let c=[...this.strategyPositionIterator()];this.strategy=l;let g=new Set(p.map(({x:f,y:w})=>`${f}:${w}`)),r=c.filter(({x:f,y:w})=>g.has(`${f}:${w}`));return this.previewSequenceCache.set(a,r),r}getImagePreviewMask(){let o=this.pixels.width,p=this.pixels.height,a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)if((this.pixels.pixels[s]?.[l]??0)!==0)a.push({x:l,y:s});return a.length?a:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,a=this.pixels.height/2,s=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let l=0;l<this.pixels.height;l++)for(let c=0;c<this.pixels.width;c++)if((c-p)**2+(l-a)**2<=s**2)o.push({x:c,y:l});return o}applyLocale(){if(q(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=j[o]??"0,0,0",[a=0,s=0,l=0]=p.split(",").map((c)=>Number.parseInt(c,10));return`#${[a,s,l].map((c)=>c.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=j[o]??"0,0,0",[a=0,s=0,l=0]=p.split(",").map((f)=>Number.parseInt(f,10)),c=Math.max(a,s,l),g=Math.min(a,s,l);if(c-g<15)return["gray","grey","gris","neutral","neutro"];if(a>s+30&&a>l+30)return["red","rojo"];if(s>a+30&&s>l+30)return["green","verde"];if(l>a+30&&l>s+30)return["blue","azul"];if(a>170&&s>120&&l<130)return["orange","naranja"];if(a>170&&s>110&&l>140)return["pink","rosa"];if(a>120&&s<100&&l>120)return["purple","violet","morado"];if(a>130&&s>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",b("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((a)=>!this.pixels.colors.has(a.realColor)))this.colors=this.pixels.colors.values().toArray().sort((a,s)=>s.amount-a.amount).map((a)=>({realColor:a.realColor,disabled:!1})),J(this.bot);for(let a=0;a<this.colors.length;a++){let s=this.colors[a],l=this.pixels.colors.get(s.realColor),c=!1,g=l.realColor!==l.color,r=l.amount/o*100,f=this.colorHex(l.realColor),w=this.colorKeywords(l.realColor),u=()=>{s.disabled=s.disabled?void 0:!0,d.classList.toggle("disabled",Boolean(s.disabled));let m=d.querySelector(".state");if(m)m.textContent=s.disabled?b("disabled"):b("enabled");J(this.bot)},d=document.createElement("button");if(d.className=`color-chip ${s.disabled?"disabled":""}`,d.draggable=!0,d.setAttribute("aria-label",`${b("overlayColors")} #${a+1}: ${f.toUpperCase()}`),d.innerHTML=`<span class="order-index">#${a+1}</span>
<span class="drag" title="${b("up")} / ${b("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${r.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${s.disabled?b("disabled"):b("enabled")}</span>
</span>
<span class="premium ${g?"on":""}">${g?b("premium"):""}</span>`,d.querySelector(".swatch").style.setProperty("--swatch-color",go(l.realColor)),d.addEventListener("click",()=>{if(c){c=!1;return}u()}),d.addEventListener("dragstart",(m)=>{c=!0,d.classList.add("dragging"),m.dataTransfer?.setData("text/plain",String(a)),m.dataTransfer.effectAllowed="move"}),d.addEventListener("dragend",()=>{d.classList.remove("dragging")}),d.addEventListener("dragover",(m)=>{m.preventDefault(),d.classList.add("drag-target")}),d.addEventListener("dragleave",()=>{d.classList.remove("drag-target")}),d.addEventListener("drop",(m)=>{m.preventDefault(),d.classList.remove("drag-target");let i=Number.parseInt(m.dataTransfer?.getData("text/plain")??"-1",10);if(i<0||i===a||i>=this.colors.length)return;this.colors.splice(a,0,...this.colors.splice(i,1)),J(this.bot),this.updateColors()}),g){let m=document.createElement("button");m.textContent=b("buy"),m.className="buy-chip",m.addEventListener("click",(i)=>{i.stopPropagation(),document.getElementById("color-"+l.realColor)?.click()}),d.append(m)}let n=`${f} ${w.join(" ")} ${l.realColor} ${j[l.realColor]}`;if(!p||n.toLowerCase().includes(p))this.$colorsDialogList.append(d)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let a=0;a<p;a++)for(let s=0;s<o;s++)yield{x:s,y:a};break}case"UP":{for(let a=p-1;a>=0;a--)for(let s=0;s<o;s++)yield{x:s,y:a};break}case"LEFT":{for(let a=0;a<o;a++)for(let s=0;s<p;s++)yield{x:a,y:s};break}case"RIGHT":{for(let a=o-1;a>=0;a--)for(let s=0;s<p;s++)yield{x:a,y:s};break}case"RANDOM":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)a.push({x:l,y:s});for(let s=a.length-1;s>=0;s--){let l=Math.floor(Math.random()*(s+1)),c=a[s];a[s]=a[l],a[l]=c}yield*a;break}case"ZIGZAG":{for(let a=0;a<p;a++)if(a%2===0)for(let s=0;s<o;s++)yield{x:s,y:a};else for(let s=o-1;s>=0;s--)yield{x:s,y:a};break}case"HUMANIZED":{let a=Math.max(4,Math.floor(Math.min(o,p)/10)),s=[];for(let l=0;l<p;l+=a)for(let c=0;c<o;c+=a)s.push({x:c,y:l});for(let l=s.length-1;l>=0;l--){let c=Math.floor(Math.random()*(l+1)),g=s[l];s[l]=s[c],s[c]=g}for(let l=0;l<s.length;l++){let c=s[l],g=Math.min(p,c.y+a),r=Math.min(o,c.x+a);for(let f=c.y;f<g;f++)if(Math.random()>0.35)for(let u=c.x;u<r;u++)yield{x:u,y:f};else for(let u=r-1;u>=c.x;u--)yield{x:u,y:f}}break}case"HUMAN_SOFT_DITHER":{let a=new Set;for(let s=0;s<p;s++){let l=Math.floor(Math.random()*3)-1;if((s+l)%2===0)for(let g=0;g<o;g+=2)a.add(`${g},${s}`),yield{x:g,y:s};else for(let g=1;g<o;g+=2)a.add(`${g},${s}`),yield{x:g,y:s}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_PATCHY":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),g=1+Math.floor(Math.random()*5);for(let r=c-g;r<=c+g;r++)for(let f=l-g;f<=l+g;f++){if(f<0||f>=o||r<0||r>=p)continue;if(Math.hypot(f-l,r-c)>g+Math.random()*1.2)continue;let w=`${f},${r}`;if(a.has(w))continue;a.add(w),yield{x:f,y:r}}}break}case"HUMAN_SWEEP_ARCS":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.hypot(s,l);for(let g=0;g<4;g++){let r=Math.random()*Math.PI*2;for(let f=0;f<=c;f+=0.35){let w=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(f*8));for(let d=0;d<u;d++){let n=r+w*d/u+Math.sin(f)*0.08,m=Math.round(s+Math.cos(n)*f),i=Math.round(l+Math.sin(n)*f);if(m<0||m>=o||i<0||i>=p)continue;let z=`${m},${i}`;if(a.has(z))continue;a.add(z),yield{x:m,y:i}}}}for(let g=0;g<p;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(a.has(f))continue;yield{x:r,y:g}}break}case"HUMAN_MICRO_CORRECTIONS":{let a=new Set;for(let s=0;s<p;s++){let l=s%2===0?1:-1,c=l>0?0:o-1;for(let g=0;g<o;g++){let r=c+(Math.random()>0.82?l:0),f=s+(Math.random()>0.9?1:0);for(let w of[{x:c,y:s},{x:r,y:s},{x:c,y:f}]){if(w.x<0||w.x>=o||w.y<0||w.y>=p)continue;let u=`${w.x},${w.y}`;if(a.has(u))continue;a.add(u),yield w}c+=l}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_JITTER_FILL":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)a.push({x:l,y:s});a.sort((s,l)=>{let c=s.y+(Math.random()-0.5)*1.8,g=l.y+(Math.random()-0.5)*1.8;if(c!==g)return c-g;return s.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*a;break}case"HUMAN_CORNER_BIAS":{let a=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],s=a[Math.floor(Math.random()*a.length)],l=[];for(let c=0;c<p;c++)for(let g=0;g<o;g++){let f=Math.hypot(g-s.x,c-s.y)+Math.random()*3.5;l.push({point:{x:g,y:c},score:f})}l.sort((c,g)=>c.score-g.score);for(let c of l)yield c.point;break}case"HUMAN_LONG_STROKES":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),g=Math.random()*Math.PI*2,r=Math.sign(Math.cos(g)),f=Math.sign(Math.sin(g)),w=10+Math.floor(Math.random()*40);for(let u=0;u<w;u++){if(l<0||l>=o||c<0||c>=p)break;let d=`${l},${c}`;if(!a.has(d))a.add(d),yield{x:l,y:c};if(Math.random()>0.78)l+=f,c+=r;else l+=r,c+=f}}break}case"HUMAN_TAP_CLUSTERS":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),g=3+Math.floor(Math.random()*10);for(let r=0;r<g;r++){let f=Math.round(l+(Math.random()-0.5)*6),w=Math.round(c+(Math.random()-0.5)*6);if(f<0||f>=o||w<0||w>=p)continue;let u=`${f},${w}`;if(a.has(u))continue;a.add(u),yield{x:f,y:w}}}break}case"HUMAN_MESSY_SPIRAL":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.hypot(s,l)+2;for(let g=0;a.size<o*p;g++){let r=g/3,f=Math.min(c,r*0.18),w=r*0.29+Math.sin(r*0.13)*0.8,u=Math.round(s+Math.cos(w)*f+Math.sin(r)*0.7),d=Math.round(l+Math.sin(w)*f+Math.cos(r)*0.7);if(u<0||u>=o||d<0||d>=p){if(g>o*p*18)break;continue}let n=`${u},${d}`;if(a.has(n)){if(Math.random()>0.9)continue}else a.add(n),yield{x:u,y:d};if(g>o*p*18)break}for(let g=0;g<p;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(a.has(f))continue;yield{x:r,y:g}}break}case"HUMAN_DRUNK_WALK":{let a=new Set,s=Math.floor(Math.random()*o),l=Math.floor(Math.random()*p),c=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(a.size<o*p){let g=`${s},${l}`;if(!a.has(g))a.add(g),yield{x:s,y:l};let r=[];for(let u of c){let d=s+u.x,n=l+u.y;if(d<0||d>=o||n<0||n>=p)continue;r.push({x:d,y:n})}if(!r.length)break;let f=r.filter((u)=>{return!a.has(`${u.x},${u.y}`)});if(f.length&&Math.random()>0.2){let u=f[Math.floor(Math.random()*f.length)];s=u.x,l=u.y;continue}let w=r[Math.floor(Math.random()*r.length)];s=w.x,l=w.y}for(let g=0;g<p;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(a.has(f))continue;yield{x:r,y:g}}break}case"HUMAN_NOISE_CLOUD":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((s+1)*1.17+Math.random()*0.8),g=(Math.random()-0.5)*2.6,r=Math.hypot(l-o/2,s-p/2)*0.08;a.push({point:{x:l,y:s},score:c+g+r})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_PATCH_JUMP":{let a=new Set,s=[];for(let l=0;l<Math.max(6,o*p/18);l++)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(a.size<o*p){let l=s[Math.floor(Math.random()*s.length)],c=1+Math.floor(Math.random()*3),g=1+Math.floor(Math.random()*3);for(let r=l.y-g;r<=l.y+g;r++)for(let f=l.x-c;f<=l.x+c;f++){if(f<0||f>=o||r<0||r>=p)continue;if(Math.random()>0.86)continue;let w=`${f},${r}`;if(a.has(w))continue;a.add(w),yield{x:f,y:r}}if(Math.random()>0.72&&s.length<o*p/2)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(a.size>o*p*0.92)break}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;yield{x:c,y:l}}break}case"HUMAN_HESITANT_LINES":{let a=new Set;for(let s=0;s<p;s++){let l=s%2===0;for(let c=0;c<o;c++){let g=l?c:o-1-c,r=`${g},${s}`;if(!a.has(r))a.add(r),yield{x:g,y:s};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,g+(Math.random()>0.5?1:-1))),w=Math.max(0,Math.min(p-1,s+(Math.random()>0.65?1:0))),u=`${f},${w}`;if(!a.has(u))a.add(u),yield{x:f,y:w}}}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_OVERLAP_SWEEPS":{let a=[],s=Math.random()*Math.PI*2;for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=Math.sin((c+l)*0.42+s)*2.2,r=Math.cos((c-l)*0.3+s)*1.4;a.push({point:{x:c,y:l},score:l+g+r+(Math.random()-0.5)*3.4})}a.sort((l,c)=>l.score-c.score);for(let l of a)yield l.point;break}case"HUMAN_WOBBLE_DRIFT":{let a=[],s=o/2,l=p/2;for(let c=0;c<p;c++)for(let g=0;g<o;g++){let r=Math.hypot(g-s,c-l)*0.25,f=Math.sin((g+1)*0.9)*1.8+Math.cos((c+1)*1.1)*1.8+Math.sin((g+c)*0.35)*1.4;a.push({point:{x:g,y:c},score:r+f+(Math.random()-0.5)*2.8})}a.sort((c,g)=>c.score-g.score);for(let c of a)yield c.point;break}case"HUMAN_GAP_RECOVERY":{let a=new Set,s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++){if(Math.random()>0.87){s.push({x:c,y:l});continue}a.add(`${c},${l}`),yield{x:c,y:l}}s.sort((l,c)=>Math.hypot(l.x-o/2,l.y-p/2)-Math.hypot(c.x-o/2,c.y-p/2));for(let l of s){let c=`${l.x},${l.y}`;if(a.has(c))continue;a.add(c),yield l}break}case"HUMAN_STAIRCASE":{let a=new Set,s=o+p-1;for(let l=0;l<s;l++){let c=Math.max(0,l-o+1),g=Math.min(p-1,l);for(let r=c;r<=g;r++){let f=l-r,w=[{x:f,y:r},{x:f+(Math.random()>0.5?1:-1),y:r},{x:f,y:r+(Math.random()>0.5?1:-1)}];for(let u of w){if(u.x<0||u.x>=o||u.y<0||u.y>=p)continue;let d=`${u.x},${u.y}`;if(a.has(d))continue;a.add(d),yield u}}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;yield{x:c,y:l}}break}case"HUMAN_EDGE_HUGGER":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.min(l,s,o-1-l,p-1-s);a.push({point:{x:l,y:s},score:c*3.5+(Math.random()-0.5)*5.5})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_BLOBS":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),g=1+Math.floor(Math.random()*4);for(let r=c-g;r<=c+g;r++)for(let f=l-g;f<=l+g;f++){if(f<0||f>=o||r<0||r>=p)continue;let w=Math.atan2(r-c,f-l),u=g+Math.sin(w*3+Math.random())*0.8;if(Math.hypot(f-l,r-c)>u)continue;let d=`${f},${r}`;if(a.has(d))continue;a.add(d),yield{x:f,y:r}}}break}case"HUMAN_BACKTRACK":{let a=new Set,s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++)s.push({x:c,y:l});s.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*2.2+(l.x-c.x)*0.04);for(let l=0;l<s.length;l++){let c=s[l],g=`${c.x},${c.y}`;if(a.has(g))continue;if(a.add(g),yield c,l>1&&Math.random()>0.74){let r=s[l-1],f=`${r.x},${r.y}`;if(!a.has(f))a.add(f),yield r}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;yield{x:c,y:l}}break}case"HUMAN_SHAKY_DIAGONAL":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.abs(l-s)*0.6,g=Math.sin(l*1.4+s*0.8)*1.8+Math.cos(s*1.1+l*0.5)*1.5;a.push({point:{x:l,y:s},score:c+g+(Math.random()-0.5)*3.2})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_LATE_FIXES":{let a=[],s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++)if(Math.random()>0.9)s.push({x:c,y:l});else a.push({x:c,y:l});a.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?l.x-c.x:0)),s.sort((l,c)=>Math.hypot(c.x-o/2,c.y-p/2)-Math.hypot(l.x-o/2,l.y-p/2)),yield*a,yield*s;break}case"DIAGONAL_BRUSH":{for(let a=0;a<o+p-1;a++){let s=a%2===0,l=[],c=Math.max(0,a-o+1),g=Math.min(p-1,a);for(let r=c;r<=g;r++){let f=a-r;if(f>=0&&f<o)l.push({x:f,y:r})}if(Math.random()>0.55)l.reverse();if(s)for(let r=l.length-1;r>=0;r--)yield l[r];else yield*l}break}case"BRUSH_STROKES":{let a=Array.from({length:p},()=>Array(o).fill(!1)),s=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(r,f)=>r>=0&&r<o&&f>=0&&f<p,c=0,g=o*p;for(let r=0;r<g*6&&c<g;r++){let f=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),u=s[Math.floor(Math.random()*s.length)],d=3+Math.floor(Math.random()*16);for(let n=0;n<d;n++){if(!l(f,w))break;if(!a[w][f])a[w][f]=!0,c++,yield{x:f,y:w};if(Math.random()>0.72)u=s[Math.floor(Math.random()*s.length)];f+=u.x,w+=u.y}}for(let r=0;r<p;r++)for(let f=0;f<o;f++)if(!a[r][f])yield{x:f,y:r};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let a=new Set,s=o*p,l=Math.floor(o/2),c=Math.floor(p/2),g=[[1,0],[0,1],[-1,0],[0,-1]],r=0,f=1,w=(d,n)=>d>=0&&d<o&&n>=0&&n<p,u=function*(){let d=0;while(d<s){for(let n=0;n<2;n++){for(let m=0;m<f;m++){if(w(l,c)){let i=`${l},${c}`;if(!a.has(i)){if(a.add(i),yield{x:l,y:c},d++,d>=s)return}}l+=g[r][0],c+=g[r][1]}r=(r+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let d=[...u()];for(let n=d.length-1;n>=0;n--)yield d[n]}break}case"SCRIBBLE":{let a=new Set,s=o*p,l=Math.floor(o/2),c=Math.floor(p/2);for(let g=0;a.size<s&&g<s*24;g++){let r=`${l},${c}`;if(!a.has(r))a.add(r),yield{x:l,y:c};if(l+=Math.floor(Math.random()*3)-1,c+=Math.floor(Math.random()*3)-1,l<0||l>=o||c<0||c>=p)l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p)}for(let g=0;g<p;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(a.has(f))continue;a.add(f),yield{x:r,y:g}}break}case"CROSSHATCH":{let a=[];for(let c=0;c<o+p-1;c++)for(let g=Math.max(0,c-o+1);g<=Math.min(p-1,c);g++){let r=c-g;a.push({x:r,y:g})}let s=[];for(let c=-p+1;c<o;c++)for(let g=0;g<p;g++){let r=g+c;if(r>=0&&r<o)s.push({x:r,y:g})}let l=new Set;for(let c of[...a,...s]){let g=`${c.x},${c.y}`;if(l.has(g))continue;l.add(g),yield c}break}case"WAVE_SWEEP":{let a=new Set;for(let s=0;s<o;s++){let c=(Math.sin(s/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let g=0;g<p;g++){let r=c+g,f=c-g;for(let w of[r,f]){if(w<0||w>=p)continue;let u=`${s},${w}`;if(a.has(u))continue;a.add(u),yield{x:s,y:w}}}}break}case"SCATTERED_LINES":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*14;l++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),r=Math.random()*Math.PI*2,f=Math.round(Math.cos(r)),w=Math.round(Math.sin(r)),u=6+Math.floor(Math.random()*28);for(let d=0;d<u;d++){if(c<0||c>=o||g<0||g>=p)break;let n=`${c},${g}`;if(!a.has(n))a.add(n),yield{x:c,y:g};c+=f,g+=w}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;a.add(g),yield{x:c,y:l}}break}case"CONTOUR_JITTER":{let a=new Set;for(let s=0;s<Math.ceil(Math.min(o,p)/2);s++){let l=[],c=s,g=s,r=o-s-1,f=p-s-1;for(let w=c;w<=r;w++)l.push({x:w,y:g});for(let w=g+1;w<=f;w++)l.push({x:r,y:w});for(let w=r-1;w>=c;w--)l.push({x:w,y:f});for(let w=f-1;w>g;w--)l.push({x:c,y:w});for(let w=l.length-1;w>0;w--){let u=Math.floor(Math.random()*(w+1)),d=l[w];l[w]=l[u],l[u]=d}for(let w of l){let u=`${w.x},${w.y}`;if(a.has(u))continue;a.add(u),yield w}}break}case"SPIRAL_WOBBLE":{let a=new Set,s=o/2,l=p/2,c=Math.hypot(s,l);for(let g=0;a.size<o*p&&g<o*p*9;g++){let r=g/(o*p*9)*c,f=g*0.31+Math.sin(g*0.07)*0.7,w=Math.round(s+Math.cos(f)*r),u=Math.round(l+Math.sin(f)*r);if(w<0||w>=o||u<0||u>=p)continue;let d=`${w},${u}`;if(a.has(d))continue;a.add(d),yield{x:w,y:u}}for(let g=0;g<p;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(a.has(f))continue;yield{x:r,y:g}}break}case"CLUSTER_BURSTS":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*12;l++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p),r=2+Math.floor(Math.random()*10);for(let f=g-r;f<=g+r;f++)for(let w=c-r;w<=c+r;w++){if(w<0||w>=o||f<0||f>=p)continue;if(Math.hypot(w-c,f-g)>r)continue;let u=`${w},${f}`;if(a.has(u))continue;a.add(u),yield{x:w,y:f}}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;a.add(g),yield{x:c,y:l}}break}case"ORBITAL":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.ceil(Math.max(s,l));for(let g=0;g<=c;g++){let r=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,g)*2));for(let f=0;f<r;f++){let w=f/r*Math.PI*2+(g%2?0.3:-0.3),u=Math.round(s+Math.cos(w)*g),d=Math.round(l+Math.sin(w)*g);if(u<0||u>=o||d<0||d>=p)continue;let n=`${u},${d}`;if(a.has(n))continue;a.add(n),yield{x:u,y:d}}}for(let g=0;g<p;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(a.has(f))continue;yield{x:r,y:g}}break}case"FLOW_FIELD":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*18;l++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*p);for(let r=0;r<120;r++){if(c<0||c>=o||g<0||g>=p)break;let f=`${c},${g}`;if(!a.has(f))a.add(f),yield{x:c,y:g};let w=Math.sin(c*0.09)*1.8+Math.cos(g*0.08)*1.6+Math.sin((c+g)*0.05);c+=Math.round(Math.cos(w)),g+=Math.round(Math.sin(w))}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let g=`${c},${l}`;if(a.has(g))continue;a.add(g),yield{x:c,y:l}}break}case"EDGE_IN":{let a=new Set,s=Math.ceil(Math.min(o,p)/2);for(let l=0;l<s;l++){let c=l,g=o-1-l,r=l,f=p-1-l;for(let w=c;w<=g;w++)for(let u of[r,f]){let d=`${w},${u}`;if(a.has(d))continue;a.add(d),yield{x:w,y:u}}for(let w=r+1;w<=f-1;w++)for(let u of[c,g]){let d=`${u},${w}`;if(a.has(d))continue;a.add(d),yield{x:u,y:w}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),J(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),a=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=a+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-a)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,a+this.moveInfo.height);this.update(),J(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${$}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var ko=`/* stylelint-disable declaration-no-important */
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
  align-items: center;
  justify-content: flex-start;
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
  align-self: center;
  justify-self: end;
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
  gap: 6px;
  overflow-y: auto;
  max-height: calc(100dvh - 92px);
  padding-bottom: 10px;
}

.wwidget .wform > * {
  margin: 4px;
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

.wtopbar button.open-edit {
  color: #9fc5ff;
  text-shadow: 0 0 12px rgb(159 197 255 / 35%);
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class ro extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var U={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0},clickPaintWhenReady:{key:"r",shift:!0}};function K(o,p){let a=p.key.toLowerCase(),s=o.key.toLowerCase(),c=a==="/"&&(s==="/"||s==="?"||o.code==="Slash")||s===a,g=p.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,r=p.ctrl===!0?!0:p.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(p.shift)&&g&&r&&o.altKey===Boolean(p.alt)}function Jo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var No=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <div class="widget-brand">
    <img class="widget-logo" src="" alt="KGlacer Macro logo" />
    <span class="widget-brand-text">KGlaceMacro</span>
  </div>
</div>
<div class="wform">
  <label><span data-i18n="language">Language</span>:&nbsp;<select class="locale">
    <option value="en">English</option>
    <option value="es">Español</option>
  </select></label>
  <div class="wprogress"><div></div><span></span></div>
  <div class="wp wstatus"></div>
  <button class="draw" disabled data-i18n="draw">Draw</button>
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
  <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
    <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
    <option value="ALL" data-i18n="all">All</option>
    <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
  </select></label>
  <div class="widget-actions">
    <strong data-i18n="overlaySection">Overlay</strong>
    <button class="toggle-overlay" data-i18n="toggleOverlay">Hide/show overlays</button>
  </div>
  <div class="images"></div>
  <button class="capture-template" disabled>
    <i class="fa-solid fa-camera" aria-hidden="true"></i>
    <span data-i18n="captureTemplate">Capture template</span>
  </button>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
`;var Po="kglacer-macro:overlay-hidden",So="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class fo extends O{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$captureTemplate;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=No,q(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=So,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=X(),this.$locale.addEventListener("change",()=>{oo(this.$locale.value),q(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run(b("taskAddingImage"),async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${$}`,o.click(),await W(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new ro(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let a,s=!1;if(p.name.endsWith(`.${$}`))a=await R.fromJSON(this.bot,JSON.parse(await p.text()));else{s=!0;let l=new FileReader;l.readAsDataURL(p),await W(l,["load"],["error"]);let c=await this.compressImageBeforeLoad(l.result),g=new Image;g.src=c,await W(g,["load"],["error"]),a=new R(this.bot,P.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new G(this.bot,g))}if(this.bot.images.push(a),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),a.updateTasks(),J(this.bot,!0),this.bot.updateTasks(),this.update(),s)a.openEditPanel()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run(b("taskCapturingMapImage"),async()=>{let o=await this.resolveCaptureBounds(),{minGlobalX:p,minGlobalY:a,maxGlobalX:s,maxGlobalY:l}=o,c=document.createElement("canvas");c.width=Math.max(1,s-p+1),c.height=Math.max(1,l-a+1);let g=c.getContext("2d");if(!g)throw new Error("Capture context unavailable");g.imageSmoothingEnabled=!1;let r=Math.floor(p/M),f=Math.floor(a/M),w=Math.floor(s/M),u=Math.floor(l/M),d=(w-r+1)*(u-f+1),n=0;for(let i=r;i<=w;i++)for(let z=f;z<=u;z++){this.status=`⌛ ${b("taskReadingTiles")} [${++n}/${d}]`;let k=await this.loadTileImage(i,z),A=i*M,h=z*M,H=Math.max(p,A),Q=Math.min(s,A+M-1),N=Math.max(a,h),Z=Math.min(l,h+M-1),Y=H-A,t=N-h,_=Q-H+1,D=Z-N+1,v=H-p,x=N-a;g.drawImage(k,Y,t,_,D,v,x,_,D)}let m=Date.now();await this.downloadCapture(c,"png",m),await this.downloadCapture(c,"webp",m)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,p,a){let s=p==="webp"?"image/webp":"image/png",l=await new Promise((r,f)=>{o.toBlob((w)=>{if(!w){f(new Error(`Failed to create ${p.toUpperCase()} capture file`));return}r(w)},s)}),c=URL.createObjectURL(l),g=document.createElement("a");g.href=c,g.download=`wplace-capture-${a}.${p}`,g.click(),URL.revokeObjectURL(c)}async loadTileImage(o,p){let a;for(let s=1;s<=3;s++)try{let l=await fetch(`https://backend.wplace.live/files/s0/tiles/${o}/${p}.png`,{cache:"no-store",credentials:"include"});if(!l.ok)throw new Error(`Tile fetch failed (${o}/${p})`);let c=await l.blob(),g=new Image,r=URL.createObjectURL(c);return g.src=r,await W(g,["load"],["error"]),URL.revokeObjectURL(r),g}catch(l){if(a=l,s<3)await new Promise((c)=>setTimeout(c,s*200))}throw a instanceof Error?a:new Error(`Tile fetch failed (${o}/${p})`)}async resolveCaptureBounds(){if(!confirm(`Capture mode:
OK = manual coordinates (tile/pixel)
Cancel = select area on map`))return this.selectCaptureBounds();return this.selectCaptureBoundsFromCoordinates()}selectCaptureBoundsFromCoordinates(){let o=prompt("Top-left corner (tileX,tileY,pixelX,pixelY). Example: 120,340,1,1");if(!o)throw new Error("Capture cancelled");let p=prompt("Bottom-right corner (tileX,tileY,pixelX,pixelY). Example: 121,341,1000,1000");if(!p)throw new Error("Capture cancelled");let a=this.parseTilePixelCoordinate(o),s=this.parseTilePixelCoordinate(p);if(s.tileX<a.tileX||s.tileY<a.tileY||s.tileX===a.tileX&&s.tileY===a.tileY&&(s.pixelX<a.pixelX||s.pixelY<a.pixelY))throw new Error("Invalid coordinate order (top-left -> bottom-right)");let l=a.tileX*M+a.pixelX,c=a.tileY*M+a.pixelY,g=s.tileX*M+s.pixelX,r=s.tileY*M+s.pixelY;return Promise.resolve({minGlobalX:l,minGlobalY:c,maxGlobalX:g,maxGlobalY:r})}parseTilePixelCoordinate(o){let[p,a,s,l]=o.split(",").map((r)=>Number.parseInt(r.trim(),10));if([p,a,s,l].some((r)=>!Number.isFinite(r)))throw new Error("Invalid coordinate format");let c=Math.max(0,Math.min(999,s-1)),g=Math.max(0,Math.min(999,l-1));return{tileX:p,tileY:a,pixelX:c,pixelY:g}}selectCaptureBounds(){return new Promise((o,p)=>{let a=document.createElement("div");a.className="kgm-capture-overlay",a.innerHTML=`<div class="kgm-capture-hint">${b("captureHintSelectArea")}: A → B</div><div class="kgm-capture-box"></div>`;let s=a.querySelector(".kgm-capture-box");document.body.append(a);let l,c,g=()=>{window.removeEventListener("keydown",d,!0),a.removeEventListener("pointermove",w),a.removeEventListener("pointerdown",u),a.remove()},r=(n)=>{let m=Math.min(l.x,n.x),i=Math.min(l.y,n.y),z=Math.abs(l.x-n.x)+1,k=Math.abs(l.y-n.y)+1;return{left:m,top:i,width:z,height:k}},f=(n)=>{let{left:m,top:i,width:z,height:k}=r(n);s.style.left=`${m}px`,s.style.top=`${i}px`,s.style.width=`${z}px`,s.style.height=`${k}px`},w=(n)=>{if(!l)return;f({x:n.clientX,y:n.clientY})},u=(n)=>{if(n.preventDefault(),!l){l={x:n.clientX,y:n.clientY};let H=P.fromScreenPosition(this.bot,l);c={x:H.globalX,y:H.globalY},f(l);return}let m={x:n.clientX,y:n.clientY},i=P.fromScreenPosition(this.bot,m);if(g(),!c){p(new Error("Capture anchor point unavailable"));return}let z=Math.min(c.x,i.globalX),k=Math.min(c.y,i.globalY),A=Math.max(c.x,i.globalX),h=Math.max(c.y,i.globalY);if(A-z<1||h-k<1){p(new Error("Capture area too small"));return}o({minGlobalX:z,minGlobalY:k,maxGlobalX:A,maxGlobalY:h})},d=(n)=>{if(n.key!=="Escape")return;g(),p(new Error("Capture cancelled"))};window.addEventListener("keydown",d,!0),a.addEventListener("pointermove",w),a.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await W(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let s=document.createElement("canvas");s.width=p.naturalWidth,s.height=p.naturalHeight;let l=s.getContext("2d");if(!l)return o;return l.drawImage(p,0,0),s.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let c=0;c<this.bot.images.length;c++){let g=this.bot.images[c];o+=g.pixels.pixels.length*g.pixels.pixels[0].length,p+=g.tasks.length}let a=Math.max(0,o-p),s=o>0?a/o*100|0:0;this.$progressText.textContent=`${a}/${o} ${s}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${s/100})`,this.$images.innerHTML="";let l=document.createDocumentFragment();for(let c=0;c<this.bot.images.length;c++){let g=this.bot.images[c],r=document.createElement("div");l.append(r),r.className="image",r.innerHTML=`<button class="preview" title="View preview">
  <img src="${g.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${c===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${c===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,r.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=c,g.openPreviewPanel()}),r.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=c,g.openColorPanel()}),r.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=c,g.openPreviewPanel()}),r.querySelector(".download").addEventListener("click",()=>{g.exportImage()}),r.querySelector(".delete").addEventListener("click",()=>{g.destroy()}),r.querySelector(".up").addEventListener("click",()=>{so(this.bot.images,c,c-1),this.update(),J(this.bot)}),r.querySelector(".down").addEventListener("click",()=>{so(this.bot.images,c,c+1),this.update(),J(this.bot)})}this.$images.append(l)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Po)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Po,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${b("toggleOverlay")} (${b("disabled")})`:`${b("toggleOverlay")} (${b("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,a,s="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${s} ${o}`;try{let c=await p();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),c}catch(c){if(!(c instanceof ao))console.error(c),this.status=`${b("taskErrorPrefix")}: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:c}),c}finally{await a?.()}}handleKeyboard(o){if(Jo(o.target))return;if(K(o,U.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(K(o,U.showShortcuts)){o.preventDefault(),this.open=!0,this.$shortcuts.open=!0,this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(K(o,U.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(K(o,U.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(K(o,U.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(K(o,U.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(K(o,U.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(K(o,U.clickPaintWhenReady)){o.preventDefault(),this.drawAndClickPaintWhenReady();return}if(K(o,U.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(K(o,U.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),J(this.bot)}async waitAndClickPaintButton(){await this.run(b("taskWaitingPaintButton"),async()=>{for(;;){let o=this.findNativePaintButton();if(o&&!o.disabled&&o.ariaDisabled!=="true"){o.click();return}await new Promise((p)=>setTimeout(p,500))}})}async drawAndClickPaintWhenReady(){if(!this.$draw.disabled)await this.bot.draw();await this.waitAndClickPaintButton()}findNativePaintButton(){return["button.btn.btn-primary.btn-lg.relative.z-30","button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30"].flatMap((a)=>Array.from(document.querySelectorAll(a))).find((a)=>/pintar|paint/i.test(a.textContent??""))}}var Yo=2,Uo="[KGM]",Ko="kglacer-macro:access-ok",wo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Qo="kgm-access-locked";class Do{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${Uo} ${o}`);else console.log(`${Uo} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Qo);let o=ho();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let a=0;a<o.images.length;a++){let s=o.images[a];I({x:s.position[0]-1000,y:s.position[1]-1000}),I({x:s.position[0]+1000,y:s.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=ko.replace("FAKE_FAVORITE_LOCATIONS",S.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:S.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Qo),this._widget=new fo(this),await this.widget.run(b("taskInitializing"),async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let a=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((s)=>{for(let l=0;l<s.length;l++)if(s[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(a,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await F(500),await this.updateColors(),o)for(let s=0;s<o.images.length;s++){let l=await R.fromJSON(this,o.images[s]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Ko)===wo)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),q(p);let a=p.querySelector(".access-input"),s=p.querySelector(".access-error"),l=p.querySelector(".access-locale");l.innerHTML=io().map((c)=>`<option value="${c}" ${c===X()?"selected":""}>${c.toUpperCase()}</option>`).join(""),l.addEventListener("change",()=>{oo(l.value),q(p)}),p.addEventListener("cancel",(c)=>{c.preventDefault()}),p.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault();let g=atob(wo);if(a.value.trim()!==g){s.textContent=b("invalidAccessKey");return}localStorage.setItem(Ko,wo),p.close(),p.remove(),o()}),p.showModal(),a.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(a)=>{if(!a.shiftKey)a.stopPropagation()};return this.widget.run(b("taskDrawing"),async()=>{await this.widget.run(b("taskInitializingDraw"),()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let a=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),s=Math.floor(a.charges.count);this.log("Charges fetched",{charges:s});let l=0;for(let c=0;c<this.images.length;c++)l+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(s>0){let c=!0;for(let g=0;g<this.images.length;g++){let r=this.images[g].tasks.shift();if(!r)continue;this.drawTask(r),s--,await F(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<l&&s>0;c++){let g=1,r;for(let f=0;f<this.images.length;f++){let w=this.images[f],u=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(u<g)g=u,r=w}this.drawTask(r.tasks.shift()),s--,await F(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let g=this.images[c];for(let r=g.tasks.shift();r&&s>0;r=g.tasks.shift())this.drawTask(r),s--,await F(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:s})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:Yo,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),a=window.innerWidth/2,s=window.innerHeight/2,l=a-o.x,c=s-o.y;function g(r,f,w){p.dispatchEvent(new MouseEvent(r,{bubbles:!0,cancelable:!0,clientX:f,clientY:w,buttons:1}))}g("mousedown",a,s),g("mousemove",l,c),g("mouseup",l,c)}readMap(){this.mapsCache.clear();let o=new Set;for(let a=0;a<this.images.length;a++){let s=this.images[a],{tileX:l,tileY:c}=new P(this,s.position.globalX+s.pixels.pixels[0].length,s.position.globalY+s.pixels.pixels.length);for(let g=s.position.tileX;g<=l;g++)for(let r=s.position.tileY;r<=c;r++)o.add(`${g}/${r}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`${b("taskReadingMap")} [0/${o.size}]`,()=>Promise.all([...o].map(async(a)=>{this.mapsCache.set(a,await G.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${a}.png`,exactColor:!0})),this.widget.status=`⌛ ${b("taskReadingMap")} [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,a=1,s=1/0,l=1/0;for(let r=0;r<this.$stars.length;r++){let{x:f,y:w}=C(this.$stars[r]);if(f<o.x&&w<o.y){let u=o.x-f+(o.y-w);if(u<s)s=u,p=r}else if(f>o.x&&w>o.y){let u=f-o.x+(w-o.y);if(u<l)l=u,a=r}}let c=C(this.$stars[p]),g=B[p];return{anchorScreenPosition:c,anchorWorldPosition:g,pixelSize:(C(this.$stars[a]).x-c.x)/(B[a].x-g.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await F(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await F(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await F(1)}drawTask(o){if(this.lastColor!==o.color){let s=document.getElementById("color-"+o.color);if(!s){this.log("Skipped draw task: color button not found",{color:o.color,tileX:o.position.tileX,tileY:o.position.tileY,x:o.position.x,y:o.position.y});return}s.click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color})}let p=o.position.pixelSize/2,a=o.position.toScreenPosition();if(!Number.isFinite(a.x)||!Number.isFinite(a.y)){this.log("Skipped draw task: invalid screen position",{color:o.color});return}document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:a.x+p,clientY:a.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(a,s)=>{let l=await o(a,s),c=l.clone(),g="";if(typeof a=="string")g=a;else if(a instanceof Request)g=a.url;else if(a instanceof URL)g=a.href;if(l.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...S),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let r=p.exec(g);if(r){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new P(this,+r[1],+r[2],+r[3],+r[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await F(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`${b("taskWaitingFor")} ${o}`,()=>{return new Promise((a)=>{let s=document.querySelector(p);if(s){a(s);return}let l=new MutationObserver(()=>{let c=document.querySelector(p);if(c)l.disconnect(),a(c)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,S.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new Do;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
