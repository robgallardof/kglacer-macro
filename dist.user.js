// ==UserScript==
// @name         kglacer-macro
// @namespace    https://github.com/robgallardof
// @version      1.1.7
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
function l0(o,p,g){let f=o[g];return o[g]=o[p],o[p]=f,o}function f0(o,p){let g=o.indexOf(p);if(g!==-1)o.splice(g,1);return g}var oo=Math.floor(Math.random()*65536),po=Math.floor(Math.random()*4503599627370496).toString(16).padStart(13,"0");function L(o){return new Promise((p)=>setTimeout(p,o))}function V(o,p,g=["error"],f="addEventListener"){return new Promise((w,l)=>{for(let z=0;z<p.length;z++)o[f]?.(p[z],w);for(let z=0;z<g.length;z++)o[f]?.(g[z],l)})}class V0{size;historyTime;sum=0;history=[];statsCached;startTime=Date.now();constructor(o,p=15000){this.size=o,this.historyTime=p}push(o){if(o<0)throw new Error("Negative chunk size");let{time:p,historyTime:g}=this.getTime();if(this.history.push({time:p,chunk:o}),this.history[0]&&this.history[0].time+g<p)this.history.shift();this.sum+=o,delete this.statsCached}get stats(){if(!this.statsCached){let o=this.history.reduce((p,g)=>p+g.chunk,0)/this.getTime().historyTime*1000;this.statsCached=this.size===void 0?{speed:o}:{speed:o,percent:this.sum/this.size,eta:~~((this.size-this.sum)/o)*1000}}return this.statsCached}getTime(){let o=Date.now(),p=o-this.startTime,g=Math.min(p,this.historyTime);return{time:o,historyTime:g}}}class i{runOnDestroy=[];destroy(){for(let o=0;o<this.runOnDestroy.length;o++)this.runOnDestroy[o]()}populateElementsWithSelector(o,p){for(let g in p)this[g]=o.querySelector(p[g])}registerEvent(o,p,g,f={}){f.passive??=!0,o.addEventListener(p,g,f),this.runOnDestroy.push(()=>{o.removeEventListener(p,g)})}}function w0(o){return o>0.04045?((o+0.055)/1.055)**2.4:o/12.92}function J0(o,p,g){let f=w0(o/255),w=w0(p/255),l=w0(g/255),z=Math.cbrt(0.4122214708*f+0.5363325363*w+0.0514459929*l),b=Math.cbrt(0.2119034982*f+0.6806995451*w+0.1073969566*l),A=Math.cbrt(0.0883024619*f+0.2817188376*w+0.6299787005*l),H=0.2104542553*z+0.793617785*b-0.0040720468*A,M=1.9779984951*z-2.428592205*b+0.4505937099*A,c=0.0259040371*z+0.7827717662*b-0.808675766*A;return[H,M,c]}function u0(o,p,g){let[f,w,l]=o,[z,b,A]=p,H=(p0)=>p0*180/Math.PI,M=(p0)=>p0*Math.PI/180,c=1,J=1,G=1,Y=Math.sqrt(w**2+l**2),K=Math.sqrt(b**2+A**2),U=(Y+K)/2,X=0.5*(1-Math.sqrt(U**7/(U**7+6103515625))),S=w*(1+X),N=b*(1+X),B=Math.sqrt(S**2+l**2),O=Math.sqrt(N**2+A**2),r=l===0&&S===0?0:H(Math.atan2(l,S))%360,d=A===0&&N===0?0:H(Math.atan2(A,N))%360,C=z-f,I=O-B,E=0;if(B*O!==0){if(E=d-r,E>180)E-=360;else if(E<-180)E+=360}let H0=2*Math.sqrt(B*O)*Math.sin(M(E)/2),M0=(f+z)/2,t=(B+O)/2,k=(r+d)/2;if(Math.abs(r-d)>180)k+=180;let X0=1-0.17*Math.cos(M(k-30))+0.24*Math.cos(M(2*k))+0.32*Math.cos(M(3*k+6))-0.2*Math.cos(M(4*k-63)),L0=1+0.015*(M0-50)**2/Math.sqrt(20+(M0-50)**2),Q=1+0.045*t,c0=1+0.015*t*X0,P0=30*Math.exp((-((k-275)/25))**2),W0=-(2*Math.sqrt(t**7/(t**7+6103515625)))*Math.sin(M(2*P0));return Math.sqrt((C/(1*L0))**2+(I/(1*Q))**2+(H0/(1*c0))**2+W0*(I/(1*Q))*(H0/(1*c0)))-C*g}var R=[[Number.NaN,Number.NaN,Number.NaN],[0,0,0],[0.356,0,0],[0.573,0,0],[0.864,0,0],[1,0,0],[0.31,0.119,0.037],[0.603,0.209,0.107],[0.732,0.118,0.137],[0.791,0.039,0.16],[0.895,-0.026,0.168],[0.974,-0.019,0.077],[0.691,-0.154,0.075],[0.812,-0.185,0.096],[0.898,-0.17,0.149],[0.541,-0.097,0.005],[0.678,-0.114,-0.018],[0.814,-0.15,0.011],[0.447,-0.019,-0.134],[0.65,-0.048,-0.137],[0.895,-0.124,-0.027],[0.561,0.054,-0.229],[0.771,0,-0.11],[0.431,0.145,-0.143],[0.557,0.168,-0.127],[0.796,0.102,-0.097],[0.551,0.225,-0.023],[0.62,0.238,0],[0.759,0.127,0.006],[0.428,0.036,0.041],[0.552,0.03,0.092],[0.817,0.055,0.097],[0.738,0,0],[0.46,0.163,0.074],[0.735,0.134,0.071],[0.642,0.137,0.122],[0.794,0.023,0.054],[0.62,-0.005,0.105],[0.747,-0.019,0.138],[0.864,-0.023,0.136],[0.489,-0.06,0.058],[0.609,-0.092,0.08],[0.76,-0.099,0.085],[0.54,-0.067,-0.079],[0.941,-0.064,-0.007],[0.803,-0.05,-0.096],[0.438,0.048,-0.192],[0.421,0.03,-0.102],[0.593,0.036,-0.119],[0.781,0.031,-0.09],[0.757,0.036,0.098],[0.676,0.076,0.09],[0.868,0.051,0.061],[0.524,0.087,0.047],[0.684,0.091,0.045],[0.835,0.068,0.048],[0.519,0.022,0.034],[0.629,0.017,0.043],[0.342,-0.004,-0.016],[0.564,0,-0.038],[0.789,0.003,-0.035],[0.502,-0.006,0.055],[0.638,-0.005,0.047],[0.82,-0.007,0.053]],T=["NaN","0,0,0","60,60,60","120,120,120","210,210,210","255,255,255","96,0,24","237,28,36","255,127,39","246,170,9","249,221,59","255,250,188","14,185,104","19,230,123","135,255,94","12,129,110","16,174,166","19,225,190","40,80,158","64,147,228","96,247,242","107,80,246","153,177,251","120,12,153","170,56,185","224,159,249","203,0,122","236,31,128","243,141,169","104,70,52","149,104,42","248,178,119","170,170,170","165,14,30","250,128,114","228,92,26","214,181,148","156,132,49","197,173,49","232,212,95","74,107,58","90,148,74","132,197,115","15,121,159","187,250,242","125,199,255","77,49,184","74,66,132","122,113,196","181,174,241","219,164,99","209,128,81","255,197,165","155,82,73","209,128,120","250,182,164","123,99,82","156,132,107","51,57,65","109,117,141","179,185,209","109,100,63","148,140,107","205,197,158"];function x(o){if(o===0)return"transparent";let p=R[o];return`oklab(${p[0]*100}% ${p[1]} ${p[2]})`}var K0=["kglacermacro:locale"],g0={en:{widgetTitle:"KGlacerMacro",draw:"Draw",addImage:"Add image",strategy:"Strategy",sequential:"Sequential",all:"All",percentage:"Percentage",opacity:"Opacity",brightness:"Brightness",random:"Random",humanized:"Humanized",humanSoftDither:"Human soft dither",humanPatchy:"Human patchy",humanSweepArcs:"Human sweep arcs",humanMicroCorrections:"Human micro corrections",humanJitterFill:"Human jitter fill",humanCornerBias:"Human corner bias",humanLongStrokes:"Human long strokes",humanTapClusters:"Human tap clusters",humanMessySpiral:"Human messy spiral",humanDrunkWalk:"Human drunk walk",humanNoiseCloud:"Human noise cloud",humanPatchJump:"Human patch jump",zigzag:"Zigzag",brushStrokes:"Brush strokes",diagonalBrush:"Diagonal brush",scribble:"Scribble",crosshatch:"Crosshatch",waveSweep:"Wave sweep",scatteredLines:"Scattered lines",contourJitter:"Contour jitter",spiralWobble:"Spiral wobble",clusterBursts:"Cluster bursts",orbital:"Orbital",flowField:"Flow field",edgeIn:"Edge in",down:"Down",up:"Up",left:"Left",right:"Right",spiralOut:"Spiral out",spiralIn:"Spiral in",resetSize:"Reset size",eraseTransparent:"Erase transparent pixels",drawColorsInOrder:"Draw colors in order",keyboardShortcuts:"Shortcuts",shortcutsHelp:"Shift+B toggle widget · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image",language:"Language",showShortcuts:"Show shortcuts",minimize:"Minimize panel",expandPanel:"Expand panel",panelHidden:"Panel hidden",restorePanel:"Restore panel",reopenHelp:"Use Shift+B or floating button to reopen",close:"Close",overlayColors:"Overlay colors",enabled:"Enabled",disabled:"Disabled",premium:"Premium",buy:"Buy",openColorPanel:"Open color panel",searchColors:"Search by hex, English or Spanish",colorPanelResults:"Color panel results",colorPanelHelp:"Turn colors on/off with a click. Drag blocks in the strip or cards in this panel to set which color paints first.",colorPanelOrderHint:"Color #1 is painted first.",previewStrategy:"Preview",previewStrategyTitle:"Paint preview",previewStrategyHelp:"Animated visual reference of all paint modes using the KGlacer logo as the base preview image.",exportImage:"Export image settings",lockImage:"Lock/unlock image",deleteImage:"Delete image",toggleOverlay:"Hide/show overlays"},es:{widgetTitle:"KGlacerMacro",draw:"Dibujar",addImage:"Agregar imagen",strategy:"Estrategia",sequential:"Secuencial",all:"Todo",percentage:"Porcentaje",opacity:"Opacidad",brightness:"Brillo",random:"Aleatorio",humanized:"Humanizado",humanSoftDither:"Difuminado humano suave",humanPatchy:"Parches humanos",humanSweepArcs:"Barridos humanos en arco",humanMicroCorrections:"Micro correcciones humanas",humanJitterFill:"Relleno humano con jitter",humanCornerBias:"Sesgo humano por esquina",humanLongStrokes:"Trazos humanos largos",humanTapClusters:"Toques humanos por grupos",humanMessySpiral:"Espiral humana irregular",humanDrunkWalk:"Caminata humana errática",humanNoiseCloud:"Nube humana de ruido",humanPatchJump:"Saltos humanos por parches",zigzag:"Zigzag",brushStrokes:"Pinceladas",diagonalBrush:"Pincel diagonal",scribble:"Garabato",crosshatch:"Tramado",waveSweep:"Barrido ondulado",scatteredLines:"Líneas dispersas",contourJitter:"Contorno irregular",spiralWobble:"Espiral oscilante",clusterBursts:"Ráfagas por grupos",orbital:"Orbital",flowField:"Campo fluido",edgeIn:"Borde hacia adentro",down:"Abajo",up:"Arriba",left:"Izquierda",right:"Derecha",spiralOut:"Espiral hacia fuera",spiralIn:"Espiral hacia dentro",resetSize:"Restablecer tamaño",eraseTransparent:"Borrar píxeles transparentes",drawColorsInOrder:"Dibujar colores en orden",keyboardShortcuts:"Atajos",shortcutsHelp:"Shift+B mostrar widget · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa",language:"Idioma",showShortcuts:"Ver atajos",minimize:"Minimizar panel",expandPanel:"Expandir panel",panelHidden:"Panel oculto",restorePanel:"Restaurar panel",reopenHelp:"Usa Shift+B o el botón flotante para reabrir",close:"Cerrar",overlayColors:"Colores del overlay",enabled:"Activo",disabled:"Desactivado",premium:"Premium",buy:"Comprar",openColorPanel:"Abrir panel de colores",searchColors:"Buscar por hexa, inglés o español",colorPanelResults:"Resultados del panel de color",colorPanelHelp:"Activa o desactiva colores con un clic. Arrastra bloques en la barra o tarjetas en este panel para definir qué color se pinta primero.",colorPanelOrderHint:"El color #1 se pinta primero.",previewStrategy:"Vista",previewStrategyTitle:"Previsualización de pintado",previewStrategyHelp:"Referencia visual animada de todos los modos de pintado usando el logo de KGlacer como imagen base.",exportImage:"Exportar configuración de imagen",lockImage:"Bloquear/desbloquear imagen",deleteImage:"Eliminar imagen",toggleOverlay:"Ocultar/mostrar overlays"}};function R0(){return navigator.language.toLowerCase().startsWith("es")?"es":"en"}function b0(){let o=localStorage.getItem("kglacer-macro:locale");if(o&&o in g0)return o;for(let p=0;p<K0.length;p++){let g=localStorage.getItem(K0[p]);if(!g||!(g in g0))continue;return localStorage.setItem("kglacer-macro:locale",g),g}return R0()}function G0(o){localStorage.setItem("kglacer-macro:locale",o)}function u(o){let p=b0();return g0[p][o]}function $(o){for(let p of o.querySelectorAll("[data-i18n]"))p.textContent=u(p.dataset.i18n);for(let p of o.querySelectorAll("[data-i18n-title]"))p.setAttribute("title",u(p.dataset.i18nTitle));for(let p of o.querySelectorAll("[data-i18n-aria-label]"))p.setAttribute("aria-label",u(p.dataset.i18nAriaLabel));for(let p of o.querySelectorAll("[data-i18n-placeholder]"))p.setAttribute("placeholder",u(p.dataset.i18nPlaceholder))}var Q0=`<div class="wtopbar">
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
`;class e{dialog;options;ignoreNextBackdropClick=!1;constructor(o,p={}){this.dialog=o;this.options=p;this.dialog.classList.add("modal-widget"),(this.options.closeSelector?this.dialog.querySelector(this.options.closeSelector):void 0)?.addEventListener("click",()=>{this.dialog.close()}),this.dialog.addEventListener("click",(f)=>{if(this.ignoreNextBackdropClick){this.ignoreNextBackdropClick=!1;return}if(f.target===this.dialog)this.dialog.close()})}open(){if(!this.dialog.open)this.dialog.style.position="fixed",this.dialog.style.left="",this.dialog.style.top="",this.dialog.style.margin="auto",this.dialog.showModal();if(this.options.focusSelector)this.dialog.querySelector(this.options.focusSelector)?.focus({preventScroll:!0})}markBackdropClickIgnored(){this.ignoreNextBackdropClick=!0}}class W{bot;image;width;brightness;exactColor;static async fromJSON(o,p){let g=new Image;return g.src=p.url.startsWith("http")?await fetch(p.url,{cache:"no-store"}).then((f)=>f.blob()).then((f)=>URL.createObjectURL(f)):p.url,await V(g,["load"],["error"]),new W(o,g,p.width,p.brightness,p.exactColor)}canvas=document.createElement("canvas");context=this.canvas.getContext("2d");pixels;colors=new Map;resolution;get height(){return this.width/this.resolution|0}set height(o){this.width=o*this.resolution|0}constructor(o,p,g=p.naturalWidth,f=0,w=!1){this.bot=o;this.image=p;this.width=g;this.brightness=f;this.exactColor=w;if(w)this.resolution=1,this.width=1000;else this.resolution=this.image.naturalWidth/this.image.naturalHeight;this.update()}update(){this.canvas.width=this.width,this.canvas.height=this.height,this.colors.clear();let o=new Map;for(let g=1;g<64;g++)if(this.exactColor||!this.bot.unavailableColors.has(g))o.set(T[g],[g,g]);this.context.imageSmoothingEnabled=!1,this.context.imageSmoothingQuality="low",this.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height),this.pixels=Array.from({length:this.canvas.height},()=>new Array(this.canvas.width));let p=this.context.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let g=0;g<this.canvas.height;g++)for(let f=0;f<this.canvas.width;f++){let w=(g*this.canvas.width+f)*4,l=p[w],z=p[w+1],b=p[w+2],A=p[w+3],H=`${l},${z},${b}`;if(this.exactColor){this.pixels[g][f]=A<100?0:T.indexOf(H);continue}let M,c;if(A<100)M=c=0;else if(o.has(H))[M,c]=o.get(H);else{let G=1/0,Y=1/0;for(let K=0;K<R.length;K++){let U=R[K],X=u0(J0(l,z,b),U,this.brightness);if(!this.bot.unavailableColors.has(K)&&X<G)G=X,M=K;if(X<Y)Y=X,c=K}o.set(H,[M,c])}if(M!==0)this.context.fillStyle=`oklab(${R[M][0]*100}% ${R[M][1]} ${R[M][2]})`,this.context.fillRect(f,g,1,1);this.pixels[g][f]=M;let J=this.colors.get(c);if(J)J.amount++;else this.colors.set(c,{color:M,amount:1,realColor:c})}}toJSON(){let o=document.createElement("canvas");return o.width=this.image.naturalWidth,o.height=this.image.naturalHeight,o.getContext("2d").drawImage(this.image,0,0),{url:o.toDataURL("image/webp",1),width:this.width,brightness:this.brightness,exactColor:this.exactColor}}}var s="kglacer-macro-settings",U0=["kglacermacro","wbot"],n="kgm";function _0(){let o=[s,...U0];for(let p=0;p<o.length;p++){let g=o[p],f=localStorage.getItem(g);if(!f)continue;return{json:f,key:g}}return}function B0(){let o=_0();if(!o)return;let p;try{if(p=JSON.parse(o.json),typeof p!=="object")throw new Error("NOT VALID SAVE");if(p.version===1){let g=p;p.images=g.widget.images,p.strategy=g.widget.strategy,delete g.widget}if(o.key!==s)localStorage.setItem(s,o.json)}catch{localStorage.removeItem(o.key),p=void 0}return p}var N0;function j(o,p=!1){if(clearTimeout(N0),p)localStorage.setItem(s,JSON.stringify(o));else N0=setTimeout(()=>{localStorage.setItem(s,JSON.stringify(o))},600)}var D=1000,m0=2048,v=D*m0,P=[],h=[],S0=Date.now();function y(o){P.push(o),h.push({id:S0++,latitude:(2*Math.atan(Math.exp(-(o.y/v*(2*Math.PI)-Math.PI)))-Math.PI/2)*180/Math.PI,longitude:(o.x/v*(2*Math.PI)-Math.PI)*180/Math.PI,name:"KGLACER_MACRO_FAVORITE"})}y({x:v/3|0,y:v/3|0});y({x:v/3*2|0,y:v/3*2|0});function _(o){let[p,g]=o.style.transform.slice(32,-31).split(", ").map((f)=>Number.parseFloat(f));return{x:p,y:g}}class F{bot;static fromJSON(o,p){return new F(o,...p)}static fromScreenPosition(o,p){let{anchorScreenPosition:g,pixelSize:f,anchorWorldPosition:w}=o.findAnchorsForScreen(p);return new F(o,w.x+(p.x-g.x)/f|0,w.y+(p.y-g.y)/f|0)}globalX=0;globalY=0;get tileX(){return this.globalX/D|0}set tileX(o){this.globalX=o*D+this.x}get tileY(){return this.globalY/D|0}set tileY(o){this.globalY=o*D+this.y}get x(){return this.globalX%D}set x(o){this.globalX=this.tileX*D+o}get y(){return this.globalY%D}set y(o){this.globalY=this.tileY*D+o}anchor1Index;anchor2Index;get pixelSize(){return(_(this.bot.$stars[this.anchor2Index]).x-_(this.bot.$stars[this.anchor1Index]).x)/(P[this.anchor2Index].x-P[this.anchor1Index].x)}constructor(o,p,g,f,w){this.bot=o;if(f===void 0||w===void 0)this.globalX=p,this.globalY=g;else this.globalX=p*D+f,this.globalY=g*D+w;this.updateAnchor()}updateAnchor(){this.anchor1Index=0,this.anchor2Index=1;let o=1/0,p=1/0;for(let g=0;g<P.length;g++){let{x:f,y:w}=P[g];if(f<this.globalX&&w<this.globalY){let l=this.globalX-f+(this.globalY-w);if(l<o)o=l,this.anchor1Index=g}else if(f>this.globalX&&w>this.globalY){let l=f-this.globalX+(w-this.globalY);if(l<p)p=l,this.anchor2Index=g}}}toScreenPosition(){let o=P[this.anchor1Index],p=_(this.bot.$stars[this.anchor1Index]);return{x:(this.globalX-o.x)*this.pixelSize+p.x,y:(this.globalY-o.y)*this.pixelSize+p.y}}getMapColor(){return this.bot.mapsCache.get(this.tileX+"/"+this.tileY).pixels[this.y][this.x]}scrollScreenTo(){let{x:o,y:p}=this.toScreenPosition();this.bot.moveMap({x:o-window.innerWidth/3,y:p-window.innerHeight/3})}clone(){return new F(this.bot,this.tileX,this.tileY,this.x,this.y)}toJSON(){return[this.globalX,this.globalY]}}var O0=new URL("./img/logo.svg",import.meta.url).href,Z=56,Y0;((Q)=>{Q.RANDOM="RANDOM";Q.HUMANIZED="HUMANIZED";Q.HUMAN_SOFT_DITHER="HUMAN_SOFT_DITHER";Q.HUMAN_PATCHY="HUMAN_PATCHY";Q.HUMAN_SWEEP_ARCS="HUMAN_SWEEP_ARCS";Q.HUMAN_MICRO_CORRECTIONS="HUMAN_MICRO_CORRECTIONS";Q.HUMAN_JITTER_FILL="HUMAN_JITTER_FILL";Q.HUMAN_CORNER_BIAS="HUMAN_CORNER_BIAS";Q.HUMAN_LONG_STROKES="HUMAN_LONG_STROKES";Q.HUMAN_TAP_CLUSTERS="HUMAN_TAP_CLUSTERS";Q.HUMAN_MESSY_SPIRAL="HUMAN_MESSY_SPIRAL";Q.HUMAN_DRUNK_WALK="HUMAN_DRUNK_WALK";Q.HUMAN_NOISE_CLOUD="HUMAN_NOISE_CLOUD";Q.HUMAN_PATCH_JUMP="HUMAN_PATCH_JUMP";Q.ZIGZAG="ZIGZAG";Q.BRUSH_STROKES="BRUSH_STROKES";Q.DIAGONAL_BRUSH="DIAGONAL_BRUSH";Q.DOWN="DOWN";Q.UP="UP";Q.LEFT="LEFT";Q.RIGHT="RIGHT";Q.SPIRAL_FROM_CENTER="SPIRAL_FROM_CENTER";Q.SPIRAL_TO_CENTER="SPIRAL_TO_CENTER";Q.SCRIBBLE="SCRIBBLE";Q.CROSSHATCH="CROSSHATCH";Q.WAVE_SWEEP="WAVE_SWEEP";Q.SCATTERED_LINES="SCATTERED_LINES";Q.CONTOUR_JITTER="CONTOUR_JITTER";Q.SPIRAL_WOBBLE="SPIRAL_WOBBLE";Q.CLUSTER_BURSTS="CLUSTER_BURSTS";Q.ORBITAL="ORBITAL";Q.FLOW_FIELD="FLOW_FIELD";Q.EDGE_IN="EDGE_IN"})(Y0||={});class m extends i{bot;position;pixels;strategy;opacity;drawTransparentPixels;drawColorsInOrder;colors;lock;static async fromJSON(o,p){return new m(o,F.fromJSON(o,p.position),await W.fromJSON(o,p.pixels),p.strategy,p.opacity,p.drawTransparentPixels,p.drawColorsInOrder,p.colors,p.lock)}element=document.createElement("div");tasks=[];moveInfo;$brightness;$canvas;$colors;$colorsDialog;$colorsDialogList;$colorSearch;$openColors;$openPreview;$delete;$drawColorsInOrder;$drawTransparent;$export;$lock;$opacity;$progressLine;$progressText;$previewDialog;$previewDialogList;$resetSize;$resetSizeSpan;$settings;$strategy;$topbar;$wrapper;colorDialogDragState;colorModal;previewModal;logoPreviewMask;logoPreviewImage;previewSequenceCache=new Map;previewAnimations=new WeakMap;settingsPinTimeout;constructor(o,p,g,f="SPIRAL_FROM_CENTER",w=50,l=!1,z=!1,b=[],A=!1){super();this.bot=o;this.position=p;this.pixels=g;this.strategy=f;this.opacity=w;this.drawTransparentPixels=l;this.drawColorsInOrder=z;this.colors=b;this.lock=A;this.element.innerHTML=Q0,this.element.classList.add("wimage"),$(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$brightness:".brightness",$colors:".colors",$colorsDialog:".colors-dialog",$colorsDialogList:".colors-dialog-list",$colorSearch:".color-search",$openColors:".open-colors",$openPreview:".open-preview",$delete:".delete",$drawColorsInOrder:".draw-colors-in-order",$drawTransparent:".draw-transparent",$export:".export",$lock:".lock",$opacity:".opacity",$progressLine:".wprogress div",$progressText:".wprogress span",$previewDialog:".preview-dialog",$previewDialogList:".preview-dialog-list",$resetSize:".reset-size",$settings:".wform",$strategy:".strategy",$topbar:".wtopbar",$wrapper:".wrapper"}),this.$resetSizeSpan=this.$resetSize.querySelector("span"),this.$canvas=this.pixels.canvas,this.$wrapper.prepend(this.pixels.canvas),document.body.append(this.$colorsDialog,this.$previewDialog),this.colorModal=new e(this.$colorsDialog,{closeSelector:".close-colors",focusSelector:".color-search"}),this.previewModal=new e(this.$previewDialog,{closeSelector:".close-preview"}),this.registerEvent(this.$strategy,"change",()=>{this.strategy=this.$strategy.value,j(this.bot)}),this.registerEvent(this.$opacity,"input",()=>{this.opacity=this.$opacity.valueAsNumber,this.$opacity.style.setProperty("--val",this.opacity+"%"),this.update(),j(this.bot)}),this.$opacity.style.setProperty("--val",this.opacity+"%");let H;this.registerEvent(this.$brightness,"change",()=>{clearTimeout(H),H=setTimeout(()=>{this.pixels.brightness=this.$brightness.valueAsNumber,this.pixels.update(),this.updateColors(),this.update(),j(this.bot)},1000)}),this.registerEvent(this.$resetSize,"click",()=>{this.pixels.width=this.pixels.image.naturalWidth,this.pixels.update(),this.updateColors(),this.update(),j(this.bot)}),this.registerEvent(this.$drawTransparent,"click",()=>{this.drawTransparentPixels=this.$drawTransparent.checked,j(this.bot)}),this.registerEvent(this.$drawColorsInOrder,"click",()=>{this.drawColorsInOrder=this.$drawColorsInOrder.checked,j(this.bot)}),this.registerEvent(this.$lock,"click",()=>{this.lock=!this.lock,this.update(),j(this.bot)}),this.registerEvent(this.$delete,"click",this.destroy.bind(this)),this.registerEvent(this.$openColors,"click",()=>{this.openColorPanel()}),this.registerEvent(this.$openPreview,"click",()=>{this.openPreviewPanel()}),this.registerEvent(this.$colorsDialog.querySelector(".colors-dialog-head"),"pointerdown",this.startColorDialogDrag.bind(this)),this.registerEvent(document,"pointermove",this.moveColorDialog.bind(this),{passive:!1}),this.registerEvent(document,"pointerup",this.stopColorDialogDrag.bind(this)),this.registerEvent(document,"pointercancel",this.stopColorDialogDrag.bind(this)),this.registerEvent(this.$colorSearch,"input",()=>{this.updateColors()}),this.registerEvent(this.$export,"click",this.export.bind(this)),this.registerEvent(this.$topbar,"mousedown",this.moveStart.bind(this)),this.registerEvent(this.$canvas,"mousedown",this.moveStart.bind(this)),this.registerEvent(document,"mouseup",this.moveStop.bind(this)),this.registerEvent(document,"mousemove",this.move.bind(this));for(let M of this.element.querySelectorAll(".resize"))this.registerEvent(M,"mousedown",this.resizeStart.bind(this));this.update(),this.updateColors()}toJSON(){return{pixels:this.pixels.toJSON(),position:this.position.toJSON(),strategy:this.strategy,opacity:this.opacity,drawTransparentPixels:this.drawTransparentPixels,drawColorsInOrder:this.drawColorsInOrder,colors:this.colors,lock:this.lock}}updateTasks(){this.tasks.length=0;let o=this.position.clone(),p=new Set,g=new Map;for(let f=0;f<this.colors.length;f++){let w=this.colors[f];if(w.disabled)p.add(w.realColor);g.set(w.realColor,f)}for(let{x:f,y:w}of this.strategyPositionIterator()){let l=this.pixels.pixels[w][f];if(p.has(l))continue;o.globalX=this.position.globalX+f,o.globalY=this.position.globalY+w;let z=o.getMapColor();if(l!==z&&(this.drawTransparentPixels||l!==0))this.tasks.push({position:o.clone(),color:l})}if(this.drawColorsInOrder)this.tasks.sort((f,w)=>(g.get(f.color)??0)-(g.get(w.color)??0));this.update(),this.bot.widget.update()}update(){let{x:o,y:p}=this.position.toScreenPosition(),g=Math.round(this.position.pixelSize*this.pixels.width),f=Math.round(this.position.pixelSize*this.pixels.height);this.element.style.transform=`translate3d(${Math.round(o)}px, ${Math.round(p)}px, 0)`,this.element.style.width=`${g}px`,this.element.style.height=`${f}px`,this.$canvas.style.opacity=`${this.opacity}%`,this.element.classList.remove("hidden"),this.$resetSizeSpan.textContent=this.pixels.width.toString(),this.$brightness.valueAsNumber=this.pixels.brightness,this.$strategy.value=this.strategy,this.$opacity.valueAsNumber=this.opacity,this.$drawTransparent.checked=this.drawTransparentPixels,this.$drawColorsInOrder.checked=this.drawColorsInOrder;let w=this.pixels.pixels.length*this.pixels.pixels[0].length,l=w-this.tasks.length,z=l/w*100|0;this.$progressText.textContent=`${l}/${w} ${z}% ETA: ${this.tasks.length/120|0}h`,this.$progressLine.style.transform=`scaleX(${z}%)`,this.$wrapper.classList[this.lock?"add":"remove"]("no-pointer-events"),this.$lock.classList[this.lock?"add":"remove"]("locked")}destroy(){super.destroy(),this.element.remove(),this.$colorsDialog.remove(),this.$previewDialog.remove(),f0(this.bot.images,this),this.bot.widget.update(),j(this.bot)}openColorPanel(){this.colorModal.open()}openPreviewPanel(){this.previewModal.open(),this.renderStrategyPreviewSamples()}openSettingsPanel(){this.position.scrollScreenTo(),this.element.classList.add("settings-pinned"),this.$settings.scrollIntoView({behavior:"smooth",block:"nearest"}),clearTimeout(this.settingsPinTimeout),this.settingsPinTimeout=setTimeout(()=>{this.element.classList.remove("settings-pinned")},6000)}startColorDialogDrag(o){if(o.button!==0)return;if(o.target?.closest("button,input,select,textarea,a,label"))return;let g=this.$colorsDialog.getBoundingClientRect();this.colorDialogDragState={pointerId:o.pointerId,offsetX:o.clientX-g.left,offsetY:o.clientY-g.top,moved:!1},o.preventDefault()}moveColorDialog(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;let p=this.$colorsDialog.getBoundingClientRect(),g=Math.max(8,window.innerWidth-p.width-8),f=Math.max(8,window.innerHeight-p.height-8),w=Math.min(g,Math.max(8,o.clientX-this.colorDialogDragState.offsetX)),l=Math.min(f,Math.max(8,o.clientY-this.colorDialogDragState.offsetY));if(!this.colorDialogDragState.moved&&(Math.abs(o.movementX)>0||Math.abs(o.movementY)>0))this.colorDialogDragState.moved=!0;this.$colorsDialog.style.left=`${Math.round(w)}px`,this.$colorsDialog.style.top=`${Math.round(l)}px`,o.preventDefault()}stopColorDialogDrag(o){if(!this.colorDialogDragState)return;if(o.pointerId!==this.colorDialogDragState.pointerId)return;if(this.colorDialogDragState.moved)this.colorModal.markBackdropClickIgnored();this.colorDialogDragState=void 0}renderStrategyPreviewSamples(){let o=this.$strategy.value,p=Object.values(Y0).sort((f,w)=>{if(f===o)return-1;if(w===o)return 1;return 0});this.$previewDialogList.innerHTML="";let g=document.createDocumentFragment();for(let f=0;f<p.length;f++){let w=p[f],l=document.createElement("article");l.className="preview-card";let z=document.createElement("strong");z.textContent=this.getStrategyLabel(w);let b=document.createElement("canvas");b.className="preview-canvas",b.width=156,b.height=156,this.paintStrategyPreview(b,w,w===o),l.classList.toggle("active",w===o),l.addEventListener("click",()=>{this.$strategy.value=w,this.strategy=w,j(this.bot),this.renderStrategyPreviewSamples()}),l.append(z,b),g.append(l)}this.$previewDialogList.append(g)}getStrategyLabel(o){switch(o){case"RANDOM":return u("random");case"HUMANIZED":return u("humanized");case"HUMAN_SOFT_DITHER":return u("humanSoftDither");case"HUMAN_PATCHY":return u("humanPatchy");case"HUMAN_SWEEP_ARCS":return u("humanSweepArcs");case"HUMAN_MICRO_CORRECTIONS":return u("humanMicroCorrections");case"HUMAN_JITTER_FILL":return u("humanJitterFill");case"HUMAN_CORNER_BIAS":return u("humanCornerBias");case"HUMAN_LONG_STROKES":return u("humanLongStrokes");case"HUMAN_TAP_CLUSTERS":return u("humanTapClusters");case"HUMAN_MESSY_SPIRAL":return u("humanMessySpiral");case"HUMAN_DRUNK_WALK":return u("humanDrunkWalk");case"HUMAN_NOISE_CLOUD":return u("humanNoiseCloud");case"HUMAN_PATCH_JUMP":return u("humanPatchJump");case"ZIGZAG":return u("zigzag");case"BRUSH_STROKES":return u("brushStrokes");case"DIAGONAL_BRUSH":return u("diagonalBrush");case"DOWN":return u("down");case"UP":return u("up");case"LEFT":return u("left");case"RIGHT":return u("right");case"SPIRAL_FROM_CENTER":return u("spiralOut");case"SPIRAL_TO_CENTER":return u("spiralIn");case"SCRIBBLE":return u("scribble");case"CROSSHATCH":return u("crosshatch");case"WAVE_SWEEP":return u("waveSweep");case"SCATTERED_LINES":return u("scatteredLines");case"CONTOUR_JITTER":return u("contourJitter");case"SPIRAL_WOBBLE":return u("spiralWobble");case"CLUSTER_BURSTS":return u("clusterBursts");case"ORBITAL":return u("orbital");case"FLOW_FIELD":return u("flowField");case"EDGE_IN":return u("edgeIn");default:return o}}paintStrategyPreview(o,p,g=!1){let f=o.getContext("2d");if(!f)return;f.fillStyle="#0f1526",f.fillRect(0,0,o.width,o.height);let w=this.getLogoPreviewMask(),l=this.previewSequenceCache.get(p)??this.computePreviewSequence(p,w);if(!this.previewSequenceCache.has(p))this.previewSequenceCache.set(p,l);let z=o.width/Z,b=this.previewAnimations.get(o);if(b)cancelAnimationFrame(b);let A=(J)=>{f.fillStyle="#0f1526",f.fillRect(0,0,o.width,o.height),this.paintLogoGhost(f,z,w);for(let G=0;G<Math.min(J,l.length);G++){let Y=l[G],K=G/Math.max(1,l.length-1);f.fillStyle=`hsl(${220-K*110} 90% ${43+K*18}%)`,f.fillRect(Y.x*z,Y.y*z,Math.max(1,z),Math.max(1,z))}};if(!g){A(l.length);return}let H=performance.now(),M=Math.min(2400,Math.max(700,l.length*5)),c=(J)=>{let G=J-H,Y=Math.min(1,G/M);A(Math.floor(l.length*Y));let K=Y>=1?requestAnimationFrame(()=>{A(l.length)}):requestAnimationFrame(c);this.previewAnimations.set(o,K)};c(H)}paintLogoGhost(o,p,g){if(this.logoPreviewImage){o.save(),o.globalAlpha=0.22,o.drawImage(this.logoPreviewImage,0,0,Z*p,Z*p),o.restore();return}o.fillStyle="rgb(115 132 190 / 28%)";for(let f=0;f<g.length;f++){let w=g[f];o.fillRect(w.x*p,w.y*p,Math.max(1,p),Math.max(1,p))}}getLogoPreviewMask(){if(this.logoPreviewMask)return this.logoPreviewMask;this.logoPreviewMask=this.fallbackPreviewMask();let o=new Image;return o.src=O0,o.decode().then(()=>{this.logoPreviewImage=o;let p=document.createElement("canvas");p.width=Z,p.height=Z;let g=p.getContext("2d");if(!g)return;if(g.clearRect(0,0,p.width,p.height),g.drawImage(o,0,0,p.width,p.height),this.logoPreviewMask=this.alphaMaskFromCanvas(g,p.width,p.height),this.$previewDialog.open)this.renderStrategyPreviewSamples()}).catch(()=>{return}),this.logoPreviewMask}alphaMaskFromCanvas(o,p,g){let f=o.getImageData(0,0,p,g).data,w=[];for(let l=0;l<g;l++)for(let z=0;z<p;z++)if((f[(l*p+z)*4+3]??0)>24)w.push({x:z,y:l});return w.length?w:this.fallbackPreviewMask()}fallbackPreviewMask(){let o=[],p=Z/2,g=Z/2,f=Math.max(4,Z/2.5);for(let w=0;w<Z;w++)for(let l=0;l<Z;l++)if((l-p)**2+(w-g)**2<=f**2)o.push({x:l,y:w});return o}applyLocale(){if($(this.element),this.updateColors(),this.previewSequenceCache.clear(),this.$previewDialog.open)this.renderStrategyPreviewSamples()}computePreviewSequence(o,p){let g=this.strategy;this.strategy=o;let f=[...this.strategyPositionIterator(Z)];this.strategy=g;let w=new Set(p.map(({x:l,y:z})=>`${l}:${z}`));return f.filter(({x:l,y:z})=>{return w.has(`${l}:${z}`)})}colorHex(o){let p=T[o]??"0,0,0",[g=0,f=0,w=0]=p.split(",").map((l)=>Number.parseInt(l,10));return`#${[g,f,w].map((l)=>l.toString(16).padStart(2,"0")).join("")}`}colorKeywords(o){let p=T[o]??"0,0,0",[g=0,f=0,w=0]=p.split(",").map((A)=>Number.parseInt(A,10)),l=Math.max(g,f,w),z=Math.min(g,f,w);if(l-z<15)return["gray","grey","gris","neutral","neutro"];if(g>f+30&&g>w+30)return["red","rojo"];if(f>g+30&&f>w+30)return["green","verde"];if(w>g+30&&w>f+30)return["blue","azul"];if(g>170&&f>120&&w<130)return["orange","naranja"];if(g>170&&f>110&&w>140)return["pink","rosa"];if(g>120&&f<100&&w>120)return["purple","violet","morado"];if(g>130&&f>130&&w<90)return["yellow","amarillo"];return["brown","cafe","marron"]}updateColors(){this.$colors.innerHTML="",this.$colorsDialogList.innerHTML="";let o=this.pixels.pixels.length*this.pixels.pixels[0].length,p=100/this.pixels.colors.size,g=document.createElement("div");g.className="colors-track",g.setAttribute("aria-label",u("overlayColors")),this.$colorsDialogList.setAttribute("aria-label",u("colorPanelResults"));let f=this.$colorSearch.value.trim().toLowerCase();if(this.colors.length!==this.pixels.colors.size||this.colors.some((l)=>!this.pixels.colors.has(l.realColor)))this.colors=this.pixels.colors.values().toArray().sort((l,z)=>z.amount-l.amount).map((l)=>({realColor:l.realColor,disabled:!1})),j(this.bot);let w=0;for(let l=0;l<this.colors.length;l++){let z=this.colors[l],b=this.pixels.colors.get(z.realColor),A=!1,H=!1,M=b.realColor!==b.color,c=b.amount/o*100,J=this.colorHex(b.realColor),G=this.colorKeywords(b.realColor),Y=()=>{if(A)return;z.disabled=z.disabled?void 0:!0,K.classList.toggle("color-disabled"),U.classList.toggle("disabled",Boolean(z.disabled));let N=U.querySelector(".state");if(N)N.textContent=z.disabled?u("disabled"):u("enabled");j(this.bot)},K=document.createElement("button");if(K.setAttribute("aria-label",`${u("overlayColors")} #${l+1}: ${J.toUpperCase()}`),K.title=`${c.toFixed(1)}%`,K.innerHTML=`<span class="order-index">#${l+1}</span>`,z.disabled)K.classList.add("color-disabled");if(!M)K.style.background=x(b.realColor);else{K.classList.add("substitution"),K.style.setProperty("--wreal-color",x(b.realColor)),K.style.setProperty("--wsubstitution-color",x(b.color));let N=document.createElement("button"),B=document.createElement("button");N.textContent=u("buy"),B.textContent="✓",N.classList.add("buy"),B.classList.add("disable"),N.addEventListener("click",()=>{document.getElementById("color-"+b.realColor)?.click()}),B.addEventListener("click",Y),K.append(N),K.append(B)}K.style.left=w+"%",K.style.width=c+"%",w+=c,K.style.setProperty("--wleft",p*l+"%"),K.style.setProperty("--wwidth",p+"%"),g.append(K);let U=document.createElement("button");if(U.className=`color-chip ${z.disabled?"disabled":""}`,U.draggable=!0,U.innerHTML=`<span class="order-index">#${l+1}</span>
<span class="drag" title="${u("up")} / ${u("down")}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${c.toFixed(1)}% · ${J.toUpperCase()}</span>
  <span class="state">${z.disabled?u("disabled"):u("enabled")}</span>
</span>
<span class="premium ${M?"on":""}">${M?u("premium"):""}</span>`,U.querySelector(".swatch").style.setProperty("--swatch-color",x(b.realColor)),U.addEventListener("click",()=>{if(H){H=!1;return}Y()}),U.addEventListener("dragstart",(N)=>{H=!0,U.classList.add("dragging"),N.dataTransfer?.setData("text/plain",String(l)),N.dataTransfer.effectAllowed="move"}),U.addEventListener("dragend",()=>{U.classList.remove("dragging")}),U.addEventListener("dragover",(N)=>{N.preventDefault(),U.classList.add("drag-target")}),U.addEventListener("dragleave",()=>{U.classList.remove("drag-target")}),U.addEventListener("drop",(N)=>{N.preventDefault(),U.classList.remove("drag-target");let B=Number.parseInt(N.dataTransfer?.getData("text/plain")??"-1",10);if(B<0||B===l||B>=this.colors.length)return;this.colors.splice(l,0,...this.colors.splice(B,1)),j(this.bot),this.updateColors()}),M){let N=document.createElement("button");N.textContent=u("buy"),N.className="buy-chip",N.addEventListener("click",(B)=>{B.stopPropagation(),document.getElementById("color-"+b.realColor)?.click()}),U.append(N)}let X=`${J} ${G.join(" ")} ${b.realColor} ${T[b.realColor]}`;if(!f||X.toLowerCase().includes(f))this.$colorsDialogList.append(U);let S=(N)=>{let B=l,O=K.getBoundingClientRect().width,r=(d)=>{if(B=Math.min(this.colors.length-1,Math.max(0,Math.round(l+(d.clientX-N.clientX)/O))),B!==l)A=!0;let C=0;for(let I of g.children){if(I===K)continue;if(C===B)C++;I.style.setProperty("--wleft",p*C+"%"),C++}K.style.setProperty("--wleft",p*B+"%")};document.addEventListener("mousemove",r),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",r),B!==l)this.colors.splice(B,0,...this.colors.splice(l,1));j(this.bot),K.removeEventListener("mousedown",S),setTimeout(()=>{this.updateColors()},200)},{once:!0})};if(K.addEventListener("mousedown",S),!M)K.addEventListener("click",Y)}this.$colors.append(g)}*strategyPositionIterator(o){let p=o??this.pixels.pixels[0].length,g=o??this.pixels.pixels.length;switch(this.strategy){case"DOWN":{for(let f=0;f<g;f++)for(let w=0;w<p;w++)yield{x:w,y:f};break}case"UP":{for(let f=g-1;f>=0;f--)for(let w=0;w<p;w++)yield{x:w,y:f};break}case"LEFT":{for(let f=0;f<p;f++)for(let w=0;w<g;w++)yield{x:f,y:w};break}case"RIGHT":{for(let f=p-1;f>=0;f--)for(let w=0;w<g;w++)yield{x:f,y:w};break}case"RANDOM":{let f=[];for(let w=0;w<g;w++)for(let l=0;l<p;l++)f.push({x:l,y:w});for(let w=f.length-1;w>=0;w--){let l=Math.floor(Math.random()*(w+1)),z=f[w];f[w]=f[l],f[l]=z}yield*f;break}case"ZIGZAG":{for(let f=0;f<g;f++)if(f%2===0)for(let w=0;w<p;w++)yield{x:w,y:f};else for(let w=p-1;w>=0;w--)yield{x:w,y:f};break}case"HUMANIZED":{let f=Math.max(4,Math.floor(Math.min(p,g)/10)),w=[];for(let l=0;l<g;l+=f)for(let z=0;z<p;z+=f)w.push({x:z,y:l});for(let l=w.length-1;l>=0;l--){let z=Math.floor(Math.random()*(l+1)),b=w[l];w[l]=w[z],w[z]=b}for(let l=0;l<w.length;l++){let z=w[l],b=Math.min(g,z.y+f),A=Math.min(p,z.x+f);for(let H=z.y;H<b;H++)if(Math.random()>0.35)for(let c=z.x;c<A;c++)yield{x:c,y:H};else for(let c=A-1;c>=z.x;c--)yield{x:c,y:H}}break}case"HUMAN_SOFT_DITHER":{let f=new Set;for(let w=0;w<g;w++){let l=Math.floor(Math.random()*3)-1;if((w+l)%2===0)for(let b=0;b<p;b+=2)f.add(`${b},${w}`),yield{x:b,y:w};else for(let b=1;b<p;b+=2)f.add(`${b},${w}`),yield{x:b,y:w}}for(let w=0;w<g;w++)for(let l=0;l<p;l++){let z=`${l},${w}`;if(f.has(z))continue;yield{x:l,y:w}}break}case"HUMAN_PATCHY":{let f=new Set,w=p*g;while(f.size<w){let l=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g),b=1+Math.floor(Math.random()*5);for(let A=z-b;A<=z+b;A++)for(let H=l-b;H<=l+b;H++){if(H<0||H>=p||A<0||A>=g)continue;if(Math.hypot(H-l,A-z)>b+Math.random()*1.2)continue;let M=`${H},${A}`;if(f.has(M))continue;f.add(M),yield{x:H,y:A}}}break}case"HUMAN_SWEEP_ARCS":{let f=new Set,w=(p-1)/2,l=(g-1)/2,z=Math.hypot(w,l);for(let b=0;b<4;b++){let A=Math.random()*Math.PI*2;for(let H=0;H<=z;H+=0.35){let M=Math.PI/2+Math.random()*(Math.PI/1.5),c=Math.max(10,Math.floor(H*8));for(let J=0;J<c;J++){let G=A+M*J/c+Math.sin(H)*0.08,Y=Math.round(w+Math.cos(G)*H),K=Math.round(l+Math.sin(G)*H);if(Y<0||Y>=p||K<0||K>=g)continue;let U=`${Y},${K}`;if(f.has(U))continue;f.add(U),yield{x:Y,y:K}}}}for(let b=0;b<g;b++)for(let A=0;A<p;A++){let H=`${A},${b}`;if(f.has(H))continue;yield{x:A,y:b}}break}case"HUMAN_MICRO_CORRECTIONS":{let f=new Set;for(let w=0;w<g;w++){let l=w%2===0?1:-1,z=l>0?0:p-1;for(let b=0;b<p;b++){let A=z+(Math.random()>0.82?l:0),H=w+(Math.random()>0.9?1:0);for(let M of[{x:z,y:w},{x:A,y:w},{x:z,y:H}]){if(M.x<0||M.x>=p||M.y<0||M.y>=g)continue;let c=`${M.x},${M.y}`;if(f.has(c))continue;f.add(c),yield M}z+=l}}for(let w=0;w<g;w++)for(let l=0;l<p;l++){let z=`${l},${w}`;if(f.has(z))continue;yield{x:l,y:w}}break}case"HUMAN_JITTER_FILL":{let f=[];for(let w=0;w<g;w++)for(let l=0;l<p;l++)f.push({x:l,y:w});f.sort((w,l)=>{let z=w.y+(Math.random()-0.5)*1.8,b=l.y+(Math.random()-0.5)*1.8;if(z!==b)return z-b;return w.x+(Math.random()-0.5)*2-(l.x+(Math.random()-0.5)*2)}),yield*f;break}case"HUMAN_CORNER_BIAS":{let f=[{x:0,y:0},{x:p-1,y:0},{x:0,y:g-1},{x:p-1,y:g-1}],w=f[Math.floor(Math.random()*f.length)],l=[];for(let z=0;z<g;z++)for(let b=0;b<p;b++){let H=Math.hypot(b-w.x,z-w.y)+Math.random()*3.5;l.push({point:{x:b,y:z},score:H})}l.sort((z,b)=>z.score-b.score);for(let z of l)yield z.point;break}case"HUMAN_LONG_STROKES":{let f=new Set,w=p*g;while(f.size<w){let l=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g),b=Math.random()*Math.PI*2,A=Math.sign(Math.cos(b)),H=Math.sign(Math.sin(b)),M=10+Math.floor(Math.random()*40);for(let c=0;c<M;c++){if(l<0||l>=p||z<0||z>=g)break;let J=`${l},${z}`;if(!f.has(J))f.add(J),yield{x:l,y:z};if(Math.random()>0.78)l+=H,z+=A;else l+=A,z+=H}}break}case"HUMAN_TAP_CLUSTERS":{let f=new Set,w=p*g;while(f.size<w){let l=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g),b=3+Math.floor(Math.random()*10);for(let A=0;A<b;A++){let H=Math.round(l+(Math.random()-0.5)*6),M=Math.round(z+(Math.random()-0.5)*6);if(H<0||H>=p||M<0||M>=g)continue;let c=`${H},${M}`;if(f.has(c))continue;f.add(c),yield{x:H,y:M}}}break}case"HUMAN_MESSY_SPIRAL":{let f=new Set,w=(p-1)/2,l=(g-1)/2,z=Math.hypot(w,l)+2;for(let b=0;f.size<p*g;b++){let A=b/3,H=Math.min(z,A*0.18),M=A*0.29+Math.sin(A*0.13)*0.8,c=Math.round(w+Math.cos(M)*H+Math.sin(A)*0.7),J=Math.round(l+Math.sin(M)*H+Math.cos(A)*0.7);if(c<0||c>=p||J<0||J>=g){if(b>p*g*18)break;continue}let G=`${c},${J}`;if(f.has(G)){if(Math.random()>0.9)continue}else f.add(G),yield{x:c,y:J};if(b>p*g*18)break}for(let b=0;b<g;b++)for(let A=0;A<p;A++){let H=`${A},${b}`;if(f.has(H))continue;yield{x:A,y:b}}break}case"HUMAN_DRUNK_WALK":{let f=new Set,w=Math.floor(Math.random()*p),l=Math.floor(Math.random()*g),z=[{x:-1,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1},{x:1,y:1}];while(f.size<p*g){let b=`${w},${l}`;if(!f.has(b))f.add(b),yield{x:w,y:l};let A=[];for(let c of z){let J=w+c.x,G=l+c.y;if(J<0||J>=p||G<0||G>=g)continue;A.push({x:J,y:G})}if(!A.length)break;let H=A.filter((c)=>{return!f.has(`${c.x},${c.y}`)});if(H.length&&Math.random()>0.2){let c=H[Math.floor(Math.random()*H.length)];w=c.x,l=c.y;continue}let M=A[Math.floor(Math.random()*A.length)];w=M.x,l=M.y}for(let b=0;b<g;b++)for(let A=0;A<p;A++){let H=`${A},${b}`;if(f.has(H))continue;yield{x:A,y:b}}break}case"HUMAN_NOISE_CLOUD":{let f=[];for(let w=0;w<g;w++)for(let l=0;l<p;l++){let z=Math.sin((l+1)*0.93+Math.random()*0.8)+Math.cos((w+1)*1.17+Math.random()*0.8),b=(Math.random()-0.5)*2.6,A=Math.hypot(l-p/2,w-g/2)*0.08;f.push({point:{x:l,y:w},score:z+b+A})}f.sort((w,l)=>w.score-l.score);for(let w of f)yield w.point;break}case"HUMAN_PATCH_JUMP":{let f=new Set,w=[];for(let l=0;l<Math.max(6,p*g/18);l++)w.push({x:Math.floor(Math.random()*p),y:Math.floor(Math.random()*g)});while(f.size<p*g){let l=w[Math.floor(Math.random()*w.length)],z=1+Math.floor(Math.random()*3),b=1+Math.floor(Math.random()*3);for(let A=l.y-b;A<=l.y+b;A++)for(let H=l.x-z;H<=l.x+z;H++){if(H<0||H>=p||A<0||A>=g)continue;if(Math.random()>0.86)continue;let M=`${H},${A}`;if(f.has(M))continue;f.add(M),yield{x:H,y:A}}if(Math.random()>0.72&&w.length<p*g/2)w.push({x:Math.floor(Math.random()*p),y:Math.floor(Math.random()*g)});if(f.size>p*g*0.92)break}for(let l=0;l<g;l++)for(let z=0;z<p;z++){let b=`${z},${l}`;if(f.has(b))continue;yield{x:z,y:l}}break}case"DIAGONAL_BRUSH":{for(let f=0;f<p+g-1;f++){let w=f%2===0,l=[],z=Math.max(0,f-p+1),b=Math.min(g-1,f);for(let A=z;A<=b;A++){let H=f-A;if(H>=0&&H<p)l.push({x:H,y:A})}if(Math.random()>0.55)l.reverse();if(w)for(let A=l.length-1;A>=0;A--)yield l[A];else yield*l}break}case"BRUSH_STROKES":{let f=Array.from({length:g},()=>Array(p).fill(!1)),w=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],l=(A,H)=>A>=0&&A<p&&H>=0&&H<g,z=0,b=p*g;for(let A=0;A<b*6&&z<b;A++){let H=Math.floor(Math.random()*p),M=Math.floor(Math.random()*g),c=w[Math.floor(Math.random()*w.length)],J=3+Math.floor(Math.random()*16);for(let G=0;G<J;G++){if(!l(H,M))break;if(!f[M][H])f[M][H]=!0,z++,yield{x:H,y:M};if(Math.random()>0.72)c=w[Math.floor(Math.random()*w.length)];H+=c.x,M+=c.y}}for(let A=0;A<g;A++)for(let H=0;H<p;H++)if(!f[A][H])yield{x:H,y:A};break}case"SPIRAL_FROM_CENTER":case"SPIRAL_TO_CENTER":{let f=new Set,w=p*g,l=Math.floor(p/2),z=Math.floor(g/2),b=[[1,0],[0,1],[-1,0],[0,-1]],A=0,H=1,M=(J,G)=>J>=0&&J<p&&G>=0&&G<g,c=function*(){let J=0;while(J<w){for(let G=0;G<2;G++){for(let Y=0;Y<H;Y++){if(M(l,z)){let K=`${l},${z}`;if(!f.has(K)){if(f.add(K),yield{x:l,y:z},J++,J>=w)return}}l+=b[A][0],z+=b[A][1]}A=(A+1)%4}H++}};if(this.strategy==="SPIRAL_FROM_CENTER")yield*c();else{let J=[...c()];for(let G=J.length-1;G>=0;G--)yield J[G]}break}case"SCRIBBLE":{let f=new Set,w=p*g,l=Math.floor(p/2),z=Math.floor(g/2);for(let b=0;f.size<w&&b<w*24;b++){let A=`${l},${z}`;if(!f.has(A))f.add(A),yield{x:l,y:z};if(l+=Math.floor(Math.random()*3)-1,z+=Math.floor(Math.random()*3)-1,l<0||l>=p||z<0||z>=g)l=Math.floor(Math.random()*p),z=Math.floor(Math.random()*g)}for(let b=0;b<g;b++)for(let A=0;A<p;A++){let H=`${A},${b}`;if(f.has(H))continue;f.add(H),yield{x:A,y:b}}break}case"CROSSHATCH":{let f=[];for(let z=0;z<p+g-1;z++)for(let b=Math.max(0,z-p+1);b<=Math.min(g-1,z);b++){let A=z-b;f.push({x:A,y:b})}let w=[];for(let z=-g+1;z<p;z++)for(let b=0;b<g;b++){let A=b+z;if(A>=0&&A<p)w.push({x:A,y:b})}let l=new Set;for(let z of[...f,...w]){let b=`${z.x},${z.y}`;if(l.has(b))continue;l.add(b),yield z}break}case"WAVE_SWEEP":{let f=new Set;for(let w=0;w<p;w++){let z=(Math.sin(w/Math.max(1,p-1)*Math.PI*4)+1)*0.5*(g-1)|0;for(let b=0;b<g;b++){let A=z+b,H=z-b;for(let M of[A,H]){if(M<0||M>=g)continue;let c=`${w},${M}`;if(f.has(c))continue;f.add(c),yield{x:w,y:M}}}}break}case"SCATTERED_LINES":{let f=new Set,w=p*g;for(let l=0;f.size<w&&l<w*14;l++){let z=Math.floor(Math.random()*p),b=Math.floor(Math.random()*g),A=Math.random()*Math.PI*2,H=Math.round(Math.cos(A)),M=Math.round(Math.sin(A)),c=6+Math.floor(Math.random()*28);for(let J=0;J<c;J++){if(z<0||z>=p||b<0||b>=g)break;let G=`${z},${b}`;if(!f.has(G))f.add(G),yield{x:z,y:b};z+=H,b+=M}}for(let l=0;l<g;l++)for(let z=0;z<p;z++){let b=`${z},${l}`;if(f.has(b))continue;f.add(b),yield{x:z,y:l}}break}case"CONTOUR_JITTER":{let f=new Set;for(let w=0;w<Math.ceil(Math.min(p,g)/2);w++){let l=[],z=w,b=w,A=p-w-1,H=g-w-1;for(let M=z;M<=A;M++)l.push({x:M,y:b});for(let M=b+1;M<=H;M++)l.push({x:A,y:M});for(let M=A-1;M>=z;M--)l.push({x:M,y:H});for(let M=H-1;M>b;M--)l.push({x:z,y:M});for(let M=l.length-1;M>0;M--){let c=Math.floor(Math.random()*(M+1)),J=l[M];l[M]=l[c],l[c]=J}for(let M of l){let c=`${M.x},${M.y}`;if(f.has(c))continue;f.add(c),yield M}}break}case"SPIRAL_WOBBLE":{let f=new Set,w=p/2,l=g/2,z=Math.hypot(w,l);for(let b=0;f.size<p*g&&b<p*g*9;b++){let A=b/(p*g*9)*z,H=b*0.31+Math.sin(b*0.07)*0.7,M=Math.round(w+Math.cos(H)*A),c=Math.round(l+Math.sin(H)*A);if(M<0||M>=p||c<0||c>=g)continue;let J=`${M},${c}`;if(f.has(J))continue;f.add(J),yield{x:M,y:c}}for(let b=0;b<g;b++)for(let A=0;A<p;A++){let H=`${A},${b}`;if(f.has(H))continue;yield{x:A,y:b}}break}case"CLUSTER_BURSTS":{let f=new Set,w=p*g;for(let l=0;f.size<w&&l<w*12;l++){let z=Math.floor(Math.random()*p),b=Math.floor(Math.random()*g),A=2+Math.floor(Math.random()*10);for(let H=b-A;H<=b+A;H++)for(let M=z-A;M<=z+A;M++){if(M<0||M>=p||H<0||H>=g)continue;if(Math.hypot(M-z,H-b)>A)continue;let c=`${M},${H}`;if(f.has(c))continue;f.add(c),yield{x:M,y:H}}}for(let l=0;l<g;l++)for(let z=0;z<p;z++){let b=`${z},${l}`;if(f.has(b))continue;f.add(b),yield{x:z,y:l}}break}case"ORBITAL":{let f=new Set,w=(p-1)/2,l=(g-1)/2,z=Math.ceil(Math.max(w,l));for(let b=0;b<=z;b++){let A=Math.max(16,Math.ceil(2*Math.PI*Math.max(1,b)*2));for(let H=0;H<A;H++){let M=H/A*Math.PI*2+(b%2?0.3:-0.3),c=Math.round(w+Math.cos(M)*b),J=Math.round(l+Math.sin(M)*b);if(c<0||c>=p||J<0||J>=g)continue;let G=`${c},${J}`;if(f.has(G))continue;f.add(G),yield{x:c,y:J}}}for(let b=0;b<g;b++)for(let A=0;A<p;A++){let H=`${A},${b}`;if(f.has(H))continue;yield{x:A,y:b}}break}case"FLOW_FIELD":{let f=new Set,w=p*g;for(let l=0;f.size<w&&l<w*18;l++){let z=Math.floor(Math.random()*p),b=Math.floor(Math.random()*g);for(let A=0;A<120;A++){if(z<0||z>=p||b<0||b>=g)break;let H=`${z},${b}`;if(!f.has(H))f.add(H),yield{x:z,y:b};let M=Math.sin(z*0.09)*1.8+Math.cos(b*0.08)*1.6+Math.sin((z+b)*0.05);z+=Math.round(Math.cos(M)),b+=Math.round(Math.sin(M))}}for(let l=0;l<g;l++)for(let z=0;z<p;z++){let b=`${z},${l}`;if(f.has(b))continue;f.add(b),yield{x:z,y:l}}break}case"EDGE_IN":{let f=new Set,w=Math.ceil(Math.min(p,g)/2);for(let l=0;l<w;l++){let z=l,b=p-1-l,A=l,H=g-1-l;for(let M=z;M<=b;M++)for(let c of[A,H]){let J=`${M},${c}`;if(f.has(J))continue;f.add(J),yield{x:M,y:c}}for(let M=A+1;M<=H-1;M++)for(let c of[z,b]){let J=`${c},${M}`;if(f.has(J))continue;f.add(J),yield{x:c,y:M}}}break}}}moveStart(o){if(o.button!==0)return;if(o.preventDefault(),o.stopPropagation(),!this.lock)this.moveInfo={globalX:this.position.globalX,globalY:this.position.globalY,clientX:o.clientX,clientY:o.clientY}}moveStop(){if(this.moveInfo)this.moveInfo=void 0,this.position.updateAnchor(),this.pixels.update(),this.updateColors(),j(this.bot)}move(o){if(!this.moveInfo)return;let p=Math.round((o.clientX-this.moveInfo.clientX)/this.position.pixelSize),g=Math.round((o.clientY-this.moveInfo.clientY)/this.position.pixelSize);if(this.moveInfo.globalX!==void 0){if(this.position.globalX=p+this.moveInfo.globalX,this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,this.moveInfo.width-p)}else if(this.moveInfo.width!==void 0)this.pixels.width=Math.max(1,p+this.moveInfo.width);if(this.moveInfo.globalY!==void 0){if(this.position.globalY=g+this.moveInfo.globalY,this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,this.moveInfo.height-g)}else if(this.moveInfo.height!==void 0)this.pixels.height=Math.max(1,g+this.moveInfo.height);this.update(),j(this.bot)}resizeStart(o){if(this.lock||o.button!==0)return;o.preventDefault(),o.stopPropagation(),this.moveInfo={clientX:o.clientX,clientY:o.clientY};let p=o.target;if(p.classList.contains("n"))this.moveInfo.height=this.pixels.height,this.moveInfo.globalY=this.position.globalY;if(p.classList.contains("e"))this.moveInfo.width=this.pixels.width;if(p.classList.contains("s"))this.moveInfo.height=this.pixels.height;if(p.classList.contains("w"))this.moveInfo.width=this.pixels.width,this.moveInfo.globalX=this.position.globalX}export(){let o=document.createElement("a");document.body.append(o),o.href=URL.createObjectURL(new Blob([JSON.stringify(this.toJSON())],{type:"application/json"})),o.download=`${this.pixels.width}x${this.pixels.height}.${n}`,o.click(),URL.revokeObjectURL(o.href),o.href=this.pixels.canvas.toDataURL("image/webp",1),o.download=`${this.pixels.width}x${this.pixels.height}.webp`,o.click(),URL.revokeObjectURL(o.href),o.remove()}}var j0=`/* stylelint-disable declaration-no-important */
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
`;class o0 extends Error{name="KGlacerMacroError";constructor(o,p){super(o);p.widget.status=o}}class z0 extends o0{name="NoImageError";constructor(o){super("❌ No image is selected",o)}}var a={toggleWidget:{key:"b",shift:!0},minimizeWidget:{key:"m",shift:!0},showWidgetPanel:{key:"s",shift:!0},hideWidgetPanel:{key:"h",shift:!0},toggleOverlay:{key:"v",shift:!0},draw:{key:"enter",shift:!0},addImage:{key:"i",shift:!0},showShortcuts:{key:"/",shift:!0},focusNextImage:{key:"n",shift:!0},focusPreviousImage:{key:"p",shift:!0},openColorPanel:{key:"o",shift:!0},toggleImageLock:{key:"l",shift:!0}};function q(o,p){return o.key.toLowerCase()===p.key&&o.shiftKey===Boolean(p.shift)&&o.ctrlKey===Boolean(p.ctrl)&&o.altKey===Boolean(p.alt)}function D0(o){if(typeof HTMLElement==="undefined")return!1;if(!(o instanceof HTMLElement))return!1;let p=o.tagName.toLowerCase();return p==="input"||p==="textarea"||o.isContentEditable||o.closest('[contenteditable="true"]')!==null}var F0=`<button class="wopen-button" aria-label="Toggle widget">
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
`;var Z0="kglacer-macro:overlay-hidden",k0="https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg";class A0 extends i{bot;element=document.createElement("div");get status(){return this.$status.innerHTML}set status(o){this.$status.innerHTML=o}get open(){return this.element.classList.contains("wopen")}set open(o){if(o)this.element.classList.add("wopen");else this.element.classList.remove("wopen")}$settings;$status;$shortcuts;$locale;$topbar;$draw;$addImage;$toggleOverlay;$strategy;$progressLine;$progressText;$images;$wopenButton;$widgetLogo;activeImageIndex=-1;constructor(o){super();this.bot=o;this.element.classList.add("wwidget"),this.element.innerHTML=F0,$(this.element),document.body.append(this.element),this.populateElementsWithSelector(this.element,{$wopenButton:".wopen-button",$widgetLogo:".widget-logo",$settings:".wform",$status:".wstatus",$shortcuts:".shortcuts",$locale:".locale",$topbar:".wtopbar",$draw:".draw",$addImage:".add-image",$toggleOverlay:".toggle-overlay",$strategy:".strategy",$progressLine:".wprogress div",$progressText:".wprogress span",$images:".images"}),this.$widgetLogo.src=k0,this.$wopenButton.addEventListener("click",()=>this.open=!this.open),this.$draw.addEventListener("click",()=>this.bot.draw()),this.$addImage.addEventListener("click",()=>this.addImage()),this.$toggleOverlay.addEventListener("click",()=>{this.toggleOverlay()}),this.$strategy.addEventListener("change",()=>{this.bot.strategy=this.$strategy.value}),this.$locale.value=b0(),this.$locale.addEventListener("change",()=>{G0(this.$locale.value),$(this.element);for(let p=0;p<this.bot.images.length;p++)this.bot.images[p].applyLocale();this.refreshOverlayToggleText()}),this.registerEvent(document,"keydown",this.handleKeyboard.bind(this),{passive:!1}),this.update(),this.syncOverlayVisibilityFromStorage(),this.open=!0,console.log("[KGM][Widget] Widget mounted and opened")}addImage(){return console.log("[KGM][Widget] Add image flow started"),this.setDisabled("add-image",!0),this.run("Adding image",async()=>{await this.bot.updateColors();let o=document.createElement("input");o.type="file",o.accept=`image/*,.${n}`,o.click(),await V(o,["change"],["cancel","error"]);let p=o.files?.[0];if(!p)throw new z0(this.bot);console.log("[KGM][Widget] File selected",{name:p.name,size:p.size,type:p.type});let g;if(p.name.endsWith(`.${n}`))g=await m.fromJSON(this.bot,JSON.parse(await p.text()));else{let f=new FileReader;f.readAsDataURL(p),await V(f,["load"],["error"]);let w=await this.compressImageBeforeLoad(f.result),l=new Image;l.src=w,await V(l,["load"],["error"]),g=new m(this.bot,F.fromScreenPosition(this.bot,this.defaultImageScreenPosition()),new W(this.bot,l))}this.bot.images.push(g),console.log("[KGM][Widget] Image instance added",{images:this.bot.images.length}),await this.bot.readMap(),g.updateTasks(),j(this.bot,!0),console.log("[KGM][Widget] Image persisted, reloading page"),document.location.reload()},()=>{this.setDisabled("add-image",!1)})}defaultImageScreenPosition(){let o=Math.round(this.element.getBoundingClientRect().width);return{x:Math.max(256,o),y:32}}async compressImageBeforeLoad(o){let p=new Image;if(p.src=o,await V(p,["load"],["error"]),!(p.naturalWidth*p.naturalHeight>3000000||o.length>3000000))return o;let f=document.createElement("canvas");f.width=p.naturalWidth,f.height=p.naturalHeight;let w=f.getContext("2d");if(!w)return o;return w.drawImage(p,0,0),f.toDataURL("image/png")}update(){this.$strategy.value=this.bot.strategy;let o=0,p=0;for(let l=0;l<this.bot.images.length;l++){let z=this.bot.images[l];o+=z.pixels.pixels.length*z.pixels.pixels[0].length,p+=z.tasks.length}let g=o-p,f=g/o*100|0;this.$progressText.textContent=`${g}/${o} ${f}% ETA: ${p/120|0}h`,this.$progressLine.style.transform=`scaleX(${f}%)`,this.$images.innerHTML="";let w=document.createDocumentFragment();for(let l=0;l<this.bot.images.length;l++){let z=this.bot.images[l],b=document.createElement("div");w.append(b),b.className="image",b.innerHTML=`<button class="preview" title="Focus image">
  <img src="${z.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="settings" title="Image settings" aria-label="Image settings">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"/><path d="m19.4 13.5.2-1.5-1.7-.9a6.5 6.5 0 0 0-.4-1l1-1.7-1-1.1-1.8.7a6.8 6.8 0 0 0-.9-.5L13.5 4h-1.4l-.8 1.9a6.2 6.2 0 0 0-1 .4l-1.8-.8-1 1.1 1 1.7a7 7 0 0 0-.4 1L4.6 12l.2 1.5 1.9.8c.1.4.2.7.4 1L6 17l1 1.1 1.9-.7c.3.2.6.3.9.5l.8 1.9h1.4l.8-1.9c.4-.1.7-.2 1-.4l1.8.8 1-1.1-1-1.7c.2-.3.3-.6.4-1l1.8-.8Z"/></svg>
    </button>
    <button class="remove" title="Delete image" aria-label="Delete image">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"/></svg>
    </button>
    <button class="up" title="Move up" ${l===0?"disabled":""}>▴</button>
    <button class="down" title="Move down" ${l===this.bot.images.length-1?"disabled":""}>▾</button>
  </div>`,b.querySelector(".preview").addEventListener("click",()=>{this.activeImageIndex=l,z.position.scrollScreenTo()}),b.querySelector(".settings").addEventListener("click",()=>{this.activeImageIndex=l,z.openSettingsPanel()}),b.querySelector(".remove").addEventListener("click",()=>{if(this.activeImageIndex===l)this.activeImageIndex=-1;z.destroy()}),b.querySelector(".up").addEventListener("click",()=>{l0(this.bot.images,l,l-1),this.update(),j(this.bot)}),b.querySelector(".down").addEventListener("click",()=>{l0(this.bot.images,l,l+1),this.update(),j(this.bot)})}this.$images.append(w)}syncOverlayVisibilityFromStorage(){let o=localStorage.getItem(Z0)==="true";document.body.classList.toggle("overlay-hidden",o),this.refreshOverlayToggleText()}toggleOverlay(o){let p=o??!document.body.classList.contains("overlay-hidden");document.body.classList.toggle("overlay-hidden",p),localStorage.setItem(Z0,String(p)),this.refreshOverlayToggleText()}refreshOverlayToggleText(){this.$toggleOverlay.textContent=document.body.classList.contains("overlay-hidden")?`${u("toggleOverlay")} (${u("disabled")})`:`${u("toggleOverlay")} (${u("enabled")})`}setDisabled(o,p){this.element.querySelector("."+o).disabled=p}async run(o,p,g,f="..."){console.log("[KGM][Widget] Task started",{status:o});let w=this.status;this.status=`${f} ${o}`;try{let l=await p();return this.status=w,console.log("[KGM][Widget] Task completed",{status:o}),l}catch(l){if(!(l instanceof o0))console.error(l),this.status=`Error: ${o}`;throw console.error("[KGM][Widget] Task failed",{status:o,error:l}),l}finally{await g?.()}}handleKeyboard(o){if(D0(o.target))return;if(q(o,a.toggleWidget)){o.preventDefault(),this.open=!this.open;return}if(q(o,a.showShortcuts)){o.preventDefault(),this.$shortcuts.scrollIntoView({behavior:"smooth",block:"center"}),this.$shortcuts.classList.remove("shortcut-pulse"),requestAnimationFrame(()=>{this.$shortcuts.classList.add("shortcut-pulse")});return}if(q(o,a.toggleOverlay)){o.preventDefault(),this.toggleOverlay();return}if(q(o,a.focusNextImage)){o.preventDefault(),this.focusImageByStep(1);return}if(q(o,a.focusPreviousImage)){o.preventDefault(),this.focusImageByStep(-1);return}if(q(o,a.openColorPanel)){o.preventDefault(),this.openColorPanelForActiveImage();return}if(q(o,a.toggleImageLock)){o.preventDefault(),this.toggleLockForActiveImage();return}if(q(o,a.addImage)&&!this.$addImage.disabled){o.preventDefault(),this.addImage();return}if(q(o,a.draw)&&!this.$draw.disabled)o.preventDefault(),this.bot.draw()}focusImageByStep(o){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=o>0?0:this.bot.images.length-1;else this.activeImageIndex=(this.activeImageIndex+o+this.bot.images.length)%this.bot.images.length;this.bot.images[this.activeImageIndex].position.scrollScreenTo()}getActiveImage(){if(!this.bot.images.length)return;if(this.activeImageIndex<0||this.activeImageIndex>=this.bot.images.length)this.activeImageIndex=0;return this.bot.images[this.activeImageIndex]}openColorPanelForActiveImage(){let o=this.getActiveImage();if(!o)return;o.openColorPanel()}toggleLockForActiveImage(){let o=this.getActiveImage();if(!o)return;o.lock=!o.lock,o.update(),j(this.bot)}}var $0=2,a0="[KGM]";class q0{unavailableColors=new Set;mapsCache=new Map;me;$stars=[];strategy="SEQUENTIAL";images=[];widget=new A0(this);markerPixelPositionResolvers=[];lastColor;log(o,p){if(p===void 0)console.log(`${a0} ${o}`);else console.log(`${a0} ${o}`,p)}constructor(){this.log("Boot sequence started");let o=B0();if(this.log("Save loaded",{hasSave:Boolean(o),imageCount:o?.images.length??0,strategy:o?.strategy}),o){for(let g=0;g<o.images.length;g++){let f=o.images[g];y({x:f.position[0]-1000,y:f.position[1]-1000}),y({x:f.position[0]+1000,y:f.position[1]+1000})}this.strategy=o.strategy}this.registerFetchInterceptor(),this.log("Fetch interceptor registered");let p=document.createElement("style");p.textContent=j0.replace("FAKE_FAVORITE_LOCATIONS",h.length.toString()),document.head.append(p),this.log("Styles injected",{fakeFavoriteLocations:h.length}),this.widget.run("Initializing",async()=>{this.log("Widget initialization flow started"),await this.waitForElement("login",".avatar.center-absolute.absolute"),await this.waitForElement("pixel count",".btn.btn-primary.btn-lg.relative.z-30 canvas");let g=await this.waitForElement("canvas",".maplibregl-canvas-container");if(new MutationObserver((f)=>{for(let w=0;w<f.length;w++)if(f[w].removedNodes.length!==0){this.updateStars();break}this.updateImages()}).observe(g,{attributes:!0,childList:!0,subtree:!0}),this.updateStars(),this.log("Stars updated after boot",{stars:this.$stars.length}),await L(500),await this.updateColors(),o)for(let f=0;f<o.images.length;f++){let w=await m.fromJSON(this,o.images[f]);this.images.push(w),w.update()}this.log("Saved images restored",{images:this.images.length}),await this.readMap(),this.updateTasks(),this.widget.setDisabled("draw",!1),this.widget.setDisabled("add-image",!1),this.log("Initialization completed; controls enabled")})}draw(){this.log("Draw requested",{strategy:this.strategy,images:this.images.length}),this.widget.setDisabled("draw",!0),this.widget.status="",this.mapsCache.clear();let o=document.querySelector(".maplibregl-canvas"),p=(g)=>{if(!g.shiftKey)g.stopPropagation()};return this.widget.run("Drawing",async()=>{await this.widget.run("Initializing draw",()=>Promise.all([this.updateColors(),this.readMap()])),globalThis.addEventListener("mousemove",p,!0),o.addEventListener("wheel",p,!0),this.updateTasks();let g=await fetch("https://backend.wplace.live/me",{credentials:"include"}).then((l)=>l.json()),f=Math.floor(g.charges.count);this.log("Charges fetched",{charges:f});let w=0;for(let l=0;l<this.images.length;l++)w+=this.images[l].tasks.length;switch(this.log("Tasks prepared",{tasks:w}),this.strategy){case"ALL":{while(f>0){let l=!0;for(let z=0;z<this.images.length;z++){let b=this.images[z].tasks.shift();if(!b)continue;this.drawTask(b),f--,await L(1),l=!1}if(l)break}break}case"PERCENTAGE":{for(let l=0;l<w&&f>0;l++){let z=1,b;for(let A=0;A<this.images.length;A++){let H=this.images[A],M=1-H.tasks.length/(H.pixels.pixels.length*H.pixels.pixels[0].length);if(M<z)z=M,b=H}this.drawTask(b.tasks.shift()),f--,await L(1)}break}case"SEQUENTIAL":for(let l=0;l<this.images.length;l++){let z=this.images[l];for(let b=z.tasks.shift();b&&f>0;b=z.tasks.shift())this.drawTask(b),f--,await L(1)}}this.widget.update(),this.log("Draw flow finished",{remainingCharges:f})},()=>{globalThis.removeEventListener("mousemove",p,!0),o.removeEventListener("wheel",p,!0),this.widget.setDisabled("draw",!1)})}toJSON(){return{version:$0,images:this.images.map((o)=>o.toJSON()),strategy:this.strategy}}async updateColors(){this.log("Updating colors palette"),await this.openColors(),this.unavailableColors.clear();for(let o of document.querySelectorAll("button.btn.relative.w-full"))if(o.children.length!==0)this.unavailableColors.add(Math.abs(Number.parseInt(o.id.slice(6))));this.updateImageColors(),this.log("Colors updated",{unavailableColors:this.unavailableColors.size})}moveMap(o){let p=document.querySelector(".maplibregl-canvas"),g=window.innerWidth/2,f=window.innerHeight/2,w=g-o.x,l=f-o.y;function z(b,A,H){p.dispatchEvent(new MouseEvent(b,{bubbles:!0,cancelable:!0,clientX:A,clientY:H,buttons:1}))}z("mousedown",g,f),z("mousemove",w,l),z("mouseup",w,l)}readMap(){this.mapsCache.clear();let o=new Set;for(let g=0;g<this.images.length;g++){let f=this.images[g],{tileX:w,tileY:l}=new F(this,f.position.globalX+f.pixels.pixels[0].length,f.position.globalY+f.pixels.pixels.length);for(let z=f.position.tileX;z<=w;z++)for(let b=f.position.tileY;b<=l;b++)o.add(`${z}/${b}`)}let p=0;return this.log("Reading map tiles",{tileCount:o.size}),this.widget.run(`Reading map [0/${o.size}]`,()=>Promise.all([...o].map(async(g)=>{this.mapsCache.set(g,await W.fromJSON(this,{url:`https://backend.wplace.live/files/s0/tiles/${g}.png`,exactColor:!0})),this.widget.status=`⌛ Reading map [${++p}/${o.size}]`})))}waitForUnfocus(){return this.widget.run("UNFOCUS WINDOW",()=>new Promise((o)=>{if(!document.hasFocus())o();window.addEventListener("blur",()=>{setTimeout(o,1)},{once:!0})}),void 0,"\uD83D\uDDB1️")}findAnchorsForScreen(o){let p=0,g=1,f=1/0,w=1/0;for(let b=0;b<this.$stars.length;b++){let{x:A,y:H}=_(this.$stars[b]);if(A<o.x&&H<o.y){let M=o.x-A+(o.y-H);if(M<f)f=M,p=b}else if(A>o.x&&H>o.y){let M=A-o.x+(H-o.y);if(M<w)w=M,g=b}}let l=_(this.$stars[p]),z=P[p];return{anchorScreenPosition:l,anchorWorldPosition:z,pixelSize:(_(this.$stars[g]).x-l.x)/(P[g].x-z.x)}}async openColors(){this.lastColor=void 0,document.querySelector(".flex.gap-2.px-3 > .btn-circle")?.click(),await L(1),document.querySelector(".btn.btn-primary.btn-lg.relative.z-30")?.click(),await L(1);let o=document.querySelector("button.bottom-0");if(o?.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->')o.click(),await L(1)}drawTask(o){if(this.lastColor!==o.color)document.getElementById("color-"+o.color).click(),this.lastColor=o.color,this.log("Color switched for draw task",{color:o.color});let p=o.position.pixelSize/2,g=o.position.toScreenPosition();document.documentElement.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g.x+p,clientY:g.y+p,shiftKey:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0})),document.documentElement.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,which:32,bubbles:!0,cancelable:!0}))}registerFetchInterceptor(){let o=globalThis.fetch,p=/https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;globalThis.fetch=async(g,f)=>{let w=await o(g,f),l=w.clone(),z="";if(typeof g=="string")z=g;else if(g instanceof Request)z=g.url;else if(g instanceof URL)z=g.href;if(w.url==="https://backend.wplace.live/me")this.me=await l.json(),this.me.favoriteLocations.unshift(...h),this.me.maxFavoriteLocations=1/0,w.json=()=>Promise.resolve(this.me),this.log("Patched /me response with favorite locations",{totalFavorites:this.me.favoriteLocations.length});let b=p.exec(z);if(b){for(let A=0;A<this.markerPixelPositionResolvers.length;A++)this.markerPixelPositionResolvers[A](new F(this,+b[1],+b[2],+b[3],+b[4]));this.markerPixelPositionResolvers.length=0,this.log("Resolved marker pixel position from network event")}return w}}async closeAll(){for(let o of document.querySelectorAll("button"))if(o.innerHTML==="✕"||o.innerHTML==='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->')o.click(),await L(1)}waitForElement(o,p){return this.log("Waiting for element",{name:o,selector:p}),this.widget.run(`Waiting for ${o}`,()=>{return new Promise((g)=>{let f=document.querySelector(p);if(f){g(f);return}let w=new MutationObserver(()=>{let l=document.querySelector(p);if(l)w.disconnect(),g(l)});w.observe(document.documentElement,{childList:!0,subtree:!0})})})}updateStars(){this.$stars=[...document.querySelectorAll(".text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center")].slice(0,h.length),this.log("Star cache updated",{stars:this.$stars.length})}updateImages(){for(let o=0;o<this.images.length;o++)this.images[o].position.updateAnchor(),this.images[o].update()}updateTasks(){for(let o=0;o<this.images.length;o++)this.images[o].updateTasks()}updateImageColors(){for(let o=0;o<this.images.length;o++)this.images[o].updateColors()}}globalThis.kglacerMacro=new q0;globalThis.kgm=globalThis.kglacerMacro;globalThis.wbot=globalThis.kglacerMacro;export{q0 as KGlacerMacro};
