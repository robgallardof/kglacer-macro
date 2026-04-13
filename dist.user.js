// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.10
// @description  Macro para automatizar pintado en https://wplace.live
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
function po(o,s,l){let p=o[l];return o[l]=o[s],o[s]=p,o}function so(o,s){let l=o.indexOf(s);if(l!==-1)o.splice(l,1);return l}var aa=Math.floor(Math.random()*65536),la=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function q(o){return new Promise((s)=>setTimeout(s,o))}function j(o,s,l=["error"],p="addEventListener"){return new Promise((a,c)=>{for(let g=0;g<s.length;g++)o[p]?.(s[g],a);for(let g=0;g<l.length;g++)o[p]?.(l[g],c)})}class Zo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,s=15000){this.size=o,this.historyTime=s}push(o){if(o<0)throw new Error("Negative chunk size");let{time:s,historyTime:l}=this.getTime();if(this.history.push({time:s,chunk:o}),this.history[0]&&this.history[0].time+l<s)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((s,l)=>s+l.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),s=o-this.startTime,l=Math.min(s,this.historyTime);return{time:o,historyTime:l}}}var bo=["kglacermacro:locale"],y={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using your current image.",captureTemplate:"Capture image",captureFormatPrompt:"Capture format (png or webp)",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again."},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando tu imagen actual.",captureTemplate:"Capturar imagen",captureFormatPrompt:"Formato de captura (png o webp)",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Overlay",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo."}};function io(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function X(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in y)return o;for(let s=0;s<bo.length;s++){let l=localStorage.getItem(bo[s]);if(!l||!(l in y))continue;return localStorage.setItem("kglacer-macro:locale",l),l}return io()}function oo(o){localStorage.setItem("kglacer-macro:locale",o)}function mo(){return Object.keys(y)}function d(o){let s=X();return y[s][o]}function F(o){for(let s of o.querySelectorAll("[data-i18n]"))s.textContent=d(s.dataset.i18n);for(let s of o.querySelectorAll("[data-i18n-title]"))s.setAttribute("title",d(s.dataset.i18nTitle));for(let s of o.querySelectorAll("[data-i18n-aria-label]"))s.setAttribute("aria-label",d(s.dataset.i18nAriaLabel));for(let s of o.querySelectorAll("[data-i18n-placeholder]"))s.setAttribute("placeholder",d(s.dataset.i18nPlaceholder))}class O{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,s){for(let l in s)this[l]=o.querySelector(s[l])}registerEvent(o,s,l,p={}){p.passive??=!0,o.addEventListener(s,l,p),this.runOnDestroy.push(()=>{o.removeEventListener(s,l)})}}function co(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function zo(o,s,l){let p=co(o/255),a=co(s/255),c=co(l/255),g=Math.cbrt(0.4122214708*p+0.5363325363*a+0.0514459929*c),r=Math.cbrt(0.2119034982*p+0.6806995451*a+0.1073969566*c),f=Math.cbrt(0.0883024619*p+0.2817188376*a+0.6299787005*c),w=0.2104542553*g+0.793617785*r-0.0040720468*f,u=1.9779984951*g-2.428592205*r+0.4505937099*f,b=0.0259040371*g+0.7827717662*r-0.808675766*f;return[w,u,b]}function Ho(o,s,l){let[p,a,c]=o,[g,r,f]=s,w=(lo)=>lo*180/Math.PI,u=(lo)=>lo*Math.PI/180,b=1,m=1,z=1,H=Math.sqrt(a**2+c**2),M=Math.sqrt(r**2+f**2),n=(H+M)/2,A=0.5*(1-Math.sqrt(n**7/(n**7+6103515625))),U=a*(1+A),h=r*(1+A),B=Math.sqrt(U**2+c**2),K=Math.sqrt(h**2+f**2),i=c===0&&U===0?0:w(Math.atan2(c,U))%360,S=f===0&&h===0?0:w(Math.atan2(f,h))%360,v=g-p,_=K-B,D=0;if(B*K!==0){if(D=S-i,D>180)D-=360;else if(D<-180)D+=360}let t=2*Math.sqrt(B*K)*Math.sin(u(D)/2),x=(p+g)/2,e=(B+K)/2,C=(i+S)/2;if(Math.abs(i-S)>180)C+=180;let Fo=1-0.17*Math.cos(u(C-30))+0.24*Math.cos(u(2*C))+0.32*Math.cos(u(3*C+6))-0.2*Math.cos(u(4*C-63)),Go=1+0.015*(x-50)**2/Math.sqrt(20+(x-50)**2),wo=1+0.045*e,uo=1+0.015*e*Fo,Bo=30*Math.exp((-((C-275)/25))**2),jo=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(u(2*Bo));return Math.sqrt((v/(1*Go))**2+(_/(1*wo))**2+(t/(1*uo))**2+jo*(_/(1*wo))*(t/(1*uo)))-v*l}var V=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],W=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function Mo(o){if(o===0)return"transparent";let s=V[o],l=`oklab(${s[0]*100}% ${s[1]} ${s[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",l))return l;let[p=0,a=0,c=0]=(W[o]??"0,0,0").split(",").map((g)=>Number.parseInt(g,10));return`rgb(${p} ${a} ${c})`}var Ao=`<div class="wtopbar">
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
    <label><span data-i18n="brightness">Brightness</span>:&nbsp;<input class="brightness" type="number" step="0.1"/></label>
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
`;class Z{bot;image;width;brightness;exactColor;static async fromJSON(o,s){let l=new Image;return l.src=s.url.startsWith("http")?await fetch(s.url,{cache:"no-store"}).then((p)=>p.blob()).then((p)=>URL.createObjectURL(p)):s.url,await j(l,["load"],["error"]),new Z(o,l,s.width,s.brightness,s.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,s,l=s.naturalWidth,p=0,a=!1){this.bot=o;this.image=s;this.width=l;this.brightness=p;this.exactColor=a;if(a)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let l=1;l<64;l++)if(this.exactColor||!this.bot.unavailableColors.has(l))o.set(W[l],[l,l]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let s=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let l=0;l<this.canvas.height;l++)for(let p=0;p<this.canvas.width;p++){let a=(l*this.canvas.width+p)*4,c=s[a],g=s[a+1],r=s[a+2],f=s[a+3],w=`${c},${g},${r}`;if(this.exactColor){this.pixels[l][p]=f<100?0:W.indexOf(w);continue}let u,b;if(f<100)u=b=0;else if(o.has(w))[u,b]=o.get(w);else{let z=1/0,H=1/0;for(let M=0;M<V.length;M++){let n=V[M],A=Ho(zo(c,g,r),n,this.brightness);if(!this.bot.unavailableColors.has(M)&&A<z)z=A,u=M;if(A<H)H=A,b=M}o.set(w,[u,b])}if(u!==0)this.context.fillStyle=`oklab(${V[u][0]*100}% ${V[u][1]} ${V[u][2]})`,this.context.fillRect(p,l,1,1);this.pixels[l][p]=u;let m=this.colors.get(b);if(m)m.amount++;else this.colors.set(b,{color:u,amount:1,realColor:b})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var T="kglacer-macro-settings",no=["kglacermacro","wbot"],$="kgm";function Lo(){let o=[T,...no];for(let s=0;s<o.length;s++){let l=o[s],p=localStorage.getItem(l);if(!p)continue;return{json:p,key:l}}return}function No(){let o=Lo();if(!o)return;let s;try{if(s=JSON.parse(o.json),typeof s!=="object")throw new Error("NOT VALID SAVE");if(s.version===1){let l=s;s.images=l.widget.images,s.strategy=l.widget.strategy,delete l.widget}if(o.key!==T)localStorage.setItem(T,o.json)}catch{localStorage.removeItem(o.key),s=void 0}return s}var Jo;function N(o,s=!1){if(clearTimeout(Jo),s)localStorage.setItem(T,JSON.stringify(o));else Jo=setTimeout(()=>{localStorage.setItem(T,JSON.stringify(o))},600)}var J=1000,Ro=2048,Y=J*Ro,G=[],E=[],Co=Date.now();function I(o){G.push(o),E.push({id:Co++,latitude:(2*Math.atan(Math.exp(-(o.y/Y*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/Y*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}I({x:Y/3|0,y:Y/3|0});I({x:Y/3*2|0,y:Y/3*2|0});function L(o){let[s,l]=o.style.transform.slice(32,-31).split(", ").map((p)=>Number.parseFloat(p));return{x:s,y:l}}class P{bot;static fromJSON(o,s){return new P(o,...s)}static fromScreenPosition(o,s){let{anchorScreenPosition:l,pixelSize:p,anchorWorldPosition:a}=o.findAnchorsForScreen(s);return new P(o,a.x+(s.x-l.x)/p|0,a.y+(s.y-l.y)/p|0)}globalX=0;globalY=0;get tileX(){return this.globalX/J|0}set tileX(o){this.globalX=o*J+this.x}get tileY(){return this.globalY/J|0}set tileY(o){this.globalY=o*J+this.y}get x(){return this.globalX%J}set x(o){this.globalX=this.tileX*J+o}get y(){return this.globalY%J}set y(o){this.globalY=this.tileY*J+o}anchor1Index;anchor2Index;get pixelSize(){return(L(this.bot.$stars[this.anchor2Index]).x-L(this.bot.$stars[this.anchor1Index]).x)/(G[this.anchor2Index].x-G[this.anchor1Index].x)}constructor(o,s,l,p,a){this.bot=o;if(p===void 0||a===void 0)this.globalX=s,this.globalY=l;else this.globalX=s*J+p,this.globalY=l*J+a;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,s=1/0;for(let l=0;l<G.length;l++){let{x:p,y:a}=G[l];if(p<this.globalX&&a<this.globalY){let c=this.globalX-p+(this.globalY-a);if(c<o)o=c,this.anchor1Index=l}else if(p>this.globalX&&a>this.globalY){let c=p-this.globalX+(a-this.globalY);if(c<s)s=c,this.anchor2Index=l}}}toScreenPosition(){let o=G[this.anchor1Index],s=L(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+s.x,y:(this.globalY-o.y)*this.pixelSize+s.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:s}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:s-window.innerHeight/3})}clone(){return new P(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}class R extends O{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,s){return new R(o,P.fromJSON(o,s.position),await Z.fromJSON(o,s.pixels),s.strategy,s.opacity,s.drawTransparentPixels,s.drawColorsInOrder,s.colors,s.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,s,l,p="SPIRAL_FROM_CENTER",a=50,c=!1,g=!1,r=[],f=!1){super();this.bot=o;this.position=s;this.pixels=l;this.strategy=p;this.opacity=a;this.drawTransparentPixels=c;this.drawColorsInOrder=g;this.colors=r;this.lock=f;this.element.innerHTML=Ao,this.element.classList.add("wimage"),F(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();N(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),N(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let w;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(w),w=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),N(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),N(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,N(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,N(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),N(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),s=new Set,l=new Map;for(let p=0;p<this.colors.length;p++){let a=this.colors[p];if(a.disabled)s.add(a.realColor);l.set(a.realColor,p)}for(let{x:p,y:a}of this.strategyPositionIterator()){let c=this.pixels.pixels[a][p];if(s.has(c))continue;o.globalX=this.position.globalX+p,o.globalY=this.position.globalY+a;let g=o.getMapColor();if(c!==g&&(this.drawTransparentPixels||c!==0))this.tasks.push({position:o.clone(),color:c})}if(this.drawColorsInOrder)this.tasks.sort((p,a)=>(l.get(p.color)??0)-(l.get(a.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:s}=this.position.toScreenPosition(),l=Math.round(this.position.pixelSize*this.pixels.width),p=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(s)}px, 0)`,this.element.style.width=`${l}px`,this.element.style.height=`${p}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let a=this.pixels.pixels.length*this.pixels.pixels[0].length,c=Math.max(0,a-this.tasks.length),g=a>0?c/a*100|0:0;this.$progressText.textContent=`${c}/${a} ${g}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${g/100})`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),so(this.bot.images,this),this.bot.widget.update(),N(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let l=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-l.left,offsetY:o.clientY-l.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let s=this.$colorsDialog.getBoundingClientRect(),l=Math.max(8,window.innerWidth-s.width-8),p=Math.max(8,window.innerHeight-s.height-8),a=Math.min(l,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),c=Math.min(p,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(a)}px`,this.$colorsDialog.style.top=`${Math.round(c)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let s=document.createDocumentFragment(),l=document.createElement("article");l.className="preview-card";let p=document.createElement("strong");p.textContent=this.getStrategyLabel(o);let a=document.createElement("canvas");a.className="preview-canvas",a.width=156,a.height=156,this.paintStrategyPreview(a,o),l.append(p,a),s.append(l),this.$previewDialogList.append(s)}invalidatePreviewCacheIfNeeded(){let o=`${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}`;if(this.previewCacheSignature===o)return;this.previewCacheSignature=o,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return d("random");case"HUMANIZED":return d("humanized");case"HUMAN_SOFT_DITHER":return d("humanSoftDither");case"HUMAN_PATCHY":return d("humanPatchy");case"HUMAN_SWEEP_ARCS":return d("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return d("humanMicroCorrections");case"HUMAN_JITTER_FILL":return d("humanJitterFill");case"HUMAN_CORNER_BIAS":return d("humanCornerBias");case"HUMAN_LONG_STROKES":return d("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return d("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return d("humanMessySpiral");case"HUMAN_DRUNK_WALK":return d("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return d("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return d("humanPatchJump");case"HUMAN_HESITANT_LINES":return d("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return d("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return d("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return d("humanGapRecovery");case"HUMAN_STAIRCASE":return d("humanStaircase");case"HUMAN_EDGE_HUGGER":return d("humanEdgeHugger");case"HUMAN_BLOBS":return d("humanBlobs");case"HUMAN_BACKTRACK":return d("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return d("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return d("humanLateFixes");case"ZIGZAG":return d("zigzag");case"BRUSH_STROKES":return d("brushStrokes");case"DIAGONAL_BRUSH":return d("diagonalBrush");case"DOWN":return d("down");case"UP":return d("up");case"LEFT":return d("left");case"RIGHT":return d("right");case"SPIRAL_FROM_CENTER":return d("spiralOut");case"SPIRAL_TO_CENTER":return d("spiralIn");case"SCRIBBLE":return d("scribble");case"CROSSHATCH":return d("crosshatch");case"WAVE_SWEEP":return d("waveSweep");case"SCATTERED_LINES":return d("scatteredLines");case"CONTOUR_JITTER":return d("contourJitter");case"SPIRAL_WOBBLE":return d("spiralWobble");case"CLUSTER_BURSTS":return d("clusterBursts");case"ORBITAL":return d("orbital");case"FLOW_FIELD":return d("flowField");case"EDGE_IN":return d("edgeIn");default:return o}}paintStrategyPreview(o,s){let l=o.getContext("2d");if(!l)return;l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height);let p=this.getImagePreviewMask(),a=this.getCachedPreviewSequence(s,p),c=Math.min(o.width/this.pixels.width,o.height/this.pixels.height),g=(o.width-this.pixels.width*c)/2,r=(o.height-this.pixels.height*c)/2,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let w=(n)=>{let A=requestAnimationFrame((U)=>{this.previewAnimationHandles.delete(A),n(U)});return this.previewAnimationHandles.add(A),A},u=(n)=>{l.fillStyle="#0f1526",l.fillRect(0,0,o.width,o.height),this.paintImageGhost(l,c,g,r,p);for(let A=0;A<Math.min(n,a.length);A++){let U=a[A],h=A/Math.max(1,a.length-1);l.fillStyle=`hsl(${220-h*110} 90% ${43+h*18}%)`,l.fillRect(g+U.x*c,r+U.y*c,Math.max(1,c),Math.max(1,c))}},b=Math.min(3400,Math.max(900,a.length*8)),z=b+220,H=(n,A)=>{if(!this.$previewDialog.open)return;let U=(A-n)%z,h=Math.min(1,U/b),B=h*h*(3-2*h);u(Math.floor(a.length*B));let K=w((i)=>{H(n,i)});this.previewAnimations.set(o,K)},M=performance.now();H(M,M)}getCachedPreviewSequence(o,s){let l=`${o}:${this.pixels.width}x${this.pixels.height}:${s.length}`,p=this.previewSequenceCache.get(l);if(p)return p;let a=this.strategy;this.strategy=o;let c=[...this.strategyPositionIterator()];this.strategy=a;let g=new Set(s.map(({x:f,y:w})=>`${f}:${w}`)),r=c.filter(({x:f,y:w})=>g.has(`${f}:${w}`));return this.previewSequenceCache.set(l,r),r}paintImageGhost(o,s,l,p,a){o.save(),o.globalAlpha=0.25,o.imageSmoothingEnabled=!1,o.drawImage(this.pixels.image,l,p,this.pixels.width*s,this.pixels.height*s),o.restore(),o.fillStyle="rgb(115 132 190 / 28%)";for(let c=0;c<a.length;c++){let g=a[c];o.fillRect(l+g.x*s,p+g.y*s,Math.max(1,s),Math.max(1,s))}}getImagePreviewMask(){let o=this.pixels.width,s=this.pixels.height,l=[];for(let p=0;p<s;p++)for(let a=0;a<o;a++)if((this.pixels.pixels[p]?.[a]??0)!==0)l.push({x:a,y:p});return l.length?l:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],s=this.pixels.width/2,l=this.pixels.height/2,p=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let a=0;a<this.pixels.height;a++)for(let c=0;c<this.pixels.width;c++)if((c-s)**2+(a-l)**2<=p**2)o.push({x:c,y:a});return o}applyLocale(){if(F(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let s=W[o]??"0,0,0",[l=0,p=0,a=0]=s.split(",").map((c)=>Number.parseInt(c,10));return`#${[l,p,a].map((c)=>c.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let s=W[o]??"0,0,0",[l=0,p=0,a=0]=s.split(",").map((f)=>Number.parseInt(f,10)),c=Math.max(l,p,a),g=Math.min(l,p,a);if(c-g<15)return["gray","grey","gris","neutral","neutro"];if(l>p+30&&l>a+30)return["red","rojo"];if(p>l+30&&p>a+30)return["green","verde"];if(a>l+30&&a>p+30)return["blue","azul"];if(l>170&&p>120&&a<130)return["orange","naranja"];if(l>170&&p>110&&a>140)return["pink","rosa"];if(l>120&&p<100&&a>120)return["purple","violet","morado"];if(l>130&&p>130&&a<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",d("colorPanelResults"));let s=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((l)=>!this.pixels.colors.has(l.realColor)))this.colors=this.pixels.colors.values().toArray().sort((l,p)=>p.amount-l.amount).map((l)=>({realColor:l.realColor,disabled:!1})),N(this.bot);for(let l=0;l<this.colors.length;l++){let p=this.colors[l],a=this.pixels.colors.get(p.realColor),c=!1,g=a.realColor!==a.color,r=a.amount/o*100,f=this.colorHex(a.realColor),w=this.colorKeywords(a.realColor),u=()=>{p.disabled=p.disabled?void 0:!0,b.classList.toggle("disabled",Boolean(p.disabled));let z=b.querySelector(".state");if(z)z.textContent=p.disabled?d("disabled"):d("enabled");N(this.bot)},b=document.createElement("button");if(b.className=`color-chip ${p.disabled?"disabled":""}`,b.draggable=!0,b.setAttribute("aria-label",`${d("overlayColors")} #${l+1}: ${f.toUpperCase()}`),b.innerHTML=`<span class="order-index">#${l+1}</span>
<span class="drag" title="${d("up")} / ${d("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${r.toFixed(1)}%</span>
  <span class="hex">${f.toUpperCase()}</span>
  <span class="state">${p.disabled?d("disabled"):d("enabled")}</span>
</span>
<span class="premium ${g?"on":""}">${g?d("premium"):""}</span>`,b.querySelector(".swatch").style.setProperty("--swatch-color",Mo(a.realColor)),b.addEventListener("click",()=>{if(c){c=!1;return}u()}),b.addEventListener("dragstart",(z)=>{c=!0,b.classList.add("dragging"),z.dataTransfer?.setData("text/plain",String(l)),z.dataTransfer.effectAllowed="move"}),b.addEventListener("dragend",()=>{b.classList.remove("dragging")}),b.addEventListener("dragover",(z)=>{z.preventDefault(),b.classList.add("drag-target")}),b.addEventListener("dragleave",()=>{b.classList.remove("drag-target")}),b.addEventListener("drop",(z)=>{z.preventDefault(),b.classList.remove("drag-target");let H=Number.parseInt(z.dataTransfer?.getData("text/plain")??"-1",10);if(H<0||H===l||H>=this.colors.length)return;this.colors.splice(l,0,...this.colors.splice(H,1)),N(this.bot),this.updateColors()}),g){let z=document.createElement("button");z.textContent=d("buy"),z.className="buy-chip",z.addEventListener("click",(H)=>{H.stopPropagation(),document.getElementById("color-"+a.realColor)?.click()}),b.append(z)}let m=`${f} ${w.join(" ")} ${a.realColor} ${W[a.realColor]}`;if(!s||m.toLowerCase().includes(s))this.$colorsDialogList.append(b)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,s=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let l=0;l<s;l++)for(let p=0;p<o;p++)yield{x:p,y:l};break}case"UP":{for(let l=s-1;l>=0;l--)for(let p=0;p<o;p++)yield{x:p,y:l};break}case"LEFT":{for(let l=0;l<o;l++)for(let p=0;p<s;p++)yield{x:l,y:p};break}case"RIGHT":{for(let l=o-1;l>=0;l--)for(let p=0;p<s;p++)yield{x:l,y:p};break}case"RANDOM":{let l=[];for(let p=0;p<s;p++)for(let a=0;a<o;a++)l.push({x:a,y:p});for(let p=l.length-1;p>=0;p--){let a=Math.floor(Math.random()*(p+1)),c=l[p];l[p]=l[a],l[a]=c}yield*l;break}case"ZIGZAG":{for(let l=0;l<s;l++)if(l%2===0)for(let p=0;p<o;p++)yield{x:p,y:l};else for(let p=o-1;p>=0;p--)yield{x:p,y:l};break}case"HUMANIZED":{let l=Math.max(4,Math.floor(Math.min(o,s)/10)),p=[];for(let a=0;a<s;a+=l)for(let c=0;c<o;c+=l)p.push({x:c,y:a});for(let a=p.length-1;a>=0;a--){let c=Math.floor(Math.random()*(a+1)),g=p[a];p[a]=p[c],p[c]=g}for(let a=0;a<p.length;a++){let c=p[a],g=Math.min(s,c.y+l),r=Math.min(o,c.x+l);for(let f=c.y;f<g;f++)if(Math.random()>0.35)for(let u=c.x;u<r;u++)yield{x:u,y:f};else for(let u=r-1;u>=c.x;u--)yield{x:u,y:f}}break}case"HUMAN_SOFT_DITHER":{let l=new Set;for(let p=0;p<s;p++){let a=Math.floor(Math.random()*3)-1;if((p+a)%2===0)for(let g=0;g<o;g+=2)l.add(`${g},${p}`),yield{x:g,y:p};else for(let g=1;g<o;g+=2)l.add(`${g},${p}`),yield{x:g,y:p}}for(let p=0;p<s;p++)for(let a=0;a<o;a++){let c=`${a},${p}`;if(l.has(c))continue;yield{x:a,y:p}}break}case"HUMAN_PATCHY":{let l=new Set,p=o*s;while(l.size<p){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=1+Math.floor(Math.random()*5);for(let r=c-g;r<=c+g;r++)for(let f=a-g;f<=a+g;f++){if(f<0||f>=o||r<0||r>=s)continue;if(Math.hypot(f-a,r-c)>g+Math.random()*1.2)continue;let w=`${f},${r}`;if(l.has(w))continue;l.add(w),yield{x:f,y:r}}}break}case"HUMAN_SWEEP_ARCS":{let l=new Set,p=(o-1)/2,a=(s-1)/2,c=Math.hypot(p,a);for(let g=0;g<4;g++){let r=Math.random()*Math.PI*2;for(let f=0;f<=c;f+=0.35){let w=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(f*8));for(let b=0;b<u;b++){let m=r+w*b/u+Math.sin(f)*0.08,z=Math.round(p+Math.cos(m)*f),H=Math.round(a+Math.sin(m)*f);if(z<0||z>=o||H<0||H>=s)continue;let M=`${z},${H}`;if(l.has(M))continue;l.add(M),yield{x:z,y:H}}}}for(let g=0;g<s;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(l.has(f))continue;yield{x:r,y:g}}break}case"HUMAN_MICRO_CORRECTIONS":{let l=new Set;for(let p=0;p<s;p++){let a=p%2===0?1:-1,c=a>0?0:o-1;for(let g=0;g<o;g++){let r=c+(Math.random()>0.82?a:0),f=p+(Math.random()>0.9?1:0);for(let w of[{x:c,y:p},{x:r,y:p},{x:c,y:f}]){if(w.x<0||w.x>=o||w.y<0||w.y>=s)continue;let u=`${w.x},${w.y}`;if(l.has(u))continue;l.add(u),yield w}c+=a}}for(let p=0;p<s;p++)for(let a=0;a<o;a++){let c=`${a},${p}`;if(l.has(c))continue;yield{x:a,y:p}}break}case"HUMAN_JITTER_FILL":{let l=[];for(let p=0;p<s;p++)for(let a=0;a<o;a++)l.push({x:a,y:p});l.sort((p,a)=>{let c=p.y+(Math.random()-0.5)*1.8,g=a.y+(Math.random()-0.5)*1.8;if(c!==g)return c-g;return p.x+(Math.random()-0.5)*2-(a.x+(Math.random()-0.5)*2)}),yield*l;break}case"HUMAN_CORNER_BIAS":{let l=[{x:0,y:0},{x:o-1,y:0},{x:0,y:s-1},{x:o-1,y:s-1}],p=l[Math.floor(Math.random()*l.length)],a=[];for(let c=0;c<s;c++)for(let g=0;g<o;g++){let f=Math.hypot(g-p.x,c-p.y)+Math.random()*3.5;a.push({point:{x:g,y:c},score:f})}a.sort((c,g)=>c.score-g.score);for(let c of a)yield c.point;break}case"HUMAN_LONG_STROKES":{let l=new Set,p=o*s;while(l.size<p){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=Math.random()*Math.PI*2,r=Math.sign(Math.cos(g)),f=Math.sign(Math.sin(g)),w=10+Math.floor(Math.random()*40);for(let u=0;u<w;u++){if(a<0||a>=o||c<0||c>=s)break;let b=`${a},${c}`;if(!l.has(b))l.add(b),yield{x:a,y:c};if(Math.random()>0.78)a+=f,c+=r;else a+=r,c+=f}}break}case"HUMAN_TAP_CLUSTERS":{let l=new Set,p=o*s;while(l.size<p){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=3+Math.floor(Math.random()*10);for(let r=0;r<g;r++){let f=Math.round(a+(Math.random()-0.5)*6),w=Math.round(c+(Math.random()-0.5)*6);if(f<0||f>=o||w<0||w>=s)continue;let u=`${f},${w}`;if(l.has(u))continue;l.add(u),yield{x:f,y:w}}}break}case"HUMAN_MESSY_SPIRAL":{let l=new Set,p=(o-1)/2,a=(s-1)/2,c=Math.hypot(p,a)+2;for(let g=0;l.size<o*s;g++){let r=g/3,f=Math.min(c,r*0.18),w=r*0.29+Math.sin(r*0.13)*0.8,u=Math.round(p+Math.cos(w)*f+Math.sin(r)*0.7),b=Math.round(a+Math.sin(w)*f+Math.cos(r)*0.7);if(u<0||u>=o||b<0||b>=s){if(g>o*s*18)break;continue}let m=`${u},${b}`;if(l.has(m)){if(Math.random()>0.9)continue}else l.add(m),yield{x:u,y:b};if(g>o*s*18)break}for(let g=0;g<s;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(l.has(f))continue;yield{x:r,y:g}}break}case"HUMAN_DRUNK_WALK":{let l=new Set,p=Math.floor(Math.random()*o),a=Math.floor(Math.random()*s),c=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(l.size<o*s){let g=`${p},${a}`;if(!l.has(g))l.add(g),yield{x:p,y:a};let r=[];for(let u of c){let b=p+u.x,m=a+u.y;if(b<0||b>=o||m<0||m>=s)continue;r.push({x:b,y:m})}if(!r.length)break;let f=r.filter((u)=>{return!l.has(`${u.x},${u.y}`)});if(f.length&&Math.random()>0.2){let u=f[Math.floor(Math.random()*f.length)];p=u.x,a=u.y;continue}let w=r[Math.floor(Math.random()*r.length)];p=w.x,a=w.y}for(let g=0;g<s;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(l.has(f))continue;yield{x:r,y:g}}break}case"HUMAN_NOISE_CLOUD":{let l=[];for(let p=0;p<s;p++)for(let a=0;a<o;a++){let c=Math.sin((a+1)*0.93+Math.random()*0.8)+Math.cos((p+1)*1.17+Math.random()*0.8),g=(Math.random()-0.5)*2.6,r=Math.hypot(a-o/2,p-s/2)*0.08;l.push({point:{x:a,y:p},score:c+g+r})}l.sort((p,a)=>p.score-a.score);for(let p of l)yield p.point;break}case"HUMAN_PATCH_JUMP":{let l=new Set,p=[];for(let a=0;a<Math.max(6,o*s/18);a++)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*s)});while(l.size<o*s){let a=p[Math.floor(Math.random()*p.length)],c=1+Math.floor(Math.random()*3),g=1+Math.floor(Math.random()*3);for(let r=a.y-g;r<=a.y+g;r++)for(let f=a.x-c;f<=a.x+c;f++){if(f<0||f>=o||r<0||r>=s)continue;if(Math.random()>0.86)continue;let w=`${f},${r}`;if(l.has(w))continue;l.add(w),yield{x:f,y:r}}if(Math.random()>0.72&&p.length<o*s/2)p.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*s)});if(l.size>o*s*0.92)break}for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=`${c},${a}`;if(l.has(g))continue;yield{x:c,y:a}}break}case"HUMAN_HESITANT_LINES":{let l=new Set;for(let p=0;p<s;p++){let a=p%2===0;for(let c=0;c<o;c++){let g=a?c:o-1-c,r=`${g},${p}`;if(!l.has(r))l.add(r),yield{x:g,y:p};if(Math.random()>0.7){let f=Math.max(0,Math.min(o-1,g+(Math.random()>0.5?1:-1))),w=Math.max(0,Math.min(s-1,p+(Math.random()>0.65?1:0))),u=`${f},${w}`;if(!l.has(u))l.add(u),yield{x:f,y:w}}}}for(let p=0;p<s;p++)for(let a=0;a<o;a++){let c=`${a},${p}`;if(l.has(c))continue;yield{x:a,y:p}}break}case"HUMAN_OVERLAP_SWEEPS":{let l=[],p=Math.random()*Math.PI*2;for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=Math.sin((c+a)*0.42+p)*2.2,r=Math.cos((c-a)*0.3+p)*1.4;l.push({point:{x:c,y:a},score:a+g+r+(Math.random()-0.5)*3.4})}l.sort((a,c)=>a.score-c.score);for(let a of l)yield a.point;break}case"HUMAN_WOBBLE_DRIFT":{let l=[],p=o/2,a=s/2;for(let c=0;c<s;c++)for(let g=0;g<o;g++){let r=Math.hypot(g-p,c-a)*0.25,f=Math.sin((g+1)*0.9)*1.8+Math.cos((c+1)*1.1)*1.8+Math.sin((g+c)*0.35)*1.4;l.push({point:{x:g,y:c},score:r+f+(Math.random()-0.5)*2.8})}l.sort((c,g)=>c.score-g.score);for(let c of l)yield c.point;break}case"HUMAN_GAP_RECOVERY":{let l=new Set,p=[];for(let a=0;a<s;a++)for(let c=0;c<o;c++){if(Math.random()>0.87){p.push({x:c,y:a});continue}l.add(`${c},${a}`),yield{x:c,y:a}}p.sort((a,c)=>Math.hypot(a.x-o/2,a.y-s/2)-Math.hypot(c.x-o/2,c.y-s/2));for(let a of p){let c=`${a.x},${a.y}`;if(l.has(c))continue;l.add(c),yield a}break}case"HUMAN_STAIRCASE":{let l=new Set,p=o+s-1;for(let a=0;a<p;a++){let c=Math.max(0,a-o+1),g=Math.min(s-1,a);for(let r=c;r<=g;r++){let f=a-r,w=[{x:f,y:r},{x:f+(Math.random()>0.5?1:-1),y:r},{x:f,y:r+(Math.random()>0.5?1:-1)}];for(let u of w){if(u.x<0||u.x>=o||u.y<0||u.y>=s)continue;let b=`${u.x},${u.y}`;if(l.has(b))continue;l.add(b),yield u}}}for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=`${c},${a}`;if(l.has(g))continue;yield{x:c,y:a}}break}case"HUMAN_EDGE_HUGGER":{let l=[];for(let p=0;p<s;p++)for(let a=0;a<o;a++){let c=Math.min(a,p,o-1-a,s-1-p);l.push({point:{x:a,y:p},score:c*3.5+(Math.random()-0.5)*5.5})}l.sort((p,a)=>p.score-a.score);for(let p of l)yield p.point;break}case"HUMAN_BLOBS":{let l=new Set,p=o*s;while(l.size<p){let a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s),g=1+Math.floor(Math.random()*4);for(let r=c-g;r<=c+g;r++)for(let f=a-g;f<=a+g;f++){if(f<0||f>=o||r<0||r>=s)continue;let w=Math.atan2(r-c,f-a),u=g+Math.sin(w*3+Math.random())*0.8;if(Math.hypot(f-a,r-c)>u)continue;let b=`${f},${r}`;if(l.has(b))continue;l.add(b),yield{x:f,y:r}}}break}case"HUMAN_BACKTRACK":{let l=new Set,p=[];for(let a=0;a<s;a++)for(let c=0;c<o;c++)p.push({x:c,y:a});p.sort((a,c)=>a.y-c.y+(Math.random()-0.5)*2.2+(a.x-c.x)*0.04);for(let a=0;a<p.length;a++){let c=p[a],g=`${c.x},${c.y}`;if(l.has(g))continue;if(l.add(g),yield c,a>1&&Math.random()>0.74){let r=p[a-1],f=`${r.x},${r.y}`;if(!l.has(f))l.add(f),yield r}}for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=`${c},${a}`;if(l.has(g))continue;yield{x:c,y:a}}break}case"HUMAN_SHAKY_DIAGONAL":{let l=[];for(let p=0;p<s;p++)for(let a=0;a<o;a++){let c=Math.abs(a-p)*0.6,g=Math.sin(a*1.4+p*0.8)*1.8+Math.cos(p*1.1+a*0.5)*1.5;l.push({point:{x:a,y:p},score:c+g+(Math.random()-0.5)*3.2})}l.sort((p,a)=>p.score-a.score);for(let p of l)yield p.point;break}case"HUMAN_LATE_FIXES":{let l=[],p=[];for(let a=0;a<s;a++)for(let c=0;c<o;c++)if(Math.random()>0.9)p.push({x:c,y:a});else l.push({x:c,y:a});l.sort((a,c)=>a.y-c.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?a.x-c.x:0)),p.sort((a,c)=>Math.hypot(c.x-o/2,c.y-s/2)-Math.hypot(a.x-o/2,a.y-s/2)),yield*l,yield*p;break}case"DIAGONAL_BRUSH":{for(let l=0;l<o+s-1;l++){let p=l%2===0,a=[],c=Math.max(0,l-o+1),g=Math.min(s-1,l);for(let r=c;r<=g;r++){let f=l-r;if(f>=0&&f<o)a.push({x:f,y:r})}if(Math.random()>0.55)a.reverse();if(p)for(let r=a.length-1;r>=0;r--)yield a[r];else yield*a}break}case"BRUSH_STROKES":{let l=Array.from({length:s},()=>Array(o).fill(!1)),p=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],a=(r,f)=>r>=0&&r<o&&f>=0&&f<s,c=0,g=o*s;for(let r=0;r<g*6&&c<g;r++){let f=Math.floor(Math.random()*o),w=Math.floor(Math.random()*s),u=p[Math.floor(Math.random()*p.length)],b=3+Math.floor(Math.random()*16);for(let m=0;m<b;m++){if(!a(f,w))break;if(!l[w][f])l[w][f]=!0,c++,yield{x:f,y:w};if(Math.random()>0.72)u=p[Math.floor(Math.random()*p.length)];f+=u.x,w+=u.y}}for(let r=0;r<s;r++)for(let f=0;f<o;f++)if(!l[r][f])yield{x:f,y:r};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let l=new Set,p=o*s,a=Math.floor(o/2),c=Math.floor(s/2),g=[[1,0],[0,1],[-1,0],[0,-1]],r=0,f=1,w=(b,m)=>b>=0&&b<o&&m>=0&&m<s,u=function*(){let b=0;while(b<p){for(let m=0;m<2;m++){for(let z=0;z<f;z++){if(w(a,c)){let H=`${a},${c}`;if(!l.has(H)){if(l.add(H),yield{x:a,y:c},b++,b>=p)return}}a+=g[r][0],c+=g[r][1]}r=(r+1)%4}f++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let b=[...u()];for(let m=b.length-1;m>=0;m--)yield b[m]}break}case"SCRIBBLE":{let l=new Set,p=o*s,a=Math.floor(o/2),c=Math.floor(s/2);for(let g=0;l.size<p&&g<p*24;g++){let r=`${a},${c}`;if(!l.has(r))l.add(r),yield{x:a,y:c};if(a+=Math.floor(Math.random()*3)-1,c+=Math.floor(Math.random()*3)-1,a<0||a>=o||c<0||c>=s)a=Math.floor(Math.random()*o),c=Math.floor(Math.random()*s)}for(let g=0;g<s;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(l.has(f))continue;l.add(f),yield{x:r,y:g}}break}case"CROSSHATCH":{let l=[];for(let c=0;c<o+s-1;c++)for(let g=Math.max(0,c-o+1);g<=Math.min(s-1,c);g++){let r=c-g;l.push({x:r,y:g})}let p=[];for(let c=-s+1;c<o;c++)for(let g=0;g<s;g++){let r=g+c;if(r>=0&&r<o)p.push({x:r,y:g})}let a=new Set;for(let c of[...l,...p]){let g=`${c.x},${c.y}`;if(a.has(g))continue;a.add(g),yield c}break}case"WAVE_SWEEP":{let l=new Set;for(let p=0;p<o;p++){let c=(Math.sin(p/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(s-1)|0;for(let g=0;g<s;g++){let r=c+g,f=c-g;for(let w of[r,f]){if(w<0||w>=s)continue;let u=`${p},${w}`;if(l.has(u))continue;l.add(u),yield{x:p,y:w}}}}break}case"SCATTERED_LINES":{let l=new Set,p=o*s;for(let a=0;l.size<p&&a<p*14;a++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*s),r=Math.random()*Math.PI*2,f=Math.round(Math.cos(r)),w=Math.round(Math.sin(r)),u=6+Math.floor(Math.random()*28);for(let b=0;b<u;b++){if(c<0||c>=o||g<0||g>=s)break;let m=`${c},${g}`;if(!l.has(m))l.add(m),yield{x:c,y:g};c+=f,g+=w}}for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=`${c},${a}`;if(l.has(g))continue;l.add(g),yield{x:c,y:a}}break}case"CONTOUR_JITTER":{let l=new Set;for(let p=0;p<Math.ceil(Math.min(o,s)/2);p++){let a=[],c=p,g=p,r=o-p-1,f=s-p-1;for(let w=c;w<=r;w++)a.push({x:w,y:g});for(let w=g+1;w<=f;w++)a.push({x:r,y:w});for(let w=r-1;w>=c;w--)a.push({x:w,y:f});for(let w=f-1;w>g;w--)a.push({x:c,y:w});for(let w=a.length-1;w>0;w--){let u=Math.floor(Math.random()*(w+1)),b=a[w];a[w]=a[u],a[u]=b}for(let w of a){let u=`${w.x},${w.y}`;if(l.has(u))continue;l.add(u),yield w}}break}case"SPIRAL_WOBBLE":{let l=new Set,p=o/2,a=s/2,c=Math.hypot(p,a);for(let g=0;l.size<o*s&&g<o*s*9;g++){let r=g/(o*s*9)*c,f=g*0.31+Math.sin(g*0.07)*0.7,w=Math.round(p+Math.cos(f)*r),u=Math.round(a+Math.sin(f)*r);if(w<0||w>=o||u<0||u>=s)continue;let b=`${w},${u}`;if(l.has(b))continue;l.add(b),yield{x:w,y:u}}for(let g=0;g<s;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(l.has(f))continue;yield{x:r,y:g}}break}case"CLUSTER_BURSTS":{let l=new Set,p=o*s;for(let a=0;l.size<p&&a<p*12;a++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*s),r=2+Math.floor(Math.random()*10);for(let f=g-r;f<=g+r;f++)for(let w=c-r;w<=c+r;w++){if(w<0||w>=o||f<0||f>=s)continue;if(Math.hypot(w-c,f-g)>r)continue;let u=`${w},${f}`;if(l.has(u))continue;l.add(u),yield{x:w,y:f}}}for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=`${c},${a}`;if(l.has(g))continue;l.add(g),yield{x:c,y:a}}break}case"ORBITAL":{let l=new Set,p=(o-1)/2,a=(s-1)/2,c=Math.ceil(Math.max(p,a));for(let g=0;g<=c;g++){let r=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,g)*2));for(let f=0;f<r;f++){let w=f/r*Math.PI*2+(g%2?0.3:-0.3),u=Math.round(p+Math.cos(w)*g),b=Math.round(a+Math.sin(w)*g);if(u<0||u>=o||b<0||b>=s)continue;let m=`${u},${b}`;if(l.has(m))continue;l.add(m),yield{x:u,y:b}}}for(let g=0;g<s;g++)for(let r=0;r<o;r++){let f=`${r},${g}`;if(l.has(f))continue;yield{x:r,y:g}}break}case"FLOW_FIELD":{let l=new Set,p=o*s;for(let a=0;l.size<p&&a<p*18;a++){let c=Math.floor(Math.random()*o),g=Math.floor(Math.random()*s);for(let r=0;r<120;r++){if(c<0||c>=o||g<0||g>=s)break;let f=`${c},${g}`;if(!l.has(f))l.add(f),yield{x:c,y:g};let w=Math.sin(c*0.09)*1.8+Math.cos(g*0.08)*1.6+Math.sin((c+g)*0.05);c+=Math.round(Math.cos(w)),g+=Math.round(Math.sin(w))}}for(let a=0;a<s;a++)for(let c=0;c<o;c++){let g=`${c},${a}`;if(l.has(g))continue;l.add(g),yield{x:c,y:a}}break}case"EDGE_IN":{let l=new Set,p=Math.ceil(Math.min(o,s)/2);for(let a=0;a<p;a++){let c=a,g=o-1-a,r=a,f=s-1-a;for(let w=c;w<=g;w++)for(let u of[r,f]){let b=`${w},${u}`;if(l.has(b))continue;l.add(b),yield{x:w,y:u}}for(let w=r+1;w<=f-1;w++)for(let u of[c,g]){let b=`${u},${w}`;if(l.has(b))continue;l.add(b),yield{x:u,y:w}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),N(this.bot)}move(o){if(!this.moveInfo)return;let s=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),l=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=s+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-s)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,s+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=l+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-l)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,l+this.moveInfo.height);this.update(),N(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let s=o.target;if(s.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(s.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(s.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(s.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${$}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var Uo=`/* stylelint-disable declaration-no-important */
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
  padding-bottom: 10px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: 214px;
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
`;class ao extends Error{name="KGlacerMacroError";constructor(o,s){super(o);s.widget.status=o}}class go extends ao{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var Q={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function k(o,s){let l=s.key.toLowerCase(),p=o.key.toLowerCase(),c=l==="/"&&(p==="/"||p==="?"||o.code==="Slash")||p===l,g=s.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,r=s.ctrl===!0?!0:s.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(s.shift)&&g&&r&&o.altKey===Boolean(s.alt)}function ho(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let s=o.tagName.toLowerCase();return s==="input"||s==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Po=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Ko="kglacer-macro:overlay-hidden",Eo="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class ro extends O{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$captureTemplate;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Po,F(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$captureTemplate:".capture-template",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=Eo,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$captureTemplate.addEventListener("click",()=>{this.captureTemplate()}),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=X(),this.$locale.addEventListener("change",()=>{oo(this.$locale.value),F(this.element);for(let s=0;s<this.bot.images.length;s++)this.bot.images[s].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${$}`,o.click(),await j(o,["change"],["cancel","error"]);let s=o.files?.[0];if(!s)throw new go(this.bot);console.log("[KGM][Widget] File selected",{name:s.name,size:s.size,type:s.type});let l;if(s.name.endsWith(`.${$}`))l=await R.fromJSON(this.bot,JSON.parse(await s.text()));else{let p=new FileReader;p.readAsDataURL(s),await j(p,["load"],["error"]);let a=await this.compressImageBeforeLoad(p.result),c=new Image;c.src=a,await j(c,["load"],["error"]),l=new R(this.bot,P.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new Z(this.bot,c))}this.bot.images.push(l),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),l.updateTasks(),N(this.bot,!0),this.bot.updateTasks(),this.update()},()=>{this.setDisabled("add-image",!1)})}captureTemplate(){return this.setDisabled("capture-template",!0),this.run("Capturing map image",async()=>{let o=await this.selectCaptureBounds(),{minGlobalX:s,minGlobalY:l,maxGlobalX:p,maxGlobalY:a}=o,c=document.createElement("canvas");c.width=Math.max(1,p-s+1),c.height=Math.max(1,a-l+1);let g=c.getContext("2d");if(!g)throw new Error("Capture context unavailable");g.imageSmoothingEnabled=!1;let r=Math.floor(s/J),f=Math.floor(l/J),w=Math.floor(p/J),u=Math.floor(a/J),b=(w-r+1)*(u-f+1),m=0;for(let H=r;H<=w;H++)for(let M=f;M<=u;M++){this.status=`⌛ Reading tiles [${++m}/${b}]`;let n=await this.loadTileImage(H,M),A=H*J,U=M*J,h=Math.max(s,A),B=Math.min(p,A+J-1),K=Math.max(l,U),i=Math.min(a,U+J-1),S=h-A,v=K-U,_=B-h+1,D=i-K+1,t=h-s,x=K-l;g.drawImage(n,S,v,_,D,t,x,_,D)}let z=Date.now();await this.downloadCapture(c,"png",z),await this.downloadCapture(c,"webp",z)},()=>{this.setDisabled("capture-template",!1)})}async downloadCapture(o,s,l){let p=s==="webp"?"image/webp":"image/png",a=await new Promise((r,f)=>{o.toBlob((w)=>{if(!w){f(new Error(`Failed to create ${s.toUpperCase()} capture file`));return}r(w)},p)}),c=URL.createObjectURL(a),g=document.createElement("a");g.href=c,g.download=`wplace-capture-${l}.${s}`,g.click(),URL.revokeObjectURL(c)}async loadTileImage(o,s){let l=await fetch(`https://backend.wplace.live/files/s0/tiles/${o}/${s}.png`,{credentials:"include"});if(!l.ok)throw new Error(`Tile fetch failed (${o}/${s})`);let p=await l.blob(),a=new Image,c=URL.createObjectURL(p);return a.src=c,await j(a,["load"],["error"]),URL.revokeObjectURL(c),a}selectCaptureBounds(){return new Promise((o,s)=>{let l=document.createElement("div");l.className="kgm-capture-overlay",l.innerHTML=`<div class="kgm-capture-hint">${d("captureTemplate")}: A → B</div><div class="kgm-capture-box"></div>`;let p=l.querySelector(".kgm-capture-box");document.body.append(l);let a,c,g=()=>{window.removeEventListener("keydown",b,!0),l.removeEventListener("pointermove",w),l.removeEventListener("pointerdown",u),l.remove()},r=(m)=>{let z=Math.min(a.x,m.x),H=Math.min(a.y,m.y),M=Math.abs(a.x-m.x)+1,n=Math.abs(a.y-m.y)+1;return{left:z,top:H,width:M,height:n}},f=(m)=>{let{left:z,top:H,width:M,height:n}=r(m);p.style.left=`${z}px`,p.style.top=`${H}px`,p.style.width=`${M}px`,p.style.height=`${n}px`},w=(m)=>{if(!a)return;f({x:m.clientX,y:m.clientY})},u=(m)=>{if(m.preventDefault(),!a){a={x:m.clientX,y:m.clientY};let h=P.fromScreenPosition(this.bot,a);c={x:h.globalX,y:h.globalY},f(a);return}let z={x:m.clientX,y:m.clientY},H=P.fromScreenPosition(this.bot,z);if(g(),!c){s(new Error("Capture anchor point unavailable"));return}let M=Math.min(c.x,H.globalX),n=Math.min(c.y,H.globalY),A=Math.max(c.x,H.globalX),U=Math.max(c.y,H.globalY);if(A-M<1||U-n<1){s(new Error("Capture area too small"));return}o({minGlobalX:M,minGlobalY:n,maxGlobalX:A,maxGlobalY:U})},b=(m)=>{if(m.key!=="Escape")return;g(),s(new Error("Capture cancelled"))};window.addEventListener("keydown",b,!0),l.addEventListener("pointermove",w),l.addEventListener("pointerdown",u)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let s=new Image;if(s.src=o,await j(s,["load"],["error"]),!(s.naturalWidth*s.naturalHeight>3000000||o.length>3000000))return o;let p=document.createElement("canvas");p.width=s.naturalWidth,p.height=s.naturalHeight;let a=p.getContext("2d");if(!a)return o;return a.drawImage(s,0,0),p.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,s=0;for(let c=0;c<this.bot.images.length;c++){let g=this.bot.images[c];o+=g.pixels.pixels.length*g.pixels.pixels[0].length,s+=g.tasks.length}let l=Math.max(0,o-s),p=o>0?l/o*100|0:0;this.$progressText.textContent=`${l}/${o} ${p}% ETA: ${s/120|0}h`,this.$progressLine.style.transform=`scaleX(${p/100})`,this.$images.innerHTML="";let a=document.createDocumentFragment();for(let c=0;c<this.bot.images.length;c++){let g=this.bot.images[c],r=document.createElement("div");a.append(r),r.className="image",r.innerHTML=`<button class="preview" title="View preview">
  <img src="${g.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${c===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${c===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,r.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=c,g.openPreviewPanel()}),r.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=c,g.openColorPanel()}),r.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=c,g.openPreviewPanel()}),r.querySelector(".download").addEventListener("click",()=>{g.exportImage()}),r.querySelector(".delete").addEventListener("click",()=>{g.destroy()}),r.querySelector(".up").addEventListener("click",()=>{po(this.bot.images,c,c-1),this.update(),N(this.bot)}),r.querySelector(".down").addEventListener("click",()=>{po(this.bot.images,c,c+1),this.update(),N(this.bot)})}this.$images.append(a)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Ko)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let s=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",s),localStorage.setItem(Ko,String(s)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${d("toggleOverlay")} (${d("disabled")})`:`${d("toggleOverlay")} (${d("enabled")})`}setDisabled(o,s){this.element.querySelector("."+o).disabled=s}async run(o,s,l,p="..."){console.log("[KGM][Widget] Task started",{status:o});let a=this.status;this.status=`${p} ${o}`;try{let c=await s();return this.status=a,console.log("[KGM][Widget] Task completed",{status:o}),c}catch(c){if(!(c instanceof ao))console.error(c),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:c}),c}finally{await l?.()}}handleKeyboard(o){if(ho(o.target))return;if(k(o,Q.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(k(o,Q.showShortcuts)){o.preventDefault(),this.open=!0,this.$shortcuts.open=!0,this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(k(o,Q.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(k(o,Q.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(k(o,Q.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(k(o,Q.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(k(o,Q.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(k(o,Q.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(k(o,Q.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),N(this.bot)}}var So=2,Qo="[KGM]",ko="kglacer-macro:access-ok",fo="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Do="kgm-access-locked";class qo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,s){if(s===void 0)console.log(`${Qo} ${o}`);else console.log(`${Qo} ${o}`,s)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Do);let o=No();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let l=0;l<o.images.length;l++){let p=o.images[l];I({x:p.position[0]-1000,y:p.position[1]-1000}),I({x:p.position[0]+1000,y:p.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let s=document.createElement("style");s.textContent=Uo.replace("FAKE_FAVORITE_LOCATIONS",E.length.toString()),document.head.append(s),this.log("Styles injected",{fakeFavoriteLocations:E.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Do),this._widget=new ro(this),await this.widget.run("Initializing",async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let l=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((p)=>{for(let a=0;a<p.length;a++)if(p[a].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(l,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await q(500),await this.updateColors(),o)for(let p=0;p<o.images.length;p++){let a=await R.fromJSON(this,o.images[p]);this.images.push(a),a.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.widget.setDisabled("capture-template",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(ko)===fo)return;await new Promise((o)=>{let s=document.createElement("dialog");s.className="kgm-modal access-dialog",s.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(s),F(s);let l=s.querySelector(".access-input"),p=s.querySelector(".access-error"),a=s.querySelector(".access-locale");a.innerHTML=mo().map((c)=>`<option value="${c}" ${c===X()?"selected":""}>${c.toUpperCase()}</option>`).join(""),a.addEventListener("change",()=>{oo(a.value),F(s)}),s.addEventListener("cancel",(c)=>{c.preventDefault()}),s.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault();let g=atob(fo);if(l.value.trim()!==g){p.textContent=d("invalidAccessKey");return}localStorage.setItem(ko,fo),s.close(),s.remove(),o()}),s.showModal(),l.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),s=(l)=>{if(!l.shiftKey)l.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",s,!0),o.addEventListener("wheel",s,!0),this.updateTasks();let l=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),p=Math.floor(l.charges.count);this.log("Charges fetched",{charges:p});let a=0;for(let c=0;c<this.images.length;c++)a+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:a}),this.strategy){case"ALL":{while(p>0){let c=!0;for(let g=0;g<this.images.length;g++){let r=this.images[g].tasks.shift();if(!r)continue;this.drawTask(r),p--,await q(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<a&&p>0;c++){let g=1,r;for(let f=0;f<this.images.length;f++){let w=this.images[f],u=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(u<g)g=u,r=w}this.drawTask(r.tasks.shift()),p--,await q(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let g=this.images[c];for(let r=g.tasks.shift();r&&p>0;r=g.tasks.shift())this.drawTask(r),p--,await q(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:p})},()=>{globalThis.removeEventListener("mousemove",s,!0),o.removeEventListener("wheel",s,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:So,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let s=document.querySelector(".maplibregl-canvas"),l=window.innerWidth/2,p=window.innerHeight/2,a=l-o.x,c=p-o.y;function g(r,f,w){s.dispatchEvent(new MouseEvent(r,{bubbles:!0,cancelable:!0,clientX:f,clientY:w,buttons:1}))}g("mousedown",l,p),g("mousemove",a,c),g("mouseup",a,c)}readMap(){this.mapsCache.clear();let o=new Set;for(let l=0;l<this.images.length;l++){let p=this.images[l],{tileX:a,tileY:c}=new P(this,p.position.globalX+p.pixels.pixels[0].length,p.position.globalY+p.pixels.pixels.length);for(let g=p.position.tileX;g<=a;g++)for(let r=p.position.tileY;r<=c;r++)o.add(`${g}/${r}`)}let s=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(l)=>{this.mapsCache.set(l,await Z.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${l}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++s}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let s=0,l=1,p=1/0,a=1/0;for(let r=0;r<this.$stars.length;r++){let{x:f,y:w}=L(this.$stars[r]);if(f<o.x&&w<o.y){let u=o.x-f+(o.y-w);if(u<p)p=u,s=r}else if(f>o.x&&w>o.y){let u=f-o.x+(w-o.y);if(u<a)a=u,l=r}}let c=L(this.$stars[s]),g=G[s];return{anchorScreenPosition:c,anchorWorldPosition:g,pixelSize:(L(this.$stars[l]).x-c.x)/(G[l].x-g.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await q(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await q(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await q(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let s=o.position.pixelSize/2,l=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:l.x+s,clientY:l.y+s,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,s=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(l,p)=>{let a=await o(l,p),c=a.clone(),g="";if(typeof l=="string")g=l;else if(l instanceof Request)g=l.url;else if(l instanceof URL)g=l.href;if(a.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...E),this.me.maxFavoriteLocations=1/0,a.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let r=s.exec(g);if(r){for(let f=0;f<this.markerPixelPositionResolvers.length;f++)this.markerPixelPositionResolvers[f](new P(this,+r[1],+r[2],+r[3],+r[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return a}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await q(1)}waitForElement(o,s){return this.log("Waiting for element",{name:o,selector:s}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((l)=>{let p=document.querySelector(s);if(p){l(p);return}let a=new MutationObserver(()=>{let c=document.querySelector(s);if(c)a.disconnect(),l(c)});a.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,E.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new qo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
