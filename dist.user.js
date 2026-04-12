// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      2.1.7
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
function y(o,p,a){let s=o[a];return o[a]=o[p],o[p]=s,o}function oo(o,p){let a=o.indexOf(p);if(a!==-1)o.splice(a,1);return a}var al=Math.floor(Math.random()*65536),pl=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function D(o){return new Promise((p)=>setTimeout(p,o))}function Y(o,p,a=["error"],s="addEventListener"){return new Promise((l,c)=>{for(let f=0;f<p.length;f++)o[s]?.(p[f],l);for(let f=0;f<a.length;f++)o[s]?.(a[f],c)})}class Lo{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:a}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+a<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,a)=>p+a.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,a=Math.min(p,this.historyTime);return{time:o,historyTime:a}}}var bo=["kglacermacro:locale"],$={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Hand-painted blocks",humanSoftDither:"Soft hand dithering",humanPatchy:"Patchy hand fill",humanSweepArcs:"Arc hand sweeps",humanMicroCorrections:"Micro touch-ups",humanJitterFill:"Jittered hand fill",humanCornerBias:"Corner-first hand pass",humanLongStrokes:"Long hand strokes",humanTapClusters:"Tap clusters",humanMessySpiral:"Messy spiral pass",humanDrunkWalk:"Wandering hand path",humanNoiseCloud:"Noisy cloud pass",humanPatchJump:"Patch hopping",humanHesitantLines:"Hesitant hand lines",humanOverlapSweeps:"Overlapping hand sweeps",humanWobbleDrift:"Wobble drift",humanGapRecovery:"Gap recovery pass",humanStaircase:"Stair-step hand pass",humanEdgeHugger:"Edge-hugging hand pass",humanBlobs:"Blobby hand fill",humanBacktrack:"Backtracking hand pass",humanShakyDiagonal:"Shaky diagonal sweep",humanLateFixes:"Late fix-up pass",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutToggleWidget:"Toggle widget",shortcutToggleOverlay:"Toggle overlays",shortcutDraw:"Draw",shortcutAddImage:"Add image",shortcutFocusList:"Focus shortcuts",shortcutNextImage:"Next image",shortcutPreviousImage:"Previous image",shortcutColorPanel:"Color panel",shortcutLockImage:"Lock image",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of the currently selected paint mode using the KGlacer logo.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays",overlaySection:"Overlay",accessTitle:"Access key",accessHelp:"Enter your serial key to continue. You can also pick the UI language before starting.",accessInputLabel:"Serial key",accessInputPlaceholder:"KGM-********",accessContinue:"Continue",invalidAccessKey:"Invalid serial key. Please try again."},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Bloques pintados a mano",humanSoftDither:"Difuminado manual suave",humanPatchy:"Relleno manual por parches",humanSweepArcs:"Barridos manuales en arco",humanMicroCorrections:"Micro retoques manuales",humanJitterFill:"Relleno manual con temblor",humanCornerBias:"Barrido manual desde esquinas",humanLongStrokes:"Trazos manuales largos",humanTapClusters:"Toques manuales por grupos",humanMessySpiral:"Espiral manual desordenada",humanDrunkWalk:"Recorrido manual inestable",humanNoiseCloud:"Nube manual con ruido",humanPatchJump:"Saltos manuales entre parches",humanHesitantLines:"Líneas manuales con duda",humanOverlapSweeps:"Barridos manuales superpuestos",humanWobbleDrift:"Deriva manual temblorosa",humanGapRecovery:"Pasada manual de relleno de huecos",humanStaircase:"Pasada manual en escalera",humanEdgeHugger:"Pasada manual pegada al borde",humanBlobs:"Relleno manual en manchas",humanBacktrack:"Pasada manual con retrocesos",humanShakyDiagonal:"Barrido diagonal tembloroso",humanLateFixes:"Retoques manuales al final",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutToggleWidget:"Mostrar/ocultar widget",shortcutToggleOverlay:"Mostrar/ocultar overlays",shortcutDraw:"Dibujar",shortcutAddImage:"Agregar imagen",shortcutFocusList:"Enfocar atajos",shortcutNextImage:"Siguiente imagen",shortcutPreviousImage:"Imagen anterior",shortcutColorPanel:"Panel de colores",shortcutLockImage:"Bloquear imagen",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada del modo de pintado seleccionado usando el logo de KGlacer.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays",overlaySection:"Overlay",accessTitle:"Clave de acceso",accessHelp:"Ingresa tu serial para continuar. También puedes elegir el idioma antes de iniciar.",accessInputLabel:"Serial",accessInputPlaceholder:"KGM-********",accessContinue:"Continuar",invalidAccessKey:"Serial inválido. Inténtalo de nuevo."}};function ko(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function _(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in $)return o;for(let p=0;p<bo.length;p++){let a=localStorage.getItem(bo[p]);if(!a||!(a in $))continue;return localStorage.setItem("kglacer-macro:locale",a),a}return ko()}function I(o){localStorage.setItem("kglacer-macro:locale",o)}function mo(){return Object.keys($)}function d(o){let p=_();return $[p][o]}function K(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=d(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",d(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",d(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",d(p.dataset.i18nPlaceholder))}class h{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let a in p)this[a]=o.querySelector(p[a])}registerEvent(o,p,a,s={}){s.passive??=!0,o.addEventListener(p,a,s),this.runOnDestroy.push(()=>{o.removeEventListener(p,a)})}}function lo(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function Ho(o,p,a){let s=lo(o/255),l=lo(p/255),c=lo(a/255),f=Math.cbrt(0.4122214708*s+0.5363325363*l+0.0514459929*c),g=Math.cbrt(0.2119034982*s+0.6806995451*l+0.1073969566*c),r=Math.cbrt(0.0883024619*s+0.2817188376*l+0.6299787005*c),w=0.2104542553*f+0.793617785*g-0.0040720468*r,u=1.9779984951*f-2.428592205*g+0.4505937099*r,b=0.0259040371*f+0.7827717662*g-0.808675766*r;return[w,u,b]}function Ao(o,p,a){let[s,l,c]=o,[f,g,r]=p,w=(e)=>e*180/Math.PI,u=(e)=>e*Math.PI/180,b=1,m=1,H=1,A=Math.sqrt(l**2+c**2),z=Math.sqrt(g**2+r**2),G=(A+z)/2,n=0.5*(1-Math.sqrt(G**7/(G**7+6103515625))),E=l*(1+n),S=g*(1+n),F=Math.sqrt(E**2+c**2),O=Math.sqrt(S**2+r**2),t=c===0&&E===0?0:w(Math.atan2(c,E))%360,x=r===0&&S===0?0:w(Math.atan2(r,S))%360,co=f-s,fo=O-F,L=0;if(F*O!==0){if(L=x-t,L>180)L-=360;else if(L<-180)L+=360}let go=2*Math.sqrt(F*O)*Math.sin(u(L)/2),ro=(s+f)/2,i=(F+O)/2,k=(t+x)/2;if(Math.abs(t-x)>180)k+=180;let Yo=1-0.17*Math.cos(u(k-30))+0.24*Math.cos(u(2*k))+0.32*Math.cos(u(3*k+6))-0.2*Math.cos(u(4*k-63)),qo=1+0.015*(ro-50)**2/Math.sqrt(20+(ro-50)**2),wo=1+0.045*i,uo=1+0.015*i*Yo,Zo=30*Math.exp((-((k-275)/25))**2),jo=-(2*Math.sqrt(i**7/(i**7+6103515625)))*Math.sin(u(2*Zo));return Math.sqrt((co/(1*qo))**2+(fo/(1*wo))**2+(go/(1*uo))**2+jo*(fo/(1*wo))*(go/(1*uo)))-co*a}var q=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],Q=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function zo(o){if(o===0)return"transparent";let p=q[o],a=`oklab(${p[0]*100}% ${p[1]} ${p[2]})`;if(typeof CSS!=="undefined"&&CSS.supports("color",a))return a;let[s=0,l=0,c=0]=(Q[o]??"0,0,0").split(",").map((f)=>Number.parseInt(f,10));return`rgb(${s} ${l} ${c})`}var Mo=`<div class="wtopbar">
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
`;class W{bot;image;width;brightness;exactColor;static async fromJSON(o,p){let a=new Image;return a.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((s)=>s.blob()).then((s)=>URL.createObjectURL(s)):p.url,await Y(a,["load"],["error"]),new W(o,a,p.width,p.brightness,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,a=p.naturalWidth,s=0,l=!1){this.bot=o;this.image=p;this.width=a;this.brightness=s;this.exactColor=l;if(l)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let a=1;a<64;a++)if(this.exactColor||!this.bot.unavailableColors.has(a))o.set(Q[a],[a,a]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let a=0;a<this.canvas.height;a++)for(let s=0;s<this.canvas.width;s++){let l=(a*this.canvas.width+s)*4,c=p[l],f=p[l+1],g=p[l+2],r=p[l+3],w=`${c},${f},${g}`;if(this.exactColor){this.pixels[a][s]=r<100?0:Q.indexOf(w);continue}let u,b;if(r<100)u=b=0;else if(o.has(w))[u,b]=o.get(w);else{let H=1/0,A=1/0;for(let z=0;z<q.length;z++){let G=q[z],n=Ao(Ho(c,f,g),G,this.brightness);if(!this.bot.unavailableColors.has(z)&&n<H)H=n,u=z;if(n<A)A=n,b=z}o.set(w,[u,b])}if(u!==0)this.context.fillStyle=`oklab(${q[u][0]*100}% ${q[u][1]} ${q[u][2]})`,this.context.fillRect(s,a,1,1);this.pixels[a][s]=u;let m=this.colors.get(b);if(m)m.amount++;else this.colors.set(b,{color:u,amount:1,realColor:b})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var R="kglacer-macro-settings",no=["kglacermacro","wbot"],T="kgm";function Xo(){let o=[R,...no];for(let p=0;p<o.length;p++){let a=o[p],s=localStorage.getItem(a);if(!s)continue;return{json:s,key:a}}return}function Jo(){let o=Xo();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let a=p;p.images=a.widget.images,p.strategy=a.widget.strategy,delete a.widget}if(o.key!==R)localStorage.setItem(R,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Go;function M(o,p=!1){if(clearTimeout(Go),p)localStorage.setItem(R,JSON.stringify(o));else Go=setTimeout(()=>{localStorage.setItem(R,JSON.stringify(o))},600)}var J=1000,Vo=2048,X=J*Vo,B=[],V=[],Eo=Date.now();function C(o){B.push(o),V.push({id:Eo++,latitude:(2*Math.atan(Math.exp(-(o.y/X*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/X*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}C({x:X/3|0,y:X/3|0});C({x:X/3*2|0,y:X/3*2|0});function Z(o){let[p,a]=o.style.transform.slice(32,-31).split(", ").map((s)=>Number.parseFloat(s));return{x:p,y:a}}class N{bot;static fromJSON(o,p){return new N(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:a,pixelSize:s,anchorWorldPosition:l}=o.findAnchorsForScreen(p);return new N(o,l.x+(p.x-a.x)/s|0,l.y+(p.y-a.y)/s|0)}globalX=0;globalY=0;get tileX(){return this.globalX/J|0}set tileX(o){this.globalX=o*J+this.x}get tileY(){return this.globalY/J|0}set tileY(o){this.globalY=o*J+this.y}get x(){return this.globalX%J}set x(o){this.globalX=this.tileX*J+o}get y(){return this.globalY%J}set y(o){this.globalY=this.tileY*J+o}anchor1Index;anchor2Index;get pixelSize(){return(Z(this.bot.$stars[this.anchor2Index]).x-Z(this.bot.$stars[this.anchor1Index]).x)/(B[this.anchor2Index].x-B[this.anchor1Index].x)}constructor(o,p,a,s,l){this.bot=o;if(s===void 0||l===void 0)this.globalX=p,this.globalY=a;else this.globalX=p*J+s,this.globalY=a*J+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let a=0;a<B.length;a++){let{x:s,y:l}=B[a];if(s<this.globalX&&l<this.globalY){let c=this.globalX-s+(this.globalY-l);if(c<o)o=c,this.anchor1Index=a}else if(s>this.globalX&&l>this.globalY){let c=s-this.globalX+(l-this.globalY);if(c<p)p=c,this.anchor2Index=a}}}toScreenPosition(){let o=B[this.anchor1Index],p=Z(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new N(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}var So="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class j extends h{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new j(o,N.fromJSON(o,p.position),await W.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$closeColors;$closePreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;suppressNextColorDialogBackdropClick=!1;logoPreviewMask;logoPreviewImage;previewCacheSignature;previewSequenceCache=new Map;previewAnimations=new WeakMap;previewAnimationHandles=new Set;constructor(o,p,a,s="SPIRAL_FROM_CENTER",l=50,c=!1,f=!1,g=[],r=!1){super();this.bot=o;this.position=p;this.pixels=a;this.strategy=s;this.opacity=l;this.drawTransparentPixels=c;this.drawColorsInOrder=f;this.colors=g;this.lock=r;this.element.innerHTML=Mo,this.element.classList.add("wimage"),K(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$closeColors:".close-colors",$closePreview:".close-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.registerEvent(this.$strategy,"change",()=>{if(this.strategy=this.$strategy.value,this.$previewDialog.open)this.renderStrategyPreviewSamples();M(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),M(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let w;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(w),w=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),M(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),M(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,M(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,M(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),M(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$closeColors,"click",()=>{this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$closePreview,"click",()=>{this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorsDialog,"click",(u)=>{if(this.suppressNextColorDialogBackdropClick){this.suppressNextColorDialogBackdropClick=!1;return}if(u.target===this.$colorsDialog)this.closeDialog(this.$colorsDialog)}),this.registerEvent(this.$previewDialog,"click",(u)=>{if(u.target===this.$previewDialog)this.closeDialog(this.$previewDialog)}),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let u of this.element.querySelectorAll(".resize"))this.registerEvent(u,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,a=new Map;for(let s=0;s<this.colors.length;s++){let l=this.colors[s];if(l.disabled)p.add(l.realColor);a.set(l.realColor,s)}for(let{x:s,y:l}of this.strategyPositionIterator()){let c=this.pixels.pixels[l][s];if(p.has(c))continue;o.globalX=this.position.globalX+s,o.globalY=this.position.globalY+l;let f=o.getMapColor();if(c!==f&&(this.drawTransparentPixels||c!==0))this.tasks.push({position:o.clone(),color:c})}if(this.drawColorsInOrder)this.tasks.sort((s,l)=>(a.get(s.color)??0)-(a.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),a=Math.round(this.position.pixelSize*this.pixels.width),s=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(p)}px, 0)`,this.element.style.width=`${a}px`,this.element.style.height=`${s}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,c=Math.max(0,l-this.tasks.length),f=l>0?c/l*100|0:0;this.$progressText.textContent=`${c}/${l} ${f}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${f/100})`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}exportImage(){this.export()}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),oo(this.bot.images,this),this.bot.widget.update(),M(this.bot)}openColorPanel(){if(this.$colorsDialog.open){this.$colorSearch.focus();return}this.$colorsDialog.style.position="fixed",this.$colorsDialog.style.left="",this.$colorsDialog.style.top="",this.$colorsDialog.style.margin="auto",this.$colorsDialog.showModal(),this.$colorSearch.focus()}openPreviewPanel(){if(this.$previewDialog.open){this.renderStrategyPreviewSamples();return}this.$previewDialog.style.position="fixed",this.$previewDialog.style.left="",this.$previewDialog.style.top="",this.$previewDialog.style.margin="auto",this.$previewDialog.showModal(),this.renderStrategyPreviewSamples()}closeDialog(o){if(!o.open)return;if(o===this.$previewDialog)this.stopPreviewAnimations();if(typeof o.requestClose==="function")o.requestClose();else o.close()}stopPreviewAnimations(){for(let o of this.previewAnimationHandles)cancelAnimationFrame(o);this.previewAnimationHandles.clear()}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let a=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-a.left,offsetY:o.clientY-a.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),a=Math.max(8,window.innerWidth-p.width-8),s=Math.max(8,window.innerHeight-p.height-8),l=Math.min(a,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),c=Math.min(s,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(c)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.suppressNextColorDialogBackdropClick=!0;this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){this.stopPreviewAnimations(),this.invalidatePreviewCacheIfNeeded();let o=this.$strategy.value;this.$previewDialogList.innerHTML="";let p=document.createDocumentFragment(),a=document.createElement("article");a.className="preview-card";let s=document.createElement("strong");s.textContent=this.getStrategyLabel(o);let l=document.createElement("canvas");l.className="preview-canvas",l.width=156,l.height=156,this.paintStrategyPreview(l,o),a.append(s,l),p.append(a),this.$previewDialogList.append(p)}invalidatePreviewCacheIfNeeded(){let o=`${this.pixels.width}x${this.pixels.height}:${this.logoPreviewMask?.length??0}`;if(this.previewCacheSignature===o)return;this.previewCacheSignature=o,this.previewSequenceCache.clear()}getStrategyLabel(o){switch(o){case"RANDOM":return d("random");case"HUMANIZED":return d("humanized");case"HUMAN_SOFT_DITHER":return d("humanSoftDither");case"HUMAN_PATCHY":return d("humanPatchy");case"HUMAN_SWEEP_ARCS":return d("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return d("humanMicroCorrections");case"HUMAN_JITTER_FILL":return d("humanJitterFill");case"HUMAN_CORNER_BIAS":return d("humanCornerBias");case"HUMAN_LONG_STROKES":return d("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return d("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return d("humanMessySpiral");case"HUMAN_DRUNK_WALK":return d("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return d("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return d("humanPatchJump");case"HUMAN_HESITANT_LINES":return d("humanHesitantLines");case"HUMAN_OVERLAP_SWEEPS":return d("humanOverlapSweeps");case"HUMAN_WOBBLE_DRIFT":return d("humanWobbleDrift");case"HUMAN_GAP_RECOVERY":return d("humanGapRecovery");case"HUMAN_STAIRCASE":return d("humanStaircase");case"HUMAN_EDGE_HUGGER":return d("humanEdgeHugger");case"HUMAN_BLOBS":return d("humanBlobs");case"HUMAN_BACKTRACK":return d("humanBacktrack");case"HUMAN_SHAKY_DIAGONAL":return d("humanShakyDiagonal");case"HUMAN_LATE_FIXES":return d("humanLateFixes");case"ZIGZAG":return d("zigzag");case"BRUSH_STROKES":return d("brushStrokes");case"DIAGONAL_BRUSH":return d("diagonalBrush");case"DOWN":return d("down");case"UP":return d("up");case"LEFT":return d("left");case"RIGHT":return d("right");case"SPIRAL_FROM_CENTER":return d("spiralOut");case"SPIRAL_TO_CENTER":return d("spiralIn");case"SCRIBBLE":return d("scribble");case"CROSSHATCH":return d("crosshatch");case"WAVE_SWEEP":return d("waveSweep");case"SCATTERED_LINES":return d("scatteredLines");case"CONTOUR_JITTER":return d("contourJitter");case"SPIRAL_WOBBLE":return d("spiralWobble");case"CLUSTER_BURSTS":return d("clusterBursts");case"ORBITAL":return d("orbital");case"FLOW_FIELD":return d("flowField");case"EDGE_IN":return d("edgeIn");default:return o}}paintStrategyPreview(o,p){let a=o.getContext("2d");if(!a)return;a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height);let s=this.getLogoPreviewMask(),l=this.getCachedPreviewSequence(p,s),c=o.width/this.pixels.width,f=this.previewAnimations.get(o);if(f)cancelAnimationFrame(f),this.previewAnimationHandles.delete(f);let g=(A)=>{let z=requestAnimationFrame((G)=>{this.previewAnimationHandles.delete(z),A(G)});return this.previewAnimationHandles.add(z),z},r=(A)=>{a.fillStyle="#0f1526",a.fillRect(0,0,o.width,o.height),this.paintLogoGhost(a,c,s);for(let z=0;z<Math.min(A,l.length);z++){let G=l[z],n=z/Math.max(1,l.length-1);a.fillStyle=`hsl(${220-n*110} 90% ${43+n*18}%)`,a.fillRect(G.x*c,G.y*c,Math.max(1,c),Math.max(1,c))}},w=Math.min(3400,Math.max(900,l.length*8)),b=w+220,m=(A,z)=>{if(!this.$previewDialog.open)return;let G=(z-A)%b,n=Math.min(1,G/w),E=n*n*(3-2*n);r(Math.floor(l.length*E));let S=g((F)=>{m(A,F)});this.previewAnimations.set(o,S)},H=performance.now();m(H,H)}getCachedPreviewSequence(o,p){let a=`${o}:${this.pixels.width}x${this.pixels.height}:${p.length}`,s=this.previewSequenceCache.get(a);if(s)return s;let l=this.strategy;this.strategy=o;let c=[...this.strategyPositionIterator()];this.strategy=l;let f=new Set(p.map(({x:r,y:w})=>`${r}:${w}`)),g=c.filter(({x:r,y:w})=>f.has(`${r}:${w}`));return this.previewSequenceCache.set(a,g),g}paintLogoGhost(o,p,a){if(this.logoPreviewImage){o.save(),o.globalAlpha=0.22,o.drawImage(this.logoPreviewImage,0,0,this.pixels.width*p,this.pixels.height*p),o.restore();return}o.fillStyle="rgb(115 132 190 / 28%)";for(let s=0;s<a.length;s++){let l=a[s];o.fillRect(l.x*p,l.y*p,Math.max(1,p),Math.max(1,p))}}getLogoPreviewMask(){if(this.logoPreviewMask)return this.logoPreviewMask;this.logoPreviewMask=this.fallbackPreviewMask();let o=new Image;return o.src=So,o.decode().then(()=>{this.logoPreviewImage=o;let p=document.createElement("canvas");p.width=this.pixels.width,p.height=this.pixels.height;let a=p.getContext("2d");if(!a)return;if(a.clearRect(0,0,p.width,p.height),a.drawImage(o,0,0,p.width,p.height),this.logoPreviewMask=this.alphaMaskFromCanvas(a,p.width,p.height),this.previewSequenceCache.clear(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}).catch(()=>{return}),this.logoPreviewMask}alphaMaskFromCanvas(o,p,a){let s=o.getImageData(0,0,p,a).data,l=[];for(let c=0;c<a;c++)for(let f=0;f<p;f++)if((s[(c*p+f)*4+3]??0)>24)l.push({x:f,y:c});return l.length?l:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=this.pixels.width/2,a=this.pixels.height/2,s=Math.max(4,Math.min(this.pixels.width,this.pixels.height)/2.5);for(let l=0;l<this.pixels.height;l++)for(let c=0;c<this.pixels.width;c++)if((c-p)**2+(l-a)**2<=s**2)o.push({x:c,y:l});return o}applyLocale(){if(K(this.element),this.updateColors(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}colorHex(o){let p=Q[o]??"0,0,0",[a=0,s=0,l=0]=p.split(",").map((c)=>Number.parseInt(c,10));return`#${[a,s,l].map((c)=>c.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=Q[o]??"0,0,0",[a=0,s=0,l=0]=p.split(",").map((r)=>Number.parseInt(r,10)),c=Math.max(a,s,l),f=Math.min(a,s,l);if(c-f<15)return["gray","grey","gris","neutral","neutro"];if(a>s+30&&a>l+30)return["red","rojo"];if(s>a+30&&s>l+30)return["green","verde"];if(l>a+30&&l>s+30)return["blue","azul"];if(a>170&&s>120&&l<130)return["orange","naranja"];if(a>170&&s>110&&l>140)return["pink","rosa"];if(a>120&&s<100&&l>120)return["purple","violet","morado"];if(a>130&&s>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length;this.$colorsDialogList.setAttribute("aria-label",d("colorPanelResults"));let p=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((a)=>!this.pixels.colors.has(a.realColor)))this.colors=this.pixels.colors.values().toArray().sort((a,s)=>s.amount-a.amount).map((a)=>({realColor:a.realColor,disabled:!1})),M(this.bot);for(let a=0;a<this.colors.length;a++){let s=this.colors[a],l=this.pixels.colors.get(s.realColor),c=!1,f=l.realColor!==l.color,g=l.amount/o*100,r=this.colorHex(l.realColor),w=this.colorKeywords(l.realColor),u=()=>{s.disabled=s.disabled?void 0:!0,b.classList.toggle("disabled",Boolean(s.disabled));let H=b.querySelector(".state");if(H)H.textContent=s.disabled?d("disabled"):d("enabled");M(this.bot)},b=document.createElement("button");if(b.className=`color-chip ${s.disabled?"disabled":""}`,b.draggable=!0,b.setAttribute("aria-label",`${d("overlayColors")} #${a+1}: ${r.toUpperCase()}`),b.innerHTML=`<span class="order-index">#${a+1}</span>
<span class="drag" title="${d("up")} / ${d("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${g.toFixed(1)}%</span>
  <span class="hex">${r.toUpperCase()}</span>
  <span class="state">${s.disabled?d("disabled"):d("enabled")}</span>
</span>
<span class="premium ${f?"on":""}">${f?d("premium"):""}</span>`,b.querySelector(".swatch").style.setProperty("--swatch-color",zo(l.realColor)),b.addEventListener("click",()=>{if(c){c=!1;return}u()}),b.addEventListener("dragstart",(H)=>{c=!0,b.classList.add("dragging"),H.dataTransfer?.setData("text/plain",String(a)),H.dataTransfer.effectAllowed="move"}),b.addEventListener("dragend",()=>{b.classList.remove("dragging")}),b.addEventListener("dragover",(H)=>{H.preventDefault(),b.classList.add("drag-target")}),b.addEventListener("dragleave",()=>{b.classList.remove("drag-target")}),b.addEventListener("drop",(H)=>{H.preventDefault(),b.classList.remove("drag-target");let A=Number.parseInt(H.dataTransfer?.getData("text/plain")??"-1",10);if(A<0||A===a||A>=this.colors.length)return;this.colors.splice(a,0,...this.colors.splice(A,1)),M(this.bot),this.updateColors()}),f){let H=document.createElement("button");H.textContent=d("buy"),H.className="buy-chip",H.addEventListener("click",(A)=>{A.stopPropagation(),document.getElementById("color-"+l.realColor)?.click()}),b.append(H)}let m=`${r} ${w.join(" ")} ${l.realColor} ${Q[l.realColor]}`;if(!p||m.toLowerCase().includes(p))this.$colorsDialogList.append(b)}}*strategyPositionIterator(){let o=this.pixels.pixels[0].length,p=this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let a=0;a<p;a++)for(let s=0;s<o;s++)yield{x:s,y:a};break}case"UP":{for(let a=p-1;a>=0;a--)for(let s=0;s<o;s++)yield{x:s,y:a};break}case"LEFT":{for(let a=0;a<o;a++)for(let s=0;s<p;s++)yield{x:a,y:s};break}case"RIGHT":{for(let a=o-1;a>=0;a--)for(let s=0;s<p;s++)yield{x:a,y:s};break}case"RANDOM":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)a.push({x:l,y:s});for(let s=a.length-1;s>=0;s--){let l=Math.floor(Math.random()*(s+1)),c=a[s];a[s]=a[l],a[l]=c}yield*a;break}case"ZIGZAG":{for(let a=0;a<p;a++)if(a%2===0)for(let s=0;s<o;s++)yield{x:s,y:a};else for(let s=o-1;s>=0;s--)yield{x:s,y:a};break}case"HUMANIZED":{let a=Math.max(4,Math.floor(Math.min(o,p)/10)),s=[];for(let l=0;l<p;l+=a)for(let c=0;c<o;c+=a)s.push({x:c,y:l});for(let l=s.length-1;l>=0;l--){let c=Math.floor(Math.random()*(l+1)),f=s[l];s[l]=s[c],s[c]=f}for(let l=0;l<s.length;l++){let c=s[l],f=Math.min(p,c.y+a),g=Math.min(o,c.x+a);for(let r=c.y;r<f;r++)if(Math.random()>0.35)for(let u=c.x;u<g;u++)yield{x:u,y:r};else for(let u=g-1;u>=c.x;u--)yield{x:u,y:r}}break}case"HUMAN_SOFT_DITHER":{let a=new Set;for(let s=0;s<p;s++){let l=Math.floor(Math.random()*3)-1;if((s+l)%2===0)for(let f=0;f<o;f+=2)a.add(`${f},${s}`),yield{x:f,y:s};else for(let f=1;f<o;f+=2)a.add(`${f},${s}`),yield{x:f,y:s}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_PATCHY":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),f=1+Math.floor(Math.random()*5);for(let g=c-f;g<=c+f;g++)for(let r=l-f;r<=l+f;r++){if(r<0||r>=o||g<0||g>=p)continue;if(Math.hypot(r-l,g-c)>f+Math.random()*1.2)continue;let w=`${r},${g}`;if(a.has(w))continue;a.add(w),yield{x:r,y:g}}}break}case"HUMAN_SWEEP_ARCS":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.hypot(s,l);for(let f=0;f<4;f++){let g=Math.random()*Math.PI*2;for(let r=0;r<=c;r+=0.35){let w=Math.PI/2+Math.random()*(Math.PI/1.5),u=Math.max(10,Math.floor(r*8));for(let b=0;b<u;b++){let m=g+w*b/u+Math.sin(r)*0.08,H=Math.round(s+Math.cos(m)*r),A=Math.round(l+Math.sin(m)*r);if(H<0||H>=o||A<0||A>=p)continue;let z=`${H},${A}`;if(a.has(z))continue;a.add(z),yield{x:H,y:A}}}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let r=`${g},${f}`;if(a.has(r))continue;yield{x:g,y:f}}break}case"HUMAN_MICRO_CORRECTIONS":{let a=new Set;for(let s=0;s<p;s++){let l=s%2===0?1:-1,c=l>0?0:o-1;for(let f=0;f<o;f++){let g=c+(Math.random()>0.82?l:0),r=s+(Math.random()>0.9?1:0);for(let w of[{x:c,y:s},{x:g,y:s},{x:c,y:r}]){if(w.x<0||w.x>=o||w.y<0||w.y>=p)continue;let u=`${w.x},${w.y}`;if(a.has(u))continue;a.add(u),yield w}c+=l}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_JITTER_FILL":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++)a.push({x:l,y:s});a.sort((s,l)=>{let c=s.y+(Math.random()-0.5)*1.8,f=l.y+(Math.random()-0.5)*1.8;if(c!==f)return c-f;return s.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*a;break}case"HUMAN_CORNER_BIAS":{let a=[{x:0,y:0},{x:o-1,y:0},{x:0,y:p-1},{x:o-1,y:p-1}],s=a[Math.floor(Math.random()*a.length)],l=[];for(let c=0;c<p;c++)for(let f=0;f<o;f++){let r=Math.hypot(f-s.x,c-s.y)+Math.random()*3.5;l.push({point:{x:f,y:c},score:r})}l.sort((c,f)=>c.score-f.score);for(let c of l)yield c.point;break}case"HUMAN_LONG_STROKES":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),f=Math.random()*Math.PI*2,g=Math.sign(Math.cos(f)),r=Math.sign(Math.sin(f)),w=10+Math.floor(Math.random()*40);for(let u=0;u<w;u++){if(l<0||l>=o||c<0||c>=p)break;let b=`${l},${c}`;if(!a.has(b))a.add(b),yield{x:l,y:c};if(Math.random()>0.78)l+=r,c+=g;else l+=g,c+=r}}break}case"HUMAN_TAP_CLUSTERS":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),f=3+Math.floor(Math.random()*10);for(let g=0;g<f;g++){let r=Math.round(l+(Math.random()-0.5)*6),w=Math.round(c+(Math.random()-0.5)*6);if(r<0||r>=o||w<0||w>=p)continue;let u=`${r},${w}`;if(a.has(u))continue;a.add(u),yield{x:r,y:w}}}break}case"HUMAN_MESSY_SPIRAL":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.hypot(s,l)+2;for(let f=0;a.size<o*p;f++){let g=f/3,r=Math.min(c,g*0.18),w=g*0.29+Math.sin(g*0.13)*0.8,u=Math.round(s+Math.cos(w)*r+Math.sin(g)*0.7),b=Math.round(l+Math.sin(w)*r+Math.cos(g)*0.7);if(u<0||u>=o||b<0||b>=p){if(f>o*p*18)break;continue}let m=`${u},${b}`;if(a.has(m)){if(Math.random()>0.9)continue}else a.add(m),yield{x:u,y:b};if(f>o*p*18)break}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let r=`${g},${f}`;if(a.has(r))continue;yield{x:g,y:f}}break}case"HUMAN_DRUNK_WALK":{let a=new Set,s=Math.floor(Math.random()*o),l=Math.floor(Math.random()*p),c=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(a.size<o*p){let f=`${s},${l}`;if(!a.has(f))a.add(f),yield{x:s,y:l};let g=[];for(let u of c){let b=s+u.x,m=l+u.y;if(b<0||b>=o||m<0||m>=p)continue;g.push({x:b,y:m})}if(!g.length)break;let r=g.filter((u)=>{return!a.has(`${u.x},${u.y}`)});if(r.length&&Math.random()>0.2){let u=r[Math.floor(Math.random()*r.length)];s=u.x,l=u.y;continue}let w=g[Math.floor(Math.random()*g.length)];s=w.x,l=w.y}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let r=`${g},${f}`;if(a.has(r))continue;yield{x:g,y:f}}break}case"HUMAN_NOISE_CLOUD":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((s+1)*1.17+Math.random()*0.8),f=(Math.random()-0.5)*2.6,g=Math.hypot(l-o/2,s-p/2)*0.08;a.push({point:{x:l,y:s},score:c+f+g})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_PATCH_JUMP":{let a=new Set,s=[];for(let l=0;l<Math.max(6,o*p/18);l++)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});while(a.size<o*p){let l=s[Math.floor(Math.random()*s.length)],c=1+Math.floor(Math.random()*3),f=1+Math.floor(Math.random()*3);for(let g=l.y-f;g<=l.y+f;g++)for(let r=l.x-c;r<=l.x+c;r++){if(r<0||r>=o||g<0||g>=p)continue;if(Math.random()>0.86)continue;let w=`${r},${g}`;if(a.has(w))continue;a.add(w),yield{x:r,y:g}}if(Math.random()>0.72&&s.length<o*p/2)s.push({x:Math.floor(Math.random()*o),y:Math.floor(Math.random()*p)});if(a.size>o*p*0.92)break}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=`${c},${l}`;if(a.has(f))continue;yield{x:c,y:l}}break}case"HUMAN_HESITANT_LINES":{let a=new Set;for(let s=0;s<p;s++){let l=s%2===0;for(let c=0;c<o;c++){let f=l?c:o-1-c,g=`${f},${s}`;if(!a.has(g))a.add(g),yield{x:f,y:s};if(Math.random()>0.7){let r=Math.max(0,Math.min(o-1,f+(Math.random()>0.5?1:-1))),w=Math.max(0,Math.min(p-1,s+(Math.random()>0.65?1:0))),u=`${r},${w}`;if(!a.has(u))a.add(u),yield{x:r,y:w}}}}for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=`${l},${s}`;if(a.has(c))continue;yield{x:l,y:s}}break}case"HUMAN_OVERLAP_SWEEPS":{let a=[],s=Math.random()*Math.PI*2;for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=Math.sin((c+l)*0.42+s)*2.2,g=Math.cos((c-l)*0.3+s)*1.4;a.push({point:{x:c,y:l},score:l+f+g+(Math.random()-0.5)*3.4})}a.sort((l,c)=>l.score-c.score);for(let l of a)yield l.point;break}case"HUMAN_WOBBLE_DRIFT":{let a=[],s=o/2,l=p/2;for(let c=0;c<p;c++)for(let f=0;f<o;f++){let g=Math.hypot(f-s,c-l)*0.25,r=Math.sin((f+1)*0.9)*1.8+Math.cos((c+1)*1.1)*1.8+Math.sin((f+c)*0.35)*1.4;a.push({point:{x:f,y:c},score:g+r+(Math.random()-0.5)*2.8})}a.sort((c,f)=>c.score-f.score);for(let c of a)yield c.point;break}case"HUMAN_GAP_RECOVERY":{let a=new Set,s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++){if(Math.random()>0.87){s.push({x:c,y:l});continue}a.add(`${c},${l}`),yield{x:c,y:l}}s.sort((l,c)=>Math.hypot(l.x-o/2,l.y-p/2)-Math.hypot(c.x-o/2,c.y-p/2));for(let l of s){let c=`${l.x},${l.y}`;if(a.has(c))continue;a.add(c),yield l}break}case"HUMAN_STAIRCASE":{let a=new Set,s=o+p-1;for(let l=0;l<s;l++){let c=Math.max(0,l-o+1),f=Math.min(p-1,l);for(let g=c;g<=f;g++){let r=l-g,w=[{x:r,y:g},{x:r+(Math.random()>0.5?1:-1),y:g},{x:r,y:g+(Math.random()>0.5?1:-1)}];for(let u of w){if(u.x<0||u.x>=o||u.y<0||u.y>=p)continue;let b=`${u.x},${u.y}`;if(a.has(b))continue;a.add(b),yield u}}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=`${c},${l}`;if(a.has(f))continue;yield{x:c,y:l}}break}case"HUMAN_EDGE_HUGGER":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.min(l,s,o-1-l,p-1-s);a.push({point:{x:l,y:s},score:c*3.5+(Math.random()-0.5)*5.5})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_BLOBS":{let a=new Set,s=o*p;while(a.size<s){let l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p),f=1+Math.floor(Math.random()*4);for(let g=c-f;g<=c+f;g++)for(let r=l-f;r<=l+f;r++){if(r<0||r>=o||g<0||g>=p)continue;let w=Math.atan2(g-c,r-l),u=f+Math.sin(w*3+Math.random())*0.8;if(Math.hypot(r-l,g-c)>u)continue;let b=`${r},${g}`;if(a.has(b))continue;a.add(b),yield{x:r,y:g}}}break}case"HUMAN_BACKTRACK":{let a=new Set,s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++)s.push({x:c,y:l});s.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*2.2+(l.x-c.x)*0.04);for(let l=0;l<s.length;l++){let c=s[l],f=`${c.x},${c.y}`;if(a.has(f))continue;if(a.add(f),yield c,l>1&&Math.random()>0.74){let g=s[l-1],r=`${g.x},${g.y}`;if(!a.has(r))a.add(r),yield g}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=`${c},${l}`;if(a.has(f))continue;yield{x:c,y:l}}break}case"HUMAN_SHAKY_DIAGONAL":{let a=[];for(let s=0;s<p;s++)for(let l=0;l<o;l++){let c=Math.abs(l-s)*0.6,f=Math.sin(l*1.4+s*0.8)*1.8+Math.cos(s*1.1+l*0.5)*1.5;a.push({point:{x:l,y:s},score:c+f+(Math.random()-0.5)*3.2})}a.sort((s,l)=>s.score-l.score);for(let s of a)yield s.point;break}case"HUMAN_LATE_FIXES":{let a=[],s=[];for(let l=0;l<p;l++)for(let c=0;c<o;c++)if(Math.random()>0.9)s.push({x:c,y:l});else a.push({x:c,y:l});a.sort((l,c)=>l.y-c.y+(Math.random()-0.5)*1.5+(Math.random()>0.85?l.x-c.x:0)),s.sort((l,c)=>Math.hypot(c.x-o/2,c.y-p/2)-Math.hypot(l.x-o/2,l.y-p/2)),yield*a,yield*s;break}case"DIAGONAL_BRUSH":{for(let a=0;a<o+p-1;a++){let s=a%2===0,l=[],c=Math.max(0,a-o+1),f=Math.min(p-1,a);for(let g=c;g<=f;g++){let r=a-g;if(r>=0&&r<o)l.push({x:r,y:g})}if(Math.random()>0.55)l.reverse();if(s)for(let g=l.length-1;g>=0;g--)yield l[g];else yield*l}break}case"BRUSH_STROKES":{let a=Array.from({length:p},()=>Array(o).fill(!1)),s=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(g,r)=>g>=0&&g<o&&r>=0&&r<p,c=0,f=o*p;for(let g=0;g<f*6&&c<f;g++){let r=Math.floor(Math.random()*o),w=Math.floor(Math.random()*p),u=s[Math.floor(Math.random()*s.length)],b=3+Math.floor(Math.random()*16);for(let m=0;m<b;m++){if(!l(r,w))break;if(!a[w][r])a[w][r]=!0,c++,yield{x:r,y:w};if(Math.random()>0.72)u=s[Math.floor(Math.random()*s.length)];r+=u.x,w+=u.y}}for(let g=0;g<p;g++)for(let r=0;r<o;r++)if(!a[g][r])yield{x:r,y:g};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let a=new Set,s=o*p,l=Math.floor(o/2),c=Math.floor(p/2),f=[[1,0],[0,1],[-1,0],[0,-1]],g=0,r=1,w=(b,m)=>b>=0&&b<o&&m>=0&&m<p,u=function*(){let b=0;while(b<s){for(let m=0;m<2;m++){for(let H=0;H<r;H++){if(w(l,c)){let A=`${l},${c}`;if(!a.has(A)){if(a.add(A),yield{x:l,y:c},b++,b>=s)return}}l+=f[g][0],c+=f[g][1]}g=(g+1)%4}r++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*u();else{let b=[...u()];for(let m=b.length-1;m>=0;m--)yield b[m]}break}case"SCRIBBLE":{let a=new Set,s=o*p,l=Math.floor(o/2),c=Math.floor(p/2);for(let f=0;a.size<s&&f<s*24;f++){let g=`${l},${c}`;if(!a.has(g))a.add(g),yield{x:l,y:c};if(l+=Math.floor(Math.random()*3)-1,c+=Math.floor(Math.random()*3)-1,l<0||l>=o||c<0||c>=p)l=Math.floor(Math.random()*o),c=Math.floor(Math.random()*p)}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let r=`${g},${f}`;if(a.has(r))continue;a.add(r),yield{x:g,y:f}}break}case"CROSSHATCH":{let a=[];for(let c=0;c<o+p-1;c++)for(let f=Math.max(0,c-o+1);f<=Math.min(p-1,c);f++){let g=c-f;a.push({x:g,y:f})}let s=[];for(let c=-p+1;c<o;c++)for(let f=0;f<p;f++){let g=f+c;if(g>=0&&g<o)s.push({x:g,y:f})}let l=new Set;for(let c of[...a,...s]){let f=`${c.x},${c.y}`;if(l.has(f))continue;l.add(f),yield c}break}case"WAVE_SWEEP":{let a=new Set;for(let s=0;s<o;s++){let c=(Math.sin(s/Math.max(1,o-1)*Math.PI*4)+1)*0.5*(p-1)|0;for(let f=0;f<p;f++){let g=c+f,r=c-f;for(let w of[g,r]){if(w<0||w>=p)continue;let u=`${s},${w}`;if(a.has(u))continue;a.add(u),yield{x:s,y:w}}}}break}case"SCATTERED_LINES":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*14;l++){let c=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p),g=Math.random()*Math.PI*2,r=Math.round(Math.cos(g)),w=Math.round(Math.sin(g)),u=6+Math.floor(Math.random()*28);for(let b=0;b<u;b++){if(c<0||c>=o||f<0||f>=p)break;let m=`${c},${f}`;if(!a.has(m))a.add(m),yield{x:c,y:f};c+=r,f+=w}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=`${c},${l}`;if(a.has(f))continue;a.add(f),yield{x:c,y:l}}break}case"CONTOUR_JITTER":{let a=new Set;for(let s=0;s<Math.ceil(Math.min(o,p)/2);s++){let l=[],c=s,f=s,g=o-s-1,r=p-s-1;for(let w=c;w<=g;w++)l.push({x:w,y:f});for(let w=f+1;w<=r;w++)l.push({x:g,y:w});for(let w=g-1;w>=c;w--)l.push({x:w,y:r});for(let w=r-1;w>f;w--)l.push({x:c,y:w});for(let w=l.length-1;w>0;w--){let u=Math.floor(Math.random()*(w+1)),b=l[w];l[w]=l[u],l[u]=b}for(let w of l){let u=`${w.x},${w.y}`;if(a.has(u))continue;a.add(u),yield w}}break}case"SPIRAL_WOBBLE":{let a=new Set,s=o/2,l=p/2,c=Math.hypot(s,l);for(let f=0;a.size<o*p&&f<o*p*9;f++){let g=f/(o*p*9)*c,r=f*0.31+Math.sin(f*0.07)*0.7,w=Math.round(s+Math.cos(r)*g),u=Math.round(l+Math.sin(r)*g);if(w<0||w>=o||u<0||u>=p)continue;let b=`${w},${u}`;if(a.has(b))continue;a.add(b),yield{x:w,y:u}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let r=`${g},${f}`;if(a.has(r))continue;yield{x:g,y:f}}break}case"CLUSTER_BURSTS":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*12;l++){let c=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p),g=2+Math.floor(Math.random()*10);for(let r=f-g;r<=f+g;r++)for(let w=c-g;w<=c+g;w++){if(w<0||w>=o||r<0||r>=p)continue;if(Math.hypot(w-c,r-f)>g)continue;let u=`${w},${r}`;if(a.has(u))continue;a.add(u),yield{x:w,y:r}}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=`${c},${l}`;if(a.has(f))continue;a.add(f),yield{x:c,y:l}}break}case"ORBITAL":{let a=new Set,s=(o-1)/2,l=(p-1)/2,c=Math.ceil(Math.max(s,l));for(let f=0;f<=c;f++){let g=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,f)*2));for(let r=0;r<g;r++){let w=r/g*Math.PI*2+(f%2?0.3:-0.3),u=Math.round(s+Math.cos(w)*f),b=Math.round(l+Math.sin(w)*f);if(u<0||u>=o||b<0||b>=p)continue;let m=`${u},${b}`;if(a.has(m))continue;a.add(m),yield{x:u,y:b}}}for(let f=0;f<p;f++)for(let g=0;g<o;g++){let r=`${g},${f}`;if(a.has(r))continue;yield{x:g,y:f}}break}case"FLOW_FIELD":{let a=new Set,s=o*p;for(let l=0;a.size<s&&l<s*18;l++){let c=Math.floor(Math.random()*o),f=Math.floor(Math.random()*p);for(let g=0;g<120;g++){if(c<0||c>=o||f<0||f>=p)break;let r=`${c},${f}`;if(!a.has(r))a.add(r),yield{x:c,y:f};let w=Math.sin(c*0.09)*1.8+Math.cos(f*0.08)*1.6+Math.sin((c+f)*0.05);c+=Math.round(Math.cos(w)),f+=Math.round(Math.sin(w))}}for(let l=0;l<p;l++)for(let c=0;c<o;c++){let f=`${c},${l}`;if(a.has(f))continue;a.add(f),yield{x:c,y:l}}break}case"EDGE_IN":{let a=new Set,s=Math.ceil(Math.min(o,p)/2);for(let l=0;l<s;l++){let c=l,f=o-1-l,g=l,r=p-1-l;for(let w=c;w<=f;w++)for(let u of[g,r]){let b=`${w},${u}`;if(a.has(b))continue;a.add(b),yield{x:w,y:u}}for(let w=g+1;w<=r-1;w++)for(let u of[c,f]){let b=`${u},${w}`;if(a.has(b))continue;a.add(b),yield{x:u,y:w}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),M(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),a=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=a+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-a)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,a+this.moveInfo.height);this.update(),M(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${T}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var No=`/* stylelint-disable declaration-no-important */
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
  width: calc(100% - 10px);
  margin: 4px 5px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #151d30;
  text-align: left;
  white-space: normal;
}

.wwidget .shortcuts .shortcut-list {
  display: grid;
  gap: 6px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wwidget .shortcuts .shortcut-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 6px;
  padding: 5px 6px;
  border: 1px solid rgb(140 159 255 / 16%);
  border-radius: 8px;
  background: rgb(13 20 35 / 70%);
}

.wwidget .shortcuts .shortcut-label {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  min-width: 0;
  color: #cfdbff;
  font-weight: 600;
  font-size: 10px;
}

.wwidget .shortcuts .shortcut-label span {
  overflow-wrap: anywhere;
  line-height: 1.25;
  white-space: normal;
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
}

.wwidget .shortcuts kbd {
  min-width: 22px;
  padding: 2px 6px;
  border: 1px solid rgb(141 160 255 / 34%);
  border-radius: 6px;
  background: linear-gradient(180deg, #273559, #1b2743);
  color: #ebf1ff;
  font-weight: 700;
  font-size: 10px;
  font-family: Poppins, sans-serif;
  text-align: center;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
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
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    filter 0.2s ease;
  color: #b9c8ff;
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
`;class v extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class ao extends v{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var U={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function P(o,p){let a=p.key.toLowerCase(),s=o.key.toLowerCase(),c=a==="/"&&(s==="/"||s==="?"||o.code==="Slash")||s===a,f=p.ctrl===!0?o.ctrlKey||o.metaKey:!o.ctrlKey,g=p.ctrl===!0?!0:p.meta===!0?o.metaKey:!o.metaKey;return c&&o.shiftKey===Boolean(p.shift)&&f&&g&&o.altKey===Boolean(p.alt)}function Uo(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var Po=`<button class="wopen-button" aria-label="Toggle widget">
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
  <div class="shortcuts">
    <strong data-i18n="keyboardShortcuts">Shortcuts</strong>
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
  </div>
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
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
`;var Do="kglacer-macro:overlay-hidden",To="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class po extends h{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=Po,K(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=To,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=_(),this.$locale.addEventListener("change",()=>{I(this.$locale.value),K(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${T}`,o.click(),await Y(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new ao(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let a;if(p.name.endsWith(`.${T}`))a=await j.fromJSON(this.bot,JSON.parse(await p.text()));else{let s=new FileReader;s.readAsDataURL(p),await Y(s,["load"],["error"]);let l=await this.compressImageBeforeLoad(s.result),c=new Image;c.src=l,await Y(c,["load"],["error"]),a=new j(this.bot,N.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new W(this.bot,c))}this.bot.images.push(a),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),a.updateTasks(),M(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await Y(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let s=document.createElement("canvas");s.width=p.naturalWidth,s.height=p.naturalHeight;let l=s.getContext("2d");if(!l)return o;return l.drawImage(p,0,0),s.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let c=0;c<this.bot.images.length;c++){let f=this.bot.images[c];o+=f.pixels.pixels.length*f.pixels.pixels[0].length,p+=f.tasks.length}let a=Math.max(0,o-p),s=o>0?a/o*100|0:0;this.$progressText.textContent=`${a}/${o} ${s}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${s/100})`,this.$images.innerHTML="";let l=document.createDocumentFragment();for(let c=0;c<this.bot.images.length;c++){let f=this.bot.images[c],g=document.createElement("div");l.append(g),g.className="image",g.innerHTML=`<button class="preview" title="View preview">
  <img src="${f.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${c===0?"disabled":""}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${c===this.bot.images.length-1?"disabled":""}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`,g.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=c,f.openPreviewPanel()}),g.querySelector(".colors").addEventListener("click",()=>{this.activeImageIndex=c,f.openColorPanel()}),g.querySelector(".preview-strategy").addEventListener("click",()=>{this.activeImageIndex=c,f.openPreviewPanel()}),g.querySelector(".download").addEventListener("click",()=>{f.exportImage()}),g.querySelector(".delete").addEventListener("click",()=>{f.destroy()}),g.querySelector(".up").addEventListener("click",()=>{y(this.bot.images,c,c-1),this.update(),M(this.bot)}),g.querySelector(".down").addEventListener("click",()=>{y(this.bot.images,c,c+1),this.update(),M(this.bot)})}this.$images.append(l)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Do)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Do,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${d("toggleOverlay")} (${d("disabled")})`:`${d("toggleOverlay")} (${d("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,a,s="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${s} ${o}`;try{let c=await p();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),c}catch(c){if(!(c instanceof v))console.error(c),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:c}),c}finally{await a?.()}}handleKeyboard(o){if(Uo(o.target))return;if(P(o,U.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(P(o,U.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(P(o,U.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(P(o,U.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(P(o,U.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(P(o,U.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(P(o,U.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(P(o,U.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(P(o,U.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),M(this.bot)}}var Co=2,Ko="[KGM]",Bo="kglacer-macro:access-ok",so="S0dNLXlZUjhTMW81bEhVemVjS1RFMEhxRVB4OVFkcjgxaEVz",Qo="kgm-access-locked";class Wo{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];_widget;get widget(){if(!this._widget)throw new Error("Widget is not initialized yet");return this._widget}markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${Ko} ${o}`);else console.log(`${Ko} ${o}`,p)}constructor(){this.log("Boot sequence started"),document.body.classList.add(Qo);let o=Jo();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let a=0;a<o.images.length;a++){let s=o.images[a];C({x:s.position[0]-1000,y:s.position[1]-1000}),C({x:s.position[0]+1000,y:s.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=No.replace("FAKE_FAVORITE_LOCATIONS",V.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:V.length}),(async()=>{this.log("Widget initialization flow started"),await this.ensureAccessKey(),document.body.classList.remove(Qo),this._widget=new po(this),await this.widget.run("Initializing",async()=>{await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let a=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((s)=>{for(let l=0;l<s.length;l++)if(s[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(a,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await D(500),await this.updateColors(),o)for(let s=0;s<o.images.length;s++){let l=await j.fromJSON(this,o.images[s]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})})()}async ensureAccessKey(){if(localStorage.getItem(Bo)===so)return;await new Promise((o)=>{let p=document.createElement("dialog");p.className="kgm-modal access-dialog",p.innerHTML=`<form method="dialog" class="access-form">
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
</form>`,document.body.append(p),K(p);let a=p.querySelector(".access-input"),s=p.querySelector(".access-error"),l=p.querySelector(".access-locale");l.innerHTML=mo().map((c)=>`<option value="${c}" ${c===_()?"selected":""}>${c.toUpperCase()}</option>`).join(""),l.addEventListener("change",()=>{I(l.value),K(p)}),p.addEventListener("cancel",(c)=>{c.preventDefault()}),p.querySelector("form").addEventListener("submit",(c)=>{c.preventDefault();let f=atob(so);if(a.value.trim()!==f){s.textContent=d("invalidAccessKey");return}localStorage.setItem(Bo,so),p.close(),p.remove(),o()}),p.showModal(),a.focus()})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(a)=>{if(!a.shiftKey)a.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let a=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((c)=>c.json()),s=Math.floor(a.charges.count);this.log("Charges fetched",{charges:s});let l=0;for(let c=0;c<this.images.length;c++)l+=this.images[c].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(s>0){let c=!0;for(let f=0;f<this.images.length;f++){let g=this.images[f].tasks.shift();if(!g)continue;this.drawTask(g),s--,await D(1),c=!1}if(c)break}break}case"PERCENTAGE":{for(let c=0;c<l&&s>0;c++){let f=1,g;for(let r=0;r<this.images.length;r++){let w=this.images[r],u=1-w.tasks.length/(w.pixels.pixels.length*w.pixels.pixels[0].length);if(u<f)f=u,g=w}this.drawTask(g.tasks.shift()),s--,await D(1)}break}case"SEQUENTIAL":for(let c=0;c<this.images.length;c++){let f=this.images[c];for(let g=f.tasks.shift();g&&s>0;g=f.tasks.shift())this.drawTask(g),s--,await D(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:s})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:Co,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),a=window.innerWidth/2,s=window.innerHeight/2,l=a-o.x,c=s-o.y;function f(g,r,w){p.dispatchEvent(new MouseEvent(g,{bubbles:!0,cancelable:!0,clientX:r,clientY:w,buttons:1}))}f("mousedown",a,s),f("mousemove",l,c),f("mouseup",l,c)}readMap(){this.mapsCache.clear();let o=new Set;for(let a=0;a<this.images.length;a++){let s=this.images[a],{tileX:l,tileY:c}=new N(this,s.position.globalX+s.pixels.pixels[0].length,s.position.globalY+s.pixels.pixels.length);for(let f=s.position.tileX;f<=l;f++)for(let g=s.position.tileY;g<=c;g++)o.add(`${f}/${g}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(a)=>{this.mapsCache.set(a,await W.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${a}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,a=1,s=1/0,l=1/0;for(let g=0;g<this.$stars.length;g++){let{x:r,y:w}=Z(this.$stars[g]);if(r<o.x&&w<o.y){let u=o.x-r+(o.y-w);if(u<s)s=u,p=g}else if(r>o.x&&w>o.y){let u=r-o.x+(w-o.y);if(u<l)l=u,a=g}}let c=Z(this.$stars[p]),f=B[p];return{anchorScreenPosition:c,anchorWorldPosition:f,pixelSize:(Z(this.$stars[a]).x-c.x)/(B[a].x-f.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await D(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await D(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await D(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let p=o.position.pixelSize/2,a=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:a.x+p,clientY:a.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(a,s)=>{let l=await o(a,s),c=l.clone(),f="";if(typeof a=="string")f=a;else if(a instanceof Request)f=a.url;else if(a instanceof URL)f=a.href;if(l.url==="https://backend.wplace.live/me")this.me=await c.json(),this.me.favoriteLocations.unshift(...V),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let g=p.exec(f);if(g){for(let r=0;r<this.markerPixelPositionResolvers.length;r++)this.markerPixelPositionResolvers[r](new N(this,+g[1],+g[2],+g[3],+g[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await D(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((a)=>{let s=document.querySelector(p);if(s){a(s);return}let l=new MutationObserver(()=>{let c=document.querySelector(p);if(c)l.disconnect(),a(c)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,V.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new Wo;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
