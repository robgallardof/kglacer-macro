// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.1.8
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
function l0(o,p,g){let w=o[g];return o[g]=o[p],o[p]=w,o}function g0(o,p){let g=o.indexOf(p);if(g!==-1)o.splice(g,1);return g}var w1=Math.floor(Math.random()*65536),l1=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function W(o){return new Promise((p)=>setTimeout(p,o))}function m(o,p,g=["error"],w="addEventListener"){return new Promise((l,f)=>{for(let z=0;z<p.length;z++)o[w]?.(p[z],l);for(let z=0;z<g.length;z++)o[w]?.(g[z],f)})}class O0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:g}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+g<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,g)=>p+g.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,g=Math.min(p,this.historyTime);return{time:o,historyTime:g}}}class x{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let g in p)this[g]=o.querySelector(p[g])}registerEvent(o,p,g,w={}){w.passive??=!0,o.addEventListener(p,g,w),this.runOnDestroy.push(()=>{o.removeEventListener(p,g)})}}function b0(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function U0(o,p,g){let w=b0(o/255),l=b0(p/255),f=b0(g/255),z=Math.cbrt(0.4122214708*w+0.5363325363*l+0.0514459929*f),b=Math.cbrt(0.2119034982*w+0.6806995451*l+0.1073969566*f),H=Math.cbrt(0.0883024619*w+0.2817188376*l+0.6299787005*f),M=0.2104542553*z+0.793617785*b-0.0040720468*H,A=1.9779984951*z-2.428592205*b+0.4505937099*H,J=0.0259040371*z+0.7827717662*b-0.808675766*H;return[M,A,J]}function u0(o,p,g){let[w,l,f]=o,[z,b,H]=p,M=(w0)=>w0*180/Math.PI,A=(w0)=>w0*Math.PI/180,J=1,Q=1,u=1,Y=Math.sqrt(l**2+f**2),U=Math.sqrt(b**2+H**2),B=(Y+U)/2,P=0.5*(1-Math.sqrt(B**7/(B**7+6103515625))),r=l*(1+P),G=b*(1+P),j=Math.sqrt(r**2+f**2),E=Math.sqrt(G**2+H**2),a=f===0&&r===0?0:M(Math.atan2(f,r))%360,I=H===0&&G===0?0:M(Math.atan2(H,G))%360,R=z-w,d=E-j,k=0;if(j*E!==0){if(k=I-a,k>180)k-=360;else if(k<-180)k+=360}let J0=2*Math.sqrt(j*E)*Math.sin(A(k)/2),Q0=(w+z)/2,e=(j+E)/2,$=(a+I)/2;if(Math.abs(a-I)>180)$+=180;let L0=1-0.17*Math.cos(A($-30))+0.24*Math.cos(A(2*$))+0.32*Math.cos(A(3*$+6))-0.2*Math.cos(A(4*$-63)),C0=1+0.015*(Q0-50)**2/Math.sqrt(20+(Q0-50)**2),N=1+0.045*e,K0=1+0.015*e*L0,R0=30*Math.exp((-(($-275)/25))**2),m0=-(2*Math.sqrt(e**7/(e**7+6103515625)))*Math.sin(A(2*R0));return Math.sqrt((R/(1*C0))**2+(d/(1*N))**2+(J0/(1*K0))**2+m0*(d/(1*N))*(J0/(1*K0)))-R*g}var T=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],O=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function n(o){if(o===0)return"transparent";let p=T[o];return`oklab(${p[0]*100}% ${p[1]} ${p[2]})`}var N0=["kglacermacro:locale"],z0={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of all paint modes using the KGlacer logo as the base preview image.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada de todos los modos de pintado usando el logo de KGlacer como imagen base.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays"}};function _0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function i(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in z0)return o;for(let p=0;p<N0.length;p++){let g=localStorage.getItem(N0[p]);if(!g||!(g in z0))continue;return localStorage.setItem("kglacer-macro:locale",g),g}return _0()}function o0(o){localStorage.setItem("kglacer-macro:locale",o)}function K(o){let p=i();return z0[p][o]}function C(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=K(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",K(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",K(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",K(p.dataset.i18nPlaceholder))}var B0=`<div class="wtopbar">
  <button
    class="open-colors"
    type="button"
    data-i18n-title="openColorPanel"
    data-i18n-aria-label="openColorPanel"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 0 16h1a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h5a3 3 0 0 0 3-3 9 9 0 0 0-8-3Z"/><path d="M7.5 10.5h.01M10 7.5h.01M14 7.5h.01M16.5 10.5h.01"/></svg>
  </button>
  <button class="export" data-i18n-title="exportImage" data-i18n-aria-label="exportImage">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 15v3h14v-3"/></svg>
  </button>
  <button class="lock" data-i18n-title="lockImage" data-i18n-aria-label="lockImage">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path class="icon-unlocked" d="M7 10V7a5 5 0 0 1 10 0"/>
      <path d="M6 10h12v10H6z"/>
    </svg>
  </button>
  <button class="delete" data-i18n-title="deleteImage" data-i18n-aria-label="deleteImage">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"/></svg>
  </button>
</div>
<div class="wrapper">
  <div class="wform">
    <div class="wprogress">
      <div></div>
      <span></span>
    </div>
    <div class="colors"></div>
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
  <dialog class="colors-dialog">
    <div class="colors-dialog-head">
      <strong data-i18n="overlayColors">Overlay colors</strong>
      <button class="modal-close close-colors" type="button" data-i18n="close">Close</button>
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
  <dialog class="preview-dialog">
    <div class="preview-dialog-head">
      <strong data-i18n="previewStrategyTitle">Paint preview</strong>
      <button class="modal-close close-preview" type="button" data-i18n="close">Close</button>
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
`;class p0{dialog;options;ignoreNextBackdropClick=!1;constructor(o,p={}){this.dialog=o;this.options=p;this.dialog.classList.add("modal-widget"),(this.options.closeSelector?this.dialog.querySelector(this.options.closeSelector):void 0)?.addEventListener("click",()=>{this.dialog.close()}),this.dialog.addEventListener("click",(w)=>{if(this.ignoreNextBackdropClick){this.ignoreNextBackdropClick=!1;return}if(w.target===this.dialog)this.dialog.close()})}open(){if(!this.dialog.open)this.dialog.style.position="fixed",this.dialog.style.left="",this.dialog.style.top="",this.dialog.style.margin="auto",this.dialog.showModal();if(this.options.focusSelector)this.dialog.querySelector(this.options.focusSelector)?.focus({preventScroll:!0})}markBackdropClickIgnored(){this.ignoreNextBackdropClick=!0}}class V{bot;image;width;brightness;exactColor;static createEmptyImageDataURL(o=1000){let p=document.createElement("canvas");return p.width=o,p.height=o,p.toDataURL("image/png")}static async fromJSON(o,p){let g=async()=>{if(!p.url.startsWith("http"))return p.url;try{let l=await fetch(p.url,{cache:"no-store"}),f=l.headers.get("content-type")??"";if(!l.ok||!f.startsWith("image/"))throw new Error(`Unable to load image: ${l.status} ${l.statusText}`);return URL.createObjectURL(await l.blob())}catch(l){return console.warn("[KGM][Pixels] Falling back to empty image",{url:p.url,error:l}),V.createEmptyImageDataURL()}},w=new Image;return w.src=await g(),await m(w,["load"],["error"]),new V(o,w,p.width,p.brightness,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,g=p.naturalWidth,w=0,l=!1){this.bot=o;this.image=p;this.width=g;this.brightness=w;this.exactColor=l;if(l)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let g=1;g<64;g++)if(this.exactColor||!this.bot.unavailableColors.has(g))o.set(O[g],[g,g]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let g=0;g<this.canvas.height;g++)for(let w=0;w<this.canvas.width;w++){let l=(g*this.canvas.width+w)*4,f=p[l],z=p[l+1],b=p[l+2],H=p[l+3],M=`${f},${z},${b}`;if(this.exactColor){this.pixels[g][w]=H<100?0:O.indexOf(M);continue}let A,J;if(H<100)A=J=0;else if(o.has(M))[A,J]=o.get(M);else{let u=1/0,Y=1/0;for(let U=0;U<T.length;U++){let B=T[U],P=u0(U0(f,z,b),B,this.brightness);if(!this.bot.unavailableColors.has(U)&&P<u)u=P,A=U;if(P<Y)Y=P,J=U}o.set(M,[A,J])}if(A!==0)this.context.fillStyle=`oklab(${T[A][0]*100}% ${T[A][1]} ${T[A][2]})`,this.context.fillRect(w,g,1,1);this.pixels[g][w]=A;let Q=this.colors.get(J);if(Q)Q.amount++;else this.colors.set(J,{color:A,amount:1,realColor:J})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var v="kglacer-macro-settings",G0=["kglacermacro","wbot"],y="kgm";function r0(){let o=[v,...G0];for(let p=0;p<o.length;p++){let g=o[p],w=localStorage.getItem(g);if(!w)continue;return{json:w,key:g}}return}function j0(){let o=r0();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let g=p;p.images=g.widget.images,p.strategy=g.widget.strategy,delete g.widget}if(o.key!==v)localStorage.setItem(v,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var Y0;function c(o,p=!1){if(clearTimeout(Y0),p)localStorage.setItem(v,JSON.stringify(o));else Y0=setTimeout(()=>{localStorage.setItem(v,JSON.stringify(o))},600)}var F=1000,E0=2048,s=F*E0,L=[],h=[],a0=Date.now();function t(o){L.push(o),h.push({id:a0++,latitude:(2*Math.atan(Math.exp(-(o.y/s*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/s*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}t({x:s/3|0,y:s/3|0});t({x:s/3*2|0,y:s/3*2|0});function _(o){let[p,g]=o.style.transform.slice(32,-31).split(", ").map((w)=>Number.parseFloat(w));return{x:p,y:g}}class Z{bot;static fromJSON(o,p){return new Z(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:g,pixelSize:w,anchorWorldPosition:l}=o.findAnchorsForScreen(p);return new Z(o,l.x+(p.x-g.x)/w|0,l.y+(p.y-g.y)/w|0)}globalX=0;globalY=0;get tileX(){return this.globalX/F|0}set tileX(o){this.globalX=o*F+this.x}get tileY(){return this.globalY/F|0}set tileY(o){this.globalY=o*F+this.y}get x(){return this.globalX%F}set x(o){this.globalX=this.tileX*F+o}get y(){return this.globalY%F}set y(o){this.globalY=this.tileY*F+o}anchor1Index;anchor2Index;get pixelSize(){return(_(this.bot.$stars[this.anchor2Index]).x-_(this.bot.$stars[this.anchor1Index]).x)/(L[this.anchor2Index].x-L[this.anchor1Index].x)}constructor(o,p,g,w,l){this.bot=o;if(w===void 0||l===void 0)this.globalX=p,this.globalY=g;else this.globalX=p*F+w,this.globalY=g*F+l;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let g=0;g<L.length;g++){let{x:w,y:l}=L[g];if(w<this.globalX&&l<this.globalY){let f=this.globalX-w+(this.globalY-l);if(f<o)o=f,this.anchor1Index=g}else if(w>this.globalX&&l>this.globalY){let f=w-this.globalX+(l-this.globalY);if(f<p)p=f,this.anchor2Index=g}}}toScreenPosition(){let o=L[this.anchor1Index],p=_(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new Z(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}var k0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg",q=56,c0;((N)=>{N.RANDOM="RANDOM";N.HUMANIZED="HUMANIZED";N.HUMAN_SOFT_DITHER="HUMAN_SOFT_DITHER";N.HUMAN_PATCHY="HUMAN_PATCHY";N.HUMAN_SWEEP_ARCS="HUMAN_SWEEP_ARCS";N.HUMAN_MICRO_CORRECTIONS="HUMAN_MICRO_CORRECTIONS";N.HUMAN_JITTER_FILL="HUMAN_JITTER_FILL";N.HUMAN_CORNER_BIAS="HUMAN_CORNER_BIAS";N.HUMAN_LONG_STROKES="HUMAN_LONG_STROKES";N.HUMAN_TAP_CLUSTERS="HUMAN_TAP_CLUSTERS";N.HUMAN_MESSY_SPIRAL="HUMAN_MESSY_SPIRAL";N.HUMAN_DRUNK_WALK="HUMAN_DRUNK_WALK";N.HUMAN_NOISE_CLOUD="HUMAN_NOISE_CLOUD";N.HUMAN_PATCH_JUMP="HUMAN_PATCH_JUMP";N.ZIGZAG="ZIGZAG";N.BRUSH_STROKES="BRUSH_STROKES";N.DIAGONAL_BRUSH="DIAGONAL_BRUSH";N.DOWN="DOWN";N.UP="UP";N.LEFT="LEFT";N.RIGHT="RIGHT";N.SPIRAL_FROM_CENTER="SPIRAL_FROM_CENTER";N.SPIRAL_TO_CENTER="SPIRAL_TO_CENTER";N.SCRIBBLE="SCRIBBLE";N.CROSSHATCH="CROSSHATCH";N.WAVE_SWEEP="WAVE_SWEEP";N.SCATTERED_LINES="SCATTERED_LINES";N.CONTOUR_JITTER="CONTOUR_JITTER";N.SPIRAL_WOBBLE="SPIRAL_WOBBLE";N.CLUSTER_BURSTS="CLUSTER_BURSTS";N.ORBITAL="ORBITAL";N.FLOW_FIELD="FLOW_FIELD";N.EDGE_IN="EDGE_IN"})(c0||={});class S extends x{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new S(o,Z.fromJSON(o,p.position),await V.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;colorModal;previewModal;logoPreviewMask;logoPreviewImage;previewSequenceCache=new Map;previewAnimations=new WeakMap;settingsPinTimeout;constructor(o,p,g,w="SPIRAL_FROM_CENTER",l=50,f=!1,z=!1,b=[],H=!1){super();this.bot=o;this.position=p;this.pixels=g;this.strategy=w;this.opacity=l;this.drawTransparentPixels=f;this.drawColorsInOrder=z;this.colors=b;this.lock=H;this.element.innerHTML=B0,this.element.classList.add("wimage"),C(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.colorModal=new p0(this.$colorsDialog,{closeSelector:".close-colors",focusSelector:".color-search"}),this.previewModal=new p0(this.$previewDialog,{closeSelector:".close-preview"}),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,c(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),c(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let M;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(M),M=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),c(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),c(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,c(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,c(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),c(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let A of this.element.querySelectorAll(".resize"))this.registerEvent(A,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,g=new Map;for(let w=0;w<this.colors.length;w++){let l=this.colors[w];if(l.disabled)p.add(l.realColor);g.set(l.realColor,w)}for(let{x:w,y:l}of this.strategyPositionIterator()){let f=this.pixels.pixels[l][w];if(p.has(f))continue;o.globalX=this.position.globalX+w,o.globalY=this.position.globalY+l;let z=o.getMapColor();if(f!==z&&(this.drawTransparentPixels||f!==0))this.tasks.push({position:o.clone(),color:f})}if(this.drawColorsInOrder)this.tasks.sort((w,l)=>(g.get(w.color)??0)-(g.get(l.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),g=Math.round(this.position.pixelSize*this.pixels.width),w=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(p)}px, 0)`,this.element.style.width=`${g}px`,this.element.style.height=`${w}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let l=this.pixels.pixels.length*this.pixels.pixels[0].length,f=l-this.tasks.length,z=f/l*100|0;this.$progressText.textContent=`${f}/${l} ${z}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${z}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),g0(this.bot.images,this),this.bot.widget.update(),c(this.bot)}openColorPanel(){this.colorModal.open()}openPreviewPanel(){this.previewModal.open(),this.renderStrategyPreviewSamples()}openSettingsPanel(){this.position.scrollScreenTo(),this.element.classList.add("settings-pinned"),this.$settings.scrollIntoView({behavior:"smooth",block:"nearest"}),clearTimeout(this.settingsPinTimeout),this.settingsPinTimeout=setTimeout(()=>{this.element.classList.remove("settings-pinned")},6000)}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let g=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-g.left,offsetY:o.clientY-g.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),g=Math.max(8,window.innerWidth-p.width-8),w=Math.max(8,window.innerHeight-p.height-8),l=Math.min(g,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),f=Math.min(w,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(l)}px`,this.$colorsDialog.style.top=`${Math.round(f)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.colorModal.markBackdropClickIgnored();this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){let o=this.$strategy.value,p=Object.values(c0).sort((w,l)=>{if(w===o)return-1;if(l===o)return 1;return 0});this.$previewDialogList.innerHTML="";let g=document.createDocumentFragment();for(let w=0;w<p.length;w++){let l=p[w],f=document.createElement("article");f.className="preview-card";let z=document.createElement("strong");z.textContent=this.getStrategyLabel(l);let b=document.createElement("canvas");b.className="preview-canvas",b.width=156,b.height=156,this.paintStrategyPreview(b,l,l===o),f.classList.toggle("active",l===o),f.addEventListener("click",()=>{this.$strategy.value=l,this.strategy=l,c(this.bot),this.renderStrategyPreviewSamples()}),f.append(z,b),g.append(f)}this.$previewDialogList.append(g)}getStrategyLabel(o){switch(o){case"RANDOM":return K("random");case"HUMANIZED":return K("humanized");case"HUMAN_SOFT_DITHER":return K("humanSoftDither");case"HUMAN_PATCHY":return K("humanPatchy");case"HUMAN_SWEEP_ARCS":return K("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return K("humanMicroCorrections");case"HUMAN_JITTER_FILL":return K("humanJitterFill");case"HUMAN_CORNER_BIAS":return K("humanCornerBias");case"HUMAN_LONG_STROKES":return K("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return K("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return K("humanMessySpiral");case"HUMAN_DRUNK_WALK":return K("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return K("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return K("humanPatchJump");case"ZIGZAG":return K("zigzag");case"BRUSH_STROKES":return K("brushStrokes");case"DIAGONAL_BRUSH":return K("diagonalBrush");case"DOWN":return K("down");case"UP":return K("up");case"LEFT":return K("left");case"RIGHT":return K("right");case"SPIRAL_FROM_CENTER":return K("spiralOut");case"SPIRAL_TO_CENTER":return K("spiralIn");case"SCRIBBLE":return K("scribble");case"CROSSHATCH":return K("crosshatch");case"WAVE_SWEEP":return K("waveSweep");case"SCATTERED_LINES":return K("scatteredLines");case"CONTOUR_JITTER":return K("contourJitter");case"SPIRAL_WOBBLE":return K("spiralWobble");case"CLUSTER_BURSTS":return K("clusterBursts");case"ORBITAL":return K("orbital");case"FLOW_FIELD":return K("flowField");case"EDGE_IN":return K("edgeIn");default:return o}}paintStrategyPreview(o,p,g=!1){let w=o.getContext("2d");if(!w)return;w.fillStyle="#0f1526",w.fillRect(0,0,o.width,o.height);let l=this.getLogoPreviewMask(),f=this.previewSequenceCache.get(p)??this.computePreviewSequence(p,l);if(!this.previewSequenceCache.has(p))this.previewSequenceCache.set(p,f);let z=o.width/q,b=this.previewAnimations.get(o);if(b)cancelAnimationFrame(b);let H=(Q)=>{w.fillStyle="#0f1526",w.fillRect(0,0,o.width,o.height),this.paintLogoGhost(w,z,l);for(let u=0;u<Math.min(Q,f.length);u++){let Y=f[u],U=u/Math.max(1,f.length-1);w.fillStyle=`hsl(${220-U*110} 90% ${43+U*18}%)`,w.fillRect(Y.x*z,Y.y*z,Math.max(1,z),Math.max(1,z))}};if(!g){H(f.length);return}let M=performance.now(),A=Math.min(2400,Math.max(700,f.length*5)),J=(Q)=>{let u=Q-M,Y=Math.min(1,u/A);H(Math.floor(f.length*Y));let U=Y>=1?requestAnimationFrame(()=>{H(f.length)}):requestAnimationFrame(J);this.previewAnimations.set(o,U)};J(M)}paintLogoGhost(o,p,g){if(this.logoPreviewImage){o.save(),o.globalAlpha=0.22,o.drawImage(this.logoPreviewImage,0,0,q*p,q*p),o.restore();return}o.fillStyle="rgb(115 132 190 / 28%)";for(let w=0;w<g.length;w++){let l=g[w];o.fillRect(l.x*p,l.y*p,Math.max(1,p),Math.max(1,p))}}getLogoPreviewMask(){if(this.logoPreviewMask)return this.logoPreviewMask;this.logoPreviewMask=this.fallbackPreviewMask();let o=new Image;return o.src=k0,o.decode().then(()=>{this.logoPreviewImage=o;let p=document.createElement("canvas");p.width=q,p.height=q;let g=p.getContext("2d");if(!g)return;if(g.clearRect(0,0,p.width,p.height),g.drawImage(o,0,0,p.width,p.height),this.logoPreviewMask=this.alphaMaskFromCanvas(g,p.width,p.height),this.$previewDialog.open)this.renderStrategyPreviewSamples()}).catch(()=>{return}),this.logoPreviewMask}alphaMaskFromCanvas(o,p,g){let w=o.getImageData(0,0,p,g).data,l=[];for(let f=0;f<g;f++)for(let z=0;z<p;z++)if((w[(f*p+z)*4+3]??0)>24)l.push({x:z,y:f});return l.length?l:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=q/2,g=q/2,w=Math.max(4,q/2.5);for(let l=0;l<q;l++)for(let f=0;f<q;f++)if((f-p)**2+(l-g)**2<=w**2)o.push({x:f,y:l});return o}applyLocale(){if(C(this.element),this.updateColors(),this.previewSequenceCache.clear(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}computePreviewSequence(o,p){let g=this.strategy;this.strategy=o;let w=[...this.strategyPositionIterator(q)];this.strategy=g;let l=new Set(p.map(({x:f,y:z})=>`${f}:${z}`));return w.filter(({x:f,y:z})=>{return l.has(`${f}:${z}`)})}colorHex(o){let p=O[o]??"0,0,0",[g=0,w=0,l=0]=p.split(",").map((f)=>Number.parseInt(f,10));return`#${[g,w,l].map((f)=>f.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=O[o]??"0,0,0",[g=0,w=0,l=0]=p.split(",").map((H)=>Number.parseInt(H,10)),f=Math.max(g,w,l),z=Math.min(g,w,l);if(f-z<15)return["gray","grey","gris","neutral","neutro"];if(g>w+30&&g>l+30)return["red","rojo"];if(w>g+30&&w>l+30)return["green","verde"];if(l>g+30&&l>w+30)return["blue","azul"];if(g>170&&w>120&&l<130)return["orange","naranja"];if(g>170&&w>110&&l>140)return["pink","rosa"];if(g>120&&w<100&&l>120)return["purple","violet","morado"];if(g>130&&w>130&&l<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colors.innerHTML="",this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length,p=100/this.pixels.colors.size,g=document.createElement("div");g.className="colors-track",g.setAttribute("aria-label",K("overlayColors")),this.$colorsDialogList.setAttribute("aria-label",K("colorPanelResults"));let w=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((f)=>!this.pixels.colors.has(f.realColor)))this.colors=this.pixels.colors.values().toArray().sort((f,z)=>z.amount-f.amount).map((f)=>({realColor:f.realColor,disabled:!1})),c(this.bot);let l=0;for(let f=0;f<this.colors.length;f++){let z=this.colors[f],b=this.pixels.colors.get(z.realColor),H=!1,M=!1,A=b.realColor!==b.color,J=b.amount/o*100,Q=this.colorHex(b.realColor),u=this.colorKeywords(b.realColor),Y=()=>{if(H)return;z.disabled=z.disabled?void 0:!0,U.classList.toggle("color-disabled"),B.classList.toggle("disabled",Boolean(z.disabled));let G=B.querySelector(".state");if(G)G.textContent=z.disabled?K("disabled"):K("enabled");c(this.bot)},U=document.createElement("button");if(U.setAttribute("aria-label",`${K("overlayColors")} #${f+1}: ${Q.toUpperCase()}`),U.title=`${J.toFixed(1)}%`,U.innerHTML=`<span class="order-index">#${f+1}</span>`,z.disabled)U.classList.add("color-disabled");if(!A)U.style.background=n(b.realColor);else{U.classList.add("substitution"),U.style.setProperty("--wreal-color",n(b.realColor)),U.style.setProperty("--wsubstitution-color",n(b.color));let G=document.createElement("button"),j=document.createElement("button");G.textContent=K("buy"),j.textContent="✓",G.classList.add("buy"),j.classList.add("disable"),G.addEventListener("click",()=>{document.getElementById("color-"+b.realColor)?.click()}),j.addEventListener("click",Y),U.append(G),U.append(j)}U.style.left=l+"%",U.style.width=J+"%",l+=J,U.style.setProperty("--wleft",p*f+"%"),U.style.setProperty("--wwidth",p+"%"),g.append(U);let B=document.createElement("button");if(B.className=`color-chip ${z.disabled?"disabled":""}`,B.draggable=!0,B.innerHTML=`<span class="order-index">#${f+1}</span>
<span class="drag" title="${K("up")} / ${K("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${J.toFixed(1)}% · ${Q.toUpperCase()}</span>
  <span class="state">${z.disabled?K("disabled"):K("enabled")}</span>
</span>
<span class="premium ${A?"on":""}">${A?K("premium"):""}</span>`,B.querySelector(".swatch").style.setProperty("--swatch-color",n(b.realColor)),B.addEventListener("click",()=>{if(M){M=!1;return}Y()}),B.addEventListener("dragstart",(G)=>{M=!0,B.classList.add("dragging"),G.dataTransfer?.setData("text/plain",String(f)),G.dataTransfer.effectAllowed="move"}),B.addEventListener("dragend",()=>{B.classList.remove("dragging")}),B.addEventListener("dragover",(G)=>{G.preventDefault(),B.classList.add("drag-target")}),B.addEventListener("dragleave",()=>{B.classList.remove("drag-target")}),B.addEventListener("drop",(G)=>{G.preventDefault(),B.classList.remove("drag-target");let j=Number.parseInt(G.dataTransfer?.getData("text/plain")??"-1",10);if(j<0||j===f||j>=this.colors.length)return;this.colors.splice(f,0,...this.colors.splice(j,1)),c(this.bot),this.updateColors()}),A){let G=document.createElement("button");G.textContent=K("buy"),G.className="buy-chip",G.addEventListener("click",(j)=>{j.stopPropagation(),document.getElementById("color-"+b.realColor)?.click()}),B.append(G)}let P=`${Q} ${u.join(" ")} ${b.realColor} ${O[b.realColor]}`;if(!w||P.toLowerCase().includes(w))this.$colorsDialogList.append(B);let r=(G)=>{let j=f,E=U.getBoundingClientRect().width,a=(I)=>{if(j=Math.min(this.colors.length-1,Math.max(0,Math.round(f+(I.clientX-G.clientX)/E))),j!==f)H=!0;let R=0;for(let d of g.children){if(d===U)continue;if(R===j)R++;d.style.setProperty("--wleft",p*R+"%"),R++}U.style.setProperty("--wleft",p*j+"%")};document.addEventListener("mousemove",a),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",a),j!==f)this.colors.splice(j,0,...this.colors.splice(f,1));c(this.bot),U.removeEventListener("mousedown",r),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(U.addEventListener("mousedown",r),!A)U.addEventListener("click",Y)}this.$colors.append(g)}*strategyPositionIterator(o){let p=o??this.pixels.pixels[0].length,g=o??this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let w=0;w<g;w++)for(let l=0;l<p;l++)yield{x:l,y:w};break}case"UP":{for(let w=g-1;w>=0;w--)for(let l=0;l<p;l++)yield{x:l,y:w};break}case"LEFT":{for(let w=0;w<p;w++)for(let l=0;l<g;l++)yield{x:w,y:l};break}case"RIGHT":{for(let w=p-1;w>=0;w--)for(let l=0;l<g;l++)yield{x:w,y:l};break}case"RANDOM":{let w=[];for(let l=0;l<g;l++)for(let f=0;f<p;f++)w.push({x:f,y:l});for(let l=w.length-1;l>=0;l--){let f=Math.floor(Math.random()*(l+1)),z=w[l];w[l]=w[f],w[f]=z}yield*w;break}case"ZIGZAG":{for(let w=0;w<g;w++)if(w%2===0)for(let l=0;l<p;l++)yield{x:l,y:w};else for(let l=p-1;l>=0;l--)yield{x:l,y:w};break}case"HUMANIZED":{let w=Math.max(4,Math.floor(Math.min(p,g)/10)),l=[];for(let f=0;f<g;f+=w)for(let z=0;z<p;z+=w)l.push({x:z,y:f});for(let f=l.length-1;f>=0;f--){let z=Math.floor(Math.random()*(f+1)),b=l[f];l[f]=l[z],l[z]=b}for(let f=0;f<l.length;f++){let z=l[f],b=Math.min(g,z.y+w),H=Math.min(p,z.x+w);for(let M=z.y;M<b;M++)if(Math.random()>0.35)for(let J=z.x;J<H;J++)yield{x:J,y:M};else for(let J=H-1;J>=z.x;J--)yield{x:J,y:M}}break}case"HUMAN_SOFT_DITHER":{let w=new Set;for(let l=0;l<g;l++){let f=Math.floor(Math.random()*3)-1;if((l+f)%2===0)for(let b=0;b<p;b+=2)w.add(`${b},${l}`),yield{x:b,y:l};else for(let b=1;b<p;b+=2)w.add(`${b},${l}`),yield{x:b,y:l}}for(let l=0;l<g;l++)for(let f=0;f<p;f++){let z=`${f},${l}`;if(w.has(z))continue;yield{x:f,y:l}}break}case"HUMAN_PATCHY":{let w=new Set,l=p*g;while(w.size<l){let f=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g),b=1+Math.floor(Math.random()*5);for(let H=z-b;H<=z+b;H++)for(let M=f-b;M<=f+b;M++){if(M<0||M>=p||H<0||H>=g)continue;if(Math.hypot(M-f,H-z)>b+Math.random()*1.2)continue;let A=`${M},${H}`;if(w.has(A))continue;w.add(A),yield{x:M,y:H}}}break}case"HUMAN_SWEEP_ARCS":{let w=new Set,l=(p-1)/2,f=(g-1)/2,z=Math.hypot(l,f);for(let b=0;b<4;b++){let H=Math.random()*Math.PI*2;for(let M=0;M<=z;M+=0.35){let A=Math.PI/2+Math.random()*(Math.PI/1.5),J=Math.max(10,Math.floor(M*8));for(let Q=0;Q<J;Q++){let u=H+A*Q/J+Math.sin(M)*0.08,Y=Math.round(l+Math.cos(u)*M),U=Math.round(f+Math.sin(u)*M);if(Y<0||Y>=p||U<0||U>=g)continue;let B=`${Y},${U}`;if(w.has(B))continue;w.add(B),yield{x:Y,y:U}}}}for(let b=0;b<g;b++)for(let H=0;H<p;H++){let M=`${H},${b}`;if(w.has(M))continue;yield{x:H,y:b}}break}case"HUMAN_MICRO_CORRECTIONS":{let w=new Set;for(let l=0;l<g;l++){let f=l%2===0?1:-1,z=f>0?0:p-1;for(let b=0;b<p;b++){let H=z+(Math.random()>0.82?f:0),M=l+(Math.random()>0.9?1:0);for(let A of[{x:z,y:l},{x:H,y:l},{x:z,y:M}]){if(A.x<0||A.x>=p||A.y<0||A.y>=g)continue;let J=`${A.x},${A.y}`;if(w.has(J))continue;w.add(J),yield A}z+=f}}for(let l=0;l<g;l++)for(let f=0;f<p;f++){let z=`${f},${l}`;if(w.has(z))continue;yield{x:f,y:l}}break}case"HUMAN_JITTER_FILL":{let w=[];for(let l=0;l<g;l++)for(let f=0;f<p;f++)w.push({x:f,y:l});w.sort((l,f)=>{let z=l.y+(Math.random()-0.5)*1.8,b=f.y+(Math.random()-0.5)*1.8;if(z!==b)return z-b;return l.x+(Math.random()-0.5)*2-(f.x+(Math.random()-0.5)*2)}),yield*w;break}case"HUMAN_CORNER_BIAS":{let w=[{x:0,y:0},{x:p-1,y:0},{x:0,y:g-1},{x:p-1,y:g-1}],l=w[Math.floor(Math.random()*w.length)],f=[];for(let z=0;z<g;z++)for(let b=0;b<p;b++){let M=Math.hypot(b-l.x,z-l.y)+Math.random()*3.5;f.push({point:{x:b,y:z},score:M})}f.sort((z,b)=>z.score-b.score);for(let z of f)yield z.point;break}case"HUMAN_LONG_STROKES":{let w=new Set,l=p*g;while(w.size<l){let f=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g),b=Math.random()*Math.PI*2,H=Math.sign(Math.cos(b)),M=Math.sign(Math.sin(b)),A=10+Math.floor(Math.random()*40);for(let J=0;J<A;J++){if(f<0||f>=p||z<0||z>=g)break;let Q=`${f},${z}`;if(!w.has(Q))w.add(Q),yield{x:f,y:z};if(Math.random()>0.78)f+=M,z+=H;else f+=H,z+=M}}break}case"HUMAN_TAP_CLUSTERS":{let w=new Set,l=p*g;while(w.size<l){let f=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g),b=3+Math.floor(Math.random()*10);for(let H=0;H<b;H++){let M=Math.round(f+(Math.random()-0.5)*6),A=Math.round(z+(Math.random()-0.5)*6);if(M<0||M>=p||A<0||A>=g)continue;let J=`${M},${A}`;if(w.has(J))continue;w.add(J),yield{x:M,y:A}}}break}case"HUMAN_MESSY_SPIRAL":{let w=new Set,l=(p-1)/2,f=(g-1)/2,z=Math.hypot(l,f)+2;for(let b=0;w.size<p*g;b++){let H=b/3,M=Math.min(z,H*0.18),A=H*0.29+Math.sin(H*0.13)*0.8,J=Math.round(l+Math.cos(A)*M+Math.sin(H)*0.7),Q=Math.round(f+Math.sin(A)*M+Math.cos(H)*0.7);if(J<0||J>=p||Q<0||Q>=g){if(b>p*g*18)break;continue}let u=`${J},${Q}`;if(w.has(u)){if(Math.random()>0.9)continue}else w.add(u),yield{x:J,y:Q};if(b>p*g*18)break}for(let b=0;b<g;b++)for(let H=0;H<p;H++){let M=`${H},${b}`;if(w.has(M))continue;yield{x:H,y:b}}break}case"HUMAN_DRUNK_WALK":{let w=new Set,l=Math.floor(Math.random()*p),f=Math.floor(Math.random()*g),z=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(w.size<p*g){let b=`${l},${f}`;if(!w.has(b))w.add(b),yield{x:l,y:f};let H=[];for(let J of z){let Q=l+J.x,u=f+J.y;if(Q<0||Q>=p||u<0||u>=g)continue;H.push({x:Q,y:u})}if(!H.length)break;let M=H.filter((J)=>{return!w.has(`${J.x},${J.y}`)});if(M.length&&Math.random()>0.2){let J=M[Math.floor(Math.random()*M.length)];l=J.x,f=J.y;continue}let A=H[Math.floor(Math.random()*H.length)];l=A.x,f=A.y}for(let b=0;b<g;b++)for(let H=0;H<p;H++){let M=`${H},${b}`;if(w.has(M))continue;yield{x:H,y:b}}break}case"HUMAN_NOISE_CLOUD":{let w=[];for(let l=0;l<g;l++)for(let f=0;f<p;f++){let z=Math.sin((f+1)*0.93+Math.random()*0.8)+Math.cos((l+1)*1.17+Math.random()*0.8),b=(Math.random()-0.5)*2.6,H=Math.hypot(f-p/2,l-g/2)*0.08;w.push({point:{x:f,y:l},score:z+b+H})}w.sort((l,f)=>l.score-f.score);for(let l of w)yield l.point;break}case"HUMAN_PATCH_JUMP":{let w=new Set,l=[];for(let f=0;f<Math.max(6,p*g/18);f++)l.push({x:Math.floor(Math.random()*p),y:Math.floor(Math.random()*g)});while(w.size<p*g){let f=l[Math.floor(Math.random()*l.length)],z=1+Math.floor(Math.random()*3),b=1+Math.floor(Math.random()*3);for(let H=f.y-b;H<=f.y+b;H++)for(let M=f.x-z;M<=f.x+z;M++){if(M<0||M>=p||H<0||H>=g)continue;if(Math.random()>0.86)continue;let A=`${M},${H}`;if(w.has(A))continue;w.add(A),yield{x:M,y:H}}if(Math.random()>0.72&&l.length<p*g/2)l.push({x:Math.floor(Math.random()*p),y:Math.floor(Math.random()*g)});if(w.size>p*g*0.92)break}for(let f=0;f<g;f++)for(let z=0;z<p;z++){let b=`${z},${f}`;if(w.has(b))continue;yield{x:z,y:f}}break}case"DIAGONAL_BRUSH":{for(let w=0;w<p+g-1;w++){let l=w%2===0,f=[],z=Math.max(0,w-p+1),b=Math.min(g-1,w);for(let H=z;H<=b;H++){let M=w-H;if(M>=0&&M<p)f.push({x:M,y:H})}if(Math.random()>0.55)f.reverse();if(l)for(let H=f.length-1;H>=0;H--)yield f[H];else yield*f}break}case"BRUSH_STROKES":{let w=Array.from({length:g},()=>Array(p).fill(!1)),l=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],f=(H,M)=>H>=0&&H<p&&M>=0&&M<g,z=0,b=p*g;for(let H=0;H<b*6&&z<b;H++){let M=Math.floor(Math.random()*p),A=Math.floor(Math.random()*g),J=l[Math.floor(Math.random()*l.length)],Q=3+Math.floor(Math.random()*16);for(let u=0;u<Q;u++){if(!f(M,A))break;if(!w[A][M])w[A][M]=!0,z++,yield{x:M,y:A};if(Math.random()>0.72)J=l[Math.floor(Math.random()*l.length)];M+=J.x,A+=J.y}}for(let H=0;H<g;H++)for(let M=0;M<p;M++)if(!w[H][M])yield{x:M,y:H};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let w=new Set,l=p*g,f=Math.floor(p/2),z=Math.floor(g/2),b=[[1,0],[0,1],[-1,0],[0,-1]],H=0,M=1,A=(Q,u)=>Q>=0&&Q<p&&u>=0&&u<g,J=function*(){let Q=0;while(Q<l){for(let u=0;u<2;u++){for(let Y=0;Y<M;Y++){if(A(f,z)){let U=`${f},${z}`;if(!w.has(U)){if(w.add(U),yield{x:f,y:z},Q++,Q>=l)return}}f+=b[H][0],z+=b[H][1]}H=(H+1)%4}M++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*J();else{let Q=[...J()];for(let u=Q.length-1;u>=0;u--)yield Q[u]}break}case"SCRIBBLE":{let w=new Set,l=p*g,f=Math.floor(p/2),z=Math.floor(g/2);for(let b=0;w.size<l&&b<l*24;b++){let H=`${f},${z}`;if(!w.has(H))w.add(H),yield{x:f,y:z};if(f+=Math.floor(Math.random()*3)-1,z+=Math.floor(Math.random()*3)-1,f<0||f>=p||z<0||z>=g)f=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g)}for(let b=0;b<g;b++)for(let H=0;H<p;H++){let M=`${H},${b}`;if(w.has(M))continue;w.add(M),yield{x:H,y:b}}break}case"CROSSHATCH":{let w=[];for(let z=0;z<p+g-1;z++)for(let b=Math.max(0,z-p+1);b<=Math.min(g-1,z);b++){let H=z-b;w.push({x:H,y:b})}let l=[];for(let z=-g+1;z<p;z++)for(let b=0;b<g;b++){let H=b+z;if(H>=0&&H<p)l.push({x:H,y:b})}let f=new Set;for(let z of[...w,...l]){let b=`${z.x},${z.y}`;if(f.has(b))continue;f.add(b),yield z}break}case"WAVE_SWEEP":{let w=new Set;for(let l=0;l<p;l++){let z=(Math.sin(l/Math.max(1,p-1)*Math.PI*4)+1)*0.5*(g-1)|0;for(let b=0;b<g;b++){let H=z+b,M=z-b;for(let A of[H,M]){if(A<0||A>=g)continue;let J=`${l},${A}`;if(w.has(J))continue;w.add(J),yield{x:l,y:A}}}}break}case"SCATTERED_LINES":{let w=new Set,l=p*g;for(let f=0;w.size<l&&f<l*14;f++){let z=Math.floor(Math.random()*p),b=Math.floor(Math.random()*g),H=Math.random()*Math.PI*2,M=Math.round(Math.cos(H)),A=Math.round(Math.sin(H)),J=6+Math.floor(Math.random()*28);for(let Q=0;Q<J;Q++){if(z<0||z>=p||b<0||b>=g)break;let u=`${z},${b}`;if(!w.has(u))w.add(u),yield{x:z,y:b};z+=M,b+=A}}for(let f=0;f<g;f++)for(let z=0;z<p;z++){let b=`${z},${f}`;if(w.has(b))continue;w.add(b),yield{x:z,y:f}}break}case"CONTOUR_JITTER":{let w=new Set;for(let l=0;l<Math.ceil(Math.min(p,g)/2);l++){let f=[],z=l,b=l,H=p-l-1,M=g-l-1;for(let A=z;A<=H;A++)f.push({x:A,y:b});for(let A=b+1;A<=M;A++)f.push({x:H,y:A});for(let A=H-1;A>=z;A--)f.push({x:A,y:M});for(let A=M-1;A>b;A--)f.push({x:z,y:A});for(let A=f.length-1;A>0;A--){let J=Math.floor(Math.random()*(A+1)),Q=f[A];f[A]=f[J],f[J]=Q}for(let A of f){let J=`${A.x},${A.y}`;if(w.has(J))continue;w.add(J),yield A}}break}case"SPIRAL_WOBBLE":{let w=new Set,l=p/2,f=g/2,z=Math.hypot(l,f);for(let b=0;w.size<p*g&&b<p*g*9;b++){let H=b/(p*g*9)*z,M=b*0.31+Math.sin(b*0.07)*0.7,A=Math.round(l+Math.cos(M)*H),J=Math.round(f+Math.sin(M)*H);if(A<0||A>=p||J<0||J>=g)continue;let Q=`${A},${J}`;if(w.has(Q))continue;w.add(Q),yield{x:A,y:J}}for(let b=0;b<g;b++)for(let H=0;H<p;H++){let M=`${H},${b}`;if(w.has(M))continue;yield{x:H,y:b}}break}case"CLUSTER_BURSTS":{let w=new Set,l=p*g;for(let f=0;w.size<l&&f<l*12;f++){let z=Math.floor(Math.random()*p),b=Math.floor(Math.random()*g),H=2+Math.floor(Math.random()*10);for(let M=b-H;M<=b+H;M++)for(let A=z-H;A<=z+H;A++){if(A<0||A>=p||M<0||M>=g)continue;if(Math.hypot(A-z,M-b)>H)continue;let J=`${A},${M}`;if(w.has(J))continue;w.add(J),yield{x:A,y:M}}}for(let f=0;f<g;f++)for(let z=0;z<p;z++){let b=`${z},${f}`;if(w.has(b))continue;w.add(b),yield{x:z,y:f}}break}case"ORBITAL":{let w=new Set,l=(p-1)/2,f=(g-1)/2,z=Math.ceil(Math.max(l,f));for(let b=0;b<=z;b++){let H=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,b)*2));for(let M=0;M<H;M++){let A=M/H*Math.PI*2+(b%2?0.3:-0.3),J=Math.round(l+Math.cos(A)*b),Q=Math.round(f+Math.sin(A)*b);if(J<0||J>=p||Q<0||Q>=g)continue;let u=`${J},${Q}`;if(w.has(u))continue;w.add(u),yield{x:J,y:Q}}}for(let b=0;b<g;b++)for(let H=0;H<p;H++){let M=`${H},${b}`;if(w.has(M))continue;yield{x:H,y:b}}break}case"FLOW_FIELD":{let w=new Set,l=p*g;for(let f=0;w.size<l&&f<l*18;f++){let z=Math.floor(Math.random()*p),b=Math.floor(Math.random()*g);for(let H=0;H<120;H++){if(z<0||z>=p||b<0||b>=g)break;let M=`${z},${b}`;if(!w.has(M))w.add(M),yield{x:z,y:b};let A=Math.sin(z*0.09)*1.8+Math.cos(b*0.08)*1.6+Math.sin((z+b)*0.05);z+=Math.round(Math.cos(A)),b+=Math.round(Math.sin(A))}}for(let f=0;f<g;f++)for(let z=0;z<p;z++){let b=`${z},${f}`;if(w.has(b))continue;w.add(b),yield{x:z,y:f}}break}case"EDGE_IN":{let w=new Set,l=Math.ceil(Math.min(p,g)/2);for(let f=0;f<l;f++){let z=f,b=p-1-f,H=f,M=g-1-f;for(let A=z;A<=b;A++)for(let J of[H,M]){let Q=`${A},${J}`;if(w.has(Q))continue;w.add(Q),yield{x:A,y:J}}for(let A=H+1;A<=M-1;A++)for(let J of[z,b]){let Q=`${J},${A}`;if(w.has(Q))continue;w.add(Q),yield{x:J,y:A}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),c(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),g=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=g+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-g)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,g+this.moveInfo.height);this.update(),c(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${y}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var F0=`/* stylelint-disable declaration-no-important */
/* stylelint-disable plugin/no-low-performance-animation-properties */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable declaration-block-single-line-max-declarations */
@import 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';

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
  margin-top: 2px;
  padding-top: 8px;
  border-top: 1px solid rgb(143 162 255 / 20%);
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
  background: linear-gradient(180deg, #171f33, #141a2a);
  box-shadow: 0 10px 24px rgb(0 0 0 / 25%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.wwidget .images .image:hover {
  border-color: rgb(109 123 255 / 55%);
  box-shadow: 0 14px 28px rgb(0 0 0 / 35%);
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

.wwidget .images .image .image-controls button svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wwidget .images .image .image-controls .settings {
  color: #9fd6ff;
}

.wwidget .images .image .image-controls .remove {
  color: #ff8fa3;
}

.wwidget .shortcuts {
  display: grid;
  gap: 4px;
  justify-items: start;
  width: calc(100% - 10px);
  margin: 4px 5px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #151d30;
  text-align: left;
  white-space: normal;
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
.wimage:hover .wtopbar,
.wimage.settings-pinned .wrapper .wform,
.wimage.settings-pinned .wtopbar {
  opacity: 1;
}

.wtopbar button svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentcolor;
  transition: transform 0.2s ease;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wtopbar .lock.locked .icon-unlocked {
  opacity: 0.25;
}

.wform {
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
  padding: 8px;
  border: var(--border) 1px solid;
  border-radius: 10px;
  background: #171e30;
  color: var(--text);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
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
  border-color: rgb(109 123 255 / 60%);
  background-color: var(--background-hover);
  box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
  transform: translateY(-1px);
}

.wform select {
  background-image:
    linear-gradient(45deg, transparent 50%, #8fa2ff 50%),
    linear-gradient(135deg, #8fa2ff 50%, transparent 50%);
  background-position:
    calc(100% - 16px) 55%,
    calc(100% - 11px) 55%;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
  appearance: none;
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
  width: 100%;
  margin: 0;
}

.wform .wprogress div {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--main);
  transform-origin: left;
}

.wform .wprogress span {
  z-index: 1;
  mix-blend-mode: screen;
}

.wform .colors {
  display: grid;
  gap: 8px;
  width: 100%;
  height: auto;
  margin: 0;
}

.wform .colors .colors-track {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: repeating-linear-gradient(
    25deg,
    var(--background),
    var(--background),
    var(--hover) 8px,
    var(--hover) 12px
  );
  cursor: ew-resize;
}

.wform .colors .colors-track > button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  cursor: grab;
  transition:
    0.2s left,
    0.2s width,
    0.2s filter;
}

.wform .colors .colors-track > button .order-index {
  position: absolute;
  top: 2px;
  left: 4px;
  padding: 1px 4px;
  border-radius: 999px;
  background: rgb(0 0 0 / 45%);
  color: #fff;
  font-weight: 600;
  font-size: 9px;
  pointer-events: none;
}

.wform .colors .colors-track > button:hover {
  filter: brightness(0.8);
}

.wform .colors .colors-track > button.color-disabled::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  box-shadow: inset 0 0 0 2px var(--error);
  pointer-events: none;
}

.wform .colors .colors-track > button.substitution button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 4px;
  color: var(--background);
  font-size: 10px;
}

.wform .colors .colors-track > button.substitution button.buy {
  top: 2px;
  height: calc(50% - 2px);
}

.wform .colors .colors-track > button.substitution button.disable {
  top: 50%;
}

.wform .colors .colors-legend {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.wimage .modal-widget {
  overflow: auto;
  width: min(600px, 92vw);
  min-width: min(320px, 92vw);
  max-height: min(85dvh, 720px);
  margin: auto;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: linear-gradient(180deg, #111a2d, #0d1423);
  color: var(--text);
  box-shadow:
    0 24px 54px rgb(2 6 23 / 62%),
    0 0 0 1px rgb(109 123 255 / 20%);
  overscroll-behavior: contain;
}

.wimage .modal-widget::backdrop {
  background: rgb(0 0 0 / 55%);
  backdrop-filter: blur(2px);
}

.wimage .colors-dialog {
  resize: both;
}

.wimage .colors-dialog-head,
.wimage .preview-dialog-head {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
}

.wimage .colors-dialog-head {
  cursor: move;
  user-select: none;
}

.wimage .close-colors {
  min-width: 72px;
}

.wimage .modal-close {
  min-width: 72px;
  padding: 6px 10px;
  border: 1px solid #56608a;
  border-radius: 8px;
  background: #212c49;
  color: #f0f4ff;
  font-weight: 600;
}

.wimage .preview-dialog {
  min-width: min(330px, 92vw);
}

.wimage .preview-dialog-help {
  margin: 0 0 10px;
  color: #b4bfdc;
  font-size: 12px;
  line-height: 1.4;
}

.wimage .preview-dialog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
  gap: 10px;
  overflow: auto;
  max-height: min(68dvh, 560px);
  padding-right: 2px;
}

.wimage .preview-card {
  display: grid;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #131c30;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.wimage .preview-card:hover {
  border-color: rgb(109 123 255 / 55%);
  transform: translateY(-1px);
}

.wimage .preview-card.active {
  border-color: rgb(122 168 255 / 85%);
  box-shadow: 0 0 0 1px rgb(122 168 255 / 40%);
}

.wimage .preview-card strong {
  color: #dce6ff;
  font-size: 12px;
}

.wimage .preview-canvas {
  width: 100%;
  height: auto;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 8px;
  image-rendering: pixelated;
}

.wimage .colors-dialog-help {
  margin: 0 0 8px;
  color: #b4bfdc;
  font-size: 12px;
  line-height: 1.35;
}

.wimage .colors-dialog-help.order {
  color: #d6defa;
  font-weight: 600;
}

.wimage .color-search {
  width: 100%;
  margin-bottom: 10px;
}

.wimage .colors-dialog-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  overflow: auto;
  max-height: min(62dvh, 520px);
  padding-right: 2px;
}

.wimage .color-chip {
  display: grid;
  grid-template-columns: auto 18px 1fr auto auto auto;
  gap: 6px;
  align-items: center;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #161d2f;
  color: var(--text);
  font-size: 11px;
}

.wimage .color-chip .order-index {
  padding: 2px 6px;
  border-radius: 999px;
  background: #202a43;
  color: #b8c8ff;
  font-weight: 700;
  font-size: 10px;
}

.wimage .color-chip.disabled {
  opacity: 0.65;
}

.wimage .color-chip .swatch {
  width: 14px;
  height: 14px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 4px;
  background: var(--swatch-color);
}

.wimage .color-chip .meta {
  display: grid;
  gap: 2px;
  justify-items: start;
}

.wimage .color-chip .premium.on {
  color: #ffd166;
}

.wimage .color-chip .buy-chip {
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
  display: grid;
  place-items: center;
  min-height: 36px;
  border: 1px solid var(--border);
  background: #182035;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.wtopbar button:hover {
  background: #273150;
  box-shadow: 0 8px 18px rgb(0 0 0 / 30%);
  transform: translateY(-1px);
}

.wtopbar button:hover svg {
  transform: scale(1.08);
}

.wtopbar button.delete {
  color: #ff8fa3;
}

.wtopbar button.

.wtopbar button.open-colors {
  color: #9ed6ff;
}

.wtopbar button.lock.locked {
  color: #ffd166;
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

.no-pointer-events {
  pointer-events: none;
}

.wimage .color-chip .drag {
  color: #8da1e5;
  font-size: 12px;
  cursor: grab;
  user-select: none;
}

.wimage .color-chip.dragging {
  border-style: dashed;
  opacity: 0.45;
}

.wimage .color-chip.drag-target {
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

  .wimage .colors-dialog-list {
    grid-template-columns: 1fr;
  }

  .wimage .preview-dialog-list {
    grid-template-columns: 1fr;
  }
}
`;class f0 extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class H0 extends f0{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var D={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function X(o,p){return o.key.toLowerCase()===p.key&&o.shiftKey===Boolean(p.shift)&&o.ctrlKey===Boolean(p.ctrl)&&o.altKey===Boolean(p.alt)}function Z0(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var q0=`<button class="wopen-button" aria-label="Toggle widget">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
  </svg>
</button>
<div class="title">
  <div class="widget-brand">
    <img class="widget-logo" src="" alt="KGlacer Macro logo" />
    <span class="widget-brand-text">KGlacer</span>
  </div>
  <div class="widget-actions">
    <button class="toggle-overlay" data-i18n="toggleOverlay">Hide/show overlays</button>
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
    <span data-i18n="shortcutsHelp"
      >Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image</span
    >
  </div>
  <label><span data-i18n="strategy">Strategy</span>:&nbsp;<select class="strategy">
    <option value="SEQUENTIAL" selected data-i18n="sequential">Sequential</option>
    <option value="ALL" data-i18n="all">All</option>
    <option value="PERCENTAGE" data-i18n="percentage">Percentage</option>
  </select></label>
  <div class="images"></div>
  <button class="add-image" disabled data-i18n="addImage">Add image</button>
</div>
`;var D0="kglacer-macro:overlay-hidden",s0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class M0 extends x{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.style.display="none",this.element.innerHTML=q0,C(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=s0,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=i(),this.$locale.addEventListener("change",()=>{o0(this.$locale.value),C(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}unlock(){this.element.style.display=""}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${y}`,o.click(),await m(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new H0(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let g;if(p.name.endsWith(`.${y}`))g=await S.fromJSON(this.bot,JSON.parse(await p.text()));else{let w=new FileReader;w.readAsDataURL(p),await m(w,["load"],["error"]);let l=await this.compressImageBeforeLoad(w.result),f=new Image;f.src=l,await m(f,["load"],["error"]),g=new S(this.bot,Z.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new V(this.bot,f))}this.bot.images.push(g),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),g.updateTasks(),c(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await m(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let w=document.createElement("canvas");w.width=p.naturalWidth,w.height=p.naturalHeight;let l=w.getContext("2d");if(!l)return o;return l.drawImage(p,0,0),w.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let f=0;f<this.bot.images.length;f++){let z=this.bot.images[f];o+=z.pixels.pixels.length*z.pixels.pixels[0].length,p+=z.tasks.length}let g=o-p,w=g/o*100|0;this.$progressText.textContent=`${g}/${o} ${w}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${w}%)`,this.$images.innerHTML="";let l=document.createDocumentFragment();for(let f=0;f<this.bot.images.length;f++){let z=this.bot.images[f],b=document.createElement("div");l.append(b),b.className="image",b.innerHTML=`<button class="preview" title="Focus image">
  <img src="${z.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="settings" title="Image settings" aria-label="Image settings">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"/><path d="m19.4 13.5.2-1.5-1.7-.9a6.5 6.5 0 0 0-.4-1l1-1.7-1-1.1-1.8.7a6.8 6.8 0 0 0-.9-.5L13.5 4h-1.4l-.8 1.9a6.2 6.2 0 0 0-1 .4l-1.8-.8-1 1.1 1 1.7a7 7 0 0 0-.4 1L4.6 12l.2 1.5 1.9.8c.1.4.2.7.4 1L6 17l1 1.1 1.9-.7c.3.2.6.3.9.5l.8 1.9h1.4l.8-1.9c.4-.1.7-.2 1-.4l1.8.8 1-1.1-1-1.7c.2-.3.3-.6.4-1l1.8-.8Z"/></svg>
    </button>
    <button class="remove" title="Delete image" aria-label="Delete image">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"/></svg>
    </button>
    <button class="up" title="Move up" ${f===0?"disabled":""}>▴</button>
    <button class="down" title="Move down" ${f===this.bot.images.length-1?"disabled":""}>▾</button>
  </div>`,b.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=f,z.position.scrollScreenTo()}),b.querySelector(".settings").addEventListener("click",()=>{this.activeImageIndex=f,z.openSettingsPanel()}),b.querySelector(".remove").addEventListener("click",()=>{if(this.activeImageIndex===f)this.activeImageIndex=-1;z.destroy()}),b.querySelector(".up").addEventListener("click",()=>{l0(this.bot.images,f,f-1),this.update(),c(this.bot)}),b.querySelector(".down").addEventListener("click",()=>{l0(this.bot.images,f,f+1),this.update(),c(this.bot)})}this.$images.append(l)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(D0)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(D0,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${K("toggleOverlay")} (${K("disabled")})`:`${K("toggleOverlay")} (${K("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,g,w="..."){console.log("[KGM][Widget] Task started",{status:o});let l=this.status;this.status=`${w} ${o}`;try{let f=await p();return this.status=l,console.log("[KGM][Widget] Task completed",{status:o}),f}catch(f){if(!(f instanceof f0))console.error(f),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:f}),f}finally{await g?.()}}handleKeyboard(o){if(Z0(o.target))return;if(X(o,D.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(X(o,D.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(X(o,D.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(X(o,D.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(X(o,D.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(X(o,D.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(X(o,D.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(X(o,D.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(X(o,D.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),c(this.bot)}}var h0=2,X0="[KGM]",P0="kglacer-macro:access-granted",W0="kglacer-macro:access-modal-locale",A0=null;class V0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new M0(this);markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${X0} ${o}`);else console.log(`${X0} ${o}`,p)}constructor(){this.log("Boot sequence started"),this.requestAccess().then((o)=>{if(!o){this.log("Access denied; controllers remain hidden"),this.widget.status="Access denied";return}this.widget.unlock(),this.log("Access granted; starting initialization flow"),this.start()})}start(){let o=j0();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let g=0;g<o.images.length;g++){let w=o.images[g];t({x:w.position[0]-1000,y:w.position[1]-1000}),t({x:w.position[0]+1000,y:w.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=F0.replace("FAKE_FAVORITE_LOCATIONS",h.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:h.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let g=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((w)=>{for(let l=0;l<w.length;l++)if(w[l].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(g,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await W(500),await this.updateColors(),o)for(let w=0;w<o.images.length;w++){let l=await S.fromJSON(this,o.images[w]);this.images.push(l),l.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}async requestAccess(){if(A0===!0)return!0;if(localStorage.getItem(P0)==="true")return A0=!0,!0;let p="48583a634c2513c2d9d6ffa6107d70b1a5a46cfb515c910b120b1c5f550bcbc2",g=localStorage.getItem(W0)??i(),w=document.createElement("dialog");w.style.cssText="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);margin:0;padding:0;border:none;background:transparent;max-width:95vw;",w.innerHTML=`<form method="dialog" style="min-width:320px;padding:18px;border:none;border-radius:12px;background:#0f172a;color:#e2e8f0;font:14px/1.4 system-ui,Segoe UI,sans-serif;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px;">
        <h3 id="kgm-access-title" style="margin:0;">KGM Access</h3>
        <select id="kgm-access-locale" style="padding:6px 8px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#f8fafc;">
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </div>
      <p id="kgm-access-desc" style="margin:0 0 10px 0;opacity:.9;">Enter access key to enable controllers.</p>
      <input id="kgm-access-input" type="password" autocomplete="off" spellcheck="false" style="width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#f8fafc;" />
      <menu style="display:flex;justify-content:flex-end;margin:12px 0 0 0;padding:0;">
        <button id="kgm-access-submit" value="submit" style="padding:8px 12px;border:none;border-radius:8px;background:#2563eb;color:#fff;cursor:pointer;">Continue</button>
      </menu>
    </form>`,document.body.append(w);let l=w.querySelector("#kgm-access-locale"),f=w.querySelector("#kgm-access-title"),z=w.querySelector("#kgm-access-desc"),b=w.querySelector("#kgm-access-input"),H=w.querySelector("#kgm-access-submit"),M=(J)=>{if(l)l.value=J;if(f)f.textContent=J==="es"?"Acceso KGM":"KGM Access";if(z)z.textContent=J==="es"?"Ingresa la key de acceso para habilitar los controles.":"Enter access key to enable controllers.";if(b)b.placeholder=J==="es"?"Escribe tu key aquí":"Type your access key";if(H)H.textContent=J==="es"?"Continuar":"Continue";o0(J),localStorage.setItem(W0,J),C(this.widget.element)};M(g),l?.addEventListener("change",()=>{let J=l.value==="es"?"es":"en";M(J)}),w.showModal();let A=await new Promise((J)=>{w.addEventListener("close",async()=>{let Q=w.querySelector("#kgm-access-input")?.value??"",u=new TextEncoder().encode(Q),Y=await crypto.subtle.digest("SHA-256",u),U=Array.from(new Uint8Array(Y)).map((B)=>B.toString(16).padStart(2,"0")).join("");J(U===p),w.remove()},{once:!0})});if(A)A0=!0,localStorage.setItem(P0,"true");return A}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(g)=>{if(!g.shiftKey)g.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let g=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((f)=>f.json()),w=Math.floor(g.charges.count);this.log("Charges fetched",{charges:w});let l=0;for(let f=0;f<this.images.length;f++)l+=this.images[f].tasks.length;switch(this.log("Tasks prepared",{tasks:l}),this.strategy){case"ALL":{while(w>0){let f=!0;for(let z=0;z<this.images.length;z++){let b=this.images[z].tasks.shift();if(!b)continue;this.drawTask(b),w--,await W(1),f=!1}if(f)break}break}case"PERCENTAGE":{for(let f=0;f<l&&w>0;f++){let z=1,b;for(let H=0;H<this.images.length;H++){let M=this.images[H],A=1-M.tasks.length/(M.pixels.pixels.length*M.pixels.pixels[0].length);if(A<z)z=A,b=M}this.drawTask(b.tasks.shift()),w--,await W(1)}break}case"SEQUENTIAL":for(let f=0;f<this.images.length;f++){let z=this.images[f];for(let b=z.tasks.shift();b&&w>0;b=z.tasks.shift())this.drawTask(b),w--,await W(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:w})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:h0,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),g=window.innerWidth/2,w=window.innerHeight/2,l=g-o.x,f=w-o.y;function z(b,H,M){p.dispatchEvent(new MouseEvent(b,{bubbles:!0,cancelable:!0,clientX:H,clientY:M,buttons:1}))}z("mousedown",g,w),z("mousemove",l,f),z("mouseup",l,f)}readMap(){this.mapsCache.clear();let o=new Set;for(let g=0;g<this.images.length;g++){let w=this.images[g],{tileX:l,tileY:f}=new Z(this,w.position.globalX+w.pixels.pixels[0].length,w.position.globalY+w.pixels.pixels.length);for(let z=w.position.tileX;z<=l;z++)for(let b=w.position.tileY;b<=f;b++)o.add(`${z}/${b}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(g)=>{this.mapsCache.set(g,await V.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${g}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,g=1,w=1/0,l=1/0;for(let b=0;b<this.$stars.length;b++){let{x:H,y:M}=_(this.$stars[b]);if(H<o.x&&M<o.y){let A=o.x-H+(o.y-M);if(A<w)w=A,p=b}else if(H>o.x&&M>o.y){let A=H-o.x+(M-o.y);if(A<l)l=A,g=b}}let f=_(this.$stars[p]),z=L[p];return{anchorScreenPosition:f,anchorWorldPosition:z,pixelSize:(_(this.$stars[g]).x-f.x)/(L[g].x-z.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await W(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await W(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await W(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let p=o.position.pixelSize/2,g=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g.x+p,clientY:g.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(g,w)=>{let l=await o(g,w),f=l.clone(),z="";if(typeof g=="string")z=g;else if(g instanceof Request)z=g.url;else if(g instanceof URL)z=g.href;if(l.url==="https://backend.wplace.live/me")this.me=await f.json(),this.me.favoriteLocations.unshift(...h),this.me.maxFavoriteLocations=1/0,l.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let b=p.exec(z);if(b){for(let H=0;H<this.markerPixelPositionResolvers.length;H++)this.markerPixelPositionResolvers[H](new Z(this,+b[1],+b[2],+b[3],+b[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return l}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await W(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((g)=>{let w=document.querySelector(p);if(w){g(w);return}let l=new MutationObserver(()=>{let f=document.querySelector(p);if(f)l.disconnect(),g(f)});l.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,h.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new V0;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;
